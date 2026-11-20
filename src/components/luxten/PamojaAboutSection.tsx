import React, { useState } from 'react';
import {
  ArrowUpRight,
  Calendar,
  ChevronRight,
  Globe,
  Handshake,
  MapPin,
  MessageSquareQuote,
  Sparkles,
  Users,
  X,
  CheckCircle2,
} from 'lucide-react';

interface PamojaAboutSectionProps {
  isLightMode?: boolean;
  onOpenSubmitModal?: () => void;
  onJumpToPlatform?: () => void;
  onOpenStoryWall?: () => void;
}

type ModalTab = 'partners' | 'stories' | 'events' | null;

export const PamojaAboutSection: React.FC<PamojaAboutSectionProps> = ({
  isLightMode = false,
  onOpenSubmitModal,
  onJumpToPlatform,
  onOpenStoryWall,
}) => {
  const [activeModal, setActiveModal] = useState<ModalTab>(null);
  const [factIndex, setFactIndex] = useState(0);
  const [rsvpEvents, setRsvpEvents] = useState<Record<string, boolean>>({});
  const [portraitFailed, setPortraitFailed] = useState(false);
  const [factImgFailed, setFactImgFailed] = useState(false);

  const facts = [
    {
      code: '01/04',
      metric: '247+',
      caption: 'Peace & civic initiatives verified across Kenya.',
    },
    {
      code: '02/04',
      metric: '1,500+',
      caption: 'Youth mediators & human rights monitors trained.',
    },
    {
      code: '03/04',
      metric: '18.2M',
      caption: 'KES in transparent grassroots micro-grants.',
    },
    {
      code: '04/04',
      metric: '47',
      caption: 'Kenyan counties linked under UN SDG 16.',
    },
  ];

  const partnersList = [
    {
      name: 'KMUN Kenya',
      role: 'Youth Diplomacy & UN Model',
      focus: 'SDG 16.A',
    },
    {
      name: 'TI-Kenya',
      role: 'Anti-Corruption & Open Audits',
      focus: 'SDG 16.5',
    },
    {
      name: 'Siasa Place',
      role: 'Civic Participation & Youth Voice',
      focus: 'SDG 16.7',
    },
    {
      name: 'Uraia Trust',
      role: 'Constitutional Education',
      focus: 'SDG 16.3',
    },
    {
      name: 'UN-Habitat Youth',
      role: 'Urban Peace & Safe Spaces',
      focus: 'SDG 16.1',
    },
    {
      name: 'County Peace Hubs',
      role: 'Grassroots Mediation Councils',
      focus: '47 Counties',
    },
  ];

  const storiesList = [
    {
      id: 'st-1',
      author: 'Wanjiku Kamau',
      location: 'Mathare, Nairobi',
      title: 'How Youth Budget Cafés Recovered KES 4.2M for Local Clinic Access',
      excerpt:
        'Using Pamoja 16 open-data audit checklists, 32 youth monitors tracked ward allocations and presented verified public petitions.',
      tag: 'Accountability',
    },
    {
      id: 'st-2',
      author: 'Hassan Abdullahi',
      location: 'Garissa County',
      title: 'Cross-Ward Pastoralist Peace Accords Guided by Young Mediators',
      excerpt:
        'Combining elders’ dialogue traditions with rapid SMS early-warning alerts reduced seasonal resource disputes across three sub-counties.',
      tag: 'Peacebuilding',
    },
    {
      id: 'st-3',
      author: 'Mercy Achieng',
      location: 'Kisumu & Siaya',
      title: 'Paralegal Clinics Bringing Free Legal Aid to Lake Basin Markets',
      excerpt:
        'Weekly mobile justice desks connect traders and first-time founders to accessible legal documentation and dispute resolution.',
      tag: 'Access to Justice',
    },
  ];

  const eventsList = [
    {
      id: 'ev-1',
      date: '28 NOV · NAIROBI',
      title: 'Kenya Youth SDG 16 Accountability Summit',
      venue: 'KICC Amphitheatre & Live WebRTC',
      seats: '420 Attending',
    },
    {
      id: 'ev-2',
      date: '06 DEC · KISUMU',
      title: 'Lake Basin Peacebuilding & Mediation Lab',
      venue: 'Kisumu Social Hall, Milimani',
      seats: '160 Attending',
    },
    {
      id: 'ev-3',
      date: '14 DEC · MOMBASA',
      title: 'Coastal Civic Tech & Open Data Hackathon',
      venue: 'Swahilipot Hub, Mombasa',
      seats: '210 Attending',
    },
  ];

  const currentFact = facts[factIndex];

  const threeBoxes = [
    {
      id: 'partners' as const,
      title: 'Partners',
      meta: '50+ Coalitions',
      desc: 'UN, NGO & county allies',
      icon: Handshake,
      accent: isLightMode ? 'text-[#005587]' : 'text-[#00C4CC]',
      badgeBg: isLightMode ? 'bg-[#005587]/10' : 'bg-[#00C4CC]/15',
    },
    {
      id: 'stories' as const,
      title: 'Story Wall',
      meta: '120+ Field Voices',
      desc: 'Grassroots peace essays',
      icon: MessageSquareQuote,
      accent: isLightMode ? 'text-[#9a7500]' : 'text-[#E5B80B]',
      badgeBg: isLightMode ? 'bg-[#E5B80B]/20' : 'bg-[#E5B80B]/15',
    },
    {
      id: 'events' as const,
      title: 'Events',
      meta: '14 Upcoming',
      desc: 'Summits & civic clinics',
      icon: Calendar,
      accent: isLightMode ? 'text-[#005587]' : 'text-[#60a5fa]',
      badgeBg: isLightMode ? 'bg-[#005587]/10' : 'bg-[#005587]/40',
    },
  ];

  const surfaceBg = isLightMode
    ? 'bg-[#f4f7fb] text-[#0b0f17] border-[#005587]/15'
    : 'bg-[#050505] text-white border-white/10';

  const cardSurface = isLightMode
    ? 'bg-white border-[#005587]/15 shadow-xs'
    : 'bg-[#111318] border-white/10';

  return (
    <section
      id="section-about"
      className={`snap-section min-h-[100dvh] h-[100dvh] max-h-[100dvh] w-full flex flex-col justify-between overflow-hidden relative select-none border-b transition-colors duration-500 px-4 py-3 sm:px-8 sm:py-5 lg:px-12 lg:py-6 ${surfaceBg}`}
    >
      {/* Subtle Ambient Glow */}
      <div
        className={`absolute top-12 left-10 w-64 h-64 rounded-full blur-3xl pointer-events-none ${
          isLightMode ? 'bg-[#005587]/8' : 'bg-[#005587]/15'
        }`}
      />
      <div
        className={`absolute bottom-10 right-10 w-72 h-72 rounded-full blur-3xl pointer-events-none ${
          isLightMode ? 'bg-[#E5B80B]/10' : 'bg-[#00C4CC]/8'
        }`}
      />

      {/* MAIN CONTAINER (Mirrors screenshot rhythm on mobile, expands cleanly on desktop) */}
      <div className="w-full max-w-[460px] md:max-w-[820px] lg:max-w-[1200px] mx-auto h-full flex flex-col justify-between gap-1.5 sm:gap-2.5 relative z-10 min-h-0">
        
        {/* ===================================================================== */}
        {/* 1. TOP EYEBROW & TWO-TONE HEADLINE                                    */}
        {/* ===================================================================== */}
        <div className="shrink-0">
          <div className="flex items-center gap-2 mb-0.5 sm:mb-1">
            <Sparkles
              className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${
                isLightMode ? 'text-[#005587]' : 'text-[#00C4CC]'
              }`}
              aria-hidden="true"
            />
            <span
              className={`text-[11px] sm:text-xs font-medium tracking-wide ${
                isLightMode ? 'text-[#005587]' : 'text-gray-400'
              }`}
            >
              About us
            </span>
          </div>

          <h2 className="text-[clamp(1.4rem,min(6.4vw,4dvh),2.95rem)] font-medium tracking-tight leading-[1.02] text-balance">
            <span className="block">Meet The Voices</span>
            <span
              className={`block ${
                isLightMode ? 'text-[#005587]/45' : 'text-white/40'
              }`}
            >
              Behind The Peace
            </span>
          </h2>
        </div>

        {/* ===================================================================== */}
        {/* 2. PORTRAIT IMAGE + THREE ENCLOSED LINK BOXES (PARTNERS / STORY WALL / EVENTS) */}
        {/* ===================================================================== */}
        <div className="flex flex-row items-stretch gap-2.5 sm:gap-4 lg:gap-5 flex-1 min-h-[120px] max-h-[225px]">
          
          {/* First Portrait Image (Warm rim-lit advocate portrait matching screenshot) */}
          <div
            className={`relative w-[39%] xs:w-[40%] sm:w-[195px] lg:w-[225px] shrink-0 h-full rounded-xl sm:rounded-2xl overflow-hidden border ${
              isLightMode ? 'border-[#005587]/20 bg-[#0b253c]' : 'border-white/15 bg-[#121620]'
            }`}
          >
            {!portraitFailed ? (
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=900&auto=format&fit=crop"
                alt="Pamoja 16 youth peace ambassador portrait"
                referrerPolicy="no-referrer"
                onError={() => setPortraitFailed(true)}
                className="w-full h-full object-cover object-top scale-105 contrast-115 saturate-110"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#005587] via-[#003355] to-[#0a0a0a] flex items-center justify-center">
                <Users className="w-10 h-10 text-[#E5B80B]" />
              </div>
            )}

            {/* Signature warm gold & Pamoja blue studio rim gradient */}
            <div
              className="absolute inset-0 pointer-events-none mix-blend-multiply"
              style={{
                background:
                  'radial-gradient(circle at 75% 25%, rgba(229, 184, 11, 0.55) 0%, rgba(0, 85, 135, 0.65) 58%, rgba(5, 10, 18, 0.92) 100%)',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-2 left-2.5 right-2.5 flex items-end justify-between gap-1 pointer-events-none">
              <div className="min-w-0">
                <span className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#E5B80B] truncate">
                  Youth Envoy
                </span>
                <span className="block text-[10px] sm:text-xs font-semibold text-white truncate">
                  Nairobi · 47 Nodes
                </span>
              </div>
            </div>
          </div>

          {/* Three Enclosed Interactive Boxes Next to the Portrait: Partners | Story Wall | Events */}
          <div className="flex-1 min-w-0 h-full grid grid-cols-1 md:grid-cols-3 gap-1.5 sm:gap-2.5 lg:gap-3.5">
            {threeBoxes.map((box) => {
              const Icon = box.icon;
              return (
                <button
                  key={box.id}
                  type="button"
                  id={`btn-about-box-${box.id}`}
                  onClick={() => {
                    if (box.id === 'stories' && onOpenStoryWall) {
                      onOpenStoryWall();
                    } else {
                      setActiveModal(box.id);
                    }
                  }}
                  className={`group relative rounded-xl sm:rounded-2xl border px-2.5 py-1.5 sm:p-3.5 lg:p-4 flex md:flex-col items-center md:items-start justify-between text-left transition-all duration-200 cursor-pointer min-h-0 overflow-hidden ${cardSurface} ${
                    isLightMode
                      ? 'hover:border-[#005587] hover:shadow-md'
                      : 'hover:border-[#00C4CC]/60 hover:bg-[#161b24]'
                  }`}
                >
                  <div className="flex md:flex-col items-center md:items-start gap-2 sm:gap-2.5 min-w-0 md:w-full">
                    <div className="flex items-center justify-between md:w-full shrink-0">
                      <div
                        className={`w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${box.badgeBg} ${box.accent}`}
                      >
                        <Icon className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" />
                      </div>
                      <ArrowUpRight
                        className={`hidden md:block w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                          isLightMode ? 'text-gray-400 group-hover:text-[#005587]' : 'text-gray-500 group-hover:text-[#00C4CC]'
                        }`}
                      />
                    </div>

                    <div className="min-w-0 flex-1 md:mt-auto">
                      <span
                        className={`block text-xs sm:text-sm lg:text-base font-bold tracking-tight truncate ${
                          isLightMode ? 'text-[#0b0f17]' : 'text-white'
                        }`}
                      >
                        {box.title}
                      </span>
                      <span
                        className={`block text-[10px] sm:text-xs truncate ${
                          isLightMode ? 'text-[#005587]/75' : 'text-gray-400'
                        }`}
                      >
                        {box.meta} <span className="hidden lg:inline">· {box.desc}</span>
                      </span>
                    </div>
                  </div>

                  <div className="md:hidden shrink-0 pl-1">
                    <ArrowUpRight
                      className={`w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                        isLightMode ? 'text-[#005587]' : 'text-[#00C4CC]'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ===================================================================== */}
        {/* 3. MIDDLE EDITORIAL MISSION STATEMENT                                 */}
        {/* ===================================================================== */}
        <div className="shrink-0 my-0.5">
          <p className="text-[clamp(0.84rem,min(3.5vw,2.15dvh),1.45rem)] font-normal leading-[1.24] tracking-tight max-w-3xl">
            <span className={isLightMode ? 'text-[#0b0f17] font-medium' : 'text-white font-medium'}>
              At Pamoja 16, we bring together youth mediators, civic monitors,{' '}
            </span>
            <span className={isLightMode ? 'text-[#005587]/60' : 'text-white/45'}>
              and community builders to advance peace, justice, and strong institutions with transparency and unity.
            </span>
          </p>
        </div>

        {/* ===================================================================== */}
        {/* 4. METADATA STRIP (GLOBE + COUNTIES ON LEFT / AVATARS ON RIGHT)       */}
        {/* ===================================================================== */}
        <div className="flex items-center justify-between gap-3 shrink-0 py-0.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center shrink-0 ${
                isLightMode
                  ? 'border-[#005587]/25 text-[#005587]'
                  : 'border-white/20 text-[#00C4CC]'
              }`}
            >
              <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div className="text-[10px] sm:text-xs leading-tight min-w-0">
              <span
                className={`block font-semibold truncate ${
                  isLightMode ? 'text-[#0b0f17]' : 'text-gray-200'
                }`}
              >
                Over 240+ Initiatives
              </span>
              <span
                className={`block truncate ${
                  isLightMode ? 'text-[#005587]/70' : 'text-gray-400'
                }`}
              >
                47 Counties Across Kenya
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveModal('stories')}
            className="flex items-center -space-x-2 shrink-0 cursor-pointer group"
            title="View Story Wall voices"
          >
            {[
              { initials: 'WK', bg: 'bg-[#005587] text-white' },
              { initials: 'HA', bg: 'bg-[#00C4CC] text-[#041520]' },
              { initials: 'MA', bg: 'bg-[#E5B80B] text-[#0b0f17]' },
            ].map((av) => (
              <span
                key={av.initials}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center text-[9px] sm:text-[10px] font-extrabold ${av.bg} ${
                  isLightMode ? 'border-[#f4f7fb]' : 'border-[#050505]'
                }`}
              >
                {av.initials}
              </span>
            ))}
            <span
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center text-[9px] sm:text-[10px] font-bold transition-transform group-hover:scale-105 ${
                isLightMode
                  ? 'bg-[#0b0f17] text-white border-[#f4f7fb]'
                  : 'bg-[#1c212b] text-white border-[#050505]'
              }`}
            >
              47
            </span>
          </button>
        </div>

        {/* ===================================================================== */}
        {/* 5. BOTTOM 2-CARD BENTO ROW (PARTNERS CARD + PAMOJA 16 FACT CARD)      */}
        {/* ===================================================================== */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-4 flex-1 min-h-[136px] max-h-[245px]">
          
          {/* Left Card: 50+ Trusted Partners + Partner Wordmarks + Gold/Cyan CTA */}
          <div
            className={`rounded-2xl sm:rounded-3xl border p-2.5 sm:p-4 lg:p-5 flex flex-col justify-between min-w-0 overflow-hidden ${cardSurface}`}
          >
            <div>
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[clamp(1.35rem,3.8dvh,2.35rem)] font-light tracking-tight tabular-nums leading-none">
                  50+
                </span>
                <button
                  type="button"
                  onClick={() => setActiveModal('partners')}
                  className={`text-[10px] font-semibold underline-offset-2 hover:underline cursor-pointer hidden sm:inline ${
                    isLightMode ? 'text-[#005587]' : 'text-[#00C4CC]'
                  }`}
                >
                  Directory
                </button>
              </div>
              <span
                className={`block text-[10px] sm:text-xs mt-0.5 sm:mt-1 ${
                  isLightMode ? 'text-[#005587]/70' : 'text-gray-400'
                }`}
              >
                Trusted Partners
              </span>
            </div>

            {/* Compact 3x2 Partner Wordmark Grid */}
            <div
              className={`grid grid-cols-3 gap-x-1.5 gap-y-1 sm:gap-y-2 my-auto py-0.5 text-[8.5px] xs:text-[9px] sm:text-xs font-bold tracking-tight ${
                isLightMode ? 'text-[#0b0f17]/70' : 'text-white/75'
              }`}
            >
              <span className="truncate">KMUN</span>
              <span className="truncate">TI-Kenya</span>
              <span className="truncate">Siasa</span>
              <span className="truncate">UN Youth</span>
              <span className="truncate">Uraia</span>
              <span className="truncate">47 Hubs</span>
            </div>

            {/* Accent CTA Pill */}
            <button
              type="button"
              id="btn-about-partner-cta"
              onClick={() => {
                if (onOpenSubmitModal) {
                  onOpenSubmitModal();
                } else {
                  setActiveModal('partners');
                }
              }}
              className={`w-full h-8 sm:h-10 rounded-full font-bold text-[11px] sm:text-xs tracking-wide flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-[0.98] shrink-0 ${
                isLightMode
                  ? 'bg-[#005587] hover:bg-[#003f66] text-white shadow-sm'
                  : 'bg-[#E5B80B] hover:bg-[#00C4CC] text-[#0b0f17] shadow-[0_6px_20px_rgba(229,184,11,0.28)]'
              }`}
            >
              Partner With Us
            </button>
          </div>

          {/* Right Card: Pamoja 16 Fact Card (Tinted Photo Overlay + 01/04 + Big Stat) */}
          <button
            type="button"
            id="btn-about-fact-card"
            onClick={() => setFactIndex((prev) => (prev + 1) % facts.length)}
            className="group relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#00C4CC]/30 p-2.5 sm:p-4 lg:p-5 flex flex-col justify-between text-left cursor-pointer transition-transform duration-200 hover:scale-[1.01] bg-[#00446e] text-white"
            title="Click to cycle Pamoja 16 verified impact facts"
          >
            {/* Background Team Photo */}
            {!factImgFailed && (
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1000&auto=format&fit=crop"
                alt="Pamoja 16 community youth leaders"
                referrerPolicy="no-referrer"
                onError={() => setFactImgFailed(true)}
                className="absolute inset-0 w-full h-full object-cover opacity-55 group-hover:scale-105 transition-transform duration-500"
              />
            )}

            {/* Brand Blue & Cyan Duotone Scrim */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(155deg, rgba(0, 85, 135, 0.86) 0%, rgba(0, 128, 155, 0.72) 48%, rgba(4, 21, 36, 0.92) 100%)',
              }}
            />

            {/* Top Row: Brand Fact Label + 01/04 Counter */}
            <div className="relative z-10 flex items-center justify-between gap-2 w-full">
              <span className="text-[10px] sm:text-xs font-semibold text-white/95 tracking-tight">
                Pamoja 16<sup className="text-[8px]">®</sup> Fact
              </span>
              <span className="text-[10px] sm:text-xs font-mono font-bold text-[#E5B80B] tabular-nums">
                {currentFact.code}
              </span>
            </div>

            {/* Bottom Row: Large Light Metric + 2-Line Description */}
            <div className="relative z-10 mt-auto">
              <span className="block text-[clamp(1.45rem,4dvh,2.6rem)] font-light tracking-tight tabular-nums leading-none text-white">
                {currentFact.metric}
              </span>
              <p className="text-[9.5px] sm:text-xs text-blue-50/90 leading-snug mt-1 line-clamp-2">
                {currentFact.caption}
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* INTERACTIVE MODAL FOR PARTNERS, STORY WALL, AND EVENTS                */}
      {/* ===================================================================== */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-5"
          onClick={() => setActiveModal(null)}
        >
          <div
            className={`w-full max-w-2xl rounded-3xl p-5 sm:p-6 border shadow-2xl relative max-h-[85vh] flex flex-col overflow-hidden ${
              isLightMode
                ? 'bg-white border-[#005587]/20 text-[#0b0f17]'
                : 'bg-[#0e1420] border-white/15 text-white'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header & Switcher Tabs */}
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-current/10 shrink-0">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#00C4CC]">
                  Pamoja 16 Network
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold tracking-tight mt-0.5">
                  {activeModal === 'partners' && 'Coalition Partners'}
                  {activeModal === 'stories' && 'Grassroots Story Wall'}
                  {activeModal === 'events' && 'Peace Forums & Events'}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className={`w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-colors shrink-0 ${
                  isLightMode ? 'bg-gray-100 hover:bg-gray-200 text-gray-800' : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Tab Switcher Inside Modal */}
            <div className="flex items-center gap-1.5 my-3 shrink-0">
              {(['partners', 'stories', 'events'] as const).map((tabKey) => (
                <button
                  key={tabKey}
                  type="button"
                  onClick={() => setActiveModal(tabKey)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold capitalize transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    activeModal === tabKey
                      ? 'bg-[#005587] text-white'
                      : isLightMode
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : 'bg-white/5 text-gray-300 hover:bg-white/15'
                  }`}
                >
                  {tabKey === 'stories' ? 'Story Wall' : tabKey}
                </button>
              ))}
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-2.5 min-h-0">
              {activeModal === 'partners' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {partnersList.map((partner) => (
                    <div
                      key={partner.name}
                      className={`p-3.5 rounded-2xl border ${
                        isLightMode ? 'bg-gray-50 border-gray-200' : 'bg-white/[0.04] border-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-bold">{partner.name}</span>
                        <span className="text-[10px] font-mono font-bold text-[#00C4CC]">
                          {partner.focus}
                        </span>
                      </div>
                      <p className={`text-xs mt-1 ${isLightMode ? 'text-gray-600' : 'text-gray-400'}`}>
                        {partner.role}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {activeModal === 'stories' &&
                storiesList.map((story) => (
                  <div
                    key={story.id}
                    className={`p-4 rounded-2xl border ${
                      isLightMode ? 'bg-gray-50 border-gray-200' : 'bg-white/[0.04] border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-[11px] font-semibold text-[#00C4CC]">
                      <span>{story.tag}</span>
                      <span aria-hidden="true">·</span>
                      <span className={isLightMode ? 'text-gray-500' : 'text-gray-400'}>
                        {story.location}
                      </span>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold mt-1 leading-snug">{story.title}</h4>
                    <p className={`text-xs mt-1.5 leading-relaxed ${isLightMode ? 'text-gray-600' : 'text-gray-300'}`}>
                      {story.excerpt}
                    </p>
                    <span className={`block text-[11px] font-semibold mt-2 ${isLightMode ? 'text-gray-700' : 'text-gray-400'}`}>
                      By {story.author}
                    </span>
                  </div>
                ))}

              {activeModal === 'events' &&
                eventsList.map((ev) => {
                  const isJoined = !!rsvpEvents[ev.id];
                  return (
                    <div
                      key={ev.id}
                      className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        isLightMode ? 'bg-gray-50 border-gray-200' : 'bg-white/[0.04] border-white/10'
                      }`}
                    >
                      <div className="min-w-0">
                        <span className="text-[10px] font-mono font-bold text-[#E5B80B]">
                          {ev.date}
                        </span>
                        <h4 className="text-sm font-bold mt-0.5">{ev.title}</h4>
                        <div className={`flex items-center gap-2 text-xs mt-1 ${isLightMode ? 'text-gray-600' : 'text-gray-400'}`}>
                          <MapPin className="w-3.5 h-3.5 shrink-0 text-[#00C4CC]" />
                          <span className="truncate">{ev.venue}</span>
                          <span aria-hidden="true">·</span>
                          <span className="shrink-0">{ev.seats}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setRsvpEvents((prev) => ({ ...prev, [ev.id]: !prev[ev.id] }))
                        }
                        className={`h-9 px-4 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0 whitespace-nowrap ${
                          isJoined
                            ? 'bg-emerald-500 text-white'
                            : 'bg-[#005587] hover:bg-[#00C4CC] hover:text-black text-white'
                        }`}
                      >
                        {isJoined ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Seat Reserved</span>
                          </>
                        ) : (
                          <span>Reserve Seat</span>
                        )}
                      </button>
                    </div>
                  );
                })}
            </div>

            {/* Modal Footer */}
            <div className="pt-3 mt-3 border-t border-current/10 flex items-center justify-between gap-3 shrink-0">
              {activeModal === 'stories' && (onOpenStoryWall || onJumpToPlatform) ? (
                <button
                  type="button"
                  onClick={() => {
                    setActiveModal(null);
                    if (onOpenStoryWall) {
                      onOpenStoryWall();
                    } else if (onJumpToPlatform) {
                      onJumpToPlatform();
                    }
                  }}
                  className="text-xs font-bold text-[#00C4CC] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Open Full Story Wall</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <span className={`text-xs ${isLightMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  Pamoja 16 Coalition · SDG 16
                </span>
              )}

              <button
                type="button"
                onClick={() => {
                  setActiveModal(null);
                  if (onOpenSubmitModal) onOpenSubmitModal();
                }}
                className="px-4 py-2 rounded-full bg-[#E5B80B] hover:bg-[#00C4CC] text-[#0b0f17] text-xs font-bold cursor-pointer transition-colors whitespace-nowrap"
              >
                {activeModal === 'partners' ? 'Apply as Partner' : 'Submit Initiative'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
