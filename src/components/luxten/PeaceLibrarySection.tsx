import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  BookOpen, 
  FileText, 
  Video, 
  Headphones, 
  Image as ImageIcon, 
  Bookmark, 
  BookmarkCheck, 
  Download, 
  Copy, 
  Check, 
  Eye, 
  Scroll, 
  GraduationCap, 
  Scale, 
  ShieldCheck, 
  Search, 
  X, 
  Play, 
  Pause, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  Share2, 
  CheckCircle2, 
  FolderGit2, 
  BookMarked,
  Clock,
  User,
  Tag,
  ArrowUpRight,
  Filter,
  ArrowRight,
  CheckCheck,
  ChevronRight,
  Radio,
  SlidersHorizontal,
  Compass
} from 'lucide-react';

export type LibraryCategoryKey = 
  | 'all'
  | 'legislation'
  | 'history'
  | 'papers'
  | 'videos'
  | 'audio'
  | 'toolkits'
  | 'books'
  | 'photos'
  | 'articles';

export type ResourceFormatType = 'text' | 'pdf' | 'video' | 'audio' | 'image' | 'toolkit';

export interface LibraryItem {
  id: string;
  category: LibraryCategoryKey;
  categoryLabel: string;
  format: string;
  formatType: ResourceFormatType;
  title: string;
  subtitle: string;
  description: string;
  author: string;
  year: string;
  sdgTarget: string;
  durationOrPages: string;
  size: string;
  coverImage: string;
  tags: string[];
  downloadsCount: string;
  fullExcerpt: {
    summary: string;
    chapters?: string[];
    keyTakeaways?: string[];
    transcript?: string;
    sampleCitation?: string;
  };
}

interface PeaceLibrarySectionProps {
  isLightMode?: boolean;
  onOpenSubmitModal?: () => void;
}

export const PeaceLibrarySection: React.FC<PeaceLibrarySectionProps> = ({
  isLightMode = false,
  onOpenSubmitModal
}) => {
  const [selectedCategory, setSelectedCategory] = useState<LibraryCategoryKey>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set(['lib-1', 'lib-3', 'lib-7']));
  const [activeModalItem, setActiveModalItem] = useState<LibraryItem | null>(null);
  const [activeModalTab, setActiveModalTab] = useState<'content' | 'citation' | 'takeaways'>('content');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedCitation, setCopiedCitation] = useState<boolean>(false);
  const streamScrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll stream to top when category changes
  useEffect(() => {
    if (streamScrollRef.current) {
      streamScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedCategory]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const toggleBookmark = (id: string, title: string) => {
    setBookmarkedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showToast(`Removed "${title}" from your saved shelf.`);
      } else {
        next.add(id);
        showToast(`Saved "${title}" to your offline shelf.`);
      }
      return next;
    });
  };

  const handleDownload = (item: LibraryItem) => {
    showToast(`Downloading verified copy of "${item.title}" (${item.size}).`);
  };

  const handleCopyCitation = (citation: string) => {
    navigator.clipboard?.writeText(citation);
    setCopiedCitation(true);
    showToast('Citation copied to clipboard (APA 7th format).');
    setTimeout(() => setCopiedCitation(false), 2500);
  };

  // Comprehensive Knowledge Archive Data spanning Peace, Justice, and SDG 16
  const libraryData: LibraryItem[] = [
    // 02 Legislation & Charters
    {
      id: 'lib-1',
      category: 'legislation',
      categoryLabel: 'Constitutional & Statutory Laws',
      format: 'Primary Constitutional Code',
      formatType: 'pdf',
      title: 'Constitution of Kenya 2010 (Annotated Citizen Edition)',
      subtitle: 'Sovereignty of the People, Bill of Rights & Devolution Framework',
      description: 'The transformative supreme law of the Republic of Kenya. Features Article 1 (People\'s Sovereignty), Chapter 4 (Fundamental Rights & Freedoms), Chapter 6 (Leadership & Integrity), and Chapter 11 (Devolution to 47 County Governments).',
      author: 'National Council for Law Reporting & Katiba Institute',
      year: '2010 / Supreme Law',
      sdgTarget: 'SDG 16.3 & 16.7',
      durationOrPages: '264 Articles • 196 Pages',
      size: '4.2 MB PDF',
      coverImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200&auto=format&fit=crop',
      tags: ['Constitutional Law', 'Devolution', 'Bill of Rights', 'Article 10 Values'],
      downloadsCount: '14,820',
      fullExcerpt: {
        summary: 'Promulgated on 27th August 2010, the Constitution of Kenya established an open society based on democratic values, social justice, and rule of law. It decentralized government power into 47 counties to bring services and peacebuilding directly to the grassroots.',
        chapters: [
          'Preamble: Honouring those who struggled for freedom and justice',
          'Chapter 1: Sovereignty of the people and supremacy of this Constitution',
          'Chapter 4: The Bill of Rights (Equality, Freedom of Expression, Access to Justice)',
          'Chapter 6: Leadership and Integrity (Codes of public conduct)',
          'Chapter 11: Devolved Government (Objects and principles of devolution)'
        ],
        keyTakeaways: [
          'All sovereign power belongs to the people of Kenya and shall be exercised only in accordance with this Constitution.',
          'State agencies must ensure mandatory public participation in all legislative, budget, and development decisions.',
          'Judicial authority is derived from the people and must be exercised without undue regard to procedural technicalities.'
        ],
        sampleCitation: 'National Council for Law Reporting. (2010). The Constitution of Kenya. Nairobi: Government Printer.'
      }
    },
    {
      id: 'lib-13',
      category: 'legislation',
      categoryLabel: 'Constitutional & Statutory Laws',
      format: 'Statutory Citizen Guide',
      formatType: 'pdf',
      title: 'Access to Information Act No. 31 of 2016 (Citizen Guide)',
      subtitle: 'Enforcing Article 35: How Citizens Can Compel Public Records & Contracts',
      description: 'The statutory handbook explaining how community organizations and citizens can request budget lines, tender awards, county spending records, and environmental impact assessments with standardized appeal templates.',
      author: 'Commission on Administrative Justice (Ombudsman) & Katiba Institute',
      year: '2016 / Updated 2023',
      sdgTarget: 'SDG 16.10 & 16.6',
      durationOrPages: '44 Pages • Citizen Manual',
      size: '1.9 MB PDF',
      coverImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop',
      tags: ['Access to Information', 'Article 35', 'Public Records', 'Ombudsman'],
      downloadsCount: '9,340',
      fullExcerpt: {
        summary: 'Under Article 35 of the Constitution and Act No. 31 of 2016, every citizen has an unalienable right to access information held by the state. This guide provides exact 21-day timeline procedures and sample appeal petitions to the Ombudsman.',
        chapters: [
          'Section 1: The Scope of Right to Information: Who is Bound by the Act',
          'Section 2: The 21-Day Statutory Processing Window and 48-Hour Emergency Rule',
          'Section 3: Grounds for Lawful Exemptions and the Public Interest Override',
          'Section 4: Filing an Appeal to the Commission on Administrative Justice',
          'Section 5: Sample Application Form & Follow-Up Tracking Register'
        ],
        keyTakeaways: [
          'Information requests require no justification fees beyond actual reproduction costs.',
          'Public bodies have a statutory affirmative duty to proactively disclose contracts, budgets, and policies online.'
        ],
        sampleCitation: 'Commission on Administrative Justice. (2016). Citizen Guide to the Access to Information Act. Nairobi: CAJ.'
      }
    },
    {
      id: 'lib-14',
      category: 'legislation',
      categoryLabel: 'Constitutional & Statutory Laws',
      format: 'Anti-Hate Speech Code',
      formatType: 'text',
      title: 'National Cohesion & Integration Act (Cap 66B Annotated)',
      subtitle: 'Legal Thresholds for Hate Speech, Ethnic Discrimination & Inclusive Appointments',
      description: 'Comprehensive analysis of Cap 66B establishing the NCIC. Contains court precedents distinguishing legitimate political discourse from criminal incitement, ethnic stereotyping, and county employment compliance quotas.',
      author: 'National Cohesion & Integration Commission (NCIC)',
      year: '2019 / Statute Code',
      sdgTarget: 'SDG 16.1 & 16.b',
      durationOrPages: '78 Pages Legal Review',
      size: '2.4 MB PDF',
      coverImage: 'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?q=80&w=1200&auto=format&fit=crop',
      tags: ['Cap 66B', 'Hate Speech Laws', 'Ethnic Cohesion', 'County Quotas'],
      downloadsCount: '6,120',
      fullExcerpt: {
        summary: 'Enacted to combat ethnic chauvinism following the 2007/08 crisis, the NCIC Act establishes severe penalties for incitement to violence while enforcing the 70/30 public employment diversity rule across all 47 counties.',
        chapters: [
          'Part I: Preliminary provisions and definitions of hate speech',
          'Part II: Discrimination by ethnic grounds in employment and public services',
          'Part III: Establishment, powers and investigative mandate of the Commission',
          'Part IV: Enforcement procedures, conciliation protocols, and court referrals'
        ],
        keyTakeaways: [
          'No county public service board may recruit more than one-third of its workforce from a single ethnic community.',
          'Digital dissemination of hate speech via messaging apps carries identical legal liabilities to broadcast media.'
        ],
        sampleCitation: 'National Cohesion and Integration Commission. (2019). Annotated Compendium of Cohesion Jurisprudence. Nairobi: NCIC.'
      }
    },

    // 03 Historical Accords & Treaties
    {
      id: 'lib-2',
      category: 'history',
      categoryLabel: 'Historical Accords & Treaties',
      format: 'Historical Peace Treaty',
      formatType: 'text',
      title: 'The 2008 National Accord & Reconciliation Agreement Archive',
      subtitle: 'The Serena Peace Talks & Framework for Sustainable Peace',
      description: 'The historic accord mediated by H.E. Kofi Annan and the AU Panel of Eminent African Personalities that ended the 2007/08 post-election violence, creating Agenda Items 1 through 4 and paving the pathway to constitutional reform.',
      author: 'African Union Panel of Eminent African Personalities & Serena Dialogue',
      year: '2008 / Historic Treaty',
      sdgTarget: 'SDG 16.1 & 16.6',
      durationOrPages: 'Agenda 1–4 Protocols • 58 Pages',
      size: '2.8 MB PDF',
      coverImage: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1200&auto=format&fit=crop',
      tags: ['National Accord', 'Kofi Annan', 'Agenda 4 Reforms', 'Reconciliation'],
      downloadsCount: '8,410',
      fullExcerpt: {
        summary: 'The National Accord and Reconciliation Act signed on 28 February 2008 resolved that addressing Kenya\'s recurring political crises required not merely immediate cessation of hostilities, but fundamental root-cause reforms categorized into Agenda 1, 2, 3, and 4.',
        chapters: [
          'Agenda 1: Immediate action to stop violence and restore fundamental rights',
          'Agenda 2: Addressing the humanitarian crisis and internally displaced persons',
          'Agenda 3: How to overcome the current political crisis and power-sharing',
          'Agenda 4: Long-term issues: Constitutional reform, land reform, ending poverty, and regional imbalances'
        ],
        keyTakeaways: [
          'Peace cannot endure without addressing historical grievances, systemic inequality, and impunity.',
          'The agreement demonstrated that multi-sectoral civic dialogue is essential to de-escalate national ethnic tensions.',
          'Agenda 4 served as the direct policy blueprint for Kenya\'s 2010 Constitutional dispensation.'
        ],
        sampleCitation: 'AU Panel of Eminent African Personalities. (2008). Agreement on the Principles of Partnership of the Coalition Government. Nairobi: African Union.'
      }
    },
    {
      id: 'lib-4',
      category: 'history',
      categoryLabel: 'Historical Accords & Treaties',
      format: 'Official Commission Archive',
      formatType: 'pdf',
      title: 'Truth, Justice & Reconciliation Commission (TJRC) Report',
      subtitle: 'Comprehensive Inquiry into Historical Injustices & Gross Rights Violations (1963–2008)',
      description: 'The definitive 4-volume investigative archive examining political assassinations, extrajudicial killings, economic crimes, corruption, historical land dispossession, and state repression spanning five decades in Kenya.',
      author: 'Truth, Justice & Reconciliation Commission of Kenya (TJRC)',
      year: '2013 / Official Record',
      sdgTarget: 'SDG 16.3 & 16.b',
      durationOrPages: '4 Volumes • 2,210 Pages',
      size: '18.4 MB Archive',
      coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
      tags: ['TJRC Report', 'Restorative Justice', 'Land Injustices', 'Historical Truth'],
      downloadsCount: '11,350',
      fullExcerpt: {
        summary: 'Established under the TJRC Act of 2008, the Commission heard testimony from over 40,000 citizens across all provinces of Kenya. The final report outlines structural causes of ethnic tension and presents binding reparations recommendations.',
        chapters: [
          'Volume I: Mandate, Methodology, and Overview of State Repression',
          'Volume IIA: Gross Violations of Human Rights & Massacres (Wagalla, Garissa, Turbi)',
          'Volume IIB: Economic Crimes, Grand Corruption, and Public Resource Looting',
          'Volume III: Land Injustices, Irregular Allocations, and Indigenous Rights',
          'Volume IV: Findings, Reparations Framework, and Institutional Reform Directives'
        ],
        keyTakeaways: [
          'True healing requires unconditional state acknowledgement of historical atrocities and implementation of community reparations.',
          'Land tenure insecurity remains a primary underlying catalyst of recurring inter-community electoral violence.',
          'Judicial, police, and security sector vetting is mandatory to rebuild public institutional trust.'
        ],
        sampleCitation: 'Truth, Justice and Reconciliation Commission. (2013). Report of the Truth, Justice and Reconciliation Commission (Vols. 1–4). Nairobi: Government Printer.'
      }
    },
    {
      id: 'lib-15',
      category: 'history',
      categoryLabel: 'Historical Accords & Treaties',
      format: 'Customary Pastoral Accord',
      formatType: 'pdf',
      title: 'The Modogashe Peace Declaration (2001 & 2005 Revisions)',
      subtitle: 'Customary Inter-Clan Resource Accord Between North Eastern & Eastern Pastoralists',
      description: 'The landmark indigenous treaty brokered between elders of Garissa, Wajir, Mandera, Isiolo, and Moyale establishing cross-clan pasture corridors, dry-season borehole sharing, blood-money compensation (diya/maslaha), and joint security patrols.',
      author: 'Pastoralist Parliamentary Group & Modogashe Council of Elders',
      year: '2001 / 2005 Protocol',
      sdgTarget: 'SDG 16.1 & 16.a',
      durationOrPages: '36 Pages Customary Code',
      size: '1.7 MB PDF',
      coverImage: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=1200&auto=format&fit=crop',
      tags: ['Modogashe Accord', 'Pastoral Peace', 'Traditional Justice', 'Resource Sharing'],
      downloadsCount: '7,110',
      fullExcerpt: {
        summary: 'Faced with devastating inter-clan conflicts over scarce water and grazing lands, traditional elders instituted the Modogashe Declaration, formalizing customary jurisprudence alongside formal administrative structures to restore peace in northern Kenya.',
        chapters: [
          'Article 1: Freedom of Movement and Shared Grazing Corridors',
          'Article 2: Management of Shared Water Points and Borehole Priority Protocols',
          'Article 3: Recovery of Stolen Livestock and Disciplinary Levies on Violators',
          'Article 4: Joint Council of Elders Dispute Resolution and Inter-Clan Assemblies'
        ],
        keyTakeaways: [
          'Customary mediation rooted in local cultural norms delivers rapid conflict de-escalation where statutory police presence is scarce.',
          'Inter-communal resource-sharing agreements survive only when women and youth wardens are embedded in monitoring committees.'
        ],
        sampleCitation: 'Modogashe Council of Elders. (2005). The Modogashe Peace Declaration: Customary Framework for Inter-District Peace. Nairobi: Arid Lands Resource Management Project.'
      }
    },

    // 04 Research Papers & SDG 16 Briefs
    {
      id: 'lib-8',
      category: 'papers',
      categoryLabel: 'Research Papers & SDG 16 Briefs',
      format: 'UN & State Policy Monograph',
      formatType: 'pdf',
      title: 'Kenya SDG 16 Voluntary Review: Institutional Integrity & Justice Access',
      subtitle: 'National Progress Metric on Indicator 16.1.1, 16.3.2, 16.5.1 and 16.7.1',
      description: 'Comprehensive multi-agency policy review tracking Kenya\'s ten-year progress toward SDG 16. Evaluates homicide reductions, prison decongestion via community service orders, digital anti-corruption e-procurement audits, and youth public participation indices.',
      author: 'Ministry of Planning & United Nations Development Programme (UNDP Kenya)',
      year: '2023 / VNR Report',
      sdgTarget: 'SDG 16.6 & 16.a',
      durationOrPages: '128 Pages Technical Review',
      size: '5.4 MB PDF',
      coverImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop',
      tags: ['Voluntary National Review', 'SDG 16 Indicators', 'Judicial Access', 'Anti-Bribery Audit'],
      downloadsCount: '5,630',
      fullExcerpt: {
        summary: 'This official report examines data from the Kenya National Bureau of Statistics (KNBS), Judiciary, and EACC to benchmark national achievements against UN 2030 targets. Identifies key bottlenecks in devolved fund accountability.',
        chapters: [
          'Section 1: Macro-Trends in Violent Crime & Grassroots Conflict De-escalation',
          'Section 2: Transforming Court-Annexed Alternative Dispute Resolution (ADR)',
          'Section 3: Anti-Corruption Frameworks: Electronic Government Procurement (e-GP) Audit',
          'Section 4: Youth and Gender Representation in Civic Governance Decision-Making',
          'Section 5: Strategic Accelerators for the 2025–2030 Decade of Action'
        ],
        keyTakeaways: [
          'Court-annexed mediation has unlocked KES 14.8B back into the economy while resolving 62% of civil disputes within 60 days.',
          'Digital citizen oversight portals have increased ward public participation turnout by 310% in connected counties.'
        ],
        sampleCitation: 'Government of Kenya & UNDP. (2023). Kenya Voluntary National Review: SDG 16 Peace, Justice, and Strong Institutions. Nairobi: UNDP Kenya.'
      }
    },
    {
      id: 'lib-16',
      category: 'papers',
      categoryLabel: 'Research Papers & SDG 16 Briefs',
      format: 'Peer-Reviewed Policy Paper',
      formatType: 'pdf',
      title: 'Decentralized Conflict Mitigation: Lessons from 10 Years of Devolution',
      subtitle: 'How 47 County Peace Directorates and Baraza Assemblies Changed Conflict Dynamics',
      description: 'Academic monograph evaluating whether the creation of 47 county governments reduced inter-ethnic tensions or merely localized competition. Identifies best practices in peace directorates of Nakuru, Turkana, and Mandera.',
      author: 'Kenya Institute for Public Policy Research and Analysis (KIPPRA)',
      year: '2024 / Policy Study',
      sdgTarget: 'SDG 16.7 & 16.a',
      durationOrPages: '86 Pages Research Paper',
      size: '3.1 MB PDF',
      coverImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop',
      tags: ['Devolution Policy', 'KIPPRA Research', 'Conflict Dynamics', 'County Assemblies'],
      downloadsCount: '6,490',
      fullExcerpt: {
        summary: 'Analyzing quantitative dispute data between 2013 and 2023, this study demonstrates that counties with dedicated citizen liaison offices and youth peace committees experienced a 48% drop in violent political clashes.',
        chapters: [
          'Executive Summary: Devolution as a Conflict Mitigation Instrument',
          'Chapter 1: Fiscal Decentralization and Perceptions of Marginalization',
          'Chapter 2: Institutionalizing County Peace Committees (CPCs)',
          'Chapter 3: Boundary Disputes: Mediating Inter-County Frontier Clashes',
          'Chapter 4: Recommendations for the Second Decade of Devolved Governance'
        ],
        keyTakeaways: [
          'Transparent budget allocation reduces ethnic grievances faster than purely security-focused interventions.',
          'County assemblies must institutionalize participatory budgeting to prevent elite capture of devolved funds.'
        ],
        sampleCitation: 'KIPPRA. (2024). Decentralized Conflict Mitigation: Lessons from 10 Years of Devolution in Kenya (Working Paper No. 42). Nairobi: KIPPRA.'
      }
    },

    // 05 Civic Documentaries & 4K Footage
    {
      id: 'lib-3',
      category: 'videos',
      categoryLabel: 'Civic Documentaries & 4K Footage',
      format: '4K Civic Documentary Video',
      formatType: 'video',
      title: 'Voices of the Grassroots: 47 Counties Youth Peace Caravan',
      subtitle: 'Decentralized Conflict Mediation Across Informal Settlements & Arid Lands',
      description: 'A 42-minute high-definition documentary tracing young peace champions across Mandera, Nakuru, Kisumu, Mombasa, and Nairobi as they mediate inter-community tensions using participatory dialogues, sports for peace, and digital early warning.',
      author: 'Pamoja 16 Civic Media Collective & UNESCO Youth Envoy',
      year: '2024 / New Release',
      sdgTarget: 'SDG 16.7 & 16.1',
      durationOrPages: '42 Minutes Video • 4K UHD',
      size: 'Stream / 1080p',
      coverImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop',
      tags: ['Youth Peace Caravan', 'Community Mediation', 'Informal Settlements', 'SDG 16.7'],
      downloadsCount: '6,920',
      fullExcerpt: {
        summary: 'This documentary showcases how youth-led early warning networks in 47 counties neutralized flashpoints during heated local elections and resource disputes. Features real mediator testimonials from Kibera, Mathare, Turkana, and Moyale.',
        chapters: [
          'Chapter 1: The Anatomy of Grassroots Tension in Rapid Urban Settlements',
          'Chapter 2: The Elders and Youth Accord in Marsabit & Isiolo',
          'Chapter 3: Boda-Boda Peace Champions: Rapid Response in Nakuru & Kisumu',
          'Chapter 4: The Digital Early-Warning SMS Mesh: Preventing Misinformation Floods',
          'Chapter 5: Toward 2030: Sustaining the Local Peace Economy'
        ],
        transcript: 'Speaker 1 (Kibera Youth Champion): "When conflict begins, young people are always weaponized first. But when we understand that our destiny, our schools, and our mothers rely on peace, we become the most powerful barrier against violence. Pamoja is our shield."',
        keyTakeaways: [
          'Over 85% of ward-level tensions can be mediated peacefully if early warning triggers are activated within 2 hours.',
          'Youth inclusion in peace committees transforms traditional elder councils into modern, rapid-response hubs.'
        ],
        sampleCitation: 'Pamoja Civic Media. (Producer). (2024). Voices of the Grassroots: 47 Counties Youth Peace Caravan [Video]. Nairobi: Pamoja 16 Archive.'
      }
    },
    {
      id: 'lib-17',
      category: 'videos',
      categoryLabel: 'Civic Documentaries & 4K Footage',
      format: 'Investigative Documentary Film',
      formatType: 'video',
      title: 'The Wajir Peace Crusade: How Women Disarmed Clan Militias',
      subtitle: 'The Inspiring Story of Dekha Ibrahim Abdi and the Grassroots Mothers Movement',
      description: 'An acclaimed 35-minute historical documentary tracing how courageous market women in Wajir in the 1990s organized across clan lines, confronted warlords, and formulated the global standard for grassroots community peacemaking.',
      author: 'Wajir Women for Peace & Responding to Conflict (UK)',
      year: '2023 Digital Remaster',
      sdgTarget: 'SDG 16.1 & 16.b',
      durationOrPages: '35 Minutes Video • HD 1080p',
      size: 'Stream / 720p',
      coverImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop',
      tags: ['Wajir Peace Model', 'Dekha Ibrahim', 'Women Mediators', 'Disarmament'],
      downloadsCount: '8,150',
      fullExcerpt: {
        summary: 'When violent clan fighting paralyzed northern Kenya in the 1990s, women trading in Wajir market refused to take sides. They organized the Wajir Peace Initiative, which eventually engaged elders, police, and youth fighters to achieve permanent peace.',
        chapters: [
          'Part 1: When Brothers Fought Brothers: The 1993 Wajir Crisis',
          'Part 2: The Market Women Strike: Refusing to Sell Food to Warlords',
          'Part 3: Confronting the Elders: Reclaiming the True Meaning of Customary Law',
          'Part 4: The Al-Fatah Declaration: The First Comprehensive Clan Peace Pact',
          'Part 5: Dekha Ibrahim\'s Legacy: Spreading the Model Across the Horn of Africa'
        ],
        transcript: 'Dekha Ibrahim Abdi: "Peace is not the absence of conflict; it is the presence of creative means of responding to conflict. If a woman can hold a dying child in her arms, she has the moral right and courage to walk between two clan armies and order them to cease firing."',
        keyTakeaways: [
          'Women\'s informal economic networks provide crucial leverage to shut down conflict supply chains.',
          'The Wajir Peace Model is recognized by the United Nations as one of the world\'s most effective indigenous peacemaking strategies.'
        ],
        sampleCitation: 'Wajir Peace Group. (2023). The Wajir Peace Crusade [Documentary]. Nairobi: Kenya Peace Archives.'
      }
    },

    // 06 Podcasts & Oral Histories
    {
      id: 'lib-7',
      category: 'audio',
      categoryLabel: 'Podcasts & Oral Histories',
      format: '8-Part Audio Archive',
      formatType: 'audio',
      title: 'Oral Peace Histories: Northern Kenya Elders & Women Mediators',
      subtitle: 'Living Memory of the Modogashe Declaration & Inter-Pastoral Accords',
      description: 'High-fidelity audio recordings capturing traditional peace negotiations, cross-clan dispute resolutions, and women\'s peace crusade songs in Marsabit, Isiolo, Garissa, and Wajir. Includes English and Swahili translations with full spoken transcripts.',
      author: 'Pastoralist Peace Initiative & Pamoja Audio Archives',
      year: '2024 / Audio Series',
      sdgTarget: 'SDG 16.1 & 16.a',
      durationOrPages: '8 Episodes • 4.5 Hours Total',
      size: '85 MB HQ MP3',
      coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop',
      tags: ['Modogashe Declaration', 'Oral History', 'Pastoral Peace', 'Women Mediators'],
      downloadsCount: '4,520',
      fullExcerpt: {
        summary: 'This audio archive documents how northern pastoralist communities utilized customary law (Xeer / Maslaha) blended with modern Kenyan jurisprudence to negotiate pasture corridors, dry-season borehole sharing, and cattle rustling cessation.',
        chapters: [
          'Episode 1: The Modogashe Declaration (2001) – Origins of Cross-Border Pasture Peace',
          'Episode 2: Women’s Peace Crusade: Songs That Silenced Guns in Wajir',
          'Episode 3: Water Points as Sanctuaries: Clan Treaties in the Chalbi Desert',
          'Episode 4: Modernizing the Maslaha: Balancing Human Rights with Customary Accord',
          'Episode 5: Youth Warriors Turned Peace Wardens: Testimonials from Samburu & Baringo'
        ],
        transcript: 'Elder Hussein (Wajir Peace Pioneer): "When bullets fly, nobody\'s cow fattens. Peace is not an event we sign in a hotel; peace is the water we agree to drink together at dawn. Listen to the songs of our mothers—they built our peace before courts existed."',
        keyTakeaways: [
          'Customary mediation frameworks remain the fastest dispute resolution mechanism in vast frontier counties.',
          'Women\'s peace committees were the unsung catalysts that ended decades of violent clan warfare in Wajir.'
        ],
        sampleCitation: 'Pastoralist Peace Initiative. (2024). Oral Peace Histories of Northern Kenya [Audio podcast]. Nairobi: Pamoja Audio Vault.'
      }
    },
    {
      id: 'lib-18',
      category: 'audio',
      categoryLabel: 'Podcasts & Oral Histories',
      format: 'Radio Documentary Broadcast',
      formatType: 'audio',
      title: 'Pamoja Peace Radio: De-escalating Election Hate Speech in Real Time',
      subtitle: 'Audio Transcripts of Community Radio Interventions in Nakuru, Kisumu & Eldoret',
      description: 'Studio broadcasts and field interviews showing how community radio journalists used live call-in verification, fact-checking, and rapid rebuttal to neutralize viral ethnic rumors during contested election cycles.',
      author: 'Kenya Community Media Network (KCOMNET) & DW Akademie',
      year: '2023 Broadcast Archive',
      sdgTarget: 'SDG 16.10 & 16.1',
      durationOrPages: '6 Broadcasts • 3.2 Hours Total',
      size: '64 MB MP3',
      coverImage: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1200&auto=format&fit=crop',
      tags: ['Community Radio', 'Hate Speech Rebuttal', 'Election Monitoring', 'Audio Broadcast'],
      downloadsCount: '5,380',
      fullExcerpt: {
        summary: 'When social media rumors threatened to spark neighborhood clashes, grassroots radio stations broadcasted peace messages in local vernacular languages, bringing rival political youth leaders into the studio to shake hands on air.',
        chapters: [
          'Session 1: Live Verification Protocol: Fact-Checking Viral WhatsApp Audio in 15 Minutes',
          'Session 2: The Studio Mediation: Rival Ward Aspirants Share the Microphone',
          'Session 3: Vernacular Language Glossary: Phrases That Heal vs Words That Harm',
          'Session 4: Community Listeners Clubs: Ward Safety Early Warning Networks'
        ],
        transcript: 'Presenter (Radio Amani, Nakuru): "To all our listeners in Bondeni and Kaptembwa: verify before you forward. Your neighbor is your child\'s protector tomorrow. Let us tune our hearts to harmony."',
        keyTakeaways: [
          'Community radio remains the most trusted source of news in rural and informal urban settlements.',
          'Broadcasting verified truth in indigenous languages stops panic faster than official press statements.'
        ],
        sampleCitation: 'KCOMNET. (2023). Pamoja Peace Radio Broadcast Archive [Audio recordings]. Nairobi: Community Media Network.'
      }
    },

    // 07 Action Toolkits & Field Manuals
    {
      id: 'lib-6',
      category: 'toolkits',
      categoryLabel: 'Action Toolkits & Field Manuals',
      format: 'Practical Field Manual',
      formatType: 'toolkit',
      title: 'Community Paralegal Rapid Action Handbook & Legal First Aid Kit',
      subtitle: 'Protecting Citizens Against Unlawful Arrest, Enforcing Bail & Article 49',
      description: 'A 64-page field action manual designed for grassroots paralegals, youth advocates, and community human rights defenders. Contains quick-reference checklists for police station monitoring, bail application drafting, and habeas corpus petitions.',
      author: 'Kituo Cha Sheria & Legal Aid Trust of Kenya',
      year: '2024 Edition',
      sdgTarget: 'SDG 16.3 & 16.b',
      durationOrPages: '64 Pages • Pocket Checklist',
      size: '2.1 MB PDF',
      coverImage: 'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?q=80&w=1200&auto=format&fit=crop',
      tags: ['Community Paralegals', 'Legal First Aid', 'Article 49 Bail', 'Police Station Monitoring'],
      downloadsCount: '7,890',
      fullExcerpt: {
        summary: 'Designed for non-lawyers serving informal settlements and rural villages, this toolkit breaks down Kenya\'s Criminal Procedure Code and Legal Aid Act of 2016 into actionable steps to prevent arbitrary detention and torture.',
        chapters: [
          'Section 1: Know Your Rights: What Police Can and Cannot Do During Arrest',
          'Section 2: The 24-Hour Rule: Enforcing Article 49(1)(f) Right to Be Brought to Court',
          'Section 3: Standard Police Station Intake Record & Bail Verification Template',
          'Section 4: Drafting an Urgent Habeas Corpus Petition Without an Attorney',
          'Section 5: Documenting Injuries & Preserving Evidence for IPOA (Independent Policing Oversight Authority)'
        ],
        keyTakeaways: [
          'Every arrested person has the right to remain silent and to communicate with an advocate or person of their choice immediately.',
          'Bail and bond are constitutional rights; petty offences should never lead to prolonged pretrial detention.',
          'Community paralegals are legally protected under the Legal Aid Act 2016 when rendering first-aid legal advice.'
        ],
        sampleCitation: 'Kituo Cha Sheria. (2024). Community Paralegal Rapid Action Handbook (5th ed.). Nairobi: Legal Aid Trust.'
      }
    },
    {
      id: 'lib-12',
      category: 'toolkits',
      categoryLabel: 'Action Toolkits & Field Manuals',
      format: 'Citizen Budget Audit Manual',
      formatType: 'toolkit',
      title: 'County Budget Social Audit & Citizen Oversight Field Manual',
      subtitle: 'How Citizens Can Track CIDP Budgets, Ward Bursaries & Prevent Procurement Graft',
      description: 'A 52-page step-by-step audit guide training ward civic groups to review County Integrated Development Plans (CIDPs), request bills of quantities (BOQs), conduct physical site inspections, and lodge public accountability petitions.',
      author: 'International Budget Partnership (IBP Kenya) & Open Contracting Hub',
      year: '2024 / Updated Guide',
      sdgTarget: 'SDG 16.5 & 16.6',
      durationOrPages: '52 Pages • Practical Toolkit',
      size: '2.5 MB PDF',
      coverImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop',
      tags: ['Social Audit', 'County Budget', 'CIDP Tracking', 'Anti-Graft Toolkit'],
      downloadsCount: '8,970',
      fullExcerpt: {
        summary: 'Devolution sent over KES 3.2 Trillion to Kenya\'s 47 counties over the past decade. This toolkit empowers citizens to verify whether allocated funds actually built the clinics, boreholes, and dispensaries promised in ward budgets.',
        chapters: [
          'Module 1: The County Budget Calendar: Key Windows for Citizen Intervention',
          'Module 2: How to Form a Ward Social Audit Committee (Youth, Women, PWDs)',
          'Module 3: Submitting an Article 35 Information Request to the County Executive',
          'Module 4: Physical Project Verification Checklist (Materials, Timelines, Quality)',
          'Module 5: Publishing the Social Audit Finding & Presenting to County Assembly'
        ],
        keyTakeaways: [
          'Budgets are political declarations; without vigilant citizen audits, public money leaks into private pockets.',
          'Citizens have the constitutional right under Article 201 to demand transparency and openness in financial matters.'
        ],
        sampleCitation: 'IBP Kenya. (2024). County Budget Social Audit Field Manual (4th ed.). Nairobi: International Budget Partnership.'
      }
    },

    // 08 Books & Jurisprudential Treatises
    {
      id: 'lib-5',
      category: 'books',
      categoryLabel: 'Books & Jurisprudential Treatises',
      format: 'Environmental Peace Treatise',
      formatType: 'text',
      title: 'Replenishing the Earth: Values for Peace, Democracy & Healing',
      subtitle: 'Ecological Justice as the Bedrock of Human Rights & Democratic Governance',
      description: 'The seminal philosophical treatise by Nobel Peace Laureate Professor Wangari Muta Maathai exploring how responsible environmental management, human dignity, democratic space, and sustainable peace are indivisible pillars of African prosperity.',
      author: 'Prof. Wangari Muta Maathai (Nobel Peace Laureate)',
      year: '2010 / Classic',
      sdgTarget: 'SDG 16.7 & 16.b',
      durationOrPages: '240 Pages Digital Treatise',
      size: '3.6 MB PDF',
      coverImage: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1200&auto=format&fit=crop',
      tags: ['Wangari Maathai', 'Nobel Peace Prize', 'Eco-Justice', 'Democratic Space'],
      downloadsCount: '9,740',
      fullExcerpt: {
        summary: 'Drawing upon traditional African respect for nature and global human rights law, Professor Maathai articulates that resource scarcity caused by corruption and environmental plunder inevitably breeds armed conflict.',
        chapters: [
          'Chapter 1: The Tree as a Symbol of Peace and Justice',
          'Chapter 2: Gratitude, Self-Respect, and Public Service',
          'Chapter 3: The Mottainai Culture: Preventing Wastage of Public Wealth',
          'Chapter 4: Healing the Wounds of Division: Community Reconciliation Through Restoration',
          'Chapter 5: The Three-Legged Stool: Democratic Space, Sustainable Development, and Peace'
        ],
        keyTakeaways: [
          'A nation cannot maintain peace if its public trees, rivers, and communal lands are stolen by powerful elites.',
          'Democracy is like a three-legged stool: one leg is democratic space, the second is sustainable resources, and the third is peace. Remove one, and society falls.'
        ],
        sampleCitation: 'Maathai, W. M. (2010). Replenishing the Earth: Spiritual Values for Healing Ourselves and the World. New York: Doubleday.'
      }
    },
    {
      id: 'lib-10',
      category: 'books',
      categoryLabel: 'Books & Jurisprudential Treatises',
      format: 'Digital Jurisprudential Treatise',
      formatType: 'text',
      title: 'The Architecture of Peace: Restorative Justice in African Jurisprudence',
      subtitle: 'Harmonizing Customary Peacemaking, Common Law & Human Rights Norms',
      description: 'A 312-page legal treatise authored by eminent jurists examining the constitutional grounding of traditional dispute resolution mechanisms (TDRM) under Article 159(2)(c) of the Kenya Constitution and regional human rights charters.',
      author: 'Prof. PLO Lumumba & Justice Willy Mutunga (Foreword)',
      year: '2022 / Monograph',
      sdgTarget: 'SDG 16.3 & 16.b',
      durationOrPages: '312 Pages • Reference Treatise',
      size: '6.8 MB PDF',
      coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1200&auto=format&fit=crop',
      tags: ['African Jurisprudence', 'Article 159(2)(c)', 'TDRM', 'Constitutionalism'],
      downloadsCount: '8,190',
      fullExcerpt: {
        summary: 'This work provides judicial magistrates and human rights practitioners with a rigorous analytical framework for applying indigenous reconciliation concepts while steadfastly guarding gender equality and children’s rights.',
        chapters: [
          'Chapter 1: The Roots of Justice: Ubuntu/Utu as a Constitutional Philosophy',
          'Chapter 2: Decolonizing the Courtroom: The Rise of Court-Annexed Traditional Dispute Resolution',
          'Chapter 3: The Repugnancy Clause in Modern Law: Weeding Out Discriminatory Customary Norms',
          'Chapter 4: Comparative Models: Rwanda\'s Gacaca, South Africa\'s Makgotla, and Kenya\'s Maslaha',
          'Chapter 5: The Future of People-Centered Justice in the Digital Age'
        ],
        keyTakeaways: [
          'Article 159 mandates Kenyan courts to promote alternative dispute mechanisms, provided they do not infringe upon the Bill of Rights.',
          'True African jurisprudence values reconciliation and community wholeness over zero-sum victor/vanquished verdicts.'
        ],
        sampleCitation: 'Lumumba, P. L. O., & Mutunga, W. (2022). The Architecture of Peace: Restorative Justice in African Jurisprudence. Nairobi: LawAfrica.'
      }
    },

    // 09 Historical Photo Archives & Visuals
    {
      id: 'lib-11',
      category: 'photos',
      categoryLabel: 'Historical Photo Archives',
      format: 'Historical Photojournalism Gallery',
      formatType: 'image',
      title: 'Decades of Resilience: Kenya Human Rights Defenders Historical Gallery',
      subtitle: 'Visual History of the Democratic Struggle, Peace Caravans & Katiba Movement (1990–2024)',
      description: 'A curated gallery of 48 high-resolution historical plates capturing key moments in Kenya\'s democracy and peace journey: Saba Saba rallies, Ufungamano constitutional initiative, 2008 Serena accords, 2010 promulgation, and modern youth civic assemblies.',
      author: 'Kenya Human Rights Commission & National Photo Archive',
      year: '1990–2024 / Archival Collection',
      sdgTarget: 'SDG 16.10 & 16.1',
      durationOrPages: '48 High-Res Archival Plates',
      size: '32 MB Collection',
      coverImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop',
      tags: ['Photojournalism', 'Historical Archive', 'Saba Saba', 'Katiba Movement'],
      downloadsCount: '5,140',
      fullExcerpt: {
        summary: 'Photographs represent an indelible testimony of civic courage. This digital archive honors frontline human rights defenders, photojournalists, and community organizers who documented democratic milestones at great personal peril.',
        chapters: [
          'Gallery 1: The Struggle for Multiparty Democracy (Kamukunji, Saba Saba 1990)',
          'Gallery 2: The Mothers of Political Prisoners Freedom Vigil at All Saints Cathedral',
          'Gallery 3: The 2008 Serena Accords and Citizen Peace Caravans',
          'Gallery 4: 27 August 2010: The Sea of Joy at Uhuru Park During Promulgation',
          'Gallery 5: The Next Generation: 2020s Youth Peace Assemblies in all 47 Counties'
        ],
        keyTakeaways: [
          'Visual archives are vital educational safeguards preventing historical amnesia and revisionism.',
          'Every freedom guaranteed in Chapter 4 of the Constitution was earned through non-violent citizen resilience.'
        ],
        sampleCitation: 'Kenya Human Rights Commission. (2024). Decades of Resilience: Visual History of Kenyan Democracy. Nairobi: KHRC.'
      }
    },

    // 10 Articles & Investigative Reports
    {
      id: 'lib-9',
      category: 'articles',
      categoryLabel: 'Articles & Investigative Reports',
      format: 'Investigative Field Dispatch',
      formatType: 'text',
      title: 'The Mathare & Kibera Restorative Justice Experiment',
      subtitle: 'How Grassroots Dialogue Circles Cut Youth Arrests by 64% in Nairobi Settlements',
      description: 'An in-depth field investigation documenting how youth champions, local police station commanders (OCS), and community elders established neighborhood peace desks that replaced punitive crackdowns with peer accountability and skill training.',
      author: 'Pamoja Civic Dispatch & Katiba Human Rights Watch',
      year: '2024 / Investigation',
      sdgTarget: 'SDG 16.1 & 16.3',
      durationOrPages: '14 Min Read • 4,200 Words',
      size: '1.2 MB Article',
      coverImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop',
      tags: ['Restorative Justice', 'Nairobi Informal Settlements', 'Police-Community Dialogue', 'Article 16.1'],
      downloadsCount: '6,310',
      fullExcerpt: {
        summary: 'In urban informal settlements where petty disputes once led to lethal encounters or indefinite remand, community-led restorative justice centers have resolved over 1,200 neighborhood conflicts with a 94% compliance rate.',
        chapters: [
          'Part 1: The Remand Trap: How Minor Scuffles Spiral into Criminal Records',
          'Part 2: The Monday Peace Circles: Sit-downs Between Youth and Ward Chiefs',
          'Part 3: Restitution Over Retribution: Community Service Agreements That Repair Harms',
          'Part 4: Rebuilding the Police-Citizen Social Contract: Lessons from Pangani & Kayole'
        ],
        keyTakeaways: [
          'Poverty must not be criminalized: petty infractions are best resolved through restorative reconciliation rather than incarceration.',
          'Active youth ownership of neighborhood security creates safer streets than armed patrol sweeps alone.'
        ],
        sampleCitation: 'Katiba Human Rights Watch. (2024). The Mathare & Kibera Restorative Justice Experiment. Pamoja Field Dispatches, 7(2), 14–29.'
      }
    }
  ];

  // Numbered categories list matching the reference screenshot design
  const categories: { 
    id: string;
    key: LibraryCategoryKey; 
    label: string; 
    shortTag: string;
    icon: React.ComponentType<{ className?: string }>; 
    count: number; 
    desc: string 
  }[] = [
    { id: '01', key: 'all', label: 'All Knowledge Assets', shortTag: 'Master Vault', icon: Layers, count: 124, desc: 'Master archive across all media formats & categories' },
    { id: '02', key: 'legislation', label: 'Constitutional & Statutory Laws', shortTag: 'Statutes & Codes', icon: ShieldCheck, count: 19, desc: 'Constitution 2010, Access to Info Act, NCIC Cap 66B' },
    { id: '03', key: 'history', label: 'Historical Accords & Treaties', shortTag: 'Peace Treaties', icon: Scroll, count: 18, desc: 'Serena Accords 2008, TJRC Inquiry, Modogashe Declarations' },
    { id: '04', key: 'papers', label: 'Research Papers & SDG 16 Briefs', shortTag: 'Policy & Academic', icon: GraduationCap, count: 22, desc: 'UN VNR metrics, KIPPRA devolution reports, ADR studies' },
    { id: '05', key: 'videos', label: 'Civic Documentaries & 4K Footage', shortTag: 'Video Broadcasts', icon: Video, count: 14, desc: '4K caravans, Wajir peace films, civic hearing recordings' },
    { id: '06', key: 'audio', label: 'Podcasts & Oral Histories', shortTag: 'Audio & Transcripts', icon: Headphones, count: 16, desc: 'Oral histories, radio de-escalation broadcasts, podcasts' },
    { id: '07', key: 'toolkits', label: 'Action Toolkits & Field Manuals', shortTag: 'Civic Checklists', icon: FolderGit2, count: 20, desc: 'Paralegal handbooks, county budget social audit manuals' },
    { id: '08', key: 'books', label: 'Books & Jurisprudential Treatises', shortTag: 'Legal Treatises', icon: BookMarked, count: 12, desc: 'Wangari Maathai archives, African restorative jurisprudence' },
    { id: '09', key: 'photos', label: 'Historical Photo Archives', shortTag: 'Visual Gallery', icon: ImageIcon, count: 15, desc: 'Democratic struggle, peace caravans, Katiba photo exhibits' },
    { id: '10', key: 'articles', label: 'Articles & Investigative Reports', shortTag: 'Field Dispatches', icon: FileText, count: 26, desc: 'Grassroots restorative justice, informal settlement dispatches' }
  ];

  // Active Category details
  const activeCategoryMeta = useMemo(() => {
    return categories.find(c => c.key === selectedCategory) || categories[0];
  }, [selectedCategory]);

  // Filtered Items for the dynamic right side
  const filteredItems = useMemo(() => {
    return libraryData.filter(item => {
      // Category match
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Format match
      if (selectedFormat !== 'all' && item.formatType !== selectedFormat) {
        return false;
      }
      // Search query match
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchSubtitle = item.subtitle.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchAuthor = item.author.toLowerCase().includes(q);
        const matchTags = item.tags.some(t => t.toLowerCase().includes(q));
        const matchSdg = item.sdgTarget.toLowerCase().includes(q);
        if (!matchTitle && !matchSubtitle && !matchDesc && !matchAuthor && !matchTags && !matchSdg) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, selectedFormat, searchQuery]);

  return (
    <div className="flex-1 min-h-0 flex flex-row gap-1.5 sm:gap-2.5 md:gap-3.5 w-full h-full py-0.5 sm:py-1 overflow-hidden">
      
      {/* ========================================================================= */}
      {/* LEFT SIDE: CONSISTENT & ANCHORED CATEGORY SELECTOR COLUMN (MATCHES SCREENSHOT) */}
      {/* ========================================================================= */}
      <aside className={`w-[130px] xs:w-[150px] sm:w-[210px] md:w-[280px] lg:w-[330px] xl:w-[360px] shrink-0 h-full flex flex-col justify-between rounded-xl sm:rounded-2xl border p-1.5 sm:p-2.5 md:p-3 transition-colors duration-300 min-h-0 overflow-hidden ${
        isLightMode 
          ? 'bg-white/95 border-[#005587]/20 shadow-sm' 
          : 'bg-[#0a0f1d]/95 border-white/10 shadow-2xl backdrop-blur-md'
      }`}>
        
        {/* Top Header Block (Matches the Reference Screenshot Pill & Display Typography) */}
        <div className="shrink-0 pb-1.5 sm:pb-2 border-b border-white/10">
          
          {/* Eyebrow Pill Tag */}
          <div className="inline-flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2.5 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-[6.5px] xs:text-[7px] sm:text-[8px] md:text-[8.5px] font-black tracking-wider uppercase mb-0.5 sm:mb-1">
            <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-orange-400 animate-pulse" />
            <span className="truncate">SDG 16 VAULT</span>
          </div>

          {/* Headline (Two-tone bold display font) */}
          <h2 className={`text-[10px] xs:text-[11px] sm:text-sm md:text-base lg:text-[17px] font-black uppercase tracking-tight leading-tight ${
            isLightMode ? 'text-[#002b49]' : 'text-white'
          }`}>
            <span className="block sm:inline">PEACE &amp; </span>
            <span className="text-orange-400 dark:text-[#00C4CC]">ARCHIVE</span>
          </h2>

          <p className="text-[6.5px] sm:text-[7.5px] md:text-[8px] text-gray-400 font-medium leading-tight mt-0.5 sm:mt-1 line-clamp-1 sm:line-clamp-2 hidden xs:block">
            Verified historical accords, statutes, audio, toolkits &amp; research.
          </p>

          {/* Search Box on Left to Quickly Filter Content */}
          <div className="relative mt-1 sm:mt-2">
            <Search className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-gray-400 absolute left-1.5 sm:left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input 
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-5 sm:pl-8 pr-4 sm:pr-7 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[8px] xs:text-[8.5px] sm:text-[9.5px] md:text-[10px] font-medium outline-none transition-all ${
                isLightMode 
                  ? 'bg-gray-100 text-gray-900 border border-gray-200 focus:border-[#005587] focus:bg-white' 
                  : 'bg-black/50 text-white border border-white/10 focus:border-[#00C4CC] focus:bg-black/80'
              }`}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                aria-label="Clear Search"
              >
                <X className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Consistent Numbered Category List (Does NOT change when right side scrolls) */}
        <div className="flex-1 min-h-0 overflow-y-auto my-1 sm:my-1.5 pr-0.5 sm:pr-1 space-y-0.5 sm:space-y-1 custom-scrollbar">
          <div className="flex items-center justify-between text-[6px] xs:text-[6.5px] sm:text-[7.5px] font-mono uppercase tracking-wider text-gray-400 px-1 py-0.5 font-bold">
            <span className="truncate">Directory</span>
            <span className="text-[#00C4CC] shrink-0">10 Sectors</span>
          </div>

          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                id={`cat-btn-${cat.key}`}
                onClick={() => {
                  setSelectedCategory(cat.key);
                }}
                className={`w-full flex items-center justify-between p-1 sm:p-1.5 md:p-2 rounded-lg sm:rounded-xl text-left transition-all duration-200 cursor-pointer border group relative ${
                  isSelected
                    ? isLightMode
                      ? 'bg-gradient-to-r from-[#005587] to-[#004169] text-white border-[#005587] shadow-md ring-1 ring-[#005587]/30'
                      : 'bg-gradient-to-r from-orange-500/25 via-[#005587]/40 to-[#00C4CC]/20 text-white border-orange-400/80 shadow-[0_0_16px_rgba(251,146,60,0.2)]'
                    : isLightMode
                      ? 'bg-gray-50/80 text-gray-800 border-gray-200/70 hover:bg-gray-100 hover:text-black hover:border-gray-300'
                      : 'bg-white/[0.02] text-gray-300 border-white/5 hover:bg-white/[0.07] hover:text-white hover:border-white/15'
                }`}
              >
                <div className="flex items-center gap-1 sm:gap-2 min-w-0 pr-0.5 sm:pr-1">
                  
                  {/* Numbered Index Badge (01, 02, 03... Matching the Screenshot) */}
                  <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-md sm:rounded-lg flex items-center justify-center font-mono text-[7.5px] sm:text-[9px] font-black shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-orange-400 text-black shadow-xs font-black'
                      : isLightMode
                        ? 'bg-gray-200 text-gray-700 group-hover:bg-[#005587] group-hover:text-white'
                        : 'bg-white/10 text-gray-300 group-hover:bg-[#00C4CC] group-hover:text-black'
                  }`}>
                    {cat.id}
                  </div>

                  <div className="min-w-0">
                    <span className="text-[8px] xs:text-[8.5px] sm:text-[9.5px] md:text-[10px] font-bold block truncate leading-tight tracking-tight">
                      {cat.label}
                    </span>
                    <span className={`text-[6px] xs:text-[6.5px] sm:text-[7px] font-mono block truncate ${
                      isSelected ? 'text-white/80' : 'text-gray-400'
                    }`}>
                      {cat.shortTag}
                    </span>
                  </div>
                </div>

                {/* Active Indicator Arrow or Count */}
                <div className="flex items-center gap-1 shrink-0">
                  {isSelected ? (
                    <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-white text-black flex items-center justify-center shrink-0">
                      <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
                    </span>
                  ) : (
                    <span className={`text-[6.5px] sm:text-[7.5px] font-mono font-semibold px-1 sm:px-1.5 py-0.2 rounded-full hidden xs:inline-block ${
                      isLightMode ? 'bg-gray-200/80 text-gray-600' : 'bg-white/5 text-gray-400 group-hover:text-white'
                    }`}>
                      {cat.count}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Metadata & Contribute Action (Stays Consistent at the Bottom) */}
        <div className={`pt-1.5 sm:pt-2 border-t shrink-0 flex items-center justify-between text-[6.5px] xs:text-[7px] sm:text-[8px] font-mono ${
          isLightMode ? 'border-gray-200 text-gray-600' : 'border-white/10 text-gray-400'
        }`}>
          <div className="flex items-center gap-1 truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="truncate">47 Counties</span>
          </div>
          <button
            onClick={onOpenSubmitModal}
            className="text-orange-400 hover:text-orange-300 hover:underline font-bold flex items-center gap-0.5 cursor-pointer shrink-0"
          >
            <span className="hidden sm:inline">Deposit</span>
            <span className="sm:hidden">Add</span>
            <ArrowUpRight className="w-2.5 h-2.5" />
          </button>
        </div>

      </aside>

      {/* ========================================================================= */}
      {/* RIGHT SIDE: SCROLLABLE KNOWLEDGE ARCHIVE (CHANGES DYNAMICALLY BY CATEGORY) */}
      {/* ========================================================================= */}
      <section className={`flex-1 min-h-0 h-full flex flex-col rounded-2xl border p-2.5 sm:p-3 overflow-hidden transition-colors duration-300 ${
        isLightMode 
          ? 'bg-white/90 border-[#005587]/20 shadow-sm' 
          : 'bg-[#080d1a]/90 border-white/10 shadow-2xl backdrop-blur-md'
      }`}>
        
        {/* Dynamic Category Banner Header (Updates with selected category) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 pb-1.5 sm:pb-2 border-b border-white/10 shrink-0">
          <div className="min-w-0">
            <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
              <span className="text-[7px] sm:text-[8px] font-mono font-bold px-1 sm:px-1.5 py-0.2 rounded-md bg-orange-500/20 text-orange-400 border border-orange-500/30">
                DIR {activeCategoryMeta.id}
              </span>
              <h3 className={`text-[10.5px] xs:text-[11.5px] sm:text-sm font-black uppercase tracking-tight truncate ${
                isLightMode ? 'text-[#002b49]' : 'text-white'
              }`}>
                {activeCategoryMeta.label}
              </h3>
              <span className="text-[6.5px] sm:text-[7.5px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-[#005587] text-white shrink-0">
                {filteredItems.length}
              </span>
            </div>
            <p className="text-[6.5px] sm:text-[8px] text-gray-400 font-medium leading-tight mt-0.5 truncate hidden xs:block">
              {activeCategoryMeta.desc}
            </p>
          </div>

          {/* Quick Format Filter Pills */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar max-w-full shrink-0 pt-0.5 sm:pt-0">
            {[
              { id: 'all', label: 'All' },
              { id: 'pdf', label: 'PDF' },
              { id: 'video', label: '4K' },
              { id: 'audio', label: 'Audio' },
              { id: 'toolkit', label: 'Toolkits' },
              { id: 'text', label: 'Treatises' },
              { id: 'image', label: 'Photos' }
            ].map(fmt => (
              <button
                key={fmt.id}
                onClick={() => setSelectedFormat(fmt.id)}
                className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[6.5px] xs:text-[7px] sm:text-[7.5px] font-bold uppercase transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                  selectedFormat === fmt.id
                    ? 'bg-[#00C4CC] text-black shadow-xs font-black'
                    : isLightMode
                      ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      : 'bg-white/5 text-gray-300 hover:bg-white/15'
                }`}
              >
                {fmt.label}
              </button>
            ))}
          </div>
        </div>

        {/* The Dedicated Scrollable Container (Scrolls independently while left remains static) */}
        <div 
          ref={streamScrollRef}
          className="flex-1 min-h-0 overflow-y-auto pr-1 sm:pr-1.5 my-2 space-y-2.5 custom-scrollbar"
        >
          
          {/* Spotlight Hero Banner (Featured Item when in Overview mode) */}
          {selectedCategory === 'all' && !searchQuery && selectedFormat === 'all' && (
            <div className="relative rounded-2xl bg-gradient-to-r from-[#003859] via-[#005587] to-[#0a233a] border border-[#00C4CC]/30 overflow-hidden p-3 sm:p-3.5 text-white shadow-xl shrink-0">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200&auto=format&fit=crop')` }}
              />
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="max-w-xl">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[7px] font-mono font-bold bg-[#E5B80B] text-black px-1.5 py-0.2 rounded-full uppercase">
                      FLAGSHIP PILLAR
                    </span>
                    <span className="text-[7.5px] font-mono text-[#00C4CC]">
                      SDG 16.3 &amp; 16.7 • CONSTITUTIONAL CODE
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-black leading-tight uppercase tracking-tight">
                    Constitution of Kenya 2010: Citizen Peace &amp; Devolution Framework
                  </h3>
                  <p className="text-[8px] sm:text-[8.5px] text-gray-200 font-medium leading-relaxed mt-0.5 line-clamp-2">
                    The supreme pact of peace and justice establishing people's sovereignty, human rights protection, and devolution across Kenya's 47 counties.
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => {
                      const item = libraryData.find(i => i.id === 'lib-1');
                      if (item) setActiveModalItem(item);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-[#00C4CC] hover:bg-white text-black font-black text-[9px] sm:text-[10px] uppercase transition-all flex items-center gap-1 shadow-md cursor-pointer"
                  >
                    <Eye className="w-3 h-3" />
                    <span>Explore Treatise</span>
                  </button>
                  <button
                    onClick={() => {
                      const item = libraryData.find(i => i.id === 'lib-1');
                      if (item) handleDownload(item);
                    }}
                    className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer"
                    title="Download Constitution PDF"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Filtered Records Stream / Dynamic Cards */}
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 mb-2">
                <Search className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-gray-300">No Archive Records Match Your Current Filter</h4>
              <p className="text-[8.5px] text-gray-400 mt-1 max-w-sm">
                Try searching for keywords like "Constitution", "Accords", "Kofi Annan", "Audio", "Wajir" or reset the category filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedFormat('all');
                  setSearchQuery('');
                }}
                className="mt-3 px-3 py-1 bg-[#005587] text-white text-[9px] font-bold rounded-lg cursor-pointer hover:bg-[#00C4CC] hover:text-black transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            filteredItems.map((item) => {
              const isBookmarked = bookmarkedIds.has(item.id);
              return (
                <article
                  key={item.id}
                  id={`archive-card-${item.id}`}
                  className={`rounded-2xl border p-2.5 sm:p-3 transition-all duration-200 flex flex-col sm:flex-row gap-2.5 sm:gap-3 group ${
                    isLightMode
                      ? 'bg-white border-gray-200 hover:border-[#005587]/40 hover:shadow-md'
                      : 'bg-white/[0.03] border-white/10 hover:border-[#00C4CC]/50 hover:bg-white/[0.05] shadow-sm'
                  }`}
                >
                  {/* Thumbnail / Emblem */}
                  <div className="relative w-full sm:w-28 sm:h-24 h-24 rounded-xl overflow-hidden shrink-0 bg-black/40">
                    <img 
                      src={item.coverImage} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Format Badge Top Left */}
                    <div className="absolute top-1.5 left-1.5">
                      <span className="text-[6.5px] font-mono font-bold px-1.5 py-0.2 rounded-md bg-black/70 backdrop-blur-xs text-[#00C4CC] border border-[#00C4CC]/30 uppercase flex items-center gap-1">
                        {item.formatType === 'video' ? <Video className="w-2.5 h-2.5" /> :
                         item.formatType === 'audio' ? <Headphones className="w-2.5 h-2.5" /> :
                         item.formatType === 'toolkit' ? <FolderGit2 className="w-2.5 h-2.5" /> :
                         item.formatType === 'image' ? <ImageIcon className="w-2.5 h-2.5" /> :
                         <FileText className="w-2.5 h-2.5" />}
                        {item.format}
                      </span>
                    </div>

                    {/* SDG Badge Bottom Left */}
                    <div className="absolute bottom-1.5 left-1.5">
                      <span className="text-[6.5px] font-mono font-bold px-1.5 py-0.2 rounded-md bg-[#E5B80B]/90 text-black uppercase font-black">
                        {item.sdgTarget}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      {/* Subtitle & Author */}
                      <div className="flex items-center justify-between gap-1 flex-wrap mb-0.5">
                        <span className={`text-[7px] sm:text-[7.5px] font-mono font-semibold uppercase ${
                          isLightMode ? 'text-[#005587]' : 'text-gray-400'
                        }`}>
                          {item.author} • {item.year}
                        </span>
                        <span className="text-[7px] font-mono text-gray-400">
                          {item.durationOrPages} • {item.size}
                        </span>
                      </div>

                      {/* Title */}
                      <h4 
                        onClick={() => setActiveModalItem(item)}
                        className={`text-xs sm:text-[13px] font-black leading-tight cursor-pointer hover:text-[#00C4CC] transition-colors ${
                          isLightMode ? 'text-[#002b49]' : 'text-white'
                        }`}
                      >
                        {item.title}
                      </h4>

                      {/* Description */}
                      <p className={`text-[7.5px] sm:text-[8px] font-medium leading-relaxed mt-1 line-clamp-2 ${
                        isLightMode ? 'text-gray-600' : 'text-gray-300'
                      }`}>
                        {item.description}
                      </p>

                      {/* Tag pills */}
                      <div className="flex items-center gap-1 flex-wrap mt-1.5">
                        {item.tags.map(tag => (
                          <span 
                            key={tag}
                            className={`text-[6.5px] font-mono px-1.5 py-0.2 rounded-md border ${
                              isLightMode 
                                ? 'bg-gray-100 text-gray-700 border-gray-200' 
                                : 'bg-white/5 text-gray-300 border-white/5'
                            }`}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Strip */}
                    <div className="flex items-center justify-between gap-2 pt-2 mt-1.5 border-t border-white/5">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setActiveModalItem(item)}
                          className="px-2.5 py-1 rounded-lg bg-[#005587] hover:bg-[#00C4CC] hover:text-black text-white text-[8px] sm:text-[9px] font-bold uppercase transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-2.5 h-2.5" />
                          <span>
                            {item.formatType === 'video' ? 'Watch Documentary' : 
                             item.formatType === 'audio' ? 'Listen Recording' : 
                             item.formatType === 'image' ? 'View Photo Exhibit' : 
                             'Read & Explore'}
                          </span>
                        </button>

                        <button
                          onClick={() => handleDownload(item)}
                          className={`p-1 rounded-lg border text-[8px] transition-all cursor-pointer ${
                            isLightMode 
                              ? 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200' 
                              : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/15 hover:text-white'
                          }`}
                          title={`Download ${item.title}`}
                        >
                          <Download className="w-3 h-3" />
                        </button>

                        <button
                          onClick={() => toggleBookmark(item.id, item.title)}
                          className={`p-1 rounded-lg border text-[8px] transition-all cursor-pointer ${
                            isBookmarked 
                              ? 'bg-[#E5B80B]/20 border-[#E5B80B]/50 text-[#E5B80B]' 
                              : isLightMode 
                                ? 'bg-gray-100 border-gray-300 text-gray-500 hover:text-black' 
                                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                          }`}
                          title={isBookmarked ? 'Remove from shelf' : 'Bookmark to shelf'}
                        >
                          {isBookmarked ? <BookmarkCheck className="w-3 h-3 text-[#E5B80B]" /> : <Bookmark className="w-3 h-3" />}
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-[7px] font-mono text-gray-400">
                        <span>{item.downloadsCount} Accessed</span>
                        <button
                          onClick={() => handleCopyCitation(item.fullExcerpt.sampleCitation || `${item.author} (${item.year}). ${item.title}.`)}
                          className="hover:text-[#00C4CC] transition-colors cursor-pointer flex items-center gap-0.5"
                          title="Copy citation"
                        >
                          <Copy className="w-2.5 h-2.5" />
                          <span>Cite</span>
                        </button>
                      </div>
                    </div>

                  </div>
                </article>
              );
            })
          )}

        </div>

        {/* Stream Footer Indicator */}
        <div className={`pt-2 border-t shrink-0 flex items-center justify-between text-[7.5px] sm:text-[8px] font-mono ${
          isLightMode ? 'border-gray-200 text-gray-600' : 'border-white/10 text-gray-400'
        }`}>
          <div>
            <span>Direct Knowledge Nodes: </span>
            <span className="font-bold text-white">47 Counties Public Mesh</span>
          </div>

          <button
            onClick={onOpenSubmitModal}
            className="flex items-center gap-1 text-[#00C4CC] hover:underline font-bold cursor-pointer"
          >
            <span>Submit Community Paper / Accord</span>
            <ArrowUpRight className="w-2.5 h-2.5" />
          </button>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* INTERACTIVE ARCHIVE READER & MEDIA PLAYER MODAL                           */}
      {/* ========================================================================= */}
      {activeModalItem && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 animate-fadeIn"
          onClick={() => setActiveModalItem(null)}
        >
          <div 
            className={`relative w-full max-w-3xl border rounded-2xl p-4 sm:p-5 shadow-2xl flex flex-col gap-3 max-h-[92vh] overflow-hidden ${
              isLightMode 
                ? 'bg-white border-[#005587]/25 text-[#00223f]' 
                : 'bg-[#0f172a] border-white/20 text-white'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="flex items-start justify-between border-b border-white/10 pb-2.5 shrink-0">
              <div className="min-w-0 pr-3">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-[7.5px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#00C4CC] text-black uppercase">
                    {activeModalItem.format}
                  </span>
                  <span className="text-[7.5px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#E5B80B]/20 text-[#E5B80B] border border-[#E5B80B]/30 uppercase">
                    {activeModalItem.sdgTarget}
                  </span>
                  <span className="text-[7.5px] font-mono text-gray-400">
                    {activeModalItem.author} • {activeModalItem.year}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black leading-tight uppercase tracking-tight">
                  {activeModalItem.title}
                </h3>
              </div>

              <button
                onClick={() => setActiveModalItem(null)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-300 hover:text-white transition-colors cursor-pointer shrink-0"
                aria-label="Close Modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Tabs Bar */}
            <div className="flex items-center gap-1.5 border-b border-white/10 pb-1.5 shrink-0 text-[9px] font-mono uppercase font-bold">
              <button
                onClick={() => setActiveModalTab('content')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  activeModalTab === 'content'
                    ? 'bg-[#005587] text-white shadow-xs'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {activeModalItem.formatType === 'video' ? 'Video Player & Transcript' :
                 activeModalItem.formatType === 'audio' ? 'Audio Stream & Waveform' :
                 activeModalItem.formatType === 'image' ? 'Photo Exhibition Viewer' :
                 'Document Reader & Excerpt'}
              </button>

              <button
                onClick={() => setActiveModalTab('takeaways')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  activeModalTab === 'takeaways'
                    ? 'bg-[#005587] text-white shadow-xs'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Key Takeaways &amp; Clauses
              </button>

              <button
                onClick={() => setActiveModalTab('citation')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  activeModalTab === 'citation'
                    ? 'bg-[#005587] text-white shadow-xs'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Citation &amp; Metadata
              </button>
            </div>

            {/* Modal Tab Body (Scrollable) */}
            <div className="flex-1 min-h-0 overflow-y-auto pr-1 space-y-3 custom-scrollbar text-xs">
              
              {activeModalTab === 'content' && (
                <div className="space-y-3">
                  
                  {/* Media Visualization if Video, Audio, or Image */}
                  {activeModalItem.formatType === 'video' && (
                    <div className="relative rounded-xl overflow-hidden bg-black aspect-video flex flex-col justify-between p-3 border border-white/10">
                      <img 
                        src={activeModalItem.coverImage} 
                        alt="video thumbnail" 
                        className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none"
                      />
                      <div className="relative z-10 flex items-center justify-between text-[8px] font-mono text-gray-300">
                        <span className="bg-red-600 text-white px-2 py-0.5 rounded-full font-bold">4K ARCHIVE FEED</span>
                        <span>{activeModalItem.durationOrPages}</span>
                      </div>

                      <div className="relative z-10 flex flex-col items-center justify-center my-auto">
                        <button 
                          onClick={() => showToast('Streaming 4K documentary recording.')}
                          className="w-14 h-14 rounded-full bg-[#00C4CC] text-black flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer"
                        >
                          <Play className="w-6 h-6 fill-current ml-0.5" />
                        </button>
                        <span className="text-[10px] font-bold text-white mt-2 drop-shadow-sm">Click to Stream Full 4K Field Recording</span>
                      </div>

                      <div className="relative z-10 w-full bg-black/60 backdrop-blur-xs p-1.5 rounded-lg flex items-center justify-between text-[8px] font-mono text-gray-300">
                        <span>00:00 / 42:00</span>
                        <div className="flex-1 mx-3 h-1 rounded-full bg-white/20 overflow-hidden">
                          <div className="w-1/3 h-full bg-[#00C4CC]" />
                        </div>
                        <span>1080p HQ</span>
                      </div>
                    </div>
                  )}

                  {activeModalItem.formatType === 'audio' && (
                    <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                            className="w-10 h-10 rounded-full bg-[#00C4CC] text-black flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-md"
                          >
                            {isPlayingAudio ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                          </button>
                          <div>
                            <span className="text-xs font-bold text-white block">Official Oral Peace Audio Recording</span>
                            <span className="text-[8px] font-mono text-gray-400">Recorded with Elders &amp; Community Women Champions</span>
                          </div>
                        </div>
                        <span className="text-[9px] font-mono text-[#00C4CC] font-bold">
                          {isPlayingAudio ? '● STREAMING AUDIO' : 'PAUSED'}
                        </span>
                      </div>

                      {/* Animated Sound Waveform Bars */}
                      <div className="flex items-end justify-between gap-1 h-10 px-2 bg-black/60 rounded-lg py-1 border border-white/5">
                        {[40, 65, 30, 85, 95, 50, 75, 100, 60, 45, 80, 90, 35, 70, 85, 40, 60, 95, 50, 70, 40, 60].map((h, i) => (
                          <div 
                            key={i} 
                            className={`flex-1 rounded-full transition-all duration-300 ${
                              isPlayingAudio ? 'bg-[#00C4CC] animate-pulse' : 'bg-gray-600'
                            }`}
                            style={{ height: isPlayingAudio ? `${h}%` : '25%' }}
                          />
                        ))}
                      </div>

                      {activeModalItem.fullExcerpt.transcript && (
                        <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-[9px] font-mono text-gray-300 italic">
                          "{activeModalItem.fullExcerpt.transcript}"
                        </div>
                      )}
                    </div>
                  )}

                  {activeModalItem.formatType === 'image' && (
                    <div className="relative rounded-xl overflow-hidden bg-black aspect-video flex flex-col justify-between p-3 border border-white/10">
                      <img 
                        src={activeModalItem.coverImage} 
                        alt="photo exhibit" 
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
                      <div className="relative z-10 flex items-center justify-between text-[8px] font-mono text-gray-300">
                        <span className="bg-[#E5B80B] text-black px-2 py-0.5 rounded-full font-bold">HIGH RESOLUTION ARCHIVE</span>
                        <span>Plate No. 01 / 48</span>
                      </div>
                      <div className="relative z-10 text-[9px] text-white bg-black/60 p-2 rounded-lg">
                        <span>Historic photographic record: Curated by Kenya Human Rights Commission.</span>
                      </div>
                    </div>
                  )}

                  {/* Summary & Overview */}
                  <div>
                    <h4 className="text-[10px] font-mono font-bold uppercase text-[#00C4CC] tracking-wider mb-1">
                      EXECUTIVE ABSTRACT &amp; CONTEXT
                    </h4>
                    <p className="leading-relaxed text-gray-300 font-medium">
                      {activeModalItem.fullExcerpt.summary}
                    </p>
                  </div>

                  {/* Table of Contents / Chapters */}
                  {activeModalItem.fullExcerpt.chapters && (
                    <div className="mt-3">
                      <h4 className="text-[10px] font-mono font-bold uppercase text-[#E5B80B] tracking-wider mb-1.5">
                        TABLE OF CONTENTS &amp; SECTION ARCHITECTURE
                      </h4>
                      <div className="space-y-1">
                        {activeModalItem.fullExcerpt.chapters.map((chap, idx) => (
                          <div key={idx} className="flex items-start gap-2 p-1.5 rounded-lg bg-white/5 border border-white/5">
                            <span className="text-[8px] font-mono font-bold text-[#00C4CC] shrink-0 mt-0.5">
                              0{idx + 1}.
                            </span>
                            <span className="text-[9px] text-gray-200 font-medium">
                              {chap}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              )}

              {activeModalTab === 'takeaways' && (
                <div className="space-y-2.5">
                  <h4 className="text-[10px] font-mono font-bold uppercase text-[#00C4CC] tracking-wider mb-1">
                    BINDING TAKEAWAYS &amp; CIVIC PRINCIPLES
                  </h4>
                  {activeModalItem.fullExcerpt.keyTakeaways?.map((takeaway, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <CheckCircle2 className="w-4 h-4 text-[#00C4CC] shrink-0 mt-0.5" />
                      <p className="text-[9.5px] text-gray-200 leading-relaxed font-medium">
                        {takeaway}
                      </p>
                    </div>
                  ))}

                  <div className="p-3 rounded-xl bg-[#005587]/15 border border-[#005587]/40 mt-3">
                    <span className="text-[9px] font-mono font-bold text-[#E5B80B] block uppercase mb-1">
                      Application in Local Peace Dialogues
                    </span>
                    <p className="text-[8.5px] text-gray-300 leading-relaxed">
                      This material is certified for use in county assembly petitions, baraza civic forums, court-annexed mediation sessions, and university study circles.
                    </p>
                  </div>
                </div>
              )}

              {activeModalTab === 'citation' && (
                <div className="space-y-3">
                  <div>
                    <h4 className="text-[10px] font-mono font-bold uppercase text-[#00C4CC] tracking-wider mb-1">
                      ACADEMIC &amp; CIVIC CITATION (APA 7th)
                    </h4>
                    <div className="p-3 rounded-xl bg-black/50 border border-white/15 flex items-start justify-between gap-3 font-mono text-[9px] text-gray-200">
                      <span>{activeModalItem.fullExcerpt.sampleCitation || `${activeModalItem.author} (${activeModalItem.year}). ${activeModalItem.title}.`}</span>
                      <button
                        onClick={() => handleCopyCitation(activeModalItem.fullExcerpt.sampleCitation || `${activeModalItem.author} (${activeModalItem.year}). ${activeModalItem.title}.`)}
                        className="px-2 py-1 rounded bg-[#00C4CC] text-black font-bold text-[8px] flex items-center gap-1 cursor-pointer shrink-0"
                      >
                        {copiedCitation ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedCitation ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[8px] font-mono">
                    <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                      <span className="text-gray-400 block">DIGITAL OBJECT ID (DOI)</span>
                      <span className="text-white font-bold">10.4716/pamoja.sdg16.{activeModalItem.id}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                      <span className="text-gray-400 block">VERIFIED SHASUM</span>
                      <span className="text-[#00C4CC] font-bold truncate block">sha256-a78b9...e49</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-[8.5px] text-gray-300">
                    <span className="text-white font-bold block mb-0.5">Public Licensing Terms</span>
                    <span>Distributed under Creative Commons CC-BY-NC 4.0 International. Free for educational, community mediation, and research empowerment.</span>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Bottom Action Strip */}
            <div className="flex items-center justify-between border-t border-white/10 pt-2.5 shrink-0">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownload(activeModalItem)}
                  className="px-3 py-1.5 rounded-xl bg-[#00C4CC] hover:bg-white text-black font-black text-[9px] sm:text-[10px] uppercase transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Full Asset ({activeModalItem.size})</span>
                </button>

                <button
                  onClick={() => toggleBookmark(activeModalItem.id, activeModalItem.title)}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-[9px] sm:text-[10px] uppercase transition-all flex items-center gap-1 cursor-pointer"
                >
                  {bookmarkedIds.has(activeModalItem.id) ? (
                    <>
                      <BookmarkCheck className="w-3.5 h-3.5 text-[#E5B80B]" />
                      <span>Saved on Shelf</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>Save to Shelf</span>
                    </>
                  )}
                </button>
              </div>

              <button
                onClick={() => setActiveModalItem(null)}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white text-[9px] font-bold cursor-pointer"
              >
                Close Viewer
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#005587] text-white px-3.5 py-2 rounded-xl shadow-2xl border border-[#00C4CC]/50 text-xs font-medium flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-[#00C4CC]" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
};
