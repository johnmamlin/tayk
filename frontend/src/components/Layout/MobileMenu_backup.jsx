import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronDown, ArrowUpRight, Menu, X,
    Map, TrendingUp, FileSignature, Activity,
    Network, BarChart2, Database, BookOpen,
    Award, Cpu, Layers, Zap, Package, Globe,
} from 'lucide-react';

/* ══════════════════════════════════════════════════════════════
   NAVBAR.JSX — Altura Health Strategies Limited
   ─────────────────────────────────────────────────────────────
   Palette:
     Ghost White   #F8F9FA  → background (scrolled)
     Deep Navy     #0a1628  → primary text
     Navy Mid      #1a3560  → secondary text
     Emerald Green #50C878  → active state / CTA
     Forest        #1e3d30  → supporting dark accent
   ─────────────────────────────────────────────────────────────
   Features:
     · Apple-style mega-menu with hover-intent debounce (120ms)
     · Framer Motion spring scroll-progress bar
     · Hamburger → X morphing button (CSS path animation)
     · Full ARIA labelling + keyboard navigation
     · Announcement bar collapses on scroll
══════════════════════════════════════════════════════════════ */

/* ─── Design tokens ───────────────────────────────────────── */
const T = {
    gw: '#F8F9FA',          // Ghost White
    gw2: '#EEF1F4',          // Ghost White 2
    dn: '#0a1628',          // Deep Navy
    dn2: '#1a3560',          // Deep Navy mid
    dn3: '#4a6080',          // Deep Navy light
    em: '#50C878',          // Emerald Green
    em2: '#3daf64',          // Emerald Dark
    em3: '#e8f9f0',          // Emerald Tint
    fo: '#1e3d30',          // Forest
    cr: '#f5f1eb',          // Cream
    b1: 'rgba(10,22,40,.06)',
    b2: 'rgba(10,22,40,.1)',
    b3: 'rgba(10,22,40,.16)',
};

/* ─── Navigation data model ───────────────────────────────── */
export const NAV_DATA = [
    { id: 'home', label: 'Home', href: '/', children: null },
    { id: 'about', label: 'About', href: '/about', children: null },
    {
        id: 'services',
        label: 'Services',
        href: '/services',
        children: {
            headline: 'Architectural Health Services',
            subline: 'Precision systems for Kenya\'s primary care infrastructure.',
            pillars: [
                {
                    id: 'strategy',
                    icon: <TrendingUp size={16} strokeWidth={1.8} />,
                    label: 'Health Strategy',
                    desc: 'Policy architecture & legislative navigation.',
                    href: '/services/strategy',
                    color: T.em,
                    links: [
                        { label: 'UHC Roadmap', href: '/services/strategy/uhc', icon: <Map size={13} strokeWidth={1.8} /> },
                        { label: 'Strategic Planning', href: '/services/strategy/planning', icon: <TrendingUp size={13} strokeWidth={1.8} /> },
                        { label: 'MOU Governance', href: '/services/strategy/mou', icon: <FileSignature size={13} strokeWidth={1.8} /> },
                        { label: 'Policy Briefs', href: '/services/strategy/policy', icon: <BookOpen size={13} strokeWidth={1.8} /> },
                    ],
                },
                {
                    id: 'primary-care',
                    icon: <Activity size={16} strokeWidth={1.8} />,
                    label: 'Primary Care',
                    desc: 'End-to-end PCN architecture & eCHIS deployment.',
                    href: '/services/primary-care',
                    color: '#3b9ddd',
                    links: [
                        { label: 'PCN Architecture', href: '/services/primary-care/pcn', icon: <Network size={13} strokeWidth={1.8} /> },
                        { label: 'System Integration', href: '/services/primary-care/integration', icon: <Layers size={13} strokeWidth={1.8} /> },
                        { label: 'Baseline Analytics', href: '/services/primary-care/analytics', icon: <BarChart2 size={13} strokeWidth={1.8} /> },
                        { label: 'eCHIS Deployment', href: '/services/primary-care/echis', icon: <Database size={13} strokeWidth={1.8} /> },
                        { label: 'Community Health', href: '/services/primary-care/community', icon: <Globe size={13} strokeWidth={1.8} /> },
                    ],
                },
                {
                    id: 'training',
                    icon: <Award size={16} strokeWidth={1.8} />,
                    label: 'Training',
                    desc: 'TOT-certified clinical capacity building.',
                    href: '/services/training',
                    color: '#c8a660',
                    links: [
                        { label: 'Clinical Workshops', href: '/services/training/workshops', icon: <BookOpen size={13} strokeWidth={1.8} /> },
                        { label: 'KQMH Quality', href: '/services/training/kqmh', icon: <Award size={13} strokeWidth={1.8} /> },
                        { label: 'eCHIS Scaling', href: '/services/training/echis', icon: <Zap size={13} strokeWidth={1.8} /> },
                        { label: 'TOT Programmes', href: '/services/training/tot', icon: <Cpu size={13} strokeWidth={1.8} /> },
                    ],
                },
                {
                    id: 'tech',
                    icon: <Cpu size={16} strokeWidth={1.8} />,
                    label: 'Tech & Linkages',
                    desc: 'Health innovation, partner alignment & supply.',
                    href: '/services/tech',
                    color: '#9b7ee8',
                    links: [
                        { label: 'Medical Innovation', href: '/services/tech/innovation', icon: <Zap size={13} strokeWidth={1.8} /> },
                        { label: 'Partner Matrix', href: '/services/tech/partners', icon: <Network size={13} strokeWidth={1.8} /> },
                        { label: 'Supply Chain', href: '/services/tech/supply', icon: <Package size={13} strokeWidth={1.8} /> },
                        { label: 'Health Tech Deploy', href: '/services/tech/deploy', icon: <Layers size={13} strokeWidth={1.8} /> },
                    ],
                },
            ],
        },
    },
    { id: 'resources', label: 'Resources', href: '/resources', children: null },
];

/* ─── CSS-in-JS ───────────────────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=JetBrains+Mono:wght@400;500&display=swap');

  .an-nav *, .an-nav *::before, .an-nav *::after { box-sizing: border-box; }
  .an-nav { font-family: 'DM Sans', sans-serif; }
  .an-logo { font-family: 'Cormorant Garamond', serif; }
  .an-mono { font-family: 'JetBrains Mono', monospace; }

  /* ── Scroll progress spring ── */
  .an-progress-track {
    position: absolute; bottom: 0; left: 0; right: 0;
    height: 2px; background: transparent; overflow: hidden;
  }

  /* ── Nav link base ── */
  .an-link {
    position: relative; display: inline-flex; align-items: center;
    gap: 4px; text-decoration: none; cursor: pointer;
    transition: color .22s ease;
  }
  .an-link::after {
    content: ''; position: absolute; bottom: -2px; left: 0;
    width: 0; height: 1.5px; border-radius: 99px;
    background: ${T.em};
    transition: width .3s cubic-bezier(.4,0,.2,1);
  }
  .an-link:hover::after, .an-link[data-active='true']::after { width: 100%; }
  .an-link:focus-visible {
    outline: 2px solid ${T.em};
    outline-offset: 4px; border-radius: 4px;
  }

  /* ── Mega menu link rows ── */
  .an-mlinkrow {
    display: flex; align-items: center; gap: 10px;
    padding: 8px 12px; border-radius: 8px;
    font-size: 13px; font-weight: 400; color: ${T.dn2};
    text-decoration: none; transition: all .18s ease;
    white-space: nowrap;
  }
  .an-mlinkrow .an-icon-wrap {
    width: 26px; height: 26px; border-radius: 7px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    background: rgba(10,22,40,.05);
    transition: background .18s, color .18s;
  }
  .an-mlinkrow:hover {
    background: rgba(10,22,40,.04);
    color: ${T.dn};
  }
  .an-mlinkrow:hover .an-icon-wrap { background: rgba(80,200,120,.12); color: ${T.em2}; }
  .an-mlinkrow:focus-visible { outline: 2px solid ${T.em}; outline-offset: 2px; border-radius: 8px; }

  /* ── Pillar header hover ── */
  .an-pillar {
    display: flex; align-items: flex-start; gap: 12px;
    padding: 14px 16px 10px; border-radius: 12px;
    text-decoration: none; transition: background .2s;
    cursor: default;
  }
  .an-pillar:hover { background: rgba(10,22,40,.03); }

  /* ── CTA button ── */
  .an-cta {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 9px 20px; border-radius: 99px;
    font-size: 12.5px; font-weight: 700;
    letter-spacing: .04em; text-transform: uppercase;
    text-decoration: none; transition: all .3s cubic-bezier(.2,.8,.2,1);
    background: ${T.em}; color: #fff; border: none;
    box-shadow: 0 4px 20px rgba(80,200,120,.32);
    font-family: 'DM Sans', sans-serif; cursor: pointer;
  }
  .an-cta:hover {
    background: ${T.em2};
    transform: translateY(-1px);
    box-shadow: 0 8px 28px rgba(80,200,120,.42);
  }
  .an-cta:focus-visible { outline: 2px solid ${T.em}; outline-offset: 3px; border-radius: 99px; }
  .an-cta:active { transform: translateY(0); }

  /* ── Burger morph ── */
  .an-burger { background: none; border: none; cursor: pointer;
    width: 40px; height: 40px; display: flex; align-items: center;
    justify-content: center; border-radius: 10px;
    transition: background .2s; padding: 0; }
  .an-burger:hover { background: rgba(10,22,40,.06); }
  .an-burger:focus-visible { outline: 2px solid ${T.em}; outline-offset: 2px; border-radius: 10px; }
  .an-burger-svg { width: 22px; height: 22px; overflow: visible; }
  .an-bar {
    stroke-linecap: round; stroke-linejoin: round;
    transform-origin: center;
    transition: transform .36s cubic-bezier(.4,0,.2,1),
                opacity .22s ease, stroke-dashoffset .36s cubic-bezier(.4,0,.2,1);
  }
`;

/* ─── Scroll progress bar (framer spring) ────────────────── */
const ScrollProgress = ({ scrolled }) => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 30 });
    return (
        <div className="an-progress-track" aria-hidden="true">
            <motion.div
                style={{
                    scaleX,
                    transformOrigin: '0%',
                    height: '100%',
                    background: `linear-gradient(90deg, ${T.em2}, ${T.em})`,
                    opacity: scrolled ? 1 : 0,
                    transition: 'opacity .4s',
                }}
            />
        </div>
    );
};

/* ─── Mega menu panel ─────────────────────────────────────── */
const MegaMenu = ({ data, visible, onClose }) => {
    if (!data?.children) return null;
    const { headline, subline, pillars } = data.children;

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    role="region"
                    aria-label={`${data.label} submenu`}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: .22, ease: [.4, 0, .2, 1] }}
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        marginTop: 8,
                        width: 'min(900px, 92vw)',
                        background: T.gw,
                        border: `1px solid ${T.b2}`,
                        borderRadius: 18,
                        boxShadow: `0 24px 80px rgba(10,22,40,.13), 0 4px 16px rgba(10,22,40,.07)`,
                        overflow: 'hidden',
                        zIndex: 200,
                    }}
                >
                    {/* Panel header */}
                    <div style={{ padding: '20px 28px 16px', borderBottom: `1px solid ${T.b1}`, background: T.gw2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: T.em2, marginBottom: 4, fontFamily: "'JetBrains Mono',monospace" }}>
                                Service Architecture
                            </p>
                            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 500, color: T.dn, lineHeight: 1.2, letterSpacing: '-.01em' }}>
                                {headline}
                            </h3>
                            <p style={{ fontSize: 13, color: T.dn3, fontWeight: 300, marginTop: 4 }}>{subline}</p>
                        </div>
                        <Link
                            to="/services"
                            onClick={onClose}
                            style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 600, color: T.em2, textDecoration: 'none', letterSpacing: '.03em', flexShrink: 0, marginTop: 4 }}
                            onMouseOver={e => e.currentTarget.style.color = T.em}
                            onMouseOut={e => e.currentTarget.style.color = T.em2}
                        >
                            All services <ArrowUpRight size={13} strokeWidth={2.2} />
                        </Link>
                    </div>

                    {/* Pillars grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, padding: '8px 12px 16px' }}>
                        {pillars.map((pillar, pi) => (
                            <div
                                key={pillar.id}
                                style={{
                                    padding: '4px 4px',
                                    borderRight: pi < pillars.length - 1 ? `1px solid ${T.b1}` : 'none',
                                }}
                            >
                                {/* Pillar header */}
                                <Link
                                    to={pillar.href}
                                    onClick={onClose}
                                    className="an-pillar"
                                    style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 12px 8px', borderRadius: 10, textDecoration: 'none' }}
                                    onMouseOver={e => e.currentTarget.style.background = 'rgba(10,22,40,.03)'}
                                    onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                                >
                                    <div style={{ width: 30, height: 30, borderRadius: 8, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${pillar.color}18`, color: pillar.color, marginTop: 1 }}>
                                        {pillar.icon}
                                    </div>
                                    <div>
                                        <p style={{ fontSize: 13, fontWeight: 700, color: T.dn, lineHeight: 1.2, marginBottom: 3 }}>{pillar.label}</p>
                                        <p style={{ fontSize: 11.5, color: T.dn3, fontWeight: 300, lineHeight: 1.55 }}>{pillar.desc}</p>
                                    </div>
                                </Link>

                                {/* Pillar links */}
                                <div style={{ paddingLeft: 4 }}>
                                    {pillar.links.map(link => (
                                        <Link
                                            key={link.href}
                                            to={link.href}
                                            onClick={onClose}
                                            className="an-mlinkrow"
                                            tabIndex={0}
                                        >
                                            <span className="an-icon-wrap" style={{ color: T.dn3 }}>{link.icon}</span>
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Panel footer — status strip */}
                    <div style={{ padding: '10px 28px', background: T.gw2, borderTop: `1px solid ${T.b1}`, display: 'flex', alignItems: 'center', gap: 20 }}>
                        {[
                            { dot: T.em, label: 'PCN Architecture · Deployed' },
                            { dot: '#3b9ddd', label: '300+ Clinicians Trained' },
                            { dot: '#c8a660', label: 'KQMH TOT Certified' },
                        ].map(s => (
                            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <div style={{ width: 6, height: 6, borderRadius: '50%', background: s.dot, flexShrink: 0 }} />
                                <span style={{ fontSize: 10.5, color: T.dn3, fontWeight: 400, fontFamily: "'JetBrains Mono',monospace", letterSpacing: '.08em' }}>{s.label}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

/* ─── Burger SVG morph icon ───────────────────────────────── */
const BurgerIcon = ({ open, color }) => (
    <svg
        className="an-burger-svg"
        viewBox="0 0 22 22"
        fill="none"
        stroke={color}
        strokeWidth="2"
        aria-hidden="true"
    >
        {/* Top bar → top-left to bottom-right of X */}
        <line
            className="an-bar"
            x1="3" y1="6" x2="19" y2="6"
            style={{
                transform: open
                    ? 'rotate(45deg) translate(0px, 3.5px)'
                    : 'rotate(0deg) translate(0, 0)',
                transformOrigin: '11px 6px',
            }}
        />
        {/* Middle bar → fades out */}
        <line
            className="an-bar"
            x1="3" y1="11" x2="19" y2="11"
            style={{ opacity: open ? 0 : 1 }}
        />
        {/* Bottom bar → top-right to bottom-left of X */}
        <line
            className="an-bar"
            x1="3" y1="16" x2="19" y2="16"
            style={{
                transform: open
                    ? 'rotate(-45deg) translate(0px, -3.5px)'
                    : 'rotate(0deg) translate(0, 0)',
                transformOrigin: '11px 16px',
            }}
        />
    </svg>
);

/* ══════════════════════════════════════════════════════════════
   NAVBAR COMPONENT
══════════════════════════════════════════════════════════════ */
export default function Navbar() {
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [scrollPct, setScrollPct] = useState(0);
    const [activeMenu, setActiveMenu] = useState(null);   // id of open mega-menu
    const [activeLink, setActiveLink] = useState(null);   // keyboard/hover focus
    const [mobileOpen, setMobileOpen] = useState(false);
    const dismissTimer = useRef(null);
    const navRef = useRef(null);

    /* ── Scroll tracking ── */
    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 24);
            const max = document.documentElement.scrollHeight - window.innerHeight;
            setScrollPct(max > 0 ? (window.scrollY / max) * 100 : 0);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    /* ── Close menu on route change ── */
    useEffect(() => {
        setActiveMenu(null);
        setMobileOpen(false);
    }, [location.pathname]);

    /* ── Body scroll lock (mobile) ── */
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    /* ── Click outside to close mega-menu ── */
    useEffect(() => {
        const handler = (e) => {
            if (navRef.current && !navRef.current.contains(e.target)) {
                setActiveMenu(null);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    /* ── Keyboard Escape ── */
    useEffect(() => {
        const handler = (e) => {
            if (e.key === 'Escape') { setActiveMenu(null); setMobileOpen(false); }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);

    /* ── Hover intent — debounced dismiss (120ms) ── */
    const handleNavEnter = useCallback((id) => {
        clearTimeout(dismissTimer.current);
        setActiveMenu(id);
        setActiveLink(id);
    }, []);

    const handleNavLeave = useCallback(() => {
        dismissTimer.current = setTimeout(() => {
            setActiveMenu(null);
            setActiveLink(null);
        }, 120);
    }, []);

    const handleMenuEnter = useCallback(() => {
        clearTimeout(dismissTimer.current);
    }, []);

    /* ── Keyboard nav: Enter/Space opens submenu ── */
    const handleKeyDown = useCallback((e, item) => {
        if ((e.key === 'Enter' || e.key === ' ') && item.children) {
            e.preventDefault();
            setActiveMenu(prev => prev === item.id ? null : item.id);
        }
    }, []);

    /* ── Derived state ── */
    const isTransparent = !scrolled && !activeMenu;
    const textColor = isTransparent ? 'rgba(255,255,255,.9)' : T.dn;
    const subColor = isTransparent ? 'rgba(255,255,255,.62)' : T.dn3;

    return (
        <>
            <style>{STYLES}</style>

            {/* ── Announcement bar ── */}
            <motion.div
                aria-label="Announcement"
                initial={false}
                animate={{ height: scrolled ? 0 : 36, opacity: scrolled ? 0 : 1 }}
                transition={{ duration: .4, ease: [.4, 0, .2, 1] }}
                style={{
                    position: 'fixed', top: 0, left: 0, right: 0,
                    zIndex: 501, overflow: 'hidden',
                    background: T.fo, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <span style={{ fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: '#8aaa96', fontFamily: "'JetBrains Mono',monospace", fontWeight: 500 }}>
                        Root-cause medicine for Kenya's health system
                    </span>
                    <span style={{ color: 'rgba(138,170,150,.35)', fontSize: 10 }}>—</span>
                    <Link to="/contact" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: '#6ecb96', textDecoration: 'none', transition: 'opacity .2s', opacity: .8 }}
                        onMouseOver={e => e.currentTarget.style.opacity = 1}
                        onMouseOut={e => e.currentTarget.style.opacity = .8}
                    >
                        Initiate engagement <ArrowUpRight size={9} strokeWidth={2.5} />
                    </Link>
                </div>
            </motion.div>

            {/* ── Main header ── */}
            <header
                ref={navRef}
                className="an-nav"
                role="banner"
                style={{
                    position: 'fixed',
                    top: scrolled ? 0 : 36,
                    left: 0, right: 0,
                    zIndex: 500,
                    height: scrolled ? 64 : 80,
                    background: isTransparent ? 'transparent' : 'rgba(248,249,250,.97)',
                    borderBottom: `1px solid ${isTransparent ? 'transparent' : T.b1}`,
                    backdropFilter: isTransparent ? 'none' : 'blur(24px)',
                    WebkitBackdropFilter: isTransparent ? 'none' : 'blur(24px)',
                    boxShadow: scrolled ? '0 2px 40px rgba(10,22,40,.08)' : 'none',
                    transition: 'top .4s cubic-bezier(.4,0,.2,1), height .4s, background .4s, border-color .4s, box-shadow .4s',
                }}
            >
                {/* Inner container */}
                <div style={{ maxWidth: 1200, margin: '0 auto', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 clamp(20px,4vw,48px)', position: 'relative' }}>

                    {/* ── Logo ── */}
                    <Link to="/" aria-label="Altura Health Strategies — home" style={{ textDecoration: 'none', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <motion.span
                            className="an-logo"
                            style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-.022em', color: textColor, lineHeight: 1, transition: 'color .35s' }}
                        >
                            Altura
                        </motion.span>
                        <span style={{ fontSize: 8, letterSpacing: '.22em', textTransform: 'uppercase', fontWeight: 500, color: isTransparent ? 'rgba(255,255,255,.45)' : T.dn3, transition: 'color .35s', fontFamily: "'DM Sans',sans-serif" }}>
                            Health Strategies
                        </span>
                    </Link>

                    {/* ── Desktop nav ── */}
                    <nav
                        role="navigation"
                        aria-label="Primary navigation"
                        style={{ display: 'flex', alignItems: 'center', gap: 4 }}
                        className="an-desktop-nav"
                    >
                        <style>{`
              @media (max-width: 1023px) { .an-desktop-nav { display: none !important; } }
            `}</style>

                        {NAV_DATA.map(item => {
                            const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/');
                            const isOpen = activeMenu === item.id;
                            const hasChildren = !!item.children;

                            return (
                                <div
                                    key={item.id}
                                    style={{ position: 'relative' }}
                                    onMouseEnter={() => hasChildren && handleNavEnter(item.id)}
                                    onMouseLeave={() => hasChildren && handleNavLeave()}
                                >
                                    {hasChildren ? (
                                        /* ── Mega-menu trigger (button) ── */
                                        <button
                                            aria-haspopup="true"
                                            aria-expanded={isOpen}
                                            aria-controls={`megamenu-${item.id}`}
                                            onKeyDown={e => handleKeyDown(e, item)}
                                            onFocus={() => handleNavEnter(item.id)}
                                            onBlur={() => handleNavLeave()}
                                            className="an-link"
                                            data-active={isActive}
                                            style={{
                                                background: 'none', border: 'none',
                                                padding: '8px 12px', borderRadius: 8,
                                                fontSize: 13.5, fontWeight: isActive ? 600 : 500,
                                                letterSpacing: '.015em',
                                                color: isActive
                                                    ? (isTransparent ? '#fff' : T.em2)
                                                    : (isTransparent ? 'rgba(255,255,255,.82)' : T.dn2),
                                                transition: 'color .22s, background .18s',
                                                cursor: 'pointer',
                                                display: 'flex', alignItems: 'center', gap: 4,
                                            }}
                                            onMouseOver={e => { if (!isActive) e.currentTarget.style.color = isTransparent ? '#fff' : T.dn; }}
                                            onMouseOut={e => { if (!isActive) e.currentTarget.style.color = isTransparent ? 'rgba(255,255,255,.82)' : T.dn2; }}
                                        >
                                            {item.label}
                                            <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: .22, ease: [.4, 0, .2, 1] }}>
                                                <ChevronDown size={13} strokeWidth={2.2} />
                                            </motion.span>
                                        </button>
                                    ) : (
                                        /* ── Simple link ── */
                                        <Link
                                            to={item.href}
                                            className="an-link"
                                            data-active={isActive}
                                            aria-current={isActive ? 'page' : undefined}
                                            style={{
                                                padding: '8px 12px', borderRadius: 8,
                                                fontSize: 13.5, fontWeight: isActive ? 600 : 500,
                                                letterSpacing: '.015em',
                                                color: isActive
                                                    ? (isTransparent ? '#fff' : T.em2)
                                                    : (isTransparent ? 'rgba(255,255,255,.82)' : T.dn2),
                                                transition: 'color .22s',
                                            }}
                                            onMouseOver={e => { if (!isActive) e.currentTarget.style.color = isTransparent ? '#fff' : T.dn; }}
                                            onMouseOut={e => { if (!isActive) e.currentTarget.style.color = isTransparent ? 'rgba(255,255,255,.82)' : T.dn2; }}
                                        >
                                            {item.label}
                                        </Link>
                                    )}

                                    {/* ── Mega-menu panel ── */}
                                    {hasChildren && (
                                        <div
                                            id={`megamenu-${item.id}`}
                                            onMouseEnter={handleMenuEnter}
                                            onMouseLeave={handleNavLeave}
                                        >
                                            <MegaMenu
                                                data={item}
                                                visible={isOpen}
                                                onClose={() => setActiveMenu(null)}
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </nav>

                    {/* ── Actions ── */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>

                        {/* Ghost link — desktop only */}
                        <Link
                            to="/resources"
                            aria-label="Go to resources"
                            style={{
                                display: 'none',
                                alignItems: 'center', gap: 5,
                                fontSize: 12, fontWeight: 600,
                                letterSpacing: '.06em', textTransform: 'uppercase',
                                textDecoration: 'none', padding: '8px 16px',
                                borderRadius: 99, border: `1.5px solid ${isTransparent ? 'rgba(255,255,255,.3)' : T.b3}`,
                                color: isTransparent ? 'rgba(255,255,255,.85)' : T.dn2,
                                background: 'transparent',
                                transition: 'all .25s',
                                whiteSpace: 'nowrap',
                            }}
                            className="an-ghost-xl"
                            onMouseOver={e => { e.currentTarget.style.borderColor = isTransparent ? 'rgba(255,255,255,.65)' : T.em; e.currentTarget.style.color = isTransparent ? '#fff' : T.em2; }}
                            onMouseOut={e => { e.currentTarget.style.borderColor = isTransparent ? 'rgba(255,255,255,.3)' : T.b3; e.currentTarget.style.color = isTransparent ? 'rgba(255,255,255,.85)' : T.dn2; }}
                        >
                            Resources
                        </Link>
                        <style>{`@media (min-width:1200px){ .an-ghost-xl{ display:inline-flex!important; } }`}</style>

                        {/* Emerald CTA — system entry point */}
                        <Link
                            to="/contact"
                            role="button"
                            aria-label="Contact — system entry point"
                            className="an-cta"
                        >
                            <span>Contact</span>
                            <ArrowUpRight size={13} strokeWidth={2.5} aria-hidden="true" />
                        </Link>

                        {/* Mobile burger */}
                        <button
                            className="an-burger an-mob-only"
                            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
                            aria-expanded={mobileOpen}
                            aria-controls="mobile-menu"
                            onClick={() => setMobileOpen(v => !v)}
                        >
                            <BurgerIcon open={mobileOpen} color={isTransparent ? '#fff' : T.dn} />
                        </button>
                        <style>{`
              .an-mob-only { display: none !important; }
              @media (max-width: 1023px) { .an-mob-only { display: flex !important; } }
            `}</style>
                    </div>
                </div>

                {/* ── Scroll progress bar ── */}
                <ScrollProgress scrolled={scrolled} />
            </header>

            {/* ── Mobile overlay ── */}
            <MobileMenu
                id="mobile-menu"
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                navData={NAV_DATA}
                location={location}
            />
        </>
    );
}