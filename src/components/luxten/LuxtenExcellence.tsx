import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Search, 
  MessageSquare, 
  Settings, 
  Menu, 
  Sparkles, 
  MapPin, 
  Share2, 
  Scale, 
  Globe2, 
  ArrowUpRight, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  X, 
  CheckCircle2, 
  Compass, 
  Award
} from 'lucide-react';

interface LuxtenExcellenceProps {
  isLightMode?: boolean;
  onOpenSubmitModal?: () => void;
  onOpenDrawer?: () => void;
}

interface InitiativeCard {
  id: string;
  pillarNum: string;
  badge: string;
  titleTop: string;
  titleBottom: string;
  desc: string;
  county: string;
  image: string;
  impactScore: string;
  verifiedTarget: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const LuxtenExcellence: React.FC<LuxtenExcellenceProps> = ({ 
  isLightMode = false, 
  onOpenSubmitModal, 
  onOpenDrawer 
}) => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(38);
  const [showCalculatorModal, setShowCalculatorModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [selectedPillar, setSelectedPillar] = useState<number>(0);

  // Calculator State
  const [calcCounty, setCalcCounty] = useState('Nairobi');
  const [calcPillar, setCalcPillar] = useState('Youth Peace Dialogue');
  const [calcParticipants, setCalcParticipants] = useState(250);
  const [calcDuration, setCalcDuration] = useState(6);

  const initiativeCards: InitiativeCard[] = [
    {
      id: 'pillar-1',
      pillarNum: '01',
      badge: 'GROUND DIALOGUE',
      titleTop: 'PEACE',
      titleBottom: 'RECONCILIATION',
      desc: 'Grassroots mediation. From community elders council to youth-led peace accords across 47 counties.',
      county: 'Nairobi & Nakuru',
      image: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=1200&auto=format&fit=crop',
      impactScore: '94% Accord Compliance',
      verifiedTarget: 'SDG Target 16.1 (Reduce Violence)',
      icon: MessageSquare
    },
    {
      id: 'pillar-2',
      pillarNum: '02',
      badge: 'CIVIC TECH GRANTS',
      titleTop: 'INNOVATION',
      titleBottom: 'CAPITAL',
      desc: 'Transparent micro-grants via M-Pesa. Funding youth developers constructing civic verification tools.',
      county: 'Mombasa & Kilifi',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1200&auto=format&fit=crop',
      impactScore: 'KES 18.2M Disbursed',
      verifiedTarget: 'SDG Target 16.7 (Inclusive Decision-Making)',
      icon: Share2
    },
    {
      id: 'pillar-3',
      pillarNum: '03',
      badge: 'JUSTICE MONITORING',
      titleTop: 'INSTITUTIONAL',
      titleBottom: 'JUSTICE',
      desc: 'Public revenue and judicial access audits. Empowering paralegal youth to monitor devolved funds.',
      county: 'Kisumu & Siaya',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200&auto=format&fit=crop',
      impactScore: '142 Audits Logged',
      verifiedTarget: 'SDG Target 16.3 (Rule of Law)',
      icon: Scale
    },
    {
      id: 'pillar-4',
      pillarNum: '04',
      badge: 'GLOBAL ADVOCACY',
      titleTop: 'TRANS-AFRICA',
      titleBottom: 'COALITION',
      desc: 'Youth delegations connecting county peace metrics directly to UN, AU, and regional civic assemblies.',
      county: 'All 47 Counties',
      image: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=1200&auto=format&fit=crop',
      impactScore: '5-Tier UN Reporting',
      verifiedTarget: 'SDG Target 16.A (Capacity Building)',
      icon: Globe2
    }
  ];

  const pillarsList = [
    { mode: 'MODE 01', title: 'KENYA A-B', subtitle: '47 COUNTIES LOCAL', icon: Compass, cardIdx: 0 },
    { mode: 'MODE 02', title: 'EAC CROSS BORDER', subtitle: 'REGIONAL DIALOGUE', icon: MapPin, cardIdx: 1 },
    { mode: 'MODE 03', title: 'SADC TRANS-AFRICA', subtitle: 'CONTINENTAL JUSTICE', icon: Globe2, cardIdx: 2 },
    { mode: 'MODE 04', title: 'GLOBAL TRANSIT', subtitle: 'UN & MULTILATERAL', icon: Scale, cardIdx: 3 }
  ];

  // Auto progression for audio preview bar
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlayingAudio) {
      timer = setInterval(() => {
        setAudioProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 350);
    }
    return () => clearInterval(timer);
  }, [isPlayingAudio]);

  const currentCard = initiativeCards[activeCardIndex];
  const CurrentIcon = currentCard.icon;

  const handleNextCard = () => {
    const nextIdx = (activeCardIndex + 1) % initiativeCards.length;
    setActiveCardIndex(nextIdx);
    setSelectedPillar(nextIdx);
  };

  const handlePrevCard = () => {
    const prevIdx = (activeCardIndex - 1 + initiativeCards.length) % initiativeCards.length;
    setActiveCardIndex(prevIdx);
    setSelectedPillar(prevIdx);
  };

  return (
    <section 
      id="section-excellence" 
      className={`snap-section min-h-[100dvh] h-[100dvh] max-h-[100dvh] w-full flex flex-col justify-between py-1.5 px-3 sm:px-6 relative overflow-hidden select-none border-b transition-colors duration-500 ${
        isLightMode 
          ? 'bg-[#f4f7fb] text-[#003355] border-[#005587]/15' 
          : 'bg-[#050505] text-white border-white/10'
      }`}
    >
      {/* Ambient background glow matching Brand Blue & Kenya Gold */}
      <div 
        className={`absolute top-0 right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 ${
          isLightMode ? 'bg-[#005587]/8' : 'bg-[#005587]/15'
        }`} 
      />
      <div 
        className={`absolute bottom-6 left-6 w-80 h-80 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 ${
          isLightMode ? 'bg-[#E5B80B]/10' : 'bg-[#E5B80B]/10'
        }`} 
      />

      <div className="w-full max-w-[1360px] mx-auto flex flex-col justify-between flex-1 h-full min-h-0 relative z-10">
        
        {/* ========================================================================= */}
        {/* 1. TOP ACCREDITATION BADGES BAR (Compact 2-col header)                   */}
        {/* ========================================================================= */}
        <div className={`w-full grid grid-cols-2 gap-1.5 border-b pb-1 shrink-0 transition-colors duration-300 ${
          isLightMode ? 'border-[#005587]/15' : 'border-white/10'
        }`}>
          {/* Badge 1 */}
          <div className={`flex items-center gap-1.5 py-0.5 px-2 rounded-md border transition-colors ${
            isLightMode 
              ? 'bg-white border-[#005587]/15 shadow-xs' 
              : 'bg-white/[0.03] border-white/10'
          }`}>
            <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 ${
              isLightMode 
                ? 'bg-[#005587]/10 border-[#005587]/30 text-[#005587]' 
                : 'bg-[#005587]/30 border-[#00C4CC]/40 text-[#00C4CC]'
            }`}>
              <Shield className="w-3 h-3 fill-current opacity-80" />
            </div>
            <div className="min-w-0">
              <span className={`text-[9px] sm:text-[10px] font-black uppercase tracking-wider block truncate leading-none ${
                isLightMode ? 'text-[#003355]' : 'text-white'
              }`}>
                UN SDG 16
              </span>
              <span className={`text-[7px] sm:text-[8px] font-mono uppercase block truncate tracking-tight ${
                isLightMode ? 'text-[#005587]/70 font-semibold' : 'text-gray-400'
              }`}>
                CERTIFIED CIVIC COALITION
              </span>
            </div>
          </div>

          {/* Badge 2 */}
          <div className={`flex items-center gap-1.5 py-0.5 px-2 rounded-md border transition-colors ${
            isLightMode 
              ? 'bg-white border-[#005587]/15 shadow-xs' 
              : 'bg-white/[0.03] border-white/10'
          }`}>
            <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 ${
              isLightMode 
                ? 'bg-[#E5B80B]/20 border-[#E5B80B]/50 text-[#8a7020]' 
                : 'bg-[#E5B80B]/20 border-[#E5B80B]/40 text-[#E5B80B]'
            }`}>
              <Award className="w-3 h-3" />
            </div>
            <div className="min-w-0">
              <span className={`text-[9px] sm:text-[10px] font-black uppercase tracking-wider block truncate leading-none ${
                isLightMode ? 'text-[#003355]' : 'text-white'
              }`}>
                PEACE CHARTER
              </span>
              <span className={`text-[7px] sm:text-[8px] font-mono uppercase block truncate tracking-tight ${
                isLightMode ? 'text-[#005587]/70 font-semibold' : 'text-gray-400'
              }`}>
                INTERNATIONAL FEDERATION
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. BRAND & ACTION HEADER (PAMOJA 16 CIVIC + Quick Tool icons)            */}
        {/* ========================================================================= */}
        <div className="flex items-center justify-between w-full py-0.5 shrink-0">
          <div className="flex items-center gap-2">
            <span className={`text-xs sm:text-sm font-black tracking-wider uppercase font-mono ${
              isLightMode ? 'text-[#005587]' : 'text-white'
            }`}>
              PAMOJA 16 CIVIC
            </span>
            <span className={`text-[9px] font-bold px-2 py-0.2 rounded-full uppercase ${
              isLightMode 
                ? 'bg-[#005587] text-white' 
                : 'bg-[#E5B80B] text-black font-black'
            }`}>
              SDG 16
            </span>
          </div>

          <div className={`flex items-center gap-2 sm:gap-3 ${
            isLightMode ? 'text-[#005587]' : 'text-gray-300'
          }`}>
            <button 
              onClick={() => setShowCalculatorModal(true)}
              className="hover:text-[#E5B80B] transition-colors p-0.5 cursor-pointer"
              title="Search Initiatives"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className="hover:text-[#E5B80B] transition-colors p-0.5 cursor-pointer"
              title="Audio Brief"
            >
              <MessageSquare className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => setShowAboutModal(true)}
              className="hover:text-[#E5B80B] transition-colors p-0.5 cursor-pointer"
              title="About & Settings"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => {
                if (onOpenDrawer) {
                  onOpenDrawer();
                } else {
                  setShowAboutModal(true);
                }
              }}
              className={`flex items-center gap-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider transition-colors px-2 py-0.5 rounded-full border cursor-pointer ${
                isLightMode 
                  ? 'bg-white text-[#003355] border-[#005587]/20 hover:bg-[#005587] hover:text-white' 
                  : 'bg-white/5 text-gray-200 border-white/10 hover:text-white hover:border-white/30'
              }`}
            >
              <Menu className="w-3 h-3 text-[#E5B80B]" />
              <span>MENU</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. HERO TITLE ROW WITH ROTATING CIRCULAR BADGE                           */}
        {/* ========================================================================= */}
        <div className="flex items-center justify-between gap-2 shrink-0">
          <div className="min-w-0">
            <span className={`text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] block leading-none mb-0.5 ${
              isLightMode ? 'text-[#005587]' : 'text-[#E5B80B]'
            }`}>
              OUR EXPERTISE
            </span>
            <h2 className={`text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight leading-[0.95] ${
              isLightMode ? 'text-[#00223f]' : 'text-white'
            }`}>
              JUSTICE &amp; <br />
              <span className={isLightMode ? 'text-[#005587]' : 'text-gray-100'}>STRONG INSTITUTIONS</span>
            </h2>
          </div>

          {/* COMPACT ROTATING CIRCULAR BADGE */}
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 flex items-center justify-center">
            <svg 
              viewBox="0 0 100 100" 
              className="w-full h-full animate-[spin_12s_linear_infinite] origin-center"
            >
              <path
                id="pamojaCompactBadge"
                d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                fill="none"
              />
              <text className={`text-[10.5px] font-mono font-bold uppercase tracking-[0.22em] ${
                isLightMode ? 'fill-[#005587]' : 'fill-[#E5B80B]'
              }`}>
                <textPath href="#pamojaCompactBadge" startOffset="0%">
                  • PAMOJA 16 • CIVIC • SDG 16 •
                </textPath>
              </text>
            </svg>
            <div className={`absolute w-2 h-2 rounded-full shadow-sm ${
              isLightMode ? 'bg-[#E5B80B]' : 'bg-white shadow-[0_0_6px_#ffffff]'
            }`} />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. SUBTITLE PARAGRAPH (Concise, single/double line)                       */}
        {/* ========================================================================= */}
        <p className={`text-[9px] sm:text-[10px] line-clamp-2 leading-tight shrink-0 font-medium ${
          isLightMode ? 'text-[#003355]/80' : 'text-gray-300'
        }`}>
          Redefining grassroots peacebuilding and institutional accountability through youth-led governance and digital monitoring across Kenya.
        </p>

        {/* ========================================================================= */}
        {/* 5. ACTION CTA BUTTONS (ABOUT US ● & CIVIC CALCULATOR A.I ✨)              */}
        {/* ========================================================================= */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Button 1: White/Gold CTA with dot */}
          <button
            onClick={() => setShowAboutModal(true)}
            className={`px-3.5 sm:px-4 py-1 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 transition-transform active:scale-95 shadow-sm cursor-pointer shrink-0 ${
              isLightMode
                ? 'bg-[#005587] text-white hover:bg-[#003f66]'
                : 'bg-white text-black hover:bg-gray-200'
            }`}
          >
            <span>ABOUT US</span>
            <span className={`w-1.5 h-1.5 rounded-full ${
              isLightMode ? 'bg-[#E5B80B]' : 'bg-black'
            }`} />
          </button>

          {/* Button 2: Interactive A.I Tool Button */}
          <button
            onClick={() => setShowCalculatorModal(true)}
            className={`px-3 sm:px-4 py-1 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 transition-all active:scale-95 shadow-sm cursor-pointer group shrink-0 border ${
              isLightMode
                ? 'bg-white text-[#003355] border-[#005587]/25 hover:border-[#E5B80B] hover:bg-amber-50/50'
                : 'bg-[#121212] hover:bg-black text-white border-white/20 hover:border-[#E5B80B]'
            }`}
          >
            <span className="group-hover:text-[#E5B80B] transition-colors truncate">
              CIVIC CALCULATOR A.I
            </span>
            <Sparkles className="w-3 h-3 text-[#E5B80B] shrink-0" />
          </button>
        </div>

        {/* ========================================================================= */}
        {/* 6. 2x2 GRID OF MODE / PILLAR CARDS (Ultra-compact)                        */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-2 gap-1.5 shrink-0">
          {pillarsList.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isSelected = selectedPillar === idx;
            return (
              <button
                key={pillar.mode}
                onClick={() => {
                  setSelectedPillar(idx);
                  setActiveCardIndex(pillar.cardIdx);
                }}
                className={`flex items-center gap-1.5 p-1.5 rounded-lg border text-left transition-all duration-150 cursor-pointer ${
                  isLightMode
                    ? isSelected 
                      ? 'bg-white border-[#005587] shadow-[0_2px_8px_rgba(0,85,135,0.18)] ring-1 ring-[#005587]'
                      : 'bg-white/80 border-[#005587]/15 hover:border-[#005587]/35 hover:bg-white'
                    : isSelected 
                      ? 'bg-[#111827] border-[#E5B80B] shadow-[0_0_12px_rgba(229,184,11,0.25)]'
                      : 'bg-[#121214] border-white/10 hover:border-white/25 hover:bg-[#1a1a1c]'
                }`}
              >
                <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 ${
                  isLightMode
                    ? isSelected ? 'bg-[#005587] text-white border-[#005587]' : 'bg-[#005587]/10 text-[#005587] border-[#005587]/20'
                    : isSelected ? 'bg-[#E5B80B] text-black border-[#E5B80B]' : 'bg-white/5 border-white/10 text-gray-300'
                }`}>
                  <Icon className="w-3 h-3" />
                </div>
                <div className="min-w-0">
                  <span className={`text-[7px] sm:text-[8px] font-mono font-bold uppercase tracking-wider block leading-none ${
                    isLightMode ? 'text-[#005587]' : 'text-[#E5B80B]'
                  }`}>
                    {pillar.mode}
                  </span>
                  <span className={`text-[8px] sm:text-[9px] font-black uppercase tracking-tight block truncate mt-0.5 ${
                    isLightMode ? 'text-[#00223f]' : 'text-white'
                  }`}>
                    {pillar.title}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* 7. SUBSECTION HEADER & PAGINATION (● OUR EXPERTISE   — ● ● ● ●)            */}
        {/* ========================================================================= */}
        <div className="flex items-center justify-between w-full shrink-0">
          <div className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${
              isLightMode ? 'bg-[#005587]' : 'bg-[#E5B80B] shadow-[0_0_6px_#E5B80B]'
            }`} />
            <h3 className={`text-[9px] sm:text-[10px] font-black uppercase tracking-wider ${
              isLightMode ? 'text-[#003355]' : 'text-white'
            }`}>
              OUR EXPERTISE
            </h3>
          </div>

          <div className="flex items-center gap-1">
            {initiativeCards.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveCardIndex(i);
                  setSelectedPillar(i);
                }}
                className={`transition-all duration-200 rounded-full cursor-pointer ${
                  i === activeCardIndex
                    ? isLightMode ? 'w-4 h-1 bg-[#005587]' : 'w-4 h-1 bg-[#E5B80B]'
                    : isLightMode ? 'w-1 h-1 bg-gray-300 hover:bg-gray-400' : 'w-1 h-1 bg-gray-600 hover:bg-gray-400'
                }`}
                title={`Pillar ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 8. FEATURED CAROUSEL CARD (Fit to viewport, flexible height, no overflow)  */}
        {/* ========================================================================= */}
        <div className={`relative w-full rounded-2xl overflow-hidden border shadow-xl flex-1 min-h-[140px] max-h-[185px] sm:max-h-[220px] flex flex-col justify-between p-2.5 sm:p-3 transition-colors ${
          isLightMode 
            ? 'bg-[#003355] border-[#005587]/30 text-white' 
            : 'bg-[#0a0a0c] border-white/15 text-white'
        }`}>
          {/* Background image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 pointer-events-none"
            style={{ backgroundImage: `url('${currentCard.image}')` }}
          />
          <div className={`absolute inset-0 pointer-events-none ${
            isLightMode 
              ? 'bg-gradient-to-t from-[#00223f] via-[#003355]/80 to-[#003355]/45' 
              : 'bg-gradient-to-t from-black via-black/75 to-black/35'
          }`} />

          {/* Card Top: Category Pill & Number Badge */}
          <div className="relative z-10 flex items-center justify-between w-full">
            <div className="bg-black/60 backdrop-blur-sm border border-white/20 px-2 py-0.5 rounded-full text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-white">
              {currentCard.badge}
            </div>

            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#E5B80B] text-black font-black text-[10px] sm:text-xs flex items-center justify-center shadow-md">
              {currentCard.pillarNum}
            </div>
          </div>

          {/* Card Bottom Content */}
          <div className="relative z-10 flex flex-col gap-1 mt-auto">
            {/* Kenya Gold Icon */}
            <div className="text-[#E5B80B]">
              <CurrentIcon className="w-4 h-4" />
            </div>

            {/* Title & Arrow Action Button */}
            <div className="flex items-end justify-between gap-2">
              <h4 className="text-base sm:text-lg font-black uppercase tracking-tight text-white leading-tight">
                {currentCard.titleTop} <br />
                {currentCard.titleBottom}
              </h4>

              <button
                onClick={() => setShowCalculatorModal(true)}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/20 backdrop-blur-md hover:bg-[#E5B80B] hover:text-black text-white border border-white/30 flex items-center justify-center transition-all shadow cursor-pointer shrink-0"
                title="View Impact Metrics"
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Accent line + descriptive text */}
            <div className="border-l-2 border-[#E5B80B] pl-2 text-[8px] sm:text-[9px] text-gray-200">
              <span className="line-clamp-1 leading-tight block font-medium">
                {currentCard.desc}
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 9. < SWIPE TO DISCOVER > INDICATOR WITH ARROWS                             */}
        {/* ========================================================================= */}
        <div className="flex items-center justify-center gap-2 shrink-0">
          <button 
            onClick={handlePrevCard}
            className={`transition-colors cursor-pointer p-0.5 ${
              isLightMode ? 'text-[#005587] hover:text-black' : 'text-[#E5B80B] hover:text-white'
            }`}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <span className={`text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] ${
            isLightMode ? 'text-[#005587]' : 'text-[#E5B80B]'
          }`}>
            SWIPE TO DISCOVER
          </span>
          <button 
            onClick={handleNextCard}
            className={`transition-colors cursor-pointer p-0.5 ${
              isLightMode ? 'text-[#005587] hover:text-black' : 'text-[#E5B80B] hover:text-white'
            }`}
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* ========================================================================= */}
        {/* 10. AUDIO PLAYER / CIVIC TICKER BAR WITH PLAY BUTTON & PROGRESS TRACKLINE */}
        {/* ========================================================================= */}
        <div className="flex items-center gap-2 w-full shrink-0">
          <button
            onClick={() => setIsPlayingAudio(!isPlayingAudio)}
            className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border flex items-center justify-center transition-all shrink-0 cursor-pointer ${
              isLightMode
                ? 'border-[#005587]/30 bg-white text-[#005587] hover:bg-[#005587] hover:text-white'
                : 'border-white/20 bg-white/5 hover:bg-[#E5B80B] hover:text-black text-white'
            }`}
            title={isPlayingAudio ? 'Pause Audio Brief' : 'Play Audio Brief'}
          >
            {isPlayingAudio ? (
              <Pause className="w-2.5 h-2.5 fill-current" />
            ) : (
              <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
            )}
          </button>

          {/* Progress bar line */}
          <div className={`flex-1 h-[2px] rounded-full relative overflow-hidden ${
            isLightMode ? 'bg-[#005587]/15' : 'bg-white/20'
          }`}>
            <div 
              className={`absolute top-0 left-0 h-full transition-all duration-300 ${
                isLightMode ? 'bg-[#005587]' : 'bg-[#E5B80B]'
              }`}
              style={{ width: `${audioProgress}%` }}
            />
          </div>

          <span className={`text-[7px] sm:text-[8px] font-mono shrink-0 font-bold ${
            isLightMode ? 'text-[#005587]/70' : 'text-gray-400'
          }`}>
            {isPlayingAudio ? 'SDG 16 AUDIO ON' : 'GRASSROOTS BRIEF'}
          </span>
        </div>

        {/* ========================================================================= */}
        {/* 11. BOLD MANIFESTO BANNER & SCROLLING MARQUEE (Compact bottom footer)    */}
        {/* ========================================================================= */}
        <div className={`shrink-0 border-t pt-1 flex flex-col gap-0.5 ${
          isLightMode ? 'border-[#005587]/15' : 'border-white/10'
        }`}>
          <p className={`text-[7px] sm:text-[8px] font-extrabold uppercase leading-tight tracking-wide text-left truncate ${
            isLightMode ? 'text-[#005587]/80' : 'text-gray-400'
          }`}>
            WELCOME TO THE VANGUARD OF YOUTH-LED PEACEBUILDING &amp; CIVIC ACCOUNTABILITY IN KENYA.
          </p>

          {/* Smooth Continuous Marquee Ticker */}
          <div className={`w-full overflow-hidden whitespace-nowrap py-0.5 rounded border flex items-center text-[7.5px] font-mono ${
            isLightMode 
              ? 'bg-white border-[#005587]/15 text-[#003355]' 
              : 'bg-black/40 border-white/5 text-gray-300'
          }`}>
            <div className="animate-marquee inline-block">
              <span className="text-[#005587] dark:text-[#00C4CC] font-bold">● 47 COUNTIES MAPPED</span>
              <span className="mx-2 opacity-40">|</span>
              <span className="font-semibold">SDG 16.1 &amp; 16.6 REPORTING</span>
              <span className="mx-2 opacity-40">|</span>
              <span className="text-[#E5B80B] font-bold">● M-PESA DARAJA CIVIC BOUNTIES</span>
              <span className="mx-2 opacity-40">|</span>
              <span className="font-semibold">VERIFIED YOUTH ACCORDS</span>
              <span className="mx-2 opacity-40">|</span>
              <span className="text-[#005587] dark:text-[#E5B80B] font-bold">● UN ACCREDITED MONITORING</span>
              <span className="mx-2 opacity-40">|</span>
            </div>
            <div className="animate-marquee inline-block" aria-hidden="true">
              <span className="text-[#005587] dark:text-[#00C4CC] font-bold">● 47 COUNTIES MAPPED</span>
              <span className="mx-2 opacity-40">|</span>
              <span className="font-semibold">SDG 16.1 &amp; 16.6 REPORTING</span>
              <span className="mx-2 opacity-40">|</span>
              <span className="text-[#E5B80B] font-bold">● M-PESA DARAJA CIVIC BOUNTIES</span>
              <span className="mx-2 opacity-40">|</span>
              <span className="font-semibold">VERIFIED YOUTH ACCORDS</span>
              <span className="mx-2 opacity-40">|</span>
              <span className="text-[#005587] dark:text-[#E5B80B] font-bold">● UN ACCREDITED MONITORING</span>
              <span className="mx-2 opacity-40">|</span>
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE CALCULATOR MODAL                                              */}
      {/* ========================================================================= */}
      {showCalculatorModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 animate-fade-in-up"
          onClick={() => setShowCalculatorModal(false)}
        >
          <div 
            className={`relative w-full max-w-lg border rounded-2xl p-5 shadow-2xl flex flex-col gap-3 max-h-[90vh] overflow-y-auto ${
              isLightMode 
                ? 'bg-white border-[#005587]/20 text-[#003355]' 
                : 'bg-[#111113] border-white/20 text-white'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`flex items-start justify-between border-b pb-2 ${
              isLightMode ? 'border-gray-200' : 'border-white/10'
            }`}>
              <div>
                <span className={`text-[9px] font-mono font-bold uppercase ${
                  isLightMode ? 'text-[#005587]' : 'text-[#E5B80B]'
                }`}>
                  A.I PREDICTIVE IMPACT MODEL
                </span>
                <h3 className={`text-xl font-black uppercase tracking-tight mt-0.5 ${
                  isLightMode ? 'text-[#00223f]' : 'text-white'
                }`}>
                  CIVIC IMPACT ESTIMATOR
                </h3>
              </div>
              <button
                onClick={() => setShowCalculatorModal(false)}
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                  isLightMode ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={`text-[10px] font-mono uppercase block mb-1 ${
                  isLightMode ? 'text-gray-600 font-bold' : 'text-gray-400'
                }`}>
                  County Target
                </label>
                <select 
                  value={calcCounty}
                  onChange={(e) => setCalcCounty(e.target.value)}
                  className={`w-full rounded-lg px-2.5 py-1.5 text-xs outline-none border ${
                    isLightMode 
                      ? 'bg-gray-50 border-gray-300 text-gray-900 focus:border-[#005587]' 
                      : 'bg-black/60 border-white/20 text-white focus:border-[#E5B80B]'
                  }`}
                >
                  <option value="Nairobi">Nairobi County (Urban)</option>
                  <option value="Nakuru">Nakuru County (Rift)</option>
                  <option value="Mombasa">Mombasa County (Coast)</option>
                  <option value="Kisumu">Kisumu County (Lake Basin)</option>
                  <option value="Garissa">Garissa County (North-East)</option>
                  <option value="Turkana">Turkana County (Arid Frontier)</option>
                </select>
              </div>

              <div>
                <label className={`text-[10px] font-mono uppercase block mb-1 ${
                  isLightMode ? 'text-gray-600 font-bold' : 'text-gray-400'
                }`}>
                  Pillar Architecture
                </label>
                <select 
                  value={calcPillar}
                  onChange={(e) => setCalcPillar(e.target.value)}
                  className={`w-full rounded-lg px-2.5 py-1.5 text-xs outline-none border ${
                    isLightMode 
                      ? 'bg-gray-50 border-gray-300 text-gray-900 focus:border-[#005587]' 
                      : 'bg-black/60 border-white/20 text-white focus:border-[#E5B80B]'
                  }`}
                >
                  <option value="Youth Peace Dialogue">Mode 01: Youth Peace Dialogue</option>
                  <option value="Civic Grants">Mode 02: Civic Tech Micro-Grants</option>
                  <option value="Justice Audits">Mode 03: Devolved Funds Audit</option>
                  <option value="Global Advocacy">Mode 04: UN/AU Youth Delegation</option>
                </select>
              </div>
            </div>

            <div className={`space-y-3 p-3 rounded-xl border ${
              isLightMode ? 'bg-gray-50 border-gray-200' : 'bg-white/5 border-white/10'
            }`}>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className={isLightMode ? 'text-gray-700 font-medium' : 'text-gray-300'}>Active Youth Monitors:</span>
                  <span className={`font-mono font-bold ${
                    isLightMode ? 'text-[#005587]' : 'text-[#E5B80B]'
                  }`}>{calcParticipants} Champions</span>
                </div>
                <input 
                  type="range" 
                  min="25" 
                  max="2000" 
                  step="25"
                  value={calcParticipants}
                  onChange={(e) => setCalcParticipants(Number(e.target.value))}
                  className="w-full accent-[#005587] dark:accent-[#E5B80B] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className={isLightMode ? 'text-gray-700 font-medium' : 'text-gray-300'}>Initiative Horizon:</span>
                  <span className={`font-mono font-bold ${
                    isLightMode ? 'text-[#005587]' : 'text-[#00C4CC]'
                  }`}>{calcDuration} Months</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="24" 
                  step="1"
                  value={calcDuration}
                  onChange={(e) => setCalcDuration(Number(e.target.value))}
                  className="w-full accent-[#005587] dark:accent-[#00C4CC] cursor-pointer"
                />
              </div>
            </div>

            <div className={`p-3 rounded-xl border flex flex-col gap-2 ${
              isLightMode 
                ? 'bg-[#005587]/5 border-[#005587]/25' 
                : 'bg-[#18181b] border-[#E5B80B]/30'
            }`}>
              <span className={`text-[9px] font-mono uppercase font-bold ${
                isLightMode ? 'text-[#005587]' : 'text-[#E5B80B]'
              }`}>
                Projected Civic Impact Matrix
              </span>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className={`p-2 rounded-lg border ${
                  isLightMode ? 'bg-white border-gray-200' : 'bg-black/50 border-white/5'
                }`}>
                  <span className="text-[8px] font-mono text-gray-500 block font-semibold">CITIZENS ENGAGED</span>
                  <span className={`text-xs sm:text-sm font-black ${
                    isLightMode ? 'text-[#00223f]' : 'text-white'
                  }`}>
                    {(calcParticipants * 24).toLocaleString()}+
                  </span>
                </div>
                <div className={`p-2 rounded-lg border ${
                  isLightMode ? 'bg-white border-gray-200' : 'bg-black/50 border-white/5'
                }`}>
                  <span className="text-[8px] font-mono text-gray-500 block font-semibold">RESOLVED ACCORDS</span>
                  <span className="text-xs sm:text-sm font-black text-[#005587] dark:text-[#00C4CC]">
                    {Math.round(calcParticipants * 0.42 * calcDuration)}
                  </span>
                </div>
                <div className={`p-2 rounded-lg border ${
                  isLightMode ? 'bg-white border-gray-200' : 'bg-black/50 border-white/5'
                }`}>
                  <span className="text-[8px] font-mono text-gray-500 block font-semibold">EST. BUDGET NEED</span>
                  <span className="text-xs sm:text-sm font-black text-[#8a7020] dark:text-[#E5B80B]">
                    KES {(calcParticipants * calcDuration * 1200).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className={`flex items-center justify-end gap-2 pt-2 border-t ${
              isLightMode ? 'border-gray-200' : 'border-white/10'
            }`}>
              <button
                onClick={() => setShowCalculatorModal(false)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold cursor-pointer ${
                  isLightMode ? 'text-gray-600 hover:text-black' : 'text-gray-400 hover:text-white'
                }`}
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowCalculatorModal(false);
                  if (onOpenSubmitModal) onOpenSubmitModal();
                }}
                className={`font-black uppercase text-xs px-5 py-1.5 rounded-full transition-colors cursor-pointer ${
                  isLightMode 
                    ? 'bg-[#005587] hover:bg-[#003f66] text-white shadow-sm' 
                    : 'bg-[#E5B80B] hover:bg-yellow-400 text-black shadow-sm'
                }`}
              >
                Launch In {calcCounty}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* INTERACTIVE ABOUT US MODAL                                                */}
      {/* ========================================================================= */}
      {showAboutModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 animate-fade-in-up"
          onClick={() => setShowAboutModal(false)}
        >
          <div 
            className={`relative w-full max-w-lg border rounded-2xl p-5 shadow-2xl flex flex-col gap-3 ${
              isLightMode 
                ? 'bg-white border-[#005587]/20 text-[#003355]' 
                : 'bg-[#111113] border-white/20 text-white'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`flex items-start justify-between border-b pb-2 ${
              isLightMode ? 'border-gray-200' : 'border-white/10'
            }`}>
              <div>
                <span className={`text-[9px] font-mono font-bold uppercase ${
                  isLightMode ? 'text-[#005587]' : 'text-[#E5B80B]'
                }`}>
                  PAMOJA 16 CHARTER
                </span>
                <h3 className={`text-xl font-black uppercase tracking-tight mt-0.5 ${
                  isLightMode ? 'text-[#00223f]' : 'text-white'
                }`}>
                  ABOUT THE COALITION
                </h3>
              </div>
              <button
                onClick={() => setShowAboutModal(false)}
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                  isLightMode ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className={`text-xs leading-relaxed ${
              isLightMode ? 'text-gray-700' : 'text-gray-300'
            }`}>
              Pamoja 16 is Kenya's foremost youth-anchored civic infrastructure platform dedicated to United Nations Sustainable Development Goal 16: Peace, Justice, and Strong Institutions.
            </p>

            <div className={`space-y-1.5 text-xs p-3 rounded-xl border ${
              isLightMode ? 'bg-gray-50 border-gray-200 text-gray-800' : 'bg-white/5 border-white/10 text-gray-300'
            }`}>
              <div className="flex items-start gap-2">
                <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                  isLightMode ? 'text-[#005587]' : 'text-[#E5B80B]'
                }`} />
                <span>Active civic presence in all 47 counties through certified youth peace ambassadors.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00C4CC] shrink-0 mt-0.5" />
                <span>Integrated M-Pesa Daraja payment pipeline for transparent grassroots micro-donations.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#E5B80B] shrink-0 mt-0.5" />
                <span>Official participatory reporting channel compatible with UN and AU accountability mechanisms.</span>
              </div>
            </div>

            <div className={`flex justify-end pt-2 border-t ${
              isLightMode ? 'border-gray-200' : 'border-white/10'
            }`}>
              <button
                onClick={() => setShowAboutModal(false)}
                className={`font-bold uppercase text-xs px-5 py-1.5 rounded-full transition-all cursor-pointer ${
                  isLightMode 
                    ? 'bg-[#005587] text-white hover:bg-[#003f66]' 
                    : 'bg-white text-black hover:bg-[#E5B80B]'
                }`}
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
