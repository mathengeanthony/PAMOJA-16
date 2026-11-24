import React, { useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Check, ExternalLink, FileDown, Loader2, MapPin, Search, Sparkles, X } from 'lucide-react';
import {
  CIVIC_MAP_NODES,
  CivicMapNode,
  EAST_AFRICA_CHAPTERS,
  EastAfricaChapter,
  EastAfricaCountryCode,
  GRANT_TIER_META,
  GrantTier,
  PROGRAM_TRACK_META,
  ProgramTrack,
  REGIONAL_OVERVIEW_VIEW,
} from '../../data/eastAfricaChapters';
import { downloadPamojaMetricsPdf } from '../../utils/exportMetricsPdf';

export type ColorMetricMode = 'chapter' | 'track' | 'grants' | 'growth';
type GrowthBand = 'surge' | 'rising' | 'steady';

interface AiMapPoint {
  title: string;
  lat: number;
  lng: number;
  category: string;
  metricLabel: string;
  summary: string;
}

interface AiMapSearchResult {
  query: string;
  headline: string;
  answer: string;
  displayMode: 'map_pins' | 'info_card' | 'chapter_focus';
  recommendedChapterCode: string;
  recommendedMetric: string;
  matchedNodeIds: string[];
  mapPoints: AiMapPoint[];
  keyMetrics: Array<{ label: string; value: string }>;
  suggestedQueries: string[];
  sources: Array<{ title: string; url: string }>;
}

interface LuxtenMapProps {
  isLightMode?: boolean;
  selectedCountryIdx?: number;
  onSelectCountry?: (index: number) => void;
  chapters?: EastAfricaChapter[];
  onNavigateToSection3?: (mode?: 'platform' | 'action-hub' | 'library') => void;
}

const GROWTH_BAND_META: Record<GrowthBand, { label: string; color: string }> = {
  surge: { label: 'Surge ≥14%', color: '#FB7185' },
  rising: { label: 'Rising 8–13%', color: '#FBBF24' },
  steady: { label: 'Steady <8%', color: '#2DD4BF' },
};

const getGrowthBand = (val: number): GrowthBand =>
  val >= 14 ? 'surge' : val >= 8 ? 'rising' : 'steady';

const lon2tile = (lon: number, zoom: number) =>
  Math.floor(((lon + 180) / 360) * Math.pow(2, zoom));

const lat2tile = (lat: number, zoom: number) =>
  Math.floor(
    ((1 -
      Math.log(
        Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)
      ) /
        Math.PI) /
      2) *
      Math.pow(2, zoom)
  );

function getCurvedArcPoints(
  from: [number, number],
  to: [number, number],
  curvature = 0.12
): [number, number][] {
  const latDiff = to[0] - from[0];
  const lngDiff = to[1] - from[1];
  const midLat = (from[0] + to[0]) / 2 - lngDiff * curvature;
  const midLng = (from[1] + to[1]) / 2 + latDiff * curvature;

  const pts: [number, number][] = [];
  const steps = 14;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const inv = 1 - t;
    const lat = inv * inv * from[0] + 2 * inv * t * midLat + t * t * to[0];
    const lng = inv * inv * from[1] + 2 * inv * t * midLng + t * t * to[1];
    pts.push([lat, lng]);
  }
  return pts;
}

function getNodeColor(
  node: CivicMapNode,
  metric: ColorMetricMode,
  isFocusedCountry: boolean
): string {
  if (metric === 'track') return PROGRAM_TRACK_META[node.programTrack].color;
  if (metric === 'grants') return GRANT_TIER_META[node.grantTier].color;
  if (metric === 'growth') return GROWTH_BAND_META[getGrowthBand(node.growthValue)].color;
  return isFocusedCountry ? '#E5B80B' : '#00C4CC';
}

function createColoredBeaconIcon(
  sizeClass: 'sm' | 'md' | 'lg' | 'hq',
  colorHex: string,
  emphasized: boolean,
  dimmed: boolean
) {
  const px =
    sizeClass === 'hq'
      ? emphasized
        ? 20
        : 13
      : sizeClass === 'lg'
        ? emphasized
          ? 16
          : 11
        : sizeClass === 'md'
          ? emphasized
            ? 12
            : 8
          : emphasized
            ? 9
            : 6;

  const delay = -(Math.random() * 3).toFixed(2);
  const opacity = dimmed ? '0.2' : emphasized ? '1' : '0.52';
  const borderColor = sizeClass === 'hq' ? '#ffffff' : '#050a14';
  const ring =
    sizeClass === 'hq' && emphasized
      ? `0 0 0 3px ${colorHex}44, 0 0 18px ${colorHex}`
      : emphasized
        ? `0 0 13px ${colorHex}, 0 0 4px rgba(255,255,255,0.8)`
        : `0 0 6px ${colorHex}88`;

  return L.divIcon({
    className: 'custom-star-icon',
    html: `<div style="width:${px}px; height:${px}px; opacity:${opacity}; animation-delay:${delay}s; background: radial-gradient(circle, #ffffff 18%, ${colorHex} 72%, ${colorHex} 100%); border: 1.5px solid ${borderColor}; border-radius: 50%; box-shadow:${ring}; transition: opacity 0.3s ease, transform 0.3s ease;" class="animate-pulse"></div>`,
    iconSize: [px, px],
    iconAnchor: [px / 2, px / 2],
  });
}

function formatYouthCompact(count: number): string {
  if (count >= 1000) return `${(count / 1000).toFixed(count >= 100000 ? 0 : 1)}K`;
  return String(count);
}

export const LuxtenMap: React.FC<LuxtenMapProps> = ({
  isLightMode = false,
  selectedCountryIdx = 0,
  onSelectCountry,
  chapters = EAST_AFRICA_CHAPTERS,
  onNavigateToSection3,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const corridorLayerRef = useRef<L.LayerGroup | null>(null);
  const aiSearchLayerRef = useRef<L.LayerGroup | null>(null);
  const hasFlownRef = useRef<boolean>(false);
  const tilesReadyRef = useRef<boolean>(false);
  const suppressNextScopeFlyRef = useRef<boolean>(false);

  const [isRegionalOverview, setIsRegionalOverview] = useState<boolean>(false);
  const [isMapUnlocked, setIsMapUnlocked] = useState<boolean>(false);
  const [colorMetric, setColorMetric] = useState<ColorMetricMode>('track');
  const [legendFilter, setLegendFilter] = useState<string | null>(null);
  const [inspectedNode, setInspectedNode] = useState<CivicMapNode | null>(null);

  // AI Search & PDF Export state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [aiResult, setAiResult] = useState<AiMapSearchResult | null>(null);
  const [pdfExported, setPdfExported] = useState<boolean>(false);

  const activeChapter = chapters[selectedCountryIdx] ?? chapters[0];

  const onSelectCountryRef = useRef(onSelectCountry);
  onSelectCountryRef.current = onSelectCountry;

  const markerRegistryRef = useRef<{
    hq: Array<{ code: EastAfricaCountryCode; chapter: EastAfricaChapter; marker: L.Marker }>;
    nodes: Array<{ node: CivicMapNode; marker: L.Marker }>;
  }>({ hq: [], nodes: [] });

  // Reset legend filter cleanly when switching color metric mode
  const handleChangeMetric = (nextMetric: ColorMetricMode) => {
    setColorMetric(nextMetric);
    setLegendFilter(null);
  };

  // Compute live aggregate stats for currently active scope + filter
  const visibleTelemetry = useMemo(() => {
    const scopeNodes = isRegionalOverview
      ? CIVIC_MAP_NODES
      : CIVIC_MAP_NODES.filter((n) => n.countryCode === activeChapter.code);

    const matchingNodes = scopeNodes.filter((node) => {
      if (!legendFilter) return true;
      if (colorMetric === 'track') return node.programTrack === legendFilter;
      if (colorMetric === 'grants') return node.grantTier === legendFilter;
      if (colorMetric === 'growth') return getGrowthBand(node.growthValue) === legendFilter;
      return true;
    });

    const youthTotal = matchingNodes.reduce((sum, n) => sum + n.youthCount, 0);
    const projectsTotal = matchingNodes.reduce((sum, n) => sum + n.activeProjects, 0);
    const avgGrowth =
      matchingNodes.length > 0
        ? (
            matchingNodes.reduce((sum, n) => sum + n.growthValue, 0) / matchingNodes.length
          ).toFixed(1)
        : '0.0';

    return {
      matchingNodes,
      nodeCount: matchingNodes.length,
      totalInScope: scopeNodes.length,
      youthLabel: formatYouthCompact(youthTotal),
      projectsTotal,
      avgGrowth,
    };
  }, [isRegionalOverview, activeChapter.code, colorMetric, legendFilter]);

  const legendItems = useMemo(() => {
    if (colorMetric === 'track') {
      return (Object.keys(PROGRAM_TRACK_META) as ProgramTrack[]).map((key) => ({
        key,
        label: PROGRAM_TRACK_META[key].shortLabel,
        title: PROGRAM_TRACK_META[key].label,
        color: PROGRAM_TRACK_META[key].color,
        filterable: true,
      }));
    }
    if (colorMetric === 'grants') {
      return (Object.keys(GRANT_TIER_META) as GrantTier[]).map((key) => ({
        key,
        label: GRANT_TIER_META[key].label,
        title: GRANT_TIER_META[key].label,
        color: GRANT_TIER_META[key].color,
        filterable: true,
      }));
    }
    if (colorMetric === 'growth') {
      return (Object.keys(GROWTH_BAND_META) as GrowthBand[]).map((key) => ({
        key,
        label: GROWTH_BAND_META[key].label,
        title: GROWTH_BAND_META[key].label,
        color: GROWTH_BAND_META[key].color,
        filterable: true,
      }));
    }
    return [
      {
        key: 'active',
        label: isRegionalOverview ? '6 Chapters' : activeChapter.name,
        title: 'Focused Chapter Nodes',
        color: '#E5B80B',
        filterable: false,
      },
      {
        key: 'regional',
        label: 'Neighbor Nodes',
        title: 'Regional Neighbor Nodes',
        color: '#00C4CC',
        filterable: false,
      },
    ];
  }, [colorMetric, isRegionalOverview, activeChapter.name]);

  const flyToScopeBounds = (
    map: L.Map,
    chapter: EastAfricaChapter,
    regional: boolean,
    duration = 1.45
  ) => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktop = window.innerWidth >= 768;
    const paddingTopLeft: [number, number] = isDesktop ? [350, 108] : [14, 140];
    const paddingBottomRight: [number, number] = isDesktop ? [95, 130] : [14, 175];

    const points: [number, number][] = regional
      ? chapters.map((c) => c.capitalLatLng)
      : [
          chapter.capitalLatLng,
          ...CIVIC_MAP_NODES.filter((n) => n.countryCode === chapter.code).map(
            (n) => [n.lat, n.lng] as [number, number]
          ),
        ];

    const bounds = L.latLngBounds(points);
    const maxZoom = regional ? 5 : chapter.overviewZoom + 1;

    map.invalidateSize({ animate: false });
    if (prefersReducedMotion || duration === 0) {
      map.fitBounds(bounds, { paddingTopLeft, paddingBottomRight, maxZoom, animate: false });
    } else {
      map.flyToBounds(bounds, {
        paddingTopLeft,
        paddingBottomRight,
        maxZoom,
        animate: true,
        duration,
        easeLinearity: 0.28,
      });
    }
  };

  // Ref holding latest framing args for initial IntersectionObserver trigger
  const latestFramingRef = useRef({ activeChapter, isRegionalOverview });
  latestFramingRef.current = { activeChapter, isRegionalOverview };

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const initialChapter = chapters[selectedCountryIdx] ?? chapters[0];

    // Prefetch initial capital + overview tiles for all 6 hubs & regional grid
    const prefetchedUrls = new Set<string>();
    const queueTile = (z: number, x: number, y: number) => {
      const maxTile = Math.pow(2, z);
      if (x < 0 || y < 0 || x >= maxTile || y >= maxTile) return;
      const url = `https://tile.openstreetmap.org/${z}/${x}/${y}.png`;
      if (prefetchedUrls.has(url)) return;
      prefetchedUrls.add(url);
      const img = new Image();
      img.src = url;
    };

    const capX = lon2tile(initialChapter.capitalLatLng[1], 10);
    const capY = lat2tile(initialChapter.capitalLatLng[0], 10);
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        queueTile(10, capX + dx, capY + dy);
      }
    }

    chapters.forEach((chapter) => {
      const cx = lon2tile(chapter.overviewLatLng[1], chapter.overviewZoom);
      const cy = lat2tile(chapter.overviewLatLng[0], chapter.overviewZoom);
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          queueTile(chapter.overviewZoom, cx + dx, cy + dy);
        }
      }
    });

    const regX = lon2tile(REGIONAL_OVERVIEW_VIEW.center[1], REGIONAL_OVERVIEW_VIEW.zoom);
    const regY = lat2tile(REGIONAL_OVERVIEW_VIEW.center[0], REGIONAL_OVERVIEW_VIEW.zoom);
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        queueTile(REGIONAL_OVERVIEW_VIEW.zoom, regX + dx, regY + dy);
      }
    }

    const map = L.map(mapRef.current, {
      zoomControl: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      dragging: false,
      attributionControl: false,
      zoomAnimation: true,
      fadeAnimation: true,
      markerZoomAnimation: true,
    }).setView(initialChapter.capitalLatLng, 10);
    mapInstance.current = map;

    const osmLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      updateWhenIdle: false,
      updateWhenZooming: true,
      keepBuffer: 6,
      attribution: '&copy; OpenStreetMap contributors',
    });
    osmLayer.on('load', () => {
      tilesReadyRef.current = true;
    });
    osmLayer.addTo(map);
    tileLayerRef.current = osmLayer;

    const corridorLayer = L.layerGroup().addTo(map);
    corridorLayerRef.current = corridorLayer;

    const aiSearchLayer = L.layerGroup().addTo(map);
    aiSearchLayerRef.current = aiSearchLayer;

    let flyToTimeout: ReturnType<typeof setTimeout> | null = null;
    let fallbackTimeout: ReturnType<typeof setTimeout> | null = null;

    const runInitialFlyTo = () => {
      if (!mapInstance.current) return;
      const { activeChapter: cur, isRegionalOverview: reg } = latestFramingRef.current;
      flyToScopeBounds(mapInstance.current, cur, reg, 1.9);
      mapInstance.current.once('moveend', () => {
        mapInstance.current?.invalidateSize({ animate: false });
      });
    };

    const triggerZoomOut = () => {
      if (hasFlownRef.current || !mapInstance.current) return;
      hasFlownRef.current = true;
      mapInstance.current.invalidateSize({ animate: false });

      if (tilesReadyRef.current) {
        flyToTimeout = setTimeout(runInitialFlyTo, 260);
      } else {
        let launched = false;
        const launchOnce = () => {
          if (launched) return;
          launched = true;
          if (fallbackTimeout) clearTimeout(fallbackTimeout);
          flyToTimeout = setTimeout(runInitialFlyTo, 180);
        };
        osmLayer.once('load', launchOnce);
        fallbackTimeout = setTimeout(launchOnce, 700);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            triggerZoomOut();
          }
        });
      },
      { threshold: 0.35 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Capital HQ beacons
    const hqList: Array<{
      code: EastAfricaCountryCode;
      chapter: EastAfricaChapter;
      marker: L.Marker;
    }> = [];
    chapters.forEach((chapter, chapterIdx) => {
      const isInitialActive = chapterIdx === selectedCountryIdx;
      const hqMarker = L.marker(chapter.capitalLatLng, {
        icon: createColoredBeaconIcon('hq', '#00C4CC', isInitialActive, false),
        zIndexOffset: isInitialActive ? 600 : 120,
      }).addTo(map);

      hqMarker.bindTooltip(
        `
          <div class="font-mono text-[9px] text-[#E5B80B] tracking-widest uppercase mb-1">Pamoja 16 • ${chapter.name}</div>
          <div class="font-extrabold text-[13px] tracking-tight text-black bg-[#E5B80B] px-1.5 py-0.5 inline-block uppercase mb-2">${chapter.flag} ${chapter.capital}</div>
          <div class="text-[10px] uppercase text-gray-300 font-bold mt-1">${chapter.hqSubtitle}</div>
          <div class="text-[9px] text-[#00C4CC] font-semibold mt-1 uppercase tracking-wider">${chapter.jurisdictionLabel} • Click to Focus</div>
        `,
        { className: 'custom-map-hud', direction: 'top', sticky: true, opacity: 1 }
      );

      hqMarker.on('click', () => {
        setIsRegionalOverview(false);
        setInspectedNode(null);
        onSelectCountryRef.current?.(chapterIdx);
      });

      hqList.push({ code: chapter.code, chapter, marker: hqMarker });
    });

    // Regional civic data nodes
    const nodeList: Array<{ node: CivicMapNode; marker: L.Marker }> = [];
    CIVIC_MAP_NODES.forEach((point) => {
      const isInitialActive = point.countryCode === initialChapter.code;
      const initColor = getNodeColor(point, 'track', isInitialActive);
      const marker = L.marker([point.lat, point.lng], {
        icon: createColoredBeaconIcon(point.size, initColor, isInitialActive, false),
        zIndexOffset: isInitialActive ? 300 : 0,
      }).addTo(map);

      const trackMeta = PROGRAM_TRACK_META[point.programTrack];
      const hudContent = `
        <div class="flex items-center justify-between gap-4 mb-1">
          <span class="font-mono text-[9px] text-[#E5B80B] tracking-widest uppercase">${point.countryName}</span>
          <span class="text-[8.5px] font-bold uppercase px-1.5 py-0.5 rounded bg-white/10 text-[#00C4CC]">${point.sdgTarget}</span>
        </div>
        <div class="font-extrabold text-[13px] text-white tracking-tight uppercase mb-1.5">${point.loc}</div>
        <div class="flex items-center gap-1.5 text-[9px] uppercase tracking-wider font-semibold text-gray-300 border-b border-[#00C4CC]/30 pb-1.5 mb-1.5">
          <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:${trackMeta.color};"></span>
          <span>${trackMeta.label}</span>
        </div>
        <div class="grid grid-cols-3 gap-3">
          <div>
            <div class="text-[8px] uppercase text-gray-400 font-bold">Youth</div>
            <div class="text-white font-bold text-[11px]">${formatYouthCompact(point.youthCount)}</div>
          </div>
          <div>
            <div class="text-[8px] uppercase text-gray-400 font-bold">Growth</div>
            <div class="text-[#00C4CC] font-bold text-[11px]">+${point.growth}</div>
          </div>
          <div>
            <div class="text-[8px] uppercase text-gray-400 font-bold">Grants</div>
            <div class="text-[#E5B80B] font-bold text-[11px]">${point.price}</div>
          </div>
        </div>
      `;
      marker.bindTooltip(hudContent, {
        className: 'custom-map-hud',
        direction: 'top',
        sticky: true,
        opacity: 1,
      });

      marker.on('click', () => {
        const matchedIdx = chapters.findIndex((c) => c.code === point.countryCode);
        if (matchedIdx !== -1) {
          setIsRegionalOverview(false);
          onSelectCountryRef.current?.(matchedIdx);
        }
        setInspectedNode(point);
      });

      nodeList.push({ node: point, marker });
    });

    markerRegistryRef.current = { hq: hqList, nodes: nodeList };

    return () => {
      observer.disconnect();
      if (flyToTimeout) clearTimeout(flyToTimeout);
      if (fallbackTimeout) clearTimeout(fallbackTimeout);
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
      tileLayerRef.current = null;
      corridorLayerRef.current = null;
      aiSearchLayerRef.current = null;
      markerRegistryRef.current = { hq: [], nodes: [] };
    };
  }, []);

  // Recolor markers, update geodesic Peace Corridor arcs, and animate camera bounds
  useEffect(() => {
    const map = mapInstance.current;
    if (!map) return;

    const currentCode = activeChapter.code;

    // 1. Update HQ beacons
    markerRegistryRef.current.hq.forEach(({ code, marker }) => {
      const emphasized = isRegionalOverview || code === currentCode;
      const hqColor = colorMetric === 'chapter' ? '#E5B80B' : '#00C4CC';
      marker.setIcon(createColoredBeaconIcon('hq', hqColor, emphasized, false));
      marker.setZIndexOffset(emphasized ? 600 : 120);
    });

    // 2. Recolor & filter all 41 civic nodes based on selected Color Lens & Legend filter
    markerRegistryRef.current.nodes.forEach(({ node, marker }) => {
      const inScope = isRegionalOverview || node.countryCode === currentCode;
      const matchesFilter =
        !legendFilter ||
        (colorMetric === 'track'
          ? node.programTrack === legendFilter
          : colorMetric === 'grants'
            ? node.grantTier === legendFilter
            : colorMetric === 'growth'
              ? getGrowthBand(node.growthValue) === legendFilter
              : true);

      const isInspected = inspectedNode?.id === node.id;
      const colorHex = getNodeColor(node, colorMetric, inScope);
      marker.setIcon(
        createColoredBeaconIcon(
          isInspected ? 'lg' : node.size,
          colorHex,
          inScope && matchesFilter,
          !matchesFilter
        )
      );
      marker.setZIndexOffset(isInspected ? 750 : inScope && matchesFilter ? 320 : 0);
    });

    // 3. Draw glowing Peace Corridor arcs
    const corridorLayer = corridorLayerRef.current;
    if (corridorLayer) {
      corridorLayer.clearLayers();
      if (isRegionalOverview) {
        const nairobi = chapters[0]?.capitalLatLng ?? [-1.2921, 36.8219];
        chapters.slice(1).forEach((cap, idx) => {
          const arcPoints = getCurvedArcPoints(nairobi, cap.capitalLatLng, idx % 2 === 0 ? 0.14 : -0.14);
          L.polyline(arcPoints, {
            color: '#00C4CC',
            weight: 1.5,
            opacity: 0.45,
            dashArray: '5 6',
            interactive: false,
          }).addTo(corridorLayer);
        });
      } else {
        const capLatLng = activeChapter.capitalLatLng;
        CIVIC_MAP_NODES.filter((n) => n.countryCode === currentCode).forEach((node, idx) => {
          const matchesFilter =
            !legendFilter ||
            (colorMetric === 'track'
              ? node.programTrack === legendFilter
              : colorMetric === 'grants'
                ? node.grantTier === legendFilter
                : colorMetric === 'growth'
                  ? getGrowthBand(node.growthValue) === legendFilter
                  : true);
          if (!matchesFilter) return;

          const lineColor = getNodeColor(node, colorMetric, true);
          const arcPoints = getCurvedArcPoints(
            capLatLng,
            [node.lat, node.lng],
            idx % 2 === 0 ? 0.08 : -0.08
          );
          L.polyline(arcPoints, {
            color: lineColor,
            weight: 1.15,
            opacity: 0.34,
            dashArray: '4 5',
            interactive: false,
          }).addTo(corridorLayer);
        });
      }
    }
  }, [activeChapter, isRegionalOverview, colorMetric, legendFilter, inspectedNode, chapters]);

  // Render AI Search pins, highlight rings, and connecting vectors directly on Leaflet map
  useEffect(() => {
    const map = mapInstance.current;
    const aiLayer = aiSearchLayerRef.current;
    if (!map || !aiLayer) return;

    aiLayer.clearLayers();
    if (!aiResult) return;

    const matchedNodes = CIVIC_MAP_NODES.filter((n) => aiResult.matchedNodeIds.includes(n.id));

    matchedNodes.forEach((node) => {
      L.circleMarker([node.lat, node.lng], {
        radius: 14,
        color: '#E5B80B',
        weight: 2,
        opacity: 0.9,
        fillColor: '#00C4CC',
        fillOpacity: 0.18,
        dashArray: '4 3',
        interactive: false,
      }).addTo(aiLayer);
    });

    aiResult.mapPoints.forEach((pt) => {
      const aiPinIcon = L.divIcon({
        className: 'custom-star-icon',
        html: `<div style="width:20px;height:20px;border-radius:9999px;background:#00C4CC;border:2.5px solid #ffffff;box-shadow:0 0 0 4px rgba(229,184,11,0.42),0 0 18px #00C4CC;display:flex;align-items:center;justify-content:center;"><span style="width:6px;height:6px;border-radius:9999px;background:#071120;"></span></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      const marker = L.marker([pt.lat, pt.lng], {
        icon: aiPinIcon,
        zIndexOffset: 950,
      }).addTo(aiLayer);

      marker.bindTooltip(
        `
          <div class="flex items-center justify-between gap-3 mb-1">
            <span class="font-mono text-[9px] text-[#00C4CC] tracking-widest uppercase">${pt.category}</span>
            <span class="text-[8.5px] font-black uppercase px-1.5 py-0.5 rounded bg-[#E5B80B] text-black">${pt.metricLabel}</span>
          </div>
          <div class="font-extrabold text-[13px] text-white tracking-tight uppercase mb-1">${pt.title}</div>
          <div class="text-[10px] text-gray-200 leading-snug max-w-[230px]">${pt.summary}</div>
        `,
        { className: 'custom-map-hud', direction: 'top', sticky: true, opacity: 1 }
      );
    });
  }, [aiResult]);

  // Trigger camera transition when chapter or regional mode changes
  useEffect(() => {
    const map = mapInstance.current;
    if (!map) return;

    if (suppressNextScopeFlyRef.current) {
      suppressNextScopeFlyRef.current = false;
      return;
    }

    if (!hasFlownRef.current && !isRegionalOverview) {
      map.setView(activeChapter.capitalLatLng, 10, { animate: false });
      return;
    }

    hasFlownRef.current = true;
    flyToScopeBounds(map, activeChapter, isRegionalOverview, 1.45);
  }, [activeChapter, isRegionalOverview]);

  const toggleLock = () => {
    const map = mapInstance.current;
    if (!map) return;
    if (map.dragging.enabled()) {
      map.dragging.disable();
      map.scrollWheelZoom.disable();
      map.doubleClickZoom.disable();
      setIsMapUnlocked(false);
    } else {
      map.dragging.enable();
      map.scrollWheelZoom.enable();
      map.doubleClickZoom.enable();
      setIsMapUnlocked(true);
    }
  };

  const handleZoomStep = (delta: number) => {
    const map = mapInstance.current;
    if (!map) return;
    if (delta > 0) map.zoomIn(1);
    else map.zoomOut(1);
  };

  const handleRecenter = () => {
    const map = mapInstance.current;
    if (!map) return;
    setInspectedNode(null);
    flyToScopeBounds(map, activeChapter, isRegionalOverview, 1.1);
  };

  const handleFocusInspectedNode = (node: CivicMapNode) => {
    const map = mapInstance.current;
    if (!map) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    map.flyTo([node.lat, node.lng], 11, {
      animate: !prefersReducedMotion,
      duration: 1.2,
    });
  };

  const flyToCoordinatesList = (coords: Array<[number, number]>) => {
    const map = mapInstance.current;
    if (!map || coords.length === 0) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktop = window.innerWidth >= 768;
    map.invalidateSize({ animate: false });

    if (coords.length === 1) {
      map.flyTo(coords[0], 9, {
        animate: !prefersReducedMotion,
        duration: 1.25,
      });
      return;
    }

    const bounds = L.latLngBounds(coords);
    const paddingTopLeft: [number, number] = isDesktop ? [340, 118] : [18, 130];
    const paddingBottomRight: [number, number] = isDesktop ? [410, 135] : [18, 190];
    if (prefersReducedMotion) {
      map.fitBounds(bounds, { paddingTopLeft, paddingBottomRight, maxZoom: 10, animate: false });
    } else {
      map.flyToBounds(bounds, {
        paddingTopLeft,
        paddingBottomRight,
        maxZoom: 10,
        animate: true,
        duration: 1.35,
      });
    }
  };

  const handleRunAiSearch = async (overrideQuery?: string) => {
    const q = (overrideQuery ?? searchQuery).trim();
    if (!q || isSearching) return;

    if (overrideQuery !== undefined) setSearchQuery(overrideQuery);
    setIsSearching(true);
    setSearchError(null);

    try {
      const res = await fetch('/api/map-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: q,
          activeCountryCode: activeChapter.code,
          isRegionalOverview,
          colorMetric,
        }),
      });
      const payload = await res.json();
      if (!res.ok) {
        throw new Error(payload?.error || 'AI map search failed.');
      }

      const result = payload as AiMapSearchResult;
      setAiResult(result);
      setInspectedNode(null);

      // Build coordinates to frame on map
      const matchedNodes = CIVIC_MAP_NODES.filter((n) =>
        result.matchedNodeIds.includes(n.id)
      );
      const pinCoords: Array<[number, number]> = [
        ...matchedNodes.map((n) => [n.lat, n.lng] as [number, number]),
        ...result.mapPoints.map((pt) => [pt.lat, pt.lng] as [number, number]),
      ];

      if (pinCoords.length > 0) {
        suppressNextScopeFlyRef.current = true;
      }

      if (result.recommendedChapterCode === 'ALL') {
        setIsRegionalOverview(true);
      } else if (
        result.recommendedChapterCode &&
        result.recommendedChapterCode !== 'NONE'
      ) {
        const chIdx = chapters.findIndex((c) => c.code === result.recommendedChapterCode);
        if (chIdx !== -1) {
          setIsRegionalOverview(false);
          onSelectCountry?.(chIdx);
        }
      }

      if (
        result.recommendedMetric === 'track' ||
        result.recommendedMetric === 'grants' ||
        result.recommendedMetric === 'growth' ||
        result.recommendedMetric === 'chapter'
      ) {
        setColorMetric(result.recommendedMetric);
        setLegendFilter(null);
      }

      if (pinCoords.length > 0) {
        hasFlownRef.current = true;
        flyToCoordinatesList(pinCoords);
      }
    } catch (err: unknown) {
      setSearchError(err instanceof Error ? err.message : 'Unable to reach AI search.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleClearAiSearch = () => {
    setSearchQuery('');
    setAiResult(null);
    setSearchError(null);
  };

  const handleDownloadMetricsPdf = () => {
    const scopeTitle = isRegionalOverview ? 'East Africa Regional Corridor' : activeChapter.name;
    const colorMetricLabel =
      colorMetric === 'track'
        ? 'Program Track'
        : colorMetric === 'grants'
          ? 'Grant Pool Tier'
          : colorMetric === 'growth'
            ? 'YoY Growth Velocity'
            : 'Chapter Focus';

    const activeFilterLabel = legendFilter
      ? legendItems.find((item) => item.key === legendFilter)?.label ?? legendFilter
      : null;

    downloadPamojaMetricsPdf({
      scopeTitle,
      jurisdictionLabel,
      colorMetricLabel,
      activeFilterLabel,
      totalYouthLabel: visibleTelemetry.youthLabel,
      totalProjects: visibleTelemetry.projectsTotal,
      avgGrowthLabel: visibleTelemetry.avgGrowth,
      chapters,
      nodes: visibleTelemetry.matchingNodes,
      aiBrief: aiResult
        ? {
            query: aiResult.query,
            headline: aiResult.headline,
            answer: aiResult.answer,
          }
        : null,
    });

    setPdfExported(true);
    window.setTimeout(() => setPdfExported(false), 2200);
  };

  const handleNavigateSection3 = (
    e: React.MouseEvent<HTMLAnchorElement>,
    mode: 'platform' | 'action-hub' | 'library'
  ) => {
    e.preventDefault();
    if (onNavigateToSection3) {
      onNavigateToSection3(mode);
      return;
    }
    const el = document.getElementById('section-excellence');
    const container = document.getElementById('pamoja-root-container');
    if (el && container) container.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
    else if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleStepChapter = (delta: number) => {
    setIsRegionalOverview(false);
    setInspectedNode(null);
    const nextIdx = (selectedCountryIdx + delta + chapters.length) % chapters.length;
    onSelectCountry?.(nextIdx);
  };

  const handleSelectChapter = (idx: number) => {
    setIsRegionalOverview(false);
    setInspectedNode(null);
    onSelectCountry?.(idx);
  };

  const activeCoordsLabel = isRegionalOverview
    ? REGIONAL_OVERVIEW_VIEW.tickerCoords
    : activeChapter.tickerCoords;
  const activeSubtitleLabel = isRegionalOverview
    ? REGIONAL_OVERVIEW_VIEW.tickerSubtitle
    : activeChapter.tickerSubtitle;
  const activeDescription = isRegionalOverview
    ? REGIONAL_OVERVIEW_VIEW.description
    : activeChapter.description;
  const jurisdictionLabel = isRegionalOverview
    ? REGIONAL_OVERVIEW_VIEW.jurisdictionLabel
    : activeChapter.jurisdictionLabel;

  return (
    <div
      ref={sectionRef}
      className="snap-section relative transition-colors duration-700 z-10 h-[100dvh] min-h-[100dvh] max-h-[100dvh] overflow-hidden flex flex-col justify-between"
      id="section-map"
      style={{ backgroundColor: isLightMode ? '#f1f5f9' : '#0a1729' }}
    >
      <style>{`
        .custom-map-hud {
          background: #071120 !important;
          border: 1px solid #1e3a5f !important;
          border-left: 4px solid #E5B80B !important;
          border-radius: 8px !important;
          padding: 12px 16px !important;
          color: #ffffff !important;
          box-shadow: 0 14px 36px rgba(0, 0, 0, 0.9) !important;
        }
        .leaflet-tooltip-pane { z-index: 1000 !important; }
        .leaflet-marker-pane { z-index: 900 !important; }
        .leaflet-tooltip-left:before, .leaflet-tooltip-right:before, .leaflet-tooltip-top:before, .leaflet-tooltip-bottom:before { display: none; }
        #section-map .leaflet-tile-pane {
          filter: ${
            isLightMode
              ? 'saturate(0.68) hue-rotate(8deg) contrast(1.06) brightness(0.98)'
              : 'invert(1) hue-rotate(195deg) brightness(0.88) contrast(1.18) saturate(1.45)'
          };
          transition: filter 0.5s ease;
        }
      `}</style>

      {/* Map Wrapper with Overflow and Crossfade Mask */}
      <div
        className="absolute left-0 right-0 bottom-0 overflow-hidden pointer-events-none z-0"
        style={{
          top: '-15vh',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, black 15vh, black 100%)',
          maskImage:
            'linear-gradient(to bottom, transparent 0%, black 15vh, black 100%)',
        }}
      >
        <div id="map" ref={mapRef} className="absolute inset-0 z-0 pointer-events-auto"></div>

        {/* EDGE-ONLY VIGNETTE */}
        <div
          className="absolute inset-0 pointer-events-none z-10 transition-colors duration-700"
          style={{
            background: isLightMode
              ? 'linear-gradient(to bottom, rgba(241, 245, 249, 0.92) 0%, rgba(241, 245, 249, 0.58) 18%, rgba(241, 245, 249, 0) 35%, rgba(244, 247, 251, 0) 68%, rgba(244, 247, 251, 0.94) 100%)'
              : 'linear-gradient(to bottom, rgba(10, 23, 41, 0.82) 0%, rgba(10, 23, 41, 0) 27%, rgba(5, 5, 5, 0) 71%, rgba(5, 5, 5, 0.92) 100%)',
          }}
        ></div>
      </div>

      {/* BOTTOM CURTAIN */}
      <div
        className="absolute bottom-0 left-0 w-full h-24 sm:h-48 z-[15] pointer-events-none transition-colors duration-700"
        style={{
          background: isLightMode
            ? 'linear-gradient(to top, #f4f7fb 0%, #f4f7fb 18%, transparent 100%)'
            : 'linear-gradient(to top, #050505 0%, #050505 15%, transparent 100%)',
        }}
      ></div>

      <main className="content-layer px-3 pt-1.5 pb-2 sm:px-6 md:px-12 md:pt-5 md:pb-6 h-full min-h-0 flex flex-col justify-between overflow-hidden relative z-30">
        {/* TOP HUD */}
        <div className="w-full animate-fade-in-up z-40 flex-shrink-0">
          <div
            className={`marquee-strip border-t border-b backdrop-blur-none transition-colors duration-500 ${
              isLightMode
                ? 'border-[#003355]/25 !bg-white'
                : 'border-[#00C4CC]/35 !bg-[#050c17]'
            }`}
          >
            <div className="flex whitespace-nowrap animate-scroll-ticker">
              <div
                className={`flex items-center gap-10 sm:gap-12 px-4 sm:px-6 text-[7.5px] sm:text-[8px] md:text-[9px] font-mono tracking-[0.24em] sm:tracking-[0.3em] uppercase ${
                  isLightMode ? 'text-[#003355] font-bold' : 'text-[#E5B80B] font-semibold'
                }`}
              >
                <span>Grassroots Peace Forums</span> •{' '}
                <span>SDG 16 Accountability</span> •{' '}
                <span>Civic Innovation Grants</span> •{' '}
                <span>Youth Mentorship</span> •{' '}
                <span>East Africa Peace Corridors</span>
              </div>
            </div>
          </div>

          {/* MOBILE HORIZONTAL AI SEARCH BAR + METRICS PDF (Tray-free Hero White, Sky Blue & Yellow Pills) */}
          <div className="flex md:hidden items-center gap-1.5 w-full mb-1 pointer-events-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleRunAiSearch();
              }}
              className={`flex-1 min-w-0 flex items-center gap-1 rounded-full bg-white text-[#0b1120] border pl-2.5 pr-1 py-0.5 shadow-md ${
                isLightMode ? 'border-[#003355]/25' : 'border-white'
              }`}
            >
              <Sparkles className="w-3 h-3 text-[#00C4CC] shrink-0" />
              <input
                id="map-ai-search-input-mobile"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ask AI or search map..."
                aria-label="AI Map Search"
                className="flex-1 min-w-0 bg-transparent text-[9.5px] font-bold text-[#0b1120] placeholder:text-slate-500 focus:outline-none"
              />
              {(searchQuery || aiResult) && (
                <button
                  type="button"
                  onClick={handleClearAiSearch}
                  aria-label="Clear search"
                  className="w-4 h-4 rounded-full bg-[#e2e8f0] text-[#0b1120] flex items-center justify-center shrink-0 cursor-pointer"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              )}
              <button
                type="submit"
                disabled={isSearching}
                aria-label="Submit AI search"
                className="rounded-full bg-[#00C4CC] text-black hover:bg-[#E5B80B] px-2 py-0.5 text-[8px] font-black uppercase tracking-wider shrink-0 flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-60"
              >
                {isSearching ? (
                  <Loader2 className="w-2.5 h-2.5 animate-spin" />
                ) : (
                  <Search className="w-2.5 h-2.5" />
                )}
                <span>Ask</span>
              </button>
            </form>

            <button
              id="btn-download-metrics-pdf-mobile"
              type="button"
              onClick={handleDownloadMetricsPdf}
              title="Download Metrics PDF Report"
              className="shrink-0 flex items-center gap-1 rounded-full bg-[#E5B80B] text-black border border-[#E5B80B] hover:bg-white hover:border-white px-2.5 py-1 text-[8px] font-black uppercase tracking-wider shadow-md transition-colors cursor-pointer"
            >
              {pdfExported ? (
                <Check className="w-3 h-3 shrink-0" />
              ) : (
                <FileDown className="w-3 h-3 shrink-0" />
              )}
              <span>{pdfExported ? 'Saved' : 'Metrics PDF'}</span>
            </button>
          </div>

          {searchError && (
            <div
              role="alert"
              className="flex md:hidden items-center justify-between gap-2 w-full rounded-xl border border-rose-500/60 bg-[#071120] text-white px-2.5 py-1 mb-1 text-[9px] font-semibold shadow-md pointer-events-auto"
            >
              <span className="truncate">{searchError}</span>
              <button
                type="button"
                onClick={() => setSearchError(null)}
                className="w-4 h-4 rounded-full bg-white text-black flex items-center justify-center shrink-0 cursor-pointer"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </div>
          )}

          <div className="flex items-start justify-between gap-3 md:gap-8 mt-0.5 sm:mt-2.5">
            <div className="text-left min-w-0 flex-1">
              {/* Mobile horizontal compact title + action badge | Desktop stacked display title */}
              <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5 sm:block">
                <h1
                  className={`font-extrabold uppercase tracking-tighter transition-colors duration-500 text-[clamp(1.12rem,4.7vw,1.5rem)] leading-none sm:text-[clamp(2.25rem,min(7.2vw,5.2dvh),4.1rem)] sm:leading-[0.84] ${
                    isLightMode ? 'text-[#00223b]' : 'text-white'
                  }`}
                >
                  <span className="inline sm:block mr-1.5 sm:mr-0">PAMOJA 16</span>
                  <span className="inline sm:block mr-1.5 sm:mr-0 sm:my-1">CIVIC</span>
                  <span className="inline sm:block">COMMAND</span>
                </h1>

                <div
                  className={`sm:mt-2.5 pl-2 sm:pl-4 border-l-2 transition-colors duration-500 ${
                    isLightMode ? 'border-[#008b91]' : 'border-[#E5B80B]'
                  }`}
                >
                  <p
                    className={`text-[8.5px] sm:text-[10px] md:text-[11px] font-bold tracking-[0.18em] sm:tracking-[0.26em] uppercase whitespace-nowrap transition-colors duration-500 ${
                      isLightMode ? 'text-[#006e74]' : 'text-[#E5B80B]'
                    }`}
                  >
                    Live Action Map •{' '}
                    {isRegionalOverview ? 'East Africa' : activeChapter.name}
                  </p>
                </div>
              </div>

              {/* FULL-WIDTH HORIZONTAL COLOR LENS + INTERACTIVE LEGEND (Tray-free Hero White / Yellow / Sky Blue Pills) */}
              <div
                className="mt-1.5 sm:mt-2.5 flex flex-col gap-1.5 pointer-events-auto w-full sm:w-fit"
                id="map-metric-lens"
              >
                <div className="grid grid-cols-4 sm:flex sm:flex-wrap items-center gap-1.5 w-full sm:w-auto">
                  <span
                    className={`hidden sm:inline text-[8.5px] font-mono font-extrabold uppercase tracking-[0.18em] pr-1 ${
                      isLightMode
                        ? 'text-[#00223b]'
                        : 'text-[#E5B80B] drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]'
                    }`}
                  >
                    Color Lens:
                  </span>
                  {(
                    [
                      { id: 'track', label: 'Track' },
                      { id: 'grants', label: 'Grants' },
                      { id: 'growth', label: 'Growth' },
                      { id: 'chapter', label: 'Chapter' },
                    ] as Array<{ id: ColorMetricMode; label: string }>
                  ).map((lens) => {
                    const isActiveLens = colorMetric === lens.id;
                    return (
                      <button
                        key={lens.id}
                        type="button"
                        onClick={() => handleChangeMetric(lens.id)}
                        className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border text-[8.5px] sm:text-[9px] font-black uppercase tracking-wider text-center transition-all duration-200 cursor-pointer ${
                          isActiveLens
                            ? 'bg-[#00C4CC] text-black border-[#00C4CC] shadow-[0_0_12px_rgba(0,196,204,0.45)]'
                            : `bg-white text-[#0b1120] hover:bg-[#E5B80B] hover:border-[#E5B80B] shadow-md ${
                                isLightMode ? 'border-[#003355]/25' : 'border-white'
                              }`
                        }`}
                      >
                        {lens.label}
                      </button>
                    );
                  })}
                </div>

                {/* Live Interactive Color Key (Tray-free Hero Matte White / Yellow Pills) */}
                <div className="flex items-center justify-between sm:justify-start flex-wrap gap-1.5 w-full sm:w-fit">
                  <div className="flex items-center flex-wrap gap-1 sm:gap-1.5">
                    {legendItems.map((item) => {
                      const isSelectedFilter = legendFilter === item.key;
                      const isOtherFiltered = Boolean(legendFilter && legendFilter !== item.key);
                      return (
                        <button
                          key={item.key}
                          type="button"
                          disabled={!item.filterable}
                          onClick={() => {
                            if (!item.filterable) return;
                            setLegendFilter((prev) => (prev === item.key ? null : item.key));
                          }}
                          title={
                            item.filterable
                              ? `Filter map nodes by ${item.title}`
                              : item.title
                          }
                          className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[8px] sm:text-[8.5px] font-extrabold tracking-wide transition-all ${
                            item.filterable ? 'cursor-pointer' : 'cursor-default'
                          } ${
                            isSelectedFilter
                              ? 'bg-[#E5B80B] text-black border-[#E5B80B] font-black shadow-md opacity-100'
                              : isOtherFiltered
                                ? `bg-white text-[#0b1120] opacity-65 hover:opacity-100 shadow-sm ${
                                    isLightMode ? 'border-[#003355]/25' : 'border-white'
                                  }`
                                : `bg-white text-[#0b1120] hover:bg-[#e0f2fe] opacity-100 shadow-md ${
                                    isLightMode ? 'border-[#003355]/25' : 'border-white'
                                  }`
                          }`}
                        >
                          <span
                            className="w-2 h-2 rounded-full shrink-0 ring-1 ring-black/25"
                            style={{
                              backgroundColor: item.color,
                            }}
                          />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {legendFilter && (
                    <button
                      type="button"
                      onClick={() => setLegendFilter(null)}
                      className="text-[8px] sm:text-[8.5px] font-mono font-black uppercase px-2.5 py-0.5 rounded-full bg-[#00C4CC] text-black border border-[#00C4CC] hover:bg-white hover:border-white transition-colors shadow-md cursor-pointer"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* TOP-RIGHT AI SEARCH BAR + METRICS PDF + RESULT/SPOTLIGHT CARDS */}
            <div className="flex flex-col items-end gap-2.5 shrink-0 pointer-events-auto">
              <div className="hidden md:flex items-center justify-end gap-2 md:mt-1">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleRunAiSearch();
                  }}
                  className={`w-[265px] lg:w-[345px] flex items-center gap-1.5 rounded-full bg-white text-[#0b1120] border pl-3 pr-1 py-1 shadow-lg transition-all ${
                    isLightMode ? 'border-[#003355]/25' : 'border-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#00C4CC] shrink-0" />
                  <input
                    id="map-ai-search-input-desktop"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Ask AI about hubs, grants, SDG 16..."
                    aria-label="AI Powered Map Search"
                    className="flex-1 min-w-0 bg-transparent text-[11px] font-bold text-[#0b1120] placeholder:text-slate-500 focus:outline-none"
                  />
                  {(searchQuery || aiResult) && (
                    <button
                      type="button"
                      onClick={handleClearAiSearch}
                      aria-label="Clear search"
                      className="w-5 h-5 rounded-full bg-[#e2e8f0] hover:bg-[#E5B80B] text-[#0b1120] flex items-center justify-center shrink-0 transition-colors cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={isSearching}
                    className="rounded-full bg-[#00C4CC] text-black hover:bg-[#E5B80B] px-3 py-1 text-[9.5px] font-black uppercase tracking-wider shrink-0 flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-60"
                  >
                    {isSearching ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <Search className="w-3 h-3" />
                    )}
                    <span>{isSearching ? 'Searching' : 'Ask AI'}</span>
                  </button>
                </form>

                <button
                  id="btn-download-metrics-pdf-desktop"
                  type="button"
                  onClick={handleDownloadMetricsPdf}
                  title="Download Current Scope Metrics as PDF"
                  className="shrink-0 flex items-center gap-1.5 rounded-full bg-[#E5B80B] text-black border border-[#E5B80B] hover:bg-white hover:border-white px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider shadow-lg transition-colors cursor-pointer"
                >
                  {pdfExported ? (
                    <Check className="w-3.5 h-3.5 shrink-0" />
                  ) : (
                    <FileDown className="w-3.5 h-3.5 shrink-0" />
                  )}
                  <span>{pdfExported ? 'PDF Saved' : 'Metrics PDF'}</span>
                </button>
              </div>

              {searchError && (
                <div
                  role="alert"
                  className="hidden md:flex pointer-events-auto max-w-[420px] rounded-xl border border-rose-500/60 bg-[#071120] text-white px-3 py-2 text-[10px] font-semibold items-center justify-between gap-2 shadow-lg"
                >
                  <span>{searchError}</span>
                  <button
                    type="button"
                    onClick={() => setSearchError(null)}
                    className="w-4 h-4 rounded-full bg-white text-black flex items-center justify-center shrink-0 cursor-pointer"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </div>
              )}

              {/* DESKTOP AI INTELLIGENCE RESULT PANEL */}
              {aiResult && (
                <div
                  id="map-ai-result-card"
                  className={`hidden md:flex flex-col gap-2 pointer-events-auto w-[345px] lg:w-[400px] max-h-[38dvh] overflow-y-auto rounded-2xl border p-3 transition-all duration-300 ${
                    isLightMode
                      ? 'bg-white border-[#003355]/30 text-[#0f172a] shadow-[0_14px_34px_rgba(15,23,42,0.18)]'
                      : 'bg-[#071120] border-[#00C4CC]/60 text-white shadow-[0_14px_36px_rgba(0,0,0,0.92)]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-[#00C4CC] shrink-0" />
                        <span
                          className={`text-[8.5px] font-mono font-bold uppercase tracking-widest truncate ${
                            isLightMode ? 'text-[#006e74]' : 'text-[#00C4CC]'
                          }`}
                        >
                          AI Map Intel • {aiResult.matchedNodeIds.length + aiResult.mapPoints.length} Mapped
                        </span>
                      </div>
                      <h3 className="text-xs sm:text-sm font-extrabold tracking-tight uppercase mt-0.5 leading-snug">
                        {aiResult.headline}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={handleClearAiSearch}
                      aria-label="Close AI result"
                      className="w-5 h-5 rounded-full bg-[#00C4CC] text-black hover:bg-[#E5B80B] text-xs font-black flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>

                  <p
                    className={`text-[10.5px] leading-relaxed ${
                      isLightMode ? 'text-[#1e293b]' : 'text-slate-200'
                    }`}
                  >
                    {aiResult.answer}
                  </p>

                  {aiResult.keyMetrics.length > 0 && (
                    <div className="grid grid-cols-2 gap-1.5">
                      {aiResult.keyMetrics.map((m, i) => (
                        <div
                          key={`${m.label}-${i}`}
                          className={`rounded-lg border px-2 py-1 ${
                            isLightMode
                              ? 'bg-[#f8fafc] border-[#cbd5e1]'
                              : 'bg-[#0f223d] border-[#1e3a5f]'
                          }`}
                        >
                          <div className="text-[7.5px] uppercase tracking-wider opacity-70 font-bold truncate">
                            {m.label}
                          </div>
                          <div className="text-[10px] font-extrabold tabular-nums truncate">
                            {m.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {(aiResult.matchedNodeIds.length > 0 || aiResult.mapPoints.length > 0) && (
                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {CIVIC_MAP_NODES.filter((n) =>
                        aiResult.matchedNodeIds.includes(n.id)
                      ).map((node) => (
                        <button
                          key={node.id}
                          type="button"
                          onClick={() => {
                            setInspectedNode(node);
                            handleFocusInspectedNode(node);
                          }}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white text-[#0b1120] border border-[#cbd5e1] hover:bg-[#E5B80B] hover:border-[#E5B80B] text-[8.5px] font-black transition-colors cursor-pointer"
                        >
                          <MapPin className="w-2.5 h-2.5 text-[#00C4CC]" />
                          <span>{node.loc}</span>
                        </button>
                      ))}
                      {aiResult.mapPoints.map((pt, idx) => (
                        <button
                          key={`${pt.title}-${idx}`}
                          type="button"
                          onClick={() => flyToCoordinatesList([[pt.lat, pt.lng]])}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#00C4CC] text-black hover:bg-[#E5B80B] text-[8.5px] font-black transition-colors cursor-pointer"
                        >
                          <MapPin className="w-2.5 h-2.5" />
                          <span>{pt.title}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {aiResult.sources.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1 border-t border-white/10">
                      {aiResult.sources.map((src, i) => (
                        <a
                          key={`${src.url}-${i}`}
                          href={src.url}
                          target="_blank"
                          rel="noreferrer"
                          className={`inline-flex items-center gap-1 text-[8.5px] font-bold underline underline-offset-2 ${
                            isLightMode
                              ? 'text-[#006e74] hover:text-[#00223b]'
                              : 'text-[#00C4CC] hover:text-[#E5B80B]'
                          }`}
                        >
                          <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                          <span className="truncate max-w-[150px]">{src.title}</span>
                        </a>
                      ))}
                    </div>
                  )}

                  {aiResult.suggestedQueries.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {aiResult.suggestedQueries.map((sq) => (
                        <button
                          key={sq}
                          type="button"
                          onClick={() => handleRunAiSearch(sq)}
                          className="px-2 py-0.5 rounded-full bg-[#E5B80B] text-black hover:bg-white text-[8px] font-black transition-colors cursor-pointer"
                        >
                          {sq}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* CLICK-TO-INSPECT HUB SPOTLIGHT CARD (Desktop Top-Right, Full Matte) */}
              {inspectedNode && (
                <div
                  id="map-node-spotlight"
                  className={`hidden md:block pointer-events-auto w-[250px] rounded-xl border p-3 transition-all duration-300 ${
                    isLightMode
                      ? 'bg-white border-[#003355]/30 text-[#0f172a] shadow-[0_14px_34px_rgba(15,23,42,0.18)]'
                      : 'bg-[#071120] border-[#00C4CC]/60 text-white shadow-[0_14px_36px_rgba(0,0,0,0.9)]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{
                            backgroundColor:
                              PROGRAM_TRACK_META[inspectedNode.programTrack].color,
                          }}
                        />
                        <span
                          className={`text-[8.5px] font-mono uppercase tracking-widest truncate ${
                            isLightMode ? 'text-[#006e74]' : 'text-[#00C4CC]'
                          }`}
                        >
                          {inspectedNode.countryName} • {inspectedNode.sdgTarget}
                        </span>
                      </div>
                      <h3 className="text-xs sm:text-sm font-extrabold tracking-tight uppercase mt-0.5 truncate">
                        {inspectedNode.loc}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setInspectedNode(null)}
                      aria-label="Close node inspector"
                      className="w-5 h-5 rounded-full bg-[#00C4CC] text-black hover:bg-[#E5B80B] text-xs font-black flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                    >
                      ×
                    </button>
                  </div>

                  <p
                    className={`text-[9.5px] font-semibold mt-0.5 ${
                      isLightMode ? 'text-[#334155]' : 'text-white/70'
                    }`}
                  >
                    {PROGRAM_TRACK_META[inspectedNode.programTrack].label}
                  </p>

                  <div
                    className={`grid grid-cols-2 gap-2 mt-2.5 pt-2 border-t ${
                      isLightMode ? 'border-[#003355]/15' : 'border-white/10'
                    }`}
                  >
                    <div>
                      <div className="text-[8px] uppercase tracking-wider opacity-65 font-bold">
                        Youth Reached
                      </div>
                      <div className="text-xs font-extrabold tabular-nums">
                        {formatYouthCompact(inspectedNode.youthCount)}
                      </div>
                    </div>
                    <div>
                      <div className="text-[8px] uppercase tracking-wider opacity-65 font-bold">
                        YoY Growth
                      </div>
                      <div
                        className={`text-xs font-extrabold tabular-nums ${
                          isLightMode ? 'text-[#006e74]' : 'text-[#00C4CC]'
                        }`}
                      >
                        +{inspectedNode.growth}
                      </div>
                    </div>
                    <div>
                      <div className="text-[8px] uppercase tracking-wider opacity-65 font-bold">
                        Grant Pool
                      </div>
                      <div
                        className={`text-xs font-extrabold tabular-nums ${
                          isLightMode ? 'text-[#9a6b00]' : 'text-[#E5B80B]'
                        }`}
                      >
                        {inspectedNode.price}
                      </div>
                    </div>
                    <div>
                      <div className="text-[8px] uppercase tracking-wider opacity-65 font-bold">
                        Projects
                      </div>
                      <div className="text-xs font-extrabold tabular-nums">
                        {inspectedNode.activeProjects} Active
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 mt-2.5">
                    <button
                      type="button"
                      onClick={() => handleFocusInspectedNode(inspectedNode)}
                      className="flex-1 py-1 px-3 rounded-full bg-[#E5B80B] text-black hover:bg-white border border-[#E5B80B] hover:border-white text-[9px] font-black uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
                    >
                      Zoom to Hub
                    </button>
                    <button
                      type="button"
                      onClick={handleRecenter}
                      className="py-1 px-3 rounded-full bg-white text-[#0b1120] border border-[#cbd5e1] hover:bg-[#00C4CC] hover:border-[#00C4CC] text-[9px] font-black uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* BOTTOM HUD */}
        <div className="flex flex-col gap-1 sm:gap-1.5 w-full opacity-0 animate-fade-in-up z-40 mt-auto" style={{ animationDelay: '500ms' }}>
          {/* MOBILE COMPACT AI RESULT DRAWER */}
          {aiResult && !inspectedNode && (
            <div
              className={`md:hidden pointer-events-auto w-full max-h-[24dvh] overflow-y-auto rounded-xl border px-2.5 py-2 flex flex-col gap-1.5 ${
                isLightMode
                  ? 'bg-white border-[#003355]/30 text-[#0f172a] shadow-lg'
                  : 'bg-[#071120] border-[#00C4CC]/60 text-white shadow-[0_12px_28px_rgba(0,0,0,0.88)]'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-[#00C4CC] shrink-0" />
                    <span className="text-[10px] font-black uppercase tracking-tight truncate">
                      {aiResult.headline}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {(aiResult.matchedNodeIds.length > 0 || aiResult.mapPoints.length > 0) && (
                    <button
                      type="button"
                      onClick={() => {
                        const pts: Array<[number, number]> = [
                          ...CIVIC_MAP_NODES.filter((n) =>
                            aiResult.matchedNodeIds.includes(n.id)
                          ).map((n) => [n.lat, n.lng] as [number, number]),
                          ...aiResult.mapPoints.map((pt) => [pt.lat, pt.lng] as [number, number]),
                        ];
                        flyToCoordinatesList(pts);
                      }}
                      className="px-2 py-0.5 rounded-full bg-[#E5B80B] text-black text-[7.5px] font-black uppercase tracking-wider cursor-pointer"
                    >
                      Focus Map
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleClearAiSearch}
                    aria-label="Close AI result"
                    className="w-4 h-4 rounded-full bg-[#00C4CC] text-black text-[10px] font-black flex items-center justify-center cursor-pointer"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </div>
              </div>
              <p
                className={`text-[9px] leading-snug ${
                  isLightMode ? 'text-[#1e293b]' : 'text-slate-200'
                }`}
              >
                {aiResult.answer}
              </p>
              {aiResult.keyMetrics.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {aiResult.keyMetrics.map((m, i) => (
                    <span
                      key={`${m.label}-${i}`}
                      className="px-2 py-0.5 rounded-full bg-white text-[#0b1120] border border-[#cbd5e1] text-[7.5px] font-extrabold"
                    >
                      {m.label}: {m.value}
                    </span>
                  ))}
                </div>
              )}
              {(aiResult.matchedNodeIds.length > 0 || aiResult.mapPoints.length > 0) && (
                <div className="flex items-center gap-1 overflow-x-auto hide-scroll">
                  {CIVIC_MAP_NODES.filter((n) => aiResult.matchedNodeIds.includes(n.id)).map(
                    (node) => (
                      <button
                        key={node.id}
                        type="button"
                        onClick={() => {
                          setInspectedNode(node);
                          handleFocusInspectedNode(node);
                        }}
                        className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#00C4CC] text-black text-[7.5px] font-black cursor-pointer"
                      >
                        <MapPin className="w-2 h-2" />
                        <span>{node.loc}</span>
                      </button>
                    )
                  )}
                  {aiResult.mapPoints.map((pt, idx) => (
                    <button
                      key={`${pt.title}-${idx}`}
                      type="button"
                      onClick={() => flyToCoordinatesList([[pt.lat, pt.lng]])}
                      className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#E5B80B] text-black text-[7.5px] font-black cursor-pointer"
                    >
                      <MapPin className="w-2 h-2" />
                      <span>{pt.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* MOBILE COMPACT HORIZONTAL HUB SPOTLIGHT DRAWER (Full Matte) */}
          {inspectedNode && (
            <div
              className={`md:hidden pointer-events-auto w-full rounded-lg border px-2.5 py-1.5 flex items-center justify-between gap-2 ${
                isLightMode
                  ? 'bg-white border-[#003355]/30 text-[#0f172a] shadow-lg'
                  : 'bg-[#071120] border-[#00C4CC]/60 text-white shadow-[0_12px_28px_rgba(0,0,0,0.85)]'
              }`}
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{
                      backgroundColor: PROGRAM_TRACK_META[inspectedNode.programTrack].color,
                    }}
                  />
                  <span className="text-[10.5px] font-extrabold uppercase tracking-tight truncate">
                    {inspectedNode.loc}
                  </span>
                  <span
                    className={`text-[7.5px] font-mono uppercase px-1 rounded shrink-0 ${
                      isLightMode ? 'bg-[#e2e8f0] text-[#003355]' : 'bg-[#0f223d] text-[#00C4CC]'
                    }`}
                  >
                    {inspectedNode.sdgTarget}
                  </span>
                </div>
                <div className="flex items-center flex-wrap gap-x-2.5 gap-y-0.5 text-[8.5px] font-bold mt-0.5 tabular-nums">
                  <span>{formatYouthCompact(inspectedNode.youthCount)} Youth</span>
                  <span className={isLightMode ? 'text-[#006e74]' : 'text-[#00C4CC]'}>
                    +{inspectedNode.growth}
                  </span>
                  <span className={isLightMode ? 'text-[#9a6b00]' : 'text-[#E5B80B]'}>
                    {inspectedNode.price}
                  </span>
                  <span className="opacity-85">{inspectedNode.activeProjects} Active</span>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => handleFocusInspectedNode(inspectedNode)}
                  className="px-2.5 py-1 rounded-full bg-[#E5B80B] text-black hover:bg-white text-[8px] font-black uppercase tracking-wider shadow-xs cursor-pointer"
                >
                  Zoom
                </button>
                <button
                  type="button"
                  onClick={handleRecenter}
                  className="px-2.5 py-1 rounded-full bg-white text-[#0b1120] border border-[#cbd5e1] hover:bg-[#00C4CC] hover:border-[#00C4CC] text-[8px] font-black uppercase tracking-wider shadow-xs cursor-pointer"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => setInspectedNode(null)}
                  aria-label="Close spotlight"
                  className="w-5 h-5 rounded-full bg-[#00C4CC] text-black hover:bg-[#E5B80B] text-xs font-black flex items-center justify-center cursor-pointer"
                >
                  ×
                </button>
              </div>
            </div>
          )}

          <div
            className={`flex flex-col sm:flex-row sm:items-end justify-between gap-1.5 sm:gap-3 w-full transition-colors duration-500 ${
              isLightMode ? 'text-[#0f172a]' : 'text-white'
            }`}
          >
            {/* FULL-WIDTH HORIZONTAL STRIPS ON MOBILE, LEFT COLUMN ON DESKTOP */}
            <div className="flex flex-col gap-1 sm:gap-2 min-w-0 w-full sm:flex-1 sm:max-w-lg">
              {/* On-Map East Africa Chapter Switcher (Tray-free Hero Matte White, Yellow & Sky Blue Pills) */}
              <div
                className="flex flex-nowrap sm:flex-wrap items-center justify-between sm:justify-start gap-1 sm:gap-1.5 overflow-x-auto hide-scroll w-full py-0.5"
                id="map-chapter-switcher"
                aria-label="Switch East Africa map chapter"
              >
                <button
                  type="button"
                  onClick={() => handleStepChapter(-1)}
                  aria-label="Previous East African chapter"
                  className={`shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full border bg-white text-[#0b1120] hover:bg-[#E5B80B] hover:border-[#E5B80B] flex items-center justify-center text-[11px] font-black transition-colors shadow-md cursor-pointer ${
                    isLightMode ? 'border-[#003355]/25' : 'border-white'
                  }`}
                >
                  ‹
                </button>

                {chapters.map((chapter, idx) => {
                  const isSelected = !isRegionalOverview && idx === selectedCountryIdx;
                  return (
                    <button
                      key={chapter.code}
                      type="button"
                      onClick={() => handleSelectChapter(idx)}
                      title={`${chapter.name} — ${chapter.capital}`}
                      className={`shrink-0 px-2 sm:px-2.5 py-0.5 rounded-full border text-[8.5px] sm:text-[9.5px] uppercase tracking-wider flex items-center gap-1 transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-[#E5B80B] text-black border-[#E5B80B] font-black shadow-[0_0_12px_rgba(229,184,11,0.5)]'
                          : `bg-white text-[#0b1120] font-extrabold hover:bg-[#00C4CC] hover:border-[#00C4CC] shadow-md ${
                              isLightMode ? 'border-[#003355]/25' : 'border-white'
                            }`
                      }`}
                    >
                      <span className="text-[9.5px] sm:text-[10px] leading-none">{chapter.flag}</span>
                      <span>{chapter.code}</span>
                    </button>
                  );
                })}

                <button
                  type="button"
                  onClick={() => {
                    setInspectedNode(null);
                    setIsRegionalOverview((prev) => !prev);
                  }}
                  aria-pressed={isRegionalOverview}
                  className={`shrink-0 px-2 sm:px-2.5 py-0.5 rounded-full border text-[8.5px] sm:text-[9.5px] font-black uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    isRegionalOverview
                      ? 'bg-[#00C4CC] text-black border-[#00C4CC] shadow-[0_0_12px_rgba(0,196,204,0.5)]'
                      : 'bg-[#bae6fd] text-[#00223b] border-[#7dd3fc] hover:bg-[#00C4CC] hover:border-[#00C4CC] shadow-md'
                  }`}
                >
                  All EA
                </button>

                <button
                  type="button"
                  onClick={() => handleStepChapter(1)}
                  aria-label="Next East African chapter"
                  className={`shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full border bg-white text-[#0b1120] hover:bg-[#E5B80B] hover:border-[#E5B80B] flex items-center justify-center text-[11px] font-black transition-colors shadow-md cursor-pointer ${
                    isLightMode ? 'border-[#003355]/25' : 'border-white'
                  }`}
                >
                  ›
                </button>
              </div>

              {/* REAL-TIME 4-COLUMN TELEMETRY STRIP (Full Matte Card) */}
              <div
                id="map-live-telemetry"
                className={`grid grid-cols-4 divide-x rounded-lg border py-1 sm:py-1.5 w-full transition-colors duration-500 ${
                  isLightMode
                    ? 'bg-white border-[#003355]/25 divide-[#003355]/15 text-[#00223b] shadow-[0_6px_16px_rgba(15,23,42,0.12)]'
                    : 'bg-[#071120] border-[#1e3a5f] divide-[#1e3a5f] text-white shadow-[0_8px_20px_rgba(0,0,0,0.75)]'
                }`}
              >
                <div className="px-1.5 sm:px-2 first:pl-1">
                  <div className="text-[7px] sm:text-[8px] uppercase tracking-wider opacity-65 font-bold leading-tight">
                    Scope
                  </div>
                  <div className="text-[9.5px] sm:text-xs font-extrabold tabular-nums truncate">
                    {jurisdictionLabel}
                  </div>
                </div>
                <div className="px-1.5 sm:px-2">
                  <div className="text-[7px] sm:text-[8px] uppercase tracking-wider opacity-65 font-bold leading-tight">
                    Active Hubs
                  </div>
                  <div
                    className={`text-[9.5px] sm:text-xs font-extrabold tabular-nums ${
                      isLightMode ? 'text-[#006e74]' : 'text-[#00C4CC]'
                    }`}
                  >
                    {visibleTelemetry.nodeCount}
                    {legendFilter ? `/${visibleTelemetry.totalInScope}` : ''}
                  </div>
                </div>
                <div className="px-1.5 sm:px-2">
                  <div className="text-[7px] sm:text-[8px] uppercase tracking-wider opacity-65 font-bold leading-tight">
                    Youth Reached
                  </div>
                  <div className="text-[9.5px] sm:text-xs font-extrabold tabular-nums">
                    {visibleTelemetry.youthLabel}
                  </div>
                </div>
                <div className="px-1.5 sm:px-2 last:pr-1">
                  <div className="text-[7px] sm:text-[8px] uppercase tracking-wider opacity-65 font-bold leading-tight">
                    Avg Velocity
                  </div>
                  <div
                    className={`text-[9.5px] sm:text-xs font-extrabold tabular-nums ${
                      isLightMode ? 'text-[#9a6b00]' : 'text-[#E5B80B]'
                    }`}
                  >
                    +{visibleTelemetry.avgGrowth}%
                  </div>
                </div>
              </div>

              {/* HORIZONTAL COORDS + SUBTITLE ROW ON MOBILE, STACKED ON DESKTOP */}
              <div
                className="flex flex-row sm:flex-col items-center sm:items-start justify-between gap-2 sm:gap-1 w-full"
                id="location-ticker"
              >
                <div
                  className={`text-[8px] sm:text-[10.5px] md:text-[11px] font-mono font-black tracking-wider sm:tracking-widest rounded-full px-2.5 sm:px-3 py-0.5 w-fit uppercase shrink-0 transition-colors duration-300 shadow-xs ${
                    isRegionalOverview
                      ? 'bg-[#00C4CC] text-black'
                      : 'text-black bg-[#E5B80B]'
                  }`}
                  id="ticker-coords"
                >
                  {activeCoordsLabel}
                </div>
                <div
                  className={`text-[8px] sm:text-[9.5px] md:text-[11px] font-bold tracking-wide uppercase truncate text-right sm:text-left transition-colors duration-500 ${
                    isLightMode ? 'text-[#334155]' : 'text-gray-300'
                  }`}
                  id="ticker-info"
                >
                  {activeSubtitleLabel}
                </div>
              </div>

              {/* FULL-WIDTH HORIZONTAL DESCRIPTION */}
              <p
                className={`text-[9.5px] sm:text-[11px] md:text-[12px] font-medium w-full sm:max-w-[380px] leading-tight sm:leading-relaxed tracking-wide line-clamp-2 sm:line-clamp-3 transition-colors duration-500 ${
                  isLightMode ? 'text-[#1e293b]' : 'text-gray-200'
                }`}
              >
                {activeDescription}
              </p>

              {/* DESKTOP CTA ROW (Hero Matte White & Yellow Pills) */}
              <div className="hidden sm:flex items-center gap-4">
                <a
                  href="#section-excellence"
                  onClick={(e) => handleNavigateSection3(e, 'platform')}
                  className={`circle-scroll bg-white text-[#0b1120] border-2 hover:bg-[#00C4CC] hover:border-[#00C4CC] hover:text-black transition-colors shrink-0 shadow-md ${
                    isLightMode ? 'border-[#003355]/35' : 'border-white'
                  }`}
                >
                  <i className="fa-solid fa-arrow-down text-sm"></i>
                </a>
                <a
                  href="#section-excellence"
                  onClick={(e) => handleNavigateSection3(e, 'platform')}
                  className="explore-pill bg-[#E5B80B] text-black border-2 border-[#E5B80B] hover:bg-white hover:border-white transition-colors shadow-md"
                >
                  <span className="text-[10px] font-black">Explore Platform</span>
                </a>
              </div>
            </div>

            {/* BOTTOM-RIGHT CONTROLS (Hero Matte White, Yellow & Sky Blue Pills) */}
            <div className="flex flex-col items-stretch sm:items-end gap-1 sm:gap-2.5 w-full sm:w-auto shrink-0">
              <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
                {/* Mobile Horizontal CTA */}
                <div className="flex sm:hidden items-center gap-2 shrink-0">
                  <a
                    href="#section-excellence"
                    onClick={(e) => handleNavigateSection3(e, 'platform')}
                    className={`circle-scroll bg-white text-[#0b1120] border-2 hover:bg-[#00C4CC] hover:border-[#00C4CC] hover:text-black transition-colors shrink-0 shadow-md ${
                      isLightMode ? 'border-[#003355]/35' : 'border-white'
                    }`}
                  >
                    <i className="fa-solid fa-arrow-down text-xs"></i>
                  </a>
                  <a
                    href="#section-excellence"
                    onClick={(e) => handleNavigateSection3(e, 'platform')}
                    className="explore-pill bg-[#E5B80B] text-black border-2 border-[#E5B80B] hover:bg-white hover:border-white transition-colors shadow-md"
                  >
                    <span className="text-[9px] font-black">Explore Platform</span>
                  </a>
                </div>

                <div className="flex items-center gap-1 sm:gap-1.5">
                  <div
                    className={`flex items-center rounded-full border-2 bg-white text-[#0b1120] overflow-hidden transition-colors shadow-lg ${
                      isLightMode ? 'border-[#003355]/35' : 'border-white'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => handleZoomStep(1)}
                      aria-label="Zoom in map"
                      title="Zoom In"
                      className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-[11px] sm:text-xs font-black hover:bg-[#00C4CC] transition-colors cursor-pointer"
                    >
                      +
                    </button>
                    <span className="w-px h-3.5 sm:h-4 bg-[#cbd5e1]" />
                    <button
                      type="button"
                      onClick={() => handleZoomStep(-1)}
                      aria-label="Zoom out map"
                      title="Zoom Out"
                      className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-[11px] sm:text-xs font-black hover:bg-[#00C4CC] transition-colors cursor-pointer"
                    >
                      −
                    </button>
                    <span className="w-px h-3.5 sm:h-4 bg-[#cbd5e1]" />
                    <button
                      type="button"
                      onClick={handleRecenter}
                      aria-label="Recenter map to active chapter"
                      title="Recenter View"
                      className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-[11px] sm:text-xs font-black hover:bg-[#E5B80B] transition-colors cursor-pointer"
                    >
                      ⌖
                    </button>
                  </div>

                  <button
                    id="map-lock-btn"
                    type="button"
                    onClick={toggleLock}
                    aria-pressed={isMapUnlocked}
                    title={isMapUnlocked ? 'Lock Map Drag & Scroll' : 'Unlock Map Drag & Scroll'}
                    className={`lock-btn border-2 transition-colors cursor-pointer ${
                      isMapUnlocked
                        ? 'bg-[#E5B80B] text-black border-[#E5B80B] hover:bg-white hover:border-white shadow-[0_0_16px_rgba(229,184,11,0.5)]'
                        : 'bg-[#00C4CC] text-black border-[#00C4CC] hover:bg-white hover:border-white shadow-[0_0_14px_rgba(0,196,204,0.45)]'
                    }`}
                  >
                    <i
                      id="lock-icon"
                      className={`fa-solid ${
                        isMapUnlocked ? 'fa-lock-open' : 'fa-lock'
                      } text-xs sm:text-lg`}
                    ></i>
                  </button>
                </div>
              </div>

              {/* HORIZONTAL FULL-WIDTH LOCK STATUS + OSM ATTRIBUTION ON MOBILE; STACKED RIGHT ON DESKTOP */}
              <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between gap-2 w-full sm:w-auto">
                <p
                  id="lock-text"
                  className={`text-[8px] sm:text-[9.5px] md:text-[11px] font-bold tracking-[0.1em] sm:tracking-[0.15em] uppercase leading-tight text-left sm:text-right transition-colors duration-500 ${
                    isLightMode ? 'text-[#0f172a]/85' : 'text-white opacity-80'
                  }`}
                >
                  {isMapUnlocked ? (
                    <>
                      Map Active <span className="sm:hidden">• </span>
                      <br className="hidden sm:inline" />
                      Click to lock
                    </>
                  ) : (
                    <>
                      Click to interact <span className="sm:hidden">• </span>
                      <br className="hidden sm:inline" />
                      with map
                    </>
                  )}
                </p>
                <a
                  href="https://www.openstreetmap.org/copyright"
                  target="_blank"
                  rel="noreferrer"
                  className={`text-[8px] sm:text-[9px] font-mono transition-colors shrink-0 ${
                    isLightMode
                      ? 'text-[#334155]/85 hover:text-[#006e74]'
                      : 'text-white/60 hover:text-[#E5B80B]'
                  }`}
                >
                  &copy; OpenStreetMap contributors
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
