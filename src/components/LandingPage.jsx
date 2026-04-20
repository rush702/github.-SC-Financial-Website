import { useState, useEffect, useId } from 'react'

function SCSeal({ size = 120, className = '' }) {
  const uid = useId().replace(/:/g, '')
  const arcId = `arc-${uid}`
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <circle cx="100" cy="100" r="99" fill="#061545"/>
      <circle cx="100" cy="100" r="95.5" stroke="#B09A3E" strokeWidth="1.2"/>
      <circle cx="100" cy="100" r="80" stroke="#B09A3E" strokeWidth="0.6" strokeDasharray="2.5 2"/>
      <text x="100" y="108" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="46" fontWeight="700" fill="white" letterSpacing="5">SC</text>
      <path d="M100 120 L104 127 L100 134 L96 127 Z" fill="#B09A3E"/>
      <text x="100" y="155" textAnchor="middle" fontFamily="'Instrument Sans', Arial, sans-serif" fontSize="8" fill="#B09A3E" letterSpacing="5">EST. MMXXVI</text>
      <defs>
        <path id={arcId} d="M100,17 A83,83 0 0,1 183,100 A83,83 0 0,1 100,183 A83,83 0 0,1 17,100 A83,83 0 0,1 100,17"/>
      </defs>
      <text fontFamily="'Instrument Sans', Arial, sans-serif" fontSize="8.5" fill="#B09A3E" letterSpacing="4.5">
        <textPath href={`#${arcId}`} startOffset="5%">SC FINANCIAL AND LIFE SERVICES · EST MMXXVI ·</textPath>
      </text>
    </svg>
  )
}

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)

const ShieldIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)

const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
)

export default function LandingPage({ onApply }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="lp">

      {/* ── NAV ── */}
      <header className={`lp-nav${scrolled ? ' scrolled' : ''}`}>
        <div className="lp-nav-inner">
          <button className="lp-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="SC Financial home">
            <SCSeal size={44} />
            <div className="lp-logo-text">
              <span className="lp-logo-name">SC FINANCIAL</span>
              <span className="lp-logo-sub">&amp; LIFE SERVICES</span>
            </div>
          </button>
          <nav className="lp-nav-links" aria-label="Main navigation">
            <button onClick={() => scrollTo('about')}>About</button>
            <button onClick={() => scrollTo('services')}>Services</button>
            <button onClick={() => scrollTo('process')}>How It Works</button>
            <button onClick={() => scrollTo('contact')}>Contact</button>
          </nav>
          <div className="lp-nav-right">
            <button className="lp-btn-nav-apply" onClick={onApply}>Apply Now</button>
            <button
              className={`lp-hamburger${menuOpen ? ' open' : ''}`}
              onClick={() => setMenuOpen(m => !m)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span/><span/><span/>
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="lp-mobile-menu">
            <button onClick={() => scrollTo('about')}>About</button>
            <button onClick={() => scrollTo('services')}>Services</button>
            <button onClick={() => scrollTo('process')}>How It Works</button>
            <button onClick={() => scrollTo('contact')}>Contact</button>
            <button className="lp-mobile-apply" onClick={onApply}>Begin Application →</button>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="lp-hero">
        <div className="lp-hero-watermark" aria-hidden="true">
          <SCSeal size={600} />
        </div>
        <div className="lp-hero-content lp-container">
          <p className="lp-hero-eyebrow">PRUDENCE · PROTECTION · PROSPERITY</p>
          <h1 className="lp-hero-headline">
            Stewards of Your<br/>
            <em>Financial Life.</em>
          </h1>
          <p className="lp-hero-sub">
            We guide families and individuals toward lasting security —
            with wisdom, integrity, and an unwavering commitment to your future.
          </p>
          <div className="lp-hero-actions">
            <button className="lp-btn-gold" onClick={onApply}>
              Begin Your Application <ArrowRight/>
            </button>
            <button className="lp-btn-outline" onClick={() => scrollTo('services')}>
              Explore Coverage
            </button>
          </div>
          <div className="lp-hero-trust">
            <span><ShieldIcon/> Licensed in all 50 States</span>
            <span className="lp-trust-dot">·</span>
            <span>Est. MMXXVI</span>
            <span className="lp-trust-dot">·</span>
            <span><LockIcon/> Bank-Level Encryption</span>
          </div>
        </div>
      </section>

      {/* ── THREE PILLARS ── */}
      <section className="lp-pillars" id="about">
        <div className="lp-container">
          <div className="lp-section-header">
            <p className="lp-eyebrow">Our Philosophy</p>
            <h2 className="lp-section-title">The Three Pillars of Financial Stewardship</h2>
            <p className="lp-section-sub">Everything we do is built upon these foundational principles.</p>
          </div>
          <div className="lp-pillars-grid">
            {[
              {
                roman: 'I',
                title: 'Prudence',
                desc: 'Every recommendation we make is grounded in careful analysis, disciplined strategy, and alignment with your long-term interests. We never lead with product — we lead with purpose.'
              },
              {
                roman: 'II',
                title: 'Protection',
                desc: 'Life changes unexpectedly. We ensure the people and values you hold dear are never left without the support they need — today, tomorrow, and for generations to come.'
              },
              {
                roman: 'III',
                title: 'Prosperity',
                desc: 'True wealth is not built overnight. We design strategies that compound over time, creating financial freedom and lasting generational impact for the families we serve.'
              }
            ].map(p => (
              <div className="lp-pillar-card" key={p.roman}>
                <span className="lp-pillar-roman">{p.roman}</span>
                <div className="lp-pillar-rule"/>
                <h3 className="lp-pillar-title">{p.title}</h3>
                <p className="lp-pillar-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY QUOTE ── */}
      <section className="lp-philosophy">
        <div className="lp-container">
          <div className="lp-philosophy-inner">
            <span className="lp-quote-glyph">&ldquo;</span>
            <blockquote className="lp-philosophy-quote">
              The foundation of a financial life is not yield,<br/>
              but the steadfast stewardship of what is entrusted.
            </blockquote>
            <p className="lp-philosophy-attr">— The SC Financial Standard of Care</p>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="lp-services" id="services">
        <div className="lp-container">
          <div className="lp-section-header">
            <p className="lp-eyebrow">What We Offer</p>
            <h2 className="lp-section-title">Comprehensive Life Insurance Solutions</h2>
            <p className="lp-section-sub">From foundational protection to sophisticated wealth-building strategies — we meet you where you are.</p>
          </div>
          <div className="lp-services-grid">
            {[
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                ),
                title: 'Term Life Insurance',
                sub: 'Starting from $250K',
                desc: 'Affordable, straightforward protection for your peak earning years. Covers your family when they need it most.'
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                ),
                title: 'Whole Life Insurance',
                sub: 'Permanent Coverage',
                desc: 'Lifetime protection with guaranteed cash value accumulation. A cornerstone of generational financial planning.'
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                ),
                title: 'Universal Life Insurance',
                sub: 'Flexible Premiums',
                desc: 'Permanent coverage with the flexibility to adjust premiums and death benefits as your life evolves.'
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                ),
                title: 'Indexed Universal Life',
                sub: 'Market-Linked Growth',
                desc: 'Participate in market upside with downside protection. A powerful tool for tax-advantaged wealth accumulation.'
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                ),
                title: 'Final Expense Insurance',
                sub: 'Simplified Issue',
                desc: 'Dignified coverage to protect your family from end-of-life expenses. Easy approval, lasting peace of mind.'
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                ),
                title: 'Business Coverage',
                sub: 'Key Person & Buy-Sell',
                desc: 'Protect your business interests with executive benefit packages, key person coverage, and succession planning.'
              }
            ].map(s => (
              <div className="lp-service-card" key={s.title}>
                <div className="lp-service-icon">{s.icon}</div>
                <h3 className="lp-service-title">{s.title}</h3>
                <span className="lp-service-sub">{s.sub}</span>
                <p className="lp-service-desc">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="lp-services-cta">
            <button className="lp-btn-gold" onClick={onApply}>
              Find My Coverage <ArrowRight/>
            </button>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="lp-stats">
        <div className="lp-container">
          <div className="lp-section-header lp-section-header--light">
            <p className="lp-eyebrow lp-eyebrow--light">Why SC Financial</p>
            <h2 className="lp-section-title lp-section-title--light">A Track Record Built on Trust</h2>
          </div>
          <div className="lp-stats-grid">
            {[
              { num: '$500M+', label: 'Coverage Placed', detail: 'for families and individuals' },
              { num: '98%',    label: 'Client Retention', detail: 'year over year' },
              { num: '50',     label: 'States Licensed',  detail: 'full national coverage' },
              { num: '~10 min',label: 'To Apply',         detail: 'fully digital, start to finish' }
            ].map(s => (
              <div className="lp-stat-card" key={s.num}>
                <span className="lp-stat-num">{s.num}</span>
                <span className="lp-stat-label">{s.label}</span>
                <span className="lp-stat-detail">{s.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="lp-process" id="process">
        <div className="lp-container">
          <div className="lp-section-header">
            <p className="lp-eyebrow">How It Works</p>
            <h2 className="lp-section-title">From First Conversation to Full Coverage</h2>
            <p className="lp-section-sub">We believe the path to protection should be clear, simple, and reassuring.</p>
          </div>
          <div className="lp-process-steps">
            {[
              { num: '01', title: 'Consult',  desc: 'We listen first. Understanding your family, your goals, and your concerns before any recommendation is made.' },
              { num: '02', title: 'Design',   desc: 'We architect a coverage plan tailored to your needs — not a one-size-fits-all product pushed for commission.' },
              { num: '03', title: 'Apply',    desc: 'Our streamlined digital application takes about 10 minutes. We walk with you every step of the way.' },
              { num: '04', title: 'Protect',  desc: 'Coverage in place. Peace of mind delivered. An ongoing relationship built on trust and regular review.' }
            ].map(s => (
              <div className="lp-process-step" key={s.num}>
                <div className="lp-process-num">{s.num}</div>
                <h3 className="lp-process-title">{s.title}</h3>
                <p className="lp-process-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="lp-testimonials">
        <div className="lp-container">
          <div className="lp-section-header">
            <p className="lp-eyebrow">Client Stories</p>
            <h2 className="lp-section-title">What Our Clients Say</h2>
          </div>
          <div className="lp-testimonials-grid">
            {[
              {
                quote: "After years of putting it off, SC Financial made the process effortless. They found me coverage I could actually afford and helped me understand exactly what I was signing.",
                name: "Robert M.",
                location: "Dallas, TX",
                policy: "20-Year Term · $500,000",
                initial: "R"
              },
              {
                quote: "They took the time to truly understand our family's situation. No pressure, no rush. We feel genuinely protected now — and we know exactly who to call if anything changes.",
                name: "Jennifer & Marcus T.",
                location: "Atlanta, GA",
                policy: "Whole Life · $1,000,000",
                initial: "J"
              },
              {
                quote: "As a widow, I needed guidance I could trust completely. SC Financial was patient, thorough, and showed real care for my outcome. That matters more than anything.",
                name: "Patricia W.",
                location: "Chicago, IL",
                policy: "Final Expense · $50,000",
                initial: "P"
              }
            ].map(t => (
              <div className="lp-testimonial-card" key={t.name}>
                <div className="lp-testimonial-stars">★★★★★</div>
                <blockquote className="lp-testimonial-quote">"{t.quote}"</blockquote>
                <div className="lp-testimonial-footer">
                  <div className="lp-testimonial-avatar">{t.initial}</div>
                  <div>
                    <p className="lp-testimonial-name">{t.name}</p>
                    <p className="lp-testimonial-meta">{t.location} · {t.policy}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="lp-cta-banner" id="contact">
        <div className="lp-container">
          <div className="lp-cta-inner">
            <div className="lp-cta-seal-wrap" aria-hidden="true">
              <SCSeal size={110} />
            </div>
            <div className="lp-cta-content">
              <h2 className="lp-cta-title">Ready to Secure Your Family's Future?</h2>
              <p className="lp-cta-sub">Begin your application today. Takes about 10 minutes. Fully secure and digital.</p>
              <button className="lp-btn-gold" onClick={onApply}>
                Begin Your Application →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="lp-footer">
        <div className="lp-container">
          <div className="lp-footer-top">
            <div className="lp-footer-brand">
              <SCSeal size={54} />
              <div>
                <p className="lp-footer-name">SC Financial &amp; Life Services</p>
                <p className="lp-footer-tagline"><em>Stewards of Your Financial Life.</em></p>
              </div>
            </div>
            <div className="lp-footer-links">
              <div className="lp-footer-col">
                <p className="lp-footer-col-title">Coverage</p>
                <span>Term Life Insurance</span>
                <span>Whole Life Insurance</span>
                <span>Universal Life Insurance</span>
                <span>Indexed Universal Life</span>
                <span>Final Expense</span>
              </div>
              <div className="lp-footer-col">
                <p className="lp-footer-col-title">Company</p>
                <button onClick={() => scrollTo('about')}>About Us</button>
                <button onClick={() => scrollTo('process')}>How It Works</button>
                <button onClick={() => scrollTo('testimonials')}>Client Stories</button>
                <button onClick={onApply}>Apply Now</button>
              </div>
              <div className="lp-footer-col">
                <p className="lp-footer-col-title">Contact</p>
                <a href="mailto:info@scfinancial.com">info@scfinancial.com</a>
                <a href="tel:+12125550101">+1 (212) 555-0101</a>
                <span style={{marginTop:'4px', fontSize:'0.82rem', opacity:0.5, fontStyle:'italic'}}>Licensed Insurance Brokerage</span>
              </div>
            </div>
          </div>
          <div className="lp-footer-bottom">
            <p>© 2026 SC Financial Life Group. All rights reserved. Licensed Insurance Brokerage. <em>Stewards of Your Financial Life.</em></p>
            <div className="lp-footer-legal">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Licensing</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
