export type EastAfricaCountryCode = 'KE' | 'SS' | 'TZ' | 'RW' | 'UG' | 'SO';

export type ProgramTrack = 'peace-mediation' | 'civic-audit' | 'youth-grants';
export type GrantTier = 'high' | 'mid' | 'seed';

export interface EastAfricaChapter {
  code: EastAfricaCountryCode;
  name: string;
  selectorName?: string;
  flag: string;
  capital: string;
  cityName: string;
  coords: string;
  tickerCoords: string;
  tickerSubtitle: string;
  hqSubtitle: string;
  description: string;
  currency: 'KES' | 'SSP' | 'TZS' | 'RWF' | 'UGX' | 'USD';
  jurisdictionLabel: string;
  capitalLatLng: [number, number];
  overviewLatLng: [number, number];
  overviewZoom: number;
}

export interface CivicMapNode {
  id: string;
  countryCode: EastAfricaCountryCode;
  countryName: string;
  loc: string;
  lat: number;
  lng: number;
  size: 'sm' | 'md' | 'lg';
  growth: string;
  growthValue: number;
  price: string;
  grantTier: GrantTier;
  programTrack: ProgramTrack;
  sdgTarget: string;
  youthCount: number;
  activeProjects: number;
}

export const REGIONAL_OVERVIEW_VIEW = {
  center: [0.85, 36.8] as [number, number],
  zoom: 5,
  tickerCoords: '00.85°N 36.80°E — EAST AFRICA',
  tickerSubtitle: 'PAMOJA16 • 6-CHAPTER REGIONAL CORRIDOR',
  jurisdictionLabel: '6 Nations',
  description:
    'Unified live telemetry across Kenya, South Sudan, Tanzania, Rwanda, Uganda, and Somalia — tracking youth civic action region-wide.',
};

export const PROGRAM_TRACK_META: Record<
  ProgramTrack,
  { label: string; shortLabel: string; color: string }
> = {
  'peace-mediation': {
    label: 'Peace & Mediation',
    shortLabel: 'Peace',
    color: '#10B981',
  },
  'civic-audit': {
    label: 'Civic Audits & Justice',
    shortLabel: 'Audits',
    color: '#00C4CC',
  },
  'youth-grants': {
    label: 'Youth Grants & Labs',
    shortLabel: 'Grants',
    color: '#E5B80B',
  },
};

export const GRANT_TIER_META: Record<GrantTier, { label: string; color: string }> = {
  high: { label: 'Flagship Pool', color: '#E5B80B' },
  mid: { label: 'Regional Pool', color: '#00C4CC' },
  seed: { label: 'Seed Grant', color: '#818CF8' },
};

export const EAST_AFRICA_CHAPTERS: EastAfricaChapter[] = [
  {
    code: 'KE',
    name: 'Kenya',
    flag: '🇰🇪',
    capital: 'Nairobi HQ',
    cityName: 'NAIROBI',
    coords: '1.29° S · 36.82° E',
    tickerCoords: '01.29°S 36.82°E — NAIROBI',
    tickerSubtitle: 'PAMOJA16 • SECRETARIAT • HEADQUARTERS',
    hqSubtitle: 'National Grassroots Command',
    jurisdictionLabel: '47 Counties',
    description:
      "Real-time tracking of youth-led peacebuilding, civic resource allocation, and SDG 16 implementation across Kenya's 47 counties.",
    currency: 'KES',
    capitalLatLng: [-1.2921, 36.8219],
    overviewLatLng: [0.3, 37.6],
    overviewZoom: 6,
  },
  {
    code: 'SS',
    name: 'South Sudan',
    selectorName: 'S. Sudan',
    flag: '🇸🇸',
    capital: 'Juba Hub',
    cityName: 'JUBA',
    coords: '4.86° N · 31.57° E',
    tickerCoords: '04.86°N 31.57°E — JUBA',
    tickerSubtitle: 'PAMOJA16 • SOUTH SUDAN CHAPTER • JUBA HUB',
    hqSubtitle: 'Upper Nile & Equatoria Command',
    jurisdictionLabel: '10 States',
    description:
      "Real-time tracking of youth dialogue corridors, community mediation, and SDG 16 accountability across South Sudan's 10 states.",
    currency: 'SSP',
    capitalLatLng: [4.8594, 31.5713],
    overviewLatLng: [6.85, 30.2],
    overviewZoom: 6,
  },
  {
    code: 'TZ',
    name: 'Tanzania',
    flag: '🇹🇿',
    capital: 'Dodoma Hub',
    cityName: 'DODOMA',
    coords: '6.16° S · 35.75° E',
    tickerCoords: '06.16°S 35.75°E — DODOMA',
    tickerSubtitle: 'PAMOJA16 • TANZANIA CHAPTER • DODOMA HUB',
    hqSubtitle: 'Central & Coastal Civic Hub',
    jurisdictionLabel: '31 Regions',
    description:
      "Real-time tracking of ward-level civic audits, youth enterprise grants, and SDG 16 governance across Tanzania's 31 regions.",
    currency: 'TZS',
    capitalLatLng: [-6.163, 35.7516],
    overviewLatLng: [-6.1, 35.3],
    overviewZoom: 6,
  },
  {
    code: 'RW',
    name: 'Rwanda',
    flag: '🇷🇼',
    capital: 'Kigali Hub',
    cityName: 'KIGALI',
    coords: '1.94° S · 30.06° E',
    tickerCoords: '01.94°S 30.06°E — KIGALI',
    tickerSubtitle: 'PAMOJA16 • RWANDA CHAPTER • KIGALI HUB',
    hqSubtitle: 'Great Lakes Youth Innovation Hub',
    jurisdictionLabel: '30 Districts',
    description:
      "Real-time tracking of youth innovation councils, civic justice clinics, and SDG 16 participation across Rwanda's 30 districts.",
    currency: 'RWF',
    capitalLatLng: [-1.9441, 30.0619],
    overviewLatLng: [-1.95, 29.88],
    overviewZoom: 8,
  },
  {
    code: 'UG',
    name: 'Uganda',
    flag: '🇺🇬',
    capital: 'Kampala Hub',
    cityName: 'KAMPALA',
    coords: '0.35° N · 32.58° E',
    tickerCoords: '00.35°N 32.58°E — KAMPALA',
    tickerSubtitle: 'PAMOJA16 • UGANDA CHAPTER • KAMPALA HUB',
    hqSubtitle: 'Lake Victoria & Northern Peace Hub',
    jurisdictionLabel: '146 Districts',
    description:
      "Real-time tracking of youth peace assemblies, budget transparency, and SDG 16 advocacy across Uganda's districts.",
    currency: 'UGX',
    capitalLatLng: [0.3476, 32.5825],
    overviewLatLng: [1.37, 32.35],
    overviewZoom: 7,
  },
  {
    code: 'SO',
    name: 'Somalia',
    flag: '🇸🇴',
    capital: 'Mogadishu Hub',
    cityName: 'MOGADISHU',
    coords: '2.05° N · 45.32° E',
    tickerCoords: '02.05°N 45.32°E — MOGADISHU',
    tickerSubtitle: 'PAMOJA16 • SOMALIA CHAPTER • MOGADISHU HUB',
    hqSubtitle: 'Horn of Africa Reconciliation Hub',
    jurisdictionLabel: '18 Regions',
    description:
      "Real-time tracking of grassroots reconciliation hubs, civic resilience grants, and SDG 16 dialogue across Somalia's 18 regions.",
    currency: 'USD',
    capitalLatLng: [2.0469, 45.3182],
    overviewLatLng: [4.85, 45.8],
    overviewZoom: 6,
  },
];

export const CIVIC_MAP_NODES: CivicMapNode[] = [
  // Kenya (20 nodes)
  { id: 'ke-kilimani', countryCode: 'KE', countryName: 'Kenya', loc: 'Nairobi-Kilimani', lat: -1.2902, lng: 36.7904, size: 'md', growth: '2.1%', growthValue: 2.1, price: 'KES 14.5M', grantTier: 'mid', programTrack: 'civic-audit', sdgTarget: 'SDG 16.6', youthCount: 6400, activeProjects: 11 },
  { id: 'ke-westlands', countryCode: 'KE', countryName: 'Kenya', loc: 'Nairobi-Westlands', lat: -1.2684, lng: 36.8044, size: 'md', growth: '5.4%', growthValue: 5.4, price: 'KES 18.0M', grantTier: 'mid', programTrack: 'youth-grants', sdgTarget: 'SDG 16.7', youthCount: 7200, activeProjects: 14 },
  { id: 'ke-kibera', countryCode: 'KE', countryName: 'Kenya', loc: 'Nairobi-Kibera Hub', lat: -1.3127, lng: 36.7885, size: 'lg', growth: '4.2%', growthValue: 4.2, price: 'KES 85.0M', grantTier: 'high', programTrack: 'peace-mediation', sdgTarget: 'SDG 16.1', youthCount: 18400, activeProjects: 24 },
  { id: 'ke-nyali', countryCode: 'KE', countryName: 'Kenya', loc: 'Mombasa-Nyali', lat: -4.0322, lng: 39.7081, size: 'lg', growth: '8.1%', growthValue: 8.1, price: 'KES 35.0M', grantTier: 'high', programTrack: 'civic-audit', sdgTarget: 'SDG 16.6', youthCount: 11500, activeProjects: 16 },
  { id: 'ke-bamburi', countryCode: 'KE', countryName: 'Kenya', loc: 'Mombasa-Bamburi', lat: -3.9961, lng: 39.7138, size: 'md', growth: '6.4%', growthValue: 6.4, price: 'KES 12.0M', grantTier: 'mid', programTrack: 'peace-mediation', sdgTarget: 'SDG 16.1', youthCount: 5100, activeProjects: 9 },
  { id: 'ke-diani', countryCode: 'KE', countryName: 'Kenya', loc: 'Kwale-Diani Beach', lat: -4.2798, lng: 39.5947, size: 'lg', growth: '12.4%', growthValue: 12.4, price: 'KES 45.0M', grantTier: 'high', programTrack: 'youth-grants', sdgTarget: 'SDG 16.7', youthCount: 9800, activeProjects: 18 },
  { id: 'ke-mtwapa', countryCode: 'KE', countryName: 'Kenya', loc: 'Kilifi-Mtwapa', lat: -3.945, lng: 39.739, size: 'md', growth: '7.8%', growthValue: 7.8, price: 'KES 15.5M', grantTier: 'mid', programTrack: 'peace-mediation', sdgTarget: 'SDG 16.3', youthCount: 4600, activeProjects: 8 },
  { id: 'ke-watamu', countryCode: 'KE', countryName: 'Kenya', loc: 'Kilifi-Watamu', lat: -3.3524, lng: 40.0152, size: 'md', growth: '15.0%', growthValue: 15.0, price: 'KES 28.0M', grantTier: 'mid', programTrack: 'youth-grants', sdgTarget: 'SDG 16.7', youthCount: 6100, activeProjects: 12 },
  { id: 'ke-malindi', countryCode: 'KE', countryName: 'Kenya', loc: 'Kilifi-Malindi', lat: -3.2236, lng: 40.13, size: 'md', growth: '9.2%', growthValue: 9.2, price: 'KES 22.0M', grantTier: 'mid', programTrack: 'civic-audit', sdgTarget: 'SDG 16.6', youthCount: 5400, activeProjects: 10 },
  { id: 'ke-lamu', countryCode: 'KE', countryName: 'Kenya', loc: 'Lamu-Shela', lat: -2.2917, lng: 40.9142, size: 'lg', growth: '10.2%', growthValue: 10.2, price: 'KES 60.0M', grantTier: 'high', programTrack: 'peace-mediation', sdgTarget: 'SDG 16.1', youthCount: 8900, activeProjects: 15 },
  { id: 'ke-ruiru', countryCode: 'KE', countryName: 'Kenya', loc: 'Kiambu-Ruiru', lat: -1.1472, lng: 36.9611, size: 'sm', growth: '18.5%', growthValue: 18.5, price: 'KES 8.5M', grantTier: 'seed', programTrack: 'civic-audit', sdgTarget: 'SDG 16.6', youthCount: 4300, activeProjects: 7 },
  { id: 'ke-ruaka', countryCode: 'KE', countryName: 'Kenya', loc: 'Kiambu-Ruaka', lat: -1.2185, lng: 36.7997, size: 'sm', growth: '22.1%', growthValue: 22.1, price: 'KES 11.0M', grantTier: 'seed', programTrack: 'youth-grants', sdgTarget: 'SDG 16.7', youthCount: 4900, activeProjects: 8 },
  { id: 'ke-syokimau', countryCode: 'KE', countryName: 'Kenya', loc: 'Machakos-Syokimau', lat: -1.357, lng: 36.938, size: 'sm', growth: '14.3%', growthValue: 14.3, price: 'KES 9.0M', grantTier: 'seed', programTrack: 'civic-audit', sdgTarget: 'SDG 16.3', youthCount: 3800, activeProjects: 6 },
  { id: 'ke-nakuru', countryCode: 'KE', countryName: 'Kenya', loc: 'Nakuru-Milimani', lat: -0.2795, lng: 36.0715, size: 'md', growth: '20.0%', growthValue: 20.0, price: 'KES 22.0M', grantTier: 'mid', programTrack: 'peace-mediation', sdgTarget: 'SDG 16.1', youthCount: 9200, activeProjects: 17 },
  { id: 'ke-eldoret', countryCode: 'KE', countryName: 'Kenya', loc: 'Uasin Gishu-Eldoret', lat: 0.5143, lng: 35.2698, size: 'md', growth: '11.8%', growthValue: 11.8, price: 'KES 18.5M', grantTier: 'mid', programTrack: 'peace-mediation', sdgTarget: 'SDG 16.1', youthCount: 8600, activeProjects: 14 },
  { id: 'ke-kisumu', countryCode: 'KE', countryName: 'Kenya', loc: 'Kisumu-Milimani', lat: -0.1081, lng: 34.7505, size: 'md', growth: '8.9%', growthValue: 8.9, price: 'KES 25.0M', grantTier: 'mid', programTrack: 'civic-audit', sdgTarget: 'SDG 16.6', youthCount: 10200, activeProjects: 16 },
  { id: 'ke-nanyuki', countryCode: 'KE', countryName: 'Kenya', loc: 'Laikipia-Nanyuki', lat: 0.0167, lng: 37.0667, size: 'md', growth: '25.4%', growthValue: 25.4, price: 'KES 30.0M', grantTier: 'high', programTrack: 'youth-grants', sdgTarget: 'SDG 16.7', youthCount: 7400, activeProjects: 13 },
  { id: 'ke-kitengela', countryCode: 'KE', countryName: 'Kenya', loc: 'Kajiado-Kitengela', lat: -1.5167, lng: 36.85, size: 'sm', growth: '16.7%', growthValue: 16.7, price: 'KES 7.5M', grantTier: 'seed', programTrack: 'civic-audit', sdgTarget: 'SDG 16.3', youthCount: 3600, activeProjects: 6 },
  { id: 'ke-voi', countryCode: 'KE', countryName: 'Kenya', loc: 'Taita Taveta-Voi', lat: -3.3945, lng: 38.563, size: 'sm', growth: '5.2%', growthValue: 5.2, price: 'KES 6.0M', grantTier: 'seed', programTrack: 'peace-mediation', sdgTarget: 'SDG 16.1', youthCount: 2900, activeProjects: 5 },
  { id: 'ke-mara', countryCode: 'KE', countryName: 'Kenya', loc: 'Narok-Maasai Mara', lat: -1.5273, lng: 35.1925, size: 'lg', growth: '1.2%', growthValue: 1.2, price: 'KES 120.0M', grantTier: 'high', programTrack: 'youth-grants', sdgTarget: 'SDG 16.a', youthCount: 11200, activeProjects: 21 },

  // South Sudan
  { id: 'ss-juba', countryCode: 'SS', countryName: 'South Sudan', loc: 'Juba-Konyo Peace Hub', lat: 4.864, lng: 31.59, size: 'lg', growth: '6.4%', growthValue: 6.4, price: 'SSP 42.0M', grantTier: 'high', programTrack: 'peace-mediation', sdgTarget: 'SDG 16.1', youthCount: 11400, activeProjects: 19 },
  { id: 'ss-wau', countryCode: 'SS', countryName: 'South Sudan', loc: 'Wau-Jur River Dialogue', lat: 7.7029, lng: 27.9953, size: 'md', growth: '9.1%', growthValue: 9.1, price: 'SSP 18.5M', grantTier: 'mid', programTrack: 'civic-audit', sdgTarget: 'SDG 16.3', youthCount: 6200, activeProjects: 10 },
  { id: 'ss-malakal', countryCode: 'SS', countryName: 'South Sudan', loc: 'Malakal-Nile Forum', lat: 9.5334, lng: 31.6605, size: 'md', growth: '7.3%', growthValue: 7.3, price: 'SSP 15.0M', grantTier: 'mid', programTrack: 'peace-mediation', sdgTarget: 'SDG 16.1', youthCount: 5400, activeProjects: 9 },
  { id: 'ss-yei', countryCode: 'SS', countryName: 'South Sudan', loc: 'Yei-Civic Bridge', lat: 4.095, lng: 30.6779, size: 'sm', growth: '11.2%', growthValue: 11.2, price: 'SSP 9.4M', grantTier: 'seed', programTrack: 'youth-grants', sdgTarget: 'SDG 16.7', youthCount: 3900, activeProjects: 7 },

  // Tanzania
  { id: 'tz-dodoma', countryCode: 'TZ', countryName: 'Tanzania', loc: 'Dodoma-Chamwino Hub', lat: -6.169, lng: 35.758, size: 'lg', growth: '8.7%', growthValue: 8.7, price: 'TZS 95.0M', grantTier: 'high', programTrack: 'civic-audit', sdgTarget: 'SDG 16.6', youthCount: 12100, activeProjects: 17 },
  { id: 'tz-dar', countryCode: 'TZ', countryName: 'Tanzania', loc: 'Dar es Salaam-Kinondoni', lat: -6.7924, lng: 39.2083, size: 'lg', growth: '13.5%', growthValue: 13.5, price: 'TZS 140.0M', grantTier: 'high', programTrack: 'youth-grants', sdgTarget: 'SDG 16.7', youthCount: 16800, activeProjects: 23 },
  { id: 'tz-arusha', countryCode: 'TZ', countryName: 'Tanzania', loc: 'Arusha-EAC Youth Hub', lat: -3.3869, lng: 36.683, size: 'md', growth: '10.4%', growthValue: 10.4, price: 'TZS 68.0M', grantTier: 'mid', programTrack: 'peace-mediation', sdgTarget: 'SDG 16.a', youthCount: 8400, activeProjects: 14 },
  { id: 'tz-mwanza', countryCode: 'TZ', countryName: 'Tanzania', loc: 'Mwanza-Lake Zone', lat: -2.5164, lng: 32.9175, size: 'md', growth: '7.9%', growthValue: 7.9, price: 'TZS 52.0M', grantTier: 'mid', programTrack: 'civic-audit', sdgTarget: 'SDG 16.6', youthCount: 6900, activeProjects: 11 },
  { id: 'tz-zanzibar', countryCode: 'TZ', countryName: 'Tanzania', loc: 'Zanzibar-Stone Town', lat: -6.1659, lng: 39.2026, size: 'sm', growth: '14.1%', growthValue: 14.1, price: 'TZS 44.0M', grantTier: 'seed', programTrack: 'youth-grants', sdgTarget: 'SDG 16.7', youthCount: 4700, activeProjects: 8 },

  // Rwanda
  { id: 'rw-kigali', countryCode: 'RW', countryName: 'Rwanda', loc: 'Kigali-Gasabo Civic Lab', lat: -1.936, lng: 30.088, size: 'lg', growth: '15.8%', growthValue: 15.8, price: 'RWF 54.0M', grantTier: 'high', programTrack: 'youth-grants', sdgTarget: 'SDG 16.7', youthCount: 13600, activeProjects: 20 },
  { id: 'rw-huye', countryCode: 'RW', countryName: 'Rwanda', loc: 'Huye-Campus Dialogue', lat: -2.5969, lng: 29.7394, size: 'md', growth: '12.3%', growthValue: 12.3, price: 'RWF 28.0M', grantTier: 'mid', programTrack: 'civic-audit', sdgTarget: 'SDG 16.3', youthCount: 7800, activeProjects: 13 },
  { id: 'rw-musanze', countryCode: 'RW', countryName: 'Rwanda', loc: 'Musanze-Volcanoes Hub', lat: -1.4998, lng: 29.635, size: 'md', growth: '9.6%', growthValue: 9.6, price: 'RWF 22.5M', grantTier: 'mid', programTrack: 'peace-mediation', sdgTarget: 'SDG 16.1', youthCount: 5900, activeProjects: 10 },
  { id: 'rw-rubavu', countryCode: 'RW', countryName: 'Rwanda', loc: 'Rubavu-Lake Kivu Bridge', lat: -1.7031, lng: 29.2564, size: 'sm', growth: '11.4%', growthValue: 11.4, price: 'RWF 19.0M', grantTier: 'seed', programTrack: 'peace-mediation', sdgTarget: 'SDG 16.1', youthCount: 4500, activeProjects: 8 },

  // Uganda
  { id: 'ug-kampala', countryCode: 'UG', countryName: 'Uganda', loc: 'Kampala-Makerere Hub', lat: 0.335, lng: 32.568, size: 'lg', growth: '14.2%', growthValue: 14.2, price: 'UGX 185.0M', grantTier: 'high', programTrack: 'civic-audit', sdgTarget: 'SDG 16.6', youthCount: 15200, activeProjects: 22 },
  { id: 'ug-gulu', countryCode: 'UG', countryName: 'Uganda', loc: 'Gulu-Acholi Peace Center', lat: 2.7724, lng: 32.2881, size: 'md', growth: '11.9%', growthValue: 11.9, price: 'UGX 96.0M', grantTier: 'high', programTrack: 'peace-mediation', sdgTarget: 'SDG 16.1', youthCount: 9400, activeProjects: 15 },
  { id: 'ug-mbale', countryCode: 'UG', countryName: 'Uganda', loc: 'Mbale-Elgon Youth Forum', lat: 1.0644, lng: 34.1795, size: 'md', growth: '8.4%', growthValue: 8.4, price: 'UGX 64.0M', grantTier: 'mid', programTrack: 'youth-grants', sdgTarget: 'SDG 16.7', youthCount: 6800, activeProjects: 11 },
  { id: 'ug-mbarara', countryCode: 'UG', countryName: 'Uganda', loc: 'Mbarara-Ankole Hub', lat: -0.6072, lng: 30.6545, size: 'sm', growth: '9.7%', growthValue: 9.7, price: 'UGX 58.0M', grantTier: 'seed', programTrack: 'civic-audit', sdgTarget: 'SDG 16.3', youthCount: 5100, activeProjects: 9 },

  // Somalia
  { id: 'so-mogadishu', countryCode: 'SO', countryName: 'Somalia', loc: 'Mogadishu-Benadir Hub', lat: 2.049, lng: 45.34, size: 'lg', growth: '10.8%', growthValue: 10.8, price: 'USD 380K', grantTier: 'high', programTrack: 'peace-mediation', sdgTarget: 'SDG 16.1', youthCount: 12900, activeProjects: 18 },
  { id: 'so-hargeisa', countryCode: 'SO', countryName: 'Somalia', loc: 'Hargeisa-Maroodi Hub', lat: 9.5624, lng: 44.077, size: 'md', growth: '12.6%', growthValue: 12.6, price: 'USD 240K', grantTier: 'mid', programTrack: 'youth-grants', sdgTarget: 'SDG 16.7', youthCount: 8300, activeProjects: 13 },
  { id: 'so-garowe', countryCode: 'SO', countryName: 'Somalia', loc: 'Garowe-Nugaal Forum', lat: 8.4021, lng: 48.4845, size: 'md', growth: '8.2%', growthValue: 8.2, price: 'USD 145K', grantTier: 'mid', programTrack: 'civic-audit', sdgTarget: 'SDG 16.6', youthCount: 5700, activeProjects: 10 },
  { id: 'so-kismayo', countryCode: 'SO', countryName: 'Somalia', loc: 'Kismayo-Juba Coast', lat: -0.3582, lng: 42.5454, size: 'sm', growth: '7.5%', growthValue: 7.5, price: 'USD 110K', grantTier: 'seed', programTrack: 'peace-mediation', sdgTarget: 'SDG 16.1', youthCount: 4100, activeProjects: 7 },
];
