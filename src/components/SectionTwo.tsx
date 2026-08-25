import React, { useState } from 'react';
import { 
  TrendingUp, 
  Disc, 
  ArrowRight, 
  ArrowUpRight, 
  Clock, 
  Play, 
  Target, 
  Link2, 
  Database, 
  X,
  Sparkles,
  Layers,
  Shield,
  Scale,
  Users,
  Award,
  Globe,
  Radio,
  FileCheck,
  CheckCircle2
} from 'lucide-react';

interface SectionTwoProps {
  onStartNow?: () => void;
  onContact?: () => void;
}

export const SectionTwo: React.FC<SectionTwoProps> = ({ onStartNow, onContact }) => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<string>('peacebuilding');
  const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false);
  const [isPlatformToggled, setIsPlatformToggled] = useState<boolean>(true);
  const [showLearnMoreModal, setShowLearnMoreModal] = useState<boolean>(false);

  const categories = [
    { id: 'peacebuilding', label: 'Peace & Dialogues', icon: Shield },
    { id: 'access-justice', label: 'Access to Justice', icon: Scale },
    { id: 'accountability', label: 'Devolution & Accountability', icon: Link2 },
    { id: 'sdg16-tracking', label: 'SDG 16 Tracking', icon: Database },
    { id: 'youth-advocacy', label: '47-County Youth Advocacy', icon: Users },
  ];

  const slideImages = [
    'https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=1200&auto=format&fit=crop', // Youth community forum
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop', // Group collaboration
    'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop'  // Leadership dialogue
  ];

  return (
    <section id="section-2-pamoja16" className="w-full max-w-[1380px] mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      
      {/* SECTION 2 MAIN CARD CONTAINER - EXACT REPLICATION WITH PAMOJA 16 CIVIC CONTENT */}
      <div 
        id="section-2-master-card"
        className="w-full bg-[#FFFFFF] text-neutral-900 rounded-[32px] sm:rounded-[40px] p-5 sm:p-8 md:p-10 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-neutral-200/80 transition-all duration-300 relative overflow-hidden"
      >
        
        {/* SUBTLE CARD BACKGROUND ACCENTS */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-50/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-50/30 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        {/* 1. TOP HEADER ROW */}
        <div id="section-2-header" className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 pb-8 sm:pb-10 border-b border-neutral-100">
          
          {/* BRAND & STATS */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#00A859] flex items-center justify-center text-white font-black text-xs shadow-xs">
                P16
              </div>
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 font-sans">
                Pamoja 16
              </span>
            </div>

            {/* Micro Metrics */}
            <div className="flex items-center gap-6 pl-2 sm:pl-4 border-l border-neutral-200">
              <div>
                <span className="text-sm sm:text-base font-bold text-neutral-950 tracking-tight block leading-tight">
                  47 Counties
                </span>
                <span className="text-[0.65rem] sm:text-[0.7rem] text-neutral-400 font-medium block">
                  Devolution Coverage
                </span>
              </div>
              <div>
                <span className="text-sm sm:text-base font-bold text-neutral-950 tracking-tight block leading-tight">
                  500+ Youth
                </span>
                <span className="text-[0.65rem] sm:text-[0.7rem] text-neutral-400 font-medium block">
                  Peace Advocates &amp; Leaders
                </span>
              </div>
            </div>
          </div>

          {/* NAV LINKS & ACTION BUTTONS */}
          <div className="flex flex-wrap items-center justify-between md:justify-end w-full md:w-auto gap-5 sm:gap-8">
            <nav className="hidden lg:flex items-center gap-6 sm:gap-7">
              {['Mission', 'DVAP Platform', 'SDG 16 Tracker', 'Opportunities'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-xs sm:text-sm font-medium text-neutral-600 hover:text-neutral-950 transition-colors"
                >
                  {link}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3 ml-auto md:ml-0">
              <button 
                id="btn-section2-contact"
                onClick={onContact}
                className="rounded-full border border-neutral-300 px-5 sm:px-6 py-2 sm:py-2.5 text-xs font-semibold text-neutral-800 hover:bg-neutral-100 transition-all cursor-pointer"
              >
                Get App
              </button>
              <button 
                id="btn-section2-start"
                onClick={onStartNow}
                className="rounded-full bg-[#00A859] hover:bg-[#00914c] text-white px-5 sm:px-6 py-2 sm:py-2.5 text-xs font-semibold transition-all shadow-sm cursor-pointer"
              >
                Join Movement
              </button>
            </div>
          </div>

        </div>

        {/* 2. MAIN BENTO CONTENT GRID */}
        <div id="section-2-bento-grid" className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 pt-8 sm:pt-10">
          
          {/* LEFT COLUMN: STATS ROW + DISPLAY HEADLINE + PARAGRAPH (Cols 1-7) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-8 sm:gap-10">
            
            {/* TOP ROW: TWO CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              
              {/* CARD 1: CIVIC IMPACT STATS CARD */}
              <div 
                id="card-bio-assets"
                className="bg-[#ECEEF2] p-3 sm:p-3.5 rounded-[24px] flex flex-col gap-2.5 shadow-2xs hover:shadow-md transition-shadow"
              >
                {/* Upper Dark Pill */}
                <div className="bg-[#0F1113] text-white p-3.5 rounded-[18px] flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                    <span className="text-xl sm:text-2xl font-bold tracking-tight text-white font-sans">
                      200+
                    </span>
                  </div>
                  <span className="text-[0.62rem] sm:text-[0.66rem] text-neutral-400 font-normal leading-tight text-right">
                    SDG 16 actions<br />documented
                  </span>
                </div>

                {/* Lower Row */}
                <div className="flex items-center justify-between px-1 py-0.5">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-[#00A859] flex items-center justify-center text-white shrink-0">
                      <FileCheck className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-neutral-950 block leading-tight">
                        50+ Grassroots
                      </span>
                      <span className="text-[0.6rem] text-neutral-500 block leading-tight">
                        Youth CBOs &amp; NGO Partners
                      </span>
                    </div>
                  </div>

                  <button 
                    id="btn-bio-assets-arrow"
                    onClick={() => setShowLearnMoreModal(true)}
                    className="w-8 h-8 rounded-full bg-[#D7DBE2] hover:bg-neutral-300 flex items-center justify-center text-neutral-900 transition-colors cursor-pointer"
                    aria-label="View SDG 16 Solutions"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* CARD 2: WATCH VIDEO CARD */}
              <div 
                id="card-watch-video"
                onClick={() => setIsVideoOpen(true)}
                className="bg-white border border-neutral-200/90 rounded-[24px] p-3.5 sm:p-4 flex items-center justify-between gap-3 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
              >
                {/* Left side text */}
                <div className="flex flex-col justify-between h-full py-0.5">
                  <div className="inline-flex items-center gap-1.5 bg-white border border-neutral-200 rounded-full px-2.5 py-1 text-[0.68rem] font-semibold text-neutral-700 w-fit shadow-2xs">
                    <Clock className="w-3 h-3 text-[#00A859]" />
                    <span>Watch Doc</span>
                  </div>

                  <div className="mt-3">
                    <h4 className="font-bold text-neutral-950 text-sm sm:text-base leading-tight">
                      Youth for Peace
                    </h4>
                    <p className="text-[0.7rem] text-neutral-400 font-medium leading-snug mt-0.5">
                      Pamoja 16 Origin Film
                    </p>
                  </div>
                </div>

                {/* Right side video thumbnail with play overlay */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-[18px] relative overflow-hidden shrink-0 shadow-inner">
                  <img 
                    src="https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=400&auto=format&fit=crop" 
                    alt="Pamoja 16 Peace Forum Preview"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] flex items-center justify-center">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/40 backdrop-blur-md border border-white/60 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
                      <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* BOTTOM SECTION: HEADLINE + PILL + AVATARS + SUMMARY */}
            <div className="flex flex-col justify-end pt-4 sm:pt-6">
              
              {/* DISPLAY HEADLINE WITH INLINE ACTION PILL & AVATARS */}
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-normal tracking-tight text-neutral-950 leading-[1.12] font-sans">
                <div>Empowering youth</div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 my-0.5">
                  <span>for peace &amp;</span>
                  
                  {/* Learn More Pill */}
                  <button 
                    id="btn-learn-more-pill"
                    onClick={() => setShowLearnMoreModal(true)}
                    className="inline-flex items-center gap-1.5 bg-[#00A859] hover:bg-[#00914c] text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all shadow-sm cursor-pointer"
                  >
                    <span>Explore DVAP</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span>accountability</span>

                  {/* 3 Circular Micro Badges */}
                  <div className="inline-flex items-center -space-x-2.5 py-1">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white overflow-hidden shadow-xs bg-neutral-950 flex items-center justify-center">
                      <img 
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" 
                        alt="Kenyan Youth Lead" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white overflow-hidden shadow-xs bg-neutral-950 flex items-center justify-center">
                      <img 
                        src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop" 
                        alt="Peace Advocate" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white overflow-hidden shadow-xs bg-neutral-950 flex items-center justify-center text-amber-300">
                      <Shield className="w-4 h-4 text-emerald-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* PARAGRAPH TEXT */}
              <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed max-w-[560px] mt-4 sm:mt-6 font-normal">
                Founded by Ziel Chan Bol and Victor Mwangolo, the Pamoja 16 Initiative blends civic engagement with digital innovation. The Pamoja 16 App unites youth across 47 Kenyan counties to track SDG 16, co-author policy petitions, mobilize peace dialogues, and access micro-bounties and global research grants.
              </p>

            </div>

          </div>

          {/* RIGHT COLUMN: HERO 3D CIVIC VISUAL CARD (Cols 8-12) */}
          <div className="lg:col-span-5 flex flex-col">
            <div 
              id="card-hero-3d-visual"
              className="w-full min-h-[440px] sm:min-h-[480px] lg:min-h-[520px] rounded-[32px] overflow-hidden relative flex flex-col justify-between p-4 sm:p-5 shadow-xl transition-transform duration-300 bg-neutral-950"
              style={{
                backgroundImage: `url('${slideImages[activeSlide]}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Gradient Overlay for visual depth & contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30 pointer-events-none" />

              {/* VERTICAL PAGINATION DOTS ON LEFT */}
              <div className="relative z-10 flex flex-col gap-2.5 self-start pt-6 pl-1">
                {slideImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                      activeSlide === idx 
                        ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] scale-110' 
                        : 'border border-white/60 bg-transparent hover:bg-white/40'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* BOTTOM FROSTED GLASS CALLOUT CARD */}
              <div 
                id="frosted-join-card"
                className="relative z-10 w-full bg-white/20 backdrop-blur-xl border border-white/30 rounded-[24px] p-4 sm:p-5 flex items-center justify-between text-white shadow-2xl"
              >
                {/* Left Text */}
                <div className="flex items-center">
                  <div>
                    <span className="font-bold text-lg sm:text-xl text-white block leading-tight tracking-tight">
                      download the
                    </span>
                    <span className="font-bold text-lg sm:text-xl text-white block leading-tight tracking-tight">
                      pamoja 16 app
                    </span>
                  </div>

                  <div className="hidden sm:block border-l border-white/30 pl-3.5 ml-3.5 text-xs text-white/90 leading-tight font-light">
                    &amp; track<br />civic<br />impact
                  </div>
                </div>

                {/* Right Interactive Toggle / CTA Pill */}
                <div 
                  onClick={() => {
                    setIsPlatformToggled(!isPlatformToggled);
                    if (onStartNow) onStartNow();
                  }}
                  className="bg-white/40 hover:bg-white/50 backdrop-blur-md rounded-full p-1 pl-3.5 flex items-center justify-end gap-2 cursor-pointer transition-all shadow-inner"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#00A859] flex items-center justify-center text-white shadow-md hover:scale-105 transition-transform">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* 3. BOTTOM PILL CATEGORIES BAR */}
        <div id="section-2-category-bar" className="relative z-10 flex flex-wrap items-center justify-start sm:justify-between gap-2.5 sm:gap-3 pt-8 sm:pt-10 mt-6 sm:mt-8 border-t border-neutral-100">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`cat-pill-${cat.id.replace(/\s+/g, '-')}`}
                onClick={() => setActiveCategory(cat.id)}
                className={`py-2.5 px-4 sm:px-5 rounded-full flex items-center gap-2 text-xs font-semibold transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-[#00A859] text-white shadow-sm' 
                    : 'bg-[#ECEEF2] text-neutral-800 hover:bg-[#E2E5EA]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-neutral-600'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* VIDEO MODAL */}
      {isVideoOpen && (
        <div 
          id="modal-video-backdrop"
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setIsVideoOpen(false)}
        >
          <div 
            id="modal-video-card"
            className="bg-neutral-950 rounded-2xl max-w-2xl w-full p-4 sm:p-6 border border-white/20 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-3 mb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                <span className="text-sm font-bold text-white">Pamoja 16 Initiative • Documentary Briefing</span>
              </div>
              <button 
                onClick={() => setIsVideoOpen(false)}
                className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close Video"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-video w-full rounded-xl overflow-hidden bg-neutral-900 relative flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=1200&auto=format&fit=crop" 
                alt="Pamoja 16 Documentary Video Frame"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white gap-3">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/50 flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform cursor-pointer">
                  <Play className="w-6 h-6 fill-white ml-0.5" />
                </div>
                <p className="text-xs font-semibold bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm">
                  Connecting Youth Grassroots to National SDG 16 Reporting
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LEARN MORE MODAL */}
      {showLearnMoreModal && (
        <div 
          id="modal-learn-more-backdrop"
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setShowLearnMoreModal(false)}
        >
          <div 
            id="modal-learn-more-card"
            className="bg-white text-neutral-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-neutral-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowLearnMoreModal(false)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#00A859] text-white flex items-center justify-center font-bold">
                P16
              </div>
              <div>
                <h3 className="font-extrabold text-xl text-neutral-950">Digital Visibility &amp; Accountability Platform</h3>
                <p className="text-xs text-neutral-500">Proposed by Ziel Chan Bol &amp; Victor Mwangolo</p>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-neutral-600 leading-relaxed my-4">
              <p>
                In collaboration with Kenya Model United Nations (KMUN) and Africa for SDGs, the Pamoja 16 platform addresses the fragmentation of youth peace actions through 5 core pillars:
              </p>
              <div className="bg-[#ECEEF2] p-3.5 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-neutral-900">
                  <span>Project Submission Portal</span>
                  <span className="text-emerald-600">Active</span>
                </div>
                <div className="flex items-center justify-between text-xs font-bold text-neutral-900">
                  <span>47-County Geospatial Map</span>
                  <span className="text-emerald-600">Integrated</span>
                </div>
                <div className="flex items-center justify-between text-xs font-bold text-neutral-900">
                  <span>M-Pesa Daraja Civic Crowdfunding</span>
                  <span className="text-emerald-600">Enabled</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => {
                setShowLearnMoreModal(false);
                if (onStartNow) onStartNow();
              }}
              className="w-full bg-[#00A859] hover:bg-[#00914c] text-white font-bold py-3 rounded-full text-xs transition-colors cursor-pointer mt-2"
            >
              Download Pamoja 16 App
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
