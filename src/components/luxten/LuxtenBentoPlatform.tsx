import React, { useState } from 'react';
import { 
  BarChart3, 
  Radio, 
  Video, 
  DollarSign, 
  BookOpen, 
  Sparkles, 
  ShieldCheck, 
  ArrowUpRight, 
  Users, 
  Smartphone, 
  Mic, 
  Volume2, 
  Briefcase, 
  FileText, 
  X, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  MessageSquareLock,
  Layers,
  Award,
  Globe,
  CheckCircle2,
  Share2
} from 'lucide-react';

interface LuxtenBentoPlatformProps {
  isLightMode?: boolean;
  onOpenSubmitModal?: () => void;
}

type CategoryType = 'all' | 'social' | 'funding' | 'analytics' | 'knowledge';

interface BentoItem {
  id: string;
  category: CategoryType;
  title: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
  image: string;
  description: string;
  features: string[];
  stats?: { label: string; value: string };
  actionText: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const LuxtenBentoPlatform: React.FC<LuxtenBentoPlatformProps> = ({ 
  isLightMode = false,
  onOpenSubmitModal
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [selectedModalItem, setSelectedModalItem] = useState<BentoItem | null>(null);

  const bentoItems: BentoItem[] = [
    {
      id: 'impact-dashboard',
      category: 'analytics',
      title: 'Impact Dashboard & MEL',
      subtitle: 'Quantitative SDG 16 Tracker',
      badge: 'Real-time Analytics',
      badgeColor: 'bg-[#00C4CC] text-black',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
      description: 'Automated participatory monitoring, evaluation, and learning (MEL) engine tracking field participation, project submission rates, and county resource governance.',
      features: [
        'One-click National SDG 16 Annual Report Generator',
        'Quarterly Learning Review & Insights Publisher',
        'Direct integration with UN reporting structures',
        'Real-time verification of youth-led peace initiatives'
      ],
      stats: { label: 'Initiatives Logged', value: '247 Active' },
      actionText: 'Explore Dashboard',
      icon: BarChart3
    },
    {
      id: 'civic-spaces',
      category: 'social',
      title: 'Civic Spaces & Impact Reels',
      subtitle: 'WebRTC Audio & Short-Video',
      badge: 'Live Audio & Video',
      badgeColor: 'bg-[#E5B80B] text-black',
      image: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=800&auto=format&fit=crop',
      description: 'Low-bandwidth live audio townhalls for rapid county peace dialogues, paired with a 60-second vertical video stream featuring Swahili, English, and regional translations.',
      features: [
        'Low-bandwidth WebRTC live audio rooms for county dialogues',
        '60-second "Impact Reels" with automatic native dubbing',
        'Encrypted 1-on-1 mentorship & 1-to-many broadcast channels',
        'Emergency peace alert push integration (Web Push & SMS)'
      ],
      stats: { label: 'Live Listeners', value: '1,420 Youth' },
      actionText: 'Enter Audio Space',
      icon: Radio
    },
    {
      id: 'funding-mpesa',
      category: 'funding',
      title: 'M-Pesa & Donor Matchmaking',
      subtitle: 'Crowdfunding & Institutional Grants',
      badge: 'Financial Pipeline',
      badgeColor: 'bg-emerald-500 text-white',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=800&auto=format&fit=crop',
      description: 'Integrated M-Pesa Daraja gateway for micro-tipping peace advocates, backed by an intelligent matchmaking engine pairing youth projects with multilateral donors.',
      features: [
        'Instant M-Pesa Daraja payment gateway for community drives',
        'Donor matchmaking with FAO, UNHCR, UNICEF, and IOM',
        'MOU & partnership lifecycle manager for verified NGOs',
        'Transparent corporate sponsorship milestone tracker'
      ],
      stats: { label: 'Funds Disbursed', value: 'KES 18.2M' },
      actionText: 'Connect Donor Match',
      icon: DollarSign
    },
    {
      id: 'story-wall',
      category: 'social',
      title: 'Story Wall & Civic Voice',
      subtitle: 'Grassroots Photo Essays & Media',
      badge: 'Individual Expression',
      badgeColor: 'bg-pink-500 text-white',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop',
      description: 'A curated multimedia gallery showcasing verified field testimonies, youth-led documentary films, and peacebuilding photo essays from all 47 counties.',
      features: [
        'Rich multimedia submission portal for field champions',
        'Interactive community upvoting, comments & bookmarks',
        'Temporal visual stories spotlighting grassroots peace triumphs',
        'Verified impact score & reputation badges for creators'
      ],
      stats: { label: 'Verified Stories', value: '180+ Published' },
      actionText: 'View Stories',
      icon: Video
    },
    {
      id: 'civic-bounties',
      category: 'funding',
      title: 'Civic Bounties & Job Board',
      subtitle: 'Micro-Grants, Fellowships & Careers',
      badge: 'Career & Opportunities',
      badgeColor: 'bg-purple-500 text-white',
      image: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=800&auto=format&fit=crop',
      description: 'Dedicated opportunities hub listing research grants, UN consultancies, and micro-task bounties where youth earn micro-grants for translating briefs or mapping forums.',
      features: [
        'Micro-task civic bounties with instant stipend payouts',
        'Direct profile applications auto-attaching verified impact scores',
        'UN consultancies, fellowships & NGO internship listings',
        'University academic credit & research placement pipeline'
      ],
      stats: { label: 'Open Opportunities', value: '64 Active' },
      actionText: 'Browse Bounties',
      icon: Briefcase
    },
    {
      id: 'resource-library',
      category: 'knowledge',
      title: 'Resource Library & Wiki',
      subtitle: 'Open Toolkits & Legal Frameworks',
      badge: 'SDG 16 Knowledge Base',
      badgeColor: 'bg-blue-500 text-white',
      image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800&auto=format&fit=crop',
      description: 'Open-access repository containing policy briefs, legal toolkits, and peacebuilding methodologies with in-browser previews and collaborative policy drafting incubators.',
      features: [
        'Real-time markdown co-editing for petitions & manifestos',
        'Comprehensive Civic Encyclopedia detailing SDG 16 targets',
        'Agile co-design feedback loop for community platform voting',
        'Downloadable legal frameworks and peacebuilding guides'
      ],
      stats: { label: 'Open Documents', value: '310+ Toolkits' },
      actionText: 'Access Library',
      icon: BookOpen
    }
  ];

  const filteredItems = activeCategory === 'all' 
    ? bentoItems 
    : bentoItems.filter(item => item.category === activeCategory);

  return (
    <section 
      id="section-platform" 
      className="snap-section relative bg-[#005587] text-white min-h-[100dvh] lg:h-[100dvh] lg:max-h-[100dvh] overflow-hidden flex flex-col justify-between w-full max-w-full py-2 sm:py-3 lg:py-2.5 px-3 sm:px-6 lg:px-8 shrink-0 select-none transition-colors duration-500"
    >
      {/* Background Visual Layer Matching Hero Section */}
      <div 
        id="platform-bg-media"
        className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-500 pointer-events-none"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')",
          filter: 'brightness(0.7) contrast(1.15)'
        }}
      >
        <div 
          id="platform-bg-overlay"
          className="absolute inset-0 transition-colors duration-500"
          style={{
            background: isLightMode
              ? 'linear-gradient(to bottom, rgba(0, 51, 85, 0.78) 0%, rgba(0, 51, 85, 0.65) 50%, rgba(0, 51, 85, 0.96) 100%)'
              : 'linear-gradient(to bottom, rgba(10, 23, 41, 0.85) 0%, rgba(10, 23, 41, 0.68) 50%, rgba(10, 23, 41, 0.98) 100%)'
          }}
        />
      </div>

      {/* Decorative Grid Mesh overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10 z-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(0, 196, 204, 0.6) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* TOP HEADER & NAVIGATION BAR - Scaled to fit single screen */}
      <header className="relative z-20 w-full max-w-[1500px] mx-auto flex flex-col gap-1.5 sm:gap-2 shrink-0">
        
        {/* ROW 1: BRAND BADGE, SYSTEM INDICATOR & GLOBAL STATUS */}
        <div className="flex items-center justify-between w-full gap-2">
          {/* Brand & System Title */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 font-black text-xs sm:text-sm bg-black/80 text-white px-3 py-1 rounded-full shadow-md border border-white/15">
              <Layers className="w-3.5 h-3.5 text-[#00C4CC]" />
              <span className="tracking-wide">DVAP ECOSYSTEM</span>
            </div>
            <span className="hidden sm:inline-block text-[10px] uppercase font-mono tracking-widest text-[#E5B80B] font-bold">
              Digital Visibility &amp; Accountability
            </span>
          </div>

          {/* System Live Indicators */}
          <div className="flex items-center gap-2 text-[10px] font-mono">
            <div className="hidden md:flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
              <span className="w-2 h-2 rounded-full bg-[#00C4CC] animate-ping" />
              <span className="font-bold text-gray-200">WebRTC Audio: Active</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#00C4CC]/30 text-[#00C4CC] font-bold">
              <span>●</span>
              <span>47 COUNTIES ONLINE</span>
            </div>
          </div>
        </div>

        {/* ROW 2: HEADLINE & FILTER PILLS */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-2 border-b border-white/15 pb-2">
          <div>
            <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-[#00C4CC] mb-0.5">
              <span>COMPONENT 3</span>
              <span>•</span>
              <span className="text-[#E5B80B]">CORE CIVIC OPERATING SYSTEM</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[2.2rem] font-black uppercase tracking-tight leading-none text-white drop-shadow-sm">
              DIGITAL PLATFORM &amp; ACCOUNTABILITY ENGINE
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 shrink-0">
            {[
              { id: 'all', label: 'All Modules' },
              { id: 'social', label: 'Social & Audio' },
              { id: 'funding', label: 'Funding & Grants' },
              { id: 'analytics', label: 'Impact & MEL' },
              { id: 'knowledge', label: 'Library & Wiki' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as CategoryType)}
                className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-[#00C4CC] text-black shadow-md scale-105'
                    : 'bg-white/10 hover:bg-white/20 text-white/90 border border-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

      </header>

      {/* BENTO GRID CONTAINER - STRICT VIEWPORT BUDGET TO AVOID VERTICAL SCROLL */}
      <main className="relative z-20 flex-1 min-h-0 w-full max-w-[1500px] mx-auto my-1.5 sm:my-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 h-full max-h-[58vh] lg:max-h-[60vh]">
          {filteredItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                id={`bento-card-${item.id}`}
                onClick={() => setSelectedModalItem(item)}
                className="group relative rounded-2xl overflow-hidden backdrop-blur-md bg-white/10 dark:bg-black/40 border border-white/15 hover:border-[#00C4CC]/70 transition-all duration-300 shadow-xl hover:shadow-[0_0_25px_rgba(0,196,204,0.25)] flex flex-col justify-between cursor-pointer p-3 sm:p-3.5 hover:-translate-y-0.5"
              >
                {/* Visual Image Background with Soft Mask */}
                <div 
                  className="absolute inset-0 z-0 bg-cover bg-center opacity-30 group-hover:opacity-45 transition-opacity duration-500 scale-100 group-hover:scale-105 pointer-events-none"
                  style={{ backgroundImage: `url('${item.image}')` }}
                />
                <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30 pointer-events-none" />

                {/* Card Top: Badges & Icon */}
                <div className="relative z-10 flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wide shadow-xs ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                    {item.stats && (
                      <span className="hidden sm:inline-flex items-center gap-1 bg-black/60 backdrop-blur-sm border border-white/10 px-2 py-0.5 rounded-full text-[9px] font-mono text-[#E5B80B] font-bold">
                        {item.stats.value}
                      </span>
                    )}
                  </div>

                  <div className="w-7 h-7 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-[#00C4CC] group-hover:text-black group-hover:border-[#00C4CC] transition-colors shrink-0">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Card Body: Title, Subtitle & Description */}
                <div className="relative z-10 my-1">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#00C4CC] font-bold block mb-0.5">
                    {item.subtitle}
                  </span>
                  <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-white leading-tight group-hover:text-[#00C4CC] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-gray-200/90 line-clamp-2 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Card Footer: Interactive CTA & Quick Feature Pills */}
                <div className="relative z-10 pt-1.5 border-t border-white/15 flex items-center justify-between gap-2 mt-auto">
                  <div className="flex items-center gap-1 text-[9px] font-mono text-gray-300">
                    <Sparkles className="w-3 h-3 text-[#E5B80B]" />
                    <span className="truncate max-w-[150px]">{item.features[0]}</span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#00C4CC] group-hover:text-[#E5B80B] transition-colors shrink-0">
                    <span>{item.actionText}</span>
                    <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>

              </div>
            );
          })}
        </div>
      </main>

      {/* BOTTOM FOOTER BAR - FAST METRICS & PLATFORM ACCESS */}
      <footer className="relative z-20 w-full max-w-[1500px] mx-auto pt-1.5 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0 text-white">
        
        {/* Left: Quick Summary Ticker */}
        <div className="flex items-center gap-3 text-[10px] font-mono tracking-wider text-gray-300">
          <div className="flex items-center gap-1 text-[#E5B80B] font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>5-TIER RBAC GOVERNANCE</span>
          </div>
          <span className="hidden md:inline">•</span>
          <span className="hidden md:inline text-gray-400">DARJA M-PESA GATEWAY</span>
          <span className="hidden md:inline">•</span>
          <span className="hidden md:inline text-gray-400">UN SDG 16 REPORTING COMPATIBLE</span>
        </div>

        {/* Right: Quick Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          {onOpenSubmitModal && (
            <button
              onClick={onOpenSubmitModal}
              className="bg-[#00C4CC] hover:bg-white text-black font-extrabold uppercase text-[10px] sm:text-xs px-3.5 py-1 rounded-full flex items-center gap-1.5 transition-transform hover:scale-105 shadow-md cursor-pointer"
            >
              <span>Onboard Initiative</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          )}

          <a
            href="#section-impact"
            className="bg-white/15 hover:bg-[#E5B80B] hover:text-black text-white px-3.5 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-colors border border-white/20"
          >
            Explore Impact Data
          </a>
        </div>

      </footer>

      {/* DETAILED INTERACTIVE MODAL WHEN CLICKING ANY BENTO CARD */}
      {selectedModalItem && (
        <div 
          id="bento-detail-modal"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in-up"
          onClick={() => setSelectedModalItem(null)}
        >
          <div 
            className="relative w-full max-w-xl bg-[#0a1729] border border-white/20 rounded-3xl p-6 shadow-2xl text-white overflow-hidden flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Backdrop Preview */}
            <div 
              className="absolute inset-0 opacity-20 bg-cover bg-center pointer-events-none"
              style={{ backgroundImage: `url('${selectedModalItem.image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a1729]/90 via-[#0a1729] to-[#0a1729] pointer-events-none" />

            {/* Modal Header */}
            <div className="relative z-10 flex items-start justify-between">
              <div>
                <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide inline-block mb-2 ${selectedModalItem.badgeColor}`}>
                  {selectedModalItem.badge}
                </span>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white">
                  {selectedModalItem.title}
                </h3>
                <p className="text-xs font-mono text-[#00C4CC] uppercase tracking-wider mt-0.5">
                  {selectedModalItem.subtitle}
                </p>
              </div>

              <button
                onClick={() => setSelectedModalItem(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Description */}
            <p className="relative z-10 text-xs sm:text-sm text-gray-200 leading-relaxed">
              {selectedModalItem.description}
            </p>

            {/* Feature List */}
            <div className="relative z-10 flex flex-col gap-2 bg-black/40 border border-white/10 rounded-2xl p-4">
              <span className="text-[10px] font-mono font-bold uppercase text-[#E5B80B] tracking-widest">
                Included Core Capabilities:
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-gray-300">
                {selectedModalItem.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00C4CC] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modal Footer */}
            <div className="relative z-10 flex items-center justify-between pt-2 border-t border-white/10">
              {selectedModalItem.stats && (
                <div>
                  <span className="text-[9px] font-mono uppercase text-gray-400 block">{selectedModalItem.stats.label}</span>
                  <span className="text-sm font-black text-[#E5B80B]">{selectedModalItem.stats.value}</span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedModalItem(null)}
                  className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedModalItem(null);
                    if (onOpenSubmitModal) onOpenSubmitModal();
                  }}
                  className="px-5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-[#00C4CC] hover:bg-white text-black transition-all hover:scale-105 shadow-md cursor-pointer"
                >
                  Launch Module
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
