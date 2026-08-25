import React, { useState } from 'react';
import { 
  ArrowRight, 
  ArrowUpRight, 
  Sparkles, 
  X,
  Share2,
  ExternalLink,
  Instagram,
  Check,
  MessageSquare,
  Radio,
  FileEdit,
  ShieldCheck,
  Bell
} from 'lucide-react';

interface SectionSevenProps {
  onSelectCategory?: (category: string) => void;
  onDiscoverTemplate?: (templateName: string) => void;
}

export const SectionSeven: React.FC<SectionSevenProps> = ({
  onSelectCategory,
  onDiscoverTemplate
}) => {
  const [activeTab, setActiveTab] = useState<string>('1-ON-1 MENTORSHIP');
  const [selectedCampaignModal, setSelectedCampaignModal] = useState<string | null>(null);

  const tabs = [
    'COUNTY BROADCASTS',
    '1-ON-1 MENTORSHIP',
    'POLICY INCUBATOR',
    'CIVIC STORIES',
    'EMERGENCY ALERTS'
  ];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (onSelectCategory) onSelectCategory(tab);
  };

  const handleCardClick = (title: string) => {
    setSelectedCampaignModal(title);
    if (onDiscoverTemplate) onDiscoverTemplate(title);
  };

  return (
    <div id="section-7-wrapper" className="w-full bg-[#D4F4E2] py-8 sm:py-12 lg:py-16 px-3 sm:px-6 lg:px-8">
      
      {/* SECTION 7 MASTER CARD - EXACT REPLICATION OF EDITORIAL CAMPAIGN GRID */}
      <section 
        id="section-7-asics-campaign" 
        className="w-full max-w-[1380px] mx-auto bg-[#FFFFFF] text-neutral-950 rounded-[32px] sm:rounded-[44px] p-5 sm:p-8 md:p-10 lg:p-12 shadow-[0_30px_70px_rgba(0,0,0,0.12)] border border-neutral-200/80 transition-all duration-300 relative overflow-hidden font-sans"
      >
        
        {/* ========================================================================= */}
        {/* 1. TOP CATEGORY FILTER NAVIGATION BAR                                     */}
        {/* ========================================================================= */}
        <div id="section-7-nav-bar" className="flex items-center justify-center pb-8 sm:pb-10 border-b border-neutral-100">
          <nav className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-10">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`text-[0.68rem] sm:text-xs font-bold tracking-wider uppercase transition-all relative pb-1 cursor-pointer ${
                    isActive 
                      ? 'text-[#00A859] underline underline-offset-4 decoration-2 decoration-[#00A859] font-extrabold' 
                      : 'text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </nav>
        </div>

        {/* ========================================================================= */}
        {/* 2. EDITORIAL CAMPAIGN BENTO GRID                                          */}
        {/* ========================================================================= */}
        <div id="section-7-campaign-grid" className="pt-8 sm:pt-10 space-y-6 sm:space-y-7">
          
          {/* ========================================================================= */}
          {/* ROW 1: EMERALD 1:1 PAMOJA CARD (5 Cols) + YOUTH LEADER EDITORIAL (7 Cols)  */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-7 items-stretch">
            
            {/* CARD 1: Emerald/Mint Solid Card */}
            <div 
              id="card-asics-lavender-top"
              onClick={() => handleCardClick('Encrypted 1-on-1 Mentorship Channels')}
              className="lg:col-span-5 bg-[#A8E6CF] text-neutral-950 rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 flex flex-col justify-between min-h-[380px] sm:min-h-[440px] shadow-sm hover:shadow-md transition-all cursor-pointer group"
            >
              {/* Top Row: Pill Tag + Icon */}
              <div className="flex items-center justify-between">
                <span className="border border-neutral-900/80 rounded-full px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-neutral-900 bg-white/40 backdrop-blur-xs">
                  CIVIC MENTORSHIP
                </span>

                {/* Secure Message Icon */}
                <div className="w-6 h-6 rounded-lg border-2 border-neutral-950 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-950" />
                </div>
              </div>

              {/* Middle Headline */}
              <div className="my-auto py-6">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-neutral-950 leading-[1.18] font-sans">
                  Pamoja 16 connects youth delegates directly with UN mentors and county assembly policy leads
                </h3>
              </div>

              {/* Bottom Action: DISCOVER FEATURE + Arrow Circle */}
              <div className="flex items-center justify-between pt-4">
                <span className="text-xs font-black uppercase tracking-wider text-neutral-950">
                  EXPLORE FEATURE
                </span>
                <div className="w-10 h-10 rounded-full bg-neutral-950 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* CARD 2: Editorial Photo - Kenyan Youth Advocate with Circle '16' Badge */}
            <div 
              id="card-editorial-man"
              className="lg:col-span-7 rounded-[28px] sm:rounded-[32px] overflow-hidden min-h-[380px] sm:min-h-[440px] relative shadow-md bg-stone-200 group"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* Warm editorial backdrop overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-emerald-100/20 pointer-events-none" />

              {/* Custom '16' Embellishment Emblem Overlay */}
              <div className="absolute right-12 sm:right-20 top-1/3 transform -translate-y-1/2 w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-white flex items-center justify-center text-white font-black text-4xl sm:text-5xl shadow-2xl backdrop-blur-xs pointer-events-none opacity-90 group-hover:scale-105 transition-transform duration-500">
                16
              </div>
            </div>

          </div>


          {/* ========================================================================= */}
          {/* ROW 2: THREE EQUAL CARDS (Orange, Mint, Sage)                             */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 items-stretch">
            
            {/* CARD 3: ORANGE (#E86127) - SOCIAL MECHANICS & UPVOTING */}
            <div 
              id="card-engagement-orange"
              onClick={() => handleCardClick('Interactive Civic Social Mechanics')}
              className="bg-[#E86127] text-white rounded-[28px] sm:rounded-[32px] overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-all cursor-pointer group"
            >
              {/* Upper Content Area */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                {/* Top Row: Pill Tag + Semicircle Arch Glyph */}
                <div className="flex items-center justify-between">
                  <span className="border border-white/80 rounded-full px-3 py-1 text-[0.62rem] font-bold uppercase tracking-wider text-white bg-black/10">
                    INTERACTIVE SOCIAL
                  </span>

                  {/* Semicircle Arch Icon */}
                  <div className="w-6 h-4 border-2 border-white rounded-t-full" />
                </div>

                {/* Headline */}
                <h4 className="text-base sm:text-lg font-extrabold tracking-tight text-white leading-tight font-sans mt-5 mb-3">
                  Upvoting, nested policy debates, bookmarks, and temporal visual impact stories
                </h4>
              </div>

              {/* Photo Area */}
              <div className="w-full h-44 relative overflow-hidden bg-amber-100/30">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop" 
                  alt="Kenyan youth discussing civic policy" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                
                {/* Bottom Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-between text-white">
                  <span className="text-[0.68rem] font-black uppercase tracking-wider">
                    VIEW MORE
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white text-neutral-950 flex items-center justify-center shadow-xs">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 4: MINT (#A8E6CF) - 1-TO-MANY BROADCAST CHANNELS */}
            <div 
              id="card-giveaway-lavender"
              onClick={() => handleCardClick('County Lead Broadcast Channels')}
              className="bg-[#A8E6CF] text-neutral-950 rounded-[28px] sm:rounded-[32px] overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-all cursor-pointer group"
            >
              {/* Upper Content Area */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                {/* Top Row: Pill Tag + Broadcast Glyph */}
                <div className="flex items-center justify-between">
                  <span className="border border-neutral-900/80 rounded-full px-3 py-1 text-[0.62rem] font-bold uppercase tracking-wider text-neutral-950 bg-white/40">
                    BROADCAST CHANNELS
                  </span>

                  <div className="w-5 h-5 rounded-md border-2 border-neutral-950 flex items-center justify-center">
                    <Radio className="w-3 h-3 text-neutral-950" />
                  </div>
                </div>

                {/* Headline */}
                <h4 className="text-base sm:text-lg font-extrabold tracking-tight text-neutral-950 leading-tight font-sans mt-5 mb-3">
                  Verified NGOs &amp; 47 County leads broadcast localized updates and public town halls
                </h4>
              </div>

              {/* Photo Area */}
              <div className="w-full h-44 relative overflow-hidden bg-neutral-900">
                <img 
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop" 
                  alt="County Lead" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay Badge */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-80">
                  <span className="text-4xl font-black text-emerald-950 bg-white/80 px-3 py-1 rounded-xl shadow-md">
                    47
                  </span>
                </div>

                {/* Bottom Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-between text-white">
                  <span className="text-[0.68rem] font-black uppercase tracking-wider">
                    VIEW MORE
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white text-neutral-950 flex items-center justify-center shadow-xs">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 5: SAGE GREEN (#C2D6C3) - POLICY INCUBATOR */}
            <div 
              id="card-launch-sage"
              onClick={() => handleCardClick('Policy Incubator & Petitions')}
              className="bg-[#C2D6C3] text-neutral-950 rounded-[28px] sm:rounded-[32px] overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-all cursor-pointer group"
            >
              {/* Upper Content Area */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                {/* Top Row: Pill Tag + 8-Point Asterisk Icon */}
                <div className="flex items-center justify-between">
                  <span className="border border-neutral-900/80 rounded-full px-3 py-1 text-[0.62rem] font-bold uppercase tracking-wider text-neutral-950 bg-white/20">
                    POLICY INCUBATOR
                  </span>

                  <div className="text-neutral-950 text-xl font-black leading-none">
                    ✱
                  </div>
                </div>

                {/* Headline */}
                <h4 className="text-base sm:text-lg font-extrabold tracking-tight text-neutral-950 leading-tight font-sans mt-5 mb-3">
                  Collaborative markdown co-editing for youth manifestos and county petitions
                </h4>
              </div>

              {/* Photo Area */}
              <div className="w-full h-44 relative overflow-hidden bg-sky-100">
                <img 
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=600&auto=format&fit=crop" 
                  alt="Policy drafting meeting" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />

                {/* Bottom Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-between text-white">
                  <span className="text-[0.68rem] font-black uppercase tracking-wider">
                    VIEW MORE
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white text-neutral-950 flex items-center justify-center shadow-xs">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>

          </div>


          {/* ========================================================================= */}
          {/* ROW 3: EDITORIAL PORTRAIT (7 Cols) + LIME EMERGENCY CARD (5 Cols)         */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-7 items-stretch">
            
            {/* CARD 6: Editorial Photo - Kenyan Female Delegate */}
            <div 
              id="card-editorial-woman"
              className="lg:col-span-7 rounded-[28px] sm:rounded-[32px] overflow-hidden min-h-[380px] sm:min-h-[440px] relative shadow-md bg-stone-200 group"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center 20%'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* CARD 7: Bright Chartreuse / Lime Yellow Alert Card */}
            <div 
              id="card-asics-lime-bottom"
              onClick={() => handleCardClick('Emergency Alert Infrastructure')}
              className="lg:col-span-5 bg-[#E8F54A] text-neutral-950 rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 flex flex-col justify-between min-h-[380px] sm:min-h-[440px] shadow-sm hover:shadow-md transition-all cursor-pointer group"
            >
              {/* Top Row: Pill Tag + Flash Icon */}
              <div className="flex items-center justify-between">
                <span className="border border-neutral-900/80 rounded-full px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-neutral-900 bg-white/30 backdrop-blur-xs">
                  CRISIS RESPONSE
                </span>

                <div className="text-neutral-950 font-black text-xl tracking-tighter">
                  ⚡
                </div>
              </div>

              {/* Middle Headline */}
              <div className="my-auto py-6">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-neutral-950 leading-[1.18] font-sans">
                  Real-time Firebase Cloud Messaging &amp; SMS emergency broadcast infrastructure for rapid peace response
                </h3>
              </div>

              {/* Bottom Action: EXPLORE FEATURE + Arrow Circle */}
              <div className="flex items-center justify-between pt-4">
                <span className="text-xs font-black uppercase tracking-wider text-neutral-950">
                  EXPLORE FEATURE
                </span>
                <div className="w-10 h-10 rounded-full bg-neutral-950 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* CAMPAIGN DETAIL MODAL */}
      {selectedCampaignModal && (
        <div 
          id="modal-campaign-backdrop"
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedCampaignModal(null)}
        >
          <div 
            id="modal-campaign-card"
            className="bg-white text-neutral-950 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-neutral-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedCampaignModal(null)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-950 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-extrabold uppercase tracking-wider bg-[#00A859] text-white px-3 py-1 rounded-full">
                Pamoja 16 Feature Module
              </span>
            </div>

            <h3 className="font-extrabold text-2xl text-neutral-950 mt-2 leading-tight">
              {selectedCampaignModal}
            </h3>

            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed my-4">
              Integrated inside the downloadable Pamoja 16 mobile and web client, providing encrypted communications, granular role permissions across 5 entity circles, and real-time county coordination.
            </p>

            <div className="bg-[#F5F6F8] p-4 rounded-2xl space-y-2 mb-6 border border-neutral-200/80">
              <div className="flex justify-between text-xs font-bold text-neutral-900">
                <span>Security Protocol</span>
                <span>End-to-End Encrypted</span>
              </div>
              <div className="flex justify-between text-xs font-bold text-neutral-900">
                <span>Coverage</span>
                <span className="text-[#00A859] font-extrabold">All 47 Kenyan Counties</span>
              </div>
            </div>

            <button 
              onClick={() => setSelectedCampaignModal(null)}
              className="w-full bg-[#00A859] hover:bg-[#00914c] text-white font-bold py-3 rounded-full text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Get Started with Pamoja 16 App
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
