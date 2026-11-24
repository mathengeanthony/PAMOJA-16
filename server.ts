import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, ThinkingLevel, Type } from '@google/genai';
import {
  CIVIC_MAP_NODES,
  EAST_AFRICA_CHAPTERS,
  GRANT_TIER_META,
  PROGRAM_TRACK_META,
  REGIONAL_OVERVIEW_VIEW,
} from './src/data/eastAfricaChapters.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;

const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

const COMPACT_CHAPTERS_CONTEXT = EAST_AFRICA_CHAPTERS.map((c) => ({
  code: c.code,
  name: c.name,
  capital: c.capital,
  jurisdiction: c.jurisdictionLabel,
  currency: c.currency,
  lat: c.capitalLatLng[0],
  lng: c.capitalLatLng[1],
  summary: c.description,
}));

const COMPACT_NODES_CONTEXT = CIVIC_MAP_NODES.map((n) => ({
  id: n.id,
  countryCode: n.countryCode,
  loc: n.loc,
  lat: n.lat,
  lng: n.lng,
  track: PROGRAM_TRACK_META[n.programTrack].label,
  grantTier: GRANT_TIER_META[n.grantTier].label,
  grants: n.price,
  growth: `+${n.growth}`,
  sdg: n.sdgTarget,
  youth: n.youthCount,
  projects: n.activeProjects,
}));

const MAP_SEARCH_RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    headline: {
      type: Type.STRING,
      description: 'Short, punchy title summarizing the answer or map findings (max 8 words).',
    },
    answer: {
      type: Type.STRING,
      description:
        'Clear, informative 2-4 sentence briefing answering the query using Pamoja 16 metrics and/or East African civic/geographical facts.',
    },
    displayMode: {
      type: Type.STRING,
      description:
        "Choose 'map_pins' when specific map hubs or coordinates are highlighted, 'chapter_focus' when focusing a country/region, or 'info_card' for general policy/concept briefs.",
    },
    recommendedChapterCode: {
      type: Type.STRING,
      description:
        "One of 'KE', 'SS', 'TZ', 'RW', 'UG', 'SO', 'ALL', or 'NONE' if no chapter switch is needed.",
    },
    recommendedMetric: {
      type: Type.STRING,
      description:
        "Optional Color Lens recommendation: 'track', 'grants', 'growth', 'chapter', or 'NONE'.",
    },
    matchedNodeIds: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description:
        'Exact IDs from the provided Pamoja 16 CIVIC_MAP_NODES list that match the query (0 to 12 IDs).',
    },
    mapPoints: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          lat: { type: Type.NUMBER },
          lng: { type: Type.NUMBER },
          category: { type: Type.STRING },
          metricLabel: { type: Type.STRING },
          summary: { type: Type.STRING },
        },
        required: ['title', 'lat', 'lng', 'category', 'metricLabel', 'summary'],
      },
      description:
        'Optional custom East Africa or global geo-markers when the user asks about places, institutions, or events beyond the 41 built-in hubs (0 to 6 points).',
    },
    keyMetrics: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          label: { type: Type.STRING },
          value: { type: Type.STRING },
        },
        required: ['label', 'value'],
      },
      description: '2 to 4 compact telemetry pills summarizing relevant numbers or facts.',
    },
    suggestedQueries: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: '2 to 3 concise follow-up search prompts for the user.',
    },
  },
  required: [
    'headline',
    'answer',
    'displayMode',
    'recommendedChapterCode',
    'recommendedMetric',
    'matchedNodeIds',
    'mapPoints',
    'keyMetrics',
    'suggestedQueries',
  ],
};

function sanitizeJsonString(raw: string): string {
  const trimmed = raw.trim();
  if (trimmed.startsWith('```')) {
    return trimmed.replace(/^```(?:json)?\s*/i, '').replace(/```$/, '').trim();
  }
  return trimmed;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, service: 'pamoja16-map-ai' });
  });

  app.post('/api/map-search', async (req, res) => {
    const rawQuery = req.body?.query;
    if (typeof rawQuery !== 'string' || !rawQuery.trim()) {
      res.status(400).json({ error: 'Please enter a search query.' });
      return;
    }

    const query = rawQuery.trim().slice(0, 400);
    const activeCountryCode =
      typeof req.body?.activeCountryCode === 'string' ? req.body.activeCountryCode : 'KE';
    const isRegionalOverview = Boolean(req.body?.isRegionalOverview);
    const colorMetric =
      typeof req.body?.colorMetric === 'string' ? req.body.colorMetric : 'track';

    const ai = getGeminiClient();
    if (!ai) {
      res.status(503).json({
        error:
          'Gemini API key is not configured. Add GEMINI_API_KEY in Settings > Secrets to enable AI Map Search.',
      });
      return;
    }

    const systemInstruction = `You are the Pamoja 16 Geospatial Civic Intelligence Engine embedded inside an interactive Leaflet map of East Africa (UN SDG 16: Peace, Justice & Strong Institutions).

Your job: answer ANY query cleanly — whether it asks about Pamoja 16 hubs, grants, youth reach, SDG targets, East African institutions, borders, or broader regional civic/geographic information — AND map relevant findings directly onto the Leaflet map whenever geographic places, countries, or Pamoja 16 hubs apply.

Pamoja 16 Chapters (${EAST_AFRICA_CHAPTERS.length} nations):
${JSON.stringify(COMPACT_CHAPTERS_CONTEXT)}

Regional Overview Scope:
${JSON.stringify(REGIONAL_OVERVIEW_VIEW)}

Built-in Civic Map Hubs (${CIVIC_MAP_NODES.length} nodes):
${JSON.stringify(COMPACT_NODES_CONTEXT)}

Rules:
1. Only include IDs in matchedNodeIds that exist verbatim in the built-in Civic Map Hubs list above.
2. If the user asks about places/cities/institutions NOT in the 41 built-in hubs (e.g. UN Gigiri, Kakuma, Arusha EAC Court, Bujumbura, Goma, Nakuru universities, coastal ports, etc.), place accurate real-world lat/lng pins inside mapPoints with concise category, metricLabel, and summary.
3. Keep keyMetrics super short (max 3-4 words per label/value) so they fit cleanly on compact mobile pills.
4. Set recommendedChapterCode to a matching country code ('KE','SS','TZ','RW','UG','SO') or 'ALL' if cross-border / multi-country, or 'NONE' if current view fits.
5. Set recommendedMetric to 'growth', 'grants', 'track', or 'chapter' when the user asks about growth/surge, funding/pools, tracks/audits/peace, or country comparison; otherwise 'NONE'.
6. Return valid JSON strictly matching the schema.`;

    const prompt = `Current Map State: scope=${
      isRegionalOverview ? 'ALL_EAST_AFRICA' : activeCountryCode
    }, activeColorLens=${colorMetric}.
User Query: "${query}"`;

    try {
      let response;
      try {
        response = await ai.models.generateContent({
          model: 'gemini-4-hydrogen',
          contents: prompt,
          config: {
            systemInstruction,
            thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
            tools: [{ googleSearch: {} }],
            responseMimeType: 'application/json',
            responseSchema: MAP_SEARCH_RESPONSE_SCHEMA,
          },
        });
      } catch (toolErr: unknown) {
        const msg = toolErr instanceof Error ? toolErr.message : String(toolErr);
        // Retry without Search tool only if the request rejected tool+schema combination
        if (msg.includes('400') || msg.toLowerCase().includes('tool')) {
          response = await ai.models.generateContent({
            model: 'gemini-4-hydrogen',
            contents: prompt,
            config: {
              systemInstruction,
              thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
              responseMimeType: 'application/json',
              responseSchema: MAP_SEARCH_RESPONSE_SCHEMA,
            },
          });
        } else {
          throw toolErr;
        }
      }

      const rawText = sanitizeJsonString(response.text ?? '{}');
      const parsed = JSON.parse(rawText);

      const validNodeIds = new Set(CIVIC_MAP_NODES.map((n) => n.id));
      const matchedNodeIds: string[] = Array.isArray(parsed.matchedNodeIds)
        ? parsed.matchedNodeIds.filter(
            (id: unknown): id is string => typeof id === 'string' && validNodeIds.has(id)
          )
        : [];

      const mapPoints = Array.isArray(parsed.mapPoints)
        ? parsed.mapPoints
            .filter(
              (pt: unknown): pt is {
                title: string;
                lat: number;
                lng: number;
                category: string;
                metricLabel: string;
                summary: string;
              } =>
                Boolean(pt) &&
                typeof pt === 'object' &&
                typeof (pt as { lat?: unknown }).lat === 'number' &&
                typeof (pt as { lng?: unknown }).lng === 'number' &&
                Number.isFinite((pt as { lat: number }).lat) &&
                Number.isFinite((pt as { lng: number }).lng) &&
                Math.abs((pt as { lat: number }).lat) <= 90 &&
                Math.abs((pt as { lng: number }).lng) <= 180
            )
            .slice(0, 6)
        : [];

      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];
      const sources = groundingChunks
        .map((chunk) => chunk.web)
        .filter((web): web is { uri: string; title?: string } => Boolean(web?.uri))
        .slice(0, 4)
        .map((web) => ({
          title: web.title || web.uri,
          url: web.uri,
        }));

      res.json({
        query,
        headline: typeof parsed.headline === 'string' ? parsed.headline : 'AI Intelligence Brief',
        answer: typeof parsed.answer === 'string' ? parsed.answer : '',
        displayMode:
          parsed.displayMode === 'map_pins' ||
          parsed.displayMode === 'chapter_focus' ||
          parsed.displayMode === 'info_card'
            ? parsed.displayMode
            : 'map_pins',
        recommendedChapterCode:
          typeof parsed.recommendedChapterCode === 'string'
            ? parsed.recommendedChapterCode
            : 'NONE',
        recommendedMetric:
          typeof parsed.recommendedMetric === 'string' ? parsed.recommendedMetric : 'NONE',
        matchedNodeIds,
        mapPoints,
        keyMetrics: Array.isArray(parsed.keyMetrics) ? parsed.keyMetrics.slice(0, 4) : [],
        suggestedQueries: Array.isArray(parsed.suggestedQueries)
          ? parsed.suggestedQueries.slice(0, 3)
          : [],
        sources,
      });
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : 'AI search failed';
      console.error('Gemini /api/map-search error:', errMsg);
      const status =
        errMsg.includes('429') || errMsg.includes('RESOURCE_EXHAUSTED')
          ? 429
          : errMsg.includes('403') || errMsg.includes('PERMISSION_DENIED')
            ? 403
            : 500;
      res.status(status).json({
        error:
          status === 429
            ? 'AI search rate limit reached. Please retry shortly or check quota in Settings > Secrets.'
            : status === 403
              ? 'Gemini API key permission error. Please check Settings > Secrets.'
              : 'Unable to complete AI map search right now. Please try again.',
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Pamoja 16 server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
