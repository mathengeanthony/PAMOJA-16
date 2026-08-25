import React, { useState } from 'react';
import { 
  Grid, 
  ArrowRight, 
  ArrowUpRight, 
  Phone, 
  Mail, 
  Globe, 
  Menu, 
  Plus, 
  X, 
  Eye, 
  ThumbsUp, 
  QrCode, 
  Sparkles,
  ExternalLink,
  ChevronRight,
  Check,
  Share2,
  Users,
  Compass,
  FileText,
  LifeBuoy,
  Shield,
  Scale,
  Award,
  BookOpen
} from 'lucide-react';

interface SectionThreeProps {
  onVisitWebsite?: () => void;
  onVisitPortfolio?: () => void;
  onJoinUs?: () => void;
}

export const SectionThree: React.FC<SectionThreeProps> = ({
  onVisitWebsite,
  onVisitPortfolio,
  onJoinUs
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('Pamoja 16 NGO');
  const [activeSideTab, setActiveSideTab] = useState<'invite' | 'prompts' | 'ecosystem'>('invite');
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [showQrModal, setShowQrModal] = useState<boolean>(false);
  const [showReviewModal, setShowReviewModal] = useState<boolean>(false);
  const [likesCount, setLikesCount] = useState<number>(237);
  const [hasLiked, setHasLiked] = useState<boolean>(false);

  const tags = [
    'Kenya Model UN',
    'Africa for SDGs',
    '47 Counties',
    'DVAP Hub',
    'Pamoja 16 NGO'
  ];

  const carouselItems = [
    {
      title: 'Policy Incubator',
      image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=400&auto=format&fit=crop',
      category: 'Legislative Co-Drafting'
    },
    {
      title: 'Peace Forums',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=400&auto=format&fit=crop',
      category: 'County Dialogues'
    },
    {
      title: 'SDG 16 Tracking',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=400&auto=format&fit=crop',
      category: 'National Reports'
    }
  ];

  const handleLikeToggle = () => {
    if (hasLiked) {
      setLikesCount(prev => prev - 1);
      setHasLiked(false);
    } else {
      setLikesCount(prev => prev + 1);
      setHasLiked(true);
    }
  };

  return (
    <section id="section-3-aempore" className="w-full max-w-[1380px] mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      
      {/* MASTER SECTION CONTAINER - EXACT REPLICATION OF PAMOJA 16 BENTO ARCHITECTURE */}
      <div 
        id="section-3-master-card"
        className="w-full bg-[#FFFFFF] text-neutral-900 rounded-[32px] sm:rounded-[40px] p-4 sm:p-7 md:p-9 lg:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.06)] border border-neutral-200/80 transition-all duration-300 relative overflow-hidden"
      >
        
        {/* ATMOSPHERIC BACKGROUND RADIAL ACCENTS */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-50/30 rounded-full blur-3xl pointer-events-none -z-0" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-amber-50/25 rounded-full blur-3xl pointer-events-none -z-0" />

        {/* 3-COLUMN RESPONSIVE LAYOUT */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-start">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: BRAND, PILLS, DESCRIPTION, MINI CAROUSEL, CONTACT, FOOTER   */}
          {/* ========================================================================= */}
          <div 
            id="section3-col-left"
            className="lg:col-span-3 flex flex-col justify-between h-full bg-[#F6F7F9] rounded-[28px] p-5 sm:p-6 border border-neutral-200/70"
          >
            {/* 1. Header */}
            <div>
              <div className="flex items-center justify-between pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-[#00A859] flex items-center justify-center text-white text-[0.6rem] font-black shadow-xs">
                    P16
                  </div>
                  <h3 className="font-extrabold text-base sm:text-lg tracking-tight text-neutral-950 font-sans">
                    Pamoja 16
                  </h3>
                </div>

                <button 
                  id="btn-aempore-header-arrow"
                  onClick={onVisitPortfolio}
                  className="w-8 h-8 rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-800 transition-colors shadow-2xs cursor-pointer"
                  aria-label="Pamoja 16 Action"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 2. Tag Pills Matrix */}
              <div className="flex flex-wrap gap-1.5 pt-1 pb-3">
                {tags.map((tag) => {
                  const isSelected = selectedTag === tag;
                  return (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`text-[0.68rem] sm:text-xs font-semibold px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-white border-2 border-[#00A859] text-neutral-950 shadow-2xs font-bold' 
                          : 'bg-white/80 hover:bg-white text-neutral-600 border border-neutral-200/90'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>

              {/* 3. See all SDG 16 Initiatives Link */}
              <a 
                href="#all-initiatives" 
                onClick={(e) => { e.preventDefault(); setSelectedTag('Pamoja 16 NGO'); }}
                className="inline-flex items-center gap-1.5 text-[0.72rem] font-bold text-neutral-900 hover:text-emerald-700 transition-colors my-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A859] inline-block" />
                <span>See all 47-County Initiatives</span>
              </a>

              {/* 4. Company Paragraph */}
              <p className="text-[0.75rem] leading-relaxed text-neutral-500 font-normal my-3">
                Proposed by Ziel Chan Bol &amp; Victor Mwangolo, Pamoja 16 establishes a youth-driven NGO blending civic engagement with digital innovation to institutionalize peace and justice across Kenya.
              </p>

              {/* 5. Mini Feature Showcase Preview Cards */}
              <div className="space-y-2 my-4">
                {carouselItems.slice(0, 2).map((item, idx) => (
                  <div 
                    key={item.title}
                    onClick={() => setActiveCardIndex(idx)}
                    className={`p-1.5 pr-3 rounded-xl bg-white border border-neutral-200/90 flex items-center justify-between gap-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer ${
                      activeCardIndex === idx ? 'ring-1 ring-[#00A859]' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-8 rounded-lg overflow-hidden shrink-0 bg-neutral-100">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <span className="text-[0.7rem] font-bold text-neutral-800 tracking-tight">
                        {item.title}
                      </span>
                    </div>
                    <span className="text-[0.62rem] text-neutral-400 font-medium">
                      0{idx + 1}
                    </span>
                  </div>
                ))}

                {/* Pagination Bullets */}
                <div className="flex items-center justify-center gap-1.5 pt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A859]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
                </div>
              </div>

              {/* 6. Connect with Us */}
              <div className="pt-2 pb-3 border-t border-neutral-200/80">
                <span className="text-[0.7rem] font-extrabold uppercase tracking-wider text-neutral-900 block mb-2">
                  Connect with Secretariat
                </span>
                
                <div className="space-y-1.5">
                  <a 
                    href="tel:+254700000000"
                    className="flex items-center justify-between text-[0.72rem] text-neutral-700 hover:text-neutral-950 font-medium py-1 px-2 rounded-lg hover:bg-white transition-all group"
                  >
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-neutral-500 group-hover:text-emerald-600" />
                      <span>+254 (0) 20 PAMOJA</span>
                    </div>
                    <ArrowUpRight className="w-3 h-3 text-neutral-400 group-hover:text-emerald-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>

                  <a 
                    href="mailto:contact@pamoja16.org"
                    className="flex items-center justify-between text-[0.72rem] text-neutral-700 hover:text-neutral-950 font-medium py-1 px-2 rounded-lg hover:bg-white transition-all group"
                  >
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-neutral-500 group-hover:text-emerald-600" />
                      <span>secretariat@pamoja16.org</span>
                    </div>
                    <ArrowUpRight className="w-3 h-3 text-neutral-400 group-hover:text-emerald-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* 7. Footer & Visit Portfolio CTA */}
            <div className="pt-4 border-t border-neutral-200/80">
              <p className="text-[0.62rem] text-neutral-400 leading-snug mb-3">
                In partnership with KMUN &amp; Africa for SDGs. @2025 Pamoja 16 Initiative.
              </p>
              
              <button 
                id="btn-visit-portfolio"
                onClick={onVisitPortfolio}
                className="w-full bg-[#00A859] hover:bg-[#00914c] text-white rounded-full py-2.5 px-4 text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
                <span>Explore Impact Hub</span>
              </button>
            </div>

          </div>


          {/* ========================================================================= */}
          {/* CENTER COLUMN: 3D CIVIC BANNER, HEADLINE & DOWNLOAD PAMOJA 16 APP        */}
          {/* ========================================================================= */}
          <div 
            id="section3-col-center"
            className="lg:col-span-6 flex flex-col justify-between h-full gap-6"
          >
            
            {/* 1. Large 3D Civic Artwork Banner */}
            <div 
              id="center-artwork-banner"
              className="w-full h-[320px] sm:h-[380px] md:h-[420px] rounded-[32px] overflow-hidden relative p-5 sm:p-6 flex flex-col justify-between shadow-lg bg-slate-900 group"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=1200&auto=format&fit=crop')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Soft Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20 pointer-events-none" />

              {/* TOP ROW OVERLAYS: '16' GLASS BADGE + DOWNLOAD APP QR CODE */}
              <div className="relative z-10 flex items-start justify-between">
                
                {/* 16 Glass Card */}
                <div className="bg-white/20 backdrop-blur-xl border border-white/40 rounded-2xl p-3 sm:p-4 text-white shadow-lg">
                  <span className="text-3xl sm:text-4xl font-extrabold tracking-tight block leading-none font-sans text-emerald-300">
                    16
                  </span>
                  <span className="text-[0.65rem] sm:text-[0.7rem] text-white/90 font-medium mt-1 block">
                    SDG Goal Action
                  </span>
                </div>

                {/* Download App & QR Code */}
                <div 
                  onClick={() => setShowQrModal(true)}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-xl border border-white/40 rounded-2xl p-2.5 sm:p-3 text-white flex items-center gap-2.5 cursor-pointer transition-all shadow-lg group-hover:scale-105"
                >
                  <div className="text-right">
                    <span className="text-xs font-bold block leading-tight">Download</span>
                    <span className="text-[0.65rem] text-white/90 block leading-tight">Pamoja 16 App</span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-white/90 p-1 flex items-center justify-center text-neutral-900 shadow-inner">
                    <QrCode className="w-full h-full" />
                  </div>
                </div>

              </div>

              {/* Center Specular Highlight Glow effect */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-44 h-44 rounded-full bg-emerald-500/20 blur-2xl animate-pulse" />
              </div>

              {/* Bottom decorative micro-indicator */}
              <div className="relative z-10 self-end">
                <span className="text-[0.65rem] font-bold text-white/90 tracking-widest uppercase bg-black/50 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
                  Digital Visibility &amp; Accountability Platform
                </span>
              </div>
            </div>

            {/* 2. Display Headline with Reviews pill and Subtitle */}
            <div className="pt-2 sm:pt-4">
              
              {/* Row 1: Democratic + Avatars + See Reviews */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-neutral-950 font-sans leading-none">
                  Democratic
                </h2>

                {/* 3 Overlapping Avatars + See Impact */}
                <div 
                  onClick={() => setShowReviewModal(true)}
                  className="inline-flex items-center gap-2 bg-[#F6F7F9] hover:bg-neutral-200/80 px-2.5 py-1.5 rounded-full border border-neutral-200/80 cursor-pointer transition-colors"
                >
                  <div className="flex items-center -space-x-2">
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop" 
                      alt="Youth Leader 1" 
                      className="w-6 h-6 rounded-full border-2 border-white object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop" 
                      alt="Youth Leader 2" 
                      className="w-6 h-6 rounded-full border-2 border-white object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <img 
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150&auto=format&fit=crop" 
                      alt="Youth Leader 3" 
                      className="w-6 h-6 rounded-full border-2 border-white object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex items-center gap-1 text-[0.68rem] font-bold text-neutral-800">
                    <span>See</span>
                    <ArrowUpRight className="w-2.5 h-2.5 text-neutral-600" />
                    <span>Evidence</span>
                  </div>
                </div>
              </div>

              {/* Row 2: "Let's Bright the future by learning" + "Innovations" */}
              <div className="flex flex-wrap sm:flex-nowrap items-baseline gap-4 mt-2">
                <div className="text-[0.72rem] leading-tight text-neutral-500 font-medium max-w-[120px] shrink-0">
                  Building youth<br />peace &amp; justice<br />machineries
                </div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-neutral-950 font-sans leading-none">
                  Innovations
                </h2>
              </div>

              {/* 3. Download App CTA Button */}
              <div className="mt-5 sm:mt-6">
                <button 
                  id="btn-visit-website"
                  onClick={onVisitWebsite}
                  className="inline-flex items-center gap-3 bg-white hover:bg-neutral-100 border border-neutral-300 text-neutral-950 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full transition-all shadow-2xs hover:shadow-xs cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-[#00A859] inline-block" />
                  <span>Download App on Google Play / iOS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>


          {/* ========================================================================= */}
          {/* RIGHT COLUMN: QUICK NAV, RADIAL RBAC HUB, 237 STATS & CASE CARD          */}
          {/* ========================================================================= */}
          <div 
            id="section3-col-right"
            className="lg:col-span-3 flex flex-col justify-between h-full gap-5 bg-[#F6F7F9] rounded-[28px] p-5 sm:p-6 border border-neutral-200/70"
          >
            
            {/* 1. Top Quick Action Navbar */}
            <div className="flex items-center justify-between gap-2">
              <button 
                id="btn-join-us-pill"
                onClick={onJoinUs}
                className="bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-900 text-xs font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A859] inline-block" />
                <span>Join Advocacy</span>
              </button>

              <div className="flex items-center gap-2">
                <button 
                  id="btn-globe-action"
                  className="w-8 h-8 rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-800 transition-colors shadow-2xs cursor-pointer"
                  aria-label="Language / Global"
                >
                  <Globe className="w-3.5 h-3.5" />
                </button>
                <button 
                  id="btn-menu-action"
                  className="w-8 h-8 rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-800 transition-colors shadow-2xs cursor-pointer"
                  aria-label="More Options"
                >
                  <Menu className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 2. Interactive Radial RBAC Community Hub & Floating Options */}
            <div className="relative py-2 flex items-center justify-between">
              
              {/* Radial Orbit Avatar Circle - 5 RBAC Entities */}
              <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full border border-neutral-300/80 bg-white flex items-center justify-center shadow-xs shrink-0">
                {/* Center Pamoja 16 Shield Icon */}
                <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center text-[#00A859]">
                  <Shield className="w-3.5 h-3.5" />
                </div>

                {/* Orbiting User Avatars in 4 Cardinal Positions */}
                {/* Top Avatar - Individual Youth */}
                <div className="absolute top-2 w-7 h-7 rounded-full overflow-hidden border-2 border-white shadow-xs" title="Individual Youth Lead">
                  <img 
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop" 
                    alt="Youth Lead" 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                {/* Right Avatar - Verified NGO */}
                <div className="absolute right-2 w-7 h-7 rounded-full overflow-hidden border-2 border-white shadow-xs" title="Verified NGO Partner">
                  <img 
                    src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=150&auto=format&fit=crop" 
                    alt="NGO Partner" 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                {/* Bottom Avatar - Academic / University */}
                <div className="absolute bottom-2 w-7 h-7 rounded-full overflow-hidden border-2 border-white shadow-xs" title="Academic Researcher">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop" 
                    alt="Academic Fellow" 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                {/* Left Avatar - Multilateral / UN Partner */}
                <div className="absolute left-2 w-7 h-7 rounded-full overflow-hidden border-2 border-white shadow-xs" title="Multilateral Donor">
                  <img 
                    src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=150&auto=format&fit=crop" 
                    alt="UN Partner" 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Right Side Floating Options Menu */}
              <div className="flex items-center gap-2 pl-2">
                <button 
                  className="w-6 h-6 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-500 shadow-2xs hover:text-neutral-900 cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-3 h-3" />
                </button>

                <div className="flex flex-col gap-2 text-right">
                  <button 
                    onClick={() => setActiveSideTab('invite')}
                    className={`text-[0.68rem] font-bold leading-tight transition-colors cursor-pointer ${
                      activeSideTab === 'invite' 
                        ? 'text-[#00A859] underline underline-offset-4 decoration-[#00A859]' 
                        : 'text-neutral-400 hover:text-neutral-700'
                    }`}
                  >
                    Direct &amp;<br />Broadcast<br />Messaging
                  </button>
                  <button 
                    onClick={() => setActiveSideTab('prompts')}
                    className={`text-[0.68rem] font-medium leading-tight transition-colors cursor-pointer ${
                      activeSideTab === 'prompts' 
                        ? 'text-[#00A859] underline underline-offset-4 font-bold' 
                        : 'text-neutral-400 hover:text-neutral-700'
                    }`}
                  >
                    Policy<br />Incubator
                  </button>
                  <button 
                    onClick={() => setActiveSideTab('ecosystem')}
                    className={`text-[0.68rem] font-medium leading-tight transition-colors cursor-pointer ${
                      activeSideTab === 'ecosystem' 
                        ? 'text-[#00A859] underline underline-offset-4 font-bold' 
                        : 'text-neutral-400 hover:text-neutral-700'
                    }`}
                  >
                    47 County<br />Teams
                  </button>
                </div>
              </div>

            </div>

            {/* 3. Completed Projects Metric */}
            <div className="pt-2 border-t border-neutral-200/80">
              <span className="text-[0.7rem] font-semibold text-neutral-500 block">
                Documented SDG 16 Actions
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight font-sans">
                  237+
                </span>
                <span className="text-xs text-emerald-700 font-bold">
                  across Kenya
                </span>
              </div>
            </div>

            {/* 4. Youth-led Policy Petition Case Card */}
            <div 
              id="case-study-knot-card"
              className="w-full bg-[#FAF9F5] border border-neutral-200 rounded-[22px] p-3.5 flex flex-col justify-between shadow-sm relative overflow-hidden group"
            >
              {/* Top Row: Pill & Diagonal Arrow */}
              <div className="flex items-start justify-between gap-2 relative z-10">
                <div className="bg-white border border-neutral-200/80 rounded-xl px-2.5 py-1 text-[0.65rem] font-bold text-neutral-800 max-w-[150px] leading-tight shadow-2xs">
                  Participatory Budgeting &amp; County Oversight
                </div>

                <button 
                  className="w-6 h-6 rounded-full bg-white/90 border border-neutral-200 flex items-center justify-center text-neutral-800 shadow-2xs hover:bg-neutral-100 transition-colors cursor-pointer"
                  aria-label="Open Case Study"
                >
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>

              {/* Visual Frame */}
              <div className="w-full h-28 my-2 rounded-xl overflow-hidden relative flex items-center justify-center bg-emerald-50">
                <img 
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=400&auto=format&fit=crop" 
                  alt="County Peace Forum Deliberation" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Bottom Row: Progress & Engagement metrics */}
              <div className="flex items-center justify-between pt-1 relative z-10">
                <span className="text-[0.68rem] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-full shadow-2xs">
                  Verified Impact
                </span>

                <div className="flex items-center gap-2.5 text-[0.68rem] text-neutral-600 font-semibold">
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3 text-neutral-400" />
                    <span>5.2k</span>
                  </div>
                  <button 
                    onClick={handleLikeToggle}
                    className={`flex items-center gap-1 transition-colors cursor-pointer ${
                      hasLiked ? 'text-emerald-600 font-bold' : 'hover:text-neutral-900'
                    }`}
                  >
                    <ThumbsUp className={`w-3 h-3 ${hasLiked ? 'fill-emerald-600' : 'text-neutral-400'}`} />
                    <span>{likesCount}</span>
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* QR CODE MODAL */}
      {showQrModal && (
        <div 
          id="modal-qr-backdrop"
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setShowQrModal(false)}
        >
          <div 
            id="modal-qr-card"
            className="bg-white text-neutral-900 rounded-3xl max-w-sm w-full p-6 shadow-2xl relative border border-neutral-200 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-[#00A859] text-white flex items-center justify-center mx-auto mb-3 font-bold text-sm">
              P16
            </div>

            <h3 className="font-extrabold text-lg text-neutral-950">Download Pamoja 16 Mobile App</h3>
            <p className="text-xs text-neutral-500 mt-1 mb-4">Scan the code with your phone camera to download for iOS and Android APK.</p>

            <div className="w-44 h-44 mx-auto bg-neutral-100 p-3 rounded-2xl border border-neutral-200 flex items-center justify-center shadow-inner">
              <div className="w-full h-full bg-white p-2 rounded-xl flex items-center justify-center">
                <QrCode className="w-full h-full text-neutral-950" />
              </div>
            </div>

            <button 
              onClick={() => setShowQrModal(false)}
              className="w-full mt-5 bg-[#00A859] hover:bg-[#00914c] text-white text-xs font-bold py-2.5 rounded-full transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* REVIEWS MODAL */}
      {showReviewModal && (
        <div 
          id="modal-reviews-backdrop"
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setShowReviewModal(false)}
        >
          <div 
            id="modal-reviews-card"
            className="bg-white text-neutral-900 rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-neutral-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowReviewModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#00A859] text-white flex items-center justify-center font-bold">
                ★ 4.96
              </div>
              <div>
                <h3 className="font-extrabold text-base text-neutral-950">47-County Youth Evidence</h3>
                <p className="text-xs text-neutral-500">Over 500 youth leaders active in peacebuilding</p>
              </div>
            </div>

            <div className="space-y-3 my-4">
              <div className="bg-[#F6F7F9] p-3 rounded-xl">
                <div className="flex items-center justify-between text-xs font-bold text-neutral-900 mb-1">
                  <span>Kenya Model UN Delegate</span>
                  <span className="text-amber-500">★★★★★</span>
                </div>
                <p className="text-[0.72rem] text-neutral-600">
                  &quot;The Digital Visibility &amp; Accountability Platform gave our youth peace resolution direct visibility with regional policy makers.&quot;
                </p>
              </div>

              <div className="bg-[#F6F7F9] p-3 rounded-xl">
                <div className="flex items-center justify-between text-xs font-bold text-neutral-900 mb-1">
                  <span>Makueni Youth Advocacy Lead</span>
                  <span className="text-amber-500">★★★★★</span>
                </div>
                <p className="text-[0.72rem] text-neutral-600">
                  &quot;Micro-donations via M-Pesa Daraja helped us fund our community dialogue and track budget accountability seamlessly.&quot;
                </p>
              </div>
            </div>

            <button 
              onClick={() => setShowReviewModal(false)}
              className="w-full bg-[#00A859] hover:bg-[#00914c] text-white text-xs font-bold py-2.5 rounded-full transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
