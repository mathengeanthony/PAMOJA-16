import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CalendarPlus,
  CheckCircle2,
  Clock,
  Globe2,
  Home,
  MapPin,
  Plus,
  Search,
  Sparkles,
  User,
  Users,
  X,
  Heart,
  Share2,
} from 'lucide-react';

interface PamojaStoryWallSectionProps {
  isLightMode?: boolean;
  onBackToAbout?: () => void;
  onOpenSignInModal?: () => void;
  onScrollHome?: () => void;
}

type FeedScope = 'all' | 'group' | 'individuals';
type TimeFilter = 'all' | 'today' | 'week' | 'month' | 'later';

interface StoryItem {
  id: string;
  timeline: 'past' | 'future';
  scope: 'group' | 'individuals';
  category: string;
  title: string;
  subtitle: string;
  hosts: string;
  location: string;
  timeLabel: string;
  timeBucket?: 'today' | 'week' | 'month' | 'later';
  metricLabel: string;
  statusRight?: string;
  gradientClass: string;
  image: string;
  fullStory: string;
  sdgTarget: string;
  avatars: string[];
}

const INDIVIDUAL_CATEGORIES = [
  'All',
  'Artwork & Murals',
  'Music & Spoken Word',
  'Documentaries & Film',
  'Photography',
  'Journalism & Essays',
  'Civic & Legal Aid',
] as const;

const GROUP_CATEGORIES = [
  'All',
  'Peace Walks & Marches',
  'Fundraisers & Drives',
  'Seminars & Workshops',
  'Webinars & Spaces',
  'Debates & Forums',
  'Networking & Summits',
] as const;

const INITIAL_STORIES: StoryItem[] = [
  // ======================== TOP ROW: PAST STORIES ========================
  {
    id: 'past-1',
    timeline: 'past',
    scope: 'group',
    category: 'Peace Walks & Marches',
    title: 'Nairobi Unity & Peace Walk 2026',
    subtitle: 'Hosted by KMUN, Siasa Place & Nairobi Youth Councils',
    hosts: 'Hosted by KMUN, Siasa Place, County Peace Hubs',
    location: 'Nairobi · Group',
    timeLabel: '2w ago',
    metricLabel: '1,850 walkers',
    gradientClass: 'from-[#005587]/90 via-[#0074a8]/85 to-[#00C4CC]/85',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=900&auto=format&fit=crop',
    fullStory:
      'Over 1,850 young Kenyans, community elders, and university chapters marched peacefully from Uhuru Park to KICC calling for inclusive civic participation, transparent county governance, and safe urban youth spaces under SDG 16.',
    sdgTarget: 'SDG 16.1 · Peace & Unity',
    avatars: ['WK', 'AO', 'BM', 'FN'],
  },
  {
    id: 'past-2',
    timeline: 'past',
    scope: 'group',
    category: 'Fundraisers & Drives',
    title: 'Lake Basin Legal Aid Fundraiser',
    subtitle: 'Hosted by Uraia Trust & Kisumu Law Clinics',
    hosts: 'Hosted by Uraia Trust, Kisumu Paralegals',
    location: 'Kisumu · Group',
    timeLabel: '1mo ago',
    metricLabel: 'KES 1.4M raised',
    gradientClass: 'from-[#b47b00]/90 via-[#d49b06]/85 to-[#E5B80B]/90',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=900&auto=format&fit=crop',
    fullStory:
      'A coalition fundraiser mobilizing local entrepreneurs, diaspora partners, and M-Pesa micro-donors to equip three mobile paralegal clinics serving traders and youth across Kisumu, Siaya, and Homa Bay.',
    sdgTarget: 'SDG 16.3 · Access to Justice',
    avatars: ['MA', 'JO', 'EN'],
  },
  {
    id: 'past-3',
    timeline: 'past',
    scope: 'individuals',
    category: 'Documentaries & Film',
    title: 'Voices of Tana: Mini-Documentary',
    subtitle: 'Directed by Amina Ochieng · Independent Film',
    hosts: 'By Amina Ochieng (Solo Youth Filmmaker)',
    location: 'Tana River · Individual',
    timeLabel: '3w ago',
    metricLabel: '14.2K views',
    gradientClass: 'from-[#0f3c68]/90 via-[#005587]/85 to-[#1d4ed8]/85',
    image: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=900&auto=format&fit=crop',
    fullStory:
      'Shot over 18 days on a mirrorless kit, this 12-minute documentary captures how young farmers and pastoralist mediators co-designed shared water-corridor peace agreements along the Tana delta.',
    sdgTarget: 'SDG 16.7 · Inclusive Voices',
    avatars: ['AO', 'HA'],
  },
  {
    id: 'past-4',
    timeline: 'past',
    scope: 'individuals',
    category: 'Artwork & Murals',
    title: 'Mathare Wall of Justice Mural',
    subtitle: 'Painted by Brian Mwangi & 3 Local Muralists',
    hosts: 'By Brian Mwangi · Community Peace Art',
    location: 'Nairobi · Individual',
    timeLabel: '1mo ago',
    metricLabel: '6 murals live',
    gradientClass: 'from-[#006970]/90 via-[#008d96]/85 to-[#00C4CC]/85',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=900&auto=format&fit=crop',
    fullStory:
      'Transforming a neglected corridor into an illustrated constitutional rights walkway featuring Article 35 access-to-information graphics and portraits of neighbourhood peace champions.',
    sdgTarget: 'SDG 16.10 · Public Information',
    avatars: ['BM', 'SK'],
  },
  {
    id: 'past-5',
    timeline: 'past',
    scope: 'group',
    category: 'Seminars & Workshops',
    title: '47-County Open Budget Seminar',
    subtitle: 'Hosted by TI-Kenya & Pamoja Civic Monitors',
    hosts: 'Hosted by TI-Kenya, Pamoja 16 Monitors',
    location: 'Nakuru · Group',
    timeLabel: '6w ago',
    metricLabel: '340 trained',
    gradientClass: 'from-[#3730a3]/90 via-[#4338ca]/85 to-[#005587]/90',
    image: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=900&auto=format&fit=crop',
    fullStory:
      'Three-day intensive workshop training youth monitors from 22 Rift Valley and Central wards on reading County Integrated Development Plans (CIDPs) and flagging procurement discrepancies.',
    sdgTarget: 'SDG 16.6 · Accountable Institutions',
    avatars: ['WN', 'DK', 'PO', 'LM'],
  },
  {
    id: 'past-6',
    timeline: 'past',
    scope: 'individuals',
    category: 'Journalism & Essays',
    title: 'Following Ward Bursary Trails',
    subtitle: 'Investigative Dispatch by Mercy Njoroge',
    hosts: 'By Mercy Njoroge · Citizen Journalism',
    location: 'Kiambu · Individual',
    timeLabel: '2mo ago',
    metricLabel: '9.4K reads',
    gradientClass: 'from-[#1e293b]/90 via-[#0f172a]/85 to-[#005587]/85',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=900&auto=format&fit=crop',
    fullStory:
      'An open-data investigative series cross-checking published county education bursary lists with local school attendance records, leading to public transparency dashboards in four sub-counties.',
    sdgTarget: 'SDG 16.5 · Anti-Corruption',
    avatars: ['MN'],
  },

  // ======================== SECOND ROW: FUTURE ACTIVITIES & INITIATIVES ========================
  {
    id: 'future-1',
    timeline: 'future',
    scope: 'group',
    category: 'Debates & Forums',
    title: 'National Youth SDG 16 Policy Debate',
    subtitle: 'Inter-university & county assembly civic accountability debate',
    hosts: 'Kenya Model UN & Pamoja 16',
    location: 'Nairobi · Group',
    timeLabel: '4 hrs',
    timeBucket: 'today',
    metricLabel: '320 seats',
    statusRight: 'Live Today',
    gradientClass: 'from-[#005587] to-[#0a192f]',
    image: 'https://images.unsplash.com/photo-1526666923127-b2970f64b422?q=80&w=900&auto=format&fit=crop',
    fullStory:
      'Live moderated debate pairing youth county delegates with civic legal scholars on strengthening public participation bills and youth-led oversight committees.',
    sdgTarget: 'SDG 16.7 · Inclusive Governance',
    avatars: ['WK', 'JO', 'AM', 'TN'],
  },
  {
    id: 'future-2',
    timeline: 'future',
    scope: 'individuals',
    category: 'Music & Spoken Word',
    title: 'Amani Cypher: Peace Anthems Tape',
    subtitle: 'Open mic & studio recording for solo spoken-word & music artists',
    hosts: 'Curated by Zuri Beats · Mombasa',
    location: 'Mombasa · Individual',
    timeLabel: 'Tomorrow',
    timeBucket: 'week',
    metricLabel: '24 artists',
    statusRight: 'Open Call',
    gradientClass: 'from-[#006970] to-[#0a192f]',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=900&auto=format&fit=crop',
    fullStory:
      'Submit a 90-second original verse, acoustic song, or Swahili spoken-word piece championing community cohesion. Selected tracks launch on the Pamoja 16 Story Wall.',
    sdgTarget: 'SDG 16.1 · Cultural Peace',
    avatars: ['ZB', 'KL'],
  },
  {
    id: 'future-3',
    timeline: 'future',
    scope: 'group',
    category: 'Webinars & Spaces',
    title: 'Cross-Border Early Warning Webinar',
    subtitle: 'Low-bandwidth WebRTC townhall for Kenya, Uganda & Tanzania youth',
    hosts: 'EAC Youth Peace Network',
    location: 'Online · Group',
    timeLabel: 'In 5 days',
    timeBucket: 'week',
    metricLabel: '600+ RSVP',
    statusRight: 'WebRTC',
    gradientClass: 'from-[#00446e] to-[#050a14]',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=900&auto=format&fit=crop',
    fullStory:
      'Regional virtual seminar training border-town community peace volunteers on verified incident logging, digital safety, and rapid mediation protocols.',
    sdgTarget: 'SDG 16.A · Regional Capacity',
    avatars: ['HA', 'EN', 'DK'],
  },
  {
    id: 'future-4',
    timeline: 'future',
    scope: 'individuals',
    category: 'Photography',
    title: 'Faces of Cohesion Photo Essay Challenge',
    subtitle: 'Street & portrait photography documenting everyday peacebuilders',
    hosts: 'Led by Otieno Lens Collective',
    location: 'Eldoret · Individual',
    timeLabel: 'This Month',
    timeBucket: 'month',
    metricLabel: '48 entries',
    statusRight: 'Featured',
    gradientClass: 'from-[#7c5800] to-[#0c121e]',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=900&auto=format&fit=crop',
    fullStory:
      'Calling independent youth photographers across all 47 counties to submit 5-frame visual essays showing local elders, youth cooperatives, and markets building trust.',
    sdgTarget: 'SDG 16.10 · Civic Storytelling',
    avatars: ['OL', 'MA'],
  },
  {
    id: 'future-5',
    timeline: 'future',
    scope: 'group',
    category: 'Networking & Summits',
    title: 'Coastal Civic Tech & Donor Mixer',
    subtitle: 'Matchmaking youth social founders with SDG 16 grantmakers',
    hosts: 'Swahilipot Hub & Pamoja Daraja',
    location: 'Mombasa · Group',
    timeLabel: 'Next Month',
    timeBucket: 'later',
    metricLabel: '180 founders',
    statusRight: 'Grants',
    gradientClass: 'from-[#005587] to-[#041520]',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=900&auto=format&fit=crop',
    fullStory:
      'In-person networking summit and live pitch showcase connecting grassroots civic-tech teams with multilateral donors and M-Pesa micro-grant partners.',
    sdgTarget: 'SDG 16.6 · Civic Innovation',
    avatars: ['SP', 'WK', 'BM'],
  },
  {
    id: 'future-6',
    timeline: 'future',
    scope: 'individuals',
    category: 'Civic & Legal Aid',
    title: 'Solo Citizen Constitution Guide',
    subtitle: 'Create 1-page Swahili & Sheng explainers on citizen rights',
    hosts: 'Open Contributor Initiative',
    location: 'Remote · Individual',
    timeLabel: 'Ongoing',
    timeBucket: 'later',
    metricLabel: '36 guides',
    statusRight: 'Ongoing',
    gradientClass: 'from-[#046c4e] to-[#091518]',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=900&auto=format&fit=crop',
    fullStory:
      'Individual legal students and illustrators translating Article 35, bail rights, and county petition procedures into crisp one-page printable infographics.',
    sdgTarget: 'SDG 16.3 · Legal Literacy',
    avatars: ['FN', 'JO'],
  },
];

export const PamojaStoryWallSection: React.FC<PamojaStoryWallSectionProps> = ({
  isLightMode = false,
  onBackToAbout,
  onOpenSignInModal,
  onScrollHome,
}) => {
  const [stories, setStories] = useState<StoryItem[]>(INITIAL_STORIES);
  const [feedScope, setFeedScope] = useState<FeedScope>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all');
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStory, setActiveStory] = useState<StoryItem | null>(null);
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});
  const [joinedFutureIds, setJoinedFutureIds] = useState<Record<string, boolean>>({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  // New Story Form State
  const [newTimeline, setNewTimeline] = useState<'past' | 'future'>('future');
  const [newScope, setNewScope] = useState<'group' | 'individuals'>('individuals');
  const [newCategory, setNewCategory] = useState<string>('Artwork & Murals');
  const [newTitle, setNewTitle] = useState('');
  const [newLocation, setNewLocation] = useState('Nairobi County');
  const [newDesc, setNewDesc] = useState('');

  const availableCategories = useMemo(() => {
    if (feedScope === 'individuals') return [...INDIVIDUAL_CATEGORIES];
    if (feedScope === 'group') return [...GROUP_CATEGORIES];
    return [
      'All',
      'Peace Walks & Marches',
      'Artwork & Murals',
      'Documentaries & Film',
      'Music & Spoken Word',
      'Seminars & Workshops',
      'Fundraisers & Drives',
      'Photography',
      'Debates & Forums',
      'Journalism & Essays',
      'Webinars & Spaces',
      'Networking & Summits',
      'Civic & Legal Aid',
    ];
  }, [feedScope]);

  const handleScopeChange = (nextScope: FeedScope) => {
    setFeedScope(nextScope);
    setSelectedCategory('All');
  };

  const matchesFilters = (item: StoryItem) => {
    if (feedScope !== 'all' && item.scope !== feedScope) return false;
    if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const hit =
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q);
      if (!hit) return false;
    }
    return true;
  };

  const pastStories = useMemo(
    () => stories.filter((s) => s.timeline === 'past' && matchesFilters(s)),
    [stories, feedScope, selectedCategory, searchQuery]
  );

  const futureStories = useMemo(
    () =>
      stories.filter((s) => {
        if (s.timeline !== 'future') return false;
        if (!matchesFilters(s)) return false;
        if (timeFilter !== 'all' && s.timeBucket !== timeFilter) return false;
        return true;
      }),
    [stories, feedScope, selectedCategory, searchQuery, timeFilter]
  );

  const timeCounts = useMemo(() => {
    const base = stories.filter((s) => s.timeline === 'future' && matchesFilters(s));
    return {
      today: base.filter((s) => s.timeBucket === 'today').length,
      week: base.filter((s) => s.timeBucket === 'week').length,
      month: base.filter((s) => s.timeBucket === 'month').length,
      later: base.filter((s) => s.timeBucket === 'later').length,
    };
  }, [stories, feedScope, selectedCategory, searchQuery]);

  const handleCreateStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const created: StoryItem = {
      id: `custom-${Date.now()}`,
      timeline: newTimeline,
      scope: newScope,
      category: newCategory,
      title: newTitle.trim(),
      subtitle: newDesc.trim() || `${newCategory} initiative submitted by community member`,
      hosts: newScope === 'group' ? 'Community Coalition' : 'Individual Youth Advocate',
      location: `${newLocation.trim() || 'Kenya'} · ${newScope === 'group' ? 'Group' : 'Individual'}`,
      timeLabel: newTimeline === 'past' ? 'Just archived' : 'This Month',
      timeBucket: newTimeline === 'future' ? 'month' : undefined,
      metricLabel: newTimeline === 'past' ? 'Verified story' : 'Open to join',
      statusRight: newTimeline === 'future' ? 'New' : undefined,
      gradientClass:
        newScope === 'group'
          ? 'from-[#005587]/90 via-[#0074a8]/85 to-[#00C4CC]/85'
          : 'from-[#b47b00]/90 via-[#d49b06]/85 to-[#E5B80B]/90',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=900&auto=format&fit=crop',
      fullStory:
        newDesc.trim() ||
        'Submitted directly on the Pamoja 16 Story Wall to inspire grassroots peace, justice, and community solidarity across Kenya.',
      sdgTarget: 'SDG 16 · Community Action',
      avatars: ['P16'],
    };

    setStories((prev) => [created, ...prev]);
    setShowAddModal(false);
    setNewTitle('');
    setNewDesc('');
  };

  const surfaceBg = isLightMode
    ? 'bg-[#f4f7fb] text-[#0b0f17] border-[#005587]/15'
    : 'bg-[#0b0d11] text-white border-white/10';

  const cardBg = isLightMode
    ? 'bg-white border-[#005587]/15 shadow-xs'
    : 'bg-[#15181f] border-white/10';

  return (
    <section
      id="section-story-wall"
      className={`snap-section min-h-[100dvh] h-[100dvh] max-h-[100dvh] w-full flex flex-col justify-between overflow-hidden relative select-none border-b transition-colors duration-500 ${surfaceBg}`}
    >
      {/* MAIN CONTAINER */}
      <div className="w-full max-w-[480px] md:max-w-[860px] lg:max-w-[1240px] mx-auto h-full flex flex-col justify-between min-h-0 px-3.5 sm:px-6 lg:px-10 pt-2.5 sm:pt-4 pb-1.5">
        
        {/* ===================================================================== */}
        {/* 1. TOP APP HEADER BAR (BACK TO SECTION 5 | STORY WALL | SUBMIT ICON)  */}
        {/* ===================================================================== */}
        <header className="flex items-center justify-between gap-3 shrink-0 pb-1.5">
          <button
            type="button"
            id="btn-storywall-back"
            onClick={() => {
              if (onBackToAbout) {
                onBackToAbout();
              } else {
                const el = document.getElementById('section-about');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            aria-label="Back to About Us Section 5"
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
              isLightMode ? 'hover:bg-[#005587]/10 text-[#0b0f17]' : 'hover:bg-white/10 text-white'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <h2 className="text-sm sm:text-base font-semibold tracking-tight text-center">
            Story Wall
          </h2>

          <button
            type="button"
            id="btn-storywall-add-top"
            onClick={() => setShowAddModal(true)}
            aria-label="Add activity or story"
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
              isLightMode ? 'hover:bg-[#005587]/10 text-[#005587]' : 'hover:bg-white/10 text-[#00C4CC]'
            }`}
            title="Post a past story or future activity"
          >
            <CalendarPlus className="w-4.5 h-4.5" />
          </button>
        </header>

        {/* ===================================================================== */}
        {/* 2. HEADLINE + 3 FEED SCOPE BUTTONS (ALL | GROUP | INDIVIDUALS)        */}
        {/* ===================================================================== */}
        <div className="shrink-0">
          <h3 className="text-lg xs:text-xl sm:text-2xl lg:text-[1.75rem] font-extrabold tracking-tight leading-[1.12] text-balance">
            Share Stories &amp; Join Actions{' '}
            <span className={isLightMode ? 'text-[#005587]' : 'text-[#00C4CC]'}>
              for Peace &amp; Justice!
            </span>
          </h3>

          {/* 3 Feed Scope Buttons Below Headline: All | Group | Individuals */}
          <div className="mt-2 flex items-center justify-between gap-2 flex-wrap">
            <div
              role="tablist"
              aria-label="Story Wall Feed Scope"
              className={`inline-flex items-center p-1 rounded-full border gap-1 ${
                isLightMode
                  ? 'bg-white border-[#005587]/15 shadow-xs'
                  : 'bg-[#15181f] border-white/10'
              }`}
            >
              {[
                { id: 'all' as const, label: 'All', icon: Globe2 },
                { id: 'group' as const, label: 'Group', icon: Users },
                { id: 'individuals' as const, label: 'Individuals', icon: User },
              ].map((tab) => {
                const Icon = tab.icon;
                const active = feedScope === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    id={`btn-feed-scope-${tab.id}`}
                    onClick={() => handleScopeChange(tab.id)}
                    className={`px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                      active
                        ? isLightMode
                          ? 'bg-[#005587] text-white shadow-xs'
                          : 'bg-white text-[#0b0d11] shadow-xs'
                        : isLightMode
                          ? 'text-[#0b0f17]/70 hover:text-[#005587] hover:bg-[#005587]/5'
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {showSearch && (
              <div className="relative flex-1 min-w-[180px] max-w-xs">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search stories, counties, art..."
                  className={`w-full h-8 pl-8 pr-7 rounded-full text-xs border outline-none ${
                    isLightMode
                      ? 'bg-white border-[#005587]/25 text-[#0b0f17] focus:border-[#005587]'
                      : 'bg-[#15181f] border-white/15 text-white focus:border-[#00C4CC]'
                  }`}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white cursor-pointer"
                    aria-label="Clear search"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Dynamic Category Mode Selector Chips (Changes based on All / Group / Individuals) */}
          <div className="mt-1.5 flex items-center gap-1.5 overflow-x-auto hide-scroll py-0.5">
            {availableCategories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
                    isSelected
                      ? 'bg-[#00C4CC] text-[#031926] border-[#00C4CC] font-bold'
                      : isLightMode
                        ? 'bg-white/80 text-[#0b0f17]/75 border-[#005587]/15 hover:border-[#005587]'
                        : 'bg-white/[0.04] text-gray-300 border-white/10 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* ===================================================================== */}
        {/* 3. SCROLLABLE FEED BODY: TOP ROW (PAST) + SECOND ROW (FUTURE)         */}
        {/* ===================================================================== */}
        <div className="flex-1 min-h-0 overflow-y-auto hide-scroll space-y-3 sm:space-y-4 py-1.5">
          
          {/* TOP ROW: PAST PAMOJA 16 ACTIVITIES STORIES (HORIZONTAL SHOWCASE CARDS) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span
                className={`text-[11px] sm:text-xs font-bold uppercase tracking-wider ${
                  isLightMode ? 'text-[#005587]' : 'text-gray-300'
                }`}
              >
                Past Pamoja 16 Stories
              </span>
              <span
                className={`text-[10px] font-mono tabular-nums ${
                  isLightMode ? 'text-[#005587]/70' : 'text-[#00C4CC]'
                }`}
              >
                {pastStories.length} archived
              </span>
            </div>

            {pastStories.length === 0 ? (
              <div
                className={`rounded-2xl border p-4 text-center text-xs ${cardBg} ${
                  isLightMode ? 'text-gray-600' : 'text-gray-400'
                }`}
              >
                No past stories match this filter yet. Try switching category or scope.
              </div>
            ) : (
              <div className="flex items-stretch gap-2.5 sm:gap-3.5 overflow-x-auto hide-scroll pb-1">
                {pastStories.map((story) => (
                  <button
                    key={story.id}
                    type="button"
                    onClick={() => setActiveStory(story)}
                    className="group relative min-w-[230px] xs:min-w-[250px] sm:min-w-[285px] lg:min-w-[300px] max-w-[310px] h-[182px] xs:h-[195px] sm:h-[212px] rounded-2xl overflow-hidden p-3.5 sm:p-4 flex flex-col justify-between text-left cursor-pointer shrink-0 transition-transform duration-200 hover:scale-[1.015] shadow-md text-white"
                  >
                    {/* Background Action Photo */}
                    {!failedImages[story.id] && (
                      <img
                        src={story.image}
                        alt={story.title}
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setFailedImages((prev) => ({ ...prev, [story.id]: true }))
                        }
                        className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    {/* Vibrant Brand Gradient Overlay (Matches Purple & Orange cards in screenshot) */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${story.gradientClass}`}
                    />

                    {/* Top Metadata Pills */}
                    <div className="relative z-10 flex items-center gap-1.5 flex-wrap">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-xs text-[10px] font-semibold text-white">
                        <Globe2 className="w-2.5 h-2.5" />
                        <span>{story.location}</span>
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/35 text-[10px] font-bold text-[#E5B80B]">
                        <Clock className="w-2.5 h-2.5" />
                        <span>{story.timeLabel}</span>
                      </span>
                    </div>

                    {/* Title & Hosts */}
                    <div className="relative z-10 my-auto pt-1">
                      <h4 className="text-sm sm:text-base font-extrabold leading-snug line-clamp-2">
                        {story.title}
                      </h4>
                      <p className="text-[10.5px] sm:text-xs text-white/85 mt-1 line-clamp-2">
                        {story.hosts}
                      </p>
                    </div>

                    {/* Avatars + Bottom Metric */}
                    <div className="relative z-10 flex items-center justify-between gap-2 pt-1">
                      <div className="flex items-center -space-x-1.5">
                        {story.avatars.map((av, idx) => (
                          <span
                            key={`${story.id}-av-${idx}`}
                            className="w-6 h-6 rounded-full bg-white/90 text-[#003355] border border-white text-[9px] font-black flex items-center justify-center"
                          >
                            {av}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-6 h-6 rounded-lg bg-white text-[#005587] flex items-center justify-center shadow-xs">
                          <Sparkles className="w-3.5 h-3.5" />
                        </span>
                        <span className="text-xs font-bold tabular-nums">
                          {story.metricLabel}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* SECOND ROW: FUTURE ACTIVITIES & INITIATIVES */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <h4 className="text-sm sm:text-base font-bold tracking-tight">
                Future Activities &amp; Initiatives
              </h4>
              <span
                className={`text-[10px] font-mono tabular-nums ${
                  isLightMode ? 'text-[#005587]/70' : 'text-[#E5B80B]'
                }`}
              >
                {futureStories.length} upcoming
              </span>
            </div>

            {/* Time Filter Pills (Today | This Week | This Month | Later) */}
            <div className="flex items-center gap-1.5 overflow-x-auto hide-scroll pb-2">
              {[
                { id: 'all' as const, label: 'All', count: 0 },
                { id: 'today' as const, label: 'Today', count: timeCounts.today },
                { id: 'week' as const, label: 'This week', count: timeCounts.week },
                { id: 'month' as const, label: 'This month', count: timeCounts.month },
                { id: 'later' as const, label: 'Later', count: timeCounts.later },
              ].map((tf) => {
                const active = timeFilter === tf.id;
                return (
                  <button
                    key={tf.id}
                    type="button"
                    onClick={() => setTimeFilter(tf.id)}
                    className={`px-3 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
                      active
                        ? isLightMode
                          ? 'bg-[#0b0f17] text-white border-[#0b0f17]'
                          : 'bg-white text-[#0b0d11] border-white'
                        : isLightMode
                          ? 'bg-white text-[#0b0f17]/75 border-[#005587]/15 hover:border-[#005587]'
                          : 'bg-[#1c1f26] text-gray-300 border-white/5 hover:border-white/20'
                    }`}
                  >
                    <span>{tf.label}</span>
                    {tf.count > 0 && (
                      <span className="w-4 h-4 rounded-full bg-[#E5B80B] text-[#0b0f17] text-[9px] font-black flex items-center justify-center tabular-nums">
                        {tf.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Future Activities Cards List (1-col on mobile matching screenshot, 2-col on desktop) */}
            {futureStories.length === 0 ? (
              <div
                className={`rounded-2xl border p-4 text-center text-xs ${cardBg} ${
                  isLightMode ? 'text-gray-600' : 'text-gray-400'
                }`}
              >
                No upcoming activities match your current selection.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pb-1">
                {futureStories.map((item) => {
                  const isJoined = !!joinedFutureIds[item.id];
                  return (
                    <div
                      key={item.id}
                      onClick={() => setActiveStory(item)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setActiveStory(item);
                        }
                      }}
                      className={`group relative rounded-2xl overflow-hidden border p-3 sm:p-3.5 min-h-[118px] sm:min-h-[128px] flex flex-col justify-between cursor-pointer transition-all duration-200 hover:border-[#00C4CC]/60 text-white ${
                        isLightMode ? 'border-[#005587]/20' : 'border-white/10'
                      }`}
                    >
                      {/* Photo Background */}
                      {!failedImages[item.id] && (
                        <img
                          src={item.image}
                          alt={item.title}
                          referrerPolicy="no-referrer"
                          onError={() =>
                            setFailedImages((prev) => ({ ...prev, [item.id]: true }))
                          }
                          className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${item.gradientClass} opacity-90`}
                      />

                      {/* Top Row: Badges + Status Indicator */}
                      <div className="relative z-10 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/15 backdrop-blur-xs text-[9.5px] font-semibold text-white">
                            <MapPin className="w-2.5 h-2.5 text-[#00C4CC]" />
                            <span>{item.location}</span>
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#E5B80B] text-[#0b0f17] text-[9.5px] font-extrabold">
                            <Clock className="w-2.5 h-2.5" />
                            <span>{item.timeLabel}</span>
                          </span>
                          <span className="text-[9.5px] font-medium text-white/80 hidden xs:inline">
                            {item.category}
                          </span>
                        </div>

                        <span className="text-[10.5px] font-bold text-[#00C4CC] shrink-0">
                          {isJoined ? 'Joined' : item.statusRight || item.metricLabel}
                        </span>
                      </div>

                      {/* Middle Title & Subtitle */}
                      <div className="relative z-10 my-1.5 pr-10">
                        <h5 className="text-sm sm:text-base font-extrabold leading-tight truncate">
                          {item.title}
                        </h5>
                        <p className="text-[11px] text-white/80 truncate mt-0.5">
                          {item.subtitle}
                        </p>
                      </div>

                      {/* Bottom Row: Avatars + Circular White Arrow Button */}
                      <div className="relative z-10 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="flex items-center -space-x-1.5 shrink-0">
                            {item.avatars.map((av, idx) => (
                              <span
                                key={`${item.id}-f-av-${idx}`}
                                className="w-5 h-5 rounded-full bg-white/90 text-[#003355] border border-white text-[8px] font-black flex items-center justify-center"
                              >
                                {av}
                              </span>
                            ))}
                          </div>
                          <span className="text-[10px] text-white/85 truncate">
                            {item.hosts} · {item.metricLabel}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setJoinedFutureIds((prev) => ({
                              ...prev,
                              [item.id]: !prev[item.id],
                            }));
                          }}
                          aria-label={isJoined ? `Leave ${item.title}` : `Join ${item.title}`}
                          className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-105 shrink-0 cursor-pointer shadow-md ${
                            isJoined
                              ? 'bg-emerald-400 text-[#041520]'
                              : 'bg-white text-[#0b0f17]'
                          }`}
                        >
                          {isJoined ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : (
                            <ArrowRight className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* ===================================================================== */}
        {/* 4. BOTTOM NAVIGATION DOCK (MATCHES SCREENSHOT BOTTOM ICON BAR)        */}
        {/* ===================================================================== */}
        <nav
          aria-label="Story Wall Quick Controls"
          className={`shrink-0 border-t pt-1.5 pb-1 flex items-center justify-around gap-2 ${
            isLightMode ? 'border-[#005587]/15' : 'border-white/10'
          }`}
        >
          <button
            type="button"
            onClick={() => {
              if (onScrollHome) {
                onScrollHome();
              } else {
                const el = document.getElementById('main-hero');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            aria-label="Home"
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
              isLightMode ? 'text-[#0b0f17]/70 hover:text-[#005587] hover:bg-[#005587]/10' : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Home className="w-4.5 h-4.5" />
          </button>

          <button
            type="button"
            onClick={() => setShowSearch((prev) => !prev)}
            aria-label="Toggle Story Search"
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
              showSearch
                ? 'bg-[#00C4CC] text-[#031926]'
                : isLightMode
                  ? 'text-[#0b0f17]/70 hover:text-[#005587] hover:bg-[#005587]/10'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Search className="w-4.5 h-4.5" />
          </button>

          <button
            type="button"
            id="btn-storywall-compose"
            onClick={() => setShowAddModal(true)}
            aria-label="Submit a Story or Activity"
            className={`w-11 h-10 rounded-xl flex items-center justify-center font-bold transition-transform hover:scale-105 cursor-pointer ${
              isLightMode
                ? 'bg-[#005587] text-white'
                : 'bg-[#E5B80B] text-[#0b0f17]'
            }`}
          >
            <Plus className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => handleScopeChange(feedScope === 'group' ? 'all' : 'group')}
            aria-label="Filter Group Stories"
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
              feedScope === 'group'
                ? isLightMode
                  ? 'bg-[#005587]/15 text-[#005587]'
                  : 'bg-white/15 text-white'
                : isLightMode
                  ? 'text-[#0b0f17]/70 hover:text-[#005587] hover:bg-[#005587]/10'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Users className="w-4.5 h-4.5" />
          </button>

          <button
            type="button"
            onClick={() => {
              if (onOpenSignInModal) onOpenSignInModal();
            }}
            aria-label="Youth Ambassador Profile"
            className="w-8 h-8 rounded-full bg-[#005587] border-2 border-[#00C4CC] text-white text-[10px] font-black flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
          >
            P16
          </button>
        </nav>
      </div>

      {/* ===================================================================== */}
      {/* STORY DETAIL READER MODAL                                             */}
      {/* ===================================================================== */}
      {activeStory && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveStory(null)}
        >
          <div
            className={`w-full max-w-lg rounded-3xl p-5 sm:p-6 border shadow-2xl relative ${
              isLightMode
                ? 'bg-white border-[#005587]/20 text-[#0b0f17]'
                : 'bg-[#121620] border-white/15 text-white'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveStory(null)}
              className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer ${
                isLightMode ? 'bg-gray-100 hover:bg-gray-200 text-gray-800' : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
              aria-label="Close story"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-[11px] font-mono font-bold text-[#00C4CC]">
              <span>{activeStory.timeline === 'past' ? 'PAST STORY' : 'FUTURE INITIATIVE'}</span>
              <span aria-hidden="true">·</span>
              <span>{activeStory.category}</span>
            </div>

            <h3 className="text-xl font-extrabold tracking-tight mt-1 pr-8">
              {activeStory.title}
            </h3>
            <p className={`text-xs mt-1 ${isLightMode ? 'text-[#005587]' : 'text-[#E5B80B]'}`}>
              {activeStory.hosts} · {activeStory.location}
            </p>

            <p className={`text-sm leading-relaxed mt-4 ${isLightMode ? 'text-gray-700' : 'text-gray-300'}`}>
              {activeStory.fullStory}
            </p>

            <div className="mt-4 pt-3 border-t border-current/10 flex items-center justify-between gap-3">
              <span className="text-xs font-semibold text-[#00C4CC]">
                {activeStory.sdgTarget}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setLikedIds((prev) => ({
                      ...prev,
                      [activeStory.id]: !prev[activeStory.id],
                    }))
                  }
                  className={`h-9 px-3.5 rounded-full border text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
                    likedIds[activeStory.id]
                      ? 'bg-[#E5B80B] text-[#0b0f17] border-[#E5B80B]'
                      : isLightMode
                        ? 'border-gray-300 hover:bg-gray-100'
                        : 'border-white/20 hover:bg-white/10'
                  }`}
                >
                  <Heart className="w-3.5 h-3.5" />
                  <span>{likedIds[activeStory.id] ? 'Applauded' : 'Applaud'}</span>
                </button>

                {activeStory.timeline === 'future' ? (
                  <button
                    type="button"
                    onClick={() =>
                      setJoinedFutureIds((prev) => ({
                        ...prev,
                        [activeStory.id]: !prev[activeStory.id],
                      }))
                    }
                    className="h-9 px-4 rounded-full bg-[#005587] hover:bg-[#00C4CC] hover:text-black text-white text-xs font-bold cursor-pointer transition-colors"
                  >
                    {joinedFutureIds[activeStory.id] ? 'Joined Initiative' : 'Join Action'}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setActiveStory(null)}
                    className="h-9 px-4 rounded-full bg-[#005587] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Done</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* SUBMIT STORY OR FUTURE INITIATIVE MODAL                               */}
      {/* ===================================================================== */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className={`w-full max-w-md rounded-3xl p-5 sm:p-6 border shadow-2xl relative ${
              isLightMode
                ? 'bg-white border-[#005587]/20 text-[#0b0f17]'
                : 'bg-[#121620] border-white/15 text-white'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer ${
                isLightMode ? 'bg-gray-100 hover:bg-gray-200 text-gray-800' : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
              aria-label="Close submission modal"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-[10px] font-mono font-bold uppercase text-[#00C4CC]">
              Pamoja 16 Story Wall
            </span>
            <h3 className="text-lg font-extrabold tracking-tight mt-0.5">
              Share a Story or Initiative
            </h3>

            <form onSubmit={handleCreateStory} className="mt-4 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setNewTimeline('past')}
                  className={`py-2 rounded-xl text-xs font-bold border cursor-pointer ${
                    newTimeline === 'past'
                      ? 'bg-[#005587] text-white border-[#005587]'
                      : isLightMode
                        ? 'border-gray-200 text-gray-700'
                        : 'border-white/15 text-gray-300'
                  }`}
                >
                  Past Story
                </button>
                <button
                  type="button"
                  onClick={() => setNewTimeline('future')}
                  className={`py-2 rounded-xl text-xs font-bold border cursor-pointer ${
                    newTimeline === 'future'
                      ? 'bg-[#005587] text-white border-[#005587]'
                      : isLightMode
                        ? 'border-gray-200 text-gray-700'
                        : 'border-white/15 text-gray-300'
                  }`}
                >
                  Future Initiative
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setNewScope('individuals');
                    setNewCategory('Artwork & Murals');
                  }}
                  className={`py-2 rounded-xl text-xs font-bold border cursor-pointer ${
                    newScope === 'individuals'
                      ? 'bg-[#00C4CC] text-[#031926] border-[#00C4CC]'
                      : isLightMode
                        ? 'border-gray-200 text-gray-700'
                        : 'border-white/15 text-gray-300'
                  }`}
                >
                  Individual Action
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setNewScope('group');
                    setNewCategory('Peace Walks & Marches');
                  }}
                  className={`py-2 rounded-xl text-xs font-bold border cursor-pointer ${
                    newScope === 'group'
                      ? 'bg-[#00C4CC] text-[#031926] border-[#00C4CC]'
                      : isLightMode
                        ? 'border-gray-200 text-gray-700'
                        : 'border-white/15 text-gray-300'
                  }`}
                >
                  Group Activity
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className={`w-full rounded-xl px-3 py-2 text-xs border outline-none ${
                    isLightMode
                      ? 'bg-gray-50 border-gray-300 text-[#0b0f17]'
                      : 'bg-black/40 border-white/15 text-white'
                  }`}
                >
                  {(newScope === 'individuals'
                    ? INDIVIDUAL_CATEGORIES.slice(1)
                    : GROUP_CATEGORIES.slice(1)
                  ).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g., Kibera Youth Peace Mural or County Debate"
                  className={`w-full rounded-xl px-3 py-2 text-xs border outline-none ${
                    isLightMode
                      ? 'bg-gray-50 border-gray-300 text-[#0b0f17]'
                      : 'bg-black/40 border-white/15 text-white'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">County / Location</label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="e.g., Mombasa, Kisumu, Nairobi"
                  className={`w-full rounded-xl px-3 py-2 text-xs border outline-none ${
                    isLightMode
                      ? 'bg-gray-50 border-gray-300 text-[#0b0f17]'
                      : 'bg-black/40 border-white/15 text-white'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Share how this action builds peace, justice, or accountability..."
                  className={`w-full rounded-xl px-3 py-2 text-xs border outline-none ${
                    isLightMode
                      ? 'bg-gray-50 border-gray-300 text-[#0b0f17]'
                      : 'bg-black/40 border-white/15 text-white'
                  }`}
                />
              </div>

              <button
                type="submit"
                className="w-full h-10 rounded-full bg-[#E5B80B] hover:bg-[#00C4CC] text-[#0b0f17] font-bold text-xs uppercase tracking-wider cursor-pointer transition-colors"
              >
                Publish to Story Wall
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
