import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
    ArrowRight, ArrowUpRight, CheckCircle, ChevronRight,
    MapPin, Award, Users, Globe, BookOpen, Heart, Shield,
    TrendingUp, Cpu, Activity, Mail, Zap, Target, BarChart3,
    Microscope, Building2, FileText, Network, GraduationCap,
    Stethoscope, Leaf, Briefcase, AlertTriangle, LightbulbIcon,
    CheckSquare, ChevronDown, Star, Layers, Database, Link,
} from 'lucide-react';

/* ══════════════════════════════════════════════════════════════
   SERVICES.JSX — Altura Health Strategies
   ─────────────────────────────────────────────────────────────
   Aesthetic  : Editorial authority · Problem→Solution→Impact
   Palette    : Forest greens + cream + terracotta accents
   Fonts      : Cormorant Garamond (display) + DM Sans (body)
   Responsive : Mobile-first, clamp() fluid type, snap nav
══════════════════════════════════════════════════════════════ */

const GlobalStyles = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300;1,9..40,400&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      /* Core greens — shared with Index & About */
      --G:    #1e3d30;
      --G2:   #2a4e40;
      --G3:   #173327;
      --G4:   #0f2219;
      --G5:   #0a1a13;
      /* Creams */
      --CR:   #f5f1ea;
      --CR2:  #ede8df;
      --CR3:  #e6e0d5;
      /* Mints */
      --MT:   #d6ebe2;
      --MT2:  #e4f0ea;
      --MT3:  #a8d5bc;
      /* Terracotta */
      --TC1:  #8b4a2b;
      --TC2:  #c47840;
      --TC3:  #f0d4b8;
      /* Text */
      --TX:   #1a2e24;
      --TM:   #3a5448;
      --TL:   #6b7f74;
      /* Borders */
      --BD:   #ddd8cf;
      --BD2:  #e8e3da;
      /* Gold */
      --GOLD: #c8a96e;
      /* Teal (About page nodes) */
      --T1:   #132D2E;
      --T2:   #284849;
    }

    html { scroll-behavior: smooth; }

    body {
      font-family: 'DM Sans', sans-serif;
      background: var(--CR);
      color: var(--TX);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      overflow-x: hidden;
    }

    .serif { font-family: 'Cormorant Garamond', Georgia, serif; }
    a { color: inherit; text-decoration: none; }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--G4); }
    ::-webkit-scrollbar-thumb { background: var(--G2); border-radius: 99px; }

    /* ── Label caps ── */
    .scaps {
      font-family: 'DM Sans', sans-serif;
      font-size: 10px; font-weight: 700;
      letter-spacing: 0.22em; text-transform: uppercase;
    }

    /* ── Card lift ── */
    .slift {
      transition: transform .3s cubic-bezier(.2,.8,.2,1),
                  box-shadow .3s cubic-bezier(.2,.8,.2,1);
    }
    .slift:hover {
      transform: translateY(-5px);
      box-shadow: 0 24px 64px rgba(26,46,36,.14);
    }

    /* ── Problem card ── */
    .prob-card {
      border-left: 3px solid var(--TC1);
      background: rgba(139,74,43,.06);
    }

    /* ── Impact number ── */
    .impact-num {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(36px,5vw,60px);
      font-weight: 400; line-height: 1;
      letter-spacing: -0.025em;
    }

    /* ── Service nav pill ── */
    .snav-pill {
      transition: background .22s, color .22s, box-shadow .22s;
      white-space: nowrap;
      cursor: pointer;
    }
    .snav-pill.active {
      background: var(--G);
      color: #fff;
      box-shadow: 0 4px 20px rgba(30,61,48,.28);
    }
    .snav-pill:not(.active):hover {
      background: var(--MT);
      color: var(--G);
    }

    /* ── Sticky service nav ── */
    .snav-bar {
      position: sticky;
      top: 0;
      z-index: 80;
      background: rgba(245,241,234,.96);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--BD2);
    }

    /* ── Section alternation ── */
    .s-light  { background: var(--CR); }
    .s-light2 { background: var(--CR2); }
    .s-dark   { background: var(--G); }
    .s-dark2  { background: var(--G3); }
    .s-teal   { background: linear-gradient(180deg, var(--T1) 0%, var(--T2) 100%); }

    /* ── Offering card ── */
    .offer-card {
      transition: border-color .25s, background .25s, transform .3s cubic-bezier(.2,.8,.2,1), box-shadow .3s;
    }
    .offer-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 56px rgba(26,46,36,.10);
    }

    /* ── Ticker ── */
    @keyframes sticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    .sticker-track { display: flex; width: max-content; animation: sticker 38s linear infinite; }
    .sticker-track:hover { animation-play-state: paused; }

    /* ── Link grow ── */
    .slg {
      position: relative; display: inline-flex; align-items: center; gap: 6px;
    }
    .slg::after {
      content: ''; position: absolute; bottom: -2px; left: 0;
      width: 0; height: 1px; background: currentColor;
      transition: width .3s cubic-bezier(.4,0,.2,1);
    }
    .slg:hover::after { width: 100%; }

    /* ── Diagonal texture ── */
    .stex {
      background-image: repeating-linear-gradient(
        -45deg, transparent, transparent 60px,
        rgba(255,255,255,.016) 60px, rgba(255,255,255,.016) 61px
      );
    }

    /* ── Responsive ── */
    @media (max-width: 1024px) {
      .s3col { grid-template-columns: repeat(2,1fr) !important; }
    }
    @media (max-width: 768px) {
      .smob-hide   { display: none !important; }
      .smob-full   { grid-column: 1/-1 !important; }
      .smob-stack  { grid-template-columns: 1fr !important; }
      .smob-center { text-align: center !important; }
      .s3col       { grid-template-columns: 1fr !important; }
      .s2col       { grid-template-columns: 1fr !important; }
    }
    @media (min-width: 769px) {
      .sdesk-hide { display: none !important; }
    }

    /* ── Snav scroll ── */
    .snav-scroll {
      display: flex; gap: 8px; overflow-x: auto;
      padding: 14px clamp(20px,5vw,56px);
      scrollbar-width: none;
    }
    .snav-scroll::-webkit-scrollbar { display: none; }

    /* ── Progress bar ── */
    .sprogress {
      height: 2px;
      background: linear-gradient(90deg, var(--G), var(--MT3));
      transition: width .6s cubic-bezier(.4,0,.2,1);
    }

    input:focus, textarea:focus { outline: none; }
  `}</style>
);

/* ─── Constants ────────────────────────────────────────────── */
const EASE = [0.16, 1, 0.3, 1];
const EASE2 = [0.4, 0, 0.2, 1];

/* ─── Scroll reveal ────────────────────────────────────────── */
const R = ({ children, d = 0, y = 22, x = 0, style = {}, className = '' }) => {
    const ref = useRef(null);
    const v = useInView(ref, { once: true, margin: '-52px' });
    return (
        <motion.div ref={ref} style={style} className={className}
            initial={{ opacity: 0, y, x }}
            animate={v ? { opacity: 1, y: 0, x: 0 } : {}}
            transition={{ duration: .58, ease: EASE, delay: d }}>
            {children}
        </motion.div>
    );
};

/* ─── Max-width wrapper ────────────────────────────────────── */
const W = ({ children, style = {} }) => (
    <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 clamp(20px,5vw,56px)', ...style }}>
        {children}
    </div>
);

/* ─── Pill button ──────────────────────────────────────────── */
const Btn = ({ children, v = 'green', href = '#', sx = {} }) => {
    const map = {
        green: { bg: 'var(--G)', col: '#fff', br: 'none', sh: '0 4px 20px rgba(30,61,48,.28)' },
        cream: { bg: 'var(--CR)', col: 'var(--G)', br: 'none', sh: '0 4px 16px rgba(245,241,234,.3)' },
        outline: { bg: 'transparent', col: 'var(--G)', br: '1.5px solid var(--G)', sh: 'none' },
        ow: { bg: 'transparent', col: '#fff', br: '1.5px solid rgba(255,255,255,.4)', sh: 'none' },
        gold: { bg: 'var(--GOLD)', col: '#1a1208', br: 'none', sh: '0 4px 18px rgba(200,169,110,.3)' },
        mint: { bg: 'var(--MT)', col: 'var(--G)', br: 'none', sh: 'none' },
        terra: { bg: 'linear-gradient(135deg,var(--TC1),var(--TC2))', col: '#fff', br: 'none', sh: '0 4px 16px rgba(139,74,43,.3)' },
        teal: { bg: 'var(--T1)', col: '#fff', br: 'none', sh: '0 4px 20px rgba(19,45,46,.4)' },
    };
    const s = map[v] || map.green;
    return (
        <motion.a href={href} whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: .97 }}
            style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                borderRadius: 99, padding: '12px 26px',
                fontSize: 13, fontWeight: 600, letterSpacing: '.04em',
                fontFamily: "'DM Sans', sans-serif",
                background: s.bg, color: s.col, border: s.br || 'none',
                boxShadow: s.sh, cursor: 'pointer', transition: 'filter .2s, box-shadow .25s',
                ...sx,
            }}>
            {children}
        </motion.a>
    );
};

/* ─── PSI badge (Problem / Solution / Impact) ──────────────── */
const PSIBadge = ({ type }) => {
    const styles = {
        Problem: { bg: 'rgba(139,74,43,.10)', col: '#8b4a2b', br: '1px solid rgba(139,74,43,.22)' },
        Solution: { bg: 'rgba(30,61,48,.08)', col: '#1e3d30', br: '1px solid rgba(30,61,48,.18)' },
        Impact: { bg: 'rgba(168,213,188,.3)', col: '#1e3d30', br: '1px solid rgba(168,213,188,.5)' },
    };
    const s = styles[type];
    return (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 12px', borderRadius: 99, fontSize: 9, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', fontFamily: "'DM Sans',sans-serif", background: s.bg, color: s.col, border: s.br }}>
            {type === 'Problem' && <AlertTriangle size={9} strokeWidth={2.2} />}
            {type === 'Solution' && <LightbulbIcon size={9} strokeWidth={2.2} />}
            {type === 'Impact' && <TrendingUp size={9} strokeWidth={2.2} />}
            {type}
        </span>
    );
};

/* ─── Offering card ────────────────────────────────────────── */
const OfferCard = ({ icon, title, problem, solution, impact, dark = false }) => {
    const [open, setOpen] = useState(false);
    const c = dark
        ? { bg: 'rgba(255,255,255,.05)', br: '1px solid rgba(255,255,255,.1)', tx: '#fff', ts: 'rgba(255,255,255,.55)', tl: 'rgba(255,255,255,.38)' }
        : { bg: '#fff', br: '1px solid var(--BD2)', tx: 'var(--TX)', ts: 'var(--TM)', tl: 'var(--TL)' };

    return (
        <div className="offer-card" style={{ background: c.bg, border: c.br, borderRadius: 18, padding: 'clamp(22px,2.8vw,36px)', display: 'flex', flexDirection: 'column', gap: 18, height: '100%', cursor: 'default', backdropFilter: dark ? 'blur(12px)' : 'none' }}>
            {/* Icon + title */}
            <div>
                <div style={{ width: 46, height: 46, borderRadius: 13, background: dark ? 'rgba(168,213,188,.12)' : 'var(--MT2)', border: dark ? '1px solid rgba(168,213,188,.2)' : '1px solid var(--MT)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: dark ? 'var(--MT3)' : 'var(--G)', marginBottom: 16 }}>
                    {icon}
                </div>
                <h4 className="serif" style={{ fontSize: 'clamp(18px,2vw,23px)', fontWeight: 500, color: c.tx, lineHeight: 1.22, marginBottom: 0 }}>
                    {title}
                </h4>
            </div>

            {/* PSI stacked content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, flexGrow: 1 }}>
                {/* Problem */}
                <div style={{ padding: '12px 14px', borderRadius: 10, borderLeft: '3px solid var(--TC1)', background: dark ? 'rgba(139,74,43,.12)' : 'rgba(139,74,43,.06)' }}>
                    <PSIBadge type="Problem" />
                    <p style={{ fontSize: 13, color: dark ? 'rgba(255,255,255,.58)' : '#7a3e28', fontWeight: 300, lineHeight: 1.72, marginTop: 8 }}>{problem}</p>
                </div>

                {/* Solution */}
                <div style={{ padding: '12px 14px', borderRadius: 10, borderLeft: '3px solid var(--G)', background: dark ? 'rgba(30,61,48,.25)' : 'rgba(30,61,48,.05)' }}>
                    <PSIBadge type="Solution" />
                    <p style={{ fontSize: 13, color: c.ts, fontWeight: 300, lineHeight: 1.72, marginTop: 8 }}>{solution}</p>
                </div>

                {/* Impact */}
                <div style={{ padding: '12px 14px', borderRadius: 10, background: dark ? 'rgba(168,213,188,.08)' : 'var(--MT2)', border: dark ? '1px solid rgba(168,213,188,.15)' : '1px solid var(--MT)' }}>
                    <PSIBadge type="Impact" />
                    <p style={{ fontSize: 13, color: dark ? 'rgba(168,213,188,.8)' : 'var(--G2)', fontWeight: 500, lineHeight: 1.65, marginTop: 8 }}>{impact}</p>
                </div>
            </div>
        </div>
    );
};

/* ─── Impact metrics row ───────────────────────────────────── */
const ImpactRow = ({ metrics, dark = false }) => (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${metrics.length},1fr)`, gap: 0, borderRadius: 16, overflow: 'hidden', border: dark ? '1px solid rgba(255,255,255,.1)' : '1px solid var(--BD2)' }}>
        {metrics.map((m, i) => (
            <div key={m.label} style={{ padding: 'clamp(20px,3vw,32px) clamp(16px,2.5vw,24px)', borderRight: i < metrics.length - 1 ? `1px solid ${dark ? 'rgba(255,255,255,.08)' : 'var(--BD2)'}` : 'none', background: dark ? 'rgba(255,255,255,.03)' : '#fff', textAlign: 'center' }}>
                <div className="impact-num" style={{ color: dark ? '#fff' : 'var(--G)' }}>{m.v}</div>
                <div style={{ fontSize: 11.5, color: dark ? 'rgba(255,255,255,.48)' : 'var(--TL)', fontWeight: 400, marginTop: 8, lineHeight: 1.5 }}>{m.label}</div>
                {m.note && <div style={{ fontSize: 10, color: dark ? 'var(--MT3)' : 'var(--G2)', fontWeight: 600, marginTop: 5, letterSpacing: '.04em' }}>{m.note}</div>}
            </div>
        ))}
    </div>
);

/* ─── Module header ────────────────────────────────────────── */
const ModuleHeader = ({ num, cap, title, vision, dark = false }) => (
    <div style={{ marginBottom: 56 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(52px,7vw,80px)', fontWeight: 300, color: dark ? 'rgba(255,255,255,.12)' : 'rgba(30,61,48,.1)', lineHeight: 1, letterSpacing: '-0.04em', userSelect: 'none' }}>{num}</span>
            <div>
                <p className="scaps" style={{ color: dark ? 'var(--MT3)' : 'var(--TL)', marginBottom: 6 }}>{cap}</p>
                <h2 className="serif" style={{ fontSize: 'clamp(26px,3.8vw,50px)', fontWeight: 400, color: dark ? '#fff' : 'var(--TX)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>{title}</h2>
            </div>
        </div>
        {/* Vision statement strip */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: 'clamp(16px,2vw,24px)', borderRadius: 12, background: dark ? 'rgba(168,213,188,.08)' : 'var(--MT2)', border: dark ? '1px solid rgba(168,213,188,.2)' : '1px solid var(--MT)' }}>
            <div style={{ width: 3, minHeight: 44, borderRadius: 99, background: dark ? 'var(--MT3)' : 'var(--G)', flexShrink: 0 }} />
            <div>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: dark ? 'rgba(168,213,188,.6)' : 'var(--TL)', marginBottom: 7, fontFamily: "'DM Sans',sans-serif" }}>The Vision</p>
                <p className="serif" style={{ fontSize: 'clamp(15px,1.8vw,20px)', fontStyle: 'italic', color: dark ? 'rgba(255,255,255,.8)' : 'var(--G)', fontWeight: 400, lineHeight: 1.65 }}>{vision}</p>
            </div>
        </div>
    </div>
);

/* ══════════════════════════════════════════════════════════════
   §1  HERO
══════════════════════════════════════════════════════════════ */
const Hero = () => (
    <section className="stex" style={{ background: 'var(--G)', minHeight: '78vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden', paddingTop: 'clamp(100px,12vw,140px)', paddingBottom: 'clamp(64px,8vw,96px)' }}>
        {/* Orbs */}
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 'clamp(280px,44vw,580px)', aspectRatio: '1', borderRadius: '50%', background: 'radial-gradient(circle,rgba(214,235,226,.09) 0%,transparent 68%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-12%', left: '-4%', width: 'clamp(200px,32vw,420px)', aspectRatio: '1', borderRadius: '50%', background: 'radial-gradient(circle,rgba(71,117,104,.18) 0%,transparent 64%)', pointerEvents: 'none' }} />

        <W>
            <div className="s2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px,6vw,88px)', alignItems: 'center' }}>

                {/* Left */}
                <div>
                    <motion.p className="scaps" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, delay: .06 }}
                        style={{ color: 'var(--MT3)', marginBottom: 24 }}>
                        Services · Altura Health Strategies
                    </motion.p>

                    <motion.h1 className="serif" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: .14 }}
                        style={{ fontSize: 'clamp(38px,5.8vw,76px)', fontWeight: 400, color: '#fff', lineHeight: 1.05, letterSpacing: '-0.022em', marginBottom: 28 }}>
                        Strategic Solutions for
                        <em style={{ display: 'block', color: 'var(--MT3)' }}> Complex Health Challenges.</em>
                    </motion.h1>

                    <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, ease: EASE, delay: .28 }}
                        style={{ fontSize: 'clamp(15px,1.6vw,17.5px)', fontWeight: 300, color: 'rgba(255,255,255,.6)', lineHeight: 1.88, marginBottom: 44, maxWidth: 500 }}>
                        Five integrated service modules — each designed to translate evidence into action at the policy, system, and community level. Delivered by a Cuban-trained Valedictorian with over a decade inside Kenya's health architecture.
                    </motion.p>

                    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, ease: EASE, delay: .4 }}
                        style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                        <Btn v="gold" href="#services">Explore all modules <ChevronDown size={13} strokeWidth={2} /></Btn>
                        <Btn v="ow" href="/contact">Request a consultation <ArrowRight size={13} strokeWidth={2} /></Btn>
                    </motion.div>
                </div>

                {/* Right — service module cards preview */}
                <motion.div className="smob-hide" initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: EASE, delay: .22 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {[
                        { n: '01', t: 'Health Strategy, Policy & Governance', icon: <FileText size={14} strokeWidth={1.8} /> },
                        { n: '02', t: 'Primary Health Care & Systems Strengthening', icon: <Activity size={14} strokeWidth={1.8} /> },
                        { n: '03', t: 'Public Health Training & Capacity Building', icon: <GraduationCap size={14} strokeWidth={1.8} /> },
                        { n: '04', t: 'Health Tech, Medical Products & Linkages', icon: <Cpu size={14} strokeWidth={1.8} /> },
                        { n: '05', t: 'Nutrition & Corporate Wellness Solutions', icon: <Leaf size={14} strokeWidth={1.8} /> },
                    ].map((s, i) => (
                        <motion.div key={s.n} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .5, ease: EASE, delay: .38 + i * .07 }}>
                            <a href={`#module-${s.n}`} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', borderRadius: 12, background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', transition: 'background .22s, border-color .22s', backdropFilter: 'blur(8px)' }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(214,235,226,.12)'; e.currentTarget.style.borderColor = 'rgba(214,235,226,.28)'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.1)'; }}>
                                <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,.3)', letterSpacing: '.08em', minWidth: 22 }}>{s.n}</span>
                                <span style={{ color: 'var(--MT3)', flexShrink: 0 }}>{s.icon}</span>
                                <span style={{ fontSize: 13, fontWeight: 400, color: 'rgba(255,255,255,.72)', flex: 1 }}>{s.t}</span>
                                <ChevronRight size={13} strokeWidth={1.8} color="rgba(255,255,255,.3)" />
                            </a>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </W>
    </section>
);

/* ══════════════════════════════════════════════════════════════
   §2  STICKY SERVICE NAVIGATOR
══════════════════════════════════════════════════════════════ */
const ServiceNav = ({ active }) => {
    const modules = [
        { id: 'module-01', short: 'Health Strategy' },
        { id: 'module-02', short: 'PHC & Systems' },
        { id: 'module-03', short: 'Training & Capacity' },
        { id: 'module-04', short: 'Health Tech' },
        { id: 'module-05', short: 'Nutrition & Wellness' },
    ];

    return (
        <nav className="snav-bar" id="services" aria-label="Service modules navigation">
            <div className="snav-scroll">
                {modules.map((m, i) => (
                    <a key={m.id} href={`#${m.id}`}
                        className={`snav-pill ${active === i ? 'active' : ''}`}
                        style={{ padding: '8px 18px', borderRadius: 99, fontSize: 12, fontWeight: 600, letterSpacing: '.03em', color: active === i ? '#fff' : 'var(--TM)', background: active === i ? 'var(--G)' : 'transparent', fontFamily: "'DM Sans',sans-serif" }}>
                        <span style={{ opacity: .5, marginRight: 6, fontSize: 10 }}>{String(i + 1).padStart(2, '0')}</span>
                        {m.short}
                    </a>
                ))}
                <div style={{ flexGrow: 1 }} />
                <Btn v="green" href="/contact" sx={{ padding: '7px 18px', fontSize: 12 }}>
                    Get a proposal <ArrowRight size={11} strokeWidth={2.5} />
                </Btn>
            </div>
        </nav>
    );
};

/* ══════════════════════════════════════════════════════════════
   §3  MODULE 01 — Health Strategy, Policy & Governance
   BG: light cream  |  tone: authoritative
══════════════════════════════════════════════════════════════ */
const Module01 = () => (
    <section id="module-01" className="s-light" style={{ padding: 'clamp(72px,10vw,120px) 0' }}>
        <W>
            <R>
                <ModuleHeader
                    num="01"
                    cap="Health Strategy, Policy & Governance"
                    title="From legislation to facility-level execution."
                    vision="Bridging the gap between Kenya's landmark legislative reforms and the operational realities of county health systems — ensuring no policy is left unimplemented."
                    dark={false}
                />
            </R>

            {/* Offering cards */}
            <div className="s3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, marginBottom: 48 }}>
                <R d={.05}>
                    <OfferCard
                        icon={<FileText size={20} strokeWidth={1.5} />}
                        title="UHC Roadmap Integration"
                        problem="Most county health departments lack the technical capacity to operationalise the Kenya UHC Acts (2023), creating dangerous implementation gaps at facility level."
                        solution="Expert-led sensitisation workshops for county executives, CHMTs, and health workers — translating legislative mandates into actionable operational frameworks and compliance checklists."
                        impact="3 counties successfully sensitised on UHC Acts post-assent, October 2023. Full CHMT alignment achieved within 90 days of engagement."
                        dark={false}
                    />
                </R>
                <R d={.1}>
                    <OfferCard
                        icon={<BarChart3 size={20} strokeWidth={1.5} />}
                        title="Strategic Investment Planning"
                        problem="CIDPs, AWPs, and Sector Investment Plans are often developed without rigorous situational analysis — resulting in misaligned priorities and wasted fiscal allocations."
                        solution="End-to-end development of County Integrated Development Plans, Annual Work Plans, and Sector Strategic Investment Plans grounded in quantitative situational analysis and cross-departmental alignment."
                        impact="Directly led annual work plan preparation for PHC and Family Health in Nairobi City County. Plans adopted county-wide and used as templates in 2 neighbouring counties."
                        dark={false}
                    />
                </R>
                <R d={.15}>
                    <OfferCard
                        icon={<Network size={20} strokeWidth={1.5} />}
                        title="Governance & MOU Design"
                        problem="Weak implementing partner agreements and poorly structured health sector MOUs create accountability gaps, duplicated programmes, and under-resourced communities."
                        solution="Technical oversight and drafting support for health implementing partner agreements, MOU reviews, and sector-specific governance frameworks — drawing on MOU Review Committee experience in Nairobi's Health Sector."
                        impact="Participated in review of MOUs for all health implementing partners across Nairobi City County's health sector, ensuring policy alignment and partner accountability."
                        dark={false}
                    />
                </R>
            </div>

            {/* Impact metrics */}
            <R d={.2}>
                <ImpactRow metrics={[
                    { v: '3+', label: 'Counties Sensitised on UHC Acts', note: 'Nairobi · Kirinyaga · Machakos' },
                    { v: '100%', label: 'CHMT Alignment Rate Post-Engagement', note: 'Verified via follow-up assessment' },
                    { v: '2023', label: 'Year of Kenya UHC Acts — Altura present', note: 'October assent sensitisation' },
                    { v: '5+', label: 'Major Health MOUs Reviewed', note: 'Nairobi Health Sector' },
                ]} dark={false} />
            </R>

            <R d={.25} style={{ marginTop: 36, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Btn v="green" href="/contact">Commission a Policy Engagement <ArrowRight size={13} strokeWidth={2} /></Btn>
                <Btn v="outline" href="/contact">Book a strategy call</Btn>
            </R>
        </W>
    </section>
);

/* ══════════════════════════════════════════════════════════════
   §4  MODULE 02 — PHC & Systems Strengthening
   BG: dark forest  |  tone: systems-builder
══════════════════════════════════════════════════════════════ */
const Module02 = () => (
    <section id="module-02" className="s-dark" style={{ padding: 'clamp(72px,10vw,120px) 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-8%', right: '-4%', width: 'clamp(220px,36vw,480px)', aspectRatio: '1', borderRadius: '50%', background: 'radial-gradient(circle,rgba(214,235,226,.07) 0%,transparent 68%)', pointerEvents: 'none' }} />

        <W>
            <R>
                <ModuleHeader
                    num="02"
                    cap="Primary Health Care & Systems Strengthening"
                    title="Resilient networks. Integrated care. Measurable coverage."
                    vision="Building PHC networks that don't just function on paper — but withstand public health emergencies, demographic pressures, and under-resourced operational environments."
                    dark={true}
                />
            </R>

            <div className="s3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, marginBottom: 48 }}>
                <R d={.05}>
                    <OfferCard
                        icon={<Layers size={20} strokeWidth={1.5} />}
                        title="PCN Architecture & Operationalisation"
                        problem="Primary Care Networks exist as concepts in many counties but remain unoperationalised — leaving communities without integrated, last-mile care infrastructure."
                        solution="End-to-end PCN design: baseline assessment, multidisciplinary team training, home-based care protocols, eCHIS integration, and post-launch operationalisation oversight. Certified National Master Trainer (TOT) in PHC/PCN."
                        impact="Established functional PHC Networks across Nairobi, Kirinyaga, and Machakos Counties. Networks sustained beyond initial engagement with documented community health delivery outcomes."
                        dark={true}
                    />
                </R>
                <R d={.1}>
                    <OfferCard
                        icon={<Database size={20} strokeWidth={1.5} />}
                        title="Baseline & Performance Analytics"
                        problem="County health programmes frequently launch without validated baselines, making performance measurement impossible and donor accountability difficult."
                        solution="Rigorous situational analysis, readiness assessments, and monitoring framework development — integrated with sub-county M&E officers, county health records systems, and NGO/UN development partner benchmarks."
                        impact="Led health data situational analysis for Nairobi's PHC and Family Health (RMNCAH) divisions. Outputs directly informed the county's CIDP and sector strategic investment plan."
                        dark={true}
                    />
                </R>
                <R d={.15}>
                    <OfferCard
                        icon={<Heart size={20} strokeWidth={1.5} />}
                        title="RMNCAH Integration"
                        problem="Maternal, neonatal, child, and adolescent health outcomes remain poor when RMNCAH programmes are managed in silos, disconnected from the primary care system."
                        solution="Strategic integration of RMNCAH programming into PHC network design — including family planning, antenatal and postnatal care protocols, GBV referral pathways, and adolescent health frameworks coordinated with UNFPA, WHO, and county FH Divisions."
                        impact="Oversaw a full RMNCAH team (pharmacists, FH nurses, Neonatal/Child/Adolescent/PCN/GBV officers) delivering outcomes across vulnerable populations in Nairobi County."
                        dark={true}
                    />
                </R>
            </div>

            <R d={.2}>
                <ImpactRow metrics={[
                    { v: '3', label: 'PHC Networks Established', note: 'Nairobi · Kirinyaga · Machakos' },
                    { v: '300+', label: 'Healthcare Workers Trained in EmNOC', note: 'Plus modern contraception' },
                    { v: '100%', label: 'PCN-to-eCHIS Integration Rate', note: 'Digital health systems embedded' },
                    { v: '12', label: 'Programme Areas Under RMNCAH Oversight', note: 'Neonatal · Adolescent · GBV · FP' },
                ]} dark={true} />
            </R>

            <R d={.25} style={{ marginTop: 36, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Btn v="cream" href="/contact">Design a PHC Network <ArrowRight size={13} strokeWidth={2} /></Btn>
                <Btn v="ow" href="/contact">Request a baseline assessment</Btn>
            </R>
        </W>
    </section>
);

/* ══════════════════════════════════════════════════════════════
   §5  MODULE 03 — Training & Capacity Building
   BG: light cream2  |  tone: educator-leader
══════════════════════════════════════════════════════════════ */
const Module03 = () => (
    <section id="module-03" className="s-light2" style={{ padding: 'clamp(72px,10vw,120px) 0' }}>
        <W>
            <R>
                <ModuleHeader
                    num="03"
                    cap="Public Health Training & Capacity Building"
                    title="Scaling clinical excellence through structured knowledge transfer."
                    vision="Moving beyond one-time workshops to create a self-sustaining ecosystem of Master Trainers — where clinical excellence becomes institutional memory, not individual knowledge."
                    dark={false}
                />
            </R>

            <div className="s3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, marginBottom: 48 }}>
                <R d={.05}>
                    <OfferCard
                        icon={<Stethoscope size={20} strokeWidth={1.5} />}
                        title="Specialised Clinical Workshops"
                        problem="Emergency Obstetric and Neonatal Care (EmNOC) deficiencies contribute to preventable maternal and neonatal deaths — particularly in under-resourced county facilities."
                        solution="Certified, structured clinical training in EmNOC, modern contraceptive methods, and Diabetes Mellitus management — delivered by a TOT-certified Master Trainer with clinical experience across Nairobi public facilities."
                        impact="Trained 300+ healthcare workers in EmNOC and modern contraception across Nairobi City County. Training frameworks adopted as part of the county annual health work plan."
                        dark={false}
                    />
                </R>
                <R d={.1}>
                    <OfferCard
                        icon={<CheckSquare size={20} strokeWidth={1.5} />}
                        title="KQMH & Quality Assurance"
                        problem="Many health facilities operate without standardised quality frameworks, leading to inconsistent patient outcomes, poor accreditation readiness, and limited accountability."
                        solution="Implementation of the Kenya Quality Model for Health (KQMH) — the national benchmark for facility performance standardisation. Delivered by an MOH-certified KQMH Trainer of Trainers (2024), ensuring institutional embedding rather than surface-level compliance."
                        impact="KQMH TOT certification from MOH Kenya (2024). Direct facility-level rollout supported across Nairobi's health department, with measurable improvement in quality indicator scores."
                        dark={false}
                    />
                </R>
                <R d={.15}>
                    <OfferCard
                        icon={<Cpu size={20} strokeWidth={1.5} />}
                        title="eCHIS & Digital Health Literacy"
                        problem="The rollout of electronic Community Health Information Systems (eCHIS) is often undermined by inadequate training — limiting data quality, usage, and community health delivery outcomes."
                        solution="Structured multidisciplinary capacity building for PHC teams on eCHIS platforms — integrating data collection, reporting workflows, and community health worker digital competency development as part of PCN operationalisation."
                        impact="eCHIS training embedded within all three PHC Network rollouts. County health data quality improved as measured by HMIS reporting completeness post-training."
                        dark={false}
                    />
                </R>
            </div>

            {/* Featured CME highlight */}
            <R d={.18}>
                <div style={{ borderRadius: 18, overflow: 'hidden', border: '1px solid var(--BD2)', marginBottom: 40 }}>
                    <div style={{ background: 'var(--G)', padding: 'clamp(20px,3vw,32px)', display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, alignItems: 'center' }} className="s2col">
                        <div>
                            <p className="scaps" style={{ color: 'var(--MT3)', marginBottom: 10 }}>Continuing Medical Education (CME)</p>
                            <h3 className="serif" style={{ fontSize: 'clamp(18px,2.2vw,26px)', color: '#fff', fontWeight: 400, lineHeight: 1.25 }}>Altura delivers structured CME programmes for hospital staff, county health departments, and NGO health teams — advancing both clinical practice and public health policy literacy.</h3>
                        </div>
                        <div style={{ flexShrink: 0 }}>
                            <Btn v="cream" href="/contact">Enquire about CME <ArrowRight size={13} strokeWidth={2} /></Btn>
                        </div>
                    </div>
                </div>
            </R>

            <R d={.22}>
                <ImpactRow metrics={[
                    { v: '300+', label: 'Clinicians Trained (EmNOC)', note: 'Nairobi City County' },
                    { v: 'TOT', label: 'KQMH Certification Level', note: 'MOH Kenya · 2024' },
                    { v: 'TOT', label: 'PHC/PCN Master Trainer Status', note: 'MOH Kenya · 2023' },
                    { v: '3', label: 'Digital Health Systems Integrated', note: 'eCHIS across PCN rollouts' },
                ]} dark={false} />
            </R>

            <R d={.27} style={{ marginTop: 36, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Btn v="green" href="/contact">Design a Training Programme <ArrowRight size={13} strokeWidth={2} /></Btn>
                <Btn v="outline" href="/contact">Download training catalogue</Btn>
            </R>
        </W>
    </section>
);

/* ══════════════════════════════════════════════════════════════
   §6  MODULE 04 — Health Tech, Medical Products & Linkages
   BG: deep teal  |  tone: catalyst-innovator
══════════════════════════════════════════════════════════════ */
const Module04 = () => (
    <section id="module-04" style={{
        padding: 'clamp(72px,10vw,120px) 0',
        position: 'relative', overflow: 'hidden',
        background: 'var(--CR2)',
    }}>
        {/* Subtle decorative orbs */}
        <div style={{ position: 'absolute', bottom: '-8%', right: '-4%', width: 'clamp(200px,32vw,420px)', aspectRatio: '1', borderRadius: '50%', background: 'radial-gradient(circle,rgba(30,61,48,.07) 0%,transparent 64%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '-6%', left: '-3%', width: 'clamp(160px,24vw,340px)', aspectRatio: '1', borderRadius: '50%', background: 'radial-gradient(circle,rgba(30,61,48,.04) 0%,transparent 64%)', pointerEvents: 'none' }} />

        <W>
            <R>
                <ModuleHeader
                    num="04"
                    cap="Health Tech, Medical Products & Linkages"
                    title="Catalysing medical innovation across the care continuum."
                    vision="Acting as a strategic catalyst — connecting health technology, supply chain intelligence, and multi-stakeholder partnerships to close the gap between medical innovation and community-level care delivery."
                    dark={false}
                />
            </R>

            {/* Offer cards — dark={false} = dark text on white cards */}
            <div className="s3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, marginBottom: 48 }}>
                <R d={.05}>
                    <OfferCard
                        icon={<Microscope size={20} strokeWidth={1.5} />}
                        title="Medical Technology Advisory"
                        problem="Many county health programmes adopt new medical technologies without adequate integration planning — creating operational bottlenecks, staff resistance, and poor patient uptake."
                        solution="Strategic advisory on medical products procurement, technology assessment, and phased integration into existing service delivery models — drawing on real-world experience deploying health technologies within Nairobi's PHC system."
                        impact="Guided health technology integration across Nairobi's PCN infrastructure, including diagnostic tools and digital platforms aligned with national eCHIS architecture."
                        dark={false}
                    />
                </R>
                <R d={.1}>
                    <OfferCard
                        icon={<Link size={20} strokeWidth={1.5} />}
                        title="Strategic Stakeholder Linkages"
                        problem="NGOs, UN agencies, and county governments operate in parallel tracks — creating duplicated efforts, missed co-funding opportunities, and fragmented service delivery."
                        solution="High-value partnership facilitation between UN agencies (UNICEF, UNFPA, WHO), USAID-funded programmes (Fahari ya Jamii), CDC/PEPFAR partners (CIHEB), and both county and national governments — leveraging an established network built across senior government roles."
                        impact="Active partnerships built and sustained with UNICEF, UNFPA, WHO, USAID Fahari ya Jamii, and CDC/CIHEB as Divisional Lead for PHC and Family Health, Nairobi City County."
                        dark={false}
                    />
                </R>
                <R d={.15}>
                    <OfferCard
                        icon={<Briefcase size={20} strokeWidth={1.5} />}
                        title="Supply Chain & Facility Operations"
                        problem="Medical facility operations are often inefficient due to poor supply chain design, unclear inventory protocols, and weak pharmaceutical programme management at county level."
                        solution="Operational consulting on medical facility logistics, pharmaceutical program management, and supply chain resilience — including procurement strategy, stockout prevention frameworks, and facility operations benchmarking."
                        impact="Applied facility operations expertise across multiple Nairobi outpatient and family medicine departments, reducing supply chain inefficiencies and improving service continuity metrics."
                        dark={false}
                    />
                </R>
            </div>

            {/* Partner network — dark text on white card */}
            <R d={.18}>
                <div style={{
                    background: '#fff',
                    border: '1px solid var(--BD2)',
                    borderRadius: 16,
                    padding: 'clamp(20px,3vw,32px)',
                    marginBottom: 40,
                    boxShadow: '0 2px 16px rgba(26,46,36,.06)',
                }}>
                    <p className="scaps" style={{ color: 'var(--TL)', marginBottom: 18 }}>Active Partner Network</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                        {['UNICEF', 'UNFPA', 'WHO', 'USAID Fahari ya Jamii', 'CDC / PEPFAR', 'CIHEB', 'Kenya MOH', 'Nairobi City County', 'AMREF', 'Kenya Red Cross'].map(p => (
                            <span key={p} style={{
                                fontSize: 11, fontWeight: 600,
                                color: 'var(--TM)',
                                letterSpacing: '.06em',
                                padding: '6px 14px', borderRadius: 99,
                                border: '1px solid var(--BD2)',
                                background: 'var(--MT2)',
                                transition: 'all .22s', cursor: 'default',
                            }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = 'var(--MT)';
                                    e.currentTarget.style.borderColor = 'var(--G2)';
                                    e.currentTarget.style.color = 'var(--G)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.background = 'var(--MT2)';
                                    e.currentTarget.style.borderColor = 'var(--BD2)';
                                    e.currentTarget.style.color = 'var(--TM)';
                                }}>
                                {p}
                            </span>
                        ))}
                    </div>
                </div>
            </R>

            {/* Impact metrics — dark text */}
            <R d={.22}>
                <ImpactRow metrics={[
                    { v: '10+', label: 'Strategic Partnerships Facilitated', note: 'UN · USAID · CDC · County Gov' },
                    { v: '3', label: 'Health Technologies Integrated', note: 'Across PCN rollouts' },
                    { v: '100%', label: 'Partner Alignment Rate (MOU review)', note: 'Nairobi Health Sector' },
                    { v: '2+', label: 'Pharmaceutical Programmes Optimised', note: 'Outpatient & community levels' },
                ]} dark={false} />
            </R>

            <R d={.27} style={{ marginTop: 36, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Btn v="green" href="/contact">Facilitate a Partnership <ArrowRight size={13} strokeWidth={2} /></Btn>
                <Btn v="outline" href="/contact">Technology advisory enquiry</Btn>
            </R>
        </W>
    </section>
);

/* ══════════════════════════════════════════════════════════════
   §7  MODULE 05 — Nutrition & Corporate Wellness
   BG: light cream  |  tone: proactive-preventive
══════════════════════════════════════════════════════════════ */
const Module05 = () => (
    <section id="module-05" className="s-light" style={{ padding: 'clamp(72px,10vw,120px) 0' }}>
        <W>
            <R>
                <ModuleHeader
                    num="05"
                    cap="Nutrition & Corporate Wellness Solutions"
                    title="Proactive health promotion that prevents rather than treats."
                    vision="Shifting the health system's economic burden from reactive treatment to proactive prevention — by embedding nutrition, NCD management, and wellness culture at both community and organisational levels."
                    dark={false}
                />
            </R>

            <div className="s3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, marginBottom: 48 }}>
                <R d={.05}>
                    <OfferCard
                        icon={<Leaf size={20} strokeWidth={1.5} />}
                        title="Nutrition Consulting"
                        problem="Malnutrition and micronutrient deficiency among mothers and children remain primary drivers of preventable illness and developmental delay in Kenya's urban and peri-urban communities."
                        solution="Specialist-led nutrition guidance for community health programmes — covering maternal nutrition during pregnancy, infant and young child feeding (IYCF) protocols, and integration of nutrition counselling into PHC and antenatal services."
                        impact="Nutrition guidelines integrated into antenatal and postnatal care delivery at Mama Lucy Kibaki Hospital and across Nairobi's PHC networks, reaching thousands of mothers annually."
                        dark={false}
                    />
                </R>
                <R d={.1}>
                    <OfferCard
                        icon={<Building2 size={20} strokeWidth={1.5} />}
                        title="Corporate Health Strategy"
                        problem="Kenya's workforce is increasingly burdened by NCDs — hypertension and diabetes in particular — resulting in lost productivity, rising insurance costs, and talent attrition, especially in sedentary corporate environments."
                        solution="Bespoke corporate wellness frameworks covering NCD risk profiling, hypertension and diabetes prevention protocols, mental wellbeing policy design, and employee health awareness campaigns — co-developed with HR and executive leadership teams."
                        impact="Applied NCD management expertise honed through clinical practice managing hypertension and diabetes at community and household levels, translated into corporate prevention programming."
                        dark={false}
                    />
                </R>
                <R d={.15}>
                    <OfferCard
                        icon={<Shield size={20} strokeWidth={1.5} />}
                        title="Community & Gender-Based Advocacy"
                        problem="GBV prevention and sexual and reproductive health (SRH) awareness remain systematically underfunded and poorly integrated into both community health and corporate social responsibility programmes."
                        solution="Design and delivery of GBV prevention frameworks, SRH awareness programmes, and community advocacy campaigns — integrating adolescent health priorities, family planning literacy, and referral pathway development into both corporate and community pillars."
                        impact="Led GBV and SRH programming as Divisional Head for Family Health, Nairobi City County — coordinating with UNFPA-supported family planning programmes and covering all age groups from adolescents to women of reproductive age."
                        dark={false}
                    />
                </R>
            </div>

            {/* NCD stats callout */}
            <R d={.18}>
                <div style={{ borderRadius: 18, background: 'linear-gradient(135deg,var(--TC1) 0%,var(--TC2) 100%)', padding: 'clamp(24px,3.5vw,40px)', marginBottom: 40, position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 20% 50%,rgba(255,255,255,.07) 0%,transparent 60%)', pointerEvents: 'none' }} />
                    <div className="s2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'center', position: 'relative' }}>
                        <div>
                            <p className="scaps" style={{ color: 'rgba(255,255,255,.55)', marginBottom: 12 }}>The NCD Burden in Kenya</p>
                            <h3 className="serif" style={{ fontSize: 'clamp(18px,2.4vw,30px)', color: '#fff', fontWeight: 400, lineHeight: 1.3 }}>
                                Non-communicable diseases now account for over 27% of all deaths in Kenya. Prevention is not optional — it's strategic infrastructure.
                            </h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {[
                                ['27%', 'of Kenyan deaths attributable to NCDs'],
                                ['Hypertension & Diabetes', 'leading NCD drivers in corporate Kenya'],
                                ['GBV affects 1 in 3', 'Kenyan women — SRH integration is critical'],
                            ].map(([v, l]) => (
                                <div key={v} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                                    <CheckCircle size={14} strokeWidth={1.8} color="rgba(255,255,255,.7)" style={{ marginTop: 2, flexShrink: 0 }} />
                                    <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,.78)', lineHeight: 1.65, fontWeight: 300 }}>
                                        <strong style={{ fontWeight: 600, color: '#fff' }}>{v}</strong> — {l}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </R>

            <R d={.22}>
                <ImpactRow metrics={[
                    { v: '1,000s', label: 'Mothers Reached via Nutrition Protocols', note: 'Nairobi PHC Networks' },
                    { v: '3+', label: 'Community Health Talks per Quarter', note: 'Schools · Churches · Community' },
                    { v: '100%', label: 'GBV Referral Pathway Coverage', note: 'Nairobi Family Health Division' },
                    { v: 'Full', label: 'SRH Spectrum Covered', note: 'Adolescent · Reproductive · Maternal' },
                ]} dark={false} />
            </R>

            <R d={.27} style={{ marginTop: 36, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Btn v="green" href="/contact">Design a Wellness Programme <ArrowRight size={13} strokeWidth={2} /></Btn>
                <Btn v="outline" href="/contact">Community advocacy enquiry</Btn>
            </R>
        </W>
    </section>
);

/* ══════════════════════════════════════════════════════════════
   §8  TICKER
══════════════════════════════════════════════════════════════ */
const Ticker = () => {
    const words = ['UHC ROADMAP INTEGRATION', '✦', 'PCN ARCHITECTURE', '✦', 'EmNOC TRAINING', '✦', 'KQMH QUALITY ASSURANCE', '✦', 'HEALTH TECH ADVISORY', '✦', 'RMNCAH INTEGRATION', '✦', 'NUTRITION CONSULTING', '✦', 'MOU GOVERNANCE', '✦', 'eCHIS CAPACITY BUILDING', '✦', 'CORPORATE WELLNESS', '✦'];
    const all = [...words, ...words];
    return (
        <div style={{ background: 'var(--G3)', overflow: 'hidden', padding: '16px 0', borderTop: '1px solid rgba(255,255,255,.06)', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
            <div className="sticker-track">
                {all.map((w, i) => (
                    <span key={i} style={{ whiteSpace: 'nowrap', padding: '0 clamp(12px,2vw,20px)', fontSize: 10, fontWeight: 700, letterSpacing: '.2em', color: w === '✦' ? 'var(--MT)' : 'rgba(255,255,255,.3)' }}>{w}</span>
                ))}
            </div>
        </div>
    );
};

/* ══════════════════════════════════════════════════════════════
   §9  CROSS-MODULE DIFFERENTIATORS
══════════════════════════════════════════════════════════════ */
const Differentiators = () => {
    const items = [
        { icon: <Award size={22} strokeWidth={1.5} />, title: 'Cuba-Trained Valedictorian', body: 'MMed Family Medicine from Universidad de Ciencias Médicas de La Habana — graduating top of class. Clinical precision meets policy architecture.' },
        { icon: <Building2 size={22} strokeWidth={1.5} />, title: 'Government from the Inside', body: 'Former Head of both PHC and Family Health Divisions, Nairobi City County. We don\'t advise governments — we have been government.' },
        { icon: <Globe size={22} strokeWidth={1.5} />, title: 'Pan-African Network Reach', body: 'Active partnerships with UNICEF, UNFPA, WHO, USAID, and CDC/PEPFAR across 10+ African countries. Your strategy connects to a continent-wide intelligence grid.' },
        { icon: <Target size={22} strokeWidth={1.5} />, title: 'KPI-First Delivery Model', body: 'Every engagement begins with a measurable outcome framework. We report on impact, not activity — and our clients hold us to it.' },
        { icon: <Zap size={22} strokeWidth={1.5} />, title: 'Implementation Ready', body: 'No handoff without follow-through. Altura embeds in delivery, trains teams, and monitors outcomes — ensuring strategies survive first contact with reality.' },
        { icon: <Star size={22} strokeWidth={1.5} />, title: 'Scientific Committee Experience', body: 'Member of the inaugural Nairobi Health Scientific Committee and abstract reviewer for the WONCA Kenya Conference — research integrity at the core.' },
    ];

    return (
        <section className="s-dark2" style={{ padding: 'clamp(72px,10vw,120px) 0', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 800, height: 800, borderRadius: '50%', background: 'radial-gradient(circle,rgba(214,235,226,.04) 0%,transparent 65%)', pointerEvents: 'none' }} />
            <W>
                <R style={{ textAlign: 'center', marginBottom: 64 }}>
                    <p className="scaps" style={{ color: 'var(--MT3)', marginBottom: 16 }}>Why Altura?</p>
                    <h2 className="serif" style={{ fontSize: 'clamp(28px,4.2vw,54px)', fontWeight: 400, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                        Six reasons we deliver
                        <em style={{ color: 'var(--MT3)' }}> where others advise.</em>
                    </h2>
                </R>

                <div className="s3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
                    {items.map((it, i) => (
                        <R key={it.title} d={i * .07}>
                            <div style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.09)', borderRadius: 18, padding: 'clamp(22px,2.8vw,36px)', display: 'flex', flexDirection: 'column', gap: 16, height: '100%', backdropFilter: 'blur(10px)', transition: 'background .25s, border-color .25s', cursor: 'default' }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(168,213,188,.08)'; e.currentTarget.style.borderColor = 'rgba(168,213,188,.22)'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.09)'; }}>
                                <div style={{ width: 46, height: 46, borderRadius: 13, background: 'rgba(168,213,188,.12)', border: '1px solid rgba(168,213,188,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--MT3)' }}>
                                    {it.icon}
                                </div>
                                <h3 className="serif" style={{ fontSize: 'clamp(17px,1.9vw,22px)', fontWeight: 500, color: '#fff', lineHeight: 1.25 }}>{it.title}</h3>
                                <p style={{ fontSize: 14, color: 'rgba(255,255,255,.52)', fontWeight: 300, lineHeight: 1.82 }}>{it.body}</p>
                            </div>
                        </R>
                    ))}
                </div>
            </W>
        </section>
    );
};

/* ══════════════════════════════════════════════════════════════
   §10  PROCESS — How We Engage
══════════════════════════════════════════════════════════════ */
const Process = () => {
    const steps = [
        { n: '01', title: 'Discovery & Context Mapping', body: 'We begin with a deep-dive into your organisation\'s health mandate, current gaps, partner landscape, and strategic priorities — no assumptions, no templates.' },
        { n: '02', title: 'Situational Analysis & Baseline', body: 'Quantitative and qualitative assessment of your system\'s readiness, performance indicators, and stakeholder alignment using proven M&E frameworks.' },
        { n: '03', title: 'Strategy Design & Co-Creation', body: 'Evidence-informed strategy development — collaboratively built with your team so implementation ownership is embedded from the start, not retrofitted.' },
        { n: '04', title: 'Implementation & Capacity Transfer', body: 'We don\'t hand off documents. We embed in implementation, train your teams, and monitor progress through agreed KPI frameworks.' },
        { n: '05', title: 'Impact Measurement & Reporting', body: 'Structured outcome reporting tied to pre-agreed metrics. Every engagement closes with a documented impact scorecard — and lessons that outlast the contract.' },
    ];

    return (
        <section className="s-light2" style={{ padding: 'clamp(72px,10vw,120px) 0' }}>
            <W>
                <R style={{ textAlign: 'center', marginBottom: 64 }}>
                    <p className="scaps" style={{ color: 'var(--TL)', marginBottom: 16 }}>Engagement Model</p>
                    <h2 className="serif" style={{ fontSize: 'clamp(28px,4vw,52px)', fontWeight: 400, color: 'var(--TX)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                        How we engage — from
                        <em style={{ color: 'var(--G)' }}> discovery to impact.</em>
                    </h2>
                </R>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                    {steps.map((s, i) => (
                        <R key={s.n} d={i * .07}>
                            <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 24, padding: 'clamp(20px,2.5vw,32px) 0', borderBottom: i < steps.length - 1 ? '1px solid var(--BD2)' : 'none', alignItems: 'flex-start' }}>
                                {/* Number + line */}
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
                                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: i === 0 ? 'var(--G)' : 'var(--MT2)', border: i === 0 ? 'none' : '1px solid var(--MT)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <span style={{ fontSize: 12, fontWeight: 700, color: i === 0 ? '#fff' : 'var(--G)', letterSpacing: '.06em', fontFamily: "'DM Sans',sans-serif" }}>{s.n}</span>
                                    </div>
                                </div>
                                {/* Content */}
                                <div style={{ paddingTop: 10 }}>
                                    <h3 className="serif" style={{ fontSize: 'clamp(17px,2vw,24px)', fontWeight: 500, color: 'var(--TX)', marginBottom: 10, lineHeight: 1.25 }}>{s.title}</h3>
                                    <p style={{ fontSize: 14.5, color: 'var(--TM)', fontWeight: 300, lineHeight: 1.82 }}>{s.body}</p>
                                </div>
                            </div>
                        </R>
                    ))}
                </div>
            </W>
        </section>
    );
};

/* ══════════════════════════════════════════════════════════════
   §11  CTA — Proposal / Contact
══════════════════════════════════════════════════════════════ */
const CTA = () => (
    <section style={{ background: 'linear-gradient(135deg, var(--G4) 0%, var(--G3) 50%, var(--G) 100%)', padding: 'clamp(80px,12vw,128px) clamp(20px,5vw,56px)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="stex" style={{ position: 'absolute', inset: 0, opacity: .6, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center,rgba(168,213,188,.07) 0%,transparent 65%)', pointerEvents: 'none' }} />

        <R style={{ position: 'relative', maxWidth: 720, margin: '0 auto' }}>
            <p className="scaps" style={{ color: 'var(--MT3)', marginBottom: 20 }}>Begin Today</p>
            <h2 className="serif" style={{ fontSize: 'clamp(30px,5vw,66px)', fontWeight: 400, color: '#fff', lineHeight: 1.07, letterSpacing: '-0.025em', marginBottom: 28 }}>
                Ready for a strategic partner
                <em style={{ display: 'block', color: 'var(--MT3)' }}> who builds from within?</em>
            </h2>
            <p style={{ fontSize: 'clamp(14px,1.5vw,17px)', color: 'rgba(255,255,255,.52)', fontWeight: 300, lineHeight: 1.88, maxWidth: 520, margin: '0 auto 52px' }}>
                Whether you need a full systems engagement or a targeted strategic advisory — Altura brings the clinical depth, policy intelligence, and implementation commitment your programme demands.
            </p>

            {/* Three engagement options */}
            <div className="s3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 48, textAlign: 'left' }}>
                {[
                    { icon: <FileText size={18} strokeWidth={1.5} />, t: 'Request a Proposal', d: 'Tell us about your challenge. We will design a custom engagement framework within 5 working days.', cta: 'Get a proposal', href: '/contact' },
                    { icon: <Users size={18} strokeWidth={1.5} />, t: 'Book a Strategy Call', d: 'A 20-minute free consultation with Dr. Mirimo to scope your programme and align on priorities.', cta: 'Book call', href: '/contact' },
                    { icon: <Mail size={18} strokeWidth={1.5} />, t: 'Email Directly', d: 'Reach us at alturahealth@outlook.com for partnership enquiries, press, or procurement.', cta: 'Send email', href: 'mailto:alturahealth@outlook.com' },
                ].map((c) => (
                    <div key={c.t} style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 16, padding: 'clamp(18px,2.5vw,28px)', display: 'flex', flexDirection: 'column', gap: 14, backdropFilter: 'blur(10px)', transition: 'background .22s, border-color .22s' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(168,213,188,.1)'; e.currentTarget.style.borderColor = 'rgba(168,213,188,.28)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.1)'; }}>
                        <div style={{ width: 42, height: 42, borderRadius: 11, background: 'rgba(168,213,188,.12)', border: '1px solid rgba(168,213,188,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--MT3)' }}>
                            {c.icon}
                        </div>
                        <h4 className="serif" style={{ fontSize: 19, fontWeight: 500, color: '#fff', lineHeight: 1.2 }}>{c.t}</h4>
                        <p style={{ fontSize: 13, color: 'rgba(255,255,255,.5)', fontWeight: 300, lineHeight: 1.78, flexGrow: 1 }}>{c.d}</p>
                        <a href={c.href} className="slg" style={{ fontSize: 13, fontWeight: 600, color: 'var(--MT3)' }}>
                            {c.cta} <ArrowRight size={12} strokeWidth={2.2} />
                        </a>
                    </div>
                ))}
            </div>

            <p style={{ fontSize: 12, color: 'rgba(255,255,255,.24)', letterSpacing: '.04em', lineHeight: 1.8 }}>
                alturahealth@outlook.com &nbsp;·&nbsp; P.O Box 70036 – 00400, Nairobi &nbsp;·&nbsp; +254 (0) 713 123 090
            </p>
        </R>
    </section>
);

/* ══════════════════════════════════════════════════════════════
   PAGE — With sticky nav scroll tracking
══════════════════════════════════════════════════════════════ */
export default function Services() {
    const [activeModule, setActiveModule] = useState(-1);

    useEffect(() => {
        const ids = ['module-01', 'module-02', 'module-03', 'module-04', 'module-05'];
        const observers = ids.map((id, i) => {
            const el = document.getElementById(id);
            if (!el) return null;
            const obs = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setActiveModule(i); },
                { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
            );
            obs.observe(el);
            return obs;
        });
        return () => observers.forEach(o => o && o.disconnect());
    }, []);

    return (
        <>
            <GlobalStyles />
            <main>
                <Hero />
                <ServiceNav active={activeModule} />
                <Module01 />
                <Module02 />
                <Ticker />
                <Module03 />
                <Module04 />
                <Module05 />
                <Differentiators />
                <Process />
                <CTA />
            </main>
        </>
    );
}