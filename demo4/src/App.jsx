import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Camera, Video, MapPin, Music, Heart, Star, ChevronLeft, ChevronRight,
  Play, Pause, Check, X, Phone, Mail, Clock, Calendar,
  Award, Aperture, MoreVertical, ChevronDown, ArrowRight, Users,
  Film, Zap, Globe, Link2
} from 'lucide-react';

// ─── DATA ──────────────────────────────────────────────────────────────────────

const HERO_SLIDES = [
  {
    id: 1,
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=90',
    tag: 'Wedding Cinema',
    title: 'Every Love Story Deserves a Masterpiece',
    sub: 'Full-day cinematic coverage from vows to last dance',
  },
  {
    id: 2,
    img: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1800&q=90',
    tag: 'Concert & Live Events',
    title: 'Energy Frozen in a Single Frame',
    sub: 'High-speed low-light photography for the unforgettable stage',
  },
  {
    id: 3,
    img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1800&q=90',
    tag: 'Destination Films',
    title: 'The World Is Your Studio',
    sub: 'From Alpine peaks to desert dunes — we travel anywhere',
  },
  {
    id: 4,
    img: 'https://images.unsplash.com/photo-1561525140-c2a4cc68e4bd?auto=format&fit=crop&w=1800&q=90',
    tag: 'Heritage & Tradition',
    title: 'Culture Captured With Reverence',
    sub: 'Preserving ceremonies, rituals, and family milestones',
  },
  {
    id: 5,
    img: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=1800&q=90',
    tag: 'Editorial & Portrait',
    title: 'Your Portrait, Painted in Light',
    sub: 'Fine art editorial photography for personal and commercial brands',
  },
];

const STATS = [
  { num: '380+', label: 'Weddings Filmed' },
  { num: '120+', label: 'Live Concerts' },
  { num: '50+', label: 'Travel Films' },
  { num: '10', label: 'Years of Excellence' },
];

const CATEGORIES = [
  { id: 'weddings',   label: 'Weddings',   icon: Heart,   img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=700&q=80', desc: 'Full-day cinematic wedding coverage' },
  { id: 'concerts',  label: 'Concerts',   icon: Music,   img: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=700&q=80', desc: 'High-speed stage & event photography' },
  { id: 'heritage',  label: 'Heritage',   icon: Star,    img: 'https://images.unsplash.com/photo-1561525140-c2a4cc68e4bd?auto=format&fit=crop&w=700&q=80', desc: 'Traditional ceremonies & milestones' },
  { id: 'travel',    label: 'Travel',     icon: Globe,   img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=700&q=80', desc: 'Destination & landscape cinematography' },
  { id: 'maternity', label: 'Maternity',  icon: Heart,   img: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=700&q=80', desc: 'Intimate pregnancy & newborn portraits' },
  { id: 'editorial', label: 'Editorial',  icon: Camera,  img: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=700&q=80', desc: 'Fine art personal & brand portraits' },
];

const TESTIMONIALS = [
  {
    name: 'Priya & Arjun Sharma',
    role: 'Wedding Couple, Bangalore 2024',
    text: 'Cine Photography turned our wedding into a film we watch every anniversary. The team was invisible yet omnipresent — catching every tear, every laugh. Worth every rupee and more.',
    rating: 5,
    avatar: 'PA',
  },
  {
    name: 'Marcus Reynolds',
    role: 'Event Director, Sonic Fest 2023',
    text: 'Their concert coverage is in a different league. Low-light shots that look like they were lit by a Hollywood crew. Turnaround was fast and every frame was usable.',
    rating: 5,
    avatar: 'MR',
  },
  {
    name: 'Layla Hassan',
    role: 'Travel Blogger & Client',
    text: "I've worked with photographers across 12 countries. Cine Photography's composition and storytelling instinct is genuinely rare. My Morocco campaign reel went viral because of their eye.",
    rating: 5,
    avatar: 'LH',
  },
];

const PORTFOLIO_ITEMS = [
  { id: 1, cat: 'weddings',   title: 'The Golden Vow',          img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',  size: 'tall' },
  { id: 2, cat: 'concerts',   title: 'Neon Stage Fury',          img: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80',  size: 'wide' },
  { id: 3, cat: 'travel',     title: 'Alpine Dawn Breaks',       img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',  size: 'normal' },
  { id: 4, cat: 'heritage',   title: 'The Silk Ceremony',        img: 'https://images.unsplash.com/photo-1561525140-c2a4cc68e4bd?auto=format&fit=crop&w=800&q=80',  size: 'normal' },
  { id: 5, cat: 'weddings',   title: 'Crimson & Gold Reception', img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',  size: 'tall' },
  { id: 6, cat: 'editorial',  title: 'Dust & Light Studio',      img: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=800&q=80',  size: 'normal' },
  { id: 7, cat: 'travel',     title: 'Varanasi at Dusk',         img: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80',  size: 'wide' },
  { id: 8, cat: 'maternity',  title: 'Golden Hour Bloom',        img: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80',  size: 'normal' },
  { id: 9, cat: 'concerts',   title: 'Festival Fire',            img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',  size: 'normal' },
  { id: 10, cat: 'weddings',  title: 'First Look — Whisper',     img: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80', size: 'tall' },
  { id: 11, cat: 'heritage',  title: 'Kolam at Sunrise',         img: 'https://images.unsplash.com/photo-1609872868588-5f3697d8e81a?auto=format&fit=crop&w=800&q=80', size: 'normal' },
  { id: 12, cat: 'editorial', title: 'Monochrome Gaze',          img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80', size: 'normal' },
];

const PACKAGES = [
  {
    id: 'essential',
    name: 'Essential',
    tagline: 'Perfect for intimate celebrations',
    price: '750',
    featured: false,
    features: [
      '6-Hour Single Photographer Coverage',
      '200+ Color-Graded Digital Proofs',
      'Online Private Gallery (12 months)',
      '1 Cinematic Highlight Reel (3 min)',
      'Print-Ready Files Included',
    ],
    cta: 'Book Essential',
  },
  {
    id: 'signature',
    name: 'Signature',
    tagline: 'Our most popular full-day package',
    price: '1,400',
    featured: true,
    features: [
      'Full Day 10-Hour Dual Coverage',
      '450+ Color-Graded Digital Proofs',
      'Online Private Gallery (24 months)',
      '5-Minute Cinematic Film + Trailer',
      'Drone Aerial Footage',
      'Luxury Hardcover Photo Album',
      'Same-Day Preview Reel (30 sec)',
    ],
    cta: 'Book Signature',
  },
  {
    id: 'prestige',
    name: 'Prestige',
    tagline: 'Multi-day cinematic odyssey',
    price: '2,800',
    featured: false,
    features: [
      '3-Day Multi-Event Full Coverage',
      'Unlimited Color-Graded Proofs',
      'Private Gallery Lifetime Access',
      'Feature Film (12–18 minutes)',
      'International Travel Coverage',
      'Two Luxury Photo Albums',
      'Custom Score Soundtrack',
      'Priority 30-Day Delivery',
    ],
    cta: 'Book Prestige',
  },
];

const PROCESS_STEPS = [
  { num: '01', title: 'Inquiry',     desc: 'Reach out via our contact form or call. We respond within 24 hours.', icon: Mail },
  { num: '02', title: 'Consultation', desc: 'A free 30-minute call to understand your vision and requirements.', icon: Phone },
  { num: '03', title: 'Shoot Day',   desc: 'We arrive early, stay late, and capture everything in between.', icon: Camera },
  { num: '04', title: 'Post-Edit',   desc: 'Color grading, sound design, and cinematic sequencing for every frame.', icon: Film },
  { num: '05', title: 'Delivery',    desc: 'Online gallery + high-res downloads, typically within 30 days.', icon: Zap },
];

const FAQS = [
  { q: 'How far in advance should we book?', a: 'We recommend booking at least 3–6 months in advance for weddings and large events. For smaller shoots and editorial sessions, 4–6 weeks is usually sufficient.' },
  { q: 'Do you travel internationally?', a: 'Absolutely. We have covered shoots in 18 countries. Travel and accommodation costs are billed separately at cost.' },
  { q: 'What is your editing style?', a: 'Our signature style is warm, high-contrast, and cinematic — inspired by analog film tones. We also offer natural-light and editorial styles on request.' },
  { q: 'Do you provide raw files?', a: 'We do not typically provide unedited raw files. Our post-production is an integral part of the Cine Photography experience. However, exceptions can be discussed for commercial clients.' },
  { q: 'What equipment do you use?', a: 'We shoot on Sony FX3, Sony A7 IV, Canon EOS R5, DJI Mavic 3 Cine drone, and a range of Zeiss and Sigma Art prime lenses.' },
];

const CREW = [
  { name: 'Aryan Kapoor', role: 'Lead Cinematographer', spec: 'Sony FX3 / Aerial Drone', img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80' },
  { name: 'Meera Sundaram', role: 'Lead Photographer', spec: 'Canon EOS R5 / Portrait Lighting', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80' },
  { name: 'Jake Okonkwo', role: 'Color & Post-Production', spec: 'DaVinci Resolve / Sound Design', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
];

const TIMELINE = [
  { year: '2014', title: 'Studio Founded', desc: 'Aryan & Meera founded Cine Photography in Chennai with two cameras and an unstoppable vision.' },
  { year: '2016', title: 'First International Shoot', desc: 'Covered a destination wedding in Bali — our first of many international adventures.' },
  { year: '2018', title: 'Awards Recognition', desc: 'Won Best Wedding Film at the South Asia Wedding Awards. Our reel crossed 2M views.' },
  { year: '2020', title: 'Studio Expansion', desc: 'Expanded to a full crew of 8 professionals and opened our in-house post-production suite.' },
  { year: '2022', title: 'Celebrity Clientele', desc: 'Covered 3 high-profile celebrity weddings and appeared in Vogue India feature on photographers.' },
  { year: '2024', title: 'Decade of Stories', desc: 'Celebrating 10 years, 380+ weddings, and thousands of memories preserved for life.' },
];

// ─── NAVBAR ────────────────────────────────────────────────────────────────────

function Navbar({ activePage, setActivePage }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navItems = ['home', 'about', 'portfolio', 'services', 'contact'];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-charcoal/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.6)] border-b border-gold' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <button
            className="flex items-center gap-3 group"
            onClick={() => setActivePage('home')}
          >
            <div className="w-10 h-10 rounded-full border-2 border-gold overflow-hidden flex-shrink-0">
              <img src="/Logo.jpeg" alt="Cine Photography Logo" className="w-full h-full object-cover" />
            </div>
            <div className="text-left">
              <div className="font-serif text-lg font-bold text-ivory leading-none tracking-wider">
                CINE<span className="text-gold">.</span>
              </div>
              <div className="text-[0.55rem] font-sans font-medium uppercase tracking-[0.3em] text-ivory/50">
                Photography
              </div>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(tab => (
              <button
                key={tab}
                onClick={() => setActivePage(tab)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-widest font-sans transition-all duration-300 relative group ${
                  activePage === tab ? 'text-gold' : 'text-ivory/60 hover:text-ivory'
                }`}
              >
                {tab}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-gold transition-all duration-300 ${
                  activePage === tab ? 'w-4' : 'w-0 group-hover:w-4'
                }`} />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Book CTA — hidden on mobile */}
            <button
              onClick={() => setActivePage('contact')}
              className="hidden md:block bg-gold text-charcoal text-xs font-bold uppercase tracking-widest px-5 py-2.5 font-sans hover:bg-ivory transition-all duration-300 animate-pulse-gold"
            >
              Book Now
            </button>

            {/* Mobile Three-Dot Menu */}
            <div className="mobile-menu-wrapper md:hidden">
              <button className="text-gold p-2 hover:opacity-70 transition-opacity" aria-label="Open menu">
                <MoreVertical size={22} />
              </button>
              <ul className="mobile-dropdown">
                {navItems.map(tab => (
                  <li key={tab}>
                    <button onClick={() => setActivePage(tab)} className={activePage === tab ? '!text-gold' : ''}>
                      {tab}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}

// ─── HERO CAROUSEL ─────────────────────────────────────────────────────────────

function HeroCarousel({ setActivePage }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const advance = useCallback((dir) => {
    setCurrent(prev => (prev + dir + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => advance(1), 5500);
    return () => clearInterval(timerRef.current);
  }, [paused, advance]);

  return (
    <section
      className="relative w-full h-screen overflow-hidden bg-charcoal"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      {HERO_SLIDES.map((slide, idx) => (
        <div key={slide.id} className={`carousel-slide ${idx === current ? 'active' : ''}`}>
          <img
            src={slide.img}
            alt={slide.title}
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.45) contrast(1.1) saturate(0.85)' }}
          />
        </div>
      ))}

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/60 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent z-10" />

      {/* Film-frame corners */}
      <div className="absolute top-20 left-6 w-12 h-12 border-t-2 border-l-2 border-gold/50 z-20 hidden md:block" />
      <div className="absolute top-20 right-6 w-12 h-12 border-t-2 border-r-2 border-gold/50 z-20 hidden md:block" />
      <div className="absolute bottom-24 left-6 w-12 h-12 border-b-2 border-l-2 border-gold/50 z-20 hidden md:block" />
      <div className="absolute bottom-24 right-6 w-12 h-12 border-b-2 border-r-2 border-gold/50 z-20 hidden md:block" />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 w-full">
          <div key={current} className="max-w-2xl animate-slide-up">
            <span className="inline-block text-gold text-xs font-bold uppercase tracking-[0.3em] font-sans mb-4 border border-gold/30 px-3 py-1">
              {HERO_SLIDES[current].tag}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl font-bold text-ivory leading-tight mb-5">
              {HERO_SLIDES[current].title}
            </h1>
            <p className="font-sans text-sm md:text-base font-light text-ivory/70 mb-8 max-w-lg leading-relaxed">
              {HERO_SLIDES[current].sub}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setActivePage('portfolio')}
                className="bg-gold text-charcoal text-xs font-bold uppercase tracking-widest px-7 py-3 font-sans hover:bg-ivory transition-all duration-300 flex items-center gap-2 w-fit"
              >
                View Our Work <ArrowRight size={14} />
              </button>
              <button
                onClick={() => setActivePage('contact')}
                className="border border-ivory/30 text-ivory text-xs font-bold uppercase tracking-widest px-7 py-3 font-sans hover:border-gold hover:text-gold transition-all duration-300 w-fit"
              >
                Book a Session
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={() => advance(-1)}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 border border-gold/40 text-gold flex items-center justify-center hover:bg-gold hover:text-charcoal transition-all duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => advance(1)}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 border border-gold/40 text-gold flex items-center justify-center hover:bg-gold hover:text-charcoal transition-all duration-300"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* Film-strip dot indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`transition-all duration-500 rounded-full ${
              idx === current
                ? 'w-8 h-2 bg-gold'
                : 'w-2 h-2 bg-ivory/30 hover:bg-ivory/60'
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-10 right-6 md:right-10 z-30 font-serif text-ivory/40 text-sm hidden md:block">
        {String(current + 1).padStart(2, '0')} <span className="text-gold/50">/</span> {String(HERO_SLIDES.length).padStart(2, '0')}
      </div>
    </section>
  );
}

// ─── HOME PAGE ─────────────────────────────────────────────────────────────────

function HomePage({ setActivePage }) {
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [counters, setCounters] = useState({ w: 0, c: 0, t: 0, y: 0 });

  // Auto-advance testimonials
  useEffect(() => {
    const t = setInterval(() => setTestimonialIdx(p => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  // Animated counters
  useEffect(() => {
    const targets = [380, 120, 50, 10];
    const keys = ['w', 'c', 't', 'y'];
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCounters({
        w: Math.floor(targets[0] * ease),
        c: Math.floor(targets[1] * ease),
        t: Math.floor(targets[2] * ease),
        y: Math.floor(targets[3] * ease),
      });
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, []);

  const counterValues = [counters.w, counters.c, counters.t, counters.y];

  return (
    <div>
      {/* Hero */}
      <HeroCarousel setActivePage={setActivePage} />

      {/* Stats Bar */}
      <div className="bg-charcoal-800 border-y border-gold/20">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-gold/10">
          {STATS.map((s, i) => (
            <div key={s.label} className="text-center py-4 md:py-0 px-4 md:px-8">
              <div className="stat-num">{counterValues[i]}+</div>
              <div className="text-ivory/50 text-xs font-sans font-medium uppercase tracking-widest mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* What We Shoot — horizontal scroll */}
      <section className="section-pad bg-charcoal overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-gold text-xs font-bold uppercase tracking-[0.25em] font-sans block mb-2">Our Specialties</span>
              <h2 className="font-serif text-3xl md:text-4xl text-ivory gold-line">What We Shoot</h2>
            </div>
            <button
              onClick={() => setActivePage('portfolio')}
              className="hidden md:flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-widest font-sans hover:text-ivory transition-colors"
            >
              Full Portfolio <ArrowRight size={14} />
            </button>
          </div>
        </div>
        {/* Horizontal scrollable strip */}
        <div className="flex gap-4 overflow-x-auto pb-4 px-6 max-w-7xl mx-auto scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className="flex-none w-64 md:w-72 group cursor-pointer"
                onClick={() => setActivePage('portfolio')}
              >
                <div className="relative overflow-hidden aspect-[3/4] bg-charcoal-800">
                  <img
                    src={cat.img}
                    alt={cat.label}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    style={{ filter: 'brightness(0.55) saturate(0.8)' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon size={14} className="text-gold" />
                      <span className="text-gold text-xs font-bold uppercase tracking-wider font-sans">{cat.label}</span>
                    </div>
                    <p className="text-ivory/60 text-xs font-sans leading-snug">{cat.desc}</p>
                  </div>
                  {/* Hover film border */}
                  <div className="absolute inset-2 border border-gold/0 group-hover:border-gold/40 transition-all duration-500 pointer-events-none" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-pad bg-charcoal-800 border-y border-gold/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-gold text-xs font-bold uppercase tracking-[0.25em] font-sans block mb-2">Client Stories</span>
          <h2 className="font-serif text-3xl md:text-4xl text-ivory mb-12">What Our Clients Say</h2>

          <div className="relative min-h-[200px]">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={t.name}
                className={`absolute inset-0 transition-all duration-700 ${
                  idx === testimonialIdx ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                }`}
              >
                <div className="flex justify-center gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} className="fill-gold text-gold" />
                  ))}
                </div>
                <blockquote className="font-serif text-xl md:text-2xl italic text-ivory/90 leading-relaxed mb-8">
                  "{t.text}"
                </blockquote>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold text-charcoal flex items-center justify-center font-bold text-sm font-sans">
                    {t.avatar}
                  </div>
                  <div className="text-left">
                    <div className="text-ivory text-sm font-semibold font-sans">{t.name}</div>
                    <div className="text-ivory/40 text-xs font-sans">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonial dots */}
          <div className="flex justify-center gap-2 mt-10">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setTestimonialIdx(idx)}
                className={`transition-all duration-300 rounded-full ${
                  idx === testimonialIdx ? 'w-6 h-2 bg-gold' : 'w-2 h-2 bg-ivory/20 hover:bg-ivory/40'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative overflow-hidden py-24 bg-charcoal">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=60")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'grayscale(1)',
        }} />
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal/95 to-charcoal" />
        <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
          <span className="text-gold text-xs font-bold uppercase tracking-[0.3em] font-sans">Ready to Begin?</span>
          <h2 className="font-serif text-4xl md:text-5xl text-ivory mt-3 mb-5 leading-tight">Your Story Deserves<br />to Be a Film</h2>
          <p className="text-ivory/60 font-sans text-sm leading-relaxed mb-8">
            Limited slots available each season. Inquire now to check availability for your date.
          </p>
          <button
            onClick={() => setActivePage('contact')}
            className="bg-gold text-charcoal text-sm font-bold uppercase tracking-widest px-10 py-4 font-sans hover:bg-ivory transition-all duration-300 inline-flex items-center gap-3"
          >
            Book Your Session <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
}

// ─── ABOUT PAGE ────────────────────────────────────────────────────────────────

function AboutPage() {
  return (
    <div className="pt-20 bg-charcoal min-h-screen">

      {/* Hero Banner */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=1800&q=80"
          alt="About Cine Photography"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.3) saturate(0.6)' }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="text-gold text-xs font-bold uppercase tracking-[0.3em] font-sans block mb-3">Our Story</span>
            <h1 className="font-serif text-4xl md:text-6xl text-ivory">The Studio</h1>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <section className="section-pad">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="film-frame">
              <img
                src="https://images.unsplash.com/photo-1509041322357-8a3f9757a475?auto=format&fit=crop&w=800&q=80"
                alt="Cine Photography studio"
                className="w-full aspect-[4/5] object-cover"
                style={{ filter: 'sepia(15%) contrast(1.05)' }}
              />
            </div>
            <div>
              <span className="text-gold text-xs font-bold uppercase tracking-[0.25em] font-sans block mb-3">Who We Are</span>
              <h2 className="font-serif text-3xl md:text-4xl text-ivory mb-6 leading-tight">
                Built on Passion.<br />Defined by Craft.
              </h2>
              <p className="text-ivory/65 font-sans text-sm leading-relaxed mb-5">
                Cine Photography was born from a single belief — that every human experience, however ordinary it may seem, contains extraordinary stories waiting to be told. We are not just photographers; we are visual architects of memory.
              </p>
              <p className="text-ivory/65 font-sans text-sm leading-relaxed mb-5">
                Founded in 2014 by cinematographer Aryan Kapoor and portrait photographer Meera Sundaram, our studio has grown from a two-person team into a full creative collective of 8 professionals spanning cinematography, photography, color science, and sound design.
              </p>
              <blockquote className="border-l-2 border-gold pl-5 my-6">
                <p className="font-serif italic text-xl text-ivory/90 leading-relaxed">
                  "We don't just capture moments. We build archives of feeling."
                </p>
                <cite className="text-gold text-xs font-sans font-bold uppercase tracking-wider mt-2 block not-italic">— Aryan Kapoor, Founder</cite>
              </blockquote>
              <div className="flex flex-wrap gap-4 mt-6">
                {[['18', 'Countries'], ['380+', 'Weddings'], ['10', 'Awards']].map(([num, label]) => (
                  <div key={label} className="bg-charcoal-800 border border-gold/20 px-5 py-4 text-center">
                    <div className="font-serif text-2xl font-bold text-gold">{num}</div>
                    <div className="text-ivory/50 text-xs font-sans uppercase tracking-wider">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Crew */}
      <section className="section-pad bg-charcoal-800 border-y border-gold/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-gold text-xs font-bold uppercase tracking-[0.25em] font-sans block mb-2">The People</span>
            <h2 className="font-serif text-3xl md:text-4xl text-ivory">Meet the Crew</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CREW.map(member => (
              <div key={member.name} className="group text-center">
                <div className="relative overflow-hidden mb-5 film-frame mx-auto w-48 h-48 rounded-full">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    style={{ filter: 'grayscale(30%)' }}
                  />
                  <div className="absolute inset-0 rounded-full border-2 border-gold/0 group-hover:border-gold/50 transition-all duration-500" />
                </div>
                <h3 className="font-serif text-xl text-ivory mb-1">{member.name}</h3>
                <div className="text-gold text-xs font-bold uppercase tracking-wider font-sans mb-1">{member.role}</div>
                <div className="text-ivory/40 text-xs font-sans">{member.spec}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-pad overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-gold text-xs font-bold uppercase tracking-[0.25em] font-sans block mb-2">Our Journey</span>
            <h2 className="font-serif text-3xl md:text-4xl text-ivory">A Decade of Stories</h2>
          </div>
          {/* Horizontal scrolling timeline */}
          <div className="overflow-x-auto pb-4" style={{ scrollbarWidth: 'none' }}>
            <div className="flex gap-0 min-w-max">
              {TIMELINE.map((item, idx) => (
                <div key={item.year} className="flex-none w-56 md:w-64 relative">
                  {/* Connector line */}
                  <div className="absolute top-4 left-0 right-0 h-px bg-gold/20" />
                  <div className="relative pt-8 pr-6">
                    <div className="absolute top-0 left-0 w-8 h-8 rounded-full bg-charcoal border-2 border-gold flex items-center justify-center z-10">
                      <div className="w-2 h-2 rounded-full bg-gold" />
                    </div>
                    <div className="font-serif text-2xl font-bold text-gold mb-2">{item.year}</div>
                    <div className="text-ivory text-sm font-semibold font-sans mb-1">{item.title}</div>
                    <div className="text-ivory/50 text-xs font-sans leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Awards marquee */}
      <section className="py-8 bg-charcoal-800 border-y border-gold/10 overflow-hidden">
        <div className="marquee-strip">
          {[...Array(2)].map((_, setIdx) => (
            <React.Fragment key={setIdx}>
              {['Best Wedding Film — SWA 2018', 'Top 10 Studios — Vogue India 2022', 'Excellence in Cinematography 2021', 'Destination Wedding Specialist 2023', 'Best Concert Photography 2020', 'Heritage Preservation Award 2019'].map((award, i) => (
                <div key={`${setIdx}-${i}`} className="flex items-center gap-4 mx-8 flex-none">
                  <Award size={14} className="text-gold flex-none" />
                  <span className="text-ivory/50 text-xs font-sans uppercase tracking-widest whitespace-nowrap">{award}</span>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── PORTFOLIO PAGE ─────────────────────────────────────────────────────────────

function PortfolioPage() {
  const [filter, setFilter] = useState('all');
  const [lightbox, setLightbox] = useState(null);

  const filters = ['all', 'weddings', 'concerts', 'heritage', 'travel', 'maternity', 'editorial'];
  const displayed = filter === 'all' ? PORTFOLIO_ITEMS : PORTFOLIO_ITEMS.filter(p => p.cat === filter);

  const lightboxIdx = lightbox !== null ? displayed.findIndex(p => p.id === lightbox.id) : -1;

  const navLightbox = (dir) => {
    const newIdx = (lightboxIdx + dir + displayed.length) % displayed.length;
    setLightbox(displayed[newIdx]);
  };

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="pt-20 bg-charcoal min-h-screen">

      {/* Header */}
      <div className="relative h-48 md:h-64 bg-charcoal-800 flex items-center overflow-hidden border-b border-gold/10">
        <div className="absolute inset-0 opacity-15" style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=60")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />
        <div className="relative max-w-7xl mx-auto px-6 w-full">
          <span className="text-gold text-xs font-bold uppercase tracking-[0.25em] font-sans block mb-2">Visual Archives</span>
          <h1 className="font-serif text-4xl md:text-5xl text-ivory">Portfolio</h1>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-16 md:top-20 z-40 bg-charcoal/95 backdrop-blur border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-6 py-3 flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-none px-4 py-2 text-xs font-bold uppercase tracking-widest font-sans transition-all duration-300 rounded-sm ${
                filter === f
                  ? 'bg-gold text-charcoal'
                  : 'text-ivory/50 border border-ivory/10 hover:border-gold/40 hover:text-gold'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {displayed.map(item => (
            <div
              key={item.id}
              className="portfolio-card break-inside-avoid cursor-pointer relative overflow-hidden bg-charcoal-800 border border-gold/10 hover:border-gold/40 transition-all duration-300"
              onClick={() => setLightbox(item)}
            >
              <img
                src={item.img}
                alt={item.title}
                className={`w-full object-cover ${item.size === 'tall' ? 'aspect-[3/4]' : item.size === 'wide' ? 'aspect-[4/3]' : 'aspect-square'}`}
                style={{ filter: 'brightness(0.9) saturate(0.9)' }}
              />
              <div className="overlay absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent flex flex-col justify-end p-5">
                <div className="text-gold text-xs font-bold uppercase tracking-wider font-sans mb-1">{item.cat}</div>
                <div className="font-serif text-lg text-ivory">{item.title}</div>
                <div className="flex items-center gap-2 mt-2 text-gold">
                  <Play size={14} />
                  <span className="text-xs font-sans font-bold uppercase tracking-wider">View</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-charcoal/97 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            {/* Close */}
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-10 right-0 text-ivory/60 hover:text-gold flex items-center gap-2 font-sans text-xs uppercase tracking-widest"
            >
              Close <X size={16} />
            </button>
            {/* Image */}
            <div className="relative film-frame">
              <img src={lightbox.img} alt={lightbox.title} className="w-full max-h-[75vh] object-contain" />
            </div>
            {/* Info */}
            <div className="flex items-center justify-between mt-4 px-2">
              <div>
                <div className="text-gold text-xs font-bold uppercase tracking-wider font-sans">{lightbox.cat}</div>
                <div className="font-serif text-lg text-ivory">{lightbox.title}</div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => navLightbox(-1)}
                  className="w-9 h-9 border border-gold/30 text-gold flex items-center justify-center hover:bg-gold hover:text-charcoal transition-all"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => navLightbox(1)}
                  className="w-9 h-9 border border-gold/30 text-gold flex items-center justify-center hover:bg-gold hover:text-charcoal transition-all"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── SERVICES PAGE ─────────────────────────────────────────────────────────────

function ServicesPage({ setActivePage }) {
  const [openFaq, setOpenFaq] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);

  return (
    <div className="pt-20 bg-charcoal min-h-screen">

      {/* Header */}
      <div className="relative h-48 md:h-64 bg-charcoal-800 flex items-center overflow-hidden border-b border-gold/10">
        <div className="absolute inset-0 opacity-15" style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=1800&q=60")',
          backgroundSize: 'cover',
        }} />
        <div className="relative max-w-7xl mx-auto px-6 w-full">
          <span className="text-gold text-xs font-bold uppercase tracking-[0.25em] font-sans block mb-2">Packages & Process</span>
          <h1 className="font-serif text-4xl md:text-5xl text-ivory">Services</h1>
        </div>
      </div>

      {/* Packages */}
      <section className="section-pad">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-gold text-xs font-bold uppercase tracking-[0.25em] font-sans block mb-2">Investment</span>
            <h2 className="font-serif text-3xl md:text-4xl text-ivory mb-3">Choose Your Experience</h2>
            <p className="text-ivory/50 text-sm font-sans max-w-md mx-auto">All packages include copyright release and are fully customisable for your event.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PACKAGES.map(pkg => (
              <div
                key={pkg.id}
                className={`package-card relative border bg-charcoal-800 p-8 flex flex-col ${
                  pkg.featured
                    ? 'border-gold shadow-[0_0_40px_rgba(212,175,55,0.15)]'
                    : 'border-gold/20'
                }`}
              >
                {pkg.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-charcoal text-xs font-bold uppercase tracking-widest px-4 py-1 font-sans">
                    Most Popular
                  </div>
                )}
                {/* Film frame corners */}
                <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-gold/40" />
                <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-gold/40" />
                <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-gold/40" />
                <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-gold/40" />

                <div className="mb-6">
                  <h3 className="font-serif text-2xl text-ivory mb-1">{pkg.name}</h3>
                  <p className="text-ivory/40 text-xs font-sans">{pkg.tagline}</p>
                </div>
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-gold text-xs font-sans font-bold">$</span>
                    <span className="font-serif text-5xl font-bold text-gold">{pkg.price}</span>
                  </div>
                  <div className="text-ivory/30 text-xs font-sans mt-1">Starting price</div>
                </div>
                <div className="flex-1 space-y-3 mb-8">
                  {pkg.features.map(feat => (
                    <div key={feat} className="flex items-start gap-3 text-sm">
                      <div className="w-4 h-4 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center flex-none mt-0.5">
                        <Check size={10} className="text-gold" />
                      </div>
                      <span className="text-ivory/70 font-sans">{feat}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => { setSelectedPackage(pkg.name); setActivePage('contact'); }}
                  className={`w-full py-3 text-xs font-bold uppercase tracking-widest font-sans transition-all duration-300 ${
                    pkg.featured
                      ? 'bg-gold text-charcoal hover:bg-ivory'
                      : 'border border-gold/30 text-gold hover:bg-gold hover:text-charcoal'
                  }`}
                >
                  {pkg.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="section-pad bg-charcoal-800 border-y border-gold/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-gold text-xs font-bold uppercase tracking-[0.25em] font-sans block mb-2">How It Works</span>
            <h2 className="font-serif text-3xl md:text-4xl text-ivory">Our Creative Process</h2>
          </div>
          {/* Process flow */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {PROCESS_STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={step.num} className="relative">
                  {/* Connector */}
                  {idx < PROCESS_STEPS.length - 1 && (
                    <div className="hidden lg:block absolute top-7 left-full w-full h-px bg-gradient-to-r from-gold/30 to-transparent z-0" />
                  )}
                  <div className="relative z-10 text-center">
                    <div className="w-14 h-14 mx-auto mb-4 border border-gold/30 flex items-center justify-center bg-charcoal group hover:bg-gold transition-all duration-300">
                      <Icon size={22} className="text-gold group-hover:text-charcoal transition-colors" />
                    </div>
                    <div className="font-serif text-gold text-lg font-bold mb-1">{step.num}</div>
                    <div className="text-ivory text-sm font-semibold font-sans mb-2">{step.title}</div>
                    <div className="text-ivory/40 text-xs font-sans leading-relaxed">{step.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Equipment */}
      <section className="section-pad">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-gold text-xs font-bold uppercase tracking-[0.25em] font-sans block mb-2">Our Arsenal</span>
            <h2 className="font-serif text-3xl text-ivory">Professional-Grade Equipment</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Sony FX3', type: 'Cinema Camera' },
              { name: 'Canon EOS R5', type: 'Mirrorless' },
              { name: 'DJI Mavic 3 Cine', type: 'Aerial Drone' },
              { name: 'Zeiss CP.3 Lenses', type: 'Cinema Glass' },
              { name: 'Sigma Art Primes', type: 'Still Lenses' },
              { name: 'Godox KNOWLED', type: 'LED Lighting' },
              { name: 'Sennheiser MKH50', type: 'Audio' },
              { name: 'DaVinci Resolve', type: 'Post-Production' },
            ].map(gear => (
              <div key={gear.name} className="bg-charcoal-800 border border-gold/15 p-5 hover:border-gold/40 transition-all duration-300 group">
                <Aperture size={18} className="text-gold/50 group-hover:text-gold transition-colors mb-3" />
                <div className="text-ivory text-sm font-semibold font-sans">{gear.name}</div>
                <div className="text-ivory/30 text-xs font-sans mt-1">{gear.type}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad bg-charcoal-800 border-y border-gold/10">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-gold text-xs font-bold uppercase tracking-[0.25em] font-sans block mb-2">FAQ</span>
            <h2 className="font-serif text-3xl text-ivory">Frequently Asked</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="border border-gold/15 bg-charcoal overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-charcoal-800 transition-colors"
                >
                  <span className="font-sans text-sm font-semibold text-ivory pr-4">{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`text-gold flex-none transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`}
                  />
                </button>
                <div className={`faq-answer ${openFaq === idx ? 'open' : ''}`}>
                  <div className="px-6 pb-5 text-ivory/60 text-sm font-sans leading-relaxed border-t border-gold/10 pt-4">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── CONTACT PAGE ──────────────────────────────────────────────────────────────

function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: 'Signature Package', date: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
  const BOOKED = [3, 8, 14, 21, 27]; // mock booked dates

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSubmitted(true);
  };

  return (
    <div className="pt-20 bg-charcoal min-h-screen">

      {/* Header */}
      <div className="relative h-48 md:h-64 bg-charcoal-800 flex items-center overflow-hidden border-b border-gold/10">
        <div className="absolute inset-0 opacity-15" style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1800&q=60")',
          backgroundSize: 'cover',
        }} />
        <div className="relative max-w-7xl mx-auto px-6 w-full">
          <span className="text-gold text-xs font-bold uppercase tracking-[0.25em] font-sans block mb-2">Get in Touch</span>
          <h1 className="font-serif text-4xl md:text-5xl text-ivory">Book a Session</h1>
        </div>
      </div>

      <section className="section-pad">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Studio Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-serif text-2xl text-ivory mb-6 gold-line">Studio Details</h2>
              </div>
              {[
                { Icon: MapPin, label: 'Studio Address', val: '12 Cinematic Lane, T. Nagar, Chennai — 600017' },
                { Icon: Phone, label: 'Phone', val: '+91 98400 12345' },
                { Icon: Mail, label: 'Email', val: 'hello@cinephotography.com' },
                { Icon: Link2, label: 'Instagram', val: '@cinephotography' },
                { Icon: Clock, label: 'Working Hours', val: 'Mon–Sat: 9:00 AM – 7:00 PM' },
              ].map(({ Icon, label, val }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-gold/30 flex items-center justify-center flex-none">
                    <Icon size={16} className="text-gold" />
                  </div>
                  <div>
                    <div className="text-gold text-xs font-bold uppercase tracking-wider font-sans">{label}</div>
                    <div className="text-ivory/70 text-sm font-sans mt-0.5">{val}</div>
                  </div>
                </div>
              ))}

              {/* Google rating strip */}
              <div className="border border-gold/20 bg-charcoal-800 p-5 mt-6">
                <div className="flex items-center gap-2 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} className="fill-gold text-gold" />)}
                  <span className="text-gold font-bold text-sm font-sans ml-1">5.0</span>
                </div>
                <div className="text-ivory/50 text-xs font-sans">4.9/5 on Google · 280+ reviews</div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="border border-gold bg-charcoal-800 p-12 text-center film-frame">
                  <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check size={28} className="text-charcoal" />
                  </div>
                  <h3 className="font-serif text-3xl text-ivory mb-3">Inquiry Received!</h3>
                  <p className="text-ivory/60 font-sans text-sm leading-relaxed max-w-sm mx-auto">
                    Thank you for reaching out. We'll review your details and get back to you within 24 hours to confirm availability and discuss your vision.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                      { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Priya Sharma' },
                      { id: 'email', label: 'Email Address', type: 'email', placeholder: 'priya@email.com' },
                      { id: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+91 98400 00000' },
                    ].map(field => (
                      <div key={field.id} className={field.id === 'name' ? 'sm:col-span-2' : ''}>
                        <label className="block text-gold text-xs font-bold uppercase tracking-widest font-sans mb-2">{field.label}</label>
                        <input
                          type={field.type}
                          value={form[field.id]}
                          onChange={e => setForm(p => ({ ...p, [field.id]: e.target.value }))}
                          placeholder={field.placeholder}
                          className="w-full bg-charcoal-800 border border-gold/20 text-ivory text-sm font-sans px-4 py-3 outline-none focus:border-gold transition-colors placeholder:text-ivory/20"
                        />
                      </div>
                    ))}
                    <div>
                      <label className="block text-gold text-xs font-bold uppercase tracking-widest font-sans mb-2">Package</label>
                      <select
                        value={form.service}
                        onChange={e => setForm(p => ({ ...p, service: e.target.value }))}
                        className="w-full bg-charcoal-800 border border-gold/20 text-ivory text-sm font-sans px-4 py-3 outline-none focus:border-gold transition-colors appearance-none"
                      >
                        <option>Essential Package</option>
                        <option>Signature Package</option>
                        <option>Prestige Package</option>
                        <option>Custom Quote</option>
                      </select>
                    </div>
                  </div>

                  {/* Mini Calendar */}
                  <div>
                    <label className="block text-gold text-xs font-bold uppercase tracking-widest font-sans mb-3">Preferred Date (August 2025)</label>
                    <div className="bg-charcoal-800 border border-gold/20 p-4">
                      <div className="grid grid-cols-7 gap-1.5">
                        {['S','M','T','W','T','F','S'].map((d, i) => (
                          <div key={i} className="text-center text-xs font-bold font-sans text-ivory/30 uppercase pb-2">{d}</div>
                        ))}
                        {/* offset for August 2025 starting Friday */}
                        {Array.from({ length: 5 }).map((_, i) => <div key={`off-${i}`} />)}
                        {DAYS.map(day => {
                          const booked = BOOKED.includes(day);
                          const selected = selectedDay === day;
                          return (
                            <button
                              key={day}
                              type="button"
                              disabled={booked}
                              onClick={() => { setSelectedDay(day); setForm(p => ({ ...p, date: `Aug ${day}, 2025` })); }}
                              className={`aspect-square text-xs font-sans font-semibold flex items-center justify-center transition-all ${
                                booked ? 'text-ivory/15 cursor-not-allowed' :
                                selected ? 'bg-gold text-charcoal' :
                                'text-ivory/70 hover:bg-gold/20 hover:text-gold'
                              }`}
                            >
                              {day}
                            </button>
                          );
                        })}
                      </div>
                      <div className="flex gap-4 mt-3 pt-3 border-t border-gold/10">
                        <div className="flex items-center gap-2 text-xs font-sans text-ivory/40">
                          <div className="w-3 h-3 bg-gold rounded-sm" /> Available
                        </div>
                        <div className="flex items-center gap-2 text-xs font-sans text-ivory/40">
                          <div className="w-3 h-3 bg-charcoal-600 rounded-sm border border-ivory/10" /> Booked
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gold text-xs font-bold uppercase tracking-widest font-sans mb-2">Tell Us About Your Event</label>
                    <textarea
                      value={form.message}
                      onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      rows={4}
                      placeholder="Describe your event, vision, or any special requirements..."
                      className="w-full bg-charcoal-800 border border-gold/20 text-ivory text-sm font-sans px-4 py-3 outline-none focus:border-gold transition-colors placeholder:text-ivory/20 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gold text-charcoal text-sm font-bold uppercase tracking-widest py-4 font-sans hover:bg-ivory transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    Send Inquiry <ArrowRight size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── FOOTER ────────────────────────────────────────────────────────────────────

function Footer({ setActivePage }) {
  return (
    <footer className="bg-charcoal border-t border-gold/15">
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full border-2 border-gold overflow-hidden flex-shrink-0">
                <img src="/Logo.jpeg" alt="Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="font-serif text-lg font-bold text-ivory tracking-wider">CINE<span className="text-gold">.</span></div>
                <div className="text-[0.5rem] font-sans uppercase tracking-[0.35em] text-ivory/40">Photography Studio</div>
              </div>
            </div>
            <p className="text-ivory/40 text-xs font-sans leading-relaxed max-w-xs">
              Premium cinematic storytellers capturing weddings, concerts, heritage, and travel with film-grade precision since 2014.
            </p>
            <div className="flex gap-3 mt-5">
              {[Link2, Camera, Video].map((Icon, i) => (
                <div key={i} className="w-8 h-8 border border-gold/20 flex items-center justify-center text-gold/50 hover:text-gold hover:border-gold transition-all cursor-pointer">
                  <Icon size={14} />
                </div>
              ))}
            </div>
          </div>
          {/* Navigation */}
          <div>
            <div className="text-gold text-xs font-bold uppercase tracking-widest font-sans mb-4">Navigate</div>
            <ul className="space-y-3">
              {['home','about','portfolio','services','contact'].map(tab => (
                <li key={tab}>
                  <button
                    onClick={() => setActivePage(tab)}
                    className="text-ivory/40 text-xs font-sans hover:text-gold transition-colors capitalize"
                  >
                    {tab}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {/* Contact */}
          <div>
            <div className="text-gold text-xs font-bold uppercase tracking-widest font-sans mb-4">Connect</div>
            <ul className="space-y-3 text-xs font-sans text-ivory/40">
              <li>hello@cinephotography.com</li>
              <li>+91 98400 12345</li>
              <li>@cinephotography</li>
              <li className="pt-2 border-t border-gold/10">Chennai, India</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gold/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="text-ivory/25 text-xs font-sans">© 2026 Cine Photography Studio. All rights reserved.</div>
          <div className="text-ivory/25 text-xs font-sans">Built for luxury cinematic rendering.</div>
        </div>
      </div>
    </footer>
  );
}

// ─── ROOT APP ──────────────────────────────────────────────────────────────────

export default function App() {
  const [activePage, setActivePage] = useState('home');

  const setPage = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (activePage) {
      case 'home':      return <HomePage setActivePage={setPage} />;
      case 'about':     return <AboutPage />;
      case 'portfolio': return <PortfolioPage />;
      case 'services':  return <ServicesPage setActivePage={setPage} />;
      case 'contact':   return <ContactPage />;
      default:          return <HomePage setActivePage={setPage} />;
    }
  };

  return (
    <div className="film-grain bg-charcoal min-h-screen">
      <Navbar activePage={activePage} setActivePage={setPage} />
      <main>{renderPage()}</main>
      <Footer setActivePage={setPage} />
    </div>
  );
}
