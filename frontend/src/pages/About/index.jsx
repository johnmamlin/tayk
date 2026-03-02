import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
    ArrowRight, ArrowUpRight, MapPin, Award, Users, Globe,
    BookOpen, Heart, Shield, TrendingUp, Cpu, Activity,
    Mail, ChevronDown, CheckCircle, Microscope, Building2,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   ABOUT.JSX  —  Altura Health Strategies
   ─────────────────────────────────────────────────────────────
   Theme   : Editorial luxury consultancy · Deep teal gradient
   BG      : linear-gradient(180deg,#132D2E 2%,#284849 61%,#477568 100%)
   Palette : Deep Greens · Teal · Soft Mint · Index cream accents
   Fonts   : Cormorant Garamond (display) + DM Sans (body)
═══════════════════════════════════════════════════════════════ */

/* ─── Global styles ─────────────────────────────────────────── */
const GlobalStyles = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      /* Use same colors as Home page */
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

    /* Label caps */
    .acaps {
      font-family: 'DM Sans', sans-serif;
      font-size: 10px; font-weight: 700;
      letter-spacing: 0.18em; text-transform: uppercase;
      color: var(--TL);
    }

    /* Glass card */
    .aglass {
      background: rgba(255,255,255,.04);
      border: 1px solid rgba(255,255,255,.10);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
    }

    /* Hover lift */
    .alift {
      transition: transform .32s cubic-bezier(.2,.8,.2,1),
                  box-shadow .32s cubic-bezier(.2,.8,.2,1);
    }
    .alift:hover {
      transform: translateY(-5px);
      box-shadow: 0 28px 64px rgba(0,0,0,.28);
    }

    /* Link underline grow */
    .alg {
      position: relative;
      display: inline-flex; align-items: center; gap: 6px;
    }
    .alg::after {
      content: ''; position: absolute; bottom: -2px; left: 0;
      width: 0; height: 1px; background: currentColor;
      transition: width .3s cubic-bezier(.4,0,.2,1);
    }
    .alg:hover::after { width: 100%; }

    /* Infinite ticker */
    @keyframes aticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    .aticker-track {
      display: flex; width: max-content;
      animation: aticker 34s linear infinite;
    }
    .aticker-track:hover { animation-play-state: paused; }

    /* Timeline pulse dot */
    @keyframes apulse {
      0%,100% { box-shadow: 0 0 0 0 rgba(168,213,188,.4); }
      50%      { box-shadow: 0 0 0 10px rgba(168,213,188,.0); }
    }
    .apulse { animation: apulse 2.4s ease-in-out infinite; }

    /* Diagonal texture overlay */
    .atex {
      background-image: repeating-linear-gradient(
        -45deg,
        transparent, transparent 60px,
        rgba(255,255,255,.016) 60px, rgba(255,255,255,.016) 61px
      );
    }

    /* Responsive helpers */
    @media (max-width: 768px) {
      .amob-hide   { display: none !important; }
      .amob-full   { grid-column: 1/-1 !important; }
      .amob-stack  { grid-template-columns: 1fr !important; }
      .amob-center { text-align: center !important; }
    }
    @media (min-width: 769px) {
      .adesk-hide  { display: none !important; }
    }
    @media (max-width: 600px) {
      .amob-2col   { grid-template-columns: repeat(2,1fr) !important; }
    }

    input:focus, textarea:focus { outline: none; }
  `}</style>
);

/* ─── Animation constants ───────────────────────────────────── */
const EASE = [0.16, 1, 0.3, 1];

/* ─── Scroll-reveal wrapper ─────────────────────────────────── */
const R = ({ children, d = 0, y = 22, x = 0, style = {}, className = '' }) => {
    const ref = useRef(null);
    const v = useInView(ref, { once: true, margin: '-52px' });
    return (
        <motion.div ref={ref} style={style} className={className}
            initial={{ opacity: 0, y, x }}
            animate={v ? { opacity: 1, y: 0, x: 0 } : {}}
            transition={{ duration: 0.58, ease: EASE, delay: d }}>
            {children}
        </motion.div>
    );
};

/* ─── Max-width wrapper ─────────────────────────────────────── */
const W = ({ children, style = {} }) => (
    <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 clamp(20px,5vw,56px)', ...style }}>
        {children}
    </div>
);

/* ─── Pill button ───────────────────────────────────────────── */
const Btn = ({ children, v = 'mint', href = '#', sx = {} }) => {
    const map = {
        mint: { bg: 'rgba(168,213,188,.14)', col: '#d6ebe2', br: '1px solid rgba(168,213,188,.32)' },
        gold: { bg: '#c8a96e', col: '#1a1208', br: 'none' },
        white: { bg: '#ffffff', col: '#132D2E', br: 'none' },
        outline: { bg: 'transparent', col: 'rgba(255,255,255,.88)', br: '1px solid rgba(255,255,255,.22)' },
        terra: { bg: 'linear-gradient(135deg,#8b4a2b,#c47840)', col: '#fff', br: 'none' },
        cream: { bg: '#f5f1ea', col: '#1e3d30', br: 'none' },
    };
    const s = map[v] || map.mint;
    return (
        <motion.a href={href}
            whileHover={{ scale: 1.025, y: -1 }}
            whileTap={{ scale: 0.97 }}
            style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                borderRadius: 99, padding: '12px 26px',
                fontSize: 13, fontWeight: 600, letterSpacing: '.04em',
                fontFamily: "'DM Sans', sans-serif",
                background: s.bg, color: s.col,
                border: s.br || 'none',
                cursor: 'pointer',
                transition: 'opacity .2s, filter .2s',
                ...sx,
            }}>
            {children}
        </motion.a>
    );
};

/* ─── Section header helper ─────────────────────────────────── */
const Head = ({ cap, title, sub, center = true, light = true }) => (
    <div style={{ textAlign: center ? 'center' : 'left', marginBottom: 60 }}>
        {cap && <p className="acaps" style={{ color: light ? 'var(--MINT)' : 'var(--G)', marginBottom: 16 }}>{cap}</p>}
        <h2 className="serif" style={{
            fontSize: 'clamp(28px,4.2vw,54px)', fontWeight: 400,
            color: light ? '#fff' : 'var(--G)',
            lineHeight: 1.08, letterSpacing: '-0.02em',
            marginBottom: sub ? 18 : 0,
        }}>{title}</h2>
        {sub && (
            <p style={{
                fontSize: 'clamp(14px,1.5vw,16.5px)', color: light ? 'rgba(255,255,255,.54)' : '#3a5448',
                fontWeight: 300, lineHeight: 1.82,
                maxWidth: center ? 580 : '100%', margin: center ? '0 auto' : 0,
            }}>{sub}</p>
        )}
    </div>
);

/* ══════════════════════════════════════════════════════════════
   §1  HERO — "The Altura Edge"
══════════════════════════════════════════════════════════════ */
const Hero = () => {
    const checks = [
        ['Not a general consultancy.', 'We operate within the systems we advise — building policy from the inside out.'],
        ['Not a theory shop.', 'Every framework we produce has been tested in live public health environments.'],
        ['Not a solo act.', 'Altura channels deep institutional expertise into a scalable, purpose-driven practice.'],
    ];

    return (
        <section style={{
            position: 'relative', overflow: 'hidden',
            paddingTop: 'clamp(110px,14vw,168px)',
            paddingBottom: 'clamp(72px,10vw,120px)',
            background: 'var(--G)',
        }}>
            {/* Diagonal texture */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: `repeating-linear-gradient(-45deg,transparent,transparent 60px,rgba(255,255,255,.015) 60px,rgba(255,255,255,.015) 61px)` }} />
            {/* Glow */}
            <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 'clamp(280px,45vw,580px)', aspectRatio: '1', borderRadius: '50%', background: 'radial-gradient(circle, rgba(214,235,226,.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

            <W>
                {/* Label */}
                <motion.p className="acaps"
                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: .5, delay: .06 }}
                    style={{ marginBottom: 26 }}>
                    About Altura Health Strategies
                </motion.p>

                {/* Headline */}
                <motion.h1 className="serif"
                    initial={{ opacity: 0, y: 44 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: EASE, delay: .12 }}
                    style={{
                        fontSize: 'clamp(42px,7vw,88px)', fontWeight: 400,
                        color: '#fff', lineHeight: 1.03,
                        letterSpacing: '-0.025em', marginBottom: 52,
                        maxWidth: 820,
                    }}>
                    The Altura
                    <span style={{ display: 'block', fontStyle: 'italic', color: 'var(--MINT)' }}>Edge.</span>
                </motion.h1>

                {/* Two-column body */}
                <div className="amob-stack" style={{
                    display: 'grid', gridTemplateColumns: '1fr 1fr',
                    gap: 'clamp(32px,5vw,80px)', alignItems: 'start',
                }}>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: .7, ease: EASE, delay: .28 }}
                        style={{ fontSize: 'clamp(15px,1.6vw,18px)', fontWeight: 300, color: 'rgba(255,255,255,.62)', lineHeight: 1.88 }}>
                        Where clinical excellence meets public health policy. Altura Health Strategies is a specialist consultancy
                        dedicated to building resilient health systems across Sub-Saharan Africa — through evidence-informed strategy,
                        deep implementation intelligence, and unwavering accountability to outcomes.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: .7, ease: EASE, delay: .38 }}
                        style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                        {checks.map(([b, t]) => (
                            <div key={b} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                                <CheckCircle size={15} strokeWidth={1.8} color="var(--MINT)" style={{ marginTop: 3, flexShrink: 0 }} />
                                <p style={{ fontSize: 14, color: 'rgba(255,255,255,.65)', lineHeight: 1.75, fontWeight: 300 }}>
                                    <strong style={{ fontWeight: 600, color: '#fff' }}>{b}</strong> {t}
                                </p>
                            </div>
                        ))}
                        <div style={{ marginTop: 6 }}>
                            <Btn v="gold" href="/contact">
                                Inquire for Strategic Partnership <ArrowRight size={13} strokeWidth={2} />
                            </Btn>
                        </div>
                    </motion.div>
                </div>
            </W>

            {/* Scroll cue */}
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                style={{ display: 'flex', justifyContent: 'center', marginTop: 'clamp(52px,7vw,88px)', gap: 8, alignItems: 'center', color: 'rgba(255,255,255,.28)' }}>
                <span style={{ fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', fontWeight: 700 }}>Scroll to explore</span>
                <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}>
                    <ChevronDown size={14} strokeWidth={2} />
                </motion.div>
            </motion.div>
        </section>
    );
};

/* ══════════════════════════════════════════════════════════════
   §2  STATS ROW
══════════════════════════════════════════════════════════════ */
const Stats = () => {
    const data = [
        { v: '15+', l: 'Years Clinical & Policy Expertise', icon: <Award size={17} strokeWidth={1.5} /> },
        { v: '50+', l: 'Healthcare Programmes Designed', icon: <TrendingUp size={17} strokeWidth={1.5} /> },
        { v: '10+', l: 'African Countries in our Network', icon: <Globe size={17} strokeWidth={1.5} /> },
        { v: '300+', l: 'Healthcare Workers Trained (EmNOC)', icon: <Users size={17} strokeWidth={1.5} /> },
    ];
    return (
        <section style={{
            borderTop: '1px solid rgba(255,255,255,.06)',
            borderBottom: '1px solid rgba(255,255,255,.06)',
            background: 'var(--G3)',
        }}>
            <W>
                <div className="amob-2col" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }}>
                    {data.map((s, i) => (
                        <R key={s.v} d={i * .07}>
                            <div style={{
                                padding: 'clamp(22px,3.5vw,36px) clamp(16px,2.5vw,28px)',
                                borderRight: i < data.length - 1 ? '1px solid rgba(255,255,255,.07)' : 'none',
                                display: 'flex', alignItems: 'center', gap: 14,
                            }}>
                                <div style={{ color: 'var(--MINT)', opacity: .75, flexShrink: 0 }}>{s.icon}</div>
                                <div>
                                    <div className="serif" style={{ fontSize: 'clamp(26px,3.2vw,40px)', fontWeight: 400, color: '#fff', lineHeight: 1, letterSpacing: '-0.025em' }}>{s.v}</div>
                                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,.4)', fontWeight: 400, marginTop: 6, letterSpacing: '.02em', lineHeight: 1.45 }}>{s.l}</div>
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
   §3  FOUNDATION — Mission / Vision / Approach
══════════════════════════════════════════════════════════════ */
const Foundation = () => {
    const pillars = [
        {
            icon: <Heart size={20} strokeWidth={1.5} />,
            cap: 'Our Mission',
            title: 'Evidence into Action',
            body: 'To offer evidence-informed healthcare strategies that improve health outcomes for African communities — translating knowledge into measurable, lasting change that endures beyond any project cycle.',
        },
        {
            icon: <Globe size={20} strokeWidth={1.5} />,
            cap: 'Our Vision',
            title: 'Premier Pan-African Partner',
            body: 'To become the premier healthcare consultancy partner across Sub-Saharan Africa — shaping health systems that are resilient, equitable, and genuinely people-centred from community to national level.',
        },
        {
            icon: <Shield size={20} strokeWidth={1.5} />,
            cap: 'Our Approach',
            title: 'Inside the System',
            body: 'We integrate clinical depth with policy intelligence — embedding ourselves in the systems we serve, not advising from above. Real impact demands real presence, real accountability, real relationships.',
        },
    ];

    return (
        <section style={{ background: 'var(--CR2)', padding: 'clamp(72px,10vw,120px) 0' }}>
            <W>
                <R style={{ textAlign: 'center', marginBottom: 64 }}>
                    <p className="acaps" style={{ marginBottom: 16 }}>Our Foundation</p>
                    <h2 className="serif" style={{ fontSize: 'clamp(30px,4.5vw,58px)', fontWeight: 400, color: 'var(--TX)', lineHeight: 1.07, letterSpacing: '-0.02em' }}>
                        Built on purpose.{' '}
                        <em style={{ color: 'var(--MT)' }}>Driven by outcomes.</em>
                    </h2>
                </R>

                <div className="amob-stack" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
                    {pillars.map((p, i) => (
                        <R key={p.cap} d={i * .09}>
                            <div className="aglass alift" style={{ borderRadius: 20, padding: 'clamp(28px,3.5vw,44px)', height: '100%', display: 'flex', flexDirection: 'column', gap: 22 }}>
                                {/* Icon badge */}
                                <div style={{ width: 46, height: 46, borderRadius: 13, background: 'rgba(168,213,188,.12)', border: '1px solid rgba(168,213,188,.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--MINT)', flexShrink: 0 }}>
                                    {p.icon}
                                </div>
                                <div>
                                    <p className="acaps" style={{ color: 'var(--TM)', marginBottom: 12 }}>{p.cap}</p>
                                    <h3 className="serif" style={{ fontSize: 'clamp(20px,2.2vw,28px)', fontWeight: 400, color: 'var(--TX)', marginBottom: 14, lineHeight: 1.22 }}>{p.title}</h3>
                                    <p style={{ fontSize: 14.5, color: 'var(--TM)', fontWeight: 300, lineHeight: 1.85 }}>{p.body}</p>
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
   §4  TICKER
══════════════════════════════════════════════════════════════ */
const Ticker = () => {
    const words = [
        'HEALTH SYSTEMS STRENGTHENING', '✦', 'PRIMARY HEALTH CARE', '✦',
        'POLICY FORMULATION', '✦', 'RMNCAH', '✦', 'CAPACITY BUILDING', '✦',
        'EVIDENCE-INFORMED STRATEGY', '✦', 'PARTNERSHIP FACILITATION', '✦',
        'PAN-AFRICAN REACH', '✦',
    ];
    const all = [...words, ...words];
    return (
        <div style={{ background: 'var(--G)', borderTop: '1px solid rgba(255,255,255,.07)', borderBottom: '1px solid rgba(255,255,255,.07)', overflow: 'hidden', padding: '16px 0' }}>
            <div className="aticker-track">
                {all.map((w, i) => (
                    <span key={i} style={{ whiteSpace: 'nowrap', padding: '0 clamp(12px,2vw,22px)', fontSize: 10, fontWeight: 700, letterSpacing: '.22em', color: w === '✦' ? 'var(--MT)' : 'rgba(255,255,255,.35)' }}>{w}</span>
                ))}
            </div>
        </div>
    );
};

/* ══════════════════════════════════════════════════════════════
   §5  FOUNDER — Institutional framing, blob-masked portrait
══════════════════════════════════════════════════════════════ */
const Founder = () => {
    const credentials = [
        'MBChB · University of Nairobi',
        'MMed Family Medicine · Valedictorian, Cuba',
        'M&E Certified · University of Washington',
        'PHC Master Trainer · MOH Kenya 2023',
        'KQMH TOT Certified · MOH Kenya 2024',
        'Global Public Health · SDG Academy',
        'KAFP National Council Member',
        'Kenya Red Cross Board · Nairobi Branch',
    ];

    return (
        <section style={{ background: 'var(--G4)', padding: 'clamp(72px,10vw,128px) 0', position: 'relative', overflow: 'hidden' }}>
            {/* Background glow */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 840, height: 840, borderRadius: '50%', background: 'radial-gradient(circle,rgba(168,213,188,.05) 0%,transparent 65%)', pointerEvents: 'none' }} />

            <W>
                <div className="amob-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px,7vw,100px)', alignItems: 'center' }}>

                    {/* LEFT — organic blob-masked photo */}
                    <R x={-32}>
                        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>

                            {/* Inline SVG blob clip definition */}
                            <svg width="0" height="0" style={{ position: 'absolute', overflow: 'hidden' }} aria-hidden="true">
                                <defs>
                                    <clipPath id="founderBlob" clipPathUnits="objectBoundingBox">
                                        <path d="M0.476,0.038 C0.636,-0.018 0.838,0.074 0.902,0.258 C0.966,0.442 0.922,0.658 0.782,0.780 C0.642,0.902 0.382,0.922 0.222,0.800 C0.062,0.678 -0.038,0.438 0.042,0.238 C0.122,0.038 0.316,0.094 0.476,0.038 Z" />
                                    </clipPath>
                                </defs>
                            </svg>

                            <div style={{ position: 'relative', width: '100%', maxWidth: 460 }}>

                                {/* Decorative ring behind blob */}
                                <div style={{ position: 'absolute', inset: -18, borderRadius: '50%', border: '1px solid rgba(168,213,188,.12)', pointerEvents: 'none' }} />
                                <div style={{ position: 'absolute', inset: -36, borderRadius: '50%', border: '1px solid rgba(168,213,188,.06)', pointerEvents: 'none' }} />

                                {/* Blob-masked founder image */}
                                <div style={{
                                    width: '100%',
                                    aspectRatio: '1 / 1.06',
                                    clipPath: 'url(#founderBlob)',
                                    backgroundImage: 'url(/images/oda3.jpeg)',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center top',
                                    backgroundColor: '#284849',
                                    boxShadow: '0 36px 88px rgba(0,0,0,.45)',
                                }} />

                                {/* Floating credential card — bottom right */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20, scale: .9 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: .58, ease: EASE, delay: .42 }}
                                    style={{
                                        position: 'absolute', bottom: '9%', right: '-20px',
                                        background: 'rgba(19,45,46,.94)', border: '1px solid rgba(168,213,188,.22)',
                                        borderRadius: 15, padding: '16px 20px',
                                        backdropFilter: 'blur(18px)', minWidth: 192,
                                        boxShadow: '0 12px 40px rgba(0,0,0,.3)',
                                    }}>
                                    <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--MINT)', marginBottom: 8 }}>Lead Consultant</p>
                                    <p className="serif" style={{ fontSize: 18, fontWeight: 500, color: '#fff', lineHeight: 1.2, marginBottom: 5 }}>Dr. Oda Conny Mirimo</p>
                                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,.44)', fontWeight: 300 }}>MBChB · MMed Valedictorian</p>
                                </motion.div>

                                {/* Floating experience badge — top left */}
                                <motion.div
                                    initial={{ opacity: 0, y: -16, scale: .9 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: .58, ease: EASE, delay: .56 }}
                                    style={{
                                        position: 'absolute', top: '11%', left: '-20px',
                                        background: 'rgba(200,169,110,.16)', border: '1px solid rgba(200,169,110,.32)',
                                        borderRadius: 13, padding: '12px 18px', backdropFilter: 'blur(12px)',
                                        boxShadow: '0 8px 28px rgba(0,0,0,.22)',
                                    }}>
                                    <div className="serif" style={{ fontSize: 32, fontWeight: 400, color: 'var(--GOLD)', lineHeight: 1 }}>15+</div>
                                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,.5)', fontWeight: 400, marginTop: 4, letterSpacing: '.04em' }}>Years expertise</div>
                                </motion.div>
                            </div>
                        </div>
                    </R>

                    {/* RIGHT — institutional narrative */}
                    <R x={32} d={.06}>
                        <p className="acaps" style={{ marginBottom: 22 }}>The Expertise Engine</p>

                        <h2 className="serif" style={{ fontSize: 'clamp(26px,3.8vw,50px)', fontWeight: 400, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 26 }}>
                            A decade of frontline expertise,
                            <em style={{ color: 'var(--MINT)', display: 'block' }}> channelled into Altura.</em>
                        </h2>

                        <p style={{ fontSize: 15.5, color: 'rgba(255,255,255,.58)', fontWeight: 300, lineHeight: 1.88, marginBottom: 20 }}>
                            Altura is powered by the experience of Dr. Oda Conny Mirimo — a Cuba-trained Family Physician and
                            Valedictorian who has held senior government leadership roles shaping health policy for millions of Kenyans.
                        </p>

                        <p style={{ fontSize: 15.5, color: 'rgba(255,255,255,.58)', fontWeight: 300, lineHeight: 1.88, marginBottom: 38 }}>
                            As Head of both the Primary Health Care and Family Health Divisions for Nairobi City County, Dr. Mirimo has
                            worked directly with UNICEF, WHO, UNFPA, USAID, and CDC/PEPFAR-supported programmes — across national
                            legislation, county implementation, and community delivery. Altura translates that intelligence into
                            consultancy that produces measurable, lasting change.
                        </p>

                        {/* Credential pills */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 38 }}>
                            {credentials.map(c => (
                                <span key={c} style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,.58)', letterSpacing: '.02em', padding: '5px 13px', borderRadius: 99, border: '1px solid rgba(255,255,255,.12)', background: 'rgba(255,255,255,.04)' }}>
                                    {c}
                                </span>
                            ))}
                        </div>

                        <Btn v="outline" href="/contact">
                            Work with us <ArrowUpRight size={13} strokeWidth={2} />
                        </Btn>
                    </R>
                </div>
            </W>
        </section>
    );
};

/* ══════════════════════════════════════════════════════════════
   §6  SERVICES — Bento Grid (3-col desktop → 1-col mobile)
══════════════════════════════════════════════════════════════ */
const Services = () => {
    const services = [
        { icon: <Activity size={20} strokeWidth={1.5} />, tag: 'Systems', title: 'Health Systems Strengthening', body: 'Designing and operationalising PHC networks, capacity building for county health management teams, and integrating services across the full care continuum.', span: 4, accent: false },
        { icon: <BookOpen size={20} strokeWidth={1.5} />, tag: 'Policy', title: 'Policy Formulation & Advocacy', body: 'Translating UHC legislation into operational frameworks, preparing advocacy materials for elected officials, and driving sensitisation at county and national executive levels.', span: 4, accent: false },
        { icon: <Heart size={20} strokeWidth={1.5} />, tag: 'Clinical Strategy', title: 'RMNCAH & Family Health', body: 'Maternal, neonatal, child, and adolescent health strategy. Family planning, sexual and reproductive health policy, and gender-based violence prevention frameworks.', span: 4, accent: false },
        { icon: <Users size={20} strokeWidth={1.5} />, tag: 'Capacity', title: 'Public Health Training & Capacity Building', body: 'TOT-certified Master Trainers in PHC and KQMH. Designing and delivering CMEs, operational research, and structured professional development for health workers.', span: 4, dark: true },
        { icon: <TrendingUp size={20} strokeWidth={1.5} />, tag: 'Planning', title: 'Programme Development & M&E', body: 'End-to-end programme design, annual work plan development, CIDP and sector strategic plan formulation, and monitoring frameworks with national and county governments.', span: 4, dark: true },
        { icon: <Cpu size={20} strokeWidth={1.5} />, tag: 'Health Tech', title: 'Health Technology Linkages', body: 'Strategic guidance on medical products, supply chain resilience, HTA, and integrating digital health tools into existing care pathways across Sub-Saharan Africa.', span: 4, dark: true },
        { icon: <Globe size={20} strokeWidth={1.5} />, tag: 'Partnerships', title: 'Stakeholder & Partnership Facilitation', body: 'Building coalitions with UN agencies, USAID-funded programmes, CDC/PEPFAR partners, and county and national governments across the African continent.', span: 6, accent: true },
        { icon: <Building2 size={20} strokeWidth={1.5} />, tag: 'Corporate', title: 'Corporate Wellness Strategy', body: 'Tailored wellness frameworks for organisations — integrating preventive care protocols, mental health policy, and employee health risk assessment into governance structures.', span: 6, accent: true },
    ];

    const cardBg = (s) => {
        if (s.dark) return { bg: 'rgba(19,45,46,.65)', br: '1px solid rgba(255,255,255,.09)' };
        if (s.accent) return { bg: 'rgba(168,213,188,.10)', br: '1px solid rgba(168,213,188,.22)' };
        return { bg: 'rgba(255,255,255,.04)', br: '1px solid rgba(255,255,255,.09)' };
    };

    return (
        <section style={{ background: 'var(--CR3)', padding: 'clamp(72px,10vw,120px) 0' }}>
            <W>
                <R style={{ marginBottom: 64 }}>
                    <div className="amob-stack" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'end' }}>
                        <div>
                            <p className="acaps" style={{ marginBottom: 16 }}>What We Do</p>
                            <h2 className="serif" style={{ fontSize: 'clamp(28px,4vw,54px)', fontWeight: 400, color: 'var(--TX)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                                Expertise built{' '}
                                <em style={{ color: 'var(--MT)' }}>at the frontline.</em>
                            </h2>
                            <p style={{ fontSize: 15, color: 'var(--TM)', fontWeight: 300, lineHeight: 1.8, marginTop: 14, maxWidth: 560 }}>
                                Every service we deliver is informed by real implementation experience — not theory.
                                We have operated within the systems we advise.
                            </p>
                        </div>
                        <div className="amob-hide">
                            <Btn v="gold" href="/services">All services <ArrowRight size={13} strokeWidth={2} /></Btn>
                        </div>
                    </div>
                </R>

                {/* 12-column bento */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12,1fr)', gap: 14 }}>
                    {services.map((s, i) => {
                        const { bg, br } = cardBg(s);
                        return (
                            <R key={s.title} d={i * .07} className="amob-full" style={{ gridColumn: `span ${s.span}` }}>
                                <div className="alift" style={{
                                    background: bg, border: br, borderRadius: 18,
                                    padding: 'clamp(24px,3vw,40px)',
                                    minHeight: 210, height: '100%',
                                    display: 'flex', flexDirection: 'column', gap: 20,
                                    backdropFilter: 'blur(10px)', cursor: 'default',
                                }}>
                                    {/* Tag + icon row */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(168,213,188,.12)', border: '1px solid rgba(168,213,188,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--MINT)', flexShrink: 0 }}>
                                            {s.icon}
                                        </div>
                                        <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--TM)', letterSpacing: '.14em', textTransform: 'uppercase', marginTop: 4 }}>{s.tag}</span>
                                    </div>
                                    <div>
                                        <h3 className="serif" style={{ fontSize: 'clamp(18px,2vw,24px)', fontWeight: 400, color: 'var(--TX)', marginBottom: 12, lineHeight: 1.22 }}>{s.title}</h3>
                                        <p style={{ fontSize: 14, color: 'var(--TM)', fontWeight: 300, lineHeight: 1.82 }}>{s.body}</p>
                                    </div>
                                </div>
                            </R>
                        );
                    })}
                </div>

                {/* Mobile CTA */}
                <R className="adesk-hide" d={.1} style={{ textAlign: 'center', marginTop: 32 }}>
                    <Btn v="gold" href="/services">All services <ArrowRight size={13} strokeWidth={2} /></Btn>
                </R>
            </W>
        </section>
    );
};

/* ══════════════════════════════════════════════════════════════
   §7  TIMELINE — "Our Journey"
══════════════════════════════════════════════════════════════ */
const TimelineCard = ({ e }) => (
    <div style={{
        background: e.active ? 'rgba(168,213,188,.08)' : 'rgba(255,255,255,.03)',
        border: e.active ? '1px solid rgba(168,213,188,.26)' : '1px solid rgba(255,255,255,.09)',
        borderRadius: 15, padding: 'clamp(18px,2.5vw,28px)',
        backdropFilter: 'blur(8px)',
    }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: e.active ? 'var(--MT)' : 'var(--TM)', letterSpacing: '.15em', textTransform: 'uppercase', marginBottom: 9 }}>{e.year}</p>
        <h4 className="serif" style={{ fontSize: 'clamp(16px,1.8vw,22px)', fontWeight: e.active ? 500 : 400, color: e.active ? '#fff' : 'var(--TX)', lineHeight: 1.25, marginBottom: 10 }}>{e.phase}</h4>
        <p style={{ fontSize: 13.5, color: 'var(--TM)', fontWeight: 300, lineHeight: 1.8 }}>{e.body}</p>
    </div>
);

const Timeline = () => {
    const events = [
        { year: '2009 – 2014', phase: 'Clinical Foundation', active: false, body: 'Medical training at the University of Nairobi, followed by intensive internship rotations — building the clinical bedrock that informs every strategy we develop.' },
        { year: '2015 – 2018', phase: 'Community & Primary Care Practice', active: false, body: 'Active family medicine and primary care delivery across Nairobi public and private facilities. Establishing community outreach, antenatal clinics, and NCD management.' },
        { year: '2019 – 2022', phase: 'Advanced Specialisation — Valedictorian', active: false, body: 'Postgraduate MMed in Family Medicine at Universidad de Ciencias Médicas de La Habana, Cuba — graduating as Valedictorian. Deepened expertise in health systems and policy.' },
        { year: '2022 – 2023', phase: 'Consultant Family Physician', active: false, body: 'Led the Outpatient and Family Medicine Department at Mama Lucy Kibaki Hospital. Supervised clinical interns and oversaw PCN home-based care follow-up.' },
        { year: '2023 – 2025', phase: 'National Health Policy Leadership', active: false, body: 'Appointed Head of both the Primary Health Care and Family Health Divisions, Nairobi City County. Led PHC rollout and coordinated with UNICEF, UNFPA, WHO, USAID, and CDC.' },
        { year: '2025 →', phase: 'Altura Health Strategies Founded', active: true, body: 'Established to channel over a decade of clinical, policy, and systems expertise into purpose-driven consultancy — bridging evidence, government, and communities for lasting change.' },
    ];

    return (
        <section style={{ background: 'var(--MT2)', padding: 'clamp(72px,10vw,120px) 0' }}>
            <W>
                <R style={{ textAlign: 'center', marginBottom: 72 }}>
                    <p className="acaps" style={{ marginBottom: 16 }}>Our Journey</p>
                    <h2 className="serif" style={{ fontSize: 'clamp(28px,4.5vw,56px)', fontWeight: 400, color: 'var(--TX)', lineHeight: 1.07, letterSpacing: '-0.02em' }}>
                        Over a decade of expertise,
                        <em style={{ color: 'var(--G)' }}> purpose-built.</em>
                    </h2>
                </R>

                {/* Desktop alternating timeline */}
                <div className="amob-hide" style={{ position: 'relative' }}>
                    {/* Vertical centre line */}
                    <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'rgba(30,61,48,.15)', transform: 'translateX(-50%)', pointerEvents: 'none' }} />

                    {events.map((e, i) => {
                        const left = i % 2 === 0;
                        return (
                            <R key={e.year} d={i * .07}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 48px 1fr', alignItems: 'center', marginBottom: 8 }}>
                                    {/* Left slot */}
                                    <div style={{ paddingRight: 36, textAlign: 'right' }}>
                                        {left && <TimelineCard e={e} />}
                                    </div>
                                    {/* Dot */}
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                                        <div className={e.active ? 'apulse' : ''} style={{ width: e.active ? 14 : 9, height: e.active ? 14 : 9, borderRadius: '50%', background: e.active ? 'var(--G)' : 'rgba(30,61,48,.4)', border: e.active ? '2px solid rgba(30,61,48,.6)' : 'none', flexShrink: 0 }} />
                                    </div>
                                    {/* Right slot */}
                                    <div style={{ paddingLeft: 36 }}>
                                        {!left && <TimelineCard e={e} />}
                                    </div>
                                </div>
                            </R>
                        );
                    })}
                </div>

                {/* Mobile stacked timeline */}
                <div className="adesk-hide" style={{ borderLeft: '2px solid rgba(30,61,48,.2)', paddingLeft: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {events.map((e, i) => (
                        <R key={e.year + 'm'} d={i * .06}>
                            <div style={{ position: 'relative' }}>
                                <div style={{ position: 'absolute', left: -37, top: 16, width: e.active ? 12 : 8, height: e.active ? 12 : 8, borderRadius: '50%', background: e.active ? 'var(--G)' : 'rgba(30,61,48,.5)' }} />
                                <TimelineCard e={e} />
                            </div>
                        </R>
                    ))}
                </div>
            </W>
        </section>
    );
};

/* ══════════════════════════════════════════════════════════════
   §8  IMPACT GALLERY
══════════════════════════════════════════════════════════════ */
const ImpactGallery = () => {
    const imgs = [
        { src: '/images/HealthForum.jpeg', cap: 'Health Systems Forum', sub: 'East Africa · 2025', span: 7, ratio: '4/3.4' },
        { src: '/images/Teamwork.jpeg', cap: 'Field - Work', sub: 'County Government · 2024', span: 5, ratio: '4/3.4' },
        { src: '/images/communityOutreach.jpeg', cap: 'Community Outreach Programme', sub: 'Nairobi County · 2024', span: 12, ratio: '16/6.5' },
    ];

    return (
        <section style={{ background: 'var(--WH)', padding: 'clamp(72px,10vw,120px) 0', borderTop: '1px solid var(--BD2)', borderBottom: '1px solid var(--BD2)' }}>
            <W>
                <R style={{ marginBottom: 56 }}>
                    <div className="amob-stack" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, alignItems: 'end' }}>
                        <div>
                            <p className="acaps" style={{ marginBottom: 16 }}>Work in Action</p>
                            <h2 className="serif" style={{ fontSize: 'clamp(28px,4vw,52px)', fontWeight: 400, color: 'var(--TX)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                                Making a measurable difference
                                <em style={{ color: 'var(--TC2)' }}> across communities.</em>
                            </h2>
                        </div>
                    </div>
                </R>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12,1fr)', gap: 14 }}>
                    {imgs.map((img, i) => (
                        <R key={img.cap} d={i * .08} className="amob-full" style={{ gridColumn: `span ${img.span}` }}>
                            <div className="alift" style={{ borderRadius: 18, overflow: 'hidden', position: 'relative', aspectRatio: img.ratio }}>
                                <img src={img.src} alt={img.cap} loading="lazy"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                                {/* Gradient overlay */}
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg,rgba(19,45,46,.82) 0%,rgba(19,45,46,.2) 50%,transparent 100%)' }} />
                                {/* Caption */}
                                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'clamp(16px,2.5vw,28px)' }}>
                                    <p style={{ fontSize: 9, fontWeight: 700, color: 'var(--MINT)', letterSpacing: '.15em', textTransform: 'uppercase', marginBottom: 7 }}>{img.sub}</p>
                                    <h4 className="serif" style={{ fontSize: 'clamp(16px,2vw,24px)', fontWeight: 400, color: '#fff', lineHeight: 1.2 }}>{img.cap}</h4>
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
   §9  STRATEGIC PARTNERSHIPS
══════════════════════════════════════════════════════════════ */
const Partnerships = () => {
    const groups = [
        { label: 'UN Agencies', partners: ['UNICEF', 'UNFPA', 'WHO'] },
        { label: 'US Government', partners: ['USAID Fahari ya Jamii', 'CDC / PEPFAR', 'CIHEB'] },
        { label: 'County & National', partners: ['Kenya MOH', 'Nairobi City County', 'Kirinyaga County', 'Machakos County'] },
        { label: 'Civil Society & Other', partners: ['Kenya Red Cross', 'KAFP', 'WONCA Kenya', 'SDG Academy'] },
    ];

    return (
        <section style={{ background: 'var(--MT)', padding: 'clamp(64px,8vw,104px) 0', borderTop: '1px solid rgba(255,255,255,.07)' }}>
            <W>
                <R style={{ textAlign: 'center', marginBottom: 56 }}>
                    <p className="acaps" style={{ marginBottom: 16 }}>Strategic Partnerships</p>
                    <h2 className="serif" style={{ fontSize: 'clamp(26px,3.8vw,50px)', fontWeight: 400, color: 'var(--TX)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                        Working across{' '}
                        <em style={{ color: 'var(--G)' }}>every tier of the system.</em>
                    </h2>
                    <p style={{ fontSize: 15, color: 'var(--TM)', fontWeight: 300, lineHeight: 1.8, maxWidth: 560, margin: '16px auto 0' }}>
                        Altura's work is strengthened by active partnerships with UN agencies, bilateral donors, and governments across the region.
                    </p>
                </R>

                <div className="amob-stack" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
                    {groups.map((g, i) => (
                        <R key={g.label} d={i * .07}>
                            <div className="aglass alift" style={{ borderRadius: 16, padding: 'clamp(20px,2.5vw,32px)', height: '100%' }}>
                                <p className="acaps" style={{ color: 'var(--TM)', marginBottom: 20 }}>{g.label}</p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                                    {g.partners.map(p => (
                                        <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                            <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--MT)', opacity: .6, flexShrink: 0 }} />
                                            <span style={{ fontSize: 14, color: 'var(--TX)', fontWeight: 400 }}>{p}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </R>
                    ))}
                </div>

                {/* Cream-toned "index-aligned" partner logos strip */}
                <R d={.15} style={{ marginTop: 40 }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', alignItems: 'center' }}>
                        {['UNICEF', 'WHO', 'UNFPA', 'USAID', 'Kenya MOH', 'Kenya Red Cross', 'AMREF', 'SDG Academy'].map((p, i) => (
                            <span key={p} style={{
                                fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
                                textTransform: 'uppercase', color: '#000',
                                padding: '8px 18px', border: '1px solid rgba(0,0,0,.15)',
                                borderRadius: 7, background: 'rgba(255,255,255,.9)',
                                transition: 'border-color .2s, color .2s',
                                cursor: 'default',
                            }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,.4)'; e.currentTarget.style.color = '#000'; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,.15)'; e.currentTarget.style.color = '#000'; }}>
                                {p}
                            </span>
                        ))}
                    </div>
                </R>
            </W>
        </section>
    );
};

/* ══════════════════════════════════════════════════════════════
   §10  CTA — "Inquire for Strategic Partnership"
══════════════════════════════════════════════════════════════ */
const CTA = () => (
    <section style={{
        background: 'linear-gradient(135deg,var(--TC1) 0%,var(--TC2) 100%)',
        padding: 'clamp(80px,12vw,128px) clamp(20px,5vw,56px)',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
    }}>
        {/* Glow */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center,rgba(168,213,188,.07) 0%,transparent 65%)', pointerEvents: 'none' }} />
        {/* Fine diagonal texture */}
        <div className="atex" style={{ position: 'absolute', inset: 0, opacity: .5, pointerEvents: 'none' }} />

        <R style={{ position: 'relative', maxWidth: 700, margin: '0 auto' }}>
            <p className="acaps" style={{ marginBottom: 24 }}>Begin a Conversation</p>

            <h2 className="serif" style={{ fontSize: 'clamp(30px,5vw,64px)', fontWeight: 400, color: '#fff', lineHeight: 1.08, letterSpacing: '-0.025em', marginBottom: 28 }}>
                Ready to build
                <em style={{ display: 'block', color: 'var(--MT)' }}> something that lasts?</em>
            </h2>

            <p style={{ fontSize: 'clamp(14px,1.5vw,17px)', color: 'rgba(255,255,255,.52)', fontWeight: 300, lineHeight: 1.88, maxWidth: 520, margin: '0 auto 52px' }}>
                Whether you're a county government, UN agency, NGO, or private organisation — if you're serious
                about sustainable health system change, let's talk.
            </p>

            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 36 }}>
                <Btn v="gold" href="mailto:alturahealth@outlook.com">
                    <Mail size={14} strokeWidth={2} /> Inquire for Strategic Partnership
                </Btn>
                <Btn v="outline" href="/services">
                    Explore our services <ArrowRight size={13} strokeWidth={2} />
                </Btn>
            </div>

            {/* Contact micro-line */}
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,.26)', letterSpacing: '.04em', lineHeight: 1.8 }}>
                alturahealth@outlook.com &nbsp;·&nbsp; P.O Box 70036 – 00400, Nairobi &nbsp;·&nbsp; +254 (0) 713 123 090
            </p>
        </R>
    </section>
);

/* ══════════════════════════════════════════════════════════════
   PAGE EXPORT
══════════════════════════════════════════════════════════════ */
export default function About() {
    return (
        <>
            <GlobalStyles />
            <main>
                <Hero />
                <Stats />
                <Foundation />
                <Ticker />
                <Founder />
                <Services />
                <Timeline />
                <ImpactGallery />
                <Partnerships />
                <CTA />
            </main>
        </>
    );
}