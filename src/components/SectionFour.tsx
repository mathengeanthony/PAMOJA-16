import React, { useState } from 'react';
import { 
  ArrowRight, 
  ArrowUpRight, 
  Sparkles, 
  Search, 
  Languages, 
  ShieldAlert, 
  Clock, 
  MoreHorizontal, 
  Instagram, 
  Twitter, 
  Facebook, 
  X,
  Bot,
  Flame,
  Check,
  Globe2,
  Cpu,
  Layers,
  Zap,
  ShieldCheck,
  TrendingUp,
  SlidersHorizontal,
  ChevronRight,
  FileCheck,
  Vote,
  Award,
  Users
} from 'lucide-react';

interface SectionFourProps {
  onSignUp?: () => void;
  onJoinUsNow?: () => void;
  onExploreSolutions?: () => void;
}

export const SectionFour: React.FC<SectionFourProps> = ({
  onSignUp,
  onJoinUsNow,
  onExploreSolutions
}) => {
  const [activeNav, setActiveNav] = useState<string>('About Pamoja');
  const [activeSolutionsPage, setActiveSolutionsPage] = useState<number>(2);
  const [selectedWordPill, setSelectedWordPill] = useState<string>('SDG 16');
  const [activeArticleModal, setActiveArticleModal] = useState<string | null>(null);

  const navLinks = [
    'Policy Incubator',
    'Civic Solutions',
    'Use Cases',
    'County Reports',
    'About Pamoja',
    'Contact Us'
  ];

  const wordBubbles = [
    { label: 'Peacebuilding', variant: 'outline' },
    { label: '47 Counties', variant: 'outline' },
    { label: 'Devolution', variant: 'outline' },
    { label: 'Oversight', variant: 'outline' },
    { label: 'Justice', variant: 'outline' },
    { label: 'Policy Hub', variant: 'pill-left' },
    { label: '16', variant: 'circle' },
    { label: 'SDG 16', variant: 'active' },
    { label: 'M-Pesa TiPs', variant: 'blue' },
    { label: '47', variant: 'circle' },
    { label: 'Bounties', variant: 'outline' },
    { label: 'Youth Rights', variant: 'outline' },
    { label: 'KMUN', variant: 'outline' },
    { label: 'Democracy', variant: 'outline' },
    { label: 'Verified Badges', variant: 'blue' }
  ];

  const useCases = [
    {
      num: '01',
      title: 'POLICY CO-CREATION & PETITIONS',
      category: 'Collaborative Markdown Legislative Drafting',
      readTime: '6 min read',
      gradient: 'from-emerald-400 via-teal-400 to-green-500',
      description: 'Youth-drafted legislative policy briefs, county petitions, and citizen manifestos with multi-author review and direct assembly submission pipelines.'
    },
    {
      num: '02',
      title: 'PUBLIC PARTICIPATION & FORUMS',
      category: 'Civic Career & Funding Directory',
      readTime: '8 min read',
      gradient: 'from-green-400 via-emerald-500 to-teal-600',
      description: 'Geospatial county peace forum mapping, RSVP tracking, webinar/AMA hub for youth dialogue, and verified impact scores.'
    }
  ];

  return (
    <section id="section-4-shaping-ai" className="w-full max-w-[1380px] mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      
      {/* SECTION 4 MASTER CARD - EXACT REPLICATION OF UPLOADED DESIGN */}
      <div 
        id="section-4-master-card"
        className="w-full bg-[#FFFFFF] text-neutral-900 rounded-[32px] sm:rounded-[40px] p-5 sm:p-8 md:p-10 lg:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.06)] border border-neutral-200/80 transition-all duration-300 relative overflow-hidden"
      >
        
        {/* SUBTLE CARD BACKGROUND ACCENT GLOWS */}
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-emerald-50/40 rounded-full blur-3xl pointer-events-none -z-0" />
        <div className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-teal-50/30 rounded-full blur-3xl pointer-events-none -z-0" />

        {/* ========================================================================= */}
        {/* 1. TOP HEADER NAVIGATION BAR                                              */}
        {/* ========================================================================= */}
        <div id="section-4-header" className="relative z-10 flex items-center justify-between gap-4 pb-8 border-b border-neutral-100/90">
          
          {/* Brand Logo Pamoja 16 Glyph */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E8F8F0] border border-emerald-200 flex items-center justify-center shadow-xs overflow-hidden">
              <div className="text-[#00A859] font-black text-sm">
                P16
              </div>
            </div>
          </div>

          {/* Navigation Links with Active Underdot */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => {
              const isActive = activeNav === link;
              return (
                <button
                  key={link}
                  onClick={() => setActiveNav(link)}
                  className={`text-xs sm:text-sm font-medium transition-all relative flex flex-col items-center cursor-pointer ${
                    isActive 
                      ? 'text-neutral-950 font-semibold' 
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  <span>{link}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00A859] absolute -bottom-2" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Button: Download Pamoja */}
          <div className="flex items-center gap-3">
            <button 
              id="btn-section4-signup"
              onClick={onSignUp}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-white hover:bg-emerald-50 text-neutral-900 px-5 sm:px-6 py-2 sm:py-2.5 text-xs font-semibold shadow-2xs hover:shadow-xs transition-all cursor-pointer"
            >
              <span>Download App</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>


        {/* ========================================================================= */}
        {/* 2. HERO HEADLINE & IMPACT STATEMENT                                       */}
        {/* ========================================================================= */}
        <div id="section-4-hero-banner" className="relative z-10 pt-8 sm:pt-10 pb-8 sm:pb-12">
          
          {/* Main Title Matrix */}
          <div className="flex flex-col gap-1.5 sm:gap-2">
            
            {/* ROW 1: "SHAPING YOUTH CIVIC POWER:" + INLINE PILL */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-bold tracking-tight text-neutral-950 font-sans uppercase leading-none">
                Shaping Youth Civic Power:
              </h1>

              {/* Inline Callout Pill [Join us now | 🔘 Spiral Icon] */}
              <div 
                id="btn-join-us-pill-header"
                onClick={onJoinUsNow}
                className="bg-[#E8F8F0] hover:bg-emerald-100 border border-emerald-200/80 rounded-full p-1.5 pl-4 sm:pl-5 pr-2 inline-flex items-center gap-3 cursor-pointer transition-all shadow-2xs hover:scale-105"
              >
                <span className="text-xs sm:text-sm font-semibold text-emerald-950 tracking-tight whitespace-nowrap">
                  Join 47 Counties
                </span>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#00A859] flex items-center justify-center text-white shadow-xs">
                  <div className="w-3.5 h-3.5 rounded-full border border-white/60 flex items-center justify-center">
                    <span className="w-1 h-1 rounded-full bg-white block" />
                  </div>
                </div>
              </div>
            </div>

            {/* ROW 2: Subtitle on Left + "SDG 16, DEVOLUTION" */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-baseline mt-1 sm:mt-2">
              {/* Left Sub-description */}
              <div className="lg:col-span-4 pr-4">
                <p className="text-xs sm:text-sm leading-relaxed text-neutral-500 font-normal">
                  Discover how Pamoja 16 connects Kenyan youth, civil society, and policy makers to build transparent institutions and sustainable peace.
                </p>
              </div>

              {/* Center-Right Main Display Continuation */}
              <div className="lg:col-span-8">
                <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-bold tracking-tight text-neutral-950 font-sans uppercase leading-none">
                  SDG 16, Devolution
                </h2>
              </div>
            </div>

            {/* ROW 3: ICONS + "AND ACCOUNTABILITY" */}
            <div className="flex flex-wrap items-center justify-start lg:justify-end gap-3 sm:gap-4 mt-1 sm:mt-2">
              {/* Emerald & Cyan Sparkles */}
              <div className="flex items-center gap-2">
                {/* 4-Point Diamond Sparkle */}
                <div className="w-7 h-7 sm:w-9 sm:h-9 bg-emerald-300 text-emerald-900 rounded-lg flex items-center justify-center transform rotate-45 shadow-xs">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 transform -rotate-45" />
                </div>
                {/* Emerald Geometric Plus/Cross */}
                <div className="w-7 h-7 sm:w-9 sm:h-9 bg-teal-300 text-teal-950 rounded-lg flex items-center justify-center shadow-xs">
                  <span className="text-xl sm:text-2xl font-black leading-none">✕</span>
                </div>
              </div>

              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-bold tracking-tight text-neutral-950 font-sans uppercase leading-none">
                And Accountability
              </h2>
            </div>

          </div>

        </div>


        {/* ========================================================================= */}
        {/* 3. BENTO GRID: SOLUTIONS CAPSULE, APPLICATIONS, USE CASES, WORD CLOUD     */}
        {/* ========================================================================= */}
        <div id="section-4-bento-grid" className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-stretch pt-4">
          
          {/* ========================================================================= */}
          {/* LEFT CAPSULE: VERTICAL SOLUTIONS CAPSULE CARD (Cols 1-3)                  */}
          {/* ========================================================================= */}
          <div 
            id="capsule-solutions"
            className="lg:col-span-3 bg-[#E8F8F0] rounded-[32px] p-5 sm:p-6 flex flex-col justify-between items-center relative overflow-hidden min-h-[460px] sm:min-h-[500px] border border-emerald-200/90 shadow-2xs group"
          >
            {/* Top Action Pill */}
            <div className="w-full flex items-center justify-between">
              <div className="w-full bg-white rounded-full p-1.5 pr-2 flex items-center justify-between shadow-xs">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center text-xs font-black">
                  16
                </div>
                <button 
                  onClick={onExploreSolutions}
                  className="w-8 h-8 rounded-full bg-emerald-50 hover:bg-[#00A859] hover:text-white flex items-center justify-center text-neutral-900 transition-all cursor-pointer"
                  aria-label="Explore Civic Solutions"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Vertical Centered Rotated Text */}
            <div className="my-auto flex flex-col items-center justify-center py-6">
              <div className="transform -rotate-90 origin-center whitespace-nowrap flex flex-col items-center gap-3">
                <h3 className="text-3xl sm:text-4xl font-light tracking-tight text-neutral-950 font-sans">
                  Solutions
                </h3>
                <p className="text-[0.68rem] text-neutral-600 font-normal tracking-wide max-w-[280px] text-center">
                  Digital Visibility &amp; Accountability Platform for grassroots Kenyan peacebuilders
                </p>
              </div>
            </div>

            {/* Bottom Pagination Numbers */}
            <div className="w-full flex items-center justify-center gap-2 pt-2">
              <button 
                onClick={() => setActiveSolutionsPage(1)}
                className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${
                  activeSolutionsPage === 1 ? 'bg-[#00A859] text-white' : 'bg-white text-neutral-600 border border-neutral-200'
                }`}
              >
                1
              </button>
              <button 
                onClick={() => setActiveSolutionsPage(2)}
                className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${
                  activeSolutionsPage === 2 ? 'bg-[#00A859] text-white' : 'bg-white text-neutral-600 border border-neutral-200'
                }`}
              >
                2
              </button>
            </div>
          </div>


          {/* ========================================================================= */}
          {/* CENTER-LEFT COLUMN: APPLICATIONS 3D CARD & 2 SOLUTION PILLS (Cols 4-8)    */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-5 sm:gap-6">
            
            {/* Top Card: Applications with Grassroots Peace Summit Banner */}
            <div 
              id="card-applications"
              className="bg-white border border-neutral-200/90 rounded-[28px] overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col"
            >
              {/* Peace Graphic Header */}
              <div 
                className="w-full h-36 sm:h-40 relative bg-emerald-950 overflow-hidden"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent pointer-events-none" />
                
                {/* Emerald Overlay Accent */}
                <div className="absolute inset-0 flex items-center justify-center opacity-70 mix-blend-screen pointer-events-none">
                  <div className="w-full h-full bg-gradient-to-r from-emerald-400/30 via-teal-400/20 to-green-400/30 blur-md" />
                </div>
              </div>

              {/* Body Content */}
              <div className="p-5 sm:p-6 flex flex-col gap-3">
                {/* Meta Row: 15 min read + Overlapping Youth Delegate Avatars */}
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 bg-[#F6F7F9] border border-neutral-200 rounded-full px-3 py-1 text-[0.68rem] font-semibold text-neutral-700">
                    <Clock className="w-3 h-3 text-emerald-600" />
                    <span>47 Counties Active</span>
                  </div>

                  <div className="flex items-center -space-x-2">
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop" 
                      alt="Delegate 1" 
                      className="w-6 h-6 rounded-full border-2 border-white object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop" 
                      alt="Delegate 2" 
                      className="w-6 h-6 rounded-full border-2 border-white object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <img 
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=120&auto=format&fit=crop" 
                      alt="Delegate 3" 
                      className="w-6 h-6 rounded-full border-2 border-white object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="w-6 h-6 rounded-full bg-[#00A859] text-white text-[0.6rem] font-bold border-2 border-white flex items-center justify-center">
                      +47
                    </div>
                  </div>
                </div>

                {/* Title and paragraph */}
                <h3 className="text-xl sm:text-2xl font-normal text-neutral-950 font-sans tracking-tight mt-1">
                  Civic Applications
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Discover how Pamoja 16 scales youth-led policy co-creation, transparent civic grants, and institutional dialogue across Kenya.
                </p>
              </div>
            </div>

            {/* Bottom Card: Policy Translation & Budget Tracking Sub-Cards */}
            <div 
              id="card-solutions-pills"
              className="bg-[#F6F7F9] border border-neutral-200/90 rounded-[28px] p-4 sm:p-5 flex flex-col gap-3 shadow-2xs"
            >
              {/* Item 1: County Policy Translation */}
              <div className="bg-white p-3.5 rounded-2xl border border-neutral-200/80 flex items-start gap-3 shadow-2xs hover:shadow-xs transition-shadow">
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-[#00A859] shrink-0 mt-0.5">
                  <Languages className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs sm:text-sm font-bold text-neutral-950">
                      Policy Translation &amp; Plain Language
                    </h4>
                    <span className="text-emerald-500 text-xs">✦</span>
                  </div>
                  <p className="text-[0.7rem] text-neutral-500 leading-relaxed mt-0.5">
                    Demystifying complex county legislation and Finance Bills into Swahili and accessible youth summaries.
                  </p>
                </div>
              </div>

              {/* Item 2: Public Fund & Budget Oversight */}
              <div className="bg-white p-3.5 rounded-2xl border border-neutral-200/80 flex items-start gap-3 shadow-2xs hover:shadow-xs transition-shadow">
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-[#00A859] shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs sm:text-sm font-bold text-neutral-950">
                      Transparency &amp; Micro-Audits
                    </h4>
                    <span className="text-emerald-500 text-xs font-bold">✔</span>
                  </div>
                  <p className="text-[0.7rem] text-neutral-500 leading-relaxed mt-0.5">
                    Crowdsourced community verification of local development projects and devolved ward allocation funds.
                  </p>
                </div>
              </div>

            </div>

          </div>


          {/* ========================================================================= */}
          {/* RIGHT COLUMN: TRENDING USE CASES & CIVIC TAG CLOUD (Cols 9-12)            */}
          {/* ========================================================================= */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-5 sm:gap-6">
            
            {/* Top Right Card: Trending Pamoja 16 Use Cases */}
            <div 
              id="card-trending-usecases"
              className="bg-[#F6F7F9] border border-neutral-200/90 rounded-[28px] p-5 sm:p-6 flex flex-col justify-between shadow-2xs"
            >
              <div>
                <h3 className="text-base sm:text-lg font-bold text-neutral-950 leading-snug tracking-tight mb-5">
                  Trending civic engagement use cases in the Pamoja 16 App
                </h3>

                {/* List Items */}
                <div className="space-y-4">
                  {useCases.map((uc) => (
                    <div 
                      key={uc.num}
                      onClick={() => setActiveArticleModal(uc.title)}
                      className="flex items-center justify-between pb-3 border-b border-neutral-200/80 last:border-0 last:pb-0 group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-extrabold text-[#00A859] font-sans">
                          {uc.num}
                        </span>

                        {/* Circular holographic/gradient micro avatar */}
                        <div className={`w-6 h-6 rounded-full bg-gradient-to-tr ${uc.gradient} shadow-xs shrink-0 flex items-center justify-center`}>
                          <div className="w-2.5 h-2.5 rounded-full bg-white/60 backdrop-blur-xs" />
                        </div>

                        <span className="text-[0.72rem] sm:text-xs font-bold text-neutral-900 tracking-tight group-hover:text-emerald-600 transition-colors uppercase">
                          {uc.title}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-neutral-400 group-hover:text-neutral-950 transition-colors">
                        <MoreHorizontal className="w-4 h-4 text-emerald-500" />
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Right Card: Tag Cloud / Word Bubble Cluster */}
            <div 
              id="card-word-bubbles"
              className="bg-[#F6F7F9] border border-neutral-200/90 rounded-[28px] p-4 sm:p-5 flex flex-wrap items-center justify-center gap-2 shadow-2xs relative"
            >
              {wordBubbles.map((bubble, idx) => {
                const isSelected = selectedWordPill === bubble.label;
                
                let styleClass = 'bg-white text-neutral-700 border border-neutral-200/90';
                if (bubble.variant === 'active' || isSelected) {
                  styleClass = 'bg-[#00A859] text-white shadow-xs font-bold';
                } else if (bubble.variant === 'blue') {
                  styleClass = 'bg-emerald-100 text-emerald-950 font-bold border border-emerald-300/80';
                } else if (bubble.variant === 'circle') {
                  styleClass = 'bg-white border border-neutral-300 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-neutral-800';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedWordPill(bubble.label)}
                    className={`text-[0.65rem] sm:text-xs px-3 py-1.5 rounded-full transition-all cursor-pointer hover:scale-105 ${styleClass}`}
                  >
                    {bubble.label}
                  </button>
                );
              })}
            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* 4. FLOATING VERTICAL SOCIAL SIDEBAR                                       */}
        {/* ========================================================================= */}
        <div 
          id="section-4-social-sidebar"
          className="absolute right-4 sm:right-6 bottom-8 sm:bottom-12 hidden md:flex flex-col items-center gap-3 z-20"
        >
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-800 shadow-2xs hover:scale-110 transition-all"
            aria-label="Instagram"
          >
            <Instagram className="w-3.5 h-3.5" />
          </a>
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-800 shadow-2xs hover:scale-110 transition-all"
            aria-label="Twitter / X"
          >
            <Twitter className="w-3.5 h-3.5" />
          </a>
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-800 shadow-2xs hover:scale-110 transition-all"
            aria-label="Facebook"
          >
            <Facebook className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>

      {/* ARTICLE USE CASE MODAL */}
      {activeArticleModal && (
        <div 
          id="modal-article-backdrop"
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setActiveArticleModal(null)}
        >
          <div 
            id="modal-article-card"
            className="bg-white text-neutral-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-neutral-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setActiveArticleModal(null)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                Pamoja 16 Deep Dive
              </span>
            </div>

            <h3 className="font-extrabold text-xl text-neutral-950 mt-2">
              {activeArticleModal}
            </h3>

            <div className="my-4 text-xs sm:text-sm text-neutral-600 leading-relaxed space-y-3">
              <p>
                The Pamoja 16 mobile platform provides structured governance frameworks enabling youth in all 47 counties to propose, co-edit, and vote on civic petitions that directly connect to county governance committees.
              </p>
              <div className="bg-[#F6F7F9] p-4 rounded-2xl border border-neutral-200/80 space-y-2">
                <div className="flex justify-between text-xs font-bold text-neutral-900">
                  <span>Counties Mobilized</span>
                  <span className="text-[#00A859]">47 / 47</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-neutral-900">
                  <span>Targeted SDG</span>
                  <span>Goal 16: Peace, Justice &amp; Strong Institutions</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => {
                setActiveArticleModal(null);
                if (onSignUp) onSignUp();
              }}
              className="w-full bg-[#00A859] hover:bg-[#00914c] text-white font-bold py-3 rounded-full text-xs transition-colors cursor-pointer"
            >
              Get Started with Pamoja 16
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
