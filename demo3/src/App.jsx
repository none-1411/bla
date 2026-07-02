import React, { useState, useEffect } from 'react';
import { Camera, Calendar, Clock, Users, ArrowRight, X, Play, Pause, ChevronLeft, ChevronRight, Check, Search, ShieldCheck, HelpCircle, MoreVertical } from 'lucide-react';

const MEDIA_DATABASE = [
  {
    id: 1,
    title: 'The Sonoma Sunset Hug',
    category: 'Weddings',
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    type: 'photo',
    colClass: 'span-6 landscape'
  },
  {
    id: 2,
    title: 'Varanasi Dawn Trailer',
    category: 'Films',
    img: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80',
    type: 'video',
    colClass: 'span-6 landscape'
  },
  {
    id: 3,
    title: 'Coming-of-Age Rite',
    category: 'Heritage',
    img: 'https://images.unsplash.com/photo-1561525140-c2a4cc68e4bd?auto=format&fit=crop&w=800&q=80',
    type: 'photo',
    colClass: 'span-4'
  },
  {
    id: 4,
    title: 'Stadium Rock Strobes',
    category: 'Concerts',
    img: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80',
    type: 'photo',
    colClass: 'span-4'
  },
  {
    id: 5,
    title: 'Alpine Peak highlight',
    category: 'Films',
    img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    type: 'video',
    colClass: 'span-4'
  },
  {
    id: 6,
    title: 'Bistro First Dance',
    category: 'Weddings',
    img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    type: 'photo',
    colClass: 'span-8 landscape'
  },
  {
    id: 7,
    title: 'Desert Wind Silhouette',
    category: 'Destinations',
    img: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    type: 'photo',
    colClass: 'span-4'
  },
  {
    id: 8,
    title: 'Varanasi Rowboat Dusk',
    category: 'Destinations',
    img: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    type: 'photo',
    colClass: 'span-4'
  },
  {
    id: 9,
    title: 'Maternity Warm Lightway',
    category: 'Heritage',
    img: 'https://images.unsplash.com/photo-1579847285918-a664e43b1740?auto=format&fit=crop&w=800&q=80',
    type: 'photo',
    colClass: 'span-4'
  },
  {
    id: 10,
    title: 'Coastal Love Highlight',
    category: 'Films',
    img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    type: 'video',
    colClass: 'span-4'
  },
  {
    id: 11,
    title: 'Indie Vocal Silhouette',
    category: 'Concerts',
    img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    type: 'photo',
    colClass: 'span-6 landscape'
  },
  {
    id: 12,
    title: 'Bride Preparation Smile',
    category: 'Weddings',
    img: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    type: 'photo',
    colClass: 'span-6'
  },
  {
    id: 13,
    title: 'Vast Forest Walk',
    category: 'Weddings',
    img: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=80',
    type: 'photo',
    colClass: 'span-4'
  },
  {
    id: 14,
    title: 'Mountain Horizon Mist',
    category: 'Destinations',
    img: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
    type: 'photo',
    colClass: 'span-4'
  },
  {
    id: 15,
    title: 'Temple Festival Reel',
    category: 'Films',
    img: 'https://images.unsplash.com/photo-1520854221256-17451cc35953?auto=format&fit=crop&w=800&q=80',
    type: 'video',
    colClass: 'span-4'
  },
  {
    id: 16,
    title: 'Maternity Studio Silhouette',
    category: 'Heritage',
    img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
    type: 'photo',
    colClass: 'span-6 landscape'
  },
  {
    id: 17,
    title: 'Singer Stage Focus',
    category: 'Concerts',
    img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    type: 'photo',
    colClass: 'span-6'
  },
  {
    id: 18,
    title: 'Mojave Dunes Highlight',
    category: 'Films',
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    type: 'video',
    colClass: 'span-12 landscape'
  },
  {
    id: 19,
    title: 'Himalayan Ridge Dawn',
    category: 'Destinations',
    img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    type: 'photo',
    colClass: 'span-4'
  },
  {
    id: 20,
    title: 'Drums Strobe Flare',
    category: 'Concerts',
    img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    type: 'photo',
    colClass: 'span-4'
  },
  {
    id: 21,
    title: 'The Ring Exchange',
    category: 'Weddings',
    img: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
    type: 'photo',
    colClass: 'span-4'
  },
  {
    id: 22,
    title: 'Golden Maternity Smile',
    category: 'Heritage',
    img: 'https://images.unsplash.com/photo-1579847285918-a664e43b1740?auto=format&fit=crop&w=800&q=80',
    type: 'photo',
    colClass: 'span-6 landscape'
  },
  {
    id: 23,
    title: 'Artist Stage Portrait',
    category: 'Concerts',
    img: 'https://images.unsplash.com/photo-1487180142328-054b783fc471?auto=format&fit=crop&w=800&q=80',
    type: 'photo',
    colClass: 'span-6'
  },
  {
    id: 24,
    title: 'Lakeside Couple Hug',
    category: 'Weddings',
    img: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=800&q=80',
    type: 'photo',
    colClass: 'span-12 landscape'
  }
];

const TEASER_STORIES = [
  {
    title: 'The Sonoma Valley Sunset',
    category: 'Weddings',
    desc: 'An emotional elopement shoot set against Sonoma Vineyard valleys. Captured entirely under low golden natural ambient spotlight.',
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    stats: { client: 'Maya & David', gear: 'Sony A7R V', lens: 'FE 85mm f/1.2 GM' }
  },
  {
    title: 'Varanasi Ganges Dawn Film',
    category: 'Films',
    desc: 'A widescreen cinematic wedding highlight tracking rowboat ceremonies and ancient morning rituals at dawn.',
    img: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80',
    stats: { client: 'Anjali & Rohit', gear: 'RED Komodo 6K', lens: 'Anamorphic 50mm' }
  },
  {
    title: 'Indigo Live Arena Tour',
    category: 'Concerts',
    desc: 'Low-light stage captures freezing vocal movements and strobe lighting interactions at a sold-out stadium concert.',
    img: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80',
    stats: { client: 'A.R. Rahman Live', gear: 'Leica M11', lens: 'Noctilux 50mm f/0.95' }
  }
];

const MOCK_CAL_DAYS = [
  { date: 1, day: 'Wed', disabled: false },
  { date: 2, day: 'Thu', disabled: false },
  { date: 3, day: 'Fri', disabled: false },
  { date: 4, day: 'Sat', disabled: true },
  { date: 5, day: 'Sun', disabled: true },
  { date: 6, day: 'Mon', disabled: false },
  { date: 7, day: 'Tue', disabled: false },
  { date: 8, day: 'Wed', disabled: false },
  { date: 9, day: 'Thu', disabled: false },
  { date: 10, day: 'Fri', disabled: false },
  { date: 11, day: 'Sat', disabled: true },
  { date: 12, day: 'Sun', disabled: true }
];

const SCHEDULER_SLOTS = ['10:00 AM - 12:00 PM', '02:00 PM - 04:00 PM', '05:30 PM - 07:30 PM'];

const SERVICES_DATA = [
  {
    id: 'weddings',
    title: 'Wedding Cinema & Candid',
    icon: <Camera size={26} />,
    desc: 'Widescreen cinematic narrative films and candid photography coverage capturing the raw, heartfelt highlights of your wedding celebrations.',
    rate: '1,200',
    gear: 'Sony A7R V, RED Komodo 6K, Anamorphic prime set (35/50/85mm)',
    deliverables: ['Full Day 10-Hour Coverage', '3-5 Minute Cinematic Trailer', 'Color Graded Candid Proofs (450+)', 'Online Private Gallery Delivery'],
    timeline: 'Prep (2hrs) • Pre-ceremony portraits (1hr) • Vows & Ceremony (2hrs) • Sunset Escape (1hr) • Reception & Celebration (4hrs)'
  },
  {
    id: 'heritage',
    title: 'Traditional Life Milestones',
    icon: <Users size={26} />,
    desc: 'Dignified, heritage-focused photography detailing puberty ceremonies, traditional baby showers, and maternal family milestones.',
    rate: '750',
    gear: 'Sony A7R V, FE 24-70mm f/2.8 GM II, Studio strobes and light modifiers',
    deliverables: ['5-Hour Studio/Venue Coverage', 'Family Portrait Special Session', 'High-Res Color Graded Proofs (200+)', 'Professional Archival Photo Album'],
    timeline: 'Aarti & Ritual Setup (1hr) • Family portraiture (1hr) • Main traditional milestone capture (2hrs) • Archival prints select (1hr)'
  },
  {
    id: 'destinations',
    title: 'Destination outdoor',
    icon: <ArrowRight size={26} />,
    desc: 'Relaxed lifestyle portraiture set against breathtaking natural landscapes—beaches, deserts, or historical architecture.',
    rate: '900',
    gear: 'Leica M11, Summilux 35mm & 50mm primes, Natural light reflectors',
    deliverables: ['Full Travel Route Planning', 'Golden Hour & Sunset Shoots', 'Fine Art Archival Prints (15)', 'Full High-Res Web Downloads'],
    timeline: 'Travel briefing & setup (1hr) • Morning softlight walk (2hrs) • Intermission • Golden Hour landscape shoot (2hrs)'
  },
  {
    id: 'concerts',
    title: 'Concerts & Live Stage',
    icon: <Play size={26} />,
    desc: 'High-speed, dynamic low-light photography freezing stage performance motion and energetic crowd interactions.',
    rate: '650',
    gear: 'Sony A9 III (Global Shutter), FE 70-200mm f/2.8 GM II zoom',
    deliverables: ['Venue Stage Sound-Check Pass', 'Low-Light Color Graded Proofs (100+)', 'Artist Social Media Fast proofing', 'Full Commercial Print Licensing'],
    timeline: 'Sound-check tracking (1hr) • Behind-the-scenes greenroom (1hr) • Active stage set (2hrs) • Crowd mood selects (1hr)'
  }
];

const FAQ_DATA = [
  {
    q: 'How fast do we receive the initial proof photos?',
    a: 'We send a curated set of 15 "First Look" proofs within 48 hours of the campaign. The full, color-calibrated high-resolution gallery takes 4 to 6 weeks depending on project scope.'
  },
  {
    q: 'Can we build custom packages spanning multiple services?',
    a: 'Absolutely. You can schedule a consultation call, and we will custom-tailor timelines and gear layouts (e.g. adding a destination pre-shoot to a wedding film package).'
  },
  {
    q: 'Do you charge travel fees for outdoor or destination shoots?',
    a: 'For sessions within 50 miles of our Portland studio lounge, travel is fully included. Beyond 50 miles, we apply standard transport and hotel travel expenses at cost.'
  },
  {
    q: 'Do we own the full copyright to the images?',
    a: 'For wedding and life milestone packages, you receive a full personal printing and web licensing release. Commercial stage shoots include custom commercial copyright contracts.'
  }
];

function App() {
  const [activePage, setActivePage] = useState('home');
  const [teaserIdx, setTeaserIdx] = useState(0);

  // Portfolio Dashboard states
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [mediaTypeFilter, setMediaTypeFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Lightboxes
  const [zoomedPhoto, setZoomedPhoto] = useState(null);
  const [activeTheaterVideo, setActiveTheaterVideo] = useState(null);
  const [theaterPlaying, setTheaterPlaying] = useState(true);
  const [theaterProgress, setTheaterProgress] = useState(25);

  // Services View
  const [activeServiceTab, setActiveServiceTab] = useState('weddings');

  // Contact / Booking Form states
  const [calDayIdx, setCalDayIdx] = useState(2); // Wednesday (date 1)
  const [calTimeIdx, setCalTimeIdx] = useState(1); // Afternoon
  const [bookingForm, setBookingForm] = useState({ name: '', email: '', phone: '', service: 'Wedding Cinema & Candid', notes: '' });
  const [bookingDone, setBookingDone] = useState(false);
  const [successToast, setSuccessToast] = useState('');

  // FAQ Accordion state
  const [openFaqIdx, setOpenFaqIdx] = useState(0);

  // particles state
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const tempParticles = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 8 + 3}px`,
      delay: `${Math.random() * 8}s`,
      duration: `${Math.random() * 10 + 12}s`,
    }));
    setParticles(tempParticles);
  }, []);

  useEffect(() => {
    let interval;
    if (activeTheaterVideo && theaterPlaying) {
      interval = setInterval(() => {
        setTheaterProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 250);
    }
    return () => clearInterval(interval);
  }, [activeTheaterVideo, theaterPlaying]);

  const handleNextTeaser = () => setTeaserIdx((prev) => (prev + 1) % TEASER_STORIES.length);
  const handlePrevTeaser = () => setTeaserIdx((prev) => (prev - 1 + TEASER_STORIES.length) % TEASER_STORIES.length);

  // Filter media logic
  const filteredMedia = MEDIA_DATABASE.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === 'All' || item.category === categoryFilter;
    const matchesType = mediaTypeFilter === 'All' || 
                        (mediaTypeFilter === 'Photos' && item.type === 'photo') || 
                        (mediaTypeFilter === 'Videos' && item.type === 'video');
    return matchesSearch && matchesCat && matchesType;
  });

  const totalPages = Math.ceil(filteredMedia.length / itemsPerPage);
  const paginatedMedia = filteredMedia.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleSelectServiceAndNavigate = (serviceTitle) => {
    setBookingForm((prev) => ({ ...prev, service: serviceTitle }));
    setActivePage('contact');
    setSuccessToast(`Pre-filled service: ${serviceTitle}`);
    setTimeout(() => setSuccessToast(''), 3000);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.email || !bookingForm.phone) return;
    setBookingDone(true);
  };

  return (
    <div className="min-h-screen bg-[#F5F4F0] text-zinc-800 font-sans flex flex-col justify-between selection:bg-gold selection:text-black">
      
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-zinc-200 py-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActivePage('home')}>
            <img src="/Logo.jpeg" alt="Cine Logo" className="h-10 w-10 rounded-full border border-gold object-cover" />
            <div>
              <h1 className="font-serif text-xl tracking-widest font-bold text-zinc-900">CINE<span className="text-gold">.</span></h1>
              <div className="text-[0.6rem] tracking-[0.3em] uppercase text-zinc-500 font-bold">Photography</div>
            </div>
          </div>

          <nav className="hidden md:flex gap-2">
            {['home', 'about', 'portfolio', 'services', 'contact'].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-widest rounded-sm border transition-all ${
                  activePage === tab 
                    ? 'text-gold border-gold bg-gold/5 shadow-[0_0_10px_rgba(212,175,55,0.15)]' 
                    : 'text-zinc-500 border-transparent hover:text-zinc-900 hover:border-zinc-300'
                }`}
                onClick={() => { setActivePage(tab); setCurrentPage(1); }}
              >
                {tab}
              </button>
            ))}
          </nav>

          {/* Mobile Three-Dot Hover Dropdown */}
          <div className="relative group md:hidden">
            <button className="text-gold p-2 hover:opacity-80 transition-all" aria-label="Toggle Menu">
              <MoreVertical size={24} />
            </button>
            <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-zinc-200 rounded-sm shadow-xl hidden group-hover:flex flex-col py-1.5 z-50 animate-fadeIn">
              {['home', 'about', 'portfolio', 'services', 'contact'].map((tab) => (
                <button
                  key={tab}
                  className={`w-full text-left px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                    activePage === tab 
                      ? 'text-gold bg-gold/5' 
                      : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
                  }`}
                  onClick={() => { setActivePage(tab); setCurrentPage(1); }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <button 
            className="bg-gold text-black text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-sm hover:bg-zinc-900 hover:text-white hover:shadow-[0_0_15px_rgba(0,0,0,0.15)] transition-all"
            onClick={() => setActivePage('contact')}
          >
            Book Session
          </button>
        </div>
      </header>

      {/* Main Pages Content Frame */}
      <main className="max-w-7xl mx-auto px-6 py-12 flex-grow w-full">
        
        {/* 1. HOME SCREEN VIEW */}
        {activePage === 'home' && (
          <div className="space-y-16 animate-[fadeIn_0.45s_ease-out]">
            {/* Hero Banner */}
            <div className="relative h-[65vh] bg-zinc-100 overflow-hidden border border-zinc-200 shadow-lg flex items-center">
              {/* Particles loop background */}
              <div className="absolute inset-0 pointer-events-none z-10">
                {particles.map((p) => (
                  <div 
                    key={p.id}
                    className="dust-particle"
                    style={{
                      left: p.left,
                      width: p.size,
                      height: p.size,
                      animationDelay: p.delay,
                      animationDuration: p.duration
                    }}
                  ></div>
                ))}
              </div>

              {/* Background teaser image */}
              <img 
                src="https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=1600&q=80" 
                alt="Cinema studio lens lighting background" 
                className="absolute inset-0 w-full h-full object-cover opacity-15" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 via-transparent to-transparent"></div>
              
              <div className="relative z-20 px-6 md:px-12 max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold mb-3 block">Cinematic Light & Shadow</span>
                <h1 className="text-3xl md:text-5xl font-serif tracking-widest text-zinc-900 leading-none mb-6">Stories Written In Light.</h1>
                <p className="text-sm font-light text-zinc-600 leading-relaxed mb-8">
                  We are premium visual storytellers documenting weddings, concerts, and life ceremonies. We reject rigid, stiff poses to freeze the raw, warm, unscripted chemistry of your milestones.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-gold text-black text-xs font-bold uppercase tracking-widest px-6 py-3 hover:bg-zinc-900 hover:text-white transition-all" onClick={() => setActivePage('portfolio')}>
                    Enter Showcase
                  </button>
                  <button className="bg-transparent border border-zinc-300 text-zinc-800 text-xs font-bold uppercase tracking-widest px-6 py-3 hover:border-gold hover:text-gold transition-all" onClick={() => setActivePage('contact')}>
                    Reserve Consultation
                  </button>
                </div>
              </div>
            </div>

            {/* Philosophy Pitch */}
            <div className="bg-white border border-zinc-200 p-10 flex flex-col md:flex-row items-center gap-8 justify-between">
              <div className="max-w-2xl">
                <h3 className="text-gold font-serif text-lg tracking-wider mb-2">The Cinematic Philosophy</h3>
                <p className="text-sm font-light text-zinc-600 leading-relaxed">
                  We configure lighting grids and support systems at each event to treat frames as film scenes. Our cameras capture natural skin tones and rich midtone details, translating transient emotions into high-dynamic visual records.
                </p>
              </div>
              <div className="flex gap-8 border-t md:border-t-0 md:border-l border-zinc-200 pt-6 md:pt-0 md:pl-10">
                <div>
                  <span className="font-serif text-3xl text-gold block leading-none">500+</span>
                  <span className="text-[0.65rem] uppercase tracking-wider text-zinc-500 font-bold">Campaigns</span>
                </div>
                <div>
                  <span className="font-serif text-3xl text-gold block leading-none">4.9 ★</span>
                  <span className="text-[0.65rem] uppercase tracking-wider text-zinc-500 font-bold">Google Score</span>
                </div>
              </div>
            </div>

            {/* Carousel Slider */}
            <div>
              <h2 className="text-2xl font-serif tracking-widest mb-6">Featured Collections</h2>
              <div className="bg-white border border-zinc-200 grid grid-cols-1 md:grid-cols-12 min-h-[400px]">
                <div className="md:col-span-7 relative h-72 md:h-auto overflow-hidden bg-black">
                  <img src={TEASER_STORIES[teaserIdx].img} alt="Featured Frame" className="w-full h-full object-cover" />
                </div>
                <div className="md:col-span-5 p-8 flex flex-col justify-between">
                  <div>
                    <span className="text-[0.7rem] font-bold uppercase tracking-wider text-gold mb-2 block">{TEASER_STORIES[teaserIdx].category}</span>
                    <h3 className="text-2xl font-serif text-zinc-900 mb-4 leading-snug">{TEASER_STORIES[teaserIdx].title}</h3>
                    <p className="text-xs font-light text-zinc-600 leading-relaxed mb-6">{TEASER_STORIES[teaserIdx].desc}</p>
                    
                    <div className="grid grid-cols-3 gap-4 border-t border-zinc-200 pt-4 mb-6">
                      <div>
                        <span className="text-[0.6rem] uppercase text-zinc-500 block">Client</span>
                        <span className="text-xs font-semibold text-zinc-800">{TEASER_STORIES[teaserIdx].stats.client}</span>
                      </div>
                      <div>
                        <span className="text-[0.6rem] uppercase text-zinc-500 block">Optics</span>
                        <span className="text-xs font-semibold text-zinc-800">{TEASER_STORIES[teaserIdx].stats.lens}</span>
                      </div>
                      <div>
                        <span className="text-[0.6rem] uppercase text-zinc-500 block">Body</span>
                        <span className="text-xs font-semibold text-zinc-800">{TEASER_STORIES[teaserIdx].stats.gear}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="bg-zinc-50 border border-zinc-200 text-zinc-700 p-3 hover:border-gold hover:text-gold transition-all" onClick={handlePrevTeaser}>
                      <ChevronLeft size={16} />
                    </button>
                    <button className="bg-zinc-50 border border-zinc-200 text-zinc-700 p-3 hover:border-gold hover:text-gold transition-all" onClick={handleNextTeaser}>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Choose Us */}
            <div>
              <h2 className="text-2xl font-serif tracking-widest text-center mb-8">What Sets Us Apart</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-zinc-200 p-8 rounded-sm hover:border-gold transition-all">
                  <div className="text-gold mb-4"><Users size={26} /></div>
                  <h4 className="font-serif text-sm font-semibold text-zinc-900 mb-2">Hospitality First</h4>
                  <p className="text-xs font-light text-zinc-600 leading-relaxed">
                    We treat clients like family. Our team coordinates to ensure comfort, natural posture, and effortless smiles in front of the lens.
                  </p>
                </div>
                <div className="bg-white border border-zinc-200 p-8 rounded-sm hover:border-gold transition-all">
                  <div className="text-gold mb-4"><Clock size={26} /></div>
                  <h4 className="font-serif text-sm font-semibold text-zinc-900 mb-2">Impeccable Punctuality</h4>
                  <p className="text-xs font-light text-zinc-600 leading-relaxed">
                    Time is essential. Our lighting crew and assistants arrive well before schedule, establishing set grids with zero setup panic.
                  </p>
                </div>
                <div className="bg-white border border-zinc-200 p-8 rounded-sm hover:border-gold transition-all">
                  <div className="text-gold mb-4"><ShieldCheck size={26} /></div>
                  <h4 className="font-serif text-sm font-semibold text-zinc-900 mb-2">Value & Transparency</h4>
                  <p className="text-xs font-light text-zinc-600 leading-relaxed">
                    No hidden line items. We provide detailed pricing estimates, complete deliverable checklists, and commercial licensing guarantees.
                  </p>
                </div>
              </div>
            </div>

            {/* Accolades */}
            <div>
              <h2 className="text-2xl font-serif tracking-widest text-center mb-8">Studio Awards</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {['Wedding Cinema Award 2024', 'Low-Light Portraiture 2025', 'Destination Fine Art Gold', 'Stage Capture Excellence'].map((award, i) => (
                  <div key={i} className="bg-white border border-zinc-200 p-6 flex flex-col justify-center items-center">
                    <span className="text-xs font-serif text-gold block mb-2 font-bold">★ GOLD MEDAL ★</span>
                    <span className="text-xs font-semibold text-zinc-700 uppercase tracking-wider">{award}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. ABOUT SCREEN VIEW */}
        {activePage === 'about' && (
          <div className="space-y-16 animate-[fadeIn_0.45s_ease-out]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
              <div className="md:col-span-7">
                <span className="text-xs font-bold uppercase tracking-widest text-gold mb-2 block">Our Journey</span>
                <h2 className="text-4xl font-serif text-zinc-900 leading-none mb-6">Born Behind The Lens</h2>
                <p className="text-sm font-light text-zinc-600 leading-relaxed mb-4">
                  Cine Photography was founded in 2012 by Christian Navas and Logesh Christian. Starting as a destination outdoor photography crew, we noticed that traditional studio lighting and stiff posing felt artificial.
                </p>
                <p className="text-sm font-light text-zinc-600 leading-relaxed mb-6">
                  We pivoted towards unscripted candid captures, framing ceremonies as visual narratives. By extending our studio with cinema lenses, stabilizers, and digital color science, we created a unique signature: high-contrast dark tones highlighted by polished warm gold details.
                </p>
                <div className="border-l-2 border-gold pl-4 py-2 text-sm italic text-zinc-700 font-serif">
                  "Every frame we capture isolates the raw space between transitions, capturing genuine smiles that remain warm and emotional for generations."
                </div>
              </div>
              
              <div className="md:col-span-5 flex justify-center">
                <div className="bg-white border border-zinc-200 p-12 text-center relative max-w-[380px] w-full">
                  <div className="absolute inset-2 border border-gold/10 pointer-events-none"></div>
                  <img src="/Logo.jpeg" alt="Cine Logo Watermark" className="w-32 h-32 rounded-full border-2 border-gold mx-auto object-cover mb-6 shadow-xl" />
                  <h3 className="font-serif text-lg text-zinc-900">CINE PHOTOGRAPHY</h3>
                  <span className="text-[0.65rem] text-gold uppercase tracking-[0.2em] font-semibold mt-2 block">Est. 2012 • Studio City</span>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h2 className="text-2xl font-serif tracking-widest mb-8">Studio Timeline</h2>
              <div className="space-y-8 max-w-3xl border-l border-zinc-200 ml-4 pl-8 py-4">
                <div className="relative">
                  <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-gold border-4 border-zinc-50"></div>
                  <span className="text-sm font-serif text-gold font-bold">2012</span>
                  <h4 className="text-sm font-semibold text-zinc-950 mt-1">Loft Launch</h4>
                  <p className="text-xs font-light text-zinc-600 leading-relaxed mt-1">
                    Inaugurated a small photography workspace in Portland, documenting outdoor landscapes and couple portraiture.
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-gold border-4 border-zinc-50"></div>
                  <span className="text-sm font-serif text-gold font-bold">2018</span>
                  <h4 className="text-sm font-semibold text-zinc-950 mt-1">Cinematography Expansion</h4>
                  <p className="text-xs font-light text-zinc-600 leading-relaxed mt-1">
                    Equipped our operators with widescreen PL-mount camera systems to introduce high-fidelity candid wedding trailers.
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-gold border-4 border-zinc-50"></div>
                  <span className="text-sm font-serif text-gold font-bold">2026</span>
                  <h4 className="text-sm font-semibold text-zinc-950 mt-1">Global Campaigns</h4>
                  <p className="text-xs font-light text-zinc-600 leading-relaxed mt-1">
                    Celebrating over 500+ successful campaigns across weddings, concert tours, and traditional ceremonies globally.
                  </p>
                </div>
              </div>
            </div>

            {/* Directors */}
            <div>
              <h2 className="text-2xl font-serif tracking-widest mb-8">Meet the Directors</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-zinc-200 rounded-sm overflow-hidden hover:border-gold transition-all">
                  <div className="h-64 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" alt="Christian" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <span className="text-[0.65rem] font-bold text-gold uppercase tracking-wider font-bold">Co-Founder / Director</span>
                    <h3 className="font-serif text-md mt-1 mb-2 text-zinc-900">Christian Navas</h3>
                    <p className="text-xs font-light text-zinc-600 leading-relaxed">
                      Christian manages scene composition and coordinates our on-site lighting arrays for all outdoor campaigns.
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-zinc-200 rounded-sm overflow-hidden hover:border-gold transition-all">
                  <div className="h-64 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80" alt="Logesh" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <span className="text-[0.65rem] font-bold text-gold uppercase tracking-wider font-bold">Cinematography Lead</span>
                    <h3 className="font-serif text-md mt-1 mb-2 text-zinc-900">Logesh Christian</h3>
                    <p className="text-xs font-light text-zinc-600 leading-relaxed">
                      Logesh manages widescreen framing, stage camera tracking, and the post-production color science team.
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-zinc-200 rounded-sm overflow-hidden hover:border-gold transition-all">
                  <div className="h-64 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" alt="Sarah" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <span className="text-[0.65rem] font-bold text-gold uppercase tracking-wider font-bold">Art Director</span>
                    <h3 className="font-serif text-md mt-1 mb-2 text-zinc-900">Sarah Vance</h3>
                    <p className="text-xs font-light text-zinc-600 leading-relaxed">
                      Sarah collaborates with clients on mood boards, clothing coordination, and coordinates physical layout drafts.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Gear Specs */}
            <div>
              <h2 className="text-2xl font-serif tracking-widest mb-6 text-zinc-900">Technical Equipment</h2>
              <div className="overflow-x-auto border border-zinc-200 bg-white">
                <table className="min-w-full text-xs text-left">
                  <thead className="bg-zinc-50 text-gold uppercase font-serif border-b border-zinc-200">
                    <tr>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Deployable Gear</th>
                      <th className="px-6 py-4">Production Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 font-light text-zinc-600">
                    <tr>
                      <td className="px-6 py-4 font-semibold text-zinc-900">Camera Systems</td>
                      <td className="px-6 py-4">RED Komodo 6K, Sony A7R V (61MP)</td>
                      <td className="px-6 py-4">Anamorphic wedding trailers & high-resolution print calibration.</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-semibold text-zinc-900">Optics</td>
                      <td className="px-6 py-4">Summilux Primes (35/50mm), Anamorphic 50mm T2.0</td>
                      <td className="px-6 py-4">Provides dramatic field depth, focus fall-offs, and light flares.</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-semibold text-zinc-900">Stabilizers</td>
                      <td className="px-6 py-4">DJI Ronin 2 Heavy Gimbal, Steadicam systems</td>
                      <td className="px-6 py-4">Cancels vibrations during fast vehicle tracking or stage movements.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 3. PORTFOLIO SCREEN VIEW (MEDIA DASHBOARD) */}
        {activePage === 'portfolio' && (
          <div className="space-y-8 animate-[fadeIn_0.45s_ease-out]">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-gold mb-2 block">Media Showcase</span>
              <h2 className="text-3xl font-serif text-zinc-900">The Production Dashboard</h2>
            </div>

            {/* Dashboard Control Panel */}
            <div className="bg-white border border-zinc-200 p-6 rounded-sm grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Search */}
              <div className="lg:col-span-3 relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input 
                  type="text" 
                  placeholder="Search by title..." 
                  className="w-full bg-zinc-50 border border-zinc-200 text-zinc-800 pl-10 pr-4 py-2 text-xs rounded-sm outline-none focus:border-gold transition-all"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                />
              </div>

              {/* Category Chips */}
              <div className="lg:col-span-6 flex flex-wrap gap-2 justify-center lg:justify-start">
                {['All', 'Weddings', 'Concerts', 'Destinations', 'Heritage', 'Films'].map((cat) => (
                  <button
                    key={cat}
                    className={`px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-wider rounded-sm border transition-all ${
                      categoryFilter === cat 
                        ? 'text-gold border-gold bg-gold/5' 
                        : 'text-zinc-500 border-zinc-200 bg-zinc-50 hover:text-zinc-900 hover:border-zinc-400'
                    }`}
                    onClick={() => { setCategoryFilter(cat); setCurrentPage(1); }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Type Switcher */}
              <div className="lg:col-span-3 flex justify-center lg:justify-end border border-zinc-200 rounded-sm overflow-hidden bg-zinc-50">
                {['All', 'Photos', 'Videos'].map((t) => (
                  <button
                    key={t}
                    className={`px-4 py-2 text-[0.65rem] font-bold uppercase tracking-wider transition-all ${
                      mediaTypeFilter === t 
                        ? 'text-gold bg-gold/5 font-semibold' 
                        : 'text-zinc-500 hover:text-zinc-900'
                    }`}
                    onClick={() => { setMediaTypeFilter(t); setCurrentPage(1); }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Media Masonry Grid */}
            {paginatedMedia.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {paginatedMedia.map((item) => (
                  <div 
                    key={item.id} 
                    className={`bg-white border border-zinc-200 rounded-sm overflow-hidden hover:border-gold transition-all cursor-pointer ${
                      item.colClass === 'span-12 landscape' ? 'md:col-span-12' : 
                      item.colClass === 'span-8 landscape' ? 'md:col-span-8' : 
                      item.colClass === 'span-6 landscape' || item.colClass === 'span-6' ? 'md:col-span-6' : 'md:col-span-4'
                    }`}
                    onClick={() => item.type === 'video' ? setActiveTheaterVideo(item) : setZoomedPhoto(item)}
                  >
                    <div className="relative aspect-video overflow-hidden bg-black">
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-all duration-500" loading="lazy" />
                      {item.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                          <div className="w-12 h-12 rounded-full bg-white/90 border border-gold text-gold flex items-center justify-center hover:bg-gold hover:text-black transition-all">
                            <Play size={16} fill="var(--cine-gold)" className="ml-1" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex justify-between items-center">
                      <h4 className="font-serif text-xs text-zinc-900">{item.title}</h4>
                      <span className="text-[0.6rem] font-bold text-gold uppercase tracking-wider">{item.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 border border-dashed border-zinc-300 text-zinc-500 text-xs">
                No items match your search. Reset the dashboard filters to browse.
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3">
                <button 
                  className="w-10 h-10 bg-white border border-zinc-200 flex items-center justify-center hover:border-gold disabled:opacity-20 transition-all text-zinc-700"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  ◀
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    className={`w-10 h-10 border flex items-center justify-center text-xs font-bold transition-all ${
                      currentPage === i + 1 
                        ? 'bg-gold text-black border-gold shadow-[0_0_10px_rgba(212,175,55,0.25)]' 
                        : 'bg-white border-zinc-200 text-zinc-500 hover:border-gold hover:text-zinc-900'
                    }`}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button 
                  className="w-10 h-10 bg-white border border-zinc-200 flex items-center justify-center hover:border-gold disabled:opacity-20 transition-all text-zinc-700"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  ▶
                </button>
              </div>
            )}
          </div>
        )}

        {/* 4. SERVICES SCREEN VIEW */}
        {activePage === 'services' && (
          <div className="space-y-8 animate-[fadeIn_0.45s_ease-out]">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-gold mb-2 block">Production Rates</span>
              <h2 className="text-3xl font-serif text-zinc-900 animate-[fadeIn_0.45s_ease-out]">Capabilities & Packages</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Selector list */}
              <div className="lg:col-span-4 flex flex-row overflow-x-auto pb-4 lg:pb-0 lg:flex-col gap-3">
                {SERVICES_DATA.map((s) => (
                  <button
                    key={s.id}
                    className={`p-5 text-left border rounded-sm transition-all ${
                      activeServiceTab === s.id 
                        ? 'bg-gold/5 border-gold text-gold font-semibold shadow-[0_0_8px_rgba(212,175,55,0.1)]' 
                        : 'bg-white border-zinc-200 text-zinc-500 hover:border-gold/30 hover:text-zinc-800'
                    }`}
                    onClick={() => setActiveServiceTab(s.id)}
                  >
                    <div className="font-serif text-sm tracking-wider">{s.title}</div>
                    <span className="text-xs opacity-75 mt-1 block">From ${s.rate}</span>
                  </button>
                ))}
              </div>

              {/* Right panel */}
              {(() => {
                const s = SERVICES_DATA.find((item) => item.id === activeServiceTab);
                return (
                  <div className="lg:col-span-8 bg-white border border-zinc-200 p-8 rounded-sm animate-[fadeIn_0.35s_ease-out]">
                    <div className="flex justify-between items-start border-b border-zinc-200 pb-6 mb-6">
                      <div>
                        <h3 className="text-2xl font-serif text-zinc-900">{s.title}</h3>
                        <span className="text-[0.65rem] uppercase tracking-wider text-zinc-500 font-bold block mt-1">Package Calibration Standard</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[0.6rem] uppercase tracking-wider text-zinc-500 block">Investment Starts At</span>
                        <span className="text-3xl font-serif text-gold font-bold">${s.rate}</span>
                      </div>
                    </div>

                    <p className="text-sm font-light text-zinc-600 leading-relaxed mb-6">{s.desc}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-zinc-200 pt-6 mb-8">
                      {/* Deliverables */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gold mb-4">Package Deliverables</h4>
                        <div className="space-y-2 text-xs font-light text-zinc-600">
                          {s.deliverables.map((line, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <span className="text-gold font-bold">✓</span> {line}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Detail specs */}
                      <div className="space-y-4">
                        <div>
                          <span className="text-[0.6rem] uppercase text-zinc-500 block font-bold">Gear Setup Deployed</span>
                          <span className="text-xs text-zinc-600 font-light leading-relaxed block mt-1">{s.gear}</span>
                        </div>
                        <div>
                          <span className="text-[0.6rem] uppercase text-zinc-500 block font-bold">Estimated Session Timeline</span>
                          <span className="text-xs text-zinc-600 font-light leading-relaxed block mt-1">{s.timeline}</span>
                        </div>
                      </div>
                    </div>

                    <button 
                      className="w-full bg-gold text-black text-xs font-bold uppercase tracking-widest py-3 hover:bg-zinc-900 hover:text-white transition-all"
                      onClick={() => handleSelectServiceAndNavigate(s.title)}
                    >
                      Pre-Fill & Book Consultation Date
                    </button>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* 5. CONTACT SCREEN VIEW (APPOINTMENT & FAQ) */}
        {activePage === 'contact' && (
          <div className="space-y-16 animate-[fadeIn_0.45s_ease-out]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Studio Info Details */}
              <div className="lg:col-span-5 space-y-8">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gold mb-2 block">Lounge Locations</span>
                  <h2 className="text-3xl font-serif text-zinc-900">The Cine Lounge</h2>
                  <p className="text-xs font-light text-zinc-500 leading-relaxed mt-2">
                    Our studio consultation area displays printed proofs. Drop in to discuss framing grids and timeline structures.
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-[0.65rem] uppercase tracking-wider text-gold font-bold mb-1">Studio Headquarters</h4>
                    <p className="font-serif text-md text-zinc-900">12 Cinema Boulevard</p>
                    <p className="text-xs text-zinc-500">Suite 104, Portland, OR 97201</p>
                  </div>
                  <div>
                    <h4 className="text-[0.65rem] uppercase tracking-wider text-gold font-bold mb-1">Crew Hotlines</h4>
                    <p className="font-serif text-md text-zinc-900">hello@cinephotography.com</p>
                    <p className="text-xs text-zinc-500">Studio Phone: +1 (503) 555-0198</p>
                  </div>
                  <div>
                    <h4 className="text-[0.65rem] uppercase tracking-wider text-gold font-bold mb-1">Lounge Hours</h4>
                    <p className="font-serif text-md text-zinc-900">Tue - Sat / 10 AM - 7 PM</p>
                    <p className="text-xs text-zinc-500">Sundays by exclusive calendar slot reservation only.</p>
                  </div>
                </div>
              </div>

              {/* Interactive Scheduler Form */}
              <div className="lg:col-span-7 bg-white border border-zinc-200 p-8 rounded-sm">
                {!bookingDone ? (
                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    <h3 className="text-xl font-serif border-b border-zinc-200 pb-3 mb-6 text-zinc-900">Schedule Consultation</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-[0.65rem] uppercase tracking-wider text-zinc-700 font-bold" htmlFor="name">Your Name</label>
                        <input 
                          type="text" 
                          id="name"
                          className="bg-zinc-50 border border-zinc-200 text-zinc-900 p-2.5 text-xs rounded-sm outline-none focus:border-gold transition-all"
                          value={bookingForm.name}
                          onChange={(e) => setBookingForm(prev => ({ ...prev, name: e.target.value }))}
                          required 
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[0.65rem] uppercase tracking-wider text-zinc-700 font-bold" htmlFor="phone">Phone Number</label>
                        <input 
                          type="tel" 
                          id="phone"
                          className="bg-zinc-50 border border-zinc-200 text-zinc-900 p-2.5 text-xs rounded-sm outline-none focus:border-gold transition-all"
                          value={bookingForm.phone}
                          onChange={(e) => setBookingForm(prev => ({ ...prev, phone: e.target.value }))}
                          required 
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[0.65rem] uppercase tracking-wider text-zinc-700 font-bold" htmlFor="email">Email Address</label>
                      <input 
                        type="email" 
                        id="email"
                        className="bg-zinc-50 border border-zinc-200 text-zinc-900 p-2.5 text-xs rounded-sm outline-none focus:border-gold transition-all"
                        value={bookingForm.email}
                        onChange={(e) => setBookingForm(prev => ({ ...prev, email: e.target.value }))}
                        required 
                      />
                    </div>

                    {/* Date Picker Grid */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[0.65rem] uppercase tracking-wider text-zinc-700 font-bold">Select Briefing Date (July 2026)</label>
                      <div className="grid grid-cols-7 gap-1.5 mt-2">
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                          <span key={i} className="text-center text-[0.65rem] font-bold text-zinc-400 uppercase">{day}</span>
                        ))}
                        {MOCK_CAL_DAYS.map((dayItem, idx) => (
                          <button
                            key={idx}
                            type="button"
                            className={`aspect-square bg-zinc-50 border text-xs font-serif font-bold rounded-sm transition-all flex items-center justify-center ${
                              dayItem.disabled ? 'opacity-20 cursor-not-allowed border-transparent' : 
                              calDayIdx === idx ? 'bg-gold text-black border-gold' : 'border-zinc-200 text-zinc-700 hover:border-gold'
                            }`}
                            disabled={dayItem.disabled}
                            onClick={() => setCalDayIdx(idx)}
                          >
                            {dayItem.date}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Slot selector */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[0.65rem] uppercase tracking-wider text-zinc-700 font-bold">Available Briefing Hours</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                        {SCHEDULER_SLOTS.map((slot, idx) => (
                          <button
                            key={idx}
                            type="button"
                            className={`p-2.5 text-center text-xs border rounded-sm transition-all ${
                              calTimeIdx === idx 
                                ? 'bg-zinc-900 text-white border-zinc-900 font-semibold' 
                                : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:border-gold'
                            }`}
                            onClick={() => setCalTimeIdx(idx)}
                          >
                            {slot.split(' ')[0]} {slot.split(' ')[1]}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Service select drop-down */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[0.65rem] uppercase tracking-wider text-zinc-700 font-bold" htmlFor="service-type">Inquiry Target Focus</label>
                      <select 
                        id="service-type"
                        className="bg-zinc-50 border border-zinc-200 text-zinc-900 p-2.5 text-xs rounded-sm outline-none focus:border-gold transition-all"
                        value={bookingForm.service}
                        onChange={(e) => setBookingForm(prev => ({ ...prev, service: e.target.value }))}
                      >
                        <option value="Wedding Cinema & Candid">Wedding Cinema & Candid</option>
                        <option value="Traditional Life Milestones">Traditional Life Milestones</option>
                        <option value="Destination outdoor">Destination outdoor</option>
                        <option value="Concerts & Live Stage">Concerts & Live Stage</option>
                      </select>
                    </div>

                    <button type="submit" className="w-full bg-gold text-black text-xs font-bold uppercase tracking-widest py-3.5 mt-4 hover:bg-zinc-900 hover:text-white transition-all">
                      Confirm Appointment Brief
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-10 space-y-6">
                    <div className="inline-flex bg-gold text-black p-4 rounded-full mx-auto">
                      <Check size={32} />
                    </div>
                    <h3 className="text-2xl font-serif text-zinc-900">Consultation Reserved</h3>
                    
                    {/* Mock invoice receipt */}
                    <div className="bg-zinc-50 border border-zinc-200 p-6 text-left max-w-md mx-auto text-xs space-y-3 font-light text-zinc-600">
                      <div className="border-b border-zinc-200 pb-2 text-center text-gold font-serif uppercase tracking-widest font-semibold">
                        Cine Appointment Spec Summary
                      </div>
                      <div className="flex justify-between">
                        <span>Client Name:</span>
                        <span className="font-semibold text-zinc-900">{bookingForm.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Confirmed Slot:</span>
                        <span className="font-semibold text-zinc-900">July {MOCK_CAL_DAYS[calDayIdx].date}, 2026 @ {SCHEDULER_SLOTS[calTimeIdx].split(' ')[0]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Inquiry Focus:</span>
                        <span className="font-semibold text-zinc-900">{bookingForm.service}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Communication:</span>
                        <span className="font-semibold text-zinc-900">{bookingForm.email}</span>
                      </div>
                    </div>

                    <p className="text-xs text-zinc-500 leading-relaxed max-w-sm mx-auto">
                      We have sent a calendar invitation and catalog proposal specifications to your email address. Our production leads will call you shortly.
                    </p>
                    <button className="border border-zinc-300 text-zinc-700 text-xs font-bold uppercase tracking-widest px-6 py-2.5 mt-2 hover:border-gold hover:text-gold transition-all" onClick={() => { setBookingDone(false); setBookingForm({ name: '', email: '', phone: '', service: 'Wedding Cinema & Candid', notes: '' }); }}>
                      Adjust Settings
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Collapsible FAQ accordion */}
            <div className="border-t border-zinc-200 pt-12 max-w-3xl mx-auto">
              <h2 className="text-2xl font-serif tracking-widest text-center mb-8 text-zinc-900">Frequently Answered Questions</h2>
              <div className="space-y-4">
                {FAQ_DATA.map((faq, idx) => (
                  <div key={idx} className="bg-white border border-zinc-200 rounded-sm">
                    <button
                      className="w-full p-5 text-left text-xs font-bold uppercase tracking-wider text-zinc-900 flex justify-between items-center"
                      onClick={() => setOpenFaqIdx(openFaqIdx === idx ? -1 : idx)}
                      type="button"
                    >
                      <span className="flex items-center gap-3"><HelpCircle size={16} className="text-gold" /> {faq.q}</span>
                      <span>{openFaqIdx === idx ? '▲' : '▼'}</span>
                    </button>
                    {openFaqIdx === idx && (
                      <div className="p-5 pt-0 border-t border-zinc-100 text-xs font-light text-zinc-500 leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Minimalist Single-Line Footer */}
      <footer className="border-t border-zinc-200 bg-white py-6 text-center text-[0.65rem] text-zinc-400 uppercase tracking-widest">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <span>© 2026 Cine Photography Studio. All rights reserved.</span>
          <span className="text-gold">Built for luxury cinematic rendering.</span>
        </div>
      </footer>

      {/* Simulated Theater Lightbox */}
      {activeTheaterVideo && (
        <div className="theater-overlay" onClick={closeTheater}>
          <div className="theater-container" onClick={(e) => e.stopPropagation()}>
            <button className="theater-close-btn" onClick={closeTheater}>
              <X size={16} className="mr-1.5 inline-block align-middle" />
              Close Screen
            </button>
            
            <div className="theater-screen-wrap">
              <img src={activeTheaterVideo.img} alt="Film Frame" />
              
              <div className="theater-header-info">
                <span className="theater-reel-sub">Film Reel Trailer</span>
                <h3 className="theater-reel-title">{activeTheaterVideo.title}</h3>
              </div>

              {!theaterPlaying && (
                <div className="theater-central-play" onClick={() => setTheaterPlaying(true)}>
                  <Play size={24} fill="var(--cine-gold)" className="ml-1" />
                </div>
              )}
            </div>

            <div className="theater-controls-panel">
              <div 
                className="theater-timeline-bar"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const newProgress = Math.round((clickX / rect.width) * 100);
                  setTheaterProgress(newProgress);
                }}
              >
                <div className="theater-timeline-fill" style={{ width: `${theaterProgress}%` }}></div>
                <div className="theater-timeline-handle" style={{ left: `${theaterProgress}%` }}></div>
              </div>

              <div className="theater-btn-row">
                <div className="theater-btn-group-left">
                  <button className="theater-raw-btn" onClick={() => setTheaterPlaying(!theaterPlaying)}>
                    {theaterPlaying ? <Pause size={18} fill="#fff" /> : <Play size={18} fill="#fff" />}
                  </button>
                  <span className="text-xs opacity-75">
                    00:{theaterProgress < 10 ? `0${theaterProgress}` : theaterProgress} / 02:15
                  </span>
                </div>
                
                <div className="text-[0.65rem] text-gold font-bold tracking-widest uppercase">
                  24 FPS • ANAMORPHIC WIDESCREEN • REC.709
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Photo Zoom Lightbox */}
      {zoomedPhoto && (
        <div className="zoom-lightbox-overlay" onClick={() => setZoomedPhoto(null)}>
          <div className="zoom-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="zoom-close-btn" onClick={() => setZoomedPhoto(null)}>
              <X size={16} className="mr-1.5 inline-block align-middle text-zinc-800" />
              Close Plate
            </button>
            <img src={zoomedPhoto.img} alt="Zoomed Frame" />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6">
              <span className="text-[0.65rem] text-gold font-bold uppercase tracking-wider">{zoomedPhoto.category}</span>
              <h3 className="font-serif text-lg text-white mt-1">{zoomedPhoto.title}</h3>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {successToast && (
        <div className="toast-msg-cine">
          {successToast}
        </div>
      )}
    </div>
  );
}

export default App;
