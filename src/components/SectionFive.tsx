import React, { useState } from 'react';
import { 
  ArrowRight, 
  ArrowUpRight, 
  FileText, 
  Clock, 
  GraduationCap, 
  Sparkles, 
  BookOpen, 
  X,
  Compass,
  Check,
  Users,
  ShieldCheck,
  Award
} from 'lucide-react';

interface SectionFiveProps {
  onSignUp?: () => void;
  onJoinCommunity?: () => void;
  onLearnMore?: () => void;
}

export const SectionFive: React.FC<SectionFiveProps> = ({
  onSignUp,
  onJoinCommunity,
  onLearnMore
}) => {
  const [activeNav, setActiveNav] = useState<string>('County Peace Forums');
  const [selectedCourseModal, setSelectedCourseModal] = useState<boolean>(false);
  const [selectedUseCaseModal, setSelectedUseCaseModal] = useState<boolean>(false);

  const navLinks = [
    'County Peace Forums',
    'Civic Grants',
    'Use Cases',
    'Policy Briefs',
    'Youth Academy',
    'Contact Secretariat'
  ];

  return (
    <section id="section-5-explore-ai" className="w-full max-w-[1380px] mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      
      {/* SECTION 5 MASTER CARD - EXACT REPLICATION OF UPLOADED DESIGN */}
      <div 
        id="section-5-master-card"
        className="w-full bg-[#FFFFFF] text-neutral-900 rounded-[32px] sm:rounded-[40px] p-5 sm:p-8 md:p-10 lg:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.06)] border border-neutral-200/80 transition-all duration-300 relative overflow-hidden"
      >
        
        {/* SUBTLE CARD BACKGROUND ACCENT GLOWS */}
        <div className="absolute top-10 right-10 w-[550px] h-[550px] bg-emerald-50/40 rounded-full blur-3xl pointer-events-none -z-0" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-teal-50/30 rounded-full blur-3xl pointer-events-none -z-0" />

        {/* ========================================================================= */}
        {/* 1. TOP HEADER NAVIGATION BAR                                              */}
        {/* ========================================================================= */}
        <div id="section-5-header" className="relative z-10 flex items-center justify-between gap-4 pb-7 sm:pb-8 border-b border-neutral-100/90">
          
          {/* Brand Logo: P16 Badge */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E8F8F0] border border-emerald-200 overflow-hidden flex items-center justify-center shadow-xs">
              <span className="text-[#00A859] font-black text-sm">P16</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => {
              const isActive = activeNav === link;
              return (
                <button
                  key={link}
                  onClick={() => setActiveNav(link)}
                  className={`text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                    isActive 
                      ? 'text-neutral-950 font-semibold' 
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  {link}
                </button>
              );
            })}
          </nav>

          {/* Right Action Button: Download App */}
          <div className="flex items-center gap-3">
            <button 
              id="btn-section5-signup"
              onClick={onSignUp}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-white hover:bg-emerald-50 text-neutral-900 px-5 sm:px-6 py-2 sm:py-2.5 text-xs font-semibold shadow-2xs hover:shadow-xs transition-all cursor-pointer"
            >
              <span>Download App</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>


        {/* ========================================================================= */}
        {/* 2. HERO BANNER: EXPLORE YOUTH-LED PEACE & JUSTICE WITH PAMOJA 16          */}
        {/* ========================================================================= */}
        <div 
          id="section-5-hero-banner"
          className="relative z-10 mt-6 sm:mt-8 rounded-[30px] sm:rounded-[36px] overflow-hidden min-h-[360px] sm:min-h-[420px] md:min-h-[460px] p-6 sm:p-10 md:p-12 lg:p-14 flex flex-col justify-center shadow-lg bg-slate-900"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1600&auto=format&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Layered Gradient Overlay for Pamoja Emerald Atmosphere */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#003B1F]/90 via-[#005A32]/80 to-[#0A8A4C]/75 mix-blend-multiply pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

          {/* Foreground Content */}
          <div className="relative z-10 max-w-3xl flex flex-col justify-center">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold tracking-tight text-white font-sans leading-[1.08] drop-shadow-sm">
              Explore the Power<br />
              of Youth-Led Peace &amp; Justice
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-emerald-100 font-normal leading-relaxed max-w-xl mt-5 sm:mt-7 drop-shadow-xs">
              Stay connected with SDG 16 grassroots initiatives across all 47 counties in Kenya. Access policy co-drafting tools, civic micro-grants, and verified advocacy bounties.
            </p>
          </div>

          {/* Floating Organic Droplet Accents */}
          <div className="absolute right-12 top-1/4 w-28 h-28 rounded-full bg-emerald-300/20 backdrop-blur-md border border-white/20 pointer-events-none hidden md:block" />
          <div className="absolute right-1/4 bottom-8 w-16 h-16 rounded-full bg-teal-300/20 backdrop-blur-md border border-white/20 pointer-events-none hidden md:block" />
        </div>


        {/* ========================================================================= */}
        {/* 3. BOTTOM BENTO GRID: USE CASES, CIVIC ACADEMY, +47 STRIP & POLICY FORUM  */}
        {/* ========================================================================= */}
        <div id="section-5-bento-grid" className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 pt-6 sm:pt-8 items-stretch">
          
          {/* ========================================================================= */}
          {/* LEFT AREA: USE CASES + ONLINE COURSES + +47 STRIP (Cols 1-7)              */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-5 sm:gap-6">
            
            {/* Top Row: Two Sub-Cards (Use cases & Online courses) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              
              {/* SUB-CARD 1: USE CASES */}
              <div 
                id="card-section5-usecases"
                onClick={() => setSelectedUseCaseModal(true)}
                className="bg-[#F5F6F8] rounded-[28px] p-5 sm:p-6 flex flex-col justify-between border border-neutral-200/70 shadow-2xs hover:shadow-sm transition-all cursor-pointer group"
              >
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-950 font-sans tracking-tight">
                    Civic Use Cases
                  </h3>

                  <p className="text-xs text-neutral-500 leading-relaxed mt-2 font-normal">
                    Showcase how youth peace ambassadors drive mediation, anti-corruption monitoring, and community dialogues in Marsabit, Kisumu, Mombasa, and Nairobi.
                  </p>

                  {/* Pills Row */}
                  <div className="flex flex-wrap items-center gap-2 mt-4">
                    <div className="inline-flex items-center gap-1.5 bg-white border border-neutral-200/90 rounded-full px-2.5 py-1 text-[0.68rem] font-semibold text-neutral-700 shadow-2xs">
                      <FileText className="w-3 h-3 text-[#00A859]" />
                      <span>16 county briefs</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 bg-white border border-neutral-200/90 rounded-full px-2.5 py-1 text-[0.68rem] font-semibold text-neutral-700 shadow-2xs">
                      <Clock className="w-3 h-3 text-[#00A859]" />
                      <span>15 min read</span>
                    </div>
                  </div>
                </div>

                {/* Visual Image */}
                <div className="w-full h-24 sm:h-28 mt-4 rounded-2xl overflow-hidden relative flex items-center justify-center bg-emerald-50 border border-neutral-200/50">
                  <img 
                    src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=400&auto=format&fit=crop" 
                    alt="Youth Deliberation Forum" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* SUB-CARD 2: YOUTH ACADEMY COURSES WITH AVATARS */}
              <div 
                id="card-section5-onlinecourses"
                onClick={() => setSelectedCourseModal(true)}
                className="bg-[#F5F6F8] rounded-[28px] p-5 sm:p-6 flex flex-col justify-between border border-neutral-200/70 shadow-2xs hover:shadow-sm transition-all cursor-pointer group"
              >
                <div>
                  {/* Top Overlapping Youth Leader Avatars */}
                  <div className="flex items-center -space-x-2 mb-4">
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop" 
                      alt="Youth Leader 1" 
                      className="w-7 h-7 rounded-full border-2 border-white object-cover shadow-2xs"
                      referrerPolicy="no-referrer"
                    />
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop" 
                      alt="Youth Leader 2" 
                      className="w-7 h-7 rounded-full border-2 border-white object-cover shadow-2xs"
                      referrerPolicy="no-referrer"
                    />
                    <img 
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=120&auto=format&fit=crop" 
                      alt="Youth Leader 3" 
                      className="w-7 h-7 rounded-full border-2 border-white object-cover shadow-2xs"
                      referrerPolicy="no-referrer"
                    />
                    <div className="w-7 h-7 rounded-full bg-[#00A859] text-white text-[0.62rem] font-bold border-2 border-white flex items-center justify-center shadow-2xs">
                      +47
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-950 font-sans tracking-tight leading-tight">
                    Pamoja 16<br />Civic Academy
                  </h3>

                  <p className="text-xs text-neutral-500 leading-relaxed mt-2 font-normal">
                    Free modules on Kenya&apos;s Constitution 2010, County Assembly petitioning, SDG 16 metrics, and M-Pesa crowdfunding transparency.
                  </p>
                </div>

                {/* Footer Tagline / Breadcrumb */}
                <div className="pt-4 border-t border-neutral-200/80 mt-4">
                  <span className="text-[0.68rem] text-neutral-400 font-medium">
                    Governance • Peace • KMUN Certified
                  </span>
                </div>
              </div>

            </div>

            {/* Bottom Row: +47 Metric Strip + Join community Button */}
            <div 
              id="strip-section5-community"
              className="bg-[#F5F6F8] rounded-[24px] p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-neutral-200/70 shadow-2xs"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#00A859] font-sans tracking-tight">
                  47
                </span>
                <span className="text-xs text-neutral-500 font-medium max-w-[150px] leading-snug">
                  Counties connected on the Pamoja 16 App
                </span>
              </div>

              <button 
                id="btn-section5-joincommunity"
                onClick={onJoinCommunity}
                className="inline-flex items-center gap-2.5 rounded-full border border-emerald-300 bg-white hover:bg-emerald-50 text-neutral-950 px-5 sm:px-6 py-2 sm:py-2.5 text-xs font-bold shadow-2xs hover:shadow-xs transition-all cursor-pointer self-stretch sm:self-auto justify-center"
              >
                <span>Join Advocacy Network</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>


          {/* ========================================================================= */}
          {/* RIGHT AREA: CIVIC EDUCATION & BOUNTIES CARD (Cols 8-12)                   */}
          {/* ========================================================================= */}
          <div 
            id="card-ai-education"
            className="lg:col-span-5 bg-[#F5F6F8] rounded-[28px] p-5 sm:p-6 lg:p-7 flex flex-col justify-between border border-neutral-200/70 shadow-2xs"
          >
            {/* Header with Title and Two Circular Buttons */}
            <div className="flex items-start justify-between gap-4 pb-4">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-neutral-950 font-sans tracking-tight leading-tight max-w-[260px]">
                Youth empowerment &amp; devolution governance in Kenya
              </h3>

              {/* Two Circular Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                {/* Button 1: Arrow */}
                <button 
                  onClick={onLearnMore}
                  className="w-10 h-10 rounded-full bg-neutral-200/80 hover:bg-neutral-300 flex items-center justify-center text-neutral-900 transition-colors shadow-2xs cursor-pointer"
                  aria-label="Open Opportunities"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                {/* Button 2: LEARN MORE text */}
                <button 
                  onClick={onLearnMore}
                  className="w-12 h-12 rounded-full border border-emerald-300 bg-white hover:bg-emerald-50 flex flex-col items-center justify-center text-[0.55rem] font-black uppercase text-emerald-950 tracking-tight leading-tight shadow-2xs transition-colors cursor-pointer"
                >
                  <span>LEARN</span>
                  <span>MORE</span>
                </button>
              </div>
            </div>

            {/* Visual Container */}
            <div 
              className="w-full h-56 sm:h-64 lg:h-72 mt-2 rounded-[24px] overflow-hidden relative flex items-center justify-center bg-white border border-neutral-200/80 shadow-inner group"
            >
              <img 
                src="https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=800&auto=format&fit=crop" 
                alt="Kenyan Youth Peace Council" 
                className="w-full h-full object-cover filter contrast-[0.95] group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              
              {/* Soft Ambient Light Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/50 via-transparent to-white/20 pointer-events-none" />

              {/* Center Floating 3D Shield Badge */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-24 h-24 rounded-3xl bg-white/80 backdrop-blur-md border border-white/90 shadow-xl flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  <div className="w-8 h-8 rounded-full bg-[#00A859] text-white flex items-center justify-center shadow-md">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* MODAL: USE CASES */}
      {selectedUseCaseModal && (
        <div 
          id="modal-usecases-backdrop"
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedUseCaseModal(false)}
        >
          <div 
            id="modal-usecases-card"
            className="bg-white text-neutral-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-neutral-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedUseCaseModal(false)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#00A859] bg-emerald-50 px-2.5 py-1 rounded-full">
                Pamoja 16 Grassroots Case Study
              </span>
            </div>

            <h3 className="font-extrabold text-xl text-neutral-950 mt-1">
              47-County Youth Mediation &amp; Policy Co-Creation
            </h3>

            <div className="my-4 space-y-3 text-xs sm:text-sm text-neutral-600 leading-relaxed">
              <p>
                From community policing dialogues to public participation tracking on County Integrated Development Plans (CIDPs), Pamoja 16 equips youth with verified evidence.
              </p>
              <div className="bg-[#F5F6F8] p-4 rounded-2xl border border-neutral-200 space-y-2">
                <div className="flex justify-between text-xs font-bold text-neutral-900">
                  <span>Counties Mobilized</span>
                  <span>47 Counties</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-neutral-900">
                  <span>Youth Peace Forums</span>
                  <span className="text-[#00A859]">+237 Documented</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => {
                setSelectedUseCaseModal(false);
                if (onSignUp) onSignUp();
              }}
              className="w-full bg-[#00A859] hover:bg-[#00914c] text-white font-bold py-3 rounded-full text-xs transition-colors cursor-pointer"
            >
              Download Full Pamoja 16 App
            </button>
          </div>
        </div>
      )}

      {/* MODAL: ONLINE COURSES */}
      {selectedCourseModal && (
        <div 
          id="modal-courses-backdrop"
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedCourseModal(false)}
        >
          <div 
            id="modal-courses-card"
            className="bg-white text-neutral-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-neutral-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedCourseModal(false)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                Civic Academy
              </span>
            </div>

            <h3 className="font-extrabold text-xl text-neutral-950 mt-1">
              SDG 16 Youth Leadership Modules
            </h3>

            <div className="my-4 space-y-3 text-xs sm:text-sm text-neutral-600 leading-relaxed">
              <p>
                Co-developed with Kenya Model UN and Africa for SDGs, offering certified practical training in mediation, policy drafting, and digital civic organizing.
              </p>
              <div className="bg-[#F5F6F8] p-4 rounded-2xl border border-neutral-200 space-y-2">
                <div className="flex justify-between text-xs font-bold text-neutral-900">
                  <span>Active Delegates</span>
                  <span>1,200+ Youth</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-neutral-900">
                  <span>Certification</span>
                  <span className="text-[#00A859]">KMUN &amp; Africa for SDGs</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => {
                setSelectedCourseModal(false);
                if (onSignUp) onSignUp();
              }}
              className="w-full bg-[#00A859] hover:bg-[#00914c] text-white font-bold py-3 rounded-full text-xs transition-colors cursor-pointer"
            >
              Enroll in Free Youth Academy
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
