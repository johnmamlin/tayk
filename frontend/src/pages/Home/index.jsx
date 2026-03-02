import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Check, MapPin, Calendar, Users, TrendingUp } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════
   GLOBAL STYLES
   Tokens: --G forest | --CR cream | --TC1/2 terracotta
   Aesthetic: Editorial luxury consultancy · Bento grids
═══════════════════════════════════════════════════════════ */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Outfit:wght@300;400;500;600;700&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --G:   #1e3d30;
      --G2:  #2a4e40;
      --G3:  #173327;
      --G4:  #0f2219;
      --CR:  #f5f1ea;
      --CR2: #ede8df;
      --CR3: #e6e0d5;
      --MT:  #d6ebe2;
      --MT2: #e4f0ea;
      --TX:  #1a2e24;
      --TM:  #3a5448;
      --TL:  #6b7f74;
      --BD:  #ddd8cf;
      --BD2: #e8e3da;
      --WH:  #ffffff;
      --TC1: #8b4a2b;
      --TC2: #c47840;
      --TC3: #f0d4b8;
    }

    html { scroll-behavior: smooth; }
    body {
      background: var(--CR); color: var(--TX);
      font-family: 'Outfit', sans-serif;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }
    .serif { font-family: 'Cormorant Garamond', Georgia, serif; }
    a { color: inherit; text-decoration: none; }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--G4); }
    ::-webkit-scrollbar-thumb { background: var(--G2); border-radius: 99px; }

    .caps {
      font-family: 'Outfit', sans-serif;
      font-size: 10px; font-weight: 700;
      letter-spacing: 0.18em; text-transform: uppercase;
      color: var(--TL);
    }

    @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    .ticker-track {
      display: flex; width: max-content;
      animation: ticker 30s linear infinite;
    }
    .ticker-track:hover { animation-play-state: paused; }

    .lift {
      transition: transform .32s cubic-bezier(.2,.8,.2,1), box-shadow .32s cubic-bezier(.2,.8,.2,1);
    }
    .lift:hover { transform: translateY(-5px); box-shadow: 0 20px 56px rgba(26,46,36,.12); }

    .lg { position: relative; display: inline-flex; align-items: center; gap: 6px; }
    .lg::after {
      content: ''; position: absolute; bottom: -2px; left: 0;
      width: 0; height: 1px; background: currentColor;
      transition: width .3s cubic-bezier(.4,0,.2,1);
    }
    .lg:hover::after { width: 100%; }

    .sc {
      position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%);
      z-index: 200; background: var(--G); color: #fff; border: none;
      border-radius: 99px; padding: 13px 30px;
      font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 600;
      letter-spacing: .04em; cursor: pointer;
      display: inline-flex; align-items: center; gap: 8px;
      box-shadow: 0 8px 32px rgba(30,61,48,.4);
      transition: background .25s, transform .2s, box-shadow .25s;
      white-space: nowrap;
    }
    .sc:hover {
      background: var(--G2);
      transform: translateX(-50%) translateY(-2px);
      box-shadow: 0 14px 44px rgba(30,61,48,.5);
    }

    .h-scroll {
      display: flex; overflow-x: auto; gap: 14px;
      padding-bottom: 10px; scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch; scrollbar-width: none;
    }
    .h-scroll::-webkit-scrollbar { display: none; }
    .h-scroll > * { scroll-snap-align: start; flex-shrink: 0; }

    .focus-row { border-bottom: 1px solid rgba(255,255,255,.08); cursor: pointer; }
    .focus-detail {
      max-height: 0; overflow: hidden;
      transition: max-height .4s cubic-bezier(.4,0,.2,1), opacity .35s;
      opacity: 0;
    }
    .focus-detail.open { max-height: 130px; opacity: 1; }

    .focus-arrow { transition: transform .3s cubic-bezier(.4,0,.2,1); }
    .focus-row:hover .focus-arrow { transform: translateX(4px); }

    @media (max-width: 768px) {
      .hide-mobile { display: none !important; }
      .mobile-full { grid-column: 1 / -1 !important; }
    }
    @media (min-width: 769px) {
      .hide-desktop { display: none !important; }
    }
    @media (max-width: 600px) {
      .trust-row { grid-template-columns: repeat(2,1fr) !important; }
    }
    @media (max-width: 900px) {
      .wwd-cols { grid-template-columns: 1fr !important; }
      .cs-cols { grid-template-columns: 1fr !important; }
      .st-cols { grid-template-columns: 1fr !important; }
      .footer-cols { grid-template-columns: 1fr 1fr !important; }
      .hero-cols { grid-template-columns: 1fr !important; }
    }
    input:focus { outline: none; }
  `}</style>
);

const EASE = [0.16, 1, 0.3, 1];
const EASE2 = [0.4, 0, 0.2, 1];

/* Scroll reveal */
const R = ({ children, d = 0, y = 24, x = 0, style = {}, className = '' }) => {
  const ref = useRef(null);
  const v = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} style={style} className={className}
      initial={{ opacity: 0, y, x }}
      animate={v ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: .68, ease: EASE, delay: d }}>
      {children}
    </motion.div>
  );
};

/* Max-width wrapper */
const W = ({ children, style = {} }) => (
  <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 clamp(20px,5vw,56px)', ...style }}>
    {children}
  </div>
);

/* Pill button */
const Btn = ({ children, v = 'green', href = '#', style = {} }) => {
  const map = {
    green: { bg: 'var(--G)', col: '#fff', br: 'none', sh: '0 4px 20px rgba(30,61,48,.28)' },
    sand: { bg: '#e8c9a0', col: 'var(--G)', br: 'none', sh: '0 4px 16px rgba(200,170,100,.3)' },
    outline: { bg: 'transparent', col: 'var(--G)', br: '1.5px solid var(--G)', sh: 'none' },
    ow: { bg: 'transparent', col: '#fff', br: '1.5px solid rgba(255,255,255,.4)', sh: 'none' },
    white: { bg: '#fff', col: 'var(--G)', br: 'none', sh: '0 4px 20px rgba(0,0,0,.12)' },
    ghost: { bg: 'rgba(255,255,255,.1)', col: '#fff', br: '1px solid rgba(255,255,255,.2)', sh: 'none' },
  };
  const s = map[v] || map.green;
  return (
    <motion.a href={href} whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: .97 }}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        borderRadius: 99, padding: '12px 26px',
        fontSize: 13, fontWeight: 600, letterSpacing: '.04em',
        fontFamily: "'Outfit', sans-serif",
        background: s.bg, color: s.col, border: s.br || 'none',
        boxShadow: s.sh, cursor: 'pointer', transition: 'box-shadow .25s',
        ...style,
      }}>
      {children}
    </motion.a>
  );
};

/* ═══════════════════════════════════════════════════════════
   §1  HERO
═══════════════════════════════════════════════════════════ */
const Hero = () => {
  const badges = ['About Altura', 'Strategic Partnership', '15+ Years', 'Pan-African', 'Evidence-Led'];
  return (
    <section style={{ background: 'var(--G)', minHeight: '92vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      {/* Diagonal texture */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: `repeating-linear-gradient(-45deg,transparent,transparent 60px,rgba(255,255,255,.015) 60px,rgba(255,255,255,.015) 61px)` }} />
      {/* Glow */}
      <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 'clamp(280px,45vw,580px)', aspectRatio: '1', borderRadius: '50%', background: 'radial-gradient(circle, rgba(214,235,226,.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <W style={{ flex: 1, display: 'flex', alignItems: 'center', padding: 'clamp(100px,12vw,140px) clamp(20px,5vw,56px) 80px' }}>
        <div className="hero-cols" style={{ display: 'grid', gridTemplateColumns: '1.1fr .9fr', gap: 'clamp(40px,6vw,88px)', alignItems: 'center', width: '100%' }}>

          {/* LEFT */}
          <div>
            {/* Badges */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, ease: EASE, delay: .06 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 36 }}>
              {badges.map((b, i) => (
                <motion.span key={b} initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .1 + i * .07 }}
                  style={{ padding: '5px 14px', borderRadius: 99, border: '1px solid rgba(255,255,255,.15)', background: 'rgba(255,255,255,.05)', backdropFilter: 'blur(8px)', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,.72)', letterSpacing: '.06em' }}>
                  {b}
                </motion.span>
              ))}
            </motion.div>

            {/* Headline */}
            <motion.h1 className="serif" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: .16 }}
              style={{ fontSize: 'clamp(36px,5.5vw,70px)', fontWeight: 400, color: '#fff', lineHeight: 1.04, letterSpacing: '-0.02em', marginBottom: 28 }}>
              Building Healthier
              <span style={{ display: 'block', fontStyle: 'italic', color: 'var(--MT)' }}>Communities</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, ease: EASE, delay: .3 }}
              style={{ fontSize: 'clamp(15px,1.6vw,17px)', fontWeight: 300, color: 'rgba(255,255,255,.62)', lineHeight: 1.82, marginBottom: 44, maxWidth: 500 }}>
              Partnering with governments, NGOs, and counties to deliver measurable health system change.
            </motion.p>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, ease: EASE, delay: .42 }}
              style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 14, marginBottom: 56 }}>
              <Btn v="sand" href="/contact">Partner with us <ArrowRight size={14} strokeWidth={2} /></Btn>
              <Btn v="ghost" href="/services">Our services</Btn>
            </motion.div>

            {/* Mini stats */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .8, delay: .54 }}
              style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
              {[['15+', 'Years of expertise'], ['47+', 'Projects delivered'], ['12', 'Countries reached']].map(([v, l]) => (
                <div key={v}>
                  <div className="serif" style={{ fontSize: 'clamp(26px,3vw,36px)', fontWeight: 400, color: '#fff', lineHeight: 1, letterSpacing: '-0.02em' }}>{v}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,.4)', fontWeight: 400, marginTop: 5, letterSpacing: '.02em' }}>{l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — editorial image */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.1, ease: EASE, delay: .22 }}
            className="hide-mobile" style={{ position: 'relative' }}>
            <div style={{ width: '100%', aspectRatio: '4/4.6', borderRadius: 24, overflow: 'hidden', backgroundImage: 'url(/images/background3.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: 'var(--G2)', boxShadow: '0 32px 80px rgba(0,0,0,.4)' }} />
            {/* Floating KPI card */}
            <motion.div initial={{ opacity: 0, y: 20, scale: .9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: .7, ease: EASE, delay: .72 }}
              style={{ position: 'absolute', bottom: 28, left: -28, background: '#fff', borderRadius: 16, padding: '18px 22px', boxShadow: '0 12px 40px rgba(0,0,0,.15)', minWidth: 180 }}>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--TL)', marginBottom: 8 }}>Impact This Year</p>
              <div className="serif" style={{ fontSize: 36, fontWeight: 400, color: 'var(--G)', lineHeight: 1 }}>98%</div>
              <p style={{ fontSize: 12, color: 'var(--TM)', fontWeight: 300, marginTop: 4 }}>Client satisfaction rate</p>
            </motion.div>
            {/* Corner ring */}
            <div style={{ position: 'absolute', top: -16, right: -16, width: 80, height: 80, borderRadius: '50%', border: '1px solid rgba(214,235,226,.18)', pointerEvents: 'none' }} />
          </motion.div>
        </div>
      </W>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   §2  TRUST BAR
═══════════════════════════════════════════════════════════ */
const TrustBar = () => {
  const stats = [
    { v: '15+', l: 'Years of Expertise', icon: <TrendingUp size={17} strokeWidth={1.5} /> },
    { v: '47+', l: 'Projects Delivered', icon: <Check size={17} strokeWidth={1.5} /> },
    { v: '12', l: 'Countries Reached', icon: <MapPin size={17} strokeWidth={1.5} /> },
    { v: '98%', l: 'Client Satisfaction Rate', icon: <Users size={17} strokeWidth={1.5} /> },
  ];
  return (
    <section style={{ background: 'var(--G3)', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
      <W>
        <div className="trust-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }}>
          {stats.map((s, i) => (
            <R key={s.v} d={i * .07}>
              <div style={{ padding: 'clamp(22px,4vw,34px) clamp(18px,3vw,28px)', borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,.06)' : 'none', display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ color: 'var(--MT)', opacity: .65, flexShrink: 0 }}>{s.icon}</div>
                <div>
                  <div className="serif" style={{ fontSize: 'clamp(24px,3vw,36px)', fontWeight: 400, color: '#fff', lineHeight: 1, letterSpacing: '-0.02em' }}>{s.v}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,.38)', fontWeight: 400, marginTop: 5, letterSpacing: '.02em' }}>{s.l}</div>
                </div>
              </div>
            </R>
          ))}
        </div>
      </W>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   §3  TICKER
═══════════════════════════════════════════════════════════ */
const Ticker = () => {
  const words = ['CLINICAL EXCELLENCE', '·', 'POLICY LEADERSHIP', '·', 'SYSTEMS THINKING', '·', 'COMMUNITY IMPACT', '·', 'EVIDENCE-LED', '·', 'PAN-AFRICAN REACH', '·', 'PUBLIC HEALTH', '·', 'CAPACITY BUILDING', '·'];
  const all = [...words, ...words];
  return (
    <div style={{ background: 'var(--G)', borderTop: '1px solid rgba(255,255,255,.07)', overflow: 'hidden', padding: '17px 0' }}>
      <div className="ticker-track">
        {all.map((w, i) => (
          <span key={i} style={{ whiteSpace: 'nowrap', padding: '0 clamp(12px,2vw,22px)', fontSize: 10, fontWeight: 700, letterSpacing: '.22em', color: w === '·' ? 'var(--MT)' : 'rgba(255,255,255,.35)' }}>{w}</span>
        ))}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   §4  CORE VALUES — Bento grid
═══════════════════════════════════════════════════════════ */
const CoreValues = () => {
  const vals = [
    { n: '01', title: 'Evidence-Led Practice', body: "Every recommendation is grounded in data, peer-reviewed research, and measurable outcomes. We don't guess — we verify.", bg: 'var(--MT2)', dark: false },
    { n: '02', title: 'Systems Thinking', body: 'Health challenges are interconnected. We map entire ecosystems — policy, infrastructure, behaviour — before we intervene.', bg: 'var(--CR)', dark: false },
    { n: '03', title: 'Community Ownership', body: 'Sustainable change only happens when communities lead. We build capacity, transfer knowledge, and create lasting local structures.', bg: 'var(--G)', dark: true },
    { n: '04', title: 'Radical Accountability', body: 'We set KPIs before we start and report honestly on every project. Our clients see both our wins and our learnings.', bg: 'var(--CR2)', dark: false },
  ];
  const spans = [7, 5, 5, 7];

  return (
    <section style={{ background: 'var(--CR)', padding: 'clamp(72px,10vw,120px) 0' }}>
      <W>
        <R>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p className="caps" style={{ marginBottom: 14 }}>What Drives Us</p>
            <h2 className="serif" style={{ fontSize: 'clamp(28px,4vw,50px)', fontWeight: 400, color: 'var(--TX)', lineHeight: 1.1, letterSpacing: '-0.01em', marginBottom: 18 }}>Four principles behind every engagement</h2>
            <p style={{ fontSize: 'clamp(14px,1.5vw,16px)', color: 'var(--TL)', fontWeight: 300, lineHeight: 1.75, maxWidth: 560, margin: '0 auto' }}>Our values aren't a wall poster — they're the criteria we use to accept projects, design solutions, and evaluate impact.</p>
          </div>
        </R>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12,1fr)', gap: 14 }}>
          {vals.map((c, i) => (
            <R key={c.n} d={i * .08} className="mobile-full" style={{ gridColumn: `span ${spans[i]}` }}>
              <div className="lift" style={{ background: c.bg, borderRadius: 20, padding: 'clamp(28px,4vw,48px)', minHeight: 260, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: c.dark ? 'none' : '1px solid var(--BD2)', height: '100%' }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: c.dark ? 'rgba(214,235,226,.45)' : 'var(--TL)', letterSpacing: '.16em' }}>{c.n}</span>
                <div>
                  <h3 className="serif" style={{ fontSize: 'clamp(20px,2.2vw,30px)', fontWeight: 400, color: c.dark ? '#fff' : 'var(--TX)', marginBottom: 14, lineHeight: 1.2 }}>{c.title}</h3>
                  <p style={{ fontSize: 14.5, color: c.dark ? 'rgba(255,255,255,.58)' : 'var(--TM)', fontWeight: 300, lineHeight: 1.78 }}>{c.body}</p>
                </div>
              </div>
            </R>
          ))}
        </div>
      </W>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   §5  WHAT WE DO — Numbered hover-reveal list
═══════════════════════════════════════════════════════════ */
const WhatWeDo = () => {
  const [open, setOpen] = useState(null);
  const areas = [
    { n: '01', title: 'Health Systems Strengthening', detail: 'Designing scalable frameworks for national and county health systems — from governance structures to service delivery models that endure beyond any single project.' },
    { n: '02', title: 'Policy Formulation & Implementation', detail: 'End-to-end policy support: drafting, stakeholder alignment, legislative navigation, implementation planning, and monitoring frameworks for governments at every level.' },
    { n: '03', title: 'Primary Health Care & Family Medicine', detail: 'Embedding PHC principles into county strategies, building family medicine capacity, and reforming community health infrastructure for last-mile delivery.' },
    { n: '04', title: 'Public Health Training & Capacity Building', detail: 'Bespoke training programmes for health workers, county officials, and NGO teams — from clinical skills to leadership, data literacy, and systems thinking.' },
    { n: '05', title: 'Medical Products & Health Technologies', detail: 'Strategic guidance on procurement, supply chain resilience, HTA processes, and the integration of digital health tools into existing care pathways.' },
    { n: '06', title: 'Disease Prevention & Health Promotion', detail: "Community-rooted prevention campaigns, behaviour change communication, and intersectoral coordination for non-communicable and infectious disease control." },
  ];

  return (
    <section style={{ background: 'var(--G4)', padding: 'clamp(72px,10vw,120px) 0' }}>
      <W>
        <div className="wwd-cols" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px,8vw,100px)', alignItems: 'start' }}>

          {/* Left */}
          <R style={{ position: 'sticky', top: 120 }}>
            <p className="caps" style={{ color: 'rgba(214,235,226,.4)', marginBottom: 16 }}>What We Do</p>
            <h2 className="serif" style={{ fontSize: 'clamp(28px,4vw,52px)', fontWeight: 400, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.01em', marginBottom: 24 }}>
              Strategic focus
              <span style={{ display: 'block', fontStyle: 'italic', color: 'var(--MT)' }}>areas</span>
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,.45)', fontWeight: 300, lineHeight: 1.8, marginBottom: 36 }}>
              From clinical practice to national policy — we work at every level of the health system to create durable change.
            </p>
            <Btn v="ow" href="/services">All services <ArrowRight size={13} strokeWidth={2} /></Btn>
          </R>

          {/* Right: numbered list */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {areas.map((a, i) => (
              <R key={a.n} d={i * .05}>
                <div className="focus-row" onClick={() => setOpen(open === i ? null : i)} style={{ padding: 'clamp(18px,2.5vw,26px) 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(214,235,226,.28)', letterSpacing: '.1em', minWidth: 26 }}>{a.n}</span>
                    <span style={{ fontSize: 'clamp(15px,1.7vw,18px)', fontWeight: 500, color: '#fff', flex: 1, letterSpacing: '-.01em' }}>{a.title}</span>
                    <ArrowUpRight size={15} strokeWidth={1.5} className="focus-arrow" style={{ color: 'rgba(255,255,255,.3)', flexShrink: 0 }} />
                  </div>
                  <div className={`focus-detail ${open === i ? 'open' : ''}`} style={{ paddingLeft: 44 }}>
                    <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,.48)', fontWeight: 300, lineHeight: 1.78, paddingTop: 14 }}>{a.detail}</p>
                  </div>
                </div>
              </R>
            ))}
          </div>
        </div>
      </W>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   §6  NEED HELP — terracotta band
═══════════════════════════════════════════════════════════ */
const NeedHelp = () => (
  <section style={{ background: 'linear-gradient(135deg,var(--TC1) 0%,var(--TC2) 100%)', padding: 'clamp(64px,8vw,88px) clamp(20px,5vw,56px)', position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 25% 50%,rgba(255,255,255,.07) 0%,transparent 60%)', pointerEvents: 'none' }} />
    <div style={{ maxWidth: 1120, margin: '0 auto', position: 'relative' }}>
      <div className="wwd-cols" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px,6vw,80px)', alignItems: 'center' }}>
        <R><h2 className="serif" style={{ fontSize: 'clamp(26px,3.5vw,46px)', fontWeight: 400, color: '#fff', lineHeight: 1.15 }}>Not sure where Altura can help?</h2></R>
        <R d={.1}>
          <p style={{ fontSize: 15.5, color: 'rgba(255,255,255,.78)', marginBottom: 28, fontWeight: 300, lineHeight: 1.75 }}>Schedule a free 20-minute strategy call with our advisory team to discuss your health system challenge.</p>
          <Btn v="white" href="/contact">Book a strategy call <ArrowRight size={14} strokeWidth={2} /></Btn>
        </R>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════
   §7  SUCCESS STORIES — KPI case study cards
═══════════════════════════════════════════════════════════ */
const SuccessStories = () => {
  const cases = [
    { tag: 'County Government · Nairobi', title: 'Reforming Primary Health Care Delivery', kpis: [['50K+', 'Beneficiaries'], ['18 mo.', 'Timeline'], ['34%', 'Fewer referrals']], body: 'Led the design and rollout of a PHC reform framework for three sub-counties, restructuring community health units and retraining frontline workers.', img: '/images/backpage3.jpeg' },
    { tag: 'NGO Partnership · UNFPA', title: 'Maternal Health System Strengthening', kpis: [['12', 'Counties'], ['2,400+', 'Workers trained'], ['61%', 'Skilled births ↑']], body: 'Partnered with UNFPA to develop and implement a national maternal health capacity-building curriculum, embedding quality improvement at county level.', img: '/images/backpage2.jpeg' },
    { tag: 'National Ministry · Kenya MOH', title: 'NCD Policy Formulation & Rollout', kpis: [['1 Policy', 'Passed'], ['8 Agencies', 'Coordinated'], ['3 Years', 'Sustained']], body: "Co-authored Kenya's non-communicable disease prevention policy, coordinating across eight government agencies and translating it into county guides.", img: '/images/oda1.jpeg' },
  ];

  return (
    <section style={{ background: 'var(--CR)', padding: 'clamp(72px,10vw,120px) 0' }}>
      <W>
        <R>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p className="caps" style={{ marginBottom: 14 }}>Success Stories</p>
            <h2 className="serif" style={{ fontSize: 'clamp(28px,4vw,50px)', fontWeight: 400, color: 'var(--TX)', lineHeight: 1.1, marginBottom: 18 }}>Impact you can measure</h2>
            <p style={{ fontSize: 'clamp(14px,1.5vw,16px)', color: 'var(--TL)', fontWeight: 300, lineHeight: 1.75, maxWidth: 520, margin: '0 auto' }}>Every engagement ends with a scorecard. Here is what that looks like in practice.</p>
          </div>
        </R>

        <div className="cs-cols" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }}>
          {cases.map((c, i) => (
            <R key={c.title} d={i * .09}>
              <div className="lift" style={{ border: '1px solid var(--BD2)', borderRadius: 20, overflow: 'hidden', background: '#fff', display: 'flex', flexDirection: 'column', boxShadow: '0 2px 12px rgba(26,46,36,.04)', height: '100%' }}>
                <div style={{ height: 178, backgroundImage: `url(${c.img})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: 'var(--MT)', position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg,rgba(26,46,36,.5) 0%,transparent 60%)' }} />
                  <span style={{ position: 'absolute', bottom: 14, left: 16, fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,.85)', letterSpacing: '.12em', textTransform: 'uppercase', background: 'rgba(0,0,0,.3)', padding: '4px 10px', borderRadius: 99, backdropFilter: 'blur(4px)' }}>{c.tag}</span>
                </div>
                <div style={{ padding: '22px 22px 26px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 className="serif" style={{ fontSize: 21, fontWeight: 500, color: 'var(--TX)', marginBottom: 18, lineHeight: 1.2 }}>{c.title}</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 18 }}>
                    {c.kpis.map(([v, l]) => (
                      <div key={v} style={{ background: 'var(--MT2)', borderRadius: 10, padding: '10px 10px' }}>
                        <div className="serif" style={{ fontSize: 17, fontWeight: 500, color: 'var(--G)', lineHeight: 1 }}>{v}</div>
                        <div style={{ fontSize: 10, color: 'var(--TL)', fontWeight: 400, marginTop: 5, lineHeight: 1.4 }}>{l}</div>
                      </div>
                    ))}
                  </div>
                  <p style={{ fontSize: 13.5, color: 'var(--TM)', fontWeight: 300, lineHeight: 1.78, flex: 1 }}>{c.body}</p>
                  <a href="/contact" className="lg" style={{ fontSize: 13, fontWeight: 600, color: 'var(--G)', marginTop: 18 }}>Read full story <ArrowRight size={12} strokeWidth={2.2} /></a>
                </div>
              </div>
            </R>
          ))}
        </div>
      </W>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   §8  ON THE GROUND — Desktop grid / Mobile swipe carousel
═══════════════════════════════════════════════════════════ */
const EventCard = ({ e }) => (
  <div className="lift" style={{ border: '1px solid var(--BD2)', borderRadius: 16, overflow: 'hidden', background: '#fff', boxShadow: '0 2px 10px rgba(26,46,36,.05)' }}>
    <div style={{ height: 158, backgroundImage: `url(${e.img})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: 'var(--MT)', position: 'relative' }}>
      <span style={{ position: 'absolute', top: 12, left: 12, background: 'var(--G)', color: '#fff', fontSize: 9, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 99 }}>{e.tag}</span>
    </div>
    <div style={{ padding: '16px 18px 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
        <Calendar size={11} color="var(--TL)" strokeWidth={1.8} />
        <span style={{ fontSize: 11, color: 'var(--TL)', fontWeight: 500, letterSpacing: '.04em' }}>{e.date}</span>
      </div>
      <h4 className="serif" style={{ fontSize: 19, fontWeight: 500, color: 'var(--TX)', marginBottom: 7, lineHeight: 1.25 }}>{e.title}</h4>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <MapPin size={10} color="var(--TL)" strokeWidth={1.8} />
        <span style={{ fontSize: 11.5, color: 'var(--TL)', fontWeight: 400 }}>{e.loc}</span>
      </div>
    </div>
  </div>
);

const OnTheGround = () => {
  const events = [
    { date: 'Feb 2026', tag: 'Conference', title: 'East Africa Health Systems Forum', loc: 'Nairobi, Kenya', img: '/images/event1.jpeg' },
    { date: 'Jan 2026', tag: 'Training', title: 'PHC Capacity Building — Kisumu County', loc: 'Kisumu, Kenya', img: '/images/event2.jpeg' },
    { date: 'Dec 2025', tag: 'Policy Workshop', title: 'NCD Prevention Policy Review', loc: 'Virtual / Nairobi', img: '/images/event3.jpeg' },
    { date: 'Nov 2025', tag: 'Partnership', title: 'UNFPA Maternal Health Programme Launch', loc: 'Mombasa, Kenya', img: '/images/backpage2.jpeg' },
    { date: 'Oct 2025', tag: 'Research', title: 'Community Health Survey — 5 Counties', loc: 'Various Counties', img: '/images/backpage3.jpeg' },
  ];

  return (
    <section style={{ background: 'var(--CR2)', padding: 'clamp(72px,10vw,120px) 0' }}>
      <W>
        <R>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 20 }}>
            <div>
              <p className="caps" style={{ marginBottom: 14 }}>On The Ground</p>
              <h2 className="serif" style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 400, color: 'var(--TX)', lineHeight: 1.1 }}>Recent activity</h2>
            </div>
            <a href="/news" className="lg" style={{ fontSize: 13, fontWeight: 600, color: 'var(--G)' }}>View all events <ArrowRight size={13} strokeWidth={2} /></a>
          </div>
        </R>
        {/* Desktop */}
        <div className="hide-mobile" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
          {events.slice(0, 3).map((e, i) => <R key={e.title} d={i * .08}><EventCard e={e} /></R>)}
        </div>
        {/* Mobile swipe */}
        <div className="hide-desktop h-scroll">
          {events.map(e => <div key={e.title} style={{ width: '78vw', maxWidth: 290 }}><EventCard e={e} /></div>)}
        </div>
      </W>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   §9  DARK STATEMENT
═══════════════════════════════════════════════════════════ */
const Statement = () => (
  <section style={{ background: 'var(--G)', padding: 'clamp(80px,12vw,128px) clamp(20px,5vw,56px)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', inset: 0, backgroundImage: `repeating-linear-gradient(-45deg,transparent,transparent 60px,rgba(255,255,255,.012) 60px,rgba(255,255,255,.012) 61px)`, pointerEvents: 'none' }} />
    <R>
      <div style={{ width: 1, height: 56, background: 'rgba(214,235,226,.18)', margin: '0 auto 48px' }} />
      <blockquote className="serif" style={{ fontSize: 'clamp(22px,4vw,52px)', fontWeight: 400, color: '#fff', lineHeight: 1.32, maxWidth: 820, margin: '0 auto 48px', letterSpacing: '-0.015em' }}>
        "Your health is complex, and your symptoms are only part of the story. We listen, uncover the why, and treat the root cause."
      </blockquote>
      <div style={{ width: 1, height: 56, background: 'rgba(214,235,226,.18)', margin: '0 auto 40px' }} />
      <Btn v="sand" href="/contact">Start a conversation <ArrowRight size={14} strokeWidth={2} /></Btn>
    </R>
  </section>
);

/* ═══════════════════════════════════════════════════════════
   §10  PARTNERS
═══════════════════════════════════════════════════════════ */
const Partners = () => (
  <section style={{ background: 'var(--CR)', padding: 'clamp(56px,8vw,88px) 0', borderTop: '1px solid var(--BD2)' }}>
    <W>
      <R style={{ textAlign: 'center', marginBottom: 44 }}>
        <p className="caps">Trusted by leading organisations</p>
      </R>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', alignItems: 'center' }}>
        {['UNICEF', 'WHO', 'UNFPA', 'USAID', 'Kenya MOH', 'Kenya Red Cross', 'AMREF', 'MSF'].map((p, i) => (
          <R key={p} d={i * .04}>
            <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--TM)', letterSpacing: '.12em', textTransform: 'uppercase', padding: '9px 20px', border: '1px solid var(--BD2)', borderRadius: 8, background: '#fff', transition: 'border-color .2s, color .2s, transform .2s', cursor: 'default' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--G)'; e.currentTarget.style.color = 'var(--G)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--BD2)'; e.currentTarget.style.color = 'var(--TM)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              {p}
            </div>
          </R>
        ))}
      </div>
    </W>
  </section>
);

/* ═══════════════════════════════════════════════════════════
   §11  CLIENT VOICES
═══════════════════════════════════════════════════════════ */
const Stories = () => {
  const [page, setPage] = useState(0);
  const all = [
    { name: 'Amara O.', role: 'County Health Director', quote: "Altura gave our county a workable, evidence-based framework. Implementation was smoother than any engagement we'd had before." },
    { name: 'James K.', role: 'Programme Officer, WHO', quote: "The level of attention is unlike anything I have experienced. They don't just consult — they embed and build our capacity to continue." },
    { name: 'Selin T.', role: 'National Policy Lead', quote: "The policy document Altura developed is now being used as a template in three neighbouring counties. That's work that outlasts the engagement." },
    { name: 'Grace M.', role: 'UNFPA Programme Manager', quote: "Working with Altura helped our team develop a PHC strategy that is actually grounded in what communities need — not what looks good in a report." },
    { name: 'David N.', role: 'NGO Director', quote: "After years of siloed approaches, Altura helped us see the system. The change in how our team thinks about health challenges has been remarkable." },
    { name: 'Faith A.', role: 'County Health Executive', quote: "The capacity building programme has stayed with our staff. A year later, they're still applying what they learned. That's impact that compounds." },
  ];
  const total = Math.ceil(all.length / 3);
  const vis = all.slice(page * 3, page * 3 + 3);

  return (
    <section style={{ background: 'var(--CR2)', padding: 'clamp(72px,10vw,120px) 0' }}>
      <W>
        <R>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 52, flexWrap: 'wrap', gap: 20 }}>
            <div>
              <p className="caps" style={{ marginBottom: 14 }}>Client Voices</p>
              <h2 className="serif" style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 400, color: 'var(--TX)', lineHeight: 1.1 }}>What our partners say</h2>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <motion.button whileTap={{ scale: .92 }} onClick={() => setPage(p => Math.max(0, p - 1))}
                style={{ width: 44, height: 44, borderRadius: '50%', border: '1.5px solid var(--BD)', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--TX)', transition: 'border-color .2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--G)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--BD)'}>
                <ChevronLeft size={16} strokeWidth={1.8} />
              </motion.button>
              <motion.button whileTap={{ scale: .92 }} onClick={() => setPage(p => Math.min(total - 1, p + 1))}
                style={{ width: 44, height: 44, borderRadius: '50%', border: 'none', background: 'var(--G)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', transition: 'background .2s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--G2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--G)'}>
                <ChevronRight size={16} strokeWidth={1.8} />
              </motion.button>
            </div>
          </div>
        </R>

        <div className="st-cols" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
          <AnimatePresence mode="wait">
            {vis.map((s, i) => (
              <motion.div key={s.name + page} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: .38, ease: EASE, delay: i * .06 }}>
                <div className="lift" style={{ background: '#fff', borderRadius: 18, border: '1px solid var(--BD2)', padding: 'clamp(22px,3vw,30px)', display: 'flex', flexDirection: 'column', gap: 22, boxShadow: '0 2px 12px rgba(26,46,36,.04)', height: '100%' }}>
                  <div style={{ display: 'flex', gap: 3 }}>{[...Array(5)].map((_, j) => <span key={j} style={{ color: 'var(--TC2)', fontSize: 13 }}>★</span>)}</div>
                  <p style={{ fontSize: 14.5, color: 'var(--TM)', fontWeight: 300, lineHeight: 1.82, fontStyle: 'italic', flex: 1 }}>"{s.quote}"</p>
                  <div style={{ borderTop: '1px solid var(--BD2)', paddingTop: 16 }}>
                    <p style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--TX)' }}>{s.name}</p>
                    <p style={{ fontSize: 11.5, color: 'var(--TL)', marginTop: 3, fontWeight: 400 }}>{s.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 36 }}>
          {Array.from({ length: total }).map((_, i) => (
            <motion.button key={i} onClick={() => setPage(i)}
              style={{ width: i === page ? 28 : 8, height: 8, borderRadius: 99, border: 'none', cursor: 'pointer', background: i === page ? 'var(--G)' : 'var(--BD)', transition: 'all .35s cubic-bezier(.4,0,.2,1)' }} />
          ))}
        </div>
      </W>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   §12  CLOSING CTA — terracotta
═══════════════════════════════════════════════════════════ */
const ClosingCTA = () => (
  <section style={{ background: 'linear-gradient(135deg,#7a3a24 0%,#b06040 45%,#8a5030 100%)', padding: 'clamp(80px,12vw,128px) clamp(20px,5vw,56px)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center,rgba(255,255,255,.06) 0%,transparent 65%)', pointerEvents: 'none' }} />
    <R style={{ position: 'relative', maxWidth: 720, margin: '0 auto' }}>
      <p className="caps" style={{ color: 'rgba(255,255,255,.42)', marginBottom: 20 }}>Begin Today</p>
      <h2 className="serif" style={{ fontSize: 'clamp(28px,5vw,58px)', fontWeight: 400, color: '#fff', marginBottom: 56, lineHeight: 1.15, letterSpacing: '-0.02em' }}>Life-changing care starts now</h2>
      <div style={{ width: 1, height: 60, background: 'rgba(255,255,255,.2)', margin: '0 auto 52px' }} />
      <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginBottom: 26 }}>
        {[...Array(5)].map((_, i) => <span key={i} style={{ color: 'rgba(255,255,255,.62)', fontSize: 14 }}>★</span>)}
      </div>
      <blockquote className="serif" style={{ fontSize: 'clamp(15px,2vw,22px)', fontWeight: 300, fontStyle: 'italic', color: 'rgba(255,255,255,.88)', lineHeight: 1.78, marginBottom: 36 }}>
        "Altura has been life-changing for me. The team caught patterns in my labs and helped me avoid serious outcomes. My health has vastly improved since I became an Altura patient."
      </blockquote>
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,.6)', marginBottom: 4 }}>Grace M.</p>
      <p style={{ fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,.35)', marginBottom: 52 }}>Altura Health Member</p>
      <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Btn v="white" href="/contact">Partner with us <ArrowRight size={14} strokeWidth={2} /></Btn>
        <Btn v="ow" href="/services">Our services</Btn>
      </div>
    </R>
  </section>
);

/* ═══════════════════════════════════════════════════════════
   §13  FOOTER
═══════════════════════════════════════════════════════════ */
const Footer = () => {
  const [email, setEmail] = useState('');
  const cols = [
    { h: 'Services', links: ['Health Systems', 'Policy & Advocacy', 'PHC & Family Medicine', 'Capacity Building', 'Health Technology', 'Disease Prevention'] },
    { h: 'Company', links: ['About Altura', 'Our Methodology', 'Leadership Team', 'Partner Stories', 'Careers', 'Contact Us'] },
    { h: 'Resources', links: ['Case Studies', 'Research Papers', 'Blog & Insights', 'Press Room', 'FAQs'] },
    { h: 'Work With Us', links: ['Governments', 'NGO Partners', 'County Governments', 'Private Sector', 'Academic Partners'] },
  ];
  return (
    <footer style={{ background: 'var(--G4)', padding: 'clamp(60px,8vw,96px) 0 40px' }}>
      <W>
        <div className="footer-cols" style={{ display: 'grid', gridTemplateColumns: '280px repeat(4,1fr)', gap: 'clamp(28px,4vw,44px)', marginBottom: 64 }}>
          <div>
            <div className="serif" style={{ fontSize: 28, fontWeight: 400, color: '#fff', marginBottom: 4, letterSpacing: '-0.01em' }}>Altura</div>
            <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: '#6eb89a', marginBottom: 20 }}>Health Strategies Limited</p>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,.3)', lineHeight: 1.82, fontWeight: 300, marginBottom: 28, maxWidth: 210 }}>Root-cause health consultancy bridging clinical medicine, public health, and policy.</p>
            <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#6eb89a', marginBottom: 14 }}>Newsletter</p>
            <div style={{ display: 'flex', borderRadius: 99, overflow: 'hidden', border: '1px solid rgba(255,255,255,.1)', background: 'rgba(255,255,255,.04)' }}>
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email"
                style={{ flex: 1, padding: '9px 14px', background: 'transparent', border: 'none', color: '#fff', fontSize: 12, outline: 'none' }} />
              <button onClick={() => setEmail('')}
                style={{ padding: '9px 16px', background: 'var(--G2)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 600, letterSpacing: '.06em', whiteSpace: 'nowrap', transition: 'background .2s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#3a6254'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--G2)'}>Subscribe</button>
            </div>
          </div>
          {cols.map(c => (
            <div key={c.h}>
              <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: '#6eb89a', marginBottom: 18 }}>{c.h}</p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {c.links.map(l => (
                  <li key={l}>
                    <a href="#" style={{ fontSize: 13, color: 'rgba(255,255,255,.3)', fontWeight: 300, transition: 'color .2s' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,.75)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,.3)'}>{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,.06)', paddingTop: 26, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14, alignItems: 'center' }}>
          <span style={{ fontSize: 11.5, color: 'rgba(255,255,255,.18)' }}>© 2026 Altura Health Strategies Limited · P.O Box 70036 – 00400, Nairobi, Kenya</span>
          <div style={{ display: 'flex', gap: 22 }}>
            {['Privacy Policy', 'Terms of Use', 'Accessibility'].map(l => (
              <a key={l} href="#" style={{ fontSize: 11.5, color: 'rgba(255,255,255,.18)', transition: 'color .2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,.5)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,.18)'}>{l}</a>
            ))}
          </div>
        </div>
      </W>
    </footer>
  );
};

/* ═══════════════════════════════════════════════════════════
   PAGE EXPORT
═══════════════════════════════════════════════════════════ */
export default function Index() {
  return (
    <>
      <GlobalStyles />
      <a href="/contact" className="sc">Partner with us <ArrowRight size={14} strokeWidth={2} /></a>
      <main>
        <Hero />
        <TrustBar />
        <Ticker />
        <CoreValues />
        <WhatWeDo />
        <NeedHelp />
        <SuccessStories />
        <OnTheGround />
        <Statement />
        <Partners />
        <Stories />
        <ClosingCTA />
      </main>
    </>
  );
}