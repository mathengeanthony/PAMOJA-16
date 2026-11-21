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
  CheckCircle2,
  ChevronDown,
  FileText,
  Download,
  Search,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { LuxtenMap } from './components/luxten/LuxtenMap';
import { LuxtenExcellence } from './components/luxten/LuxtenExcellence';
import { PamojaMovementSection } from './components/luxten/PamojaMovementSection';
import { PamojaAboutSection } from './components/luxten/PamojaAboutSection';
import { PamojaStoryWallSection } from './components/luxten/PamojaStoryWallSection';
import { PamojaNetworkSection } from './components/luxten/PamojaNetworkSection';

export default function App() {
  const [isLightMode, setIsLightMode] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('THE PLATFORM');
  const [section3Mode, setSection3Mode] = useState<'platform' | 'action-hub' | 'library'>('platform');
  const [showSignInModal, setShowSignInModal] = useState<boolean>(false);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [showLibraryModal, setShowLibraryModal] = useState<boolean>(false);
  const [libraryCategory, setLibraryCategory] = useState<string>('all');
  const [librarySearch, setLibrarySearch] = useState<string>('');
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [activeOrbitWord, setActiveOrbitWord] = useState<number>(0);
  const [activeFocusTrack, setActiveFocusTrack] = useState<number>(0);
  const [heroCounts, setHeroCounts] = useState({ counties: 0, initiatives: 0, youth: 0 });

  // Sync theme with body class
  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [isLightMode]);

  // Cycle active highlight through the 6 orbit perimeter words in sync with the 12s orbit
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const interval = window.setInterval(() => {
      setActiveOrbitWord((prev) => (prev + 1) % 6);
    }, 2000);
    return () => window.clearInterval(interval);
  }, []);

  // Cross-fade grassroots focus tracks every 3.5s
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const interval = window.setInterval(() => {
      setActiveFocusTrack((prev) => (prev + 1) % 3);
    }, 3500);
    return () => window.clearInterval(interval);
  }, []);

  // Smooth one-time count-up animation for the Hero 3-metric hairline strip
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setHeroCounts({ counties: 47, initiatives: 247, youth: 250 });
      return;
    }
    const duration = 1250;
    const start = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setHeroCounts({
        counties: Math.round(47 * eased),
        initiatives: Math.round(247 * eased),
        youth: Math.round(250 * eased)
      });
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    const container = document.getElementById('pamoja-root-container');
    if (el && container) {
      container.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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
    { name: 'Partners', icon: Handshake },
    { name: 'Networking', icon: Globe }
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

  const libraryResources = [
    {
      id: 'doc-1',
      title: 'Constitution of Kenya: Article 35 Access to Information & Public Participation Guide',
      category: 'legal',
      categoryLabel: 'Legal Toolkits',
      sdgTarget: 'SDG 16.3 / 16.10',
      pages: '44 pages',
      format: 'PDF Guide',
      size: '2.4 MB',
      description: 'Comprehensive toolkit detailing procedures for requesting public records, lodging civic petitions, and participating in county budget consultations.',
      downloads: '1,420+'
    },
    {
      id: 'doc-2',
      title: 'Grassroots Peace Accord & Community Mediation Protocol',
      category: 'peace',
      categoryLabel: 'Peace Accords',
      sdgTarget: 'SDG 16.1',
      pages: '32 pages',
      format: 'Framework Guide',
      size: '1.8 MB',
      description: 'Operational conflict de-escalation protocol for youth peace champions, elders, and ward monitors addressing local tensions.',
      downloads: '980+'
    },
    {
      id: 'doc-3',
      title: 'Devolved County Budget Social Audit & Expenditure Monitoring Toolkit',
      category: 'legal',
      categoryLabel: 'Legal Toolkits',
      sdgTarget: 'SDG 16.6',
      pages: '56 pages',
      format: 'Audit Toolkit',
      size: '3.1 MB',
      description: 'Step-by-step audit manual for tracking County Integrated Development Plans (CIDP), ward bursaries, and public infrastructure delivery.',
      downloads: '2,150+'
    },
    {
      id: 'doc-4',
      title: 'UNSCR 2250 (Youth, Peace, and Security) Kenya National Implementation Matrix',
      category: 'un',
      categoryLabel: 'UN SDG 16',
      sdgTarget: 'SDG 16.7',
      pages: '28 pages',
      format: 'UN Policy Brief',
      size: '1.2 MB',
      description: 'The Kenya Youth Coalition action roadmap aligning youth governance engagement directly with UN Security Council Resolution 2250.',
      downloads: '840+'
    },
    {
      id: 'doc-5',
      title: 'Civic Monitor Digital Security, Encryption & Whistleblower Protection Standard',
      category: 'legal',
      categoryLabel: 'Legal Toolkits',
      sdgTarget: 'SDG 16.5 / 16.10',
      pages: '38 pages',
      format: 'Security Manual',
      size: '2.0 MB',
      description: 'Practical data encryption, anonymous submission methods, and legal protections under Kenya’s Witness Protection Act for civic investigators.',
      downloads: '1,730+'
    },
    {
      id: 'doc-6',
      title: 'East Africa Community (EAC) Cross-Border Youth Peace Pact & Early Warning Protocol',
      category: 'peace',
      categoryLabel: 'Peace Accords',
      sdgTarget: 'SDG 16.a',
      pages: '48 pages',
      format: 'Regional Accord',
      size: '2.6 MB',
      description: 'Cross-border peacebuilding accord linking youth networks across Kenya, Uganda, Tanzania, and South Sudan for conflict prevention.',
      downloads: '620+'
    }
  ];

  return (
    <div id="pamoja-root-container" className="master-viewport w-full max-w-full bg-[var(--color-bg)] text-[var(--color-text-main)] flex flex-col relative overflow-x-hidden scroll-smooth transition-colors duration-300 selection:bg-[#00C4CC] selection:text-black">
      
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

      {/* SECTION 1: HERO SECTION - FITS FULL SCREEN AS POSTER VIEWPORT */}
      <header id="main-hero" className="snap-section relative bg-[#005587] text-white h-[100dvh] min-h-[100dvh] max-h-[100dvh] overflow-hidden flex flex-col w-full max-w-full py-1.5 sm:py-3 lg:py-3 shrink-0">
        
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
                ? 'linear-gradient(to bottom, rgba(0, 51, 85, 0.7) 0%, rgba(0, 51, 85, 0.5) 50%, rgba(0, 51, 85, 0.95) 100%)'
                : 'linear-gradient(to bottom, rgba(10, 23, 41, 0.6) 0%, rgba(10, 23, 41, 0.4) 50%, rgba(10, 23, 41, 0.95) 100%)'
            }}
          />
        </div>

        {/* Hero Content Container - Proportional flex distribution */}
        <div id="hero-content-wrapper" className="relative z-20 flex flex-col justify-between flex-1 w-full max-w-full h-full min-h-0 gap-1 sm:gap-2">
          
          {/* NAVIGATION */}
          <nav id="hero-navigation" className="w-full max-w-[1360px] mx-auto px-3.5 sm:px-6 lg:px-8 pb-1 sm:pb-2 flex flex-col gap-1.5 sm:gap-2.5 shrink-0">
            
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
                  <span className="tracking-wider uppercase">Kenya</span>
                </div>
              </div>
            </div>

            {/* ROW 3: NAVIGATION PILLS (Symmetrically Centered, Non-scrollable, No highlight cut-off) */}
            <div id="nav-row-3" className="flex justify-center w-full px-2 mt-0.5 sm:mt-1">
              <div 
                id="nav-pills-bar"
                className="inline-flex items-center justify-center bg-white/10 backdrop-blur-md px-1.5 sm:px-2 py-1 sm:py-1.5 rounded-full gap-1 sm:gap-2 border border-white/20 shadow-inner"
              >
                {navLinks.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.name;
                  return (
                    <button
                      key={tab.name}
                      id={`tab-pill-${tab.name.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={() => {
                        setActiveTab(tab.name);
                        if (tab.name === 'THE PLATFORM') {
                          setSection3Mode('platform');
                          scrollToSection('section-excellence');
                        } else if (tab.name === 'ACTION HUB') {
                          setSection3Mode('action-hub');
                          scrollToSection('section-excellence');
                        } else if (tab.name === 'LIBRARY') {
                          setSection3Mode('library');
                          scrollToSection('section-excellence');
                        }
                      }}
                      className={`px-3 sm:px-5 py-1 sm:py-1.5 rounded-full text-[0.68rem] sm:text-xs font-bold uppercase transition-all duration-200 flex items-center gap-1.5 sm:gap-2 whitespace-nowrap cursor-pointer shrink-0 ${
                        isActive 
                          ? 'bg-white text-[#0b1120] shadow-sm' 
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

          {/* HERO BODY - FLUID HEIGHT-AWARE DISTRIBUTION */}
          <div id="hero-body-content" className="flex-1 flex flex-col lg:flex-row items-center justify-between w-full max-w-[1360px] mx-auto px-3.5 sm:px-6 lg:px-8 pb-2 sm:pb-4 pt-0.5 sm:pt-2 gap-1.5 sm:gap-4 lg:gap-8 min-h-0">
            
            {/* LEFT COLUMN: SOCIAL PROOF, ONLINE LINKS & HEADLINE */}
            <div id="hero-left-column" className="w-full lg:max-w-[54%] flex flex-col items-center lg:items-start text-center lg:text-left justify-start shrink-0">
              
              {/* Social Proof Pill */}
              <div 
                id="social-proof-pill"
                className="bg-white/10 backdrop-blur-md text-white inline-flex items-center px-3 sm:px-4 py-1 rounded-full font-bold text-[0.65rem] sm:text-xs md:text-sm mb-1.5 sm:mb-2.5 border border-white/20 shadow-sm whitespace-nowrap max-w-full shrink-0"
              >
                <div className="flex -space-x-1.5 sm:-space-x-2 mr-2 sm:mr-3 shrink-0">
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
              <div id="read-more-group" className="flex items-center gap-2 sm:gap-2.5 mb-1 sm:mb-2.5 lg:mb-3 text-[0.68rem] sm:text-xs md:text-sm font-semibold text-[#00C4CC] flex-wrap justify-center lg:justify-start shrink-0">
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

                <span className="tracking-wide text-[0.68rem] sm:text-xs md:text-sm whitespace-nowrap">READ MORE ABOUT US ONLINE</span>
              </div>

              {/* Main Headline */}
              <h1 
                id="hero-main-title" 
                className="text-[clamp(1.3rem,min(6.2vw,3.5dvh),2.25rem)] lg:text-[clamp(2.35rem,3.6vw,3.5rem)] font-black uppercase tracking-tight leading-[0.98] text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-200 drop-shadow-sm select-none"
              >
                THE DIGITAL HOME FOR PEACE &amp; JUSTICE
              </h1>

              {/* Sub-context description */}
              <p className="mt-1 sm:mt-2.5 lg:mt-3 text-[0.7rem] sm:text-xs md:text-sm lg:text-base text-blue-100/85 font-medium max-w-xl leading-snug sm:leading-relaxed line-clamp-2 sm:line-clamp-none">
                Mobilizing youth advocates, community monitors, and civic pioneers under United Nations Sustainable Development Goal 16 across Kenya and East Africa.
              </p>

              {/* Cross-Fading Grassroots Focus Line (Pure hairline + unboxed typography) */}
              <div
                id="hero-focus-track-line"
                className="mt-1.5 sm:mt-3 lg:mt-4 pt-1.5 sm:pt-2.5 border-t border-white/15 w-full max-w-xl grid shrink-0"
              >
                {[
                  {
                    label: 'Ward Budget Social Audits',
                    onSelect: () => {
                      setSection3Mode('library');
                      scrollToSection('section-excellence');
                    }
                  },
                  {
                    label: 'Grassroots Mediation Protocols',
                    onSelect: () => scrollToSection('section-map')
                  },
                  {
                    label: 'East Africa Youth Peace Walks',
                    onSelect: () => scrollToSection('section-story-wall')
                  }
                ].map((track, idx) => {
                  const isActive = activeFocusTrack === idx;
                  return (
                    <button
                      key={track.label}
                      type="button"
                      onClick={track.onSelect}
                      aria-hidden={!isActive}
                      tabIndex={isActive ? 0 : -1}
                      className={`col-start-1 row-start-1 flex items-center justify-center lg:justify-start gap-2 text-[0.66rem] sm:text-xs font-medium tracking-wide transition-all duration-700 ease-out cursor-pointer min-w-0 ${
                        isActive
                          ? 'opacity-100 translate-y-0 pointer-events-auto z-10'
                          : 'opacity-0 translate-y-1 pointer-events-none z-0'
                      }`}
                    >
                      <span className="text-[#00C4CC] font-bold shrink-0">Active Track</span>
                      <span className="text-white/40 shrink-0" aria-hidden="true">·</span>
                      <span className="text-blue-100/85 hover:text-white truncate transition-colors">
                        {track.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RIGHT COLUMN: DUAL ORBIT VISUAL, MICRO-TELEMETRY TRIAD, 3-METRIC STRIP & TAGS */}
            <div id="hero-right-column" className="w-full flex-1 flex flex-col items-center lg:items-end justify-between lg:justify-center gap-1.5 sm:gap-2.5 min-h-0">
              
              {/* Orbit Centered Cleanly in Available Upper Space */}
              <div className="w-full max-w-[540px] flex-1 lg:flex-none flex items-center justify-center min-h-0">
                <div className="py-[20px] sm:py-8 lg:py-9 xl:py-10 flex items-center justify-center shrink-0">
                  <div 
                    id="circular-feature-node"
                    className="w-[clamp(62px,10.5dvh,118px)] h-[clamp(62px,10.5dvh,118px)] sm:w-28 sm:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 rounded-full border-2 border-white/30 relative flex items-center justify-center shrink-0 shadow-2xl"
                    style={{
                      backgroundImage: "url('https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2000&auto=format&fit=crop')",
                      backgroundPosition: 'center',
                      backgroundSize: 'cover'
                    }}
                  >
                    {/* Radial Shadow overlay inside image */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-black/25 via-transparent to-black/50 pointer-events-none" />

                    {/* Inner Orbiting Ring emitting the pulsing aura */}
                    <div 
                      id="orbit-ring-line" 
                      className="absolute -inset-[13%] rounded-full border border-white/25 pointer-events-none animate-pulse-wave" 
                    />

                    {/* Inner Orbit Container with Clockwise Rotating Cyan Dot */}
                    <div id="orbit-dot-spinner" className="absolute -inset-[13%] rounded-full animate-orbit-spin pointer-events-none origin-center">
                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#00C4CC] rounded-full shadow-[0_0_12px_#00C4CC]" />
                    </div>

                    {/* Outer Counter-Rotating Dashed Compass Ring */}
                    <div
                      id="orbit-outer-dashed-ring"
                      className="absolute -inset-[24%] rounded-full border border-dashed border-white/20 pointer-events-none"
                    />

                    {/* Outer Orbit Container with Counter-Clockwise Gold Satellite Node */}
                    <div id="orbit-gold-spinner" className="absolute -inset-[24%] rounded-full animate-orbit-reverse pointer-events-none origin-center">
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#E5B80B] rounded-full shadow-[0_0_10px_#E5B80B]" />
                    </div>

                    {/* Orbit Perimeter Labels (Anchored cleanly outside the outer -inset-[24%] ring, synced clockwise glow) */}
                    <div id="feature-orbit-labels" className="absolute -inset-[24%] pointer-events-none">
                      {/* Left Side Labels (indices 5, 4, 3 in clockwise cycle) */}
                      <span className={`absolute top-[20%] right-full mr-2 sm:mr-3 md:mr-4 text-[0.6rem] sm:text-[0.7rem] md:text-xs font-bold uppercase tracking-wider select-none text-right whitespace-nowrap transition-all duration-700 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] ${activeOrbitWord === 5 ? 'text-[#00C4CC] scale-105 opacity-100' : 'text-white/65 opacity-80'}`}>
                        Peace
                      </span>
                      <span className={`absolute top-1/2 -translate-y-1/2 right-full mr-2.5 sm:mr-4 md:mr-5 text-[0.6rem] sm:text-[0.7rem] md:text-xs font-bold uppercase tracking-wider select-none text-right whitespace-nowrap transition-all duration-700 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] ${activeOrbitWord === 4 ? 'text-[#E5B80B] scale-105 opacity-100' : 'text-white/65 opacity-80'}`}>
                        Justice
                      </span>
                      <span className={`absolute bottom-[20%] right-full mr-2 sm:mr-3 md:mr-4 text-[0.6rem] sm:text-[0.7rem] md:text-xs font-bold uppercase tracking-wider select-none text-right whitespace-nowrap transition-all duration-700 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] ${activeOrbitWord === 3 ? 'text-[#00C4CC] scale-105 opacity-100' : 'text-white/65 opacity-80'}`}>
                        Action
                      </span>

                      {/* Right Side Labels (indices 0, 1, 2 in clockwise cycle) */}
                      <span className={`absolute top-[20%] left-full ml-2 sm:ml-3 md:ml-4 text-[0.6rem] sm:text-[0.7rem] md:text-xs font-bold uppercase tracking-wider select-none text-left whitespace-nowrap transition-all duration-700 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] ${activeOrbitWord === 0 ? 'text-[#00C4CC] scale-105 opacity-100' : 'text-white/65 opacity-80'}`}>
                        Unity
                      </span>
                      <span className={`absolute top-1/2 -translate-y-1/2 left-full ml-2.5 sm:ml-4 md:ml-5 text-[0.6rem] sm:text-[0.7rem] md:text-xs font-bold uppercase tracking-wider select-none text-left whitespace-nowrap transition-all duration-700 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] ${activeOrbitWord === 1 ? 'text-[#E5B80B] scale-105 opacity-100' : 'text-white/65 opacity-80'}`}>
                        Civic
                      </span>
                      <span className={`absolute bottom-[20%] left-full ml-2 sm:ml-3 md:ml-4 text-[0.6rem] sm:text-[0.7rem] md:text-xs font-bold uppercase tracking-wider select-none text-left whitespace-nowrap transition-all duration-700 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] ${activeOrbitWord === 2 ? 'text-[#00C4CC] scale-105 opacity-100' : 'text-white/65 opacity-80'}`}>
                        Voice
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Anchored Bottom Stack: Synced Readout + Waveform + Compass Scale sitting cleanly right above Power Metrics & Tags */}
              <div className="w-full max-w-[540px] flex flex-col items-center shrink-0">
                
                {/* BELOW-ORBIT MINIMALIST ADDITION #1: Synced SDG 16 Micro-Readout */}
                <div
                  id="hero-orbit-sdg-readout"
                  className="grid w-full max-w-[420px] px-2 shrink-0"
                >
                  {[
                    { code: 'SDG 16.a', text: 'Cross-Border Youth Solidarity' },
                    { code: 'SDG 16.6', text: 'Accountable Local Institutions' },
                    { code: 'SDG 16.7', text: 'Inclusive Youth Decision-Making' },
                    { code: 'SDG 16.5', text: 'Public Audits & Anti-Corruption' },
                    { code: 'SDG 16.3', text: 'Rule of Law & Access to Justice' },
                    { code: 'SDG 16.1', text: 'Grassroots Conflict Prevention' }
                  ].map((item, idx) => {
                    const isSynced = activeOrbitWord === idx;
                    return (
                      <div
                        key={item.code}
                        aria-hidden={!isSynced}
                        className={`col-start-1 row-start-1 flex items-center justify-center gap-1.5 text-[0.6rem] sm:text-[0.68rem] tracking-wide transition-all duration-500 ${
                          isSynced ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 pointer-events-none'
                        }`}
                      >
                        <span className="font-extrabold text-[#00C4CC] tabular-nums shrink-0">{item.code}</span>
                        <span className="text-white/35 shrink-0" aria-hidden="true">·</span>
                        <span className="font-medium text-blue-100/85 truncate">{item.text}</span>
                      </div>
                    );
                  })}
                </div>

                {/* BELOW-ORBIT MINIMALIST ADDITION #2: Civic Horizon Pulse Waveform SVG */}
                <div
                  id="hero-horizon-waveform"
                  className="w-full max-w-[340px] h-[14px] sm:h-[16px] flex items-center justify-center shrink-0 pointer-events-none mt-1"
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 340 16"
                    className="w-full h-full overflow-visible"
                    fill="none"
                  >
                    <defs>
                      <linearGradient id="horizonBaseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                        <stop offset="25%" stopColor="rgba(255,255,255,0.22)" />
                        <stop offset="50%" stopColor="rgba(0,196,204,0.45)" />
                        <stop offset="75%" stopColor="rgba(255,255,255,0.22)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                      </linearGradient>
                      <linearGradient id="horizonPulseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#00C4CC" />
                        <stop offset="55%" stopColor="#ffffff" />
                        <stop offset="100%" stopColor="#E5B80B" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0 8 L122 8 L131 8 L138 4.5 L145 11.5 L153 2 L162 14 L170 2.5 L178 13 L186 4.5 L193 10.5 L200 8 L340 8"
                      stroke="url(#horizonBaseGrad)"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M0 8 L122 8 L131 8 L138 4.5 L145 11.5 L153 2 L162 14 L170 2.5 L178 13 L186 4.5 L193 10.5 L200 8 L340 8"
                      stroke="url(#horizonPulseGrad)"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="64 320"
                      className="animate-horizon-wave"
                    />
                  </svg>
                </div>

                {/* BELOW-ORBIT MINIMALIST ADDITION #3: Nairobi Compass Coordinate Scale */}
                <button
                  type="button"
                  id="hero-compass-scale"
                  onClick={() => scrollToSection('section-map')}
                  className="group flex flex-col items-center justify-center w-full max-w-[300px] pt-1 cursor-pointer shrink-0"
                  title="Jump to Live Kenya Map"
                >
                  <div className="relative flex items-center justify-between w-full px-3 h-2">
                    {Array.from({ length: 21 }).map((_, idx) => {
                      const isCenter = idx === 10;
                      const isMajor = idx % 5 === 0;
                      return (
                        <span
                          key={idx}
                          className={`w-px transition-colors ${
                            isCenter
                              ? 'h-2 bg-[#E5B80B]'
                              : isMajor
                                ? 'h-1.5 bg-[#00C4CC]/65 group-hover:bg-[#00C4CC]'
                                : 'h-1 bg-white/20'
                          }`}
                        />
                      );
                    })}
                    <span
                      aria-hidden="true"
                      className="absolute left-1/2 -translate-x-1/2 -top-0.5 w-1.5 h-1.5 rounded-full bg-[#00C4CC] shadow-[0_0_8px_#00C4CC] animate-compass-scan"
                    />
                  </div>
                  <span className="mt-0.5 text-[0.55rem] sm:text-[0.62rem] font-semibold uppercase tracking-[0.2em] tabular-nums text-blue-100/70 group-hover:text-[#00C4CC] transition-colors whitespace-nowrap">
                    1.29° S · 36.82° E · Nairobi HQ
                  </span>
                </button>

                {/* Hairline Vertical Axis Stem connecting Instrument Triad directly into the 3-Metric Strip */}
                <div id="hero-axis-connector" className="relative w-px h-2 sm:h-3 bg-gradient-to-b from-white/30 to-[#00C4CC]/60 overflow-hidden shrink-0 pointer-events-none mt-0.5" aria-hidden="true">
                  <div className="w-1 h-1 -ml-[1.5px] rounded-full bg-[#00C4CC] shadow-[0_0_6px_#00C4CC] animate-axis-bead" />
                </div>

                {/* MINIMAL 3-METRIC HAIRLINE STRIP WITH LUMINOUS BEAM & COUNT-UP */}
                <div
                  id="hero-metric-hairline-strip"
                  className="relative w-full border-y border-white/15 py-1.5 sm:py-2 grid grid-cols-3 divide-x divide-white/15 shrink-0 overflow-hidden"
                >
                  {/* Whisper-thin traveling gradient beam along the top hairline */}
                  <div
                    aria-hidden="true"
                    className="absolute top-0 left-0 h-px w-28 bg-gradient-to-r from-transparent via-[#00C4CC] to-[#E5B80B] animate-hairline-beam pointer-events-none"
                  />

                  <button
                    type="button"
                    id="hero-metric-counties"
                    onClick={() => scrollToSection('section-map')}
                    className="group flex flex-col items-center justify-center px-2 py-0.5 text-center cursor-pointer"
                  >
                    <span className="text-[clamp(0.95rem,2.3dvh,1.45rem)] font-black tracking-tight tabular-nums leading-none text-white group-hover:text-[#00C4CC] transition-colors">
                      {heroCounts.counties}
                    </span>
                    <span className="text-[0.6rem] sm:text-xs font-semibold tracking-wide text-blue-100/75 group-hover:text-white transition-colors mt-0.5 whitespace-nowrap">
                      Counties
                    </span>
                  </button>

                  <button
                    type="button"
                    id="hero-metric-initiatives"
                    onClick={() => scrollToSection('section-story-wall')}
                    className="group flex flex-col items-center justify-center px-2 py-0.5 text-center cursor-pointer"
                  >
                    <span className="text-[clamp(0.95rem,2.3dvh,1.45rem)] font-black tracking-tight tabular-nums leading-none text-[#E5B80B] group-hover:text-white transition-colors">
                      {heroCounts.initiatives}+
                    </span>
                    <span className="text-[0.6rem] sm:text-xs font-semibold tracking-wide text-blue-100/75 group-hover:text-white transition-colors mt-0.5 whitespace-nowrap">
                      Initiatives
                    </span>
                  </button>

                  <button
                    type="button"
                    id="hero-metric-youth"
                    onClick={() => scrollToSection('section-movement')}
                    className="group flex flex-col items-center justify-center px-2 py-0.5 text-center cursor-pointer"
                  >
                    <span className="text-[clamp(0.95rem,2.3dvh,1.45rem)] font-black tracking-tight tabular-nums leading-none text-white group-hover:text-[#00C4CC] transition-colors">
                      {heroCounts.youth}K+
                    </span>
                    <span className="text-[0.6rem] sm:text-xs font-semibold tracking-wide text-blue-100/75 group-hover:text-white transition-colors mt-0.5 whitespace-nowrap">
                      Youth
                    </span>
                  </button>
                </div>

                {/* Tags Cloud */}
                <div id="tags-cloud-container" className="flex flex-wrap justify-center lg:justify-end mt-2 sm:mt-2.5 gap-1 sm:gap-2 w-full px-1 shrink-0">
                {tags.map((tag) => {
                  const isSelected = selectedTag === tag;
                  return (
                    <button
                      key={tag}
                      id={`tag-pill-${tag.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={() => setSelectedTag(isSelected ? null : tag)}
                      className={`border px-2.5 sm:px-3.5 py-0.5 sm:py-1.5 rounded-full text-[0.62rem] sm:text-xs uppercase font-bold tracking-wide backdrop-blur-xs transition-all duration-200 cursor-pointer ${
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
                <div id="tags-footer-row" className="flex items-center justify-center lg:justify-end gap-2 sm:gap-2.5 w-full mt-1.5 sm:mt-3 mb-0">
                  <div 
                    id="tag-powered-by"
                    className="bg-[#E5B80B] text-black px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[0.64rem] sm:text-xs font-black uppercase flex items-center gap-1.5 sm:gap-2 shadow-sm select-none"
                  >
                    <div className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 rounded-full bg-black flex items-center justify-center text-white text-[0.55rem]">
                      <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#E5B80B]" />
                    </div>
                    <span>Powered by Youth for SDGs</span>
                  </div>

                  <div 
                    id="tag-kenya-badge"
                    className="bg-white text-gray-900 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[0.64rem] sm:text-xs font-black uppercase shadow-sm select-none"
                  >
                    Kenya
                  </div>
                </div>

              </div>

              </div>

            </div>

          </div>

        </div>

      </header>

      {/* LUXTEN SECTIONS BODY */}
      <LuxtenMap isLightMode={isLightMode} />
      <LuxtenExcellence 
        isLightMode={isLightMode}
        activeMode={section3Mode}
        onModeChange={setSection3Mode}
        onOpenSubmitModal={() => setShowSubmitModal(true)} 
        onOpenDrawer={() => setIsMobileMenuOpen(true)}
      />
      <PamojaMovementSection
        isLightMode={isLightMode}
        onOpenSignInModal={() => setShowSignInModal(true)}
        onOpenSubmitModal={() => setShowSubmitModal(true)}
      />
      <PamojaAboutSection
        isLightMode={isLightMode}
        onOpenSubmitModal={() => setShowSubmitModal(true)}
        onJumpToPlatform={() => {
          setSection3Mode('platform');
          scrollToSection('section-excellence');
        }}
        onOpenStoryWall={() => {
          scrollToSection('section-story-wall');
        }}
      />
      <PamojaStoryWallSection
        isLightMode={isLightMode}
        onBackToAbout={() => {
          scrollToSection('section-about');
        }}
        onOpenSignInModal={() => setShowSignInModal(true)}
        onScrollHome={() => {
          scrollToSection('main-hero');
        }}
      />
      <PamojaNetworkSection
        isLightMode={isLightMode}
        onOpenSignInModal={() => setShowSignInModal(true)}
        onScrollHome={() => {
          scrollToSection('main-hero');
        }}
      />

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
                      const upper = item.name.toUpperCase();
                      setActiveTab(upper);
                      setIsMobileMenuOpen(false);
                      if (upper === 'THE PLATFORM') {
                        setSection3Mode('platform');
                        scrollToSection('section-excellence');
                      } else if (upper === 'ACTION HUB') {
                        setSection3Mode('action-hub');
                        scrollToSection('section-excellence');
                      } else if (upper === 'LIBRARY') {
                        setSection3Mode('library');
                        scrollToSection('section-excellence');
                      } else if (upper === 'ADVOCACY') {
                        setShowSubmitModal(true);
                      } else if (upper === 'PARTNERS') {
                        scrollToSection('section-about');
                      } else if (upper === 'NETWORKING') {
                        scrollToSection('section-network');
                      }
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

      {/* SDG 16 CIVIC LIBRARY & KNOWLEDGE VAULT MODAL */}
      {showLibraryModal && (
        <div 
          id="modal-library-backdrop"
          className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-5"
          onClick={() => setShowLibraryModal(false)}
        >
          <div 
            id="modal-library-card"
            className="bg-[#0f172a] text-white rounded-2xl max-w-3xl w-full p-5 sm:p-7 border border-white/15 shadow-2xl relative max-h-[88vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button 
              id="btn-close-library-modal"
              onClick={() => setShowLibraryModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white bg-white/5 hover:bg-white/15 w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close Library"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3.5 pb-4 border-b border-white/10 shrink-0">
              <div className="w-11 h-11 rounded-2xl bg-[#005587] flex items-center justify-center text-[#00C4CC] shadow-inner shrink-0">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-lg sm:text-xl tracking-tight text-white">SDG 16 Civic Library</h3>
                  <span className="bg-[#E5B80B]/20 text-[#E5B80B] text-[0.65rem] font-black uppercase px-2 py-0.5 rounded-full border border-[#E5B80B]/30">Open Access</span>
                </div>
                <p className="text-xs text-gray-300 mt-0.5">Grassroots peace accords, legal toolkits, and civic oversight frameworks for Kenya &amp; East Africa.</p>
              </div>
            </div>

            {/* Search & Category Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-2.5 my-4 shrink-0">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text"
                  placeholder="Search toolkits, accords, constitution..."
                  value={librarySearch}
                  onChange={(e) => setLibrarySearch(e.target.value)}
                  className="w-full bg-black/40 border border-white/15 rounded-xl pl-9 pr-3.5 py-2 text-xs sm:text-sm text-white focus:outline-hidden focus:border-[#00C4CC] placeholder-gray-500"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
                {[
                  { id: 'all', label: 'All Resources' },
                  { id: 'legal', label: 'Legal Toolkits' },
                  { id: 'peace', label: 'Peace Accords' },
                  { id: 'un', label: 'UN SDG 16' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setLibraryCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                      libraryCategory === cat.id 
                        ? 'bg-[#00C4CC] text-black shadow-sm font-extrabold' 
                        : 'bg-white/5 text-gray-300 hover:bg-white/15 hover:text-white'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Download Confirmation Toast */}
            {downloadNotice && (
              <div className="mb-3 bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 px-3.5 py-2 rounded-xl text-xs flex items-center gap-2 animate-fadeIn shrink-0">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Downloading <strong>{downloadNotice}</strong>. Verified Pamoja 16 toolkit.</span>
              </div>
            )}

            {/* Resources List (Scrollable) */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-3 min-h-0">
              {libraryResources
                .filter(doc => libraryCategory === 'all' || doc.category === libraryCategory)
                .filter(doc => librarySearch === '' || doc.title.toLowerCase().includes(librarySearch.toLowerCase()) || doc.description.toLowerCase().includes(librarySearch.toLowerCase()))
                .map((doc) => (
                  <div 
                    key={doc.id}
                    className="p-3.5 sm:p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#00C4CC]/50 hover:bg-white/[0.06] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-[#005587]/30 border border-[#005587] flex items-center justify-center text-[#00C4CC] shrink-0 mt-0.5">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-[0.65rem] font-extrabold text-[#E5B80B] bg-[#E5B80B]/10 px-2 py-0.5 rounded-sm">
                            {doc.sdgTarget}
                          </span>
                          <span className="text-[0.65rem] font-bold text-gray-400">
                            {doc.format} • {doc.pages} • {doc.size}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white leading-snug">{doc.title}</h4>
                        <p className="text-xs text-gray-300 mt-1 line-clamp-2 leading-relaxed">{doc.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center sm:flex-col justify-between sm:justify-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                      <button
                        onClick={() => {
                          setDownloadNotice(doc.title);
                          setTimeout(() => setDownloadNotice(null), 4000);
                        }}
                        className="bg-[#00C4CC] hover:bg-white text-black font-extrabold text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer shadow-sm hover:scale-102"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </button>
                      <span className="text-[0.65rem] text-gray-400 font-medium text-center">{doc.downloads} downloads</span>
                    </div>
                  </div>
                ))}
            </div>

            {/* Modal Footer with quick submission prompt */}
            <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-xs text-gray-400 shrink-0">
              <span className="hidden sm:inline">Have research or an accord to archive?</span>
              <button 
                onClick={() => {
                  setShowLibraryModal(false);
                  setShowSubmitModal(true);
                }}
                className="text-[#00C4CC] hover:underline font-bold flex items-center gap-1 ml-auto cursor-pointer"
              >
                <span>Contribute to Library</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
