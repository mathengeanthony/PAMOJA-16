import React, { useMemo, useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Compass,
  Globe2,
  Handshake,
  Heart,
  Home,
  LayoutGrid,
  MapPin,
  MessageCircle,
  Send,
  Sparkles,
  Users,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface PamojaNetworkSectionProps {
  isLightMode?: boolean;
  onOpenSignInModal?: () => void;
  onScrollHome?: () => void;
}

interface AdvocateProfile {
  id: string;
  name: string;
  initials: string;
  strength: string;
  strengthCategory: string;
  corridor: string;
  bio: string;
  languages: string;
  endorsements: number;
  collaborations: number;
  avatar: string;
  accentColor: string;
  availability: string;
}

const STRENGTH_CATEGORIES = [
  'All Strengths',
  'Conflict Mediation',
  'Legal & Human Rights',
  'Civic Tech & Open Data',
  'Cross-Border Diplomacy',
  'Peace Media & Arts',
  'Grant & Fund Mobilization',
] as const;

const ADVOCATES: AdvocateProfile[] = [
  {
    id: 'adv-1',
    name: 'Wanjiku Kamau',
    initials: 'WK',
    strength: 'Community Mediator',
    strengthCategory: 'Conflict Mediation',
    corridor: 'Kenya ↔ Uganda',
    bio: 'Lead youth peace mediator specializing in pastoralist corridor dialogues, ward-level reconciliation councils, and rapid early-warning resolution.',
    languages: 'English · Swahili · Kikuyu',
    endorsements: 142,
    collaborations: 99,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=700&auto=format&fit=crop',
    accentColor: '#00C4CC',
    availability: 'Available for regional booking',
  },
  {
    id: 'adv-2',
    name: 'Hassan Abdullahi',
    initials: 'HA',
    strength: 'Cross-Border Envoy',
    strengthCategory: 'Cross-Border Diplomacy',
    corridor: 'Kenya ↔ Somalia ↔ Ethiopia',
    bio: 'Coordinates youth peace summits across northern frontier towns, linking county peace committees with Horn of Africa civil society networks.',
    languages: 'Somali · Swahili · English',
    endorsements: 88,
    collaborations: 64,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=700&auto=format&fit=crop',
    accentColor: '#E5B80B',
    availability: 'Open for advisory & co-hosting',
  },
  {
    id: 'adv-3',
    name: 'Dr. Amina Ochieng',
    initials: 'AO',
    strength: 'Constitutional Counsel',
    strengthCategory: 'Legal & Human Rights',
    corridor: 'Kenya ↔ Tanzania',
    bio: 'Human rights advocate supporting grassroots groups with Article 35 petitions, free paralegal clinics, and cross-border civic protection frameworks.',
    languages: 'Swahili · Luo · English',
    endorsements: 196,
    collaborations: 128,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=700&auto=format&fit=crop',
    accentColor: '#00C4CC',
    availability: 'Next legal clinic: Thursday',
  },
  {
    id: 'adv-4',
    name: 'Samuel Kiptoo',
    initials: 'SK',
    strength: 'Open-Data Technologist',
    strengthCategory: 'Civic Tech & Open Data',
    corridor: 'Rift Valley ↔ EAC',
    bio: 'Builds low-bandwidth WebRTC townhall tools, county budget social-audit dashboards, and encrypted reporting channels for civic monitors.',
    languages: 'Kalenjin · Swahili · English',
    endorsements: 74,
    collaborations: 52,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=700&auto=format&fit=crop',
    accentColor: '#E5B80B',
    availability: 'Available for tech sprints',
  },
  {
    id: 'adv-5',
    name: 'Grace Mwikali',
    initials: 'GM',
    strength: 'Peace Filmmaker & Artist',
    strengthCategory: 'Peace Media & Arts',
    corridor: 'Mombasa ↔ Zanzibar',
    bio: 'Produces coastal peace documentaries, community murals, and multilingual spoken-word campaigns elevating youth stories across borders.',
    languages: 'Swahili · Kamba · English',
    endorsements: 115,
    collaborations: 81,
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=700&auto=format&fit=crop',
    accentColor: '#00C4CC',
    availability: 'Booking media collaborations',
  },
  {
    id: 'adv-6',
    name: 'David Ssempijja',
    initials: 'DS',
    strength: 'Grants & Coalition Strategist',
    strengthCategory: 'Grant & Fund Mobilization',
    corridor: 'Kampala ↔ Nairobi ↔ Kigali',
    bio: 'Helps grassroots peace collectives structure donor proposals, M-Pesa Daraja community drives, and trans-boundary partnership MOUs.',
    languages: 'Luganda · English · Swahili',
    endorsements: 93,
    collaborations: 77,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=700&auto=format&fit=crop',
    accentColor: '#E5B80B',
    availability: 'Available for grant reviews',
  },
];

export const PamojaNetworkSection: React.FC<PamojaNetworkSectionProps> = ({
  isLightMode = false,
  onOpenSignInModal,
  onScrollHome,
}) => {
  const [selectedStrength, setSelectedStrength] = useState<string>('All Strengths');
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [endorsedIds, setEndorsedIds] = useState<Record<string, boolean>>({});
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  // Modals
  const [showDirectoryModal, setShowDirectoryModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingMode, setBookingMode] = useState<'collaborate' | 'help'>('collaborate');
  const [bookedList, setBookedList] = useState<
    { id: string; advocate: string; mode: string; corridor: string; topic: string }[]
  >([]);
  const [showRequestsModal, setShowRequestsModal] = useState(false);

  // Booking / Reach-out form state
  const [targetAdvocateId, setTargetAdvocateId] = useState<string>(ADVOCATES[0].id);
  const [corridor, setCorridor] = useState('Kenya ↔ Uganda (Cross-Border)');
  const [topic, setTopic] = useState('');
  const [sessionDate, setSessionDate] = useState('Next Week · Virtual WebRTC');
  const [bookingToast, setBookingToast] = useState<string | null>(null);

  const filteredAdvocates = useMemo(() => {
    if (selectedStrength === 'All Strengths') return ADVOCATES;
    return ADVOCATES.filter((a) => a.strengthCategory === selectedStrength);
  }, [selectedStrength]);

  const safeIndex = activeIndex % Math.max(1, filteredAdvocates.length);
  const currentAdvocate = filteredAdvocates[safeIndex] || ADVOCATES[0];

  const getRelativeAdvocate = (offset: number) => {
    const len = filteredAdvocates.length;
    if (len === 0) return ADVOCATES[0];
    const idx = ((safeIndex + offset) % len + len) % len;
    return filteredAdvocates[idx];
  };

  const leftInner = getRelativeAdvocate(-1);
  const leftOuter = getRelativeAdvocate(-2);
  const rightInner = getRelativeAdvocate(1);
  const rightOuter = getRelativeAdvocate(2);

  const handleOpenBooking = (mode: 'collaborate' | 'help', advId?: string) => {
    setBookingMode(mode);
    setTargetAdvocateId(advId || currentAdvocate.id);
    setShowBookingModal(true);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const chosen = ADVOCATES.find((a) => a.id === targetAdvocateId) || currentAdvocate;
    const entry = {
      id: `req-${Date.now()}`,
      advocate: chosen.name,
      mode: bookingMode === 'help' ? 'Help Request' : 'Peace Collaboration',
      corridor,
      topic: topic.trim() || `${chosen.strength} support & cross-border coordination`,
    };
    setBookedList((prev) => [entry, ...prev]);
    setShowBookingModal(false);
    setTopic('');
    setBookingToast(
      `${entry.mode} sent to ${chosen.name} (${corridor}).`
    );
    setTimeout(() => setBookingToast(null), 4500);
  };

  const renderAvatar = (adv: AdvocateProfile, sizeClass: string, textClass: string) => {
    if (failedImages[adv.id]) {
      return (
        <div
          className={`${sizeClass} rounded-full bg-gradient-to-br from-[#005587] to-[#00C4CC] flex items-center justify-center font-black text-white ${textClass}`}
        >
          {adv.initials}
        </div>
      );
    }
    return (
      <img
        src={adv.avatar}
        alt={adv.name}
        referrerPolicy="no-referrer"
        onError={() => setFailedImages((prev) => ({ ...prev, [adv.id]: true }))}
        className={`${sizeClass} rounded-full object-cover object-top`}
      />
    );
  };

  const endCount = currentAdvocate.endorsements + (endorsedIds[currentAdvocate.id] ? 1 : 0);

  return (
    <section
      id="section-network"
      className={`snap-section min-h-[100dvh] h-[100dvh] max-h-[100dvh] w-full flex flex-col justify-between overflow-hidden relative select-none border-b transition-colors duration-500 ${
        isLightMode
          ? 'bg-gradient-to-br from-[#005587] via-[#006ea8] to-[#003a61] text-white border-white/15'
          : 'bg-gradient-to-br from-[#003b63] via-[#005587] to-[#041222] text-white border-white/10'
      }`}
    >
      {/* Atmospheric top-right cyan/gold glow matching the screenshot's luminous radial sheen */}
      <div
        className="absolute -top-24 -right-16 w-[380px] h-[380px] rounded-full blur-3xl pointer-events-none opacity-65"
        style={{
          background:
            'radial-gradient(circle, rgba(0, 196, 204, 0.55) 0%, rgba(0, 85, 135, 0.15) 60%, transparent 100%)',
        }}
      />
      <div
        className="absolute -bottom-24 -left-16 w-[320px] h-[320px] rounded-full blur-3xl pointer-events-none opacity-35"
        style={{
          background:
            'radial-gradient(circle, rgba(229, 184, 11, 0.45) 0%, transparent 70%)',
        }}
      />

      {/* MAIN CONTAINER */}
      <div className="w-full max-w-[460px] md:max-w-[820px] lg:max-w-[1180px] mx-auto h-full flex flex-col justify-between px-4 sm:px-8 lg:px-12 pt-3 sm:pt-5 pb-2 relative z-10 min-h-0">
        
        {/* ===================================================================== */}
        {/* 1. TOP BAR: AVATAR + GREETING | MESSAGE & DIRECTORY ICON BUTTONS      */}
        {/* ===================================================================== */}
        <header className="flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              if (onOpenSignInModal) onOpenSignInModal();
            }}
            className="flex items-center gap-2.5 cursor-pointer group min-w-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-[#00C4CC] overflow-hidden bg-[#003355] shrink-0 shadow-md">
              <img
                src="https://i.pravatar.cc/150?img=12"
                alt="Your peacebuilder profile"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left min-w-0">
              <span className="text-xs sm:text-sm text-cyan-100/80">Hey </span>
              <span className="text-xs sm:text-sm font-bold text-white group-hover:text-[#E5B80B] transition-colors">
                Peacebuilder!
              </span>
            </div>
          </button>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              id="btn-network-requests"
              onClick={() => setShowRequestsModal(true)}
              aria-label="Open Help & Collaboration Requests"
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
              title="Messages & Peace Requests"
            >
              <MessageCircle className="w-4 h-4" />
              {bookedList.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#E5B80B] text-[#0b0f17] text-[9px] font-black flex items-center justify-center">
                  {bookedList.length}
                </span>
              )}
            </button>

            <button
              type="button"
              id="btn-network-directory"
              onClick={() => setShowDirectoryModal(true)}
              aria-label="Browse Advocates by Strength"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
              title="Browse Strength Directory"
            >
              <Calendar className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* ===================================================================== */}
        {/* 2. 4-LINE TWO-TONE HEADLINE + SUB-ROW                                 */}
        {/* ===================================================================== */}
        <div className="shrink-0 mt-1 sm:mt-2">
          <h2 className="text-[1.85rem] xs:text-[2.1rem] sm:text-[2.7rem] lg:text-[3.2rem] font-normal tracking-tight leading-[1.03] text-balance">
            <span className="block text-cyan-100/75">Find Peace</span>
            <span className="block text-cyan-100/75">Advocates</span>
            <span className="block font-medium text-white">With Diverse</span>
            <span className="block font-medium text-white">Strengths</span>
          </h2>

          <div className="mt-2 sm:mt-3 flex items-start justify-between gap-4">
            <button
              type="button"
              onClick={() => setShowDirectoryModal(true)}
              className="text-xs sm:text-sm text-cyan-100/75 hover:text-[#E5B80B] transition-colors cursor-pointer text-left font-medium"
            >
              Filter Strengths
            </button>

            <div className="text-left text-xs sm:text-sm font-semibold leading-snug text-white">
              <span className="block">Book Peace Efforts</span>
              <span className="block text-[#E5B80B]">Beyond Borders!</span>
            </div>
          </div>
        </div>

        {/* Toast confirmation after booking/reaching out */}
        {bookingToast && (
          <div
            role="status"
            className="shrink-0 mx-auto px-3.5 py-1.5 rounded-full bg-[#E5B80B] text-[#0b0f17] text-xs font-bold flex items-center gap-2 shadow-lg"
          >
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{bookingToast}</span>
          </div>
        )}

        {/* ===================================================================== */}
        {/* 3. CENTER CIRCULAR ADVOCATE CAROUSEL + METADATA & ENDORSE/COLLAB PILLS */}
        {/* ===================================================================== */}
        <div className="flex-1 min-h-0 flex flex-col items-center justify-center relative my-1">
          
          {/* Carousel Strip */}
          <div className="relative w-full flex items-center justify-center py-1">
            {/* Far Left Peek */}
            {filteredAdvocates.length > 3 && (
              <button
                type="button"
                onClick={() =>
                  setActiveIndex(
                    (safeIndex - 2 + filteredAdvocates.length) % filteredAdvocates.length
                  )
                }
                aria-label={`Select ${leftOuter.name}`}
                className="hidden xs:flex w-14 h-14 sm:w-20 sm:h-20 rounded-full overflow-hidden opacity-45 hover:opacity-85 transition-all duration-300 cursor-pointer -mr-3 sm:-mr-2 shrink-0 border border-white/20"
              >
                {renderAvatar(leftOuter, 'w-full h-full', 'text-xs')}
              </button>
            )}

            {/* Inner Left Flanking Circle */}
            {filteredAdvocates.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  setActiveIndex(
                    (safeIndex - 1 + filteredAdvocates.length) % filteredAdvocates.length
                  )
                }
                aria-label={`Select ${leftInner.name}`}
                className="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden opacity-75 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-pointer -mr-3 sm:-mr-4 z-10 shrink-0 border-2 border-white/25 shadow-lg"
              >
                {renderAvatar(leftInner, 'w-full h-full', 'text-sm')}
              </button>
            )}

            {/* CENTER SPOTLIGHT ADVOCATE WITH CURVED PERIMETER ARC */}
            <div className="relative z-20 shrink-0">
              <button
                type="button"
                id="btn-network-center-advocate"
                onClick={() => handleOpenBooking('collaborate', currentAdvocate.id)}
                className="group relative w-40 h-40 xs:w-44 xs:h-44 sm:w-52 sm:h-52 lg:w-60 lg:h-60 rounded-full p-1.5 flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-[1.02] shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
                title={`Reach out or book ${currentAdvocate.name}`}
              >
                {/* Signature Partial White/Cyan Arc matching screenshot */}
                <svg
                  viewBox="0 0 100 100"
                  className="absolute inset-0 w-full h-full pointer-events-none -rotate-45"
                  aria-hidden="true"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="48.5"
                    fill="none"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="1"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="48.5"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="1.6"
                    strokeDasharray="115 200"
                    strokeLinecap="round"
                  />
                </svg>

                <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/20 bg-[#051b2e]">
                  {renderAvatar(currentAdvocate, 'w-full h-full', 'text-2xl')}
                </div>

                {/* Subtle Corridor Pill */}
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#E5B80B] text-[#0b0f17] text-[9.5px] sm:text-[10px] font-extrabold whitespace-nowrap shadow-md">
                  {currentAdvocate.corridor}
                </span>
              </button>
            </div>

            {/* Inner Right Flanking Circle */}
            {filteredAdvocates.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  setActiveIndex((safeIndex + 1) % filteredAdvocates.length)
                }
                aria-label={`Select ${rightInner.name}`}
                className="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden opacity-75 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-pointer -ml-3 sm:-ml-4 z-10 shrink-0 border-2 border-white/25 shadow-lg"
              >
                {renderAvatar(rightInner, 'w-full h-full', 'text-sm')}
              </button>
            )}

            {/* Far Right Peek */}
            {filteredAdvocates.length > 3 && (
              <button
                type="button"
                onClick={() =>
                  setActiveIndex((safeIndex + 2) % filteredAdvocates.length)
                }
                aria-label={`Select ${rightOuter.name}`}
                className="hidden xs:flex w-14 h-14 sm:w-20 sm:h-20 rounded-full overflow-hidden opacity-45 hover:opacity-85 transition-all duration-300 cursor-pointer -ml-3 sm:-ml-2 shrink-0 border border-white/20"
              >
                {renderAvatar(rightOuter, 'w-full h-full', 'text-xs')}
              </button>
            )}
          </div>

          {/* Advocate Metadata Row: Endorse Pill (Left) | Strength & Name (Center) | Collaborators Pill (Right) */}
          <div className="w-full max-w-[440px] sm:max-w-[540px] flex items-center justify-between gap-2 mt-2.5 sm:mt-3">
            <button
              type="button"
              onClick={() =>
                setEndorsedIds((prev) => ({
                  ...prev,
                  [currentAdvocate.id]: !prev[currentAdvocate.id],
                }))
              }
              aria-label={`Endorse ${currentAdvocate.name}`}
              className={`h-9 sm:h-10 px-3 sm:px-4 rounded-xl backdrop-blur-md border flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer shrink-0 tabular-nums ${
                endorsedIds[currentAdvocate.id]
                  ? 'bg-[#E5B80B] text-[#0b0f17] border-[#E5B80B]'
                  : 'bg-white/15 hover:bg-white/25 text-white border-white/15'
              }`}
            >
              <Heart
                className={`w-3.5 h-3.5 ${
                  endorsedIds[currentAdvocate.id] ? 'fill-current' : ''
                }`}
              />
              <span>{endCount}</span>
            </button>

            <button
              type="button"
              onClick={() => handleOpenBooking('collaborate', currentAdvocate.id)}
              className="text-center min-w-0 cursor-pointer group"
            >
              <span className="block text-[11px] sm:text-xs text-cyan-100/80 truncate">
                {currentAdvocate.strength}
              </span>
              <span className="block text-sm sm:text-base font-bold text-white group-hover:text-[#E5B80B] transition-colors truncate">
                {currentAdvocate.name}
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleOpenBooking('help', currentAdvocate.id)}
              aria-label={`Ask ${currentAdvocate.name} for help or collaborate`}
              className="h-9 sm:h-10 px-3 sm:px-4 rounded-xl bg-white/15 hover:bg-[#00C4CC] hover:text-[#041520] backdrop-blur-md border border-white/15 flex items-center gap-1.5 text-xs font-bold text-white transition-all cursor-pointer shrink-0 tabular-nums"
              title="Collaborate / Ask for Help"
            >
              <Users className="w-3.5 h-3.5" />
              <span>{currentAdvocate.collaborations}</span>
            </button>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* 4. BOTTOM PREVIEW CARDS + FLOATING WHITE PILL DOCK                    */}
        {/* ===================================================================== */}
        <div className="relative shrink-0 pt-1">
          
          {/* Bottom Two Cards (Ask for Help & Book Cross-Border Peace Effort) */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-4 pb-6 sm:pb-7">
            <button
              type="button"
              id="btn-network-collaborate-card"
              onClick={() => handleOpenBooking('collaborate', currentAdvocate.id)}
              className="group rounded-2xl bg-white/95 hover:bg-white text-[#0b0f17] p-3 sm:p-4 text-left shadow-xl transition-all duration-200 cursor-pointer flex items-center justify-between gap-2 min-h-[68px] sm:min-h-[82px]"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#005587] text-white text-[9px] font-black flex items-center justify-center shrink-0">
                    {currentAdvocate.initials}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#005587] truncate">
                    Collaborate
                  </span>
                </div>
                <span className="block text-xs sm:text-sm font-extrabold mt-1 truncate">
                  Book Peace Effort
                </span>
                <span className="hidden sm:block text-[11px] text-gray-500 truncate">
                  {currentAdvocate.corridor} · {currentAdvocate.availability}
                </span>
              </div>
              <Handshake className="w-5 h-5 text-[#005587] shrink-0 group-hover:scale-110 transition-transform" />
            </button>

            <button
              type="button"
              id="btn-network-help-card"
              onClick={() => handleOpenBooking('help', currentAdvocate.id)}
              className="group rounded-2xl bg-[#d7f5f7] hover:bg-[#c5f0f3] text-[#041824] p-3 sm:p-4 text-left shadow-xl transition-all duration-200 cursor-pointer flex items-center justify-between gap-2 min-h-[68px] sm:min-h-[82px]"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <Globe2 className="w-3.5 h-3.5 text-[#005587] shrink-0" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#005587] truncate">
                    Beyond Borders
                  </span>
                </div>
                <span className="block text-xs sm:text-sm font-extrabold mt-1 truncate">
                  Ask for Help
                </span>
                <span className="hidden sm:block text-[11px] text-[#00446e]/80 truncate">
                  Legal, mediation, tech &amp; funding allies
                </span>
              </div>
              <Compass className="w-5 h-5 text-[#005587] shrink-0 group-hover:rotate-12 transition-transform" />
            </button>
          </div>

          {/* Floating White Pill Navigation Dock (Matches Screenshot Bottom Pill) */}
          <div className="flex justify-center -mt-10 sm:-mt-11 relative z-30 pb-1">
            <nav
              aria-label="Peace Networking Dock"
              className="inline-flex items-center gap-3 sm:gap-5 px-4 sm:px-6 py-2 rounded-full bg-white text-[#0b0f17] shadow-[0_14px_34px_rgba(0,0,0,0.35)] border border-white/60"
            >
              <button
                type="button"
                onClick={() => {
                  if (onScrollHome) {
                    onScrollHome();
                  } else {
                    setActiveIndex(0);
                  }
                }}
                aria-label="Home"
                className="w-9 h-9 rounded-full flex items-center justify-center text-[#0b0f17] hover:bg-[#005587]/10 transition-colors cursor-pointer"
                title="Back to Hero"
              >
                <Home className="w-4.5 h-4.5 fill-current" />
              </button>

              <button
                type="button"
                onClick={() => setShowDirectoryModal(true)}
                aria-label="Strength Directory"
                className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:text-[#005587] hover:bg-[#005587]/10 transition-colors cursor-pointer"
                title="Filter by Advocate Strength"
              >
                <LayoutGrid className="w-4.5 h-4.5" />
              </button>

              <button
                type="button"
                onClick={() => handleOpenBooking('help', currentAdvocate.id)}
                aria-label="Book Cross-Border Collaboration"
                className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:text-[#005587] hover:bg-[#005587]/10 transition-colors cursor-pointer"
                title="Ask for Help / Book Peace Effort"
              >
                <Globe2 className="w-4.5 h-4.5" />
              </button>

              <button
                type="button"
                onClick={() => {
                  if (onOpenSignInModal) onOpenSignInModal();
                }}
                aria-label="Advocate Account"
                className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#005587] cursor-pointer hover:scale-105 transition-transform"
                title="Your Peacebuilder Profile"
              >
                <img
                  src="https://i.pravatar.cc/150?img=12"
                  alt="Profile"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* MODAL 1: ADVOCATE STRENGTHS & BORDERLESS DIRECTORY                    */}
      {/* ===================================================================== */}
      {showDirectoryModal && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-5"
          onClick={() => setShowDirectoryModal(false)}
        >
          <div
            className="w-full max-w-2xl rounded-3xl p-5 sm:p-6 border border-white/15 bg-[#091829] text-white shadow-2xl max-h-[86vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-white/10 shrink-0">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#00C4CC]">
                  Peacebuilders Beyond Borders
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold tracking-tight mt-0.5">
                  Advocate Strengths Directory
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowDirectoryModal(false)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer"
                aria-label="Close directory"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Strength Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto hide-scroll py-3 shrink-0">
              {STRENGTH_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setSelectedStrength(cat);
                    setActiveIndex(0);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                    selectedStrength === cat
                      ? 'bg-[#E5B80B] text-[#0b0f17]'
                      : 'bg-white/10 text-gray-200 hover:bg-white/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Advocates List */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-2.5 min-h-0">
              {filteredAdvocates.map((adv, idx) => (
                <div
                  key={adv.id}
                  className="p-3.5 rounded-2xl bg-white/[0.05] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-[#00C4CC]/50 shrink-0">
                      {renderAvatar(adv, 'w-full h-full', 'text-xs')}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-extrabold">{adv.name}</span>
                        <span className="text-[10px] font-bold text-[#E5B80B]">
                          {adv.corridor}
                        </span>
                      </div>
                      <span className="block text-xs font-semibold text-[#00C4CC]">
                        {adv.strength} · {adv.languages}
                      </span>
                      <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                        {adv.bio}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveIndex(idx);
                        setShowDirectoryModal(false);
                      }}
                      className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold cursor-pointer whitespace-nowrap"
                    >
                      Spotlight
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowDirectoryModal(false);
                        handleOpenBooking('collaborate', adv.id);
                      }}
                      className="px-3.5 py-1.5 rounded-full bg-[#00C4CC] hover:bg-[#E5B80B] text-[#041520] text-xs font-extrabold cursor-pointer whitespace-nowrap transition-colors"
                    >
                      Reach Out
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 2: REACH OUT / ASK FOR HELP / BOOK PEACE EFFORT BEYOND BORDERS  */}
      {/* ===================================================================== */}
      {showBookingModal && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setShowBookingModal(false)}
        >
          <div
            className="w-full max-w-md rounded-3xl p-5 sm:p-6 border border-white/15 bg-[#091829] text-white shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowBookingModal(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer"
              aria-label="Close booking form"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#00C4CC]">
              Borderless SDG 16 Action
            </span>
            <h3 className="text-lg font-extrabold tracking-tight mt-0.5">
              {bookingMode === 'help'
                ? 'Ask for Help & Support'
                : 'Book Peace Collaboration'}
            </h3>

            {/* Mode Switch */}
            <div className="grid grid-cols-2 gap-2 mt-3">
              <button
                type="button"
                onClick={() => setBookingMode('collaborate')}
                className={`py-2 rounded-xl text-xs font-bold border cursor-pointer ${
                  bookingMode === 'collaborate'
                    ? 'bg-[#00C4CC] text-[#041520] border-[#00C4CC]'
                    : 'border-white/15 text-gray-300'
                }`}
              >
                Book Peace Effort
              </button>
              <button
                type="button"
                onClick={() => setBookingMode('help')}
                className={`py-2 rounded-xl text-xs font-bold border cursor-pointer ${
                  bookingMode === 'help'
                    ? 'bg-[#E5B80B] text-[#0b0f17] border-[#E5B80B]'
                    : 'border-white/15 text-gray-300'
                }`}
              >
                Ask for Help
              </button>
            </div>

            <form onSubmit={handleBookingSubmit} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Connect With Advocate
                </label>
                <select
                  value={targetAdvocateId}
                  onChange={(e) => setTargetAdvocateId(e.target.value)}
                  className="w-full rounded-xl px-3 py-2 text-xs bg-black/40 border border-white/15 text-white outline-none focus:border-[#00C4CC]"
                >
                  {ADVOCATES.map((adv) => (
                    <option key={adv.id} value={adv.id}>
                      {adv.name} — {adv.strength} ({adv.corridor})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Regional Corridor / Border Scope
                </label>
                <select
                  value={corridor}
                  onChange={(e) => setCorridor(e.target.value)}
                  className="w-full rounded-xl px-3 py-2 text-xs bg-black/40 border border-white/15 text-white outline-none focus:border-[#00C4CC]"
                >
                  <option>Kenya ↔ Uganda (Cross-Border)</option>
                  <option>Kenya ↔ Tanzania (Coastal & Rift)</option>
                  <option>Kenya ↔ Ethiopia ↔ Somalia (Horn Corridor)</option>
                  <option>Kenya ↔ South Sudan (Turkana Basin)</option>
                  <option>All 47 Counties · National</option>
                  <option>Global UN / Diaspora Collaboration</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Preferred Schedule / Format
                </label>
                <input
                  type="text"
                  value={sessionDate}
                  onChange={(e) => setSessionDate(e.target.value)}
                  className="w-full rounded-xl px-3 py-2 text-xs bg-black/40 border border-white/15 text-white outline-none focus:border-[#00C4CC]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  How Can We Collaborate or Help?
                </label>
                <textarea
                  rows={3}
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Describe your peace initiative, legal aid need, mediation summit, or creative campaign..."
                  className="w-full rounded-xl px-3 py-2 text-xs bg-black/40 border border-white/15 text-white outline-none focus:border-[#00C4CC]"
                />
              </div>

              <button
                type="submit"
                className="w-full h-10 rounded-full bg-[#E5B80B] hover:bg-[#00C4CC] text-[#0b0f17] font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>
                  {bookingMode === 'help' ? 'Send Help Request' : 'Confirm Peace Booking'}
                </span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 3: ACTIVE REQUESTS & SENT COLLABORATIONS                        */}
      {/* ===================================================================== */}
      {showRequestsModal && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setShowRequestsModal(false)}
        >
          <div
            className="w-full max-w-md rounded-3xl p-5 sm:p-6 border border-white/15 bg-[#091829] text-white shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowRequestsModal(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer"
              aria-label="Close requests"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-[10px] font-mono font-bold uppercase text-[#00C4CC]">
              Pamoja 16 Outreach
            </span>
            <h3 className="text-lg font-extrabold mt-0.5">
              Your Cross-Border Requests
            </h3>

            <div className="mt-4 space-y-2.5 max-h-64 overflow-y-auto">
              {bookedList.length === 0 ? (
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-xs text-gray-300 text-center">
                  No requests sent yet. Tap any advocate portrait or &ldquo;Book Peace Effort&rdquo; to reach out across borders.
                </div>
              ) : (
                bookedList.map((req) => (
                  <div
                    key={req.id}
                    className="p-3 rounded-2xl bg-white/[0.05] border border-white/10 text-xs"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-white">{req.advocate}</span>
                      <span className="text-[10px] font-bold text-[#E5B80B]">
                        {req.mode}
                      </span>
                    </div>
                    <span className="block text-[11px] text-[#00C4CC] mt-0.5">
                      {req.corridor}
                    </span>
                    <p className="text-gray-300 mt-1">{req.topic}</p>
                  </div>
                ))
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                setShowRequestsModal(false);
                handleOpenBooking('help', currentAdvocate.id);
              }}
              className="mt-4 w-full h-10 rounded-full bg-[#00C4CC] hover:bg-[#E5B80B] text-[#041520] font-extrabold text-xs uppercase tracking-wider cursor-pointer transition-colors"
            >
              Start New Outreach
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
