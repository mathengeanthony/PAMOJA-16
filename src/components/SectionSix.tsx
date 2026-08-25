import React, { useState } from 'react';
import { 
  ArrowRight, 
  ArrowUpRight, 
  ArrowDownRight,
  ArrowLeft,
  Briefcase, 
  Menu, 
  Sparkles, 
  Star, 
  Play, 
  Plus, 
  Check, 
  ShieldCheck, 
  X,
  Award,
  HeartHandshake,
  DollarSign,
  TrendingUp
} from 'lucide-react';

interface SectionSixProps {
  onShopNow?: () => void;
  onCheckCatalog?: () => void;
  onAddToCart?: () => void;
}

export const SectionSix: React.FC<SectionSixProps> = ({
  onShopNow,
  onCheckCatalog,
  onAddToCart
}) => {
  const [activeNav, setActiveNav] = useState<string>('GRANTS');
  const [appliedCount, setAppliedCount] = useState<number>(3);
  const [activeDealIndex, setActiveDealIndex] = useState<number>(0);
  const [showCatalogModal, setShowCatalogModal] = useState<boolean>(false);
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);

  const navItems = ['GRANTS', 'BOUNTIES', 'FELLOWSHIPS', 'CAREERS'];

  const dealProducts = [
    {
      title: 'KMUN PEACE CATALYST GRANT',
      subtitle: 'FUNDING UP TO KES 250,000 FOR YOUTH-LED COMMUNITY DIALOGUE INITIATIVES AND DEVOLVED COUNTY OVERSIGHT',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=400&auto=format&fit=crop'
    },
    {
      title: 'AFRICA FOR SDGS FELLOWSHIP',
      subtitle: '6-MONTH FULLY SPONSORED CIVIC RESEARCH & GOVERNANCE INTERNSHIP WITH UN MULTILATERAL PARTNERS',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=400&auto=format&fit=crop'
    }
  ];

  const handleAdd = () => {
    setAppliedCount(prev => prev + 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
    if (onAddToCart) onAddToCart();
  };

  return (
    <section id="section-6-probiotichub" className="w-full max-w-[1380px] mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      
      {/* SECTION 6 MASTER CARD CONTAINER - EXACT REPLICATION OF UPLOADED DESIGN */}
      <div 
        id="section-6-master-card"
        className="w-full bg-[#FFFFFF] text-neutral-900 rounded-[32px] sm:rounded-[40px] p-5 sm:p-8 md:p-10 lg:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.06)] border border-neutral-200/80 transition-all duration-300 relative overflow-hidden font-sans"
      >
        
        {/* SUBTLE CARD BACKGROUND ATMOSPHERIC GRADIENTS */}
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-emerald-50/40 rounded-full blur-3xl pointer-events-none -z-0" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-amber-50/30 rounded-full blur-3xl pointer-events-none -z-0" />

        {/* ========================================================================= */}
        {/* 1. TOP HEADER ROW                                                         */}
        {/* ========================================================================= */}
        <div id="section-6-header" className="relative z-10 flex items-center justify-between gap-4 pb-8 sm:pb-10 border-b border-neutral-100/90">
          
          {/* Logo Left: (◎) PAMOJA GRANTS & CAREERS */}
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-[#00A859] flex items-center justify-center text-white text-[0.6rem] font-black">
              16
            </div>
            <span className="text-sm sm:text-base font-extrabold tracking-widest text-neutral-950 uppercase font-sans">
              PAMOJA 16 OPPORTUNITIES
            </span>
          </div>

          {/* Center Nav Pills */}
          <nav className="hidden md:flex items-center gap-2 bg-[#F6F6F6] p-1.5 rounded-full border border-neutral-200/80">
            {navItems.map((item) => {
              const isActive = activeNav === item;
              return (
                <button
                  key={item}
                  onClick={() => setActiveNav(item)}
                  className={`text-[0.7rem] font-bold tracking-wider px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-white text-neutral-950 shadow-2xs font-extrabold' 
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  {isActive ? `• ${item}` : item}
                </button>
              );
            })}
          </nav>

          {/* Right Icons: Menu + Opportunities Folder */}
          <div className="flex items-center gap-2.5">
            <button 
              className="w-9 h-9 rounded-full bg-[#F6F6F6] hover:bg-neutral-200 border border-neutral-200/80 flex items-center justify-center text-neutral-800 transition-colors shadow-2xs cursor-pointer"
              aria-label="Menu"
            >
              <Menu className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setShowCatalogModal(true)}
              className="w-9 h-9 rounded-full bg-[#E8F8F0] hover:bg-emerald-100 border border-emerald-200/80 flex items-center justify-center text-[#00A859] transition-colors shadow-2xs relative cursor-pointer"
              aria-label="Saved Opportunities"
            >
              <Briefcase className="w-4 h-4" />
              {appliedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#00A859] text-white text-[0.6rem] font-bold flex items-center justify-center">
                  {appliedCount}
                </span>
              )}
            </button>
          </div>

        </div>


        {/* ========================================================================= */}
        {/* 2. HERO HEADLINE & TOP RIGHT CIVIC STAMP + DESCRIPTION                     */}
        {/* ========================================================================= */}
        <div id="section-6-hero" className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-8 sm:pt-10 pb-8 sm:pb-12 items-start">
          
          {/* LEFT 7 COLS: LARGE DISPLAY TITLE */}
          <div className="lg:col-span-7 flex flex-col">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-medium tracking-tight text-neutral-950 uppercase font-sans leading-[1.05]">
              UNLEASHING THE
            </h1>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 my-1 sm:my-1.5">
              <span className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-medium tracking-tight text-neutral-950 uppercase font-sans leading-[1.05]">
                POWER
              </span>

              {/* Sub-label Badge */}
              <div className="text-[0.6rem] sm:text-[0.65rem] font-bold text-neutral-500 uppercase tracking-wider max-w-[160px] leading-tight pl-2 border-l border-[#00A859]">
                CIVIC CAREERS, RESEARCH GRANTS &amp; YOUTH BOUNTIES
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <span className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-medium tracking-tight text-neutral-950 uppercase font-sans leading-[1.05]">
                OF YOUTH-LED
              </span>
            </div>

            <div className="mt-2 sm:mt-3">
              {/* Pill Outlined ADVOCACY */}
              <span className="inline-block border-2 border-[#00A859] text-neutral-950 rounded-full px-6 sm:px-8 py-1 sm:py-2 text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-medium tracking-tight uppercase font-sans leading-[1.05]">
                ADVOCACY
              </span>
            </div>
          </div>

          {/* RIGHT 5 COLS: ROTATING STAMP, PARAGRAPH & CTAS */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full pt-2 lg:pt-4">
            
            {/* Top Stamp / Civic Visual Badge */}
            <div className="flex items-center gap-4 sm:gap-6 self-start mb-6">
              {/* Kenyan flag / youth initiative snippet */}
              <div className="w-12 h-12 rounded-full overflow-hidden border border-neutral-200 shadow-2xs">
                <img 
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=200&auto=format&fit=crop" 
                  alt="Civic Action specimen" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Circular Play Button Stamp */}
              <button 
                onClick={() => setShowVideoModal(true)}
                className="w-12 h-12 rounded-full border border-neutral-950 bg-white flex items-center justify-center text-neutral-950 hover:scale-105 transition-transform shadow-2xs relative cursor-pointer group"
                aria-label="Play Pamoja 16 Introduction"
              >
                <Play className="w-4 h-4 fill-[#00A859] text-[#00A859] ml-0.5" />
                <span className="absolute -top-6 text-[0.55rem] font-extrabold uppercase tracking-widest text-[#00A859]">
                  PAMOJA 16
                </span>
              </button>

              {/* Floral Radial Sunburst Line Art */}
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-[#00A859]">
                <svg viewBox="0 0 40 40" className="w-10 h-10 animate-[spin_18s_linear_infinite]" fill="none" stroke="currentColor" strokeWidth="1.25">
                  <circle cx="20" cy="20" r="14" strokeDasharray="2 3" />
                  <path d="M20 2v6 M20 32v6 M2 20h6 M32 20h6 M7 7l5 5 M28 28l5 5 M7 33l5-5 M28 12l5-5" />
                </svg>
              </div>
            </div>

            {/* Paragraph Text */}
            <p className="text-[0.72rem] sm:text-[0.78rem] text-neutral-600 font-normal leading-relaxed uppercase tracking-wider max-w-md mb-6">
              AT PAMOJA 16, WE CONNECT VISIONARY YOUTH WITH RESEARCH GRANTS, NGO INTERNSHIPS, BOUNTIES, AND M-PESA CROWDFUNDING TO ELEVATE SDG 16 INSTITUTIONAL REFORM IN KENYA.
            </p>

            {/* Action Buttons: [EXPLORE OPPORTUNITIES] & CHECK DIRECTORY ↗ */}
            <div className="flex items-center gap-5">
              <button 
                id="btn-section6-shopnow"
                onClick={onShopNow}
                className="bg-[#00A859] hover:bg-[#00914c] text-white px-7 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
              >
                APPLY FOR GRANTS
              </button>
              <button 
                id="btn-section6-catalog"
                onClick={() => {
                  setShowCatalogModal(true);
                  if (onCheckCatalog) onCheckCatalog();
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-950 hover:text-emerald-700 transition-colors cursor-pointer"
              >
                <span>CHECK DIRECTORY</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>


        {/* ========================================================================= */}
        {/* 3. BENTO MAIN CONTENT AREA: LEFT CARD & RIGHT CIVIC HUB SHOWCASE          */}
        {/* ========================================================================= */}
        <div id="section-6-bento-grid" className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 pt-4 items-stretch">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: ARROW + FEATURED GRANT CARD (Cols 1-4)                       */}
          {/* ========================================================================= */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-5">
            
            {/* Top Prompt with Circular Arrow Down Right */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-800 shrink-0">
                <ArrowDownRight className="w-4 h-4" />
              </div>
              <p className="text-[0.68rem] text-neutral-500 font-bold uppercase tracking-wider leading-relaxed">
                MICRO-TASKS, COUNTY FORUM MAPPING &amp; POLICY TRANSLATION BOUNTIES.
              </p>
            </div>

            {/* Hot Deal Grant Card */}
            <div 
              id="card-hot-deal-synthopro"
              className="bg-[#E8F8F0] rounded-[28px] p-5 sm:p-6 flex flex-col justify-between border border-emerald-200/90 shadow-2xs"
            >
              {/* Header Row: ACTIVE GRANT + [VIEW ALL] */}
              <div className="flex items-center justify-between">
                <span className="text-[0.7rem] font-black uppercase tracking-wider text-emerald-950">
                  OPEN CIVIC GRANT
                </span>
                <button 
                  onClick={() => setShowCatalogModal(true)}
                  className="bg-[#00A859] hover:bg-[#00914c] text-white rounded-full px-3.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  VIEW ALL
                </button>
              </div>

              {/* Graphic + Specimen preview */}
              <div className="my-5 flex items-center justify-between gap-3">
                {/* Sunburst line glyph */}
                <div className="w-12 h-12 flex items-center justify-center text-[#00A859]">
                  <svg viewBox="0 0 32 32" className="w-10 h-10 animate-spin" style={{ animationDuration: '24s' }} fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="16" cy="16" r="4" fill="currentColor" />
                    <path d="M16 2v4 M16 26v4 M2 16h4 M26 16h4 M6 6l3 3 M23 23l3 3 M6 26l3-3 M23 9l3-3" />
                  </svg>
                </div>

                {/* 3D Micro Thumbnail */}
                <div className="w-24 h-20 rounded-2xl overflow-hidden bg-white/70 border border-emerald-200/80 shadow-2xs">
                  <img 
                    src={dealProducts[activeDealIndex].image} 
                    alt="Pamoja Civic Grant Banner" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Title and description */}
              <div>
                <h4 className="text-base font-extrabold uppercase tracking-tight text-neutral-950 font-sans">
                  {dealProducts[activeDealIndex].title}
                </h4>
                <p className="text-[0.65rem] text-neutral-600 uppercase tracking-wider leading-relaxed mt-1">
                  {dealProducts[activeDealIndex].subtitle}
                </p>
              </div>

              {/* Navigation pagination arrows */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-emerald-200/80">
                <button 
                  onClick={() => setActiveDealIndex(0)}
                  className="w-7 h-7 rounded-full bg-white hover:bg-neutral-200 flex items-center justify-center text-neutral-800 transition-colors shadow-2xs cursor-pointer"
                  aria-label="Previous Deal"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-1">
                  <span className={`w-3 h-0.5 rounded-full ${activeDealIndex === 0 ? 'bg-[#00A859]' : 'bg-neutral-300'}`} />
                  <span className={`w-3 h-0.5 rounded-full ${activeDealIndex === 1 ? 'bg-[#00A859]' : 'bg-neutral-300'}`} />
                </div>

                <button 
                  onClick={() => setActiveDealIndex(1)}
                  className="w-7 h-7 rounded-full bg-white hover:bg-neutral-200 flex items-center justify-center text-neutral-800 transition-colors shadow-2xs cursor-pointer"
                  aria-label="Next Deal"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>


          {/* ========================================================================= */}
          {/* RIGHT COLUMN: PAMOJA HERO SHOWCASE BANNER (Cols 5-12)                     */}
          {/* ========================================================================= */}
          <div className="lg:col-span-8 flex flex-col justify-between gap-5">
            
            {/* Top Showcase Card: Soft Emerald Ambient Container */}
            <div 
              id="card-vitaflora-hero"
              className="w-full min-h-[380px] sm:min-h-[420px] rounded-[32px] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden bg-[#EBF7F0] border border-emerald-200/70 shadow-sm"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* Ambient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#EBF7F0]/95 via-[#EBF7F0]/85 to-transparent pointer-events-none" />
              
              {/* TOP ROW: PAMOJA FLOATING FROSTED CARD + 3 TOP PILL THUMBNAILS */}
              <div className="relative z-10 flex flex-col sm:flex-row items-start justify-between gap-4">
                
                {/* Frosted Glass Pamoja Floating Info Pill */}
                <div className="bg-white/90 backdrop-blur-md rounded-[24px] p-4 sm:p-5 max-w-[280px] border border-white/80 shadow-lg">
                  <h3 className="text-base font-extrabold uppercase tracking-tight text-neutral-950 font-sans">
                    PAMOJA CIVIC FUND
                  </h3>
                  <p className="text-[0.65rem] text-neutral-600 uppercase tracking-wider leading-relaxed mt-1">
                    DIRECT SEED FUNDING &amp; MICRO-TIPPING VIA M-PESA DARAJA FOR CERTIFIED YOUTH PEACE COMMITTEES.
                  </p>

                  <button 
                    id="btn-add-to-cart"
                    onClick={handleAdd}
                    className={`w-full mt-3 rounded-full py-2 px-4 text-[0.68rem] font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-2xs cursor-pointer ${
                      addedAnimation 
                        ? 'bg-[#00A859] text-white' 
                        : 'bg-white hover:bg-[#00A859] hover:text-white text-neutral-900 border border-neutral-300'
                    }`}
                  >
                    {addedAnimation ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>PROPOSAL SAVED</span>
                      </>
                    ) : (
                      <>
                        <span>SUBMIT APPLICATION</span>
                        <Plus className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>

                  {/* Rating & Avatars */}
                  <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-neutral-200/80">
                    <div className="flex items-center -space-x-1.5">
                      <img 
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" 
                        alt="Grant recipient 1" 
                        className="w-5 h-5 rounded-full border border-white object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <img 
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" 
                        alt="Grant recipient 2" 
                        className="w-5 h-5 rounded-full border border-white object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="flex items-center gap-1 text-[0.7rem] font-extrabold text-[#00A859]">
                      <Star className="w-3 h-3 fill-[#00A859] text-[#00A859]" />
                      <span>98% Approval</span>
                    </div>
                  </div>
                </div>

                {/* 3 Top-Right Pill Thumbnails */}
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <div className="h-10 px-3 rounded-full bg-white/80 backdrop-blur-md border border-white/80 flex items-center gap-2 shadow-2xs">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-[#00A859] text-[0.6rem] font-bold">
                      KES
                    </div>
                    <span className="text-[0.65rem] font-bold text-neutral-800 uppercase tracking-tight">
                      M-Pesa
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-white/80 flex items-center justify-center shadow-2xs overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=120&auto=format&fit=crop" 
                      alt="County Dialogue" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-white/80 flex items-center justify-center shadow-2xs overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=120&auto=format&fit=crop" 
                      alt="Peace summit" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

              </div>

              {/* Bottom Tag Pills */}
              <div className="relative z-10 flex flex-wrap items-center gap-2 pt-6">
                <span className="bg-white/90 backdrop-blur-md border border-white/90 rounded-full px-4 py-1.5 text-[0.65rem] font-extrabold uppercase tracking-wider text-neutral-900 shadow-2xs">
                  CIVIC MICRO-GRANTS
                </span>
                <span className="bg-white/90 backdrop-blur-md border border-white/90 rounded-full px-4 py-1.5 text-[0.65rem] font-extrabold uppercase tracking-wider text-neutral-900 shadow-2xs">
                  UN FELLOWSHIPS
                </span>
                <span className="bg-white/90 backdrop-blur-md border border-white/90 rounded-full px-4 py-1.5 text-[0.65rem] font-extrabold uppercase tracking-wider text-emerald-800 shadow-2xs">
                  ✦ VERIFIED BADGES
                </span>
              </div>

            </div>

            {/* Bottom 3-Column Specs / Grants Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-neutral-200/80">
              
              {/* Col 1: PAMOJA SEED & Metrics */}
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-black uppercase tracking-tight text-neutral-950 font-sans">
                    PAMOJA SEED ®
                  </h4>
                </div>
                <div className="text-[0.65rem] text-emerald-700 font-bold uppercase tracking-wider mt-0.5">
                  (16) — PEACE CATALYST
                </div>

                <div className="flex items-baseline gap-4 mt-3">
                  <div>
                    <span className="text-xl sm:text-2xl font-bold text-neutral-950 font-sans block leading-none">
                      47
                    </span>
                    <span className="text-[0.6rem] text-neutral-400 font-bold uppercase">
                      COUNTIES
                    </span>
                  </div>
                  <div>
                    <span className="text-xl sm:text-2xl font-bold text-[#00A859] font-sans block leading-none">
                      KES 25M
                    </span>
                    <span className="text-[0.6rem] text-neutral-400 font-bold uppercase">
                      POOL
                    </span>
                  </div>
                </div>
              </div>

              {/* Col 2: TRANSPARENCY, VERIFICATION, AUDIT */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-tight text-neutral-950 font-sans">
                  TRANSPARENCY, VERIFICATION, AUDIT.
                </h4>
                <p className="text-[0.62rem] text-neutral-500 uppercase tracking-wider leading-relaxed mt-1.5">
                  EVERY SHILLING DISBURSED VIA M-PESA DARAJA IS RECORDED IN PUBLIC TRANSPARENCY LEDGERS WITH MILESTONE-BASED VERIFICATION BADGES.
                </p>
              </div>

              {/* Col 3: YOUTH, POLICY, ACTION */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-tight text-neutral-950 font-sans">
                  YOUTH, POLICY, ACTION.
                </h4>
                <p className="text-[0.62rem] text-neutral-500 uppercase tracking-wider leading-relaxed mt-1.5">
                  OPPORTUNITIES SPANNING UN CONSULTANCIES, COUNTY GOVERNANCE FELLOWSHIPS, CITIZEN JOURNALISM, AND PEACE FORUM CO-ORDINATION.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* DIRECTORY MODAL */}
      {showCatalogModal && (
        <div 
          id="modal-catalog-backdrop"
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setShowCatalogModal(false)}
        >
          <div 
            id="modal-catalog-card"
            className="bg-white text-neutral-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-neutral-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowCatalogModal(false)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full">
                Pamoja 16 Opportunities Directory
              </span>
            </div>

            <h3 className="font-extrabold text-xl text-neutral-950 uppercase mt-1">
              Active Civic Grants &amp; Fellowships
            </h3>

            <div className="my-4 space-y-3">
              <div className="bg-[#F6F6F6] p-3.5 rounded-2xl flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-neutral-900 uppercase">Kenya Model UN Youth Fellowship</h4>
                  <span className="text-[0.68rem] text-neutral-500 uppercase">Diplomacy &amp; SDG 16 Research</span>
                </div>
                <span className="text-xs font-extrabold text-[#00A859]">KES 150,000</span>
              </div>

              <div className="bg-[#F6F6F6] p-3.5 rounded-2xl flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-neutral-900 uppercase">County Forum Mapping Bounty</h4>
                  <span className="text-[0.68rem] text-neutral-500 uppercase">Field Data Collection • 47 Counties</span>
                </div>
                <span className="text-xs font-extrabold text-[#00A859]">KES 25,000</span>
              </div>
            </div>

            <button 
              onClick={() => {
                setShowCatalogModal(false);
                if (onShopNow) onShopNow();
              }}
              className="w-full bg-[#00A859] hover:bg-[#00914c] text-white font-bold py-3 rounded-full text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Open Direct Application Pipeline
            </button>
          </div>
        </div>
      )}

      {/* VIDEO MODAL */}
      {showVideoModal && (
        <div 
          id="modal-video-probiotic-backdrop"
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setShowVideoModal(false)}
        >
          <div 
            id="modal-video-probiotic-card"
            className="bg-neutral-950 rounded-3xl max-w-xl w-full p-5 sm:p-6 shadow-2xl relative border border-white/20 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-3 mb-3 border-b border-white/10">
              <span className="text-xs font-bold tracking-widest uppercase">Pamoja 16 Grassroots Overview</span>
              <button onClick={() => setShowVideoModal(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-neutral-900 relative flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop" 
                alt="Pamoja 16 Introduction Video"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/50 flex items-center justify-center text-white shadow-xl">
                  <Play className="w-6 h-6 fill-white ml-0.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
