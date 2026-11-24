import { jsPDF } from 'jspdf';
import {
  CivicMapNode,
  EastAfricaChapter,
  GRANT_TIER_META,
  PROGRAM_TRACK_META,
} from '../data/eastAfricaChapters';

export interface MetricsPdfInput {
  scopeTitle: string;
  jurisdictionLabel: string;
  colorMetricLabel: string;
  activeFilterLabel: string | null;
  totalYouthLabel: string;
  totalProjects: number;
  avgGrowthLabel: string;
  chapters: EastAfricaChapter[];
  nodes: CivicMapNode[];
  aiBrief?: {
    query: string;
    headline: string;
    answer: string;
  } | null;
}

export function downloadPamojaMetricsPdf(data: MetricsPdfInput): string {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let y = 0;

  // Branded Top Banner
  doc.setFillColor(7, 17, 32);
  doc.rect(0, 0, pageWidth, 34, 'F');

  doc.setFillColor(229, 184, 11);
  doc.rect(0, 32, pageWidth, 2.2, 'F');

  doc.setTextColor(0, 196, 204);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('PAMOJA 16  •  UN SDG 16 CIVIC COMMAND TELEMETRY', margin, 11);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(17);
  doc.text(`Civic Metrics Report — ${data.scopeTitle}`, margin, 21);

  const generatedDate = new Date().toISOString().slice(0, 10);
  doc.setTextColor(203, 213, 225);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text(
    `Generated: ${generatedDate}   |   Lens: ${data.colorMetricLabel}${
      data.activeFilterLabel ? ` (${data.activeFilterLabel})` : ''
    }`,
    margin,
    28
  );

  y = 43;

  // KPI Summary Cards Row
  const kpis = [
    { label: 'JURISDICTION SCOPE', value: data.jurisdictionLabel, accent: [0, 51, 85] as const },
    { label: 'ACTIVE CIVIC HUBS', value: String(data.nodes.length), accent: [0, 140, 148] as const },
    { label: 'YOUTH REACHED', value: data.totalYouthLabel, accent: [11, 17, 32] as const },
    { label: 'AVG YOY VELOCITY', value: `+${data.avgGrowthLabel}%`, accent: [175, 130, 0] as const },
  ];

  const cardGap = 3.5;
  const cardWidth = (contentWidth - cardGap * 3) / 4;
  kpis.forEach((kpi, idx) => {
    const x = margin + idx * (cardWidth + cardGap);
    doc.setFillColor(244, 247, 251);
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(x, y, cardWidth, 18, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.8);
    doc.setTextColor(71, 85, 105);
    doc.text(kpi.label, x + 3, y + 6);

    doc.setFontSize(12);
    doc.setTextColor(kpi.accent[0], kpi.accent[1], kpi.accent[2]);
    doc.text(kpi.value, x + 3, y + 14);
  });

  y += 25;

  // Optional Active AI Brief Section
  if (data.aiBrief && data.aiBrief.answer) {
    const wrappedBrief = doc.splitTextToSize(data.aiBrief.answer, contentWidth - 8);
    const boxHeight = Math.max(20, 13 + wrappedBrief.length * 4.3);

    doc.setFillColor(238, 250, 251);
    doc.setDrawColor(0, 196, 204);
    doc.roundedRect(margin, y, contentWidth, boxHeight, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(0, 95, 102);
    doc.text(`AI INTEL BRIEF: ${data.aiBrief.headline.toUpperCase()}`, margin + 4, y + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    doc.text(wrappedBrief, margin + 4, y + 11.5);

    y += boxHeight + 6;
  }

  // Regional Summary Table if multiple countries are included
  const countriesPresent = Array.from(new Set(data.nodes.map((n) => n.countryCode)));
  if (countriesPresent.length > 1) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(7, 17, 32);
    doc.text('East Africa Chapter Rollup', margin, y);
    y += 3.5;

    doc.setFillColor(0, 51, 85);
    doc.rect(margin, y, contentWidth, 6.5, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(7.2);
    doc.text('Chapter', margin + 2.5, y + 4.4);
    doc.text('Jurisdiction', margin + 42, y + 4.4);
    doc.text('Hubs', margin + 84, y + 4.4);
    doc.text('Youth Reached', margin + 105, y + 4.4);
    doc.text('Projects', margin + 140, y + 4.4);
    doc.text('Avg Growth', margin + 162, y + 4.4);
    y += 6.5;

    data.chapters.forEach((chapter, idx) => {
      const chNodes = data.nodes.filter((n) => n.countryCode === chapter.code);
      if (chNodes.length === 0) return;

      const youthSum = chNodes.reduce((s, n) => s + n.youthCount, 0);
      const projSum = chNodes.reduce((s, n) => s + n.activeProjects, 0);
      const growthAvg = (chNodes.reduce((s, n) => s + n.growthValue, 0) / chNodes.length).toFixed(1);

      if (idx % 2 === 0) {
        doc.setFillColor(248, 250, 252);
        doc.rect(margin, y, contentWidth, 6, 'F');
      }
      doc.setTextColor(15, 23, 42);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.text(`${chapter.name} (${chapter.code})`, margin + 2.5, y + 4.2);

      doc.setFont('helvetica', 'normal');
      doc.text(chapter.jurisdictionLabel, margin + 42, y + 4.2);
      doc.text(String(chNodes.length), margin + 84, y + 4.2);
      doc.text(youthSum.toLocaleString(), margin + 105, y + 4.2);
      doc.text(String(projSum), margin + 140, y + 4.2);
      doc.text(`+${growthAvg}%`, margin + 162, y + 4.2);
      y += 6;
    });

    y += 6;
  }

  // Hub Telemetry Table
  const renderHubTableHeader = () => {
    doc.setFillColor(7, 17, 32);
    doc.rect(margin, y, contentWidth, 7, 'F');
    doc.setTextColor(229, 184, 11);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.2);
    doc.text('Civic Hub', margin + 2.5, y + 4.7);
    doc.text('Country', margin + 48, y + 4.7);
    doc.text('Program Track', margin + 68, y + 4.7);
    doc.text('SDG', margin + 108, y + 4.7);
    doc.text('Youth', margin + 126, y + 4.7);
    doc.text('Growth', margin + 144, y + 4.7);
    doc.text('Grant Pool', margin + 162, y + 4.7);
    y += 7;
  };

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(7, 17, 32);
  doc.text(`Active Civic Hubs (${data.nodes.length}) — ${data.totalProjects} Total Projects`, margin, y);
  y += 3.5;
  renderHubTableHeader();

  data.nodes.forEach((node, idx) => {
    if (y > pageHeight - 16) {
      doc.addPage();
      y = 16;
      renderHubTableHeader();
    }

    if (idx % 2 === 0) {
      doc.setFillColor(248, 250, 252);
      doc.rect(margin, y, contentWidth, 6.2, 'F');
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.2);
    doc.setTextColor(15, 23, 42);
    doc.text(node.loc.slice(0, 26), margin + 2.5, y + 4.3);

    doc.setFont('helvetica', 'normal');
    doc.text(node.countryCode, margin + 48, y + 4.3);
    doc.text(PROGRAM_TRACK_META[node.programTrack].shortLabel, margin + 68, y + 4.3);
    doc.text(node.sdgTarget, margin + 108, y + 4.3);
    doc.text(node.youthCount.toLocaleString(), margin + 126, y + 4.3);
    doc.text(`+${node.growth}`, margin + 144, y + 4.3);
    doc.text(`${node.price} (${GRANT_TIER_META[node.grantTier].label.split(' ')[0]})`.slice(0, 18), margin + 162, y + 4.3);

    y += 6.2;
  });

  // Footer on last page
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text(
    'Pamoja 16 • East Africa Youth-Led Peacebuilding & SDG 16 Civic Accountability Telemetry',
    margin,
    pageHeight - 8
  );

  const safeSlug = data.scopeTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const filename = `pamoja16-metrics-${safeSlug}-${generatedDate}.pdf`;
  doc.save(filename);
  return filename;
}
