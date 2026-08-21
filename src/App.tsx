/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  HeartHandshake, 
  Sun, 
  Moon, 
  GripVertical, 
  Send, 
  Layers, 
  Compass, 
  BookOpen, 
  Globe, 
  Instagram, 
  Zap, 
  X,
  Megaphone,
  Handshake,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function App() {
  const [isLightMode, setIsLightMode] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('THE PLATFORM');
  const [showSignInModal, setShowSignInModal] = useState<boolean>(false);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Sync theme with body class
  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [isLightMode]);

  const navLinks = [
    { name: 'THE PLATFORM', icon: Layers },
    { name: 'ACTION HUB', icon: Compass },
    { name: 'LIBRARY', icon: BookOpen }
  ];

  const drawerItems = [
    { name: 'The Platform', icon: Layers },
    { name: 'Action Hub', icon: Compass },
    { name: 'Library', icon: BookOpen },
    { name: 'Advocacy', icon: Megaphone },
    { name: 'Partners', icon: Handshake }
  ];

  const tags = [
    'SDG 16',
    'Anti-Corruption',
    'KMUN',
    'Human Rights',
    'Open Data',
    'Policy Tracker',
    'Innovation'
  ];

  return (
    <div id="pamoja-root-container" className="w-full max-w-full h-screen h-[100dvh] max-h-screen bg-[var(--color-bg)] text-[var(--color-text-main)] flex flex-col relative overflow-hidden transition-colors duration-300 selection:bg-[#00C4CC] selection:text-black">
      
      {/* TOPOGRAPHIC BACKGROUND LAYER */}
      <div 
        id="topo-bg-layer"
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-300 overflow-hidden"
        style={{
          backgroundImage: isLightMode 
            ? "url('https://img.freepik.com/free-vector/topographic-map-lines-background_23-2148587652.jpg?w=1380&t=st=1709664000~exp=1709664600~hmac=555555')"
            : "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: isLightMode ? 0.08 : 0.15,
          filter: isLightMode ? 'contrast(1.1) brightness(1)' : 'contrast(1.2) brightness(0.8)'
        }}
      />

      {/* HERO SECTION - FITS VIEWPORT 100% TOP TO BOTTOM */}
      <header id="main-hero" className="relative bg-[#005587] text-white flex-1 h-full max-h-full overflow-hidden flex flex-col justify-between z-10 w-full max-w-full py-2.5 sm:py-4">
        
        {/* Hero Background with Unsplash Overlay */}
        <div 
          id="hero-bg-media"
          className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-300 pointer-events-none"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1526666923127-b2970f64b422?q=80&w=2072&auto=format&fit=crop')",
            filter: 'brightness(0.9) contrast(1.1)'
          }}
        >
          <div 
            id="hero-bg-overlay"
            className="absolute inset-0 transition-colors duration-300"
            style={{
              background: isLightMode
                ? 'linear-gradient(to bottom, rgba(0, 85, 135, 0.4) 0%, rgba(0, 51, 85, 0.7) 100%)'
                : 'linear-gradient(to bottom, rgba(11, 17, 32, 0.6) 0%, rgba(11, 17, 32, 0.9) 100%)'
            }}
          />
        </div>

        {/* Hero Content Container - Flex distribution */}
        <div id="hero-content-wrapper" className="relative z-10 flex flex-col justify-between flex-grow w-full max-w-full h-full min-h-0">
          
          {/* NAVIGATION */}
          <nav id="hero-navigation" className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pb-2 sm:pb-3 flex flex-col gap-2.5 sm:gap-3.5 shrink-0">
            
            {/* ROW 1: BRAND | USER TOOLS */}
            <div id="nav-row-1" className="flex justify-between items-center w-full gap-3">
              
              {/* Brand */}
              <div 
                id="brand-badge" 
                className="flex items-center gap-2 font-black text-xs sm:text-sm md:text-base bg-black text-white px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg shadow-black/20 select-none cursor-pointer transition-transform duration-200 hover:scale-105 shrink-0"
              >
                <HeartHandshake className="w-4 h-4 sm:w-5 sm:h-5 text-[#00C4CC] animate-heart-bounce" />
                <span className="tracking-wide">PAMOJA 16</span>
              </div>

              {/* User Tools (Right) */}
              <div id="nav-tools-group" className="flex items-center gap-2 sm:gap-3 shrink-0">
                <button 
                  id="btn-sign-in"
                  onClick={() => setShowSignInModal(true)}
                  className="bg-white/15 hover:bg-[#E5B80B] hover:text-black hover:border-[#E5B80B] text-white border border-white/20 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-200 backdrop-blur-md cursor-pointer hover:scale-105 active:scale-95"
                >
                  Sign In
                </button>
                
                <button 
                  id="btn-theme-toggle"
                  onClick={() => setIsLightMode(!isLightMode)}
                  aria-label="Toggle Theme Mode"
                  className="bg-white/10 hover:bg-white/30 border border-white/20 text-white w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:rotate-12 cursor-pointer hover:scale-105 active:scale-90 shrink-0"
                >
                  {isLightMode ? (
                    <Moon className="w-4 h-4 text-amber-300 transition-transform" />
                  ) : (
                    <Sun className="w-4 h-4 text-amber-400 transition-transform" />
                  )}
                </button>
                
                <div 
                  id="nav-user-avatar"
                  className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-[#E5B80B] border-2 border-[#E5B80B] bg-cover bg-center cursor-pointer transition-transform duration-200 hover:scale-110 shadow-md shrink-0"
                  style={{ backgroundImage: "url('https://i.pravatar.cc/150?img=12')" }}
                  title="Youth Ambassador Profile"
                />
              </div>
            </div>

            {/* ROW 2: MENU (Left) | SUBMIT PROJECT CTA (True Center) | COUNTRY (Right) */}
            <div id="nav-row-2" className="flex items-center justify-between w-full gap-2 sm:gap-3">
              <div className="flex-1 flex justify-start">
                <button 
                  id="btn-menu-trigger"
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="bg-white hover:bg-gray-100 text-gray-900 border-none px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full flex items-center gap-1.5 sm:gap-2 font-extrabold uppercase text-[0.7rem] sm:text-xs tracking-wider whitespace-nowrap transition-transform duration-200 hover:scale-105 shadow-md shadow-black/10 cursor-pointer shrink-0"
                >
                  <GripVertical className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-800" />
                  <span>MENU</span>
                </button>
              </div>

              <div className="flex-none flex justify-center">
                <button 
                  id="btn-submit-project"
                  onClick={() => setShowSubmitModal(true)}
                  className="bg-[#00C4CC] hover:bg-white text-black font-extrabold uppercase text-[0.72rem] sm:text-xs md:text-sm px-4 sm:px-6 py-1.5 sm:py-2 rounded-full flex items-center gap-1.5 sm:gap-2 whitespace-nowrap transition-all duration-200 hover:scale-105 shadow-[0_0_20px_rgba(0,196,204,0.4)] cursor-pointer active:scale-95 shrink-0"
                >
                  <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Submit Project</span>
                </button>
              </div>

              <div className="flex-1 flex justify-end">
                <div 
                  id="btn-country-badge"
                  className="bg-black/50 border border-white/20 text-white px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full flex items-center gap-1.5 font-bold text-xs whitespace-nowrap backdrop-blur-md select-none shrink-0"
                >
                  <span>🇰🇪</span>
                  <span>KE</span>
                </div>
              </div>
            </div>

            {/* ROW 3: NAVIGATION PILLS (Symmetrically Centered & Padded) */}
            <div id="nav-row-3" className="flex justify-center w-full px-2 mt-0.5">
              <div 
                id="nav-pills-bar"
                className="flex items-center justify-center bg-white/10 backdrop-blur-md p-1 sm:p-1.5 rounded-full gap-1 sm:gap-2 border border-white/15 max-w-full overflow-x-auto no-scrollbar shadow-inner"
              >
                {navLinks.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.name;
                  return (
                    <button
                      key={tab.name}
                      id={`tab-pill-${tab.name.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={() => setActiveTab(tab.name)}
                      className={`px-3.5 sm:px-5 py-1 sm:py-1.5 rounded-full text-[0.7rem] sm:text-xs font-bold uppercase transition-all duration-200 flex items-center gap-1.5 sm:gap-2 whitespace-nowrap cursor-pointer shrink-0 ${
                        isActive 
                          ? 'bg-white text-[#0b1120] shadow-sm scale-100' 
                          : 'text-white hover:bg-white/20'
                      }`}
                    >
                      <Icon className={`w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 ${isActive ? 'text-[#005587]' : 'text-[#E5B80B]'}`} />
                      <span>{tab.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </nav>

          {/* HERO BODY - SCALES & FITS SCREEN WITH EQUALIZED BALANCED SPACING */}
          <div id="hero-body-content" className="flex-1 flex flex-col lg:flex-row items-center justify-center lg:justify-between w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pb-3 sm:pb-5 pt-1 sm:pt-2 gap-4 sm:gap-6 lg:gap-10 min-h-0">
            
            {/* LEFT COLUMN: SOCIAL PROOF, ONLINE LINKS & HEADLINE */}
            <div id="hero-left-column" className="w-full lg:max-w-[54%] flex flex-col items-center lg:items-start text-center lg:text-left justify-center shrink-0">
              
              {/* Social Proof Pill */}
              <div 
                id="social-proof-pill"
                className="bg-white/10 backdrop-blur-md text-white inline-flex items-center px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full font-bold text-[0.7rem] sm:text-xs md:text-sm mb-2 sm:mb-3 border border-white/20 shadow-sm whitespace-nowrap max-w-full shrink-0"
              >
                <div className="flex -space-x-1.5 sm:-space-x-2 mr-2.5 sm:mr-3 shrink-0">
                  <div 
                    className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-white bg-cover bg-center shadow-xs shrink-0"
                    style={{ backgroundImage: "url('https://i.pravatar.cc/150?img=32')" }}
                  />
                  <div 
                    className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-white bg-cover bg-center shadow-xs shrink-0"
                    style={{ backgroundImage: "url('https://i.pravatar.cc/150?img=12')" }}
                  />
                  <div 
                    className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-white bg-cover bg-center shadow-xs shrink-0"
                    style={{ backgroundImage: "url('https://i.pravatar.cc/150?img=53')" }}
                  />
                </div>
                <span className="tracking-wider whitespace-nowrap">50+ YOUTH GROUPS ONBOARDED</span>
              </div>

              {/* Read More Links */}
              <div id="read-more-group" className="flex items-center gap-2 sm:gap-2.5 mb-2 sm:mb-3.5 text-[0.72rem] sm:text-xs md:text-sm font-semibold text-[#00C4CC] flex-wrap justify-center lg:justify-start shrink-0">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer"
                  id="btn-instagram-icon"
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-[#00C4CC] hover:text-black hover:border-[#00C4CC] transition-all duration-200 cursor-pointer hover:scale-110 shrink-0"
                  aria-label="Instagram Link"
                >
                  <Instagram className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </a>

                <a 
                  href="#platform-online" 
                  id="btn-globe-icon"
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-[#00C4CC] hover:text-black hover:border-[#00C4CC] transition-all duration-200 cursor-pointer hover:scale-110 shrink-0"
                  aria-label="Global Web Portal"
                >
                  <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </a>

                <span className="tracking-wide text-[0.72rem] sm:text-xs md:text-sm whitespace-nowrap">READ MORE ABOUT US ONLINE</span>
              </div>

              {/* Main Headline */}
              <h1 
                id="hero-main-title" 
                className="text-2xl sm:text-4xl md:text-5xl lg:text-[3.2rem] xl:text-[3.8rem] font-black uppercase tracking-tight leading-[0.96] text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-200 drop-shadow-sm select-none"
              >
                THE DIGITAL HOME FOR PEACE &amp; JUSTICE
              </h1>

              {/* Sub-context description */}
              <p className="mt-2.5 sm:mt-3.5 text-[0.75rem] sm:text-xs md:text-sm lg:text-base text-blue-100/85 font-medium max-w-xl leading-relaxed">
                Mobilizing youth advocates, community monitors, and civic pioneers under United Nations Sustainable Development Goal 16 across Kenya and East Africa.
              </p>
            </div>

            {/* RIGHT COLUMN: ORBIT VISUAL & TAGS */}
            <div id="hero-right-column" className="w-full lg:flex-1 flex flex-col items-center lg:items-end justify-center min-h-0">
              
              {/* Circular Feature with Orbit Animation (Symmetrically positioned labels outside) */}
              <div 
                id="circular-feature-node"
                className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-60 lg:h-60 xl:w-68 xl:h-68 rounded-full border-2 border-white/25 relative flex items-center justify-center mb-3 sm:mb-4 lg:mb-5 shrink-0 animate-pulse-wave transition-transform duration-300 hover:scale-105 shadow-2xl"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2000&auto=format&fit=crop')",
                  backgroundPosition: 'center',
                  backgroundSize: 'cover'
                }}
              >
                {/* Radial Shadow overlay inside image */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-black/25 via-transparent to-black/50 pointer-events-none" />

                {/* Orbiting Ring (Outer) */}
                <div 
                  id="orbit-ring-line" 
                  className="absolute -inset-[14%] rounded-full border border-white/20 pointer-events-none" 
                />

                {/* Orbit Container with Rotating Cyan Dot on the outer ring */}
                <div id="orbit-dot-spinner" className="absolute -inset-[14%] rounded-full animate-orbit-spin pointer-events-none">
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#00C4CC] rounded-full shadow-[0_0_10px_#00C4CC]" />
                </div>

                {/* Orbit Perimeter Labels (Positioned partially outside the orbit, clean text without pills) */}
                <div id="feature-orbit-labels" className="absolute inset-0 pointer-events-none">
                  {/* Left Side Labels */}
                  <span className="absolute top-[26%] -left-[20%] sm:-left-[26%] text-[0.65rem] sm:text-[0.72rem] md:text-xs font-bold uppercase tracking-wider text-[#E5B80B] drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] select-none">
                    Peace
                  </span>
                  <span className="absolute top-[50%] -translate-y-1/2 -left-[24%] sm:-left-[30%] text-[0.65rem] sm:text-[0.72rem] md:text-xs font-bold uppercase tracking-wider text-[#E5B80B] drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] select-none">
                    Justice
                  </span>
                  <span className="absolute bottom-[24%] -left-[20%] sm:-left-[26%] text-[0.65rem] sm:text-[0.72rem] md:text-xs font-bold uppercase tracking-wider text-[#E5B80B] drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] select-none">
                    Action
                  </span>

                  {/* Right Side Labels */}
                  <span className="absolute top-[26%] -right-[20%] sm:-right-[26%] text-[0.65rem] sm:text-[0.72rem] md:text-xs font-bold uppercase tracking-wider text-[#E5B80B] drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] select-none">
                    Unity
                  </span>
                  <span className="absolute top-[50%] -translate-y-1/2 -right-[24%] sm:-right-[30%] text-[0.65rem] sm:text-[0.72rem] md:text-xs font-bold uppercase tracking-wider text-[#E5B80B] drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] select-none">
                    Civic
                  </span>
                  <span className="absolute bottom-[24%] -right-[20%] sm:-right-[26%] text-[0.65rem] sm:text-[0.72rem] md:text-xs font-bold uppercase tracking-wider text-[#E5B80B] drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] select-none">
                    Voice
                  </span>
                </div>
              </div>

              {/* Tags Cloud */}
              <div id="tags-cloud-container" className="flex flex-wrap justify-center lg:justify-end gap-1.5 sm:gap-2 max-w-[540px] px-2 shrink-0">
                {tags.map((tag) => {
                  const isSelected = selectedTag === tag;
                  return (
                    <button
                      key={tag}
                      id={`tag-pill-${tag.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={() => setSelectedTag(isSelected ? null : tag)}
                      className={`border px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[0.68rem] sm:text-xs uppercase font-bold tracking-wide backdrop-blur-xs transition-all duration-200 cursor-pointer ${
                        isSelected 
                          ? 'border-[#00C4CC] bg-[#00C4CC]/20 text-white scale-105 shadow-sm' 
                          : 'border-white/20 text-gray-200 hover:border-[#00C4CC] hover:text-white hover:scale-105'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}

                {/* Tags Footer Row (Equalized padding, height and alignment) */}
                <div id="tags-footer-row" className="flex items-center justify-center lg:justify-end gap-2 sm:gap-2.5 w-full mt-1.5 sm:mt-2">
                  <div 
                    id="tag-powered-by"
                    className="bg-[#E5B80B] text-black px-3.5 sm:px-4 py-1.5 rounded-full text-[0.68rem] sm:text-xs font-black uppercase flex items-center gap-1.5 sm:gap-2 shadow-sm select-none"
                  >
                    <div className="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full bg-black flex items-center justify-center text-white text-[0.55rem]">
                      <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#E5B80B]" />
                    </div>
                    <span>Powered by Youth for SDGs</span>
                  </div>

                  <div 
                    id="tag-kenya-badge"
                    className="bg-white text-gray-900 px-3.5 sm:px-4 py-1.5 rounded-full text-[0.68rem] sm:text-xs font-black uppercase shadow-sm select-none"
                  >
                    Kenya
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </header>

      {/* MOBILE / EXPANDED SLIDE-OVER MENU DRAWER */}
      <div 
        id="mobile-drawer-backdrop"
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 flex justify-end ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div 
          id="mobile-drawer-panel"
          className={`w-80 h-full bg-[var(--color-app-bg)] p-6 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-out border-l border-white/10 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            {/* Drawer Header */}
            <div className="flex justify-between items-center pb-6 border-b border-white/10">
              <div className="flex items-center gap-2 font-black text-base text-[var(--color-text-main)]">
                <HeartHandshake className="w-5 h-5 text-[#00C4CC]" />
                <span>PAMOJA 16</span>
              </div>
              <button 
                id="btn-close-drawer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-[var(--color-text-main)] transition-colors cursor-pointer"
                aria-label="Close Menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="flex flex-col gap-2 mt-6">
              {drawerItems.map((item) => {
                const Icon = item.icon;
                const isCurrent = activeTab === item.name.toUpperCase();
                return (
                  <button
                    key={item.name}
                    id={`drawer-item-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => {
                      setActiveTab(item.name.toUpperCase());
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3.5 px-4 py-3 rounded-xl font-bold text-sm text-left transition-all cursor-pointer ${
                      isCurrent 
                        ? 'bg-[#005587] text-white shadow-md' 
                        : 'text-[var(--color-text-main)] hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-[#00C4CC]" />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Drawer Footer */}
          <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                setShowSubmitModal(true);
              }}
              className="w-full bg-[#00C4CC] text-black font-extrabold py-3 rounded-xl text-xs uppercase flex items-center justify-center gap-2 hover:bg-white transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Submit Project</span>
            </button>
            <p className="text-[0.7rem] text-[var(--color-text-muted)] text-center">
              Youth for Peace, Justice and Strong Institutions • SDG 16
            </p>
          </div>
        </div>
      </div>

      {/* SIGN IN MODAL */}
      {showSignInModal && (
        <div 
          id="modal-sign-in-backdrop"
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setShowSignInModal(false)}
        >
          <div 
            id="modal-sign-in-card"
            className="bg-[#151f32] text-white rounded-2xl max-w-md w-full p-6 border border-white/15 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowSignInModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#005587] flex items-center justify-center text-[#00C4CC]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg">Youth Member Access</h3>
                <p className="text-xs text-gray-400">Join the Pamoja 16 Peace Network</p>
              </div>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setShowSignInModal(false); }} className="flex flex-col gap-3.5 mt-4">
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Email or Phone</label>
                <input 
                  type="text" 
                  placeholder="youth.leader@pamoja16.org"
                  className="w-full bg-black/40 border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-hidden focus:border-[#00C4CC]"
                  defaultValue="mathengeanthony14253@gmail.com"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Security PIN / Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-black/40 border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-hidden focus:border-[#00C4CC]"
                  defaultValue="peace12345"
                />
              </div>

              <button 
                type="submit"
                className="mt-2 w-full bg-[#E5B80B] hover:bg-[#E5B80B]/90 text-black font-extrabold py-2.5 rounded-xl text-sm transition-all cursor-pointer"
              >
                Sign In to Platform
              </button>
            </form>
          </div>
        </div>
      )}

      {/* SUBMIT PROJECT MODAL */}
      {showSubmitModal && (
        <div 
          id="modal-submit-backdrop"
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setShowSubmitModal(false)}
        >
          <div 
            id="modal-submit-card"
            className="bg-[#151f32] text-white rounded-2xl max-w-lg w-full p-6 border border-white/15 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowSubmitModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#00C4CC]/20 text-[#00C4CC] flex items-center justify-center">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg">Submit Peace &amp; Justice Project</h3>
                <p className="text-xs text-gray-400">Showcase your grassroots initiative on the SDG 16 hub</p>
              </div>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setShowSubmitModal(false); }} className="flex flex-col gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Project Name</label>
                <input 
                  type="text" 
                  placeholder="e.g., Nairobi Civic Accountability Tracker"
                  className="w-full bg-black/40 border border-white/20 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-hidden focus:border-[#00C4CC]"
                  defaultValue="Nairobi Community Peace Watch"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">Primary Focus</label>
                  <select className="w-full bg-black/40 border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-hidden focus:border-[#00C4CC]">
                    <option>Anti-Corruption &amp; Transparency</option>
                    <option>Youth Peacebuilding</option>
                    <option>Human Rights Monitoring</option>
                    <option>Civic Education</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">County / Region</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Nairobi, Kisumu, Mombasa"
                    className="w-full bg-black/40 border border-white/20 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-hidden focus:border-[#00C4CC]"
                    defaultValue="Nairobi County"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Project Summary</label>
                <textarea 
                  rows={3}
                  placeholder="Describe the impact and goals of your initiative..."
                  className="w-full bg-black/40 border border-white/20 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-hidden focus:border-[#00C4CC]"
                  defaultValue="An open-source youth-led initiative monitoring justice accessibility and peaceful community dispute resolution in informal settlements."
                />
              </div>

              <button 
                type="submit"
                className="mt-2 w-full bg-[#00C4CC] hover:bg-white text-black font-extrabold py-2.5 rounded-xl text-sm transition-all cursor-pointer"
              >
                Submit for Verification
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
