import React, { useState, useEffect } from 'react';
import { Camera, Calendar as CalendarIcon, Clock, Users, ArrowRight, X, Play, Pause, ChevronLeft, ChevronRight, Check } from 'lucide-react';

const PORTFOLIO_DATA = [
  {
    id: 1,
    title: 'The Ivory Garland',
    category: 'Weddings',
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    type: 'photo',
    colClass: 'span-6 landscape'
  },
  {
    id: 2,
    title: 'Varanasi Dawn Trailer',
    category: 'Films',
    img: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80',
    type: 'video',
    colClass: 'span-6 landscape'
  },
  {
    id: 3,
    title: 'Coming-of-Age Rite',
    category: 'Heritage',
    img: 'https://images.unsplash.com/photo-1561525140-c2a4cc68e4bd?auto=format&fit=crop&w=1200&q=80',
    type: 'photo',
    colClass: 'span-4'
  },
  {
    id: 4,
    title: 'Stadium Strobes Live',
    category: 'Concerts',
    img: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80',
    type: 'photo',
    colClass: 'span-4'
  },
  {
    id: 5,
    title: 'Alpine Peak highlight',
    category: 'Films',
    img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    type: 'video',
    colClass: 'span-4'
  },
  {
    id: 6,
    title: 'Bistro First Dance',
    category: 'Weddings',
    img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    type: 'photo',
    colClass: 'span-8 landscape'
  },
  {
    id: 7,
    title: 'Desert Wind Silhouette',
    category: 'Destinations',
    img: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
    type: 'photo',
    colClass: 'span-4'
  }
];

const SERVICES_DATA = [
  {
    id: 'weddings',
    title: 'Wedding Cinema & Candid',
    icon: <Camera size={26} />,
    desc: 'Widescreen cinematic narrative films and candid photography coverage capturing the raw, heartfelt highlights of your celebrations.',
    rate: '1,200',
    deliverables: ['Full Day 10-Hour Coverage', '3-5 Minute Cinematic Trailer', 'Color Graded Candid Proofs (450+)', 'Online Private Gallery Delivery']
  },
  {
    id: 'heritage',
    title: 'Traditional Life Milestones',
    icon: <Users size={26} />,
    desc: 'Respectful, heritage-focused photography detailing Puberty ceremonies, Maternity portraits, and traditional family milestones.',
    rate: '750',
    deliverables: ['5-Hour Studio/Venue Coverage', 'Family Portrait Special Session', 'High-Res Color Graded Proofs (200+)', 'Professional Archival Photo Album']
  },
  {
    id: 'destinations',
    title: 'Destination outdoor',
    icon: <ArrowRight size={26} />,
    desc: 'Relaxed lifestyle portraiture set against breathtaking natural landscapes—beaches, deserts, or historical architecture.',
    rate: '900',
    deliverables: ['Full Travel Route Planning', 'Golden Hour & Sunset Shoots', 'Fine Art Archival Prints (15)', 'Full High-Res Web Downloads']
  },
  {
    id: 'concerts',
    title: 'Concerts & Live Stage',
    icon: <Play size={26} />,
    desc: 'High-speed, dynamic low-light photography freezing stage performance motion and energetic crowd interactions.',
    rate: '650',
    deliverables: ['Venue Stage Sound-Check Pass', 'Low-Light Color Graded Proofs (100+)', 'Artist Social Media Fast proofing', 'Full Commercial Print Licensing']
  }
];

const MOCK_CALENDAR_DAYS = [
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
  { date: 12, day: 'Sun', disabled: true },
  { date: 13, day: 'Mon', disabled: false },
  { date: 14, day: 'Tue', disabled: false }
];

const TIME_SLOTS = ['10:00 AM - 12:30 PM', '02:00 PM - 04:30 PM', '05:30 PM - 07:30 PM (Golden Hour)'];

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [portfolioFilter, setPortfolioFilter] = useState('All');
  
  // Custom video player state
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [videoProgress, setVideoProgress] = useState(25);

  // Appointment scheduler state
  const [selectedDayIdx, setSelectedDayIdx] = useState(1); // Thu (date 2)
  const [selectedTimeIdx, setSelectedTimeIdx] = useState(2); // Golden Hour
  const [appointmentForm, setAppointmentForm] = useState({ name: '', email: '', phone: '', service: 'Wedding Cinema & Candid', notes: '' });
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Floating gold dust particle setup (ambient loop)
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    // Generate random particle data
    const tempParticles = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 8 + 3}px`,
      delay: `${Math.random() * 10}s`,
      duration: `${Math.random() * 8 + 12}s`,
    }));
    setParticles(tempParticles);
  }, []);

  // simulated video progress tracking
  useEffect(() => {
    let interval;
    if (selectedVideo && isVideoPlaying) {
      interval = setInterval(() => {
        setVideoProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + 1;
        });
      }, 250);
    }
    return () => clearInterval(interval);
  }, [selectedVideo, isVideoPlaying]);

  const openTheater = (item) => {
    setSelectedVideo(item);
    setIsVideoPlaying(true);
    setVideoProgress(15);
    document.body.style.overflow = 'hidden';
  };

  const closeTheater = () => {
    setSelectedVideo(null);
    document.body.style.overflow = 'auto';
  };

  const handleSelectService = (title) => {
    setAppointmentForm((prev) => ({ ...prev, service: title }));
    
    // Smooth scroll to the contact/scheduler section
    const contactSec = document.getElementById('contact');
    if (contactSec) {
      contactSec.scrollIntoView({ behavior: 'smooth' });
    }
    
    setToastMsg(`Pre-selected: ${title}`);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!appointmentForm.name || !appointmentForm.email || !appointmentForm.phone) return;
    setBookingConfirmed(true);
  };

  const filteredPortfolio = portfolioFilter === 'All'
    ? PORTFOLIO_DATA
    : PORTFOLIO_DATA.filter((item) => item.category === portfolioFilter);

  return (
    <div className="cine-app">
      {/* Navbar with logo.jpeg */}
      <header className="cine-header">
        <div className="cine-container header-inner">
          <div className="header-logo-wrap" onClick={() => setActiveTab('home')}>
            <img src="/Logo.jpeg" alt="Cine Photography brand logo" className="logo-image" />
            <div>
              <h1 className="logo-text-large">CINE<span>.</span></h1>
              <div className="logo-tagline-sub">Photography</div>
            </div>
          </div>
          
          <nav>
            <ul className="cine-nav">
              <li>
                <a 
                  href="#home" 
                  className={activeTab === 'home' ? 'active' : ''} 
                  onClick={() => setActiveTab('home')}
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  className={activeTab === 'about' ? 'active' : ''} 
                  onClick={() => setActiveTab('about')}
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  href="#portfolio" 
                  className={activeTab === 'portfolio' ? 'active' : ''} 
                  onClick={() => setActiveTab('portfolio')}
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a 
                  href="#services" 
                  className={activeTab === 'services' ? 'active' : ''} 
                  onClick={() => setActiveTab('services')}
                >
                  Services
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className={activeTab === 'contact' ? 'active' : ''} 
                  onClick={() => setActiveTab('contact')}
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          <a href="#contact">
            <button className="header-book-cta" onClick={() => setActiveTab('contact')}>Book Session</button>
          </a>
        </div>
      </header>

      {/* Hero Wrapper (Home) */}
      <section className="hero-wrapper" id="home">
        {/* Animated background canvas */}
        <div className="ambient-dust-container">
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

        {/* Slow cinematic looping mock video overlay */}
        <img 
          src="https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=1600&q=80" 
          alt="Looping gold lighting lens camera background" 
          className="hero-video-mock" 
        />
        <div className="hero-overlay-dark"></div>

        <div className="cine-container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
          <div className="hero-content-box">
            <span className="hero-tag">Cinematic Light & Shadow</span>
            <h1 className="hero-title-h1">Stories Written in Light.</h1>
            <p className="hero-subtitle-p">
              We shoot high-end wedding cinema, traditional family milestones, and concert events, capturing moments that feel natural, dramatic, and unforgettable.
            </p>
            <div className="hero-action-buttons">
              <a href="#portfolio">
                <button className="btn-gold-solid" onClick={() => setActiveTab('portfolio')}>View Collections</button>
              </a>
              <a href="#contact">
                <button className="btn-gold-outline" onClick={() => setActiveTab('contact')}>Schedule Consultation</button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Frames Carousel (Home Section Continuation) */}
      <section className="featured-frames-section">
        <div className="cine-container">
          <div className="section-title-wrap" style={{ textAlign: 'left', marginBottom: '2rem' }}>
            <span className="section-label-gold">Lead Artist Captures</span>
            <h2 className="section-title-serif" style={{ fontSize: '1.8rem' }}>Featured Frames</h2>
          </div>

          <div className="featured-grid-home">
            <div className="featured-frame-card">
              <div className="featured-img-wrap">
                <img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80" alt="Wedding hug sunset" />
              </div>
              <div className="featured-card-info">
                <span className="featured-card-cat">Weddings</span>
                <h3 className="featured-card-title">The Sonoma Sunset</h3>
              </div>
            </div>

            <div className="featured-frame-card">
              <div className="featured-img-wrap">
                <img src="https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80" alt="Live concert singer strobes" />
              </div>
              <div className="featured-card-info">
                <span className="featured-card-cat">Concerts</span>
                <h3 className="featured-card-title">Indigo Stadium Tour</h3>
              </div>
            </div>

            <div className="featured-frame-card">
              <div className="featured-img-wrap">
                <img src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80" alt="Destination portrait boat" />
              </div>
              <div className="featured-card-info">
                <span className="featured-card-cat">Destinations</span>
                <h3 className="featured-card-title">Mist of Varanasi</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section Story */}
      <section className="about-section" id="about">
        <div className="cine-container about-grid">
          <div className="about-left-text">
            <span className="section-label-gold">Our Philosophy</span>
            <h2>We believe every click holds a story.</h2>
            <p>
              Founded in 2012, Cine Photography was born out of a desire to break away from stiff, traditional poses. We believe that the best moments occur in the transitions—the candid laughter, the quiet glance, the nervous excitement before the curtain rises.
            </p>
            <p>
              Our team of directors and light technicians operates behind the scenes, using custom-designed lighting configurations and camera tracking systems to produce frames with rich shadows, deep details, and natural skin tones.
            </p>

            <div className="about-quote">
              "We don't take photographs. We frame memories so they remain warm, emotional, and alive."
            </div>

            <div className="about-timeline">
              <div className="timeline-node">
                <span className="node-year">2012</span>
                <div className="node-content">
                  <h4>Studio Founding</h4>
                  <p>Inaugurated a small studio loft in Portland, focusing entirely on outdoor destination frames.</p>
                </div>
              </div>
              <div className="timeline-node">
                <span className="node-year">2018</span>
                <div className="node-content">
                  <h4>Cinematic Expansion</h4>
                  <p>Equipped our teams with widescreen anamorphic cinema rigs to introduce high-fidelity wedding trailers.</p>
                </div>
              </div>
              <div className="timeline-node">
                <span className="node-year">2024</span>
                <div className="node-content">
                  <h4>500+ Campaigns Milestone</h4>
                  <p>Honored to document hundreds of traditional weddings, stage performances, and life ceremonies globally.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="about-right-frame">
            <div className="brand-showcase-frame">
              {/* Display logo.jpeg framed professionally */}
              <img src="/Logo.jpeg" alt="Cine Photography brand symbol" className="frame-logo-img" />
              <h3 className="frame-brand-name">CINE PHOTOGRAPHY</h3>
              <span className="frame-brand-est">Est. 2012 • Premium Storytelling</span>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section Showcase */}
      <section className="portfolio-section-h" id="portfolio">
        <div className="cine-container">
          <div className="section-title-wrap">
            <span className="section-label-gold">Professional Plates</span>
            <h2 className="section-title-serif">The Cinematic Showcase</h2>
          </div>

          <div className="portfolio-filter-tabs">
            {['All', 'Weddings', 'Films', 'Concerts', 'Destinations', 'Heritage'].map((category) => (
              <button
                key={category}
                className={`tab-btn-cine ${portfolioFilter === category ? 'active' : ''}`}
                onClick={() => setPortfolioFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="portfolio-grid-cine">
            {filteredPortfolio.map((item) => (
              <div 
                key={item.id} 
                className={`portfolio-card-item ${item.colClass}`}
                onClick={() => item.type === 'video' ? openTheater(item) : null}
              >
                <div className="port-img-container">
                  <img src={item.img} alt={item.title} loading="lazy" />
                  {item.type === 'video' && (
                    <div className="video-play-indicator">
                      <Play size={20} style={{ marginLeft: '4px' }} />
                    </div>
                  )}
                </div>
                <div className="portfolio-info-overlay">
                  <h3 className="port-card-title">{item.title}</h3>
                  <span className="port-card-tag">{item.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section" id="services">
        <div className="cine-container">
          <div className="section-title-wrap">
            <span className="section-label-gold">Studio Offerings</span>
            <h2 className="section-title-serif">Production Services</h2>
          </div>

          <div className="services-grid-cine">
            {SERVICES_DATA.map((service) => (
              <div key={service.id} className="service-card-item">
                <div className="service-icon-heading">
                  <div className="service-icon-wrap">
                    {service.icon}
                  </div>
                  <h3 className="service-title-large">{service.title}</h3>
                </div>
                <p className="service-desc">{service.desc}</p>
                
                <div className="service-deliverables-list">
                  {service.deliverables.map((line, idx) => (
                    <div key={idx} className="deliverable-line">
                      <span>✓</span> {line}
                    </div>
                  ))}
                </div>

                <div className="service-rate-book-row">
                  <div>
                    <span className="service-rate-lbl">Investment Starts At</span>
                    <div className="service-rate-val">${service.rate}</div>
                  </div>
                  <button 
                    className="service-card-select-btn"
                    onClick={() => handleSelectService(service.title)}
                  >
                    Select & Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section & Appointment Calendar Form */}
      <section className="contact-section-c" id="contact">
        <div className="cine-container contact-layout-grid">
          <div className="studio-info-side">
            <div>
              <span className="section-label-gold">Locate Us</span>
              <h2 className="section-title-serif" style={{ fontSize: '2.2rem', marginBottom: '1.5rem', textAlign: 'left' }}>The Cine Studio</h2>
              <p style={{ color: 'var(--cine-text-muted)', fontWeight: 300 }}>
                Stop by our consultation lounge to preview physical linen wedding albums and inspect print calibration details.
              </p>
            </div>

            <div className="info-block-item">
              <h4>Headquarters</h4>
              <p className="info-block-val">12 Cinema Boulevard</p>
              <p className="info-sub-val">Studio City, Portland, OR 97201</p>
            </div>

            <div className="info-block-item">
              <h4>General Inquiries</h4>
              <p className="info-block-val">hello@cinephotography.com</p>
              <p className="info-sub-val">Crew Hotlines: +1 (503) 555-0198</p>
            </div>

            <div className="info-block-item">
              <h4>Lounge Hours</h4>
              <p className="info-block-val">Tue - Sat / 10 AM - 7 PM</p>
              <p className="info-sub-val">Sundays by exclusive appointment brief.</p>
            </div>
          </div>

          <div>
            {!bookingConfirmed ? (
              <form className="scheduler-form-box" onSubmit={handleFormSubmit}>
                <h3 className="scheduler-box-title">Request Appointment</h3>

                <div className="form-row-cine">
                  <div className="form-group-cine">
                    <label htmlFor="name-input">Your Full Name</label>
                    <input 
                      type="text" 
                      id="name-input" 
                      className="form-input-cine"
                      value={appointmentForm.name}
                      onChange={(e) => setAppointmentForm(prev => ({ ...prev, name: e.target.value }))}
                      required 
                    />
                  </div>
                  <div className="form-group-cine">
                    <label htmlFor="phone-input">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone-input" 
                      className="form-input-cine"
                      value={appointmentForm.phone}
                      onChange={(e) => setAppointmentForm(prev => ({ ...prev, phone: e.target.value }))}
                      required 
                    />
                  </div>
                </div>

                <div className="form-group-cine">
                  <label htmlFor="email-input">Email Address</label>
                  <input 
                    type="email" 
                    id="email-input" 
                    className="form-input-cine"
                    value={appointmentForm.email}
                    onChange={(e) => setAppointmentForm(prev => ({ ...prev, email: e.target.value }))}
                    required 
                  />
                </div>

                <div className="form-group-cine">
                  <label>Select Date (July 2026)</label>
                  <div className="grid-calendar-mini">
                    <span className="cal-header-node">M</span>
                    <span className="cal-header-node">T</span>
                    <span className="cal-header-node">W</span>
                    <span className="cal-header-node">T</span>
                    <span className="cal-header-node">F</span>
                    <span className="cal-header-node">S</span>
                    <span className="cal-header-node">S</span>

                    {MOCK_CALENDAR_DAYS.map((dayItem, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`cal-btn-node ${dayItem.disabled ? 'disabled' : ''} ${selectedDayIdx === idx ? 'selected' : ''}`}
                        disabled={dayItem.disabled}
                        onClick={() => setSelectedDayIdx(idx)}
                      >
                        {dayItem.date}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group-cine">
                  <label>Select Consulting Slot</label>
                  <div className="slot-grid-cine">
                    {TIME_SLOTS.map((slot, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`slot-btn-cine ${selectedTimeIdx === idx ? 'selected' : ''}`}
                        onClick={() => setSelectedTimeIdx(idx)}
                      >
                        {slot.split(' ')[0] + ' ' + (slot.split(' ')[1] || '')}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group-cine">
                  <label htmlFor="service-type">Service Focus</label>
                  <select 
                    id="service-type" 
                    className="form-input-cine"
                    style={{ background: 'none' }}
                    value={appointmentForm.service}
                    onChange={(e) => setAppointmentForm(prev => ({ ...prev, service: e.target.value }))}
                  >
                    <option value="Wedding Cinema & Candid">Wedding Cinema & Candid</option>
                    <option value="Traditional Life Milestones">Traditional Life Milestones</option>
                    <option value="Destination outdoor">Destination outdoor</option>
                    <option value="Concerts & Live Stage">Concerts & Live Stage</option>
                  </select>
                </div>

                <button type="submit" className="form-submit-gold">Submit Appointment Brief</button>
              </form>
            ) : (
              <div className="scheduler-form-box scheduler-success-box">
                <div className="success-icon-gold">
                  <Check size={38} />
                </div>
                <h3 className="success-title-serif">Appointment Requested</h3>
                <p className="success-desc">
                  Thank you, {appointmentForm.name}. We have reserved your initial briefing slot for <strong>{TIME_SLOTS[selectedTimeIdx]}</strong> on <strong>July {MOCK_CALENDAR_DAYS[selectedDayIdx].date}, 2026</strong> focusing on <strong>{appointmentForm.service}</strong>. A crew coordinator will call you to confirm.
                </p>
                <button 
                  onClick={() => { setBookingConfirmed(false); setAppointmentForm({ name: '', email: '', phone: '', service: 'Wedding Cinema & Candid', notes: '' }); }}
                  className="btn-gold-outline"
                  style={{ width: 'auto', display: 'inline-block' }}
                >
                  Adjust Booking
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="cine-footer">
        <div className="cine-container">
          <div className="footer-top-row">
            <div className="footer-logo-block">
              <h3>CINE PHOTOGRAPHY</h3>
              <p style={{ color: 'var(--cine-text-muted)', fontSize: '0.85rem' }}>
                Premium cinematic storytellers capturing traditional weddings, stages, travel, and lifecycle events with high-contrast color calibration.
              </p>
            </div>
            <div>
              <span className="footer-col-head">Navigation</span>
              <ul className="footer-list-links">
                <li><a href="#home" onClick={() => setActiveTab('home')}>Home Portal</a></li>
                <li><a href="#about" onClick={() => setActiveTab('about')}>Studio Story</a></li>
                <li><a href="#portfolio" onClick={() => setActiveTab('portfolio')}>Visual Portfolio</a></li>
                <li><a href="#services" onClick={() => setActiveTab('services')}>Capabilities</a></li>
              </ul>
            </div>
            <div>
              <span className="footer-col-head">Connect</span>
              <ul className="footer-list-links">
                <li><a href="#contact" onClick={() => setActiveTab('contact')}>Studio Address</a></li>
                <li>Inquire: hello@cinephotography.com</li>
                <li>Phone: +1 (503) 555-0198</li>
                <li>Instagram: @cinephotography</li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom-row">
            <p>© 2026 Cine Photography Studio. All rights reserved.</p>
            <p>Built for luxury cinematic rendering.</p>
          </div>
        </div>
      </footer>

      {/* Simulated Theater Lightbox */}
      {selectedVideo && (
        <div className="theater-overlay" onClick={closeTheater}>
          <div className="theater-container" onClick={(e) => e.stopPropagation()}>
            <button className="theater-close-btn" onClick={closeTheater}>
              <X size={16} style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
              Close Theater
            </button>
            
            <div className="theater-screen-wrap">
              <img src={selectedVideo.img} alt={selectedVideo.title} />
              
              <div className="theater-header-info">
                <span className="theater-reel-sub">Film Reel</span>
                <h3 className="theater-reel-title">{selectedVideo.title}</h3>
              </div>

              {!isVideoPlaying && (
                <div 
                  className="theater-central-play"
                  onClick={() => setIsVideoPlaying(true)}
                >
                  <Play size={24} fill="var(--cine-gold)" style={{ marginLeft: '4px' }} />
                </div>
              )}
            </div>

            <div className="theater-controls-panel">
              {/* Playback seek progress */}
              <div 
                className="theater-timeline-bar"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const newProgress = Math.round((clickX / rect.width) * 100);
                  setVideoProgress(newProgress);
                }}
              >
                <div className="theater-timeline-fill" style={{ width: `${videoProgress}%` }}></div>
                <div className="theater-timeline-handle" style={{ left: `${videoProgress}%` }}></div>
              </div>

              <div className="theater-btn-row">
                <div className="theater-btn-group-left">
                  <button className="theater-raw-btn" onClick={() => setIsVideoPlaying(!isVideoPlaying)}>
                    {isVideoPlaying ? <Pause size={18} fill="#fff" /> : <Play size={18} fill="#fff" />}
                  </button>
                  <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                    00:{videoProgress < 10 ? `0${videoProgress}` : videoProgress} / 02:15
                  </span>
                </div>
                
                <div style={{ fontSize: '0.75rem', color: 'var(--cine-gold)', fontWeight: 700, letterSpacing: '0.05em' }}>
                  24 FPS • ANAMORPHIC WIDESCREEN • REC.709
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {toastMsg && (
        <div className="toast-msg-cine">
          {toastMsg}
        </div>
      )}
    </div>
  );
}

export default App;
