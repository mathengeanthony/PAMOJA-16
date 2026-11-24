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
  Award,
  Layers,
  BarChart3,
  Radio,
  DollarSign,
  Users,
  Terminal,
  Activity,
  Cpu,
  Zap,
  Lock,
  Unlock,
  MoreHorizontal,
  Home,
  BookOpen,
  Handshake,
  ExternalLink,
  Send
} from 'lucide-react';
import { PeaceLibrarySection } from './PeaceLibrarySection';

interface LuxtenExcellenceProps {
  isLightMode?: boolean;
  onOpenSubmitModal?: () => void;
  onOpenDrawer?: () => void;
  activeMode?: 'platform' | 'action-hub' | 'library';
  onModeChange?: (mode: 'platform' | 'action-hub' | 'library') => void;
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
  onOpenDrawer,
  activeMode: activeModeProp,
  onModeChange
}) => {
  const [internalMode, setInternalMode] = useState<'platform' | 'action-hub' | 'library'>('platform');
  const currentMode = activeModeProp !== undefined ? activeModeProp : internalMode;

  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(38);
  const [showCalculatorModal, setShowCalculatorModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [aboutModalTab, setAboutModalTab] = useState<'charter' | 'partners' | 'roadmap'>('charter');
  const [selectedPillar, setSelectedPillar] = useState<number>(0);
  const [isNodeVerified, setIsNodeVerified] = useState<boolean>(true);

  // Calculator State
  const [calcCounty, setCalcCounty] = useState('Nairobi');
  const [calcPillar, setCalcPillar] = useState('Youth Peace Dialogue');
  const [calcParticipants, setCalcParticipants] = useState(250);
  const [calcDuration, setCalcDuration] = useState(6);

  const isPlatformMode = currentMode === 'platform';
  const isActionHubMode = currentMode === 'action-hub';
  const isLibraryMode = currentMode === 'library';

  const handleSwitchMode = (newMode: 'platform' | 'action-hub' | 'library') => {
    setInternalMode(newMode);
    if (onModeChange) {
      onModeChange(newMode);
    }
    setActiveCardIndex(0);
    setSelectedPillar(0);
  };

  // Content for Action Hub Mode
  const actionHubCards: InitiativeCard[] = [
    {
      id: 'action-1',
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
      id: 'action-2',
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
      id: 'action-3',
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
      id: 'action-4',
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

  // Content for The Platform Mode — aligned with Pamoja 16 Project Proposal (Components 1–4)
  const platformCards: InitiativeCard[] = [
    {
      id: 'platform-1',
      pillarNum: '01',
      badge: 'COMPONENT 1 · NGO CHARTER',
      titleTop: 'ORG SETUP &',
      titleBottom: 'GOVERNANCE',
      desc: 'NGO legal registration, Board + 5 staff onboarding, and internal Constitution, Finance & MOU policies.',
      county: 'Foundation · Aug–Oct 2025',
      image: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=1200&auto=format&fit=crop',
      impactScore: '5+ MOUs & Bylaws',
      verifiedTarget: 'Board + 5 Core Staff',
      icon: Shield
    },
    {
      id: 'platform-2',
      pillarNum: '02',
      badge: 'COMPONENT 2 · ENGAGEMENT',
      titleTop: 'YOUTH FORUMS',
      titleBottom: '& ADVOCACY',
      desc: 'Regional peace dialogues, civic leadership & SDG 16 training workshops, and 3+ county advocacy teams.',
      county: 'Capacity · Feb–Mar 2026',
      image: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=1200&auto=format&fit=crop',
      impactScore: '500+ Youth Engaged',
      verifiedTarget: '100+ Youth Trained · 3 Counties',
      icon: Users
    },
    {
      id: 'platform-3',
      pillarNum: '03',
      badge: 'COMPONENT 3 · DVAP MVP',
      titleTop: 'VISIBILITY',
      titleBottom: 'PLATFORM (DVAP)',
      desc: 'Co-created MVP unifying Submission Portal, Impact Dashboard, Story Wall, Resource Library & Interactive Map.',
      county: 'MVP Launch · Oct 2025–May 2026',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
      impactScore: '50+ Youth Groups',
      verifiedTarget: '200+ Documented Actions',
      icon: Layers
    },
    {
      id: 'platform-4',
      pillarNum: '04',
      badge: 'COMPONENT 4 · MEL ENGINE',
      titleTop: 'MEL & UN',
      titleBottom: 'REPORTING',
      desc: 'Participatory MEL tracking platform usage, project submissions & quarterly learning briefs for national SDG 16 reporting.',
      county: 'Launch · Jun 1–22, 2026',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop',
      impactScore: '5,000+ Online Reach',
      verifiedTarget: 'National Report & UN Sync',
      icon: BarChart3
    }
  ];

  const coalitionOrgs = [
    { name: 'Youth for SDGs Kenya', url: 'https://www.youthforsdgkenya.co.ke', focus: 'Youth SDG Mobilization' },
    { name: 'YSD – Machakos Chapter', url: 'https://www.ysdkenya.org', focus: 'County Sustainable Dev' },
    { name: 'Youth Alive Kenya', url: 'https://www.youthalivekenya.org', focus: 'Civic Empowerment' },
    { name: 'OAYouth – Kenya Chapter', url: 'https://www.oayouthkenya.org', focus: 'African Youth Orgs' },
    { name: 'Champions for SDG Youth', url: '', focus: 'Youth SDG Advocacy' },
    { name: 'Refugee Consortium of Kenya', url: 'https://www.rckkenya.org', focus: 'Refugee & Legal Justice' },
    { name: 'Justice, Peace & Integrity (JPIC)', url: 'https://www.aoskenya.org', focus: 'Peace & Justice' },
    { name: 'Amani Forum', url: '', focus: 'Regional Peace Dialogue' },
    { name: 'UoN – Wangari Maathai Institute', url: 'https://wmi.uonbi.ac.ke', focus: 'Research & Environmental Peace' },
    { name: 'Peace with Land Kenya', url: '', focus: 'Land & Conflict Mediation' }
  ];

  const unPartners = [
    { name: 'Food & Agriculture Organization (FAO)', scope: 'Resource Peace & Food Security' },
    { name: 'UNHCR', scope: 'Refugee Protection & Civic Inclusion' },
    { name: 'UNICEF', scope: 'Youth Participation & Child Justice' },
    { name: 'IOM (UN Migration)', scope: 'Cross-Border Stability & Resilience' }
  ];

  const roadmapPhases = [
    { phase: '01 · Foundation & Legal Setup', window: 'Aug – Oct 2025', kpi: 'NGO Registered • Board + 5 Staff • Internal Bylaws' },
    { phase: '02 · System Design & MVP', window: 'Oct 2025 – Jan 2026', kpi: 'Co-Design Sessions • DVAP MVP Functional • 10 Projects' },
    { phase: '03 · Capacity & Advocacy', window: 'Feb – Mar 2026', kpi: '100+ Youth Trained • 3 County Teams • 5 MOUs Signed' },
    { phase: '04 · Data Onboarding & Beta', window: 'Mar – May 2026', kpi: '50 Projects + 25 Stories • Beta Launch • 5,000+ Reach' },
    { phase: '05 · National Launch & Report', window: 'Jun 1 – Jun 22, 2026', kpi: 'National Event • Impact Report Published • UN/Media' }
  ];

  const actionHubPillars = [
    { mode: 'MODE 01', title: 'KENYA A-B', subtitle: '47 COUNTIES LOCAL', icon: Compass, cardIdx: 0 },
    { mode: 'MODE 02', title: 'EAC CROSS BORDER', subtitle: 'REGIONAL DIALOGUE', icon: MapPin, cardIdx: 1 },
    { mode: 'MODE 03', title: 'SADC TRANS-AFRICA', subtitle: 'CONTINENTAL JUSTICE', icon: Globe2, cardIdx: 2 },
    { mode: 'MODE 04', title: 'GLOBAL TRANSIT', subtitle: 'UN & MULTILATERAL', icon: Scale, cardIdx: 3 }
  ];

  const platformPillars = [
    { mode: 'COMP 01', title: 'NGO SETUP', subtitle: 'BOARD & CHARTER', icon: Shield, cardIdx: 0 },
    { mode: 'COMP 02', title: 'YOUTH FORUMS', subtitle: 'PEACE & TRAINING', icon: Users, cardIdx: 1 },
    { mode: 'COMP 03', title: 'DVAP PLATFORM', subtitle: '5-MODULE MVP', icon: Layers, cardIdx: 2 },
    { mode: 'COMP 04', title: 'MEL ENGINE', subtitle: 'SDG 16 REPORTING', icon: BarChart3, cardIdx: 3 }
  ];

  const initiativeCards = isPlatformMode ? platformCards : actionHubCards;
  const pillarsList = isPlatformMode ? platformPillars : actionHubPillars;

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

  const currentCard = initiativeCards[activeCardIndex] || initiativeCards[0];
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
        {/* 1. TOP MODE SWITCHER (Hero/Map Plain Full-Colour Matte Pills)            */}
        {/* ========================================================================= */}
        <div
          className={`w-full grid grid-cols-3 gap-1.5 sm:gap-2.5 border-b pb-2 shrink-0 transition-colors duration-300 ${
            isLightMode ? 'border-[#005587]/15' : 'border-white/10'
          }`}
        >
          {/* Button 1: The Platform — Plain Full-Colour Matte White Pill */}
          <button
            type="button"
            id="btn-switch-platform"
            onClick={() => handleSwitchMode('platform')}
            aria-pressed={isPlatformMode}
            className={`flex items-center justify-between gap-1.5 py-1.5 sm:py-2 px-2.5 sm:px-4 rounded-full border transition-all duration-200 cursor-pointer text-left bg-white text-[#0b1120] hover:brightness-95 ${
              isLightMode ? 'border-[#003355]/25' : 'border-white'
            } ${
              isPlatformMode
                ? isLightMode
                  ? 'ring-2 ring-[#003355] ring-offset-2 ring-offset-[#f4f7fb] shadow-md'
                  : 'ring-2 ring-[#00C4CC] ring-offset-2 ring-offset-[#050505] shadow-[0_0_16px_rgba(255,255,255,0.28)]'
                : 'opacity-85 hover:opacity-100 shadow-sm'
            }`}
            title="Switch to The Platform mode"
          >
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0b1120] shrink-0" />
              <div className="min-w-0">
                <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-wider block truncate leading-none text-[#0b1120]">
                  THE PLATFORM
                </span>
                <span className="text-[6.5px] sm:text-[7.5px] font-mono font-bold uppercase block truncate tracking-tight mt-0.5 text-[#334155]">
                  CIVIC TECH &amp; OS
                </span>
              </div>
            </div>
            {isPlatformMode && (
              <span className="text-[6.5px] sm:text-[7.5px] font-mono font-black bg-[#0b1120] text-white px-2 py-0.5 rounded-full uppercase shrink-0 hidden md:inline-block">
                ACTIVE
              </span>
            )}
          </button>

          {/* Button 2: Action Hub — Plain Full-Colour Matte Yellow Pill */}
          <button
            type="button"
            id="btn-switch-action-hub"
            onClick={() => handleSwitchMode('action-hub')}
            aria-pressed={isActionHubMode}
            className={`flex items-center justify-between gap-1.5 py-1.5 sm:py-2 px-2.5 sm:px-4 rounded-full border border-[#E5B80B] bg-[#E5B80B] text-black transition-all duration-200 cursor-pointer text-left hover:brightness-105 ${
              isActionHubMode
                ? isLightMode
                  ? 'ring-2 ring-[#003355] ring-offset-2 ring-offset-[#f4f7fb] shadow-md'
                  : 'ring-2 ring-white ring-offset-2 ring-offset-[#050505] shadow-[0_0_16px_rgba(229,184,11,0.4)]'
                : 'opacity-85 hover:opacity-100 shadow-sm'
            }`}
            title="Switch to Action Hub mode"
          >
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black shrink-0" />
              <div className="min-w-0">
                <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-wider block truncate leading-none text-black">
                  ACTION HUB
                </span>
                <span className="text-[6.5px] sm:text-[7.5px] font-mono font-bold uppercase block truncate tracking-tight mt-0.5 text-black/80">
                  PEACE &amp; FIELD
                </span>
              </div>
            </div>
            {isActionHubMode && (
              <span className="text-[6.5px] sm:text-[7.5px] font-mono font-black bg-[#0b1120] text-[#E5B80B] px-2 py-0.5 rounded-full uppercase shrink-0 hidden md:inline-block">
                ACTIVE
              </span>
            )}
          </button>

          {/* Button 3: The Library — Plain Full-Colour Matte Sky Blue Pill */}
          <button
            type="button"
            id="btn-switch-library"
            onClick={() => handleSwitchMode('library')}
            aria-pressed={isLibraryMode}
            className={`flex items-center justify-between gap-1.5 py-1.5 sm:py-2 px-2.5 sm:px-4 rounded-full border border-[#00C4CC] bg-[#00C4CC] text-black transition-all duration-200 cursor-pointer text-left hover:brightness-105 ${
              isLibraryMode
                ? isLightMode
                  ? 'ring-2 ring-[#003355] ring-offset-2 ring-offset-[#f4f7fb] shadow-md'
                  : 'ring-2 ring-white ring-offset-2 ring-offset-[#050505] shadow-[0_0_16px_rgba(0,196,204,0.4)]'
                : 'opacity-85 hover:opacity-100 shadow-sm'
            }`}
            title="Switch to The Library mode"
          >
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black shrink-0" />
              <div className="min-w-0">
                <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-wider block truncate leading-none text-black">
                  THE LIBRARY
                </span>
                <span className="text-[6.5px] sm:text-[7.5px] font-mono font-bold uppercase block truncate tracking-tight mt-0.5 text-black/80">
                  SDG 16 VAULT
                </span>
              </div>
            </div>
            {isLibraryMode && (
              <span className="text-[6.5px] sm:text-[7.5px] font-mono font-black bg-[#0b1120] text-[#00C4CC] px-2 py-0.5 rounded-full uppercase shrink-0 hidden md:inline-block">
                ACTIVE
              </span>
            )}
          </button>
        </div>

        {isPlatformMode ? (
          /* ========================================================================= */
          /* PLATFORM MODE: DVAP BENTO OS DASHBOARD (PROPOSAL & COALITION ALIGNED)     */
          /* ========================================================================= */
          <div className="flex-1 min-h-0 flex flex-col justify-between w-full h-full max-w-md sm:max-w-lg md:max-w-xl mx-auto py-1 px-1">
            
            {/* 1. TOP HEADER (Brand & Official Proposal Metadata) */}
            <div className="flex items-center justify-between w-full px-1 shrink-0">
              <div className="flex items-center gap-2">
                <h1 className={`text-xl sm:text-2xl font-black tracking-tight ${
                  isLightMode ? 'text-[#00223f]' : 'text-white'
                }`}>
                  Pamoja 16
                </h1>
                <span className="text-[7.5px] font-mono font-black px-2 py-0.5 rounded-full bg-[#00C4CC] text-black uppercase">
                  DVAP MVP
                </span>
              </div>
              <div className={`text-right font-mono text-[7px] sm:text-[8px] leading-tight ${
                isLightMode ? 'text-[#003355]/75' : 'text-gray-400'
              }`}>
                <div className="font-bold">Ziel Chan Bol &amp; Victor Mwangolo</div>
                <div className={`mt-0.5 ${isLightMode ? 'text-[#005587]' : 'text-gray-500'}`}>
                  12-Mo NGO Phase • KMUN &amp; Africa for SDGs
                </div>
              </div>
            </div>

            {/* 2. TOP HERO CARD (4 Project Components Carousel) */}
            <div className={`relative w-full rounded-2xl sm:rounded-3xl overflow-hidden p-2.5 sm:p-3.5 flex flex-col justify-between flex-1 min-h-[86px] max-h-[160px] shadow-lg border ${
              isLightMode ? 'bg-[#00223f] border-[#005587]/25' : 'bg-[#0b1120] border-white/15'
            }`}>
              {/* Photo backdrop with dark vignette */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none transition-all duration-700"
                style={{ backgroundImage: `url('${currentCard.image}')` }}
              />
              <div className={`absolute inset-0 pointer-events-none ${
                isLightMode
                  ? 'bg-gradient-to-t from-[#001a30] via-[#00223f]/85 to-[#003355]/45'
                  : 'bg-gradient-to-t from-[#0b1120] via-[#0b1120]/85 to-black/45'
              }`} />

              {/* Title Top Left + Component Badge */}
              <div className="relative z-10 flex items-start justify-between gap-2">
                <div>
                  <h2 className="text-sm sm:text-lg font-black text-white leading-tight uppercase tracking-tight">
                    Youth Action <br />
                    Made Visible
                  </h2>
                </div>
                <span className="text-[7px] sm:text-[7.5px] font-mono font-black px-2 py-0.5 rounded-full bg-[#E5B80B] text-black uppercase shrink-0">
                  {currentCard.badge}
                </span>
              </div>

              {/* Caption Bottom + Carousel Indicator Dots */}
              <div className="relative z-10 mt-auto pt-1">
                <p className="text-[7.5px] sm:text-[8.5px] text-gray-200 line-clamp-2 leading-tight font-medium">
                  {currentCard.desc}
                </p>

                {/* 4 Component Carousel Dots */}
                <div className="flex items-center justify-center gap-1.5 mt-1.5 sm:mt-2">
                  {[0, 1, 2, 3].map((idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setActiveCardIndex(idx);
                        setSelectedPillar(idx);
                      }}
                      className={`rounded-full transition-all duration-200 cursor-pointer ${
                        activeCardIndex === idx 
                          ? 'w-4 h-1 bg-[#00C4CC]' 
                          : 'w-1 h-1 bg-white/35 hover:bg-white/60'
                      }`}
                      title={`Component ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* 3. MIDDLE BENTO ROW (2 Columns: Tall White Module Card + 2 Stacked Cards) */}
            <div className="grid grid-cols-2 gap-2 flex-1 min-h-[104px] max-h-[195px] my-0.5">
              
              {/* Left Column: Tall High-Contrast White Card (Cycles 4 Proposal Components / 5 MVP Features) */}
              <div 
                onClick={handleNextCard}
                className={`rounded-2xl sm:rounded-3xl bg-white text-[#0b1120] p-2.5 sm:p-3 flex flex-col justify-between relative overflow-hidden shadow-md cursor-pointer hover:shadow-xl transition-all group min-h-0 border ${
                  isLightMode ? 'border-[#003355]/15' : 'border-white'
                }`}
                title="Tap to cycle Project Proposal Components 01–04"
              >
                {/* Header */}
                <div>
                  <h3 className="text-xs sm:text-sm font-black text-[#0b1120] uppercase tracking-tight leading-tight">
                    Platform <br />
                    Components
                  </h3>
                  <span className="text-[7.5px] sm:text-[8px] font-bold text-[#005587] uppercase tracking-tight block truncate mt-0.5">
                    {currentCard.titleTop} {currentCard.titleBottom}
                  </span>
                </div>

                {/* Graphic Visual Representation with Dynamic Icon */}
                <div className="my-auto py-1 flex items-center justify-center relative">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#00C4CC]/15 border border-[#00C4CC]/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <CurrentIcon className="w-6 h-6 sm:w-7 sm:h-7 text-[#003355]" />
                  </div>
                  <span className="absolute -bottom-1 text-[7px] font-mono font-black bg-[#0b1120] text-[#E5B80B] px-1.5 py-0.2 rounded-full uppercase">
                    COMP {currentCard.pillarNum}
                  </span>
                </div>

                {/* Bottom Sub-label + Dots Indicator */}
                <div className="flex flex-col items-center gap-1 pt-1">
                  <span className="text-[6.5px] sm:text-[7px] font-mono font-bold text-slate-500 uppercase truncate max-w-full">
                    {currentCard.county}
                  </span>
                  <div className="flex items-center justify-center gap-1">
                    {[0, 1, 2, 3].map((idx) => (
                      <span
                        key={idx}
                        className={`rounded-full transition-all duration-200 ${
                          activeCardIndex === idx 
                            ? 'w-3.5 h-1 bg-[#0b1120]' 
                            : 'w-1 h-1 bg-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: 2 Stacked Cards */}
              <div className="flex flex-col justify-between gap-1.5">
                
                {/* Top Card: Active Component Target / Expected Result */}
                <div className={`rounded-2xl sm:rounded-3xl p-2 sm:p-2.5 flex items-center gap-2 shadow-sm flex-1 min-h-[58px] border ${
                  isLightMode ? 'bg-[#003355] border-[#005587]/25 text-white' : 'bg-[#0b1120] border-white/15 text-white'
                }`}>
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#00C4CC] text-black flex items-center justify-center shrink-0 shadow-sm">
                    <CurrentIcon className="w-4 h-4 text-black" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[7px] font-mono text-[#E5B80B] uppercase tracking-wider block leading-none font-bold">
                      Target KPI
                    </span>
                    <span className="text-xs sm:text-sm font-black text-white block leading-tight mt-0.5 truncate">
                      {currentCard.impactScore}
                    </span>
                    <span className="text-[7px] text-blue-100/75 block leading-none truncate mt-0.5">
                      {currentCard.verifiedTarget}
                    </span>
                  </div>
                </div>

                {/* Bottom Card: Coalition & SDG 16 Reporting Sync Toggle */}
                <div 
                  onClick={() => setIsNodeVerified(!isNodeVerified)}
                  className={`rounded-2xl sm:rounded-3xl bg-white text-[#0b1120] p-2 sm:p-2.5 flex items-center justify-between shadow-sm cursor-pointer hover:shadow-md transition-all flex-1 min-h-[58px] border ${
                    isLightMode ? 'border-[#003355]/15' : 'border-white'
                  }`}
                  title="Toggle National SDG 16 Reporting Verification"
                >
                  <div className="min-w-0 pr-1">
                    <span className="text-xs sm:text-sm font-black text-[#0b1120] uppercase tracking-tight block leading-none">
                      {isNodeVerified ? 'ONBOARDED' : 'SUBMIT HUB'}
                    </span>
                    <span className="text-[7.5px] sm:text-[8px] text-[#005587] font-bold block leading-tight mt-0.5 truncate">
                      {isNodeVerified ? 'UN SDG 16 Ledger Sync' : 'Join Coalition Roster'}
                    </span>
                  </div>

                  <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-transform active:scale-95 ${
                    isNodeVerified ? 'bg-[#0b1120] text-[#00C4CC]' : 'bg-[#E5B80B] text-black'
                  }`}>
                    {isNodeVerified ? (
                      <Lock className="w-3.5 h-3.5" />
                    ) : (
                      <Unlock className="w-3.5 h-3.5" />
                    )}
                  </div>
                </div>

              </div>

            </div>

            {/* 4. THIRD ROW: 3 PROPOSAL KPI STAT TILES */}
            <div className="grid grid-cols-3 gap-1.5 shrink-0">
              <div className={`rounded-xl sm:rounded-2xl p-1.5 sm:p-2 text-center border ${
                isLightMode ? 'bg-white border-[#003355]/15 text-[#00223f]' : 'bg-[#0b1120] border-white/15 text-white'
              }`}>
                <span className={`text-[7px] sm:text-[7.5px] font-mono block leading-none ${
                  isLightMode ? 'text-[#005587]' : 'text-gray-400'
                }`}>
                  Youth Orgs
                </span>
                <span className="text-[10px] sm:text-xs font-black block leading-tight mt-0.5 truncate">
                  50+ Groups
                </span>
              </div>

              <div className={`rounded-xl sm:rounded-2xl p-1.5 sm:p-2 text-center border ${
                isLightMode ? 'bg-white border-[#003355]/15 text-[#00223f]' : 'bg-[#0b1120] border-white/15 text-white'
              }`}>
                <span className={`text-[7px] sm:text-[7.5px] font-mono block leading-none ${
                  isLightMode ? 'text-[#005587]' : 'text-gray-400'
                }`}>
                  Documented
                </span>
                <span className={`text-[10px] sm:text-xs font-black block leading-tight mt-0.5 truncate ${
                  isLightMode ? 'text-[#005587]' : 'text-[#00C4CC]'
                }`}>
                  200+ Projects
                </span>
              </div>

              <div className={`rounded-xl sm:rounded-2xl p-1.5 sm:p-2 text-center border ${
                isLightMode ? 'bg-white border-[#003355]/15 text-[#00223f]' : 'bg-[#0b1120] border-white/15 text-white'
              }`}>
                <span className={`text-[7px] sm:text-[7.5px] font-mono block leading-none ${
                  isLightMode ? 'text-[#005587]' : 'text-gray-400'
                }`}>
                  Youth Engaged
                </span>
                <span className="text-[10px] sm:text-xs font-black block leading-tight mt-0.5 truncate">
                  500+ Voices
                </span>
              </div>
            </div>

            {/* 5. FOURTH ROW: MATTE YELLOW COALITION ACTION PILL + ROADMAP BUTTON (•••) */}
            <div className="flex items-center gap-1.5 shrink-0">
              {/* Matte Yellow Partner & Coalition Pill */}
              <button
                type="button"
                onClick={() => {
                  setAboutModalTab('partners');
                  setShowAboutModal(true);
                }}
                className="flex-1 rounded-full bg-[#E5B80B] border border-[#E5B80B] text-black px-3.5 py-1.5 sm:py-2 flex items-center justify-between cursor-pointer hover:brightness-105 active:scale-[0.99] transition-all shadow-md"
                title="View 10 Youth Organizations & 4 UN SDG 16 Implementing Partners"
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <Handshake className="w-4 h-4 text-black shrink-0" />
                  <span className="text-[10px] sm:text-xs font-black tracking-tight text-black truncate">
                    10 Youth Orgs + 4 UN Partners
                  </span>
                </div>

                {/* Badge Pill */}
                <div className="px-2 py-0.5 rounded-full bg-[#0b1120] text-[#E5B80B] text-[7.5px] sm:text-[8.5px] font-mono font-black uppercase shrink-0">
                  VIEW 14
                </div>
              </button>

              {/* Square Options Button (•••) — Opens Proposal & 2025-2026 Matrix */}
              <button
                type="button"
                onClick={() => {
                  setAboutModalTab('roadmap');
                  setShowAboutModal(true);
                }}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center cursor-pointer active:scale-95 transition-all shadow-sm shrink-0 border ${
                  isLightMode
                    ? 'bg-[#00C4CC] border-[#00C4CC] text-black hover:brightness-105'
                    : 'bg-[#00C4CC] border-[#00C4CC] text-black hover:brightness-105'
                }`}
                title="2025–2026 Implementation Matrix & Proposal"
              >
                <MoreHorizontal className="w-4 h-4 text-black" />
              </button>
            </div>

            {/* 6. BOTTOM NAVIGATION DOCK (5 DVAP Core Links & Proposal Tools) */}
            <div className={`flex items-center justify-around w-full py-1 shrink-0 border-t ${
              isLightMode ? 'text-[#003355] border-[#005587]/15' : 'text-gray-400 border-white/10'
            }`}>
              <button 
                type="button"
                onClick={() => {
                  setActiveCardIndex(2);
                  setSelectedPillar(2);
                }}
                className="relative p-1 cursor-pointer"
                title="DVAP Core Platform"
              >
                <Home className={`w-4 h-4 ${isLightMode ? 'text-[#005587]' : 'text-[#00C4CC]'}`} />
                <span className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                  isLightMode ? 'bg-[#005587]' : 'bg-[#00C4CC]'
                }`} />
              </button>

              <button
                type="button"
                onClick={() => {
                  setAboutModalTab('partners');
                  setShowAboutModal(true);
                }}
                className="p-1 hover:text-[#E5B80B] transition-colors cursor-pointer"
                title="Coalition Partners (10 Orgs + 4 UN)"
              >
                <Globe2 className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setShowCalculatorModal(true)}
                className="p-1 hover:text-[#E5B80B] transition-colors cursor-pointer"
                title="Civic Impact Estimator"
              >
                <Sparkles className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => {
                  if (onOpenSubmitModal) {
                    onOpenSubmitModal();
                  } else {
                    setAboutModalTab('charter');
                    setShowAboutModal(true);
                  }
                }}
                className="p-1 hover:text-[#00C4CC] transition-colors cursor-pointer"
                title="Project Submission Portal"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

          </div>
        ) : isActionHubMode ? (
          /* ========================================================================= */
          /* ACTION HUB MODE: GRASSROOTS INITIATIVES & CAROUSEL LAYOUT                 */
          /* ========================================================================= */
          <div className="flex-1 min-h-0 flex flex-col justify-between w-full h-full">
            {/* Brand & Action Header */}
            <div className="flex items-center justify-between w-full py-0.5 shrink-0">
              <div className="flex items-center gap-2">
                <span className={`text-xs sm:text-sm font-black tracking-wider uppercase font-mono ${
                  isLightMode ? 'text-[#005587]' : 'text-white'
                }`}>
                  PAMOJA 16 ACTION HUB
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
                  title="Grassroots Audio Brief"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => setShowAboutModal(true)}
                  className="hover:text-[#E5B80B] transition-colors p-0.5 cursor-pointer"
                  title="About & Coalition"
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

            {/* Hero Title Row with Rotating Circular Badge */}
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

              {/* Compact Rotating Circular Badge */}
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 flex items-center justify-center">
                <svg 
                  viewBox="0 0 100 100" 
                  className="w-full h-full animate-[spin_12s_linear_infinite] origin-center"
                >
                  <path
                    id="pamojaActionBadge"
                    d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                    fill="none"
                  />
                  <text className={`text-[10.5px] font-mono font-bold uppercase tracking-[0.22em] ${
                    isLightMode ? 'fill-[#005587]' : 'fill-[#E5B80B]'
                  }`}>
                    <textPath href="#pamojaActionBadge" startOffset="0%">
                      • PAMOJA 16 • ACTION HUB • SDG 16 •
                    </textPath>
                  </text>
                </svg>
                <div className={`absolute w-2 h-2 rounded-full shadow-sm ${
                  isLightMode ? 'bg-[#E5B80B]' : 'bg-white shadow-[0_0_6px_#ffffff]'
                }`} />
              </div>
            </div>

            {/* Subtitle Paragraph */}
            <p className={`text-[9px] sm:text-[10px] line-clamp-2 leading-tight shrink-0 font-medium ${
              isLightMode ? 'text-[#003355]/80' : 'text-gray-300'
            }`}>
              Redefining grassroots peacebuilding and institutional accountability through youth-led governance and digital monitoring across Kenya.
            </p>

            {/* Action CTA Buttons */}
            <div className="flex items-center gap-2 shrink-0">
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

            {/* 2x2 Grid of Mode / Pillar Cards */}
            <div className="grid grid-cols-2 gap-1.5 shrink-0">
              {actionHubPillars.map((pillar, idx) => {
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

            {/* Subsection Header & Pagination */}
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
                {actionHubCards.map((_, i) => (
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
                    title={`Item ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Featured Carousel Card */}
            <div className={`relative w-full rounded-2xl overflow-hidden border shadow-xl flex-1 min-h-[92px] max-h-[210px] flex flex-col justify-between p-2 sm:p-3 transition-colors ${
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
                <div className="text-[#E5B80B]">
                  <CurrentIcon className="w-4 h-4" />
                </div>

                <div className="flex items-end justify-between gap-2">
                  <h4 className="text-base sm:text-lg font-black uppercase tracking-tight text-white leading-tight">
                    {currentCard.titleTop} <br />
                    {currentCard.titleBottom}
                  </h4>

                  <button
                    onClick={() => setShowCalculatorModal(true)}
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/20 backdrop-blur-md hover:bg-[#E5B80B] hover:text-black text-white border border-white/30 flex items-center justify-center transition-all shadow cursor-pointer shrink-0"
                    title="View Metrics & Impact"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="border-l-2 border-[#E5B80B] pl-2 text-[8px] sm:text-[9px] text-gray-200">
                  <span className="line-clamp-1 leading-tight block font-medium">
                    {currentCard.desc}
                  </span>
                </div>
              </div>
            </div>

            {/* < SWIPE TO DISCOVER > Indicator */}
            <div className="flex items-center justify-center gap-2 shrink-0">
              <button 
                onClick={handlePrevCard}
                className={`transition-colors cursor-pointer p-0.5 ${
                  isLightMode ? 'text-[#005587] hover:text-black' : 'text-[#E5B80B] hover:text-white'
                }`}
                aria-label="Previous card"
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
                aria-label="Next card"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Audio Player */}
            <div className="flex items-center gap-2 w-full shrink-0">
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border flex items-center justify-center transition-all shrink-0 cursor-pointer ${
                  isLightMode
                    ? 'border-[#005587]/30 bg-white text-[#005587] hover:bg-[#005587] hover:text-white'
                    : 'border-white/20 bg-white/5 hover:bg-white/20 hover:text-white text-white'
                }`}
                title={isPlayingAudio ? 'Pause Audio Brief' : 'Play Audio Brief'}
              >
                {isPlayingAudio ? (
                  <Pause className="w-2.5 h-2.5 fill-current" />
                ) : (
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                )}
              </button>

              <div className={`flex-1 h-[2px] rounded-full relative overflow-hidden ${
                isLightMode ? 'bg-[#005587]/15' : 'bg-white/20'
              }`}>
                <div 
                  className={`absolute top-0 left-0 h-full transition-all duration-300 ${
                    isLightMode ? 'bg-[#005587]' : 'bg-white/80'
                  }`}
                  style={{ width: `${audioProgress}%` }}
                />
              </div>

              <span className={`text-[7px] sm:text-[8px] font-mono shrink-0 font-bold ${
                isLightMode ? 'text-[#005587]/70' : 'text-gray-300'
              }`}>
                {isPlayingAudio ? 'SDG 16 AUDIO ON' : 'GRASSROOTS BRIEF'}
              </span>
            </div>

            {/* Manifesto Banner & Marquee */}
            <div className={`shrink-0 border-t pt-1 flex flex-col gap-0.5 ${
              isLightMode ? 'border-[#005587]/15' : 'border-white/10'
            }`}>
              <p className={`text-[7px] sm:text-[8px] font-extrabold uppercase leading-tight tracking-wide text-left truncate ${
                isLightMode ? 'text-[#005587]/80' : 'text-gray-400'
              }`}>
                WELCOME TO THE VANGUARD OF YOUTH-LED PEACEBUILDING &amp; CIVIC ACCOUNTABILITY IN KENYA.
              </p>

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
        ) : (
          /* ========================================================================= */
          /* THE LIBRARY: TWO VERTICAL SECTIONS (CATEGORY SELECTOR & KNOWLEDGE STREAM) */
          /* ========================================================================= */
          <PeaceLibrarySection 
            isLightMode={isLightMode}
            onOpenSubmitModal={onOpenSubmitModal}
          />
        )}

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
      {/* INTERACTIVE PROPOSAL, COALITION PARTNERS & ROADMAP MODAL                  */}
      {/* ========================================================================= */}
      {showAboutModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 animate-fade-in-up"
          onClick={() => setShowAboutModal(false)}
        >
          <div 
            className={`relative w-full max-w-xl border rounded-2xl p-5 shadow-2xl flex flex-col gap-3 max-h-[88dvh] overflow-y-auto ${
              isLightMode 
                ? 'bg-white border-[#005587]/20 text-[#003355]' 
                : 'bg-[#0b1120] border-white/20 text-white'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`flex items-start justify-between border-b pb-2.5 ${
              isLightMode ? 'border-gray-200' : 'border-white/10'
            }`}>
              <div>
                <span className={`text-[9px] font-mono font-bold uppercase ${
                  isLightMode ? 'text-[#005587]' : 'text-[#E5B80B]'
                }`}>
                  PAMOJA 16 INITIATIVE · JULY 22, 2025
                </span>
                <h3 className={`text-lg sm:text-xl font-black uppercase tracking-tight mt-0.5 ${
                  isLightMode ? 'text-[#00223f]' : 'text-white'
                }`}>
                  PLATFORM CHARTER &amp; COALITION
                </h3>
                <p className={`text-[10px] font-mono mt-0.5 ${
                  isLightMode ? 'text-slate-600' : 'text-gray-400'
                }`}>
                  Proposed by Ziel Chan Bol &amp; Victor Mwangolo • Collaborators: KMUN, Africa for SDGs
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAboutModal(false)}
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                  isLightMode ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Matte Pill Modal Tabs */}
            <div className="grid grid-cols-3 gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => setAboutModalTab('charter')}
                className={`py-1.5 px-2.5 rounded-full text-[10px] font-black uppercase tracking-wider cursor-pointer transition-all ${
                  aboutModalTab === 'charter'
                    ? 'bg-white text-[#0b1120] ring-2 ring-[#00C4CC]'
                    : isLightMode
                    ? 'bg-slate-100 text-[#003355] hover:bg-slate-200'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                DVAP Charter
              </button>
              <button
                type="button"
                onClick={() => setAboutModalTab('partners')}
                className={`py-1.5 px-2.5 rounded-full text-[10px] font-black uppercase tracking-wider cursor-pointer transition-all ${
                  aboutModalTab === 'partners'
                    ? 'bg-[#E5B80B] text-black ring-2 ring-white'
                    : isLightMode
                    ? 'bg-amber-50 text-[#003355] hover:bg-amber-100'
                    : 'bg-[#E5B80B]/20 text-[#E5B80B] hover:bg-[#E5B80B]/30'
                }`}
              >
                Partners (14)
              </button>
              <button
                type="button"
                onClick={() => setAboutModalTab('roadmap')}
                className={`py-1.5 px-2.5 rounded-full text-[10px] font-black uppercase tracking-wider cursor-pointer transition-all ${
                  aboutModalTab === 'roadmap'
                    ? 'bg-[#00C4CC] text-black ring-2 ring-white'
                    : isLightMode
                    ? 'bg-cyan-50 text-[#003355] hover:bg-cyan-100'
                    : 'bg-[#00C4CC]/20 text-[#00C4CC] hover:bg-[#00C4CC]/30'
                }`}
              >
                2025–26 Matrix
              </button>
            </div>

            {aboutModalTab === 'charter' && (
              <div className="space-y-2.5">
                <p className={`text-xs leading-relaxed ${
                  isLightMode ? 'text-gray-700' : 'text-gray-300'
                }`}>
                  Pamoja 16 bridges fragmented youth-led SDG 16 work into a Digital Visibility &amp; Accountability Platform (DVAP) uniting five core pillars: <strong>Project Submission Portal</strong>, <strong>Impact Dashboard</strong>, <strong>Story Wall</strong>, <strong>Resource Library</strong>, and <strong>Interactive Map</strong>.
                </p>

                <div className={`space-y-1.5 text-xs p-3 rounded-xl border ${
                  isLightMode ? 'bg-gray-50 border-gray-200 text-gray-800' : 'bg-white/5 border-white/10 text-gray-300'
                }`}>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00C4CC] shrink-0 mt-0.5" />
                    <span><strong>Expected Results:</strong> 50+ youth groups onboarded, 200+ initiatives documented, 500+ youth mobilized.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#E5B80B] shrink-0 mt-0.5" />
                    <span><strong>Participatory MEL:</strong> Quarterly learning reviews integrating youth SDG 16 metrics into national &amp; UN reporting.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00C4CC] shrink-0 mt-0.5" />
                    <span><strong>Sustainability:</strong> Annual org memberships, partnership grants, university internships &amp; agile platform feedback.</span>
                  </div>
                </div>
              </div>
            )}

            {aboutModalTab === 'partners' && (
              <div className="space-y-3">
                <div>
                  <span className={`text-[9px] font-mono font-black uppercase tracking-wider block mb-1.5 ${
                    isLightMode ? 'text-[#005587]' : 'text-[#E5B80B]'
                  }`}>
                    10 Youth &amp; Peace Organizations
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {coalitionOrgs.map((org, idx) => (
                      <div
                        key={org.name}
                        className={`px-2.5 py-1.5 rounded-xl border flex items-center justify-between gap-2 text-[11px] ${
                          isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/10'
                        }`}
                      >
                        <div className="min-w-0">
                          <span className="font-bold block truncate">
                            {idx + 1}. {org.name}
                          </span>
                          <span className={`text-[9px] font-mono block truncate ${
                            isLightMode ? 'text-slate-500' : 'text-gray-400'
                          }`}>
                            {org.focus}
                          </span>
                        </div>
                        {org.url && (
                          <a
                            href={org.url}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1 rounded-full bg-[#00C4CC] text-black hover:brightness-110 shrink-0"
                            title={`Open ${org.name}`}
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <span className={`text-[9px] font-mono font-black uppercase tracking-wider block mb-1.5 ${
                    isLightMode ? 'text-[#005587]' : 'text-[#00C4CC]'
                  }`}>
                    4 UN SDG 16 Implementing &amp; Donor Partners
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {unPartners.map((partner) => (
                      <div
                        key={partner.name}
                        className={`px-2.5 py-1.5 rounded-xl border text-[11px] ${
                          isLightMode ? 'bg-cyan-50/70 border-cyan-200' : 'bg-[#00C4CC]/10 border-[#00C4CC]/25'
                        }`}
                      >
                        <span className="font-black block truncate">{partner.name}</span>
                        <span className={`text-[9px] block truncate ${
                          isLightMode ? 'text-slate-600' : 'text-cyan-100/75'
                        }`}>
                          {partner.scope}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {aboutModalTab === 'roadmap' && (
              <div className="space-y-1.5">
                {roadmapPhases.map((item) => (
                  <div
                    key={item.phase}
                    className={`p-2.5 rounded-xl border flex flex-col gap-0.5 ${
                      isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-black">{item.phase}</span>
                      <span className="text-[9px] font-mono font-black px-2 py-0.5 rounded-full bg-[#E5B80B] text-black shrink-0">
                        {item.window}
                      </span>
                    </div>
                    <span className={`text-[10px] font-mono ${
                      isLightMode ? 'text-[#005587]' : 'text-[#00C4CC]'
                    }`}>
                      KPI: {item.kpi}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className={`flex items-center justify-between gap-2 pt-2 border-t ${
              isLightMode ? 'border-gray-200' : 'border-white/10'
            }`}>
              <button
                type="button"
                onClick={() => {
                  setShowAboutModal(false);
                  if (onOpenSubmitModal) onOpenSubmitModal();
                }}
                className="font-black uppercase text-[10px] px-4 py-1.5 rounded-full bg-[#00C4CC] text-black hover:brightness-105 transition-all cursor-pointer"
              >
                Submit Project to DVAP
              </button>
              <button
                type="button"
                onClick={() => setShowAboutModal(false)}
                className={`font-black uppercase text-[10px] px-5 py-1.5 rounded-full transition-all cursor-pointer ${
                  isLightMode 
                    ? 'bg-[#003355] text-white hover:bg-[#00223f]' 
                    : 'bg-white text-black hover:bg-[#E5B80B]'
                }`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
