// @ts-nocheck
import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Search,
  Bookmark,
  Bell,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Users,
  Plus,
  Edit3,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  ExternalLink,
  RotateCcw,
  Layers,
  ShieldCheck,
  Info,
  SlidersHorizontal,
  UserCheck,
  Check,
  Award,
  Music,
  Trophy,
  Cpu,
  Wrench,
  Briefcase,
  Compass,
  Send,
  Eye,
  CalendarPlus,
} from 'lucide-react';

/**
 * ============================================================================
 * CAMPUSCONNECT — LPU INT335 DESIGN THINKING APPLICATION
 * Project: Too Many Posters, Too Little Signal – Campus Event Discovery & Clash Management
 * Institution: Lovely Professional University (LPU), India (INT335)
 * Note: All sample events, student profiles, statistics, and reminder triggers
 *       are demonstration/local data persisted in browser localStorage.
 * ============================================================================
 */

const STORAGE_KEY = 'campusconnect_lpu_int335_v1';

const CATEGORIES = [
  'Technology',
  'Workshops',
  'Cultural',
  'Sports',
  'Music',
  'Entrepreneurship',
  'Competitions',
  'Clubs and Societies',
];

const CATEGORY_META = {
  Technology: { icon: Cpu, badge: 'bg-indigo-50 text-indigo-700 border-indigo-200', accent: 'from-indigo-600 via-blue-600 to-violet-600' },
  Workshops: { icon: Wrench, badge: 'bg-violet-50 text-violet-700 border-violet-200', accent: 'from-violet-600 via-purple-600 to-indigo-600' },
  Cultural: { icon: Sparkles, badge: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200', accent: 'from-purple-600 via-fuchsia-600 to-indigo-600' },
  Sports: { icon: Trophy, badge: 'bg-blue-50 text-blue-700 border-blue-200', accent: 'from-blue-600 via-indigo-600 to-cyan-600' },
  Music: { icon: Music, badge: 'bg-purple-50 text-purple-700 border-purple-200', accent: 'from-indigo-700 via-purple-600 to-pink-600' },
  Entrepreneurship: { icon: Briefcase, badge: 'bg-sky-50 text-sky-700 border-sky-200', accent: 'from-blue-700 via-indigo-600 to-violet-600' },
  Competitions: { icon: Award, badge: 'bg-amber-50 text-amber-800 border-amber-200', accent: 'from-indigo-600 via-blue-600 to-purple-700' },
  'Clubs and Societies': { icon: Users, badge: 'bg-emerald-50 text-emerald-700 border-emerald-200', accent: 'from-teal-600 via-blue-600 to-indigo-700' },
};

// Generates crisp, zero-external-failure SVG data URL artwork for sample events & presets
function makeEventArtwork(title, subtitle, gradientColors, motif = 'tech') {
  const [c1, c2] = gradientColors;
  const motifs = {
    tech: `<circle cx="620" cy="110" r="88" fill="rgba(255,255,255,0.12)"/><rect x="550" y="55" width="140" height="90" rx="14" fill="rgba(255,255,255,0.14)" stroke="rgba(255,255,255,0.35)" stroke-width="2"/><circle cx="590" cy="100" r="14" fill="#fff"/><path d="M618 86h52M618 112h36" stroke="#fff" stroke-width="5" stroke-linecap="round"/>`,
    stage: `<circle cx="630" cy="105" r="95" fill="rgba(255,255,255,0.12)"/><path d="M540 165 Q620 65 700 165 Z" fill="rgba(255,255,255,0.18)"/><circle cx="620" cy="72" r="14" fill="#fde047"/>`,
    pitch: `<rect x="545" y="52" width="145" height="105" rx="14" fill="rgba(255,255,255,0.14)"/><path d="M572 132 L604 102 L628 118 L664 78" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="664" cy="78" r="7" fill="#fde047"/>`,
    arena: `<circle cx="625" cy="108" r="86" fill="rgba(255,255,255,0.14)"/><ellipse cx="625" cy="108" rx="64" ry="26" fill="none" stroke="#fff" stroke-width="4" transform="rotate(-24 625 108)"/><circle cx="625" cy="108" r="12" fill="#fff"/>`,
    music: `<circle cx="625" cy="105" r="88" fill="rgba(255,255,255,0.13)"/><path d="M598 135 V76 L652 66 V125" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/><circle cx="586" cy="136" r="13" fill="#fff"/><circle cx="640" cy="126" r="13" fill="#fff"/>`,
  };
  const motifSvg = motifs[motif] || motifs.tech;
  const safeTitle = String(title || 'Campus Event').slice(0, 44).replace(/[<>&"]/g, '');
  const safeSub = String(subtitle || 'LPU Sample Event').slice(0, 56).replace(/[<>&"]/g, '');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="420" viewBox="0 0 800 420">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${c1}"/>
        <stop offset="100%" stop-color="${c2}"/>
      </linearGradient>
    </defs>
    <rect width="800" height="420" rx="20" fill="url(#bg)"/>
    <circle cx="110" cy="350" r="130" fill="rgba(255,255,255,0.08)"/>
    <circle cx="720" cy="340" r="150" fill="rgba(255,255,255,0.07)"/>
    ${motifSvg}
    <rect x="44" y="44" width="196" height="32" rx="16" fill="rgba(255,255,255,0.2)"/>
    <text x="142" y="65" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#ffffff" text-anchor="middle" letter-spacing="1">LPU DEMO EVENT</text>
    <text x="44" y="238" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="800" fill="#ffffff">${safeTitle}</text>
    <text x="44" y="276" font-family="system-ui, -apple-system, sans-serif" font-size="19" font-weight="500" fill="rgba(255,255,255,0.88)">${safeSub}</text>
    <text x="44" y="368" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="rgba(255,255,255,0.75)">CampusConnect • INT335 Design Thinking Showcase</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

const COVER_PRESETS = [
  { id: 'preset-tech', label: 'Indigo Tech Grid', url: makeEventArtwork('Tech & Innovation Lab', 'Hands-on student build & demo session', ['#4F46E5', '#2563EB'], 'tech') },
  { id: 'preset-stage', label: 'Violet Stage Spotlight', url: makeEventArtwork('Campus Stage & Culture', 'Student showcase & creative performances', ['#7C3AED', '#4F46E5'], 'stage') },
  { id: 'preset-pitch', label: 'Electric Blue Strategy', url: makeEventArtwork('Founder & Pitch Forum', 'Ideas, prototypes & mentorship', ['#2563EB', '#7C3AED'], 'pitch') },
  { id: 'preset-arena', label: 'Blue-Indigo Arena', url: makeEventArtwork('Campus Sports & Trials', 'Open matches & team check-ins', ['#1D4ED8', '#4338CA'], 'arena') },
  { id: 'preset-music', label: 'Purple Soundwave', url: makeEventArtwork('Acoustic & Band Session', 'Live campus melodies & jam', ['#6D28D9', '#2563EB'], 'music') },
];

// Anchor sample dates relative to November 25, 2026 so Today, Next 7 Days, and Calendar work richly
function createInitialEvents() {
  return [
    {
      id: 'evt-ai-innovation',
      title: 'AI & Innovation Workshop',
      category: 'Workshops',
      date: '2026-11-25',
      startTime: '14:00',
      endTime: '16:00',
      venue: 'Block 34, Room 204',
      organiser: 'LPU AI & Cloud Collective (Demo)',
      featured: true,
      popularity: 96,
      createdAt: '2026-11-18T10:00:00Z',
      description:
        'Sample hands-on workshop exploring practical prompt workflows, rapid prototyping, and responsible AI tools for student projects.',
      registrationInfo: 'Open to LPU students (Demo pass — no real seat reservation). Bring a charged laptop.',
      registrationLink: 'https://example.edu/campusconnect/demo-ai-workshop',
      contactInfo: 'demo-aiclub@campusconnect.local • Block 34 Desk',
      instructions: 'Arrive 10 minutes early for lab check-in and carry your student ID card.',
      image: makeEventArtwork('AI & Innovation Workshop', 'Today • 2:00 PM – 4:00 PM • Block 34, Room 204', ['#4F46E5', '#7C3AED'], 'tech'),
    },
    {
      id: 'evt-coding-comp',
      title: 'Coding Competition',
      category: 'Competitions',
      date: '2026-11-25',
      startTime: '15:00',
      endTime: '17:00',
      venue: 'Block 29, Lab 102',
      organiser: 'CodeCraft Student Chapter (Demo)',
      featured: true,
      popularity: 92,
      createdAt: '2026-11-19T09:30:00Z',
      description:
        'Sample timed algorithmic problem-solving round designed for pairs and solo participants. Intentionally scheduled to overlap with the afternoon workshop for demo clash testing.',
      registrationInfo: 'Sample entry registration open via demo link; team size 1–2.',
      registrationLink: 'https://example.edu/campusconnect/demo-coding-comp',
      contactInfo: 'demo-codecraft@campusconnect.local',
      instructions: 'Keep your code editor ready; no external generative shortcuts during timed rounds.',
      image: makeEventArtwork('Coding Competition', 'Today • 3:00 PM – 5:00 PM • Block 29, Lab 102', ['#2563EB', '#4F46E5'], 'tech'),
    },
    {
      id: 'evt-web-bootcamp',
      title: 'Web Development Bootcamp',
      category: 'Technology',
      date: '2026-11-27',
      startTime: '10:30',
      endTime: '13:00',
      venue: 'Block 34, Auditorium B',
      organiser: 'FullStack Campus Guild (Demo)',
      featured: true,
      popularity: 94,
      createdAt: '2026-11-20T14:15:00Z',
      description:
        'Sample interactive bootcamp covering modern component architecture, responsive UI patterns, and clean state handling.',
      registrationInfo: 'Free sample registration; starter template provided at check-in.',
      registrationLink: 'https://example.edu/campusconnect/demo-web-bootcamp',
      contactInfo: 'demo-fullstack@campusconnect.local',
      instructions: 'Install a modern code editor beforehand and check calendar clashes before saving.',
      image: makeEventArtwork('Web Development Bootcamp', 'Fri, 27 Nov • 10:30 AM – 1:00 PM • Block 34 Aud B', ['#4F46E5', '#2563EB'], 'tech'),
    },
    {
      id: 'evt-startup-pitch',
      title: 'Startup Pitch Competition',
      category: 'Entrepreneurship',
      date: '2026-11-27',
      startTime: '14:30',
      endTime: '17:00',
      venue: 'Uni Mall Seminar Hall',
      organiser: 'LPU E-Cell & Founders Hub (Demo)',
      featured: true,
      popularity: 89,
      createdAt: '2026-11-21T11:00:00Z',
      description:
        'Sample 4-minute student pitch showcase focused on campus and everyday problems with structured mentor feedback.',
      registrationInfo: 'Demo pitch deck submission form (sample link).',
      registrationLink: 'https://example.edu/campusconnect/demo-startup-pitch',
      contactInfo: 'demo-ecell@campusconnect.local',
      instructions: 'Keep slides crisp and focus on real user evidence and clear problem framing.',
      image: makeEventArtwork('Startup Pitch Competition', 'Fri, 27 Nov • 2:30 PM – 5:00 PM • Uni Mall Hall', ['#7C3AED', '#2563EB'], 'pitch'),
    },
    {
      id: 'evt-dance-fest',
      title: 'Inter-College Dance Fest',
      category: 'Cultural',
      date: '2026-11-29',
      startTime: '16:00',
      endTime: '18:30',
      venue: 'Open Air Theatre (OAT)',
      organiser: 'Rhythm & Beats Cultural Crew (Demo)',
      featured: true,
      popularity: 95,
      createdAt: '2026-11-17T16:00:00Z',
      description:
        'Sample energetic choreography showcase celebrating contemporary, folk, and fusion routines on campus.',
      registrationInfo: 'Audience pass & crew slot info shown as sample data.',
      registrationLink: 'https://example.edu/campusconnect/demo-dance-fest',
      contactInfo: 'demo-cultural@campusconnect.local',
      instructions: 'Follow seating marshals and keep pathways clear around stage ramps.',
      image: makeEventArtwork('Inter-College Dance Fest', 'Sun, 29 Nov • 4:00 PM – 6:30 PM • Open Air Theatre', ['#7C3AED', '#4F46E5'], 'stage'),
    },
    {
      id: 'evt-badminton-trials',
      title: 'Badminton Open Trials',
      category: 'Sports',
      date: '2026-11-30',
      startTime: '08:00',
      endTime: '10:30',
      venue: 'Indoor Sports Complex, Court 2',
      organiser: 'Campus Athletics & Fitness Club (Demo)',
      featured: false,
      popularity: 81,
      createdAt: '2026-11-22T08:00:00Z',
      description:
        'Sample morning singles and doubles selection drills for recreational and inter-block players.',
      registrationInfo: 'Bring non-marking indoor shoes; sample sign-up sheet.',
      registrationLink: 'https://example.edu/campusconnect/demo-badminton-trials',
      contactInfo: 'demo-sports@campusconnect.local',
      instructions: 'Warm up properly before court rotation begins.',
      image: makeEventArtwork('Badminton Open Trials', 'Mon, 30 Nov • 8:00 AM – 10:30 AM • Sports Complex', ['#2563EB', '#0284C7'], 'arena'),
    },
    {
      id: 'evt-photo-exhibition',
      title: 'Photography Exhibition',
      category: 'Clubs and Societies',
      date: '2026-12-02',
      startTime: '11:00',
      endTime: '15:00',
      venue: 'Central Library Gallery',
      organiser: 'Lens & Frame Photography Society (Demo)',
      featured: false,
      popularity: 84,
      createdAt: '2026-11-22T15:20:00Z',
      description:
        'Sample curated photo walk showcase capturing architecture, candid campus life, and golden-hour light.',
      registrationInfo: 'Walk-through open during listed hours (demo schedule).',
      registrationLink: 'https://example.edu/campusconnect/demo-photo-exhibition',
      contactInfo: 'demo-lensclub@campusconnect.local',
      instructions: 'Respect quiet study zones adjacent to the gallery entrance.',
      image: makeEventArtwork('Photography Exhibition', 'Wed, 2 Dec • 11:00 AM – 3:00 PM • Library Gallery', ['#4F46E5', '#7C3AED'], 'stage'),
    },
    {
      id: 'evt-cultural-night',
      title: 'Cultural Night',
      category: 'Music',
      date: '2026-12-04',
      startTime: '17:30',
      endTime: '20:30',
      venue: 'Shanti Devi Mittal Auditorium',
      organiser: 'Harmony Music & Arts Society (Demo)',
      featured: true,
      popularity: 97,
      createdAt: '2026-11-23T12:10:00Z',
      description:
        'Sample evening musical ensembles, acoustic sets, and student band performances in a unified schedule.',
      registrationInfo: 'Sample pass details; check clash warnings before saving.',
      registrationLink: 'https://example.edu/campusconnect/demo-cultural-night',
      contactInfo: 'demo-harmony@campusconnect.local',
      instructions: 'Please silence mobile phones inside the auditorium during live sets.',
      image: makeEventArtwork('Cultural Night', 'Fri, 4 Dec • 5:30 PM – 8:30 PM • Main Auditorium', ['#6D28D9', '#2563EB'], 'music'),
    },
    {
      id: 'evt-robotics-challenge',
      title: 'Robotics Challenge',
      category: 'Competitions',
      date: '2026-12-07',
      startTime: '13:00',
      endTime: '16:30',
      venue: 'Block 38, Makerspace Arena',
      organiser: 'Mechatronics & Robotics Club (Demo)',
      featured: false,
      popularity: 88,
      createdAt: '2026-11-24T10:45:00Z',
      description:
        'Sample line-follower and obstacle navigation track challenge with live timing runs.',
      registrationInfo: 'Sample bot inspection checklist included in details.',
      registrationLink: 'https://example.edu/campusconnect/demo-robotics-challenge',
      contactInfo: 'demo-robotics@campusconnect.local',
      instructions: 'Battery safety check is required prior to arena trial runs.',
      image: makeEventArtwork('Robotics Challenge', 'Mon, 7 Dec • 1:00 PM – 4:30 PM • Block 38 Arena', ['#2563EB', '#4F46E5'], 'tech'),
    },
    {
      id: 'evt-entrepreneurship-summit',
      title: 'Entrepreneurship Summit',
      category: 'Entrepreneurship',
      date: '2026-12-10',
      startTime: '10:00',
      endTime: '13:30',
      venue: 'Uni Mall Seminar Hall',
      organiser: 'Student Venture Collective (Demo)',
      featured: false,
      popularity: 86,
      createdAt: '2026-11-24T17:00:00Z',
      description:
        'Sample panel and student case teardown on validating ideas early without overbuilding.',
      registrationInfo: 'Demo RSVP toggle available on the event card or detail view.',
      registrationLink: 'https://example.edu/campusconnect/demo-ent-summit',
      contactInfo: 'demo-ventures@campusconnect.local',
      instructions: 'Bring questions on customer discovery and lean MVPs.',
      image: makeEventArtwork('Entrepreneurship Summit', 'Thu, 10 Dec • 10:00 AM – 1:30 PM • Uni Mall Hall', ['#4F46E5', '#7C3AED'], 'pitch'),
    },
  ];
}

const DEMO_PROFILES = [
  { id: 'student-1', name: 'Rahul Yadav (Demo)', role: 'B.Tech CSE • 2nd Year', regTag: 'LPU Demo Profile' },
  { id: 'student-2', name: 'Ananya Verma (Demo)', role: 'B.Design / Clubs • 3rd Year', regTag: 'LPU Demo Profile' },
  { id: 'organiser-1', name: 'Rohan Nair (Club Lead Demo)', role: 'Student Club Organiser', regTag: 'Organiser Mode' },
];

function createInitialState() {
  const todayStr = '2026-11-25';
  return {
    events: createInitialEvents(),
    savedIds: ['evt-ai-innovation', 'evt-coding-comp', 'evt-web-bootcamp'],
    registeredIds: ['evt-ai-innovation'],
    reminders: {
      'evt-ai-innovation': { preset: '1h', customLabel: '' },
      'evt-coding-comp': { preset: '1h', customLabel: '' },
      'evt-web-bootcamp': { preset: '1d', customLabel: '' },
    },
    preferences: {
      inAppAlerts: true,
      clashWarnings: true,
      dailyDigest: true,
    },
    notifications: [
      {
        id: 'notif-1',
        type: 'clash',
        title: 'Schedule Clash Detected Today (2:00 PM–5:00 PM)',
        message: 'AI & Innovation Workshop (14:00–16:00) overlaps with Coding Competition (15:00–17:00) on 2026-11-25.',
        time: 'Simulated Demo Alert',
        read: false,
      },
      {
        id: 'notif-2',
        type: 'reminder',
        title: 'Reminder Set: AI & Innovation Workshop',
        message: 'Simulated 1-hour-before reminder configured for today at 14:00 (Block 34, Room 204).',
        time: 'Simulated Demo Alert',
        read: false,
      },
      {
        id: 'notif-3',
        type: 'digest',
        title: '2 Sample Events Happening Today (25 Nov 2026)',
        message: 'Check your saved schedule in Smart Calendar to review overlapping timings.',
        time: 'Local Demo Feed',
        read: true,
      },
    ],
    activeUser: DEMO_PROFILES[0],
    referenceDate: todayStr,
  };
}

// Parse HH:MM into minutes since midnight; returns null if invalid
function parseTimeToMinutes(timeStr) {
  if (!timeStr || typeof timeStr !== 'string') return null;
  const parts = timeStr.split(':');
  if (parts.length !== 2) return null;
  const h = Number(parts[0]);
  const m = Number(parts[1]);
  if (Number.isNaN(h) || Number.isNaN(m) || h < 0 || h > 23 || m < 0 || m > 59) return null;
  return h * 60 + m;
}

// Format 24h HH:MM cleanly as 12h time (e.g., "14:00" -> "2:00 PM")
function formatTime12h(timeStr) {
  const mins = parseTimeToMinutes(timeStr);
  if (mins === null) return timeStr || '';
  const h24 = Math.floor(mins / 60);
  const m = mins % 60;
  const period = h24 >= 12 ? 'PM' : 'AM';
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(m).padStart(2, '0')} ${period}`;
}

function formatReadableDate(dateStr) {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-').map(Number);
  if (!y || !m || !d) return dateStr;
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

// Compute real overlapping pairs and clashing event IDs among saved events
function computeScheduleClashes(savedEvents) {
  const pairs = [];
  const clashingIds = new Set();

  for (let i = 0; i < savedEvents.length; i++) {
    for (let j = i + 1; j < savedEvents.length; j++) {
      const a = savedEvents[i];
      const b = savedEvents[j];
      if (!a.date || !b.date || a.date !== b.date) continue;

      const aStart = parseTimeToMinutes(a.startTime);
      const aEnd = parseTimeToMinutes(a.endTime);
      const bStart = parseTimeToMinutes(b.startTime);
      const bEnd = parseTimeToMinutes(b.endTime);

      if (aStart === null || aEnd === null || bStart === null || bEnd === null) continue;
      // Touching boundaries (aEnd === bStart) do NOT overlap
      if (aStart < bEnd && bStart < aEnd) {
        const overlapStart = Math.max(aStart, bStart);
        const overlapEnd = Math.min(aEnd, bEnd);
        const toHHMM = (total) =>
          `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;

        pairs.push({
          id: `${a.id}__${b.id}`,
          date: a.date,
          eventA: a,
          eventB: b,
          overlapWindow: `${formatTime12h(toHHMM(overlapStart))} – ${formatTime12h(toHHMM(overlapEnd))}`,
        });
        clashingIds.add(a.id);
        clashingIds.add(b.id);
      }
    }
  }

  return { pairs, clashingIds };
}

export default function App() {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.events)) {
          return { ...createInitialState(), ...parsed };
        }
      }
    } catch (err) {
      console.error('Failed to read localStorage:', err);
    }
    return createInitialState();
  });

  const [activePage, setActivePage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [toast, setToast] = useState(null);

  // Explore Events filter & sort state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [dateFilter, setDateFilter] = useState('all');
  const [venueFilter, setVenueFilter] = useState('All');
  const [sortBy, setSortBy] = useState('upcoming');

  // Saved Events tab state ('upcoming' | 'past')
  const [savedTab, setSavedTab] = useState('upcoming');

  // Smart Calendar state (anchored to Nov 2026 where sample events live)
  const [calYear, setCalYear] = useState(2026);
  const [calMonth, setCalMonth] = useState(10); // 0-indexed: 10 = November
  const [selectedDateStr, setSelectedDateStr] = useState('2026-11-25');

  // Organiser Form state (Create / Edit)
  const emptyForm = {
    id: null,
    title: '',
    category: 'Technology',
    date: '2026-11-28',
    startTime: '11:00',
    endTime: '12:30',
    venue: 'Block 34, Room 105',
    organiser: 'LPU Student Organiser (Demo)',
    description: '',
    registrationInfo: 'Sample registration open for demo testing.',
    registrationLink: 'https://example.edu/campusconnect/demo-event',
    contactInfo: 'demo-organiser@campusconnect.local',
    instructions: 'Check schedule clash indicator before saving.',
    image: COVER_PRESETS[0].url,
    featured: false,
  };
  const [orgForm, setOrgForm] = useState(emptyForm);
  const [orgFeedback, setOrgFeedback] = useState(null);
  const fileInputRef = useRef(null);

  // Persist state to localStorage safely
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      console.error('Failed to persist state:', err);
    }
  }, [state]);

  const showToast = (message, tone = 'info') => {
    setToast({ id: Date.now(), message, tone });
  };

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(t);
  }, [toast]);

  const savedEvents = useMemo(
    () => state.events.filter((ev) => state.savedIds.includes(ev.id)),
    [state.events, state.savedIds]
  );

  const { pairs: clashPairs, clashingIds } = useMemo(
    () => computeScheduleClashes(savedEvents),
    [savedEvents]
  );

  const selectedEvent = useMemo(
    () => state.events.find((ev) => ev.id === selectedEventId) || null,
    [state.events, selectedEventId]
  );

  const venues = useMemo(() => {
    const set = new Set(state.events.map((e) => e.venue).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, [state.events]);

  const todayEvents = useMemo(
    () => state.events.filter((e) => e.date === state.referenceDate),
    [state.events, state.referenceDate]
  );

  const upcomingSaved = useMemo(
    () => savedEvents.filter((e) => e.date >= state.referenceDate),
    [savedEvents, state.referenceDate]
  );

  const pastSaved = useMemo(
    () => savedEvents.filter((e) => e.date < state.referenceDate),
    [savedEvents, state.referenceDate]
  );

  const unreadNotifications = useMemo(
    () => state.notifications.filter((n) => !n.read).length,
    [state.notifications]
  );

  // Filtered & sorted events for Explore page
  const filteredEvents = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = state.events.filter((ev) => {
      if (selectedCategory !== 'All' && ev.category !== selectedCategory) return false;
      if (venueFilter !== 'All' && ev.venue !== venueFilter) return false;

      if (dateFilter === 'today' && ev.date !== state.referenceDate) return false;
      if (dateFilter === 'next7') {
        const start = new Date(`${state.referenceDate}T00:00:00Z`);
        const end = new Date(start.getTime() + 7 * 86400000);
        const cur = new Date(`${ev.date}T00:00:00Z`);
        if (cur < start || cur > end) return false;
      }
      if (dateFilter === 'thisMonth') {
        const prefix = state.referenceDate.slice(0, 7);
        if (!ev.date.startsWith(prefix)) return false;
      }

      if (q) {
        const hay = `${ev.title} ${ev.organiser} ${ev.venue} ${ev.category} ${ev.description}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    const sorted = [...list];
    if (sortBy === 'upcoming') {
      sorted.sort((a, b) => `${a.date} ${a.startTime}`.localeCompare(`${b.date} ${b.startTime}`));
    } else if (sortBy === 'newest') {
      sorted.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
    } else if (sortBy === 'popularity') {
      sorted.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    }
    return sorted;
  }, [state.events, searchQuery, selectedCategory, dateFilter, venueFilter, sortBy, state.referenceDate]);

  // Actions
  const handleToggleSave = (eventId) => {
    setState((prev) => {
      const exists = prev.savedIds.includes(eventId);
      const ev = prev.events.find((x) => x.id === eventId);
      const nextSaved = exists
        ? prev.savedIds.filter((id) => id !== eventId)
        : [...prev.savedIds, eventId];

      const nextReminders = { ...prev.reminders };
      if (!exists && !nextReminders[eventId]) {
        nextReminders[eventId] = { preset: '1h', customLabel: '' };
      }

      const nextSavedEvents = prev.events.filter((x) => nextSaved.includes(x.id));
      const { pairs: newClashes } = computeScheduleClashes(nextSavedEvents);
      const nextNotifications = [...prev.notifications];

      if (!exists && ev && prev.preferences.clashWarnings) {
        const matchingClash = newClashes.find(
          (p) => p.eventA.id === eventId || p.eventB.id === eventId
        );
        if (matchingClash) {
          const other = matchingClash.eventA.id === eventId ? matchingClash.eventB : matchingClash.eventA;
          nextNotifications.unshift({
            id: `notif-${Date.now()}`,
            type: 'clash',
            title: 'Schedule Clash Warning',
            message: `"${ev.title}" overlaps with "${other.title}" on ${formatReadableDate(ev.date)} (${matchingClash.overlapWindow}).`,
            time: 'Just now • Local Clash Check',
            read: false,
          });
        }
      }

      showToast(
        exists
          ? `Removed "${ev?.title || 'event'}" from Saved Events`
          : `Saved "${ev?.title || 'event'}" to your schedule`,
        exists ? 'info' : 'success'
      );

      return {
        ...prev,
        savedIds: nextSaved,
        reminders: nextReminders,
        notifications: nextNotifications,
      };
    });
  };

  const handleToggleRegister = (eventId) => {
    setState((prev) => {
      const isReg = prev.registeredIds.includes(eventId);
      const ev = prev.events.find((x) => x.id === eventId);
      const nextReg = isReg
        ? prev.registeredIds.filter((id) => id !== eventId)
        : [...prev.registeredIds, eventId];
      const nextSaved = !isReg && !prev.savedIds.includes(eventId)
        ? [...prev.savedIds, eventId]
        : prev.savedIds;

      const nextNotifications = [...prev.notifications];
      if (!isReg && ev && prev.preferences.inAppAlerts) {
        nextNotifications.unshift({
          id: `notif-${Date.now()}`,
          type: 'registration',
          title: 'Demo Interest Registered',
          message: `Recorded demo interest for "${ev.title}" (${formatReadableDate(ev.date)}, ${formatTime12h(ev.startTime)}).`,
          time: 'Just now • Local Demo',
          read: false,
        });
      }

      showToast(
        isReg
          ? `Cancelled demo registration for "${ev?.title || 'event'}"`
          : `Demo interest registered & saved for "${ev?.title || 'event'}"`,
        'success'
      );

      return {
        ...prev,
        registeredIds: nextReg,
        savedIds: nextSaved,
        notifications: nextNotifications,
      };
    });
  };

  const handleReminderChange = (eventId, preset, customLabel = '') => {
    setState((prev) => {
      const ev = prev.events.find((x) => x.id === eventId);
      const labelMap = {
        none: 'No reminder',
        '1d': '1 day before',
        '1h': '1 hour before',
        custom: customLabel.trim() || 'Custom reminder',
      };
      const nextReminders = {
        ...prev.reminders,
        [eventId]: { preset, customLabel },
      };
      const nextNotifications = [...prev.notifications];
      if (preset !== 'none' && ev && prev.preferences.inAppAlerts) {
        nextNotifications.unshift({
          id: `notif-${Date.now()}`,
          type: 'reminder',
          title: `Reminder Updated: ${ev.title}`,
          message: `Set to "${labelMap[preset]}" (simulated in-app reminder for LPU demo).`,
          time: 'Just now • Simulated',
          read: false,
        });
      }
      showToast(`Reminder set: ${labelMap[preset]}`, 'success');
      return {
        ...prev,
        reminders: nextReminders,
        notifications: nextNotifications,
      };
    });
  };

  const handleSimulateReminderNow = (ev) => {
    setState((prev) => ({
      ...prev,
      notifications: [
        {
          id: `notif-sim-${Date.now()}`,
          type: 'reminder',
          title: `[Simulated Reminder] ${ev.title}`,
          message: `${formatReadableDate(ev.date)} • ${formatTime12h(ev.startTime)}–${formatTime12h(ev.endTime)} at ${ev.venue}. (In-app demo simulation—no external push/SMS sent.)`,
          time: 'Simulated Now',
          read: false,
        },
        ...prev.notifications,
      ],
    }));
    showToast(`Simulated in-app reminder triggered for "${ev.title}"`, 'success');
  };

  const handleMarkAllRead = () => {
    setState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) => ({ ...n, read: true })),
    }));
    showToast('All notifications marked as read', 'info');
  };

  const handleClearReadNotifications = () => {
    setState((prev) => ({
      ...prev,
      notifications: prev.notifications.filter((n) => !n.read),
    }));
    showToast('Cleared read notifications', 'info');
  };

  const handleTogglePreference = (key) => {
    setState((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: !prev.preferences[key],
      },
    }));
  };

  // Organiser CRUD handlers
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setOrgFeedback({ type: 'error', text: 'Please select a valid image file (PNG, JPG, WebP).' });
      return;
    }
    if (file.size > 1.5 * 1024 * 1024) {
      setOrgFeedback({ type: 'error', text: 'Image must be under 1.5 MB for browser localStorage.' });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setOrgForm((prev) => ({ ...prev, image: reader.result }));
      setOrgFeedback({ type: 'success', text: `Loaded uploaded image "${file.name}" into local preview.` });
    };
    reader.onerror = () => {
      setOrgFeedback({ type: 'error', text: 'Could not read image file. Try a preset cover instead.' });
    };
    reader.readAsDataURL(file);
  };

  const handleOrganiserSubmit = (e) => {
    e.preventDefault();
    setOrgFeedback(null);

    const title = orgForm.title.trim();
    const venue = orgForm.venue.trim();
    const organiser = orgForm.organiser.trim();
    const description = orgForm.description.trim();

    if (!title || title.length < 3) {
      setOrgFeedback({ type: 'error', text: 'Please enter an event title (at least 3 characters).' });
      return;
    }
    if (!orgForm.date) {
      setOrgFeedback({ type: 'error', text: 'Please select a valid event date.' });
      return;
    }
    const sMin = parseTimeToMinutes(orgForm.startTime);
    const eMin = parseTimeToMinutes(orgForm.endTime);
    if (sMin === null || eMin === null || eMin <= sMin) {
      setOrgFeedback({ type: 'error', text: 'End time must be later than start time.' });
      return;
    }
    if (!venue) {
      setOrgFeedback({ type: 'error', text: 'Please enter a campus venue or block.' });
      return;
    }
    if (!organiser) {
      setOrgFeedback({ type: 'error', text: 'Please enter an organiser or club name.' });
      return;
    }
    if (!description || description.length < 10) {
      setOrgFeedback({ type: 'error', text: 'Please provide a brief description (at least 10 characters).' });
      return;
    }

    const finalOrganiser = organiser.toLowerCase().includes('demo')
      ? organiser
      : `${organiser} (Demo)`;

    if (orgForm.id) {
      setState((prev) => ({
        ...prev,
        events: prev.events.map((ev) =>
          ev.id === orgForm.id
            ? {
                ...ev,
                title,
                category: orgForm.category,
                date: orgForm.date,
                startTime: orgForm.startTime,
                endTime: orgForm.endTime,
                venue,
                organiser: finalOrganiser,
                description,
                registrationInfo: orgForm.registrationInfo.trim() || 'Sample registration details.',
                registrationLink: orgForm.registrationLink.trim() || 'https://example.edu/campusconnect/demo-event',
                contactInfo: orgForm.contactInfo.trim() || 'demo-contact@campusconnect.local',
                instructions: orgForm.instructions.trim() || 'Follow campus event guidelines.',
                image: orgForm.image || COVER_PRESETS[0].url,
                featured: Boolean(orgForm.featured),
              }
            : ev
        ),
      }));
      setOrgFeedback({ type: 'success', text: `Updated "${title}" in localStorage.` });
      showToast(`Updated "${title}"`, 'success');
    } else {
      const newEvt = {
        id: `evt-custom-${Date.now()}`,
        title,
        category: orgForm.category,
        date: orgForm.date,
        startTime: orgForm.startTime,
        endTime: orgForm.endTime,
        venue,
        organiser: finalOrganiser,
        featured: Boolean(orgForm.featured),
        popularity: 78,
        createdAt: new Date().toISOString(),
        description,
        registrationInfo: orgForm.registrationInfo.trim() || 'Sample registration details.',
        registrationLink: orgForm.registrationLink.trim() || 'https://example.edu/campusconnect/demo-event',
        contactInfo: orgForm.contactInfo.trim() || 'demo-contact@campusconnect.local',
        instructions: orgForm.instructions.trim() || 'Follow campus event guidelines.',
        image: orgForm.image || COVER_PRESETS[0].url,
      };
      setState((prev) => ({
        ...prev,
        events: [newEvt, ...prev.events],
      }));
      setOrgFeedback({ type: 'success', text: `Published "${title}" to local Explore Events feed.` });
      showToast(`Published "${title}"`, 'success');
    }

    setOrgForm(emptyForm);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleEditEvent = (ev) => {
    setOrgForm({
      id: ev.id,
      title: ev.title,
      category: ev.category,
      date: ev.date,
      startTime: ev.startTime,
      endTime: ev.endTime,
      venue: ev.venue,
      organiser: ev.organiser,
      description: ev.description,
      registrationInfo: ev.registrationInfo || '',
      registrationLink: ev.registrationLink || '',
      contactInfo: ev.contactInfo || '',
      instructions: ev.instructions || '',
      image: ev.image || COVER_PRESETS[0].url,
      featured: Boolean(ev.featured),
    });
    setOrgFeedback({ type: 'info', text: `Editing "${ev.title}". Update fields and save changes.` });
    setActivePage('organiser');
  };

  const handleDeleteEvent = (eventId) => {
    const ev = state.events.find((x) => x.id === eventId);
    setState((prev) => ({
      ...prev,
      events: prev.events.filter((x) => x.id !== eventId),
      savedIds: prev.savedIds.filter((id) => id !== eventId),
      registeredIds: prev.registeredIds.filter((id) => id !== eventId),
    }));
    if (orgForm.id === eventId) setOrgForm(emptyForm);
    if (selectedEventId === eventId) setSelectedEventId(null);
    showToast(`Deleted "${ev?.title || 'event'}" from local demo data`, 'info');
  };

  const handleResetDemoData = () => {
    const fresh = createInitialState();
    setState(fresh);
    setCalYear(2026);
    setCalMonth(10);
    setSelectedDateStr(fresh.referenceDate);
    setSearchQuery('');
    setSelectedCategory('All');
    setDateFilter('all');
    setVenueFilter('All');
    setOrgForm(emptyForm);
    setOrgFeedback(null);
    showToast('Reset all CampusConnect demo data & preferences', 'success');
  };

  const navigateTo = (page) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calendar grid helper
  const calendarCells = useMemo(() => {
    const firstDayOfMonth = new Date(Date.UTC(calYear, calMonth, 1));
    const startWeekday = firstDayOfMonth.getUTCDay(); // 0 = Sun
    const daysInMonth = new Date(Date.UTC(calYear, calMonth + 1, 0)).getUTCDate();

    const cells = [];
    for (let i = 0; i < startWeekday; i++) {
      cells.push({ day: null, dateStr: null });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      cells.push({ day: d, dateStr });
    }
    return cells;
  }, [calYear, calMonth]);

  const monthTitle = useMemo(() => {
    const dt = new Date(Date.UTC(calYear, calMonth, 1));
    return dt.toLocaleDateString('en-IN', { month: 'long', year: 'numeric', timeZone: 'UTC' });
  }, [calYear, calMonth]);

  const handlePrevMonth = () => {
    if (calMonth === 0) {
      setCalYear((y) => y - 1);
      setCalMonth(11);
    } else {
      setCalMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (calMonth === 11) {
      setCalYear((y) => y + 1);
      setCalMonth(0);
    } else {
      setCalMonth((m) => m + 1);
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'explore', label: 'Explore Events' },
    { id: 'calendar', label: 'Calendar' },
    { id: 'saved', label: 'Saved & Reminders' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'organiser', label: 'Organiser' },
    { id: 'about', label: 'About' },
  ];

  // Reusable Event Card component
  const EventCard = ({ ev, compact = false }) => {
    const isSaved = state.savedIds.includes(ev.id);
    const isReg = state.registeredIds.includes(ev.id);
    const hasClash = isSaved && clashingIds.has(ev.id);
    const catMeta = CATEGORY_META[ev.category] || CATEGORY_META.Technology;
    const CatIcon = catMeta.icon;

    return (
      <article
        className={`group rounded-2xl bg-white border transition-all duration-200 overflow-hidden flex flex-col justify-between ${
          hasClash
            ? 'border-red-400 ring-2 ring-red-100 shadow-sm'
            : 'border-slate-200/90 hover:border-indigo-300 shadow-xs hover:shadow-md'
        }`}
      >
        <div>
          <div className="relative h-44 w-full overflow-hidden bg-slate-100">
            <img
              src={ev.image}
              alt={ev.title}
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
            />
            <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border backdrop-blur-xs ${catMeta.badge}`}
              >
                <CatIcon className="w-3.5 h-3.5" />
                {ev.category}
              </span>
              {ev.featured && (
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-900/80 text-white">
                  Featured Demo
                </span>
              )}
            </div>
            {hasClash && (
              <div className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-red-600 text-white shadow-sm">
                <AlertTriangle className="w-3.5 h-3.5" />
                Clash
              </div>
            )}
          </div>

          <div className="p-5">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-lg font-bold text-slate-900 leading-snug line-clamp-1">
                {ev.title}
              </h3>
            </div>
            <p className="text-xs font-medium text-indigo-600 mt-1 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{ev.organiser}</span>
            </p>

            {!compact && (
              <p className="mt-2.5 text-sm text-slate-600 line-clamp-2">
                {ev.description}
              </p>
            )}

            <div className="mt-3.5 space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span className="font-medium text-slate-800">{formatReadableDate(ev.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-violet-600 shrink-0" />
                <span>
                  {formatTime12h(ev.startTime)} – {formatTime12h(ev.endTime)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span className="truncate">{ev.venue}</span>
              </div>
            </div>

            {hasClash && (
              <div className="mt-3 rounded-xl bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-800 font-medium flex items-center justify-between gap-2">
                <span>Overlaps with another saved event</span>
                <button
                  type="button"
                  onClick={() => navigateTo('calendar')}
                  className="underline font-bold hover:text-red-950 shrink-0"
                >
                  Review
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="px-5 pb-5 pt-1 flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleToggleSave(ev.id)}
            className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold border transition cursor-pointer ${
              isSaved
                ? 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-indigo-600 text-indigo-600' : ''}`} />
            {isSaved ? 'Saved' : 'Save'}
          </button>

          <button
            type="button"
            onClick={() => setSelectedEventId(ev.id)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 hover:opacity-95 transition shadow-xs cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            View Details
          </button>
        </div>

        {isReg && (
          <div className="bg-emerald-50 border-t border-emerald-100 px-5 py-2 text-[11px] font-semibold text-emerald-800 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Demo Interest Registered
          </div>
        )}
      </article>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-3">
          {/* Logo & Tagline */}
          <button
            type="button"
            onClick={() => navigateTo('home')}
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 via-blue-600 to-violet-600 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-slate-900">
                  CampusConnect
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  LPU INT335 Demo
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden md:block">
                Discover Campus. Never Miss a Moment.
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const active = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigateTo(item.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer relative ${
                    active
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {item.label}
                  {item.id === 'saved' && unreadNotifications > 0 && (
                    <span className="ml-1.5 inline-flex items-center justify-center px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-violet-600 text-white">
                      {unreadNotifications}
                    </span>
                  )}
                  {item.id === 'calendar' && clashPairs.length > 0 && (
                    <span className="ml-1.5 inline-flex items-center justify-center px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-red-600 text-white">
                      {clashPairs.length}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Auth / Get Started */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setProfileModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 transition cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
              <span className="max-w-[120px] truncate">{state.activeUser.name.split(' (')[0]}</span>
            </button>
            <button
              type="button"
              onClick={() => navigateTo('dashboard')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 hover:opacity-95 shadow-xs transition cursor-pointer"
            >
              Get Started
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-label="Toggle navigation menu"
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => navigateTo(item.id)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between cursor-pointer ${
                  activePage === item.id
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{item.label}</span>
                {item.id === 'saved' && unreadNotifications > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-violet-600 text-white">
                    {unreadNotifications} alerts
                  </span>
                )}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setProfileModalOpen(true);
              }}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium text-indigo-700 bg-indigo-50/60 flex items-center gap-2 cursor-pointer"
            >
              <UserCheck className="w-4 h-4" />
              Demo Sign In / Switch Profile ({state.activeUser.name})
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* ================================================================
            1. LANDING PAGE (HOME)
           ================================================================ */}
        {activePage === 'home' && (
          <div>
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-white border-b border-slate-200/70">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 grid lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-xs font-semibold text-indigo-700">
                    <Sparkles className="w-3.5 h-3.5 text-violet-600" />
                    INT335 Design Thinking • Lovely Professional University (Sample Demo)
                  </div>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.08]">
                    Your Campus Life,{' '}
                    <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 bg-clip-text text-transparent">
                      All in One Place.
                    </span>
                  </h1>

                  <p className="text-lg sm:text-xl text-slate-600 max-w-2xl leading-relaxed">
                    Discover exciting campus events, connect with opportunities and never miss the moments that matter.
                  </p>

                  <div className="flex flex-wrap items-center gap-3.5 pt-1">
                    <button
                      type="button"
                      onClick={() => navigateTo('explore')}
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 hover:opacity-95 shadow-md shadow-indigo-500/20 transition cursor-pointer"
                    >
                      Explore Events
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => navigateTo('dashboard')}
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition cursor-pointer"
                    >
                      Get Started
                    </button>
                  </div>

                  <p className="text-xs text-slate-500 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                    Demonstration prototype with sample LPU events and local browser storage.
                  </p>
                </div>

                {/* Editorial Visual Showcase */}
                <div className="lg:col-span-5">
                  <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-violet-950 p-6 text-white shadow-xl border border-slate-800">
                    <div className="flex items-center justify-between text-xs text-indigo-200 mb-4">
                      <span className="font-semibold uppercase tracking-wider">Campus Signal Preview</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white">Demo Feed</span>
                    </div>

                    <div className="space-y-3">
                      <div className="rounded-2xl bg-white/10 backdrop-blur-xs p-4 border border-white/10">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-indigo-300">Workshops • Today</span>
                          <span className="text-xs text-slate-300">14:00 – 16:00</span>
                        </div>
                        <p className="font-bold text-base mt-1">AI & Innovation Workshop</p>
                        <p className="text-xs text-slate-300 mt-0.5">Block 34, Room 204</p>
                      </div>

                      <div className="rounded-2xl bg-red-500/15 border border-red-400/40 p-4">
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-200">
                            <AlertTriangle className="w-3.5 h-3.5 text-red-300" />
                            Overlap Detected (15:00–16:00)
                          </span>
                          <span className="text-xs text-red-200">15:00 – 17:00</span>
                        </div>
                        <p className="font-bold text-base mt-1 text-white">Coding Competition</p>
                        <p className="text-xs text-red-100/90 mt-0.5">Block 29, Lab 102 • Review before committing</p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                      <span className="text-slate-300">Saved Events: {state.savedIds.length}</span>
                      <button
                        type="button"
                        onClick={() => navigateTo('calendar')}
                        className="font-semibold text-indigo-300 hover:text-white inline-flex items-center gap-1 cursor-pointer"
                      >
                        Open Smart Calendar <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Featured Events */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
              <div className="flex flex-wrap items-end justify-between gap-4 mb-7">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                    Highlighted Demo Picks
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                    Featured Campus Events
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => navigateTo('explore')}
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1 cursor-pointer"
                >
                  Browse all events <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {state.events
                  .filter((e) => e.featured)
                  .slice(0, 3)
                  .map((ev) => (
                    <EventCard key={ev.id} ev={ev} />
                  ))}
              </div>
            </section>

            {/* Upcoming Events */}
            <section className="bg-white border-y border-slate-200/70 py-14">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-end justify-between gap-4 mb-7">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-violet-600">
                      Chronological Schedule
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                      Upcoming Events
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigateTo('calendar')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                    View Monthly Calendar
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...state.events]
                    .sort((a, b) => `${a.date} ${a.startTime}`.localeCompare(`${b.date} ${b.startTime}`))
                    .slice(0, 6)
                    .map((ev) => (
                      <EventCard key={ev.id} ev={ev} compact />
                    ))}
                </div>
              </div>
            </section>

            {/* Category Browsing Grid (All 8 Categories) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
              <div className="mb-7">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Filter by Interest
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                  Explore by Category
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {CATEGORIES.map((cat) => {
                  const meta = CATEGORY_META[cat];
                  const Icon = meta.icon;
                  const count = state.events.filter((e) => e.category === cat).length;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat);
                        navigateTo('explore');
                      }}
                      className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-indigo-300 hover:shadow-md text-left transition group cursor-pointer"
                    >
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${meta.accent} text-white flex items-center justify-center mb-3.5 group-hover:scale-105 transition`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <p className="font-bold text-sm text-slate-900">{cat}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        {count} {count === 1 ? 'demo event' : 'demo events'}
                      </p>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Clearly Labelled Demo Statistics */}
            <section className="bg-slate-900 text-white py-14">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-8">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                      Demonstration Metrics &amp; INT335 Context
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold mt-1">
                      Prototype Snapshot (Clearly Labelled Demo Data)
                    </h2>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-indigo-200">
                    Demo / Sample Figures Only
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                    <p className="text-3xl font-bold text-indigo-300">{state.events.length}</p>
                    <p className="text-sm font-semibold mt-1">Demo Campus Events</p>
                    <p className="text-xs text-slate-400 mt-1">Sample events across 8 categories in local state</p>
                  </div>
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                    <p className="text-3xl font-bold text-violet-300">{clashPairs.length}</p>
                    <p className="text-sm font-semibold mt-1">Active Demo Clash Pairs</p>
                    <p className="text-xs text-slate-400 mt-1">Calculated live from overlapping saved event times</p>
                  </div>
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                    <p className="text-3xl font-bold text-blue-300">75.6%</p>
                    <p className="text-sm font-semibold mt-1">Prior Survey Late-Info Rate</p>
                    <p className="text-xs text-slate-400 mt-1">INT335 student survey context (n = 41)</p>
                  </div>
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                    <p className="text-3xl font-bold text-emerald-300">100%</p>
                    <p className="text-sm font-semibold mt-1">Local Browser Persistence</p>
                    <p className="text-xs text-slate-400 mt-1">Saved items, reminders &amp; organiser edits stored locally</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Benefits Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Why CampusConnect
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                  Built to Cut Through Poster &amp; Chat Noise
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: Search,
                    title: 'Discover events easily',
                    desc: 'Search by event name, club, or venue and filter across categories and dates in one unified feed.',
                  },
                  {
                    icon: Bell,
                    title: 'Never miss important updates',
                    desc: 'Keep verified dates, times, venues, and instructions structured instead of buried in chat threads.',
                  },
                  {
                    icon: AlertTriangle,
                    title: 'Avoid schedule clashes',
                    desc: 'Spot overlapping saved events automatically before double-booking your afternoon or evening.',
                  },
                  {
                    icon: Bookmark,
                    title: 'Save events and get reminders',
                    desc: 'Bookmark events, log demo interest, and configure simulated in-app reminders.',
                  },
                ].map((b) => {
                  const Icon = b.icon;
                  return (
                    <div
                      key={b.title}
                      className="rounded-2xl bg-white border border-slate-200/90 p-6 shadow-xs"
                    >
                      <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-base text-slate-900">{b.title}</h3>
                      <p className="text-sm text-slate-600 mt-2 leading-relaxed">{b.desc}</p>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        )}

        {/* ================================================================
            2. EXPLORE EVENTS PAGE
           ================================================================ */}
        {activePage === 'explore' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Event Discovery • Demo Catalogue
                </span>
                <h1 className="text-3xl font-bold text-slate-900 mt-1">Explore Campus Events</h1>
                <p className="text-sm text-slate-600 mt-1">
                  Showing sample LPU demonstration events. Filter by category, date, venue, or sort order.
                </p>
              </div>
              <div className="text-xs font-semibold text-slate-600 bg-white px-3.5 py-2 rounded-xl border border-slate-200">
                {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'} matched
              </div>
            </div>

            {/* Search & Multi-Facet Filter Bar */}
            <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-4 shadow-xs">
              <div className="grid md:grid-cols-12 gap-3">
                <div className="md:col-span-6 relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by event title, club/organiser, venue, or keyword..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <select
                    aria-label="Filter by date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="all">All Dates</option>
                    <option value="today">Today (25 Nov)</option>
                    <option value="next7">Next 7 Days</option>
                    <option value="thisMonth">This Month (Nov 2026)</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <select
                    aria-label="Filter by venue"
                    value={venueFilter}
                    onChange={(e) => setVenueFilter(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {venues.map((v) => (
                      <option key={v} value={v}>
                        {v === 'All' ? 'All Venues' : v}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <select
                    aria-label="Sort events"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="upcoming">Sort: Upcoming</option>
                    <option value="newest">Sort: Newest</option>
                    <option value="popularity">Sort: Popularity</option>
                  </select>
                </div>
              </div>

              {/* Category Chips */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs font-semibold text-slate-500 mr-1 inline-flex items-center gap-1">
                  <SlidersHorizontal className="w-3.5 h-3.5" /> Category:
                </span>
                {['All', ...CATEGORIES].map((cat) => {
                  const active = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                        active
                          ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Featured Strip */}
            {selectedCategory === 'All' && dateFilter === 'all' && venueFilter === 'All' && !searchQuery && (
              <div className="rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 p-5 text-white flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-white/15 px-2.5 py-0.5 rounded-full">
                    Featured Demo Highlight
                  </span>
                  <h2 className="text-lg font-bold mt-1.5">
                    AI &amp; Innovation Workshop &amp; Coding Competition Overlap Demo
                  </h2>
                  <p className="text-xs text-indigo-100 mt-0.5">
                    Save both today&apos;s afternoon sessions to test automatic red schedule clash detection.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => navigateTo('calendar')}
                  className="px-4 py-2 rounded-xl bg-white text-indigo-700 text-xs font-bold hover:bg-indigo-50 transition cursor-pointer"
                >
                  Inspect Clash Calendar
                </button>
              </div>
            )}

            {/* Event Cards Grid or Empty State */}
            {filteredEvents.length === 0 ? (
              <div className="rounded-2xl bg-white border border-slate-200 p-12 text-center">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center mx-auto mb-3">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">No matching campus events</h3>
                <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto">
                  Try clearing your search text or resetting category, date, and venue filters.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setDateFilter('all');
                    setVenueFilter('All');
                  }}
                  className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((ev) => (
                  <EventCard key={ev.id} ev={ev} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================================================================
            3. SMART CAMPUS CALENDAR & SCHEDULE CLASH MANAGEMENT
           ================================================================ */}
        {activePage === 'calendar' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Interactive Schedule &amp; Overlap Engine
                </span>
                <h1 className="text-3xl font-bold text-slate-900 mt-1">Smart Campus Calendar</h1>
                <p className="text-sm text-slate-600 mt-1">
                  Click any date to inspect events. Overlapping time windows among your saved events are flagged automatically.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className="p-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 cursor-pointer"
                  aria-label="Previous month"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-900 min-w-[160px] text-center">
                  {monthTitle}
                </span>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="p-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 cursor-pointer"
                  aria-label="Next month"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCalYear(2026);
                    setCalMonth(10);
                    setSelectedDateStr(state.referenceDate);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-indigo-50 text-indigo-700 text-xs font-semibold hover:bg-indigo-100 cursor-pointer"
                >
                  Demo Today (25 Nov)
                </button>
              </div>
            </div>

            {/* Required Schedule Clash Warning Banner */}
            {clashPairs.length > 0 ? (
              <div className="rounded-2xl bg-red-50 border-2 border-red-300 p-5 text-red-950 shadow-xs">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div>
                      <h2 className="text-base font-bold text-red-900">
                        You have two events scheduled at the same time. Review your schedule before making a decision.
                      </h2>
                      <p className="text-xs text-red-800 mt-0.5">
                        {clashPairs.length} overlapping {clashPairs.length === 1 ? 'pair' : 'pairs'} detected across your saved events:
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3">
                      {clashPairs.map((pair) => (
                        <div
                          key={pair.id}
                          className="rounded-xl bg-white border border-red-200 p-3.5 space-y-2"
                        >
                          <div className="flex items-center justify-between text-xs font-bold text-red-700">
                            <span>{formatReadableDate(pair.date)}</span>
                            <span className="px-2 py-0.5 rounded-full bg-red-100">
                              Overlap: {pair.overlapWindow}
                            </span>
                          </div>
                          <div className="text-xs text-slate-800 space-y-1">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-semibold truncate">{pair.eventA.title}</span>
                              <span className="text-slate-500 shrink-0">
                                {formatTime12h(pair.eventA.startTime)}–{formatTime12h(pair.eventA.endTime)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-semibold truncate">{pair.eventB.title}</span>
                              <span className="text-slate-500 shrink-0">
                                {formatTime12h(pair.eventB.startTime)}–{formatTime12h(pair.eventB.endTime)}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 pt-1">
                            <button
                              type="button"
                              onClick={() => handleToggleSave(pair.eventB.id)}
                              className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-red-50 text-red-700 hover:bg-red-100 cursor-pointer"
                            >
                              Remove &ldquo;{pair.eventB.title}&rdquo;
                            </button>
                            <button
                              type="button"
                              onClick={() => setSelectedEventId(pair.eventA.id)}
                              className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer"
                            >
                              Inspect Details
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-900 flex items-center gap-3 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                No time clashes detected among your {savedEvents.length} saved events.
              </div>
            )}

            {/* Calendar Grid + Day Inspector */}
            <div className="grid lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-8 rounded-2xl bg-white border border-slate-200 p-5 shadow-xs">
                <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-500 pb-3 border-b border-slate-100">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                    <div key={d}>{d}</div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-2 pt-3">
                  {calendarCells.map((cell, idx) => {
                    if (!cell.day) {
                      return <div key={`empty-${idx}`} className="h-24 rounded-xl bg-slate-50/50" />;
                    }
                    const dayEvents = state.events.filter((e) => e.date === cell.dateStr);
                    const hasDayClash = dayEvents.some((e) => clashingIds.has(e.id));
                    const isSelected = selectedDateStr === cell.dateStr;
                    const isRefToday = cell.dateStr === state.referenceDate;

                    return (
                      <button
                        key={cell.dateStr}
                        type="button"
                        onClick={() => setSelectedDateStr(cell.dateStr)}
                        className={`h-24 rounded-xl border p-1.5 text-left flex flex-col justify-between transition cursor-pointer ${
                          isSelected
                            ? 'border-indigo-600 ring-2 ring-indigo-100 bg-indigo-50/40'
                            : hasDayClash
                            ? 'border-red-300 bg-red-50/50 hover:border-red-400'
                            : 'border-slate-200/80 bg-white hover:border-indigo-300'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span
                            className={`text-xs font-bold px-1.5 py-0.5 rounded-md ${
                              isRefToday
                                ? 'bg-indigo-600 text-white'
                                : 'text-slate-800'
                            }`}
                          >
                            {cell.day}
                          </span>
                          {hasDayClash && (
                            <span className="w-2 h-2 rounded-full bg-red-600" title="Clash on this date" />
                          )}
                        </div>

                        <div className="space-y-1 w-full overflow-hidden">
                          {dayEvents.slice(0, 2).map((ev) => {
                            const isEvClash = clashingIds.has(ev.id);
                            return (
                              <div
                                key={ev.id}
                                className={`text-[10px] font-semibold px-1.5 py-0.5 rounded truncate ${
                                  isEvClash
                                    ? 'bg-red-600 text-white'
                                    : 'bg-indigo-50 text-indigo-800'
                                }`}
                              >
                                {formatTime12h(ev.startTime)} {ev.title}
                              </div>
                            );
                          })}
                          {dayEvents.length > 2 && (
                            <div className="text-[10px] font-semibold text-slate-500 px-1">
                              +{dayEvents.length - 2} more
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected Date Inspector */}
              <div className="lg:col-span-4 rounded-2xl bg-white border border-slate-200 p-5 shadow-xs space-y-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                    Selected Date
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                    {formatReadableDate(selectedDateStr)}
                  </h2>
                </div>

                {(() => {
                  const dayList = state.events.filter((e) => e.date === selectedDateStr);
                  if (dayList.length === 0) {
                    return (
                      <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-5 text-center text-sm text-slate-600">
                        No demo events scheduled on this date.
                      </div>
                    );
                  }
                  return (
                    <div className="space-y-3">
                      {dayList.map((ev) => {
                        const isSaved = state.savedIds.includes(ev.id);
                        const isEvClash = isSaved && clashingIds.has(ev.id);
                        return (
                          <div
                            key={ev.id}
                            className={`rounded-xl border p-3.5 space-y-2 ${
                              isEvClash
                                ? 'border-red-300 bg-red-50/70'
                                : 'border-slate-200 bg-slate-50/50'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs font-bold text-indigo-700">
                                {formatTime12h(ev.startTime)} – {formatTime12h(ev.endTime)}
                              </span>
                              {isEvClash && (
                                <span className="text-[11px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
                                  Clash
                                </span>
                              )}
                            </div>
                            <p className="font-bold text-sm text-slate-900">{ev.title}</p>
                            <p className="text-xs text-slate-600 flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-slate-400" /> {ev.venue}
                            </p>
                            <div className="flex items-center gap-2 pt-1">
                              <button
                                type="button"
                                onClick={() => handleToggleSave(ev.id)}
                                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer"
                              >
                                {isSaved ? 'Unsave' : 'Save'}
                              </button>
                              <button
                                type="button"
                                onClick={() => setSelectedEventId(ev.id)}
                                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer"
                              >
                                Details
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        )}

        {/* ================================================================
            4. SAVED EVENTS & SMART REMINDER SYSTEM
           ================================================================ */}
        {activePage === 'saved' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Personal Schedule &amp; Simulated Reminders
                </span>
                <h1 className="text-3xl font-bold text-slate-900 mt-1">Saved Events &amp; Reminders</h1>
                <p className="text-sm text-slate-600 mt-1">
                  Manage bookmarked events, configure reminder timings, and inspect simulated in-app notifications.
                </p>
              </div>

              <div className="inline-flex rounded-xl bg-white border border-slate-200 p-1">
                <button
                  type="button"
                  onClick={() => setSavedTab('upcoming')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    savedTab === 'upcoming'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Upcoming ({upcomingSaved.length})
                </button>
                <button
                  type="button"
                  onClick={() => setSavedTab('past')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    savedTab === 'past'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Past ({pastSaved.length})
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-6 items-start">
              {/* Saved Events List */}
              <div className="lg:col-span-7 space-y-4">
                {(savedTab === 'upcoming' ? upcomingSaved : pastSaved).length === 0 ? (
                  <div className="rounded-2xl bg-white border border-slate-200 p-10 text-center">
                    <Bookmark className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <h2 className="font-bold text-base text-slate-900">
                      No {savedTab} saved events
                    </h2>
                    <p className="text-sm text-slate-600 mt-1">
                      Explore campus events and tap Save to add them to your list.
                    </p>
                    <button
                      type="button"
                      onClick={() => navigateTo('explore')}
                      className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer"
                    >
                      Explore Events
                    </button>
                  </div>
                ) : (
                  (savedTab === 'upcoming' ? upcomingSaved : pastSaved).map((ev) => {
                    const rem = state.reminders[ev.id] || { preset: 'none', customLabel: '' };
                    const hasClash = clashingIds.has(ev.id);
                    return (
                      <div
                        key={ev.id}
                        className={`rounded-2xl bg-white border p-5 space-y-4 shadow-xs ${
                          hasClash ? 'border-red-300 ring-2 ring-red-100' : 'border-slate-200'
                        }`}
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                                {ev.category}
                              </span>
                              {hasClash && (
                                <span className="text-xs font-bold text-red-700 bg-red-100 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                                  <AlertTriangle className="w-3 h-3" /> Clash
                                </span>
                              )}
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mt-1.5">{ev.title}</h3>
                            <p className="text-xs text-slate-600 mt-1">
                              {formatReadableDate(ev.date)} • {formatTime12h(ev.startTime)}–{formatTime12h(ev.endTime)} • {ev.venue}
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setSelectedEventId(ev.id)}
                              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 cursor-pointer"
                            >
                              Details
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedDateStr(ev.date);
                                navigateTo('calendar');
                              }}
                              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 cursor-pointer"
                            >
                              In Calendar
                            </button>
                            <button
                              type="button"
                              onClick={() => handleToggleSave(ev.id)}
                              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>
                        </div>

                        {/* Reminder Controls */}
                        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                              <Bell className="w-3.5 h-3.5 text-violet-600" />
                              Reminder:
                            </label>
                            <select
                              aria-label={`Reminder timing for ${ev.title}`}
                              value={rem.preset}
                              onChange={(e) => handleReminderChange(ev.id, e.target.value, rem.customLabel)}
                              className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white font-medium"
                            >
                              <option value="none">None</option>
                              <option value="1d">1 Day Before</option>
                              <option value="1h">1 Hour Before</option>
                              <option value="custom">Custom</option>
                            </select>
                            {rem.preset === 'custom' && (
                              <input
                                type="text"
                                value={rem.customLabel}
                                onChange={(e) => handleReminderChange(ev.id, 'custom', e.target.value)}
                                placeholder="e.g., 30 mins before lab"
                                className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs w-44"
                              />
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => handleSimulateReminderNow(ev)}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-violet-50 text-violet-700 hover:bg-violet-100 inline-flex items-center gap-1.5 cursor-pointer"
                          >
                            <Send className="w-3 h-3" />
                            Simulate Reminder Now
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Notification Centre & Preferences */}
              <div className="lg:col-span-5 space-y-6">
                <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">Notification Centre</h2>
                      <p className="text-xs text-slate-500">
                        Simulated in-app reminders (demo mode — no external push or email service)
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-violet-100 text-violet-800">
                      {unreadNotifications} unread
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleMarkAllRead}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 cursor-pointer"
                    >
                      Mark All Read
                    </button>
                    <button
                      type="button"
                      onClick={handleClearReadNotifications}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 cursor-pointer"
                    >
                      Clear Read
                    </button>
                  </div>

                  <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                    {state.notifications.length === 0 ? (
                      <p className="text-xs text-slate-500 py-6 text-center">
                        No notifications in local demo log.
                      </p>
                    ) : (
                      state.notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`rounded-xl border p-3.5 text-xs space-y-1 ${
                            n.read
                              ? 'bg-slate-50/60 border-slate-200/70 text-slate-600'
                              : 'bg-indigo-50/50 border-indigo-200 text-slate-900'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-bold">{n.title}</span>
                            <span className="text-[10px] text-slate-500 shrink-0">{n.time}</span>
                          </div>
                          <p className="leading-relaxed">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Notification Preferences */}
                <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-xs space-y-3">
                  <h3 className="font-bold text-base text-slate-900">Notification Preferences</h3>
                  {[
                    { key: 'inAppAlerts', label: 'Simulated In-App Event Reminders' },
                    { key: 'clashWarnings', label: 'Automatic Schedule Clash Warnings' },
                    { key: 'dailyDigest', label: 'Daily Campus Demo Summary' },
                  ].map((pref) => {
                    const enabled = state.preferences[pref.key];
                    return (
                      <label
                        key={pref.key}
                        className="flex items-center justify-between py-2 border-b border-slate-100 last:border-none cursor-pointer"
                      >
                        <span className="text-sm text-slate-700 font-medium">{pref.label}</span>
                        <button
                          type="button"
                          role="switch"
                          aria-checked={enabled}
                          onClick={() => handleTogglePreference(pref.key)}
                          className={`w-11 h-6 rounded-full transition p-0.5 cursor-pointer ${
                            enabled ? 'bg-indigo-600' : 'bg-slate-300'
                          }`}
                        >
                          <span
                            className={`block w-5 h-5 rounded-full bg-white transition-transform ${
                              enabled ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================
            5. PERSONALISED STUDENT DASHBOARD
           ================================================================ */}
        {activePage === 'dashboard' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            {/* Welcome & Instant Search */}
            <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Student Workspace • {state.activeUser.role}
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                  Welcome back, {state.activeUser.name}
                </h1>
                <p className="text-sm text-slate-600 mt-1">
                  Demo reference date: {formatReadableDate(state.referenceDate)} • Local browser storage active
                </p>
              </div>

              <div className="w-full lg:w-96 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (e.target.value.trim().length > 0 && activePage !== 'explore') {
                      setActivePage('explore');
                    }
                  }}
                  placeholder="Quick search events & jump to Explore..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* KPI Summary Cards */}
            <div className="grid sm:grid-cols-3 gap-5">
              <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500">Saved Events</p>
                  <p className="text-3xl font-bold text-slate-900 mt-1">{savedEvents.length}</p>
                </div>
                <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Bookmark className="w-5 h-5" />
                </div>
              </div>

              <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500">Active Reminders</p>
                  <p className="text-3xl font-bold text-slate-900 mt-1">
                    {
                      Object.values(state.reminders).filter((r) => r && r.preset && r.preset !== 'none')
                        .length
                    }
                  </p>
                </div>
                <div className="w-11 h-11 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
                  <Bell className="w-5 h-5" />
                </div>
              </div>

              <div
                className={`rounded-2xl border p-5 shadow-xs flex items-center justify-between ${
                  clashPairs.length > 0
                    ? 'bg-red-50 border-red-300'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div>
                  <p className="text-xs font-semibold text-slate-600">Clash Alerts</p>
                  <p className="text-3xl font-bold text-red-700 mt-1">{clashPairs.length}</p>
                </div>
                <div className="w-11 h-11 rounded-xl bg-red-100 text-red-700 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Quick Category Shortcuts */}
            <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-xs">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
                Quick Category Shortcuts
              </h2>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat);
                      navigateTo('explore');
                    }}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 transition cursor-pointer"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Dashboard Main Grid */}
            <div className="grid lg:grid-cols-12 gap-6 items-start">
              {/* Left 8 Cols: Events Happening Today & Recommended */}
              <div className="lg:col-span-8 space-y-6">
                <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-slate-900">
                      Events Happening Today ({formatReadableDate(state.referenceDate)})
                    </h2>
                    <button
                      type="button"
                      onClick={() => navigateTo('calendar')}
                      className="text-xs font-semibold text-indigo-600 hover:underline cursor-pointer"
                    >
                      Calendar view
                    </button>
                  </div>

                  {todayEvents.length === 0 ? (
                    <p className="text-sm text-slate-500">No events scheduled for today.</p>
                  ) : (
                    <div className="grid sm:grid-cols-2 gap-4">
                      {todayEvents.map((ev) => (
                        <EventCard key={ev.id} ev={ev} compact />
                      ))}
                    </div>
                  )}
                </div>

                <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-xs space-y-4">
                  <h2 className="text-lg font-bold text-slate-900">Recommended Demo Events</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {state.events
                      .filter((e) => e.date > state.referenceDate)
                      .slice(0, 2)
                      .map((ev) => (
                        <EventCard key={ev.id} ev={ev} compact />
                      ))}
                  </div>
                </div>
              </div>

              {/* Right 4 Cols: Calendar Preview & Notification Feed */}
              <div className="lg:col-span-4 space-y-6">
                <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <h2 className="font-bold text-base text-slate-900">Saved Schedule Preview</h2>
                    <button
                      type="button"
                      onClick={() => navigateTo('calendar')}
                      className="text-xs font-semibold text-indigo-600 hover:underline cursor-pointer"
                    >
                      Full calendar
                    </button>
                  </div>
                  <div className="space-y-2.5">
                    {savedEvents.map((ev) => {
                      const isClash = clashingIds.has(ev.id);
                      return (
                        <div
                          key={ev.id}
                          className={`rounded-xl border p-3 text-xs ${
                            isClash
                              ? 'bg-red-50 border-red-300 text-red-950'
                              : 'bg-slate-50 border-slate-200 text-slate-800'
                          }`}
                        >
                          <div className="font-bold flex items-center justify-between">
                            <span className="truncate">{ev.title}</span>
                            {isClash && <span className="text-red-700 font-bold">CLASH</span>}
                          </div>
                          <p className="text-[11px] text-slate-600 mt-0.5">
                            {formatReadableDate(ev.date)} • {formatTime12h(ev.startTime)}–{formatTime12h(ev.endTime)}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <h2 className="font-bold text-base text-slate-900">Notification Centre</h2>
                    <button
                      type="button"
                      onClick={() => navigateTo('saved')}
                      className="text-xs font-semibold text-indigo-600 hover:underline cursor-pointer"
                    >
                      Reminders ({unreadNotifications})
                    </button>
                  </div>
                  <div className="space-y-2">
                    {state.notifications.slice(0, 3).map((n) => (
                      <div
                        key={n.id}
                        className="rounded-xl bg-slate-50 border border-slate-200/80 p-3 text-xs"
                      >
                        <p className="font-bold text-slate-900">{n.title}</p>
                        <p className="text-slate-600 mt-0.5 line-clamp-2">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================
            6. EVENT ORGANISER DASHBOARD (LOCAL CRUD)
           ================================================================ */}
        {activePage === 'organiser' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Organiser Studio • Browser Local Storage Demo
              </span>
              <h1 className="text-3xl font-bold text-slate-900 mt-1">Event Organiser Dashboard</h1>
              <p className="text-sm text-slate-600 mt-1">
                Create, edit, or delete sample campus events. Data is stored only in your current browser&apos;s localStorage (no remote backend).
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Create / Edit Event Form */}
              <form
                onSubmit={handleOrganiserSubmit}
                className="lg:col-span-6 rounded-2xl bg-white border border-slate-200 p-6 shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-900">
                    {orgForm.id ? 'Edit Demo Event' : 'Create New Demo Event'}
                  </h2>
                  {orgForm.id && (
                    <button
                      type="button"
                      onClick={() => {
                        setOrgForm(emptyForm);
                        setOrgFeedback(null);
                      }}
                      className="text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>

                {orgFeedback && (
                  <div
                    className={`rounded-xl px-4 py-3 text-xs font-semibold border ${
                      orgFeedback.type === 'error'
                        ? 'bg-red-50 border-red-200 text-red-800'
                        : orgFeedback.type === 'success'
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        : 'bg-indigo-50 border-indigo-200 text-indigo-800'
                    }`}
                  >
                    {orgFeedback.text}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    value={orgForm.title}
                    onChange={(e) => setOrgForm({ ...orgForm, title: e.target.value })}
                    placeholder="e.g., Campus Design Systems Meetup"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Category *
                    </label>
                    <select
                      value={orgForm.category}
                      onChange={(e) => setOrgForm({ ...orgForm, category: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm bg-white"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Date *
                    </label>
                    <input
                      type="date"
                      value={orgForm.date}
                      onChange={(e) => setOrgForm({ ...orgForm, date: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Start Time *
                    </label>
                    <input
                      type="time"
                      value={orgForm.startTime}
                      onChange={(e) => setOrgForm({ ...orgForm, startTime: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      End Time *
                    </label>
                    <input
                      type="time"
                      value={orgForm.endTime}
                      onChange={(e) => setOrgForm({ ...orgForm, endTime: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Venue *
                    </label>
                    <input
                      type="text"
                      value={orgForm.venue}
                      onChange={(e) => setOrgForm({ ...orgForm, venue: e.target.value })}
                      placeholder="e.g., Block 34, Room 204"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Club / Organiser *
                    </label>
                    <input
                      type="text"
                      value={orgForm.organiser}
                      onChange={(e) => setOrgForm({ ...orgForm, organiser: e.target.value })}
                      placeholder="e.g., Design Club LPU"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    rows={3}
                    value={orgForm.description}
                    onChange={(e) => setOrgForm({ ...orgForm, description: e.target.value })}
                    placeholder="Describe what students will experience..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Registration Link (Demo)
                    </label>
                    <input
                      type="text"
                      value={orgForm.registrationLink}
                      onChange={(e) => setOrgForm({ ...orgForm, registrationLink: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Contact Info
                    </label>
                    <input
                      type="text"
                      value={orgForm.contactInfo}
                      onChange={(e) => setOrgForm({ ...orgForm, contactInfo: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Important Instructions
                  </label>
                  <input
                    type="text"
                    value={orgForm.instructions}
                    onChange={(e) => setOrgForm({ ...orgForm, instructions: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>

                {/* Cover Image Presets + Upload */}
                <div className="space-y-2 pt-1">
                  <label className="block text-xs font-bold text-slate-700">
                    Cover Artwork (Preset or Local File Upload)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {COVER_PRESETS.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setOrgForm({ ...orgForm, image: p.url })}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer ${
                          orgForm.image === p.url
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                            : 'border-slate-200 bg-slate-50 text-slate-700'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 pt-1">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="text-xs text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                  </div>
                  {orgForm.image && (
                    <img
                      src={orgForm.image}
                      alt="Selected event cover preview"
                      className="w-full h-36 object-cover rounded-xl border border-slate-200 mt-2"
                    />
                  )}
                </div>

                <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={orgForm.featured}
                    onChange={(e) => setOrgForm({ ...orgForm, featured: e.target.checked })}
                    className="rounded border-slate-300"
                  />
                  Mark as Featured Demo Event
                </label>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 hover:opacity-95 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  {orgForm.id ? 'Save Event Changes' : 'Publish Demo Event'}
                </button>
              </form>

              {/* Published Events List */}
              <div className="lg:col-span-6 rounded-2xl bg-white border border-slate-200 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-900">
                    Published Demo Events ({state.events.length})
                  </h2>
                  <button
                    type="button"
                    onClick={() => navigateTo('explore')}
                    className="text-xs font-semibold text-indigo-600 hover:underline cursor-pointer"
                  >
                    View in Explore
                  </button>
                </div>

                <div className="space-y-3 max-h-[820px] overflow-y-auto pr-1">
                  {state.events.map((ev) => (
                    <div
                      key={ev.id}
                      className="rounded-xl border border-slate-200 p-4 flex items-start justify-between gap-3 bg-slate-50/40"
                    >
                      <div className="min-w-0">
                        <span className="text-[11px] font-bold text-indigo-700">{ev.category}</span>
                        <h3 className="font-bold text-sm text-slate-900 truncate">{ev.title}</h3>
                        <p className="text-xs text-slate-600 mt-0.5">
                          {formatReadableDate(ev.date)} • {formatTime12h(ev.startTime)}–{formatTime12h(ev.endTime)}
                        </p>
                        <p className="text-xs text-slate-500 truncate mt-0.5">
                          {ev.venue} • {ev.organiser}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleEditEvent(ev)}
                          aria-label={`Edit ${ev.title}`}
                          className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteEvent(ev.id)}
                          aria-label={`Delete ${ev.title}`}
                          className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-red-50 text-slate-700 hover:text-red-700 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================
            7. ABOUT PAGE (INT335 LPU PROJECT CONTEXT)
           ================================================================ */}
        {activePage === 'about' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            <div className="rounded-3xl bg-white border border-slate-200 p-7 sm:p-9 shadow-xs space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                INT335 Design Thinking • Lovely Professional University (LPU)
              </span>
              <h1 className="text-3xl font-bold text-slate-900">
                Too Many Posters, Too Little Signal – Campus Event Discovery &amp; Clash Management
              </h1>
              <p className="text-base text-slate-600 leading-relaxed">
                At university, event announcements are frequently split across chat groups, social stories, notice boards, and word of mouth. Students often discover opportunities late or commit to overlapping events without seeing time conflicts in advance.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                <strong>CampusConnect</strong> brings structured event cards, search and multi-category filtering, a monthly calendar with real start/end time clash detection, bookmarking, simulated reminders, and local organiser CRUD tools into one cohesive interface.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-indigo-700 font-bold">
                  <Layers className="w-5 h-5" />
                  <h2>Technical Architecture</h2>
                </div>
                <ul className="text-sm text-slate-600 space-y-2 list-disc pl-5">
                  <li>Built with React, Tailwind CSS, and Lucide icons.</li>
                  <li>Interval overlap engine compares event dates and start/end minutes without false positives on back-to-back non-overlapping slots.</li>
                  <li>Persists saved events, registrations, reminders, notifications, and organiser items in browser <code>localStorage</code>.</li>
                </ul>
              </div>

              <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-violet-700 font-bold">
                  <ShieldCheck className="w-5 h-5" />
                  <h2>Honest Demo &amp; Data Scope</h2>
                </div>
                <ul className="text-sm text-slate-600 space-y-2 list-disc pl-5">
                  <li>All listed events, times, venues, and profiles are sample demonstration items for INT335 and are not official LPU announcements.</li>
                  <li>Reminders and notifications run as in-app local simulations—no external SMS, email, or push backend is connected.</li>
                  <li>Use the Reset Demo Data control anytime to restore initial sample state.</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ================================================================
          EVENT DETAILS MODAL
         ================================================================ */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/55 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedEventId(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-56 w-full bg-slate-100">
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedEventId(null)}
                aria-label="Close event details"
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/75 text-white flex items-center justify-center hover:bg-slate-900 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-indigo-700 shadow-xs">
                  {selectedEvent.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-900/80 text-white">
                  Demo Event
                </span>
              </div>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{selectedEvent.title}</h2>
                <p className="text-xs font-semibold text-indigo-600 mt-1">
                  Organised by {selectedEvent.organiser}
                </p>
              </div>

              {/* Immediate Clash Check Against Saved Events */}
              {(() => {
                const candidateSaved = state.savedIds.includes(selectedEvent.id)
                  ? savedEvents
                  : [...savedEvents, selectedEvent];
                const { pairs } = computeScheduleClashes(candidateSaved);
                const relevantClashes = pairs.filter(
                  (p) => p.eventA.id === selectedEvent.id || p.eventB.id === selectedEvent.id
                );

                if (relevantClashes.length > 0) {
                  return (
                    <div className="rounded-2xl bg-red-50 border border-red-300 p-4 text-xs text-red-950 space-y-1">
                      <div className="font-bold text-red-800 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                        Schedule Overlap Alert
                      </div>
                      {relevantClashes.map((rc) => {
                        const other = rc.eventA.id === selectedEvent.id ? rc.eventB : rc.eventA;
                        return (
                          <p key={rc.id}>
                            Overlaps with <strong>{other.title}</strong> ({formatTime12h(other.startTime)}–
                            {formatTime12h(other.endTime)}) during <strong>{rc.overlapWindow}</strong>.
                          </p>
                        );
                      })}
                    </div>
                  );
                }
                return (
                  <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-2.5 text-xs font-medium text-emerald-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    No time overlap with your currently saved events on {formatReadableDate(selectedEvent.date)}.
                  </div>
                );
              })()}

              <div className="grid sm:grid-cols-3 gap-3 text-xs bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
                <div>
                  <span className="text-slate-500 block">Date</span>
                  <strong className="text-slate-900">{formatReadableDate(selectedEvent.date)}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Time</span>
                  <strong className="text-slate-900">
                    {formatTime12h(selectedEvent.startTime)} – {formatTime12h(selectedEvent.endTime)}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Venue</span>
                  <strong className="text-slate-900">{selectedEvent.venue}</strong>
                </div>
              </div>

              <div className="space-y-3 text-sm text-slate-700">
                <div>
                  <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1">
                    Full Description
                  </h3>
                  <p className="leading-relaxed">{selectedEvent.description}</p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1">
                    Registration &amp; Contact
                  </h3>
                  <p className="text-xs text-slate-600">{selectedEvent.registrationInfo}</p>
                  <p className="text-xs text-slate-600 mt-1">Contact: {selectedEvent.contactInfo}</p>
                  {selectedEvent.registrationLink && (
                    <a
                      href={selectedEvent.registrationLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:underline mt-1"
                    >
                      Demo Registration Link <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1">
                    Important Instructions
                  </h3>
                  <p className="text-xs text-slate-600">{selectedEvent.instructions}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={() => handleToggleSave(selectedEvent.id)}
                  className={`flex-1 min-w-[130px] py-2.5 px-4 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 cursor-pointer ${
                    state.savedIds.includes(selectedEvent.id)
                      ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                      : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                  {state.savedIds.includes(selectedEvent.id) ? 'Saved Event' : 'Save Event'}
                </button>

                <button
                  type="button"
                  onClick={() => handleToggleRegister(selectedEvent.id)}
                  className={`flex-1 min-w-[150px] py-2.5 px-4 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-1.5 cursor-pointer ${
                    state.registeredIds.includes(selectedEvent.id)
                      ? 'bg-emerald-600 hover:bg-emerald-700'
                      : 'bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 hover:opacity-95'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  {state.registeredIds.includes(selectedEvent.id)
                    ? 'Interest Registered'
                    : 'Register Interest'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedDateStr(selectedEvent.date);
                    setSelectedEventId(null);
                    navigateTo('calendar');
                  }}
                  className="py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <CalendarPlus className="w-4 h-4 text-indigo-600" />
                  Add to Calendar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================
          DEMO PROFILE SWITCHER MODAL
         ================================================================ */}
      {profileModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setProfileModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Demo Sign In / Profile Switcher</h2>
              <button
                type="button"
                onClick={() => setProfileModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-600">
              Select a demonstration profile for INT335 testing. No external authentication provider is used.
            </p>
            <div className="space-y-2">
              {DEMO_PROFILES.map((prof) => {
                const current = state.activeUser.id === prof.id;
                return (
                  <button
                    key={prof.id}
                    type="button"
                    onClick={() => {
                      setState((prev) => ({ ...prev, activeUser: prof }));
                      setProfileModalOpen(false);
                      showToast(`Switched active demo profile to ${prof.name}`, 'success');
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border transition cursor-pointer ${
                      current
                        ? 'border-indigo-600 bg-indigo-50/70'
                        : 'border-slate-200 hover:border-indigo-300'
                    }`}
                  >
                    <p className="font-bold text-sm text-slate-900">{prof.name}</p>
                    <p className="text-xs text-slate-600">{prof.role}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-600">
          <div>
            <p className="font-bold text-slate-900">
              CampusConnect • Discover Campus. Never Miss a Moment.
            </p>
            <p className="mt-1">
              INT335 Design Thinking Project • Lovely Professional University (LPU) • Sample events &amp; browser localStorage demo only.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigateTo('about')}
              className="font-semibold text-indigo-600 hover:underline cursor-pointer"
            >
              About &amp; Disclaimer
            </button>
            <button
              type="button"
              onClick={handleResetDemoData}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Demo Data
            </button>
          </div>
        </div>
      </footer>

      {/* Toast Notification */}
      {toast && (
        <div
          role="status"
          className="fixed bottom-5 right-5 z-50 max-w-sm rounded-2xl bg-slate-900 text-white px-4 py-3 text-xs font-semibold shadow-xl border border-slate-700 flex items-center gap-2.5"
        >
          <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}