import React, { useState } from 'react';
import { 
  ArrowRight, 
  Search, 
  Instagram, 
  Facebook, 
  X,
  Sparkles,
  Share2,
  ExternalLink,
  BookOpen,
  ArrowUpRight,
  TrendingUp,
  Shield,
  Cpu,
  Layers,
  Award,
  Globe2
} from 'lucide-react';

interface SectionEightProps {
  onSearch?: () => void;
  onExploreArticle?: (title: string) => void;
  onSelectNav?: (item: string) => void;
}

export const SectionEight: React.FC<SectionEightProps> = ({
  onSearch,
  onExploreArticle,
  onSelectNav
}) => {
  const [activeNav, setActiveNav] = useState<string>('Community');
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<{
    tag: string;
    title: string;
    description: string;
    fullText: string;
    readTime: string;
  } | null>(null);

  const navItems = [
    'Peace Forums',
    'About Pamoja',
    'Our Principles',
    'Community',
    'Contact Secretariat'
  ];

  const articles = [
    {
      tag: 'Devolution Insight',
      tagBg: 'bg-[#00A859] text-white',
      title: 'What are the 3 Pillars of Grassroots SDG 16 Implementation?',
      description: 'How county-level youth oversight, community peace committees, and transparent civic funding establish lasting institutional trust.',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop',
      readTime: '6 min read',
      fullText: 'Transforming peace and justice across Kenya requires bridging grassroots youth initiatives with formal devolution frameworks. The three horizons of Pamoja 16 focus on: (1) Immediate conflict de-escalation and local forums, (2) Civic data collection and participatory budgeting, and (3) Digital policy co-creation that directly feeds into County Assembly legislative agendas.'
    },
    {
      tag: 'Youth Voices',
      tagBg: 'bg-black/40 backdrop-blur-md text-white border border-white/20',
      title: 'Why We’re Mobilizing 100,000+ Young Kenyans to Champion Devolution and Public Integrity',
      description: 'Democratizing civic participation through mobile technology, M-Pesa transparent crowdfunding, and peer-to-peer accountability.',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop',
      readTime: '8 min read',
      fullText: 'Young Kenyans under 35 represent over 70% of our nation. By equipping youth delegates across all 47 counties with verifiable data, encrypted mentorship with constitutional experts, and direct funding pathways, Pamoja 16 transforms apathy into sustained civic leadership.'
    },
    {
      tag: 'Multilateral News',
      tagBg: 'bg-white/80 backdrop-blur-md text-neutral-950 font-bold',
      title: 'Pamoja 16 Partners with Kenya Model UN and Africa for SDGs for Pan-African Expansion',
      description: 'Scaling youth-led peacebuilding, verified impact credentialing, and civic research fellowships across East Africa.',
      image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=800&auto=format&fit=crop',
      readTime: '10 min read',
      fullText: 'Announced at the Pan-African Youth Peace Conclave in Nairobi, Pamoja 16 joins forces with Kenya Model United Nations and Africa for SDGs to institutionalize digital peace mediation protocols and civic career opportunities for emerging leaders.'
    }
  ];

  const handleArticleClick = (art: typeof articles[0]) => {
    setSelectedArticle(art);
    if (onExploreArticle) onExploreArticle(art.title);
  };

  return (
    <section id="section-8-colabs" className="w-full max-w-[1380px] mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      
      {/* SECTION 8 MASTER CONTAINER - EXACT REPLICATION OF COLABS SHOWCASE */}
      <div 
        id="section-8-master-card"
        className="w-full bg-[#FFFFFF] text-neutral-950 rounded-[32px] sm:rounded-[44px] p-6 sm:p-10 md:p-12 lg:p-14 shadow-[0_25px_60px_rgba(0,0,0,0.06)] border border-neutral-200/80 transition-all duration-300 relative overflow-hidden font-sans"
      >

        {/* ========================================================================= */}
        {/* 1. TOP NAVIGATION & HEADER ROW                                            */}
        {/* ========================================================================= */}
        <div id="section-8-header" className="flex items-center justify-between gap-4 pb-8 sm:pb-12 border-b border-neutral-100">
          
          {/* Left Brand: Nairobi / 47 Counties + Pamoja 16 */}
          <div className="flex flex-col">
            <span className="text-[0.68rem] text-emerald-800 font-bold tracking-tight">
              Nairobi • 47 Counties
            </span>
            
            <div className="flex items-center gap-2 mt-0.5">
              {/* Pamoja Crescent Cutout Glyph */}
              <div className="w-7 h-7 rounded-full bg-[#00A859] flex items-center justify-center relative shadow-xs text-white text-xs font-black">
                16
              </div>

              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 font-sans">
                Pamoja 16
              </span>
            </div>
          </div>

          {/* Center Capsule Nav Bar with Social Icons */}
          <nav className="hidden lg:flex items-center gap-6 bg-[#F6F7F9] border border-neutral-200/80 px-6 py-2 rounded-full shadow-2xs">
            {navItems.map((item) => {
              const isActive = activeNav === item;
              return (
                <button
                  key={item}
                  onClick={() => {
                    setActiveNav(item);
                    if (onSelectNav) onSelectNav(item);
                  }}
                  className={`text-xs font-semibold tracking-tight transition-colors cursor-pointer ${
                    isActive ? 'text-[#00A859] font-bold' : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  {item}
                </button>
              );
            })}

            {/* Social Icons inside capsule */}
            <div className="flex items-center gap-3 pl-4 border-l border-neutral-300/80 text-neutral-800">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[#00A859] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[#00A859] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
            </div>
          </nav>

          {/* Right Search Button (Global Command Search Cmd+K) */}
          <div className="flex items-center gap-3">
            <button 
              id="btn-section8-search"
              onClick={() => {
                setSearchOpen(true);
                if (onSearch) onSearch();
              }}
              className="w-10 h-10 rounded-full border border-neutral-300 bg-white hover:bg-emerald-50 hover:border-emerald-300 flex items-center justify-center text-neutral-900 transition-colors shadow-2xs cursor-pointer"
              aria-label="Search articles"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

        </div>


        {/* ========================================================================= */}
        {/* 2. HERO HEADLINE & COMMUNITY PILL                                         */}
        {/* ========================================================================= */}
        <div id="section-8-hero" className="pt-8 sm:pt-12 pb-6 sm:pb-10 max-w-3xl">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-neutral-950 leading-[1.12] font-sans">
            Space for bold thinking, youth peacebuilders and civic innovators
          </h1>

          {/* Community Pill */}
          <div className="mt-8 sm:mt-10">
            <span className="inline-block border border-emerald-300 bg-[#E8F8F0] px-4 py-1.5 rounded-full text-xs font-bold text-emerald-900 shadow-2xs">
              Kenya Peace &amp; Devolution Community
            </span>
          </div>
        </div>


        {/* ========================================================================= */}
        {/* 3. THREE EDITORIAL CARDS WITH NOTCHED CIRCULAR ARROW BUTTONS              */}
        {/* ========================================================================= */}
        <div id="section-8-articles-grid" className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 pt-4 items-start">
          
          {/* ------------------------------------------------------------------------- */}
          {/* CARD 1: DEVOLUTION INSIGHT (Peace and Grassroots Horizons)                */}
          {/* ------------------------------------------------------------------------- */}
          <div 
            id="colabs-card-1"
            onClick={() => handleArticleClick(articles[0])}
            className="flex flex-col gap-4 group cursor-pointer"
          >
            {/* Visual Container with Bottom-Right Cutout Notch for Arrow Button */}
            <div className="w-full aspect-[4/3.8] rounded-[28px] sm:rounded-[32px] overflow-hidden relative shadow-2xs border border-neutral-200/80 bg-[#005A32]">
              {/* Graphic Landscape Artwork */}
              <img 
                src={articles[0].image} 
                alt="Kenyan County Dialogue Landscape" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Top-Left Pill Tag */}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-[#00A859] text-white text-[0.68rem] font-bold px-3 py-1 rounded-full shadow-xs">
                  {articles[0].tag}
                </span>
              </div>

              {/* Bottom-Right White Cutout Notch with Black Arrow Button */}
              <div className="absolute -bottom-1 -right-1 bg-white p-2 pt-3 pl-3 rounded-tl-[24px] z-10">
                <div className="w-10 h-10 rounded-full bg-neutral-950 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Typography Content */}
            <div className="pt-2">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 font-sans leading-tight group-hover:text-[#00A859] transition-colors">
                {articles[0].title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed mt-2.5 font-normal">
                {articles[0].description}
              </p>
            </div>
          </div>


          {/* ------------------------------------------------------------------------- */}
          {/* CARD 2: YOUTH VOICES (Civic Mobilization)                                 */}
          {/* ------------------------------------------------------------------------- */}
          <div 
            id="colabs-card-2"
            onClick={() => handleArticleClick(articles[1])}
            className="flex flex-col gap-4 group cursor-pointer"
          >
            {/* Visual Container with Bottom-Right Notch */}
            <div className="w-full aspect-[4/3.8] rounded-[28px] sm:rounded-[32px] overflow-hidden relative shadow-2xs border border-neutral-200/80 bg-[#E8F54A]">
              {/* Vibrant Yellow / Lime backdrop with Youth Assembly Artwork */}
              <div className="w-full h-full bg-[#E5EA3B] flex items-center justify-center p-6 relative overflow-hidden">
                <img 
                  src={articles[1].image} 
                  alt="Youth Civic Action" 
                  className="w-full h-full object-cover rounded-2xl mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Top-Left Pill Tag */}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-black/60 backdrop-blur-md text-white text-[0.68rem] font-bold px-3.5 py-1 rounded-full shadow-xs">
                  {articles[1].tag}
                </span>
              </div>

              {/* Bottom-Right White Cutout Notch with Black Arrow Button */}
              <div className="absolute -bottom-1 -right-1 bg-white p-2 pt-3 pl-3 rounded-tl-[24px] z-10">
                <div className="w-10 h-10 rounded-full bg-neutral-950 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Typography Content */}
            <div className="pt-2">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 font-sans leading-tight group-hover:text-[#00A859] transition-colors">
                {articles[1].title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed mt-2.5 font-normal">
                {articles[1].description}
              </p>
            </div>
          </div>


          {/* ------------------------------------------------------------------------- */}
          {/* CARD 3: MULTILATERAL NEWS (UN & KMUN Expansion)                           */}
          {/* ------------------------------------------------------------------------- */}
          <div 
            id="colabs-card-3"
            onClick={() => handleArticleClick(articles[2])}
            className="flex flex-col gap-4 group cursor-pointer"
          >
            {/* Visual Container with Bottom-Right Notch */}
            <div className="w-full aspect-[4/3.8] rounded-[28px] sm:rounded-[32px] overflow-hidden relative shadow-2xs border border-neutral-200/80 bg-emerald-950">
              <img 
                src={articles[2].image} 
                alt="Pan African Peace Conclave" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Top-Left Pill Tag */}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-white/90 backdrop-blur-md text-neutral-950 text-[0.68rem] font-bold px-3 py-1 rounded-full shadow-xs">
                  {articles[2].tag}
                </span>
              </div>

              {/* Bottom-Right White Cutout Notch with Black Arrow Button */}
              <div className="absolute -bottom-1 -right-1 bg-white p-2 pt-3 pl-3 rounded-tl-[24px] z-10">
                <div className="w-10 h-10 rounded-full bg-neutral-950 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Typography Content */}
            <div className="pt-2">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 font-sans leading-tight group-hover:text-[#00A859] transition-colors">
                {articles[2].title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed mt-2.5 font-normal">
                {articles[2].description}
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* SEARCH MODAL */}
      {searchOpen && (
        <div 
          id="modal-search-backdrop"
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setSearchOpen(false)}
        >
          <div 
            id="modal-search-card"
            className="bg-white text-neutral-950 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-neutral-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#00A859]">
                Search Pamoja 16 Articles &amp; Policy Briefs
              </span>
              <button 
                onClick={() => setSearchOpen(false)}
                className="text-neutral-400 hover:text-neutral-950 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="my-5 relative">
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search peace forums, devolution, SDG 16 grants..."
                className="w-full pl-10 pr-4 py-3 bg-[#F6F7F9] border border-neutral-300 rounded-full text-xs sm:text-sm text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-[#00A859]"
                autoFocus
              />
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {articles
                .filter(a => searchQuery === '' || a.title.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((art, idx) => (
                  <div 
                    key={idx}
                    onClick={() => {
                      setSearchOpen(false);
                      handleArticleClick(art);
                    }}
                    className="p-3 bg-neutral-50 hover:bg-emerald-50 rounded-2xl flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div>
                      <span className="text-[0.65rem] font-bold text-[#00A859] uppercase">{art.tag}</span>
                      <h4 className="text-xs font-bold text-neutral-950">{art.title}</h4>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* ARTICLE READER MODAL */}
      {selectedArticle && (
        <div 
          id="modal-article-reader-backdrop"
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedArticle(null)}
        >
          <div 
            id="modal-article-reader-card"
            className="bg-white text-neutral-950 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative border border-neutral-200 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedArticle(null)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-950 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
                {selectedArticle.tag} • {selectedArticle.readTime}
              </span>
            </div>

            <h3 className="font-extrabold text-2xl text-neutral-950 mt-2 leading-tight">
              {selectedArticle.title}
            </h3>

            <div className="my-5 space-y-4 text-xs sm:text-sm text-neutral-700 leading-relaxed">
              <p className="font-semibold text-neutral-900">
                {selectedArticle.description}
              </p>
              <p>
                {selectedArticle.fullText}
              </p>
              <div className="bg-[#F6F7F9] p-4 rounded-2xl border border-neutral-200 space-y-2">
                <div className="flex justify-between text-xs font-bold text-neutral-900">
                  <span>Secretariat</span>
                  <span>Pamoja 16 Youth Peace Council (Nairobi)</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-neutral-900">
                  <span>County Scope</span>
                  <span className="text-[#00A859]">47 Counties Active</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setSelectedArticle(null)}
              className="w-full bg-[#00A859] hover:bg-[#00914c] text-white font-bold py-3 rounded-full text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Close Article
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
