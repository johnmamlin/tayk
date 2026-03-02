import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import {
    ArrowRight, Download, Terminal, AlertTriangle, CheckCircle,
    Zap, Network, Activity, FileText, Cpu, Link, Radio,
    ChevronDown, Users, Workflow,
} from 'lucide-react';

/* ══════════════════════════════════════════════════════════════
   RESOURCES.JSX — Altura Health Strategies
   SECTION RHYTHM:
     Hero      → Forest green  #1e3d30    → warm cream text (NEVER white)
     Ticker    → Near-black
     Module01  → Warm ivory    #f5f1eb    → dark forest text
     Module02  → Forest green  #1e3d30    → warm cream text (NEVER white)
     Module03  → Warm ivory    #ece7de    → dark forest text
     Module04  → Dark forest   #182f22    → warm cream text (NEVER white)
     Status    → Warm ivory    #f5f1eb    → dark forest text
     CTA       → Forest green  #1e3d30    → warm cream text (NEVER white)
══════════════════════════════════════════════════════════════ */

const G = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=JetBrains+Mono:wght@300;400;500;600&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      /* ── GREENS (from reference palette) ── */
      --G:   #1e3d30;
      --G2:  #2a4e40;
      --G3:  #3a6652;
      --G4:  #182f22;
      --G5:  #0f2019;

      /* ── GREEN SECTION text — warm, visible, NEVER white ── */
      --GH:  #e8ddc8;              /* warm cream headings         */
      --GB:  #c4b89a;              /* warm tan body               */
      --GS:  #8aaa96;              /* sage sub-text               */
      --GA:  #6ecb96;              /* bright mint accent on green */
      --GD:  #c8a660;              /* gold accent on green        */
      --GT:  rgba(196,184,154,.5); /* dim text on green           */
      --GBR: rgba(110,203,150,.18);
      --GBR2:rgba(110,203,150,.10);

      /* ── WHITE/IVORY SECTION backgrounds ── */
      --W1:  #f5f1eb;
      --W2:  #ece7de;

      /* ── WHITE SECTION text — dark forest, fully readable ── */
      --WH:  #0d2017;              /* near-black forest headings  */
      --WB:  #284035;              /* dark forest body            */
      --WS:  #4a6b5a;              /* mid forest sub-text         */
      --WA:  #1e3d30;              /* forest accent               */
      --WM:  #1d6640;              /* brighter forest mint        */
      --WD:  #7a5018;              /* dark gold                   */
      --WBR: rgba(30,61,48,.12);
      --WBR2:rgba(30,61,48,.07);

      /* ── Ticker / terminal strip ── */
      --TK:  #090f0b;

      /* ── Warning (terracotta) works on both ── */
      --TC:  #7a3518;
      --TC2: #b06228;
      --TC3: #f0d0a8;
    }

    html { scroll-behavior: smooth; }
    body {
      font-family: 'DM Sans', sans-serif;
      background: var(--G5);
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }
    .serif { font-family: 'Cormorant Garamond', Georgia, serif; }
    .mono  { font-family: 'JetBrains Mono', 'Fira Code', monospace; }
    a { color: inherit; text-decoration: none; }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--G5); }
    ::-webkit-scrollbar-thumb { background: var(--G3); border-radius: 99px; }

    /* Grid textures */
    .gtex {
      background-image:
        linear-gradient(rgba(110,203,150,.022) 1px, transparent 1px),
        linear-gradient(90deg, rgba(110,203,150,.022) 1px, transparent 1px);
      background-size: 44px 44px;
    }
    .wtex {
      background-image:
        linear-gradient(rgba(30,61,48,.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(30,61,48,.03) 1px, transparent 1px);
      background-size: 44px 44px;
    }
    .scanline::after {
      content: ''; position: absolute; inset: 0;
      background: repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,.05) 2px, rgba(0,0,0,.05) 4px);
      pointer-events: none; z-index: 1;
    }

    .tcaps { font-family: 'JetBrains Mono', monospace; font-size: 9px; font-weight: 500; letter-spacing: .16em; text-transform: uppercase; }
    .rcaps { font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: .22em; text-transform: uppercase; }

    /* Cards on GREEN sections */
    .gcard {
      background: rgba(255,255,255,.05);
      border: 1px solid rgba(110,203,150,.16);
      backdrop-filter: blur(12px);
    }
    /* Cards on WHITE sections */
    .wcard {
      background: #fff;
      border: 1px solid rgba(30,61,48,.09);
      box-shadow: 0 4px 28px rgba(30,61,48,.06);
    }

    /* Warning strips */
    .warn-g { background: rgba(122,53,24,.2); border-left: 3px solid var(--TC2); border-radius: 0 10px 10px 0; }
    .warn-w { background: rgba(122,53,24,.06); border-left: 3px solid var(--TC2); border-radius: 0 10px 10px 0; }

    /* Badges */
    .badge { display: inline-flex; align-items: center; gap: 5px; padding: 4px 10px; border-radius: 99px; font-size: 9px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; font-family: 'JetBrains Mono', monospace; }
    /* On green */
    .b-live  { background: rgba(74,222,128,.15);  color: #4ade80; border: 1px solid rgba(74,222,128,.3); }
    .b-gold  { background: rgba(200,166,96,.15);  color: #c8a660; border: 1px solid rgba(200,166,96,.3); }
    .b-mint  { background: rgba(110,203,150,.15); color: #6ecb96; border: 1px solid rgba(110,203,150,.28); }
    /* On white/ivory */
    .b-live-w { background: rgba(29,102,64,.1);   color: var(--WM); border: 1px solid rgba(29,102,64,.25); }
    .b-gold-w { background: rgba(122,80,24,.1);   color: var(--WD); border: 1px solid rgba(122,80,24,.22); }
    .b-mint-w { background: rgba(30,61,48,.08);   color: var(--WA); border: 1px solid rgba(30,61,48,.2); }

    /* Module numbers */
    .mod-g { font-family: 'Cormorant Garamond', serif; font-size: clamp(60px,8vw,100px); font-weight: 300; line-height: 1; letter-spacing: -.04em; color: rgba(255,255,255,.055); user-select: none; }
    .mod-w { font-family: 'Cormorant Garamond', serif; font-size: clamp(60px,8vw,100px); font-weight: 300; line-height: 1; letter-spacing: -.04em; color: rgba(30,61,48,.07); user-select: none; }

    /* Progress tracks */
    .pg-g { height: 3px; border-radius: 99px; background: rgba(255,255,255,.09); overflow: hidden; }
    .pg-w { height: 3px; border-radius: 99px; background: rgba(30,61,48,.1);  overflow: hidden; }

    /* Hover lift */
    .rlift { transition: transform .3s cubic-bezier(.2,.8,.2,1), box-shadow .3s; }
    .rlift:hover { transform: translateY(-5px); box-shadow: 0 22px 55px rgba(0,0,0,.16); }

    /* Blink cursor */
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
    .cursor { animation: blink 1.1s step-end infinite; }

    /* Gear rotation */
    @keyframes gear-cw  { from{transform:rotate(0deg)}   to{transform:rotate(360deg)} }
    @keyframes gear-ccw { from{transform:rotate(0deg)}   to{transform:rotate(-360deg)} }

    /* PCN dash flow */
    @keyframes dash-flow { to { stroke-dashoffset: -20; } }
    .path-flow { animation: dash-flow 2s linear infinite; }

    /* Ticker */
    @keyframes rticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
    .rticker-track { display: flex; width: max-content; animation: rticker 36s linear infinite; }
    .rticker-track:hover { animation-play-state: paused; }

    /* Link underline */
    .rlg { position: relative; display: inline-flex; align-items: center; gap: 5px; }
    .rlg::after { content: ''; position: absolute; bottom: -1px; left: 0; width: 0; height: 1px; background: currentColor; transition: width .3s; }
    .rlg:hover::after { width: 100%; }

    /* Responsive */
    @media (max-width: 1024px) { .r3col { grid-template-columns: repeat(2,1fr) !important; } }
    @media (max-width: 768px) {
      .rmob-hide { display: none !important; }
      .r3col { grid-template-columns: 1fr !important; }
      .r2col { grid-template-columns: 1fr !important; }
    }
  `}</style>
);

const EASE = [0.16, 1, 0.3, 1];
const EASE2 = [0.4, 0, 0.2, 1];

const Reveal = ({ children, d = 0, y = 24, x = 0, style = {}, className = '' }) => {
    const ref = useRef(null);
    const v = useInView(ref, { once: true, margin: '-48px' });
    return (
        <motion.div ref={ref} style={style} className={className}
            initial={{ opacity: 0, y, x }}
            animate={v ? { opacity: 1, y: 0, x: 0 } : {}}
            transition={{ duration: .62, ease: EASE, delay: d }}>
            {children}
        </motion.div>
    );
};

const W = ({ children, style = {} }) => (
    <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 clamp(20px,5vw,56px)', ...style }}>
        {children}
    </div>
);

/* Button — mode='g' for green sections, 'w' for white sections */
const Btn = ({ children, v = 'primary', mode = 'g', href = '#', sx = {} }) => {
    const maps = {
        g: {
            primary: { bg: 'var(--GD)', col: '#120a00', br: 'none' },
            secondary: { bg: 'rgba(255,255,255,.07)', col: 'var(--GH)', br: '1px solid rgba(110,203,150,.25)' },
        },
        w: {
            primary: { bg: 'var(--G)', col: '#e8ddc8', br: 'none' },
            secondary: { bg: 'transparent', col: 'var(--G)', br: '1.5px solid rgba(30,61,48,.5)' },
        },
    };
    const s = (maps[mode] || maps.g)[v] || maps.g.primary;
    return (
        <motion.a href={href} whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: .97 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 7, borderRadius: 99, padding: '11px 24px', fontSize: 13, fontWeight: 600, letterSpacing: '.04em', fontFamily: "'DM Sans',sans-serif", background: s.bg, color: s.col, border: s.br || 'none', cursor: 'pointer', transition: 'filter .2s', ...sx }}>
            {children}
        </motion.a>
    );
};

/* Terminal line — for dark/green-section terminal blocks */
const TermLine = ({ cmd, out, delay = 0 }) => {
    const ref = useRef(null);
    const v = useInView(ref, { once: true });
    return (
        <motion.div ref={ref} initial={{ opacity: 0 }} animate={v ? { opacity: 1 } : {}} transition={{ delay, duration: .3 }}
            style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.7, marginBottom: 4 }}>
            <span style={{ color: 'var(--GA)', opacity: .7 }}>{'> '}</span>
            <span style={{ color: 'var(--GB)' }}>{cmd}</span>
            {out && <div style={{ paddingLeft: 18, color: 'var(--GA)', opacity: .55, fontSize: 11 }}>{out}</div>}
        </motion.div>
    );
};

/* TechDebt — adapts via mode prop */
const TechDebt = ({ label, icon, mode = 'g' }) => {
    const cls = mode === 'g' ? 'warn-g' : 'warn-w';
    const body = mode === 'g' ? 'rgba(240,208,168,.72)' : 'rgba(80,38,10,.68)';
    const cap = mode === 'g' ? 'var(--TC2)' : 'var(--TC)';
    return (
        <div className={cls} style={{ padding: '10px 14px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <div style={{ color: cap, marginTop: 1, flexShrink: 0 }}>{icon || <AlertTriangle size={14} strokeWidth={2} />}</div>
            <div>
                <p className="tcaps" style={{ color: cap, marginBottom: 3 }}>Technical Debt</p>
                <p style={{ fontSize: 12.5, color: body, fontWeight: 300, lineHeight: 1.68 }}>{label}</p>
            </div>
        </div>
    );
};

/* Progress bar — adapts via mode */
const ProgressBar = ({ label, pct, delay = 0, mode = 'g' }) => {
    const ref = useRef(null);
    const v = useInView(ref, { once: true });
    const [hov, setHov] = useState(false);
    const lc = mode === 'g' ? 'var(--GS)' : 'var(--WS)';
    const vc = mode === 'g' ? 'var(--GA)' : 'var(--WM)';
    const trk = mode === 'g' ? 'pg-g' : 'pg-w';
    const grad = mode === 'g'
        ? 'linear-gradient(90deg,var(--G3),var(--GA))'
        : 'linear-gradient(90deg,var(--G2),var(--WM))';
    return (
        <div ref={ref} style={{ marginBottom: 14 }}
            onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                <span style={{ fontSize: 12, color: lc, fontFamily: "'JetBrains Mono',monospace" }}>{label}</span>
                <span style={{ fontSize: 11, color: vc, fontFamily: "'JetBrains Mono',monospace", fontWeight: 600 }}>{pct}%</span>
            </div>
            <div className={trk}>
                <motion.div style={{ height: '100%', borderRadius: 99, background: grad, transformOrigin: 'left' }}
                    initial={{ scaleX: 0 }}
                    animate={v || hov ? { scaleX: pct / 100 } : { scaleX: 0 }}
                    transition={{ duration: 1.1, ease: EASE, delay: delay + (hov ? 0 : .2) }}
                />
            </div>
        </div>
    );
};

/* ══════════════════════════════════════════════════════════════
   §1  HERO  ·  Forest Green — warm cream text
══════════════════════════════════════════════════════════════ */
const Hero = () => {
    const [typed, setTyped] = useState('');
    const full = 'initializing_resource_hub --mode=DEPLOY --target=NAIROBI_COUNTY';
    useEffect(() => {
        let i = 0;
        const t = setInterval(() => { setTyped(full.slice(0, i + 1)); i++; if (i >= full.length) clearInterval(t); }, 32);
        return () => clearInterval(t);
    }, []);

    const counters = [
        { v: '04', l: 'Architectural Assets', badge: 'DEPLOYED', bc: 'b-mint' },
        { v: '12+', l: 'System Protocols', badge: 'ACTIVE', bc: 'b-live' },
        { v: '300+', l: 'Clinicians Patched', badge: 'VERIFIED', bc: 'b-mint' },
        { v: '3', l: 'Counties Optimised', badge: 'LIVE', bc: 'b-live' },
    ];

    return (
        <section className="gtex scanline" style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden', background: 'var(--G)', paddingTop: 'clamp(100px,12vw,148px)', paddingBottom: 'clamp(64px,8vw,96px)' }}>
            {/* Radial glows */}
            <div style={{ position: 'absolute', top: '-12%', left: '50%', transform: 'translateX(-50%)', width: '80vw', height: '55vh', borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(58,102,82,.55) 0%,transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: 0, right: '-5%', width: 'clamp(220px,32vw,440px)', aspectRatio: '1', borderRadius: '50%', background: 'radial-gradient(circle,rgba(110,203,150,.06) 0%,transparent 65%)', pointerEvents: 'none' }} />

            <W style={{ position: 'relative', zIndex: 2 }}>
                {/* macOS chrome */}
                <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(0,0,0,.22)', border: '1px solid rgba(110,203,150,.14)', borderRadius: 10, padding: '8px 16px', marginBottom: 36 }}>
                    <div style={{ display: 'flex', gap: 5 }}>
                        {['#ff6058', '#ffbd2e', '#28c941'].map(c => <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c, opacity: .7 }} />)}
                    </div>
                    <span className="mono" style={{ fontSize: 11, color: 'var(--GH)', letterSpacing: '.08em' }}>altura_resource_hub.sh</span>
                </motion.div>

                {/* Terminal typing */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .2 }}
                    style={{ background: 'rgba(0,0,0,.32)', border: '1px solid rgba(110,203,150,.14)', borderRadius: 12, padding: '14px 20px', marginBottom: 44, maxWidth: 620, backdropFilter: 'blur(12px)' }}>
                    <p className="mono" style={{ fontSize: 12.5, color: 'var(--GA)', letterSpacing: '.04em' }}>
                        <span style={{ opacity: .38 }}>$</span> {typed}
                        <span className="cursor" style={{ color: 'var(--GA)' }}>▌</span>
                    </p>
                    <motion.p className="mono" initial={{ opacity: 0 }} animate={{ opacity: typed.length > 40 ? 1 : 0 }} transition={{ duration: .4 }}
                        style={{ fontSize: 11, color: 'rgba(110,203,150,.6)', marginTop: 6, letterSpacing: '.04em' }}>
                        ✓ [4/4] modules loaded · status: OPERATIONAL
                    </motion.p>
                </motion.div>

                <motion.p className="rcaps" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, delay: .08 }}
                    style={{ color: 'var(--GA)', marginBottom: 20 }}>
                    Altura Resource Hub · Architectural Assets
                </motion.p>

                <div className="r2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px,6vw,96px)', alignItems: 'center' }}>
                    <div>
                        <motion.h1 className="serif" initial={{ opacity: 0, y: 44 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: .14 }}
                            style={{ fontSize: 'clamp(36px,5.5vw,74px)', fontWeight: 400, color: 'var(--GH)', lineHeight: 1.04, letterSpacing: '-0.022em', marginBottom: 28 }}>
                            Deploying
                            <em style={{ display: 'block', color: 'var(--GA)' }}> System Upgrades</em>
                            <span style={{ color: 'var(--GB)' }}>to Kenya's Health OS.</span>
                        </motion.h1>

                        <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, ease: EASE, delay: .3 }}
                            style={{ fontSize: 'clamp(14px,1.5vw,17px)', fontWeight: 300, color: 'var(--GB)', lineHeight: 1.9, marginBottom: 40, maxWidth: 480 }}>
                            Healthcare systems are complex codebases. These are the patches, blueprints, and optimised protocols engineered to resolve operational entropy and eliminate system latency across Nairobi's primary care infrastructure.
                        </motion.p>

                        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, ease: EASE, delay: .42 }}
                            style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                            <Btn v="primary" mode="g" href="#modules">Access the Hub <ChevronDown size={13} strokeWidth={2} /></Btn>
                            <Btn v="secondary" mode="g" href="/contact">Request a custom briefing <ArrowRight size={13} strokeWidth={2} /></Btn>
                        </motion.div>
                    </div>

                    {/* Stats grid */}
                    <motion.div className="rmob-hide" initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .9, ease: EASE, delay: .24 }}
                        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        {counters.map((c, i) => (
                            <motion.div key={c.v} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, ease: EASE, delay: .36 + i * .08 }}
                                style={{ background: 'rgba(0,0,0,.22)', border: '1px solid rgba(110,203,150,.13)', borderRadius: 16, padding: 'clamp(16px,2vw,24px)', position: 'relative', overflow: 'hidden' }}>
                                <div style={{ position: 'absolute', top: 0, right: 0, width: 60, height: 60, background: 'radial-gradient(circle at top right,rgba(110,203,150,.07) 0%,transparent 70%)', pointerEvents: 'none' }} />
                                <div style={{ marginBottom: 10 }}><span className={`badge ${c.bc}`}>{c.badge}</span></div>
                                <div className="serif" style={{ fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 300, color: 'var(--GH)', lineHeight: 1, letterSpacing: '-0.02em' }}>{c.v}</div>
                                <div style={{ fontSize: 11, color: 'var(--GS)', marginTop: 7, fontWeight: 400, lineHeight: 1.5 }}>{c.l}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </W>
        </section>
    );
};

/* ══════════════════════════════════════════════════════════════
   §2  TICKER  ·  Near-black
══════════════════════════════════════════════════════════════ */
const Ticker = () => {
    const items = [
        'UHC_ACT_2023 → PATCH_DEPLOYED', '⬤', 'PCN_ARCHITECTURE → OPERATIONAL', '⬤',
        'EmNOC_PROTOCOL → ACTIVE', '⬤', 'STAKEHOLDER_MATRIX → COMPILED', '⬤',
        'KQMH_STANDARD → INTEGRATED', '⬤', 'eCHIS_MODULES → INSTALLED', '⬤',
        'RMNCAH_FRAMEWORK → RUNNING', '⬤', 'SYSTEM_STATUS → ALL_CLEAR', '⬤',
    ];
    const all = [...items, ...items];
    return (
        <div style={{ background: 'var(--TK)', borderTop: '1px solid rgba(110,203,150,.1)', borderBottom: '1px solid rgba(110,203,150,.1)', overflow: 'hidden', padding: '12px 0' }}>
            <div className="rticker-track">
                {all.map((w, i) => (
                    <span key={i} className="mono" style={{ whiteSpace: 'nowrap', padding: '0 clamp(10px,1.5vw,18px)', fontSize: 9.5, fontWeight: 500, letterSpacing: '.18em', color: w === '⬤' ? 'rgba(110,203,150,.45)' : 'rgba(110,203,150,.28)' }}>{w}</span>
                ))}
            </div>
        </div>
    );
};

/* ══════════════════════════════════════════════════════════════
   §3  MODULE 01  ·  Warm Ivory — dark forest text
══════════════════════════════════════════════════════════════ */
const DocumentUnfold = () => {
    const ref = useRef(null);
    const v = useInView(ref, { once: true });
    const lines = [
        { label: 'Part I: Legislative Framework', color: 'var(--WM)', w: '65%' },
        { label: 'Part II: County Health Mandates', color: 'var(--WD)', w: '80%' },
        { label: 'Part III: Facility Compliance', color: 'var(--WM)', w: '55%' },
        { label: 'Part IV: Implementation Roadmap', color: 'var(--WD)', w: '90%' },
        { label: 'Part V: M&E Framework', color: 'var(--WM)', w: '70%' },
    ];
    return (
        <div ref={ref} style={{ position: 'relative', width: '100%', maxWidth: 360, margin: '0 auto' }}>
            <motion.div initial={{ scaleY: 0 }} animate={v ? { scaleY: 1 } : {}} style={{ transformOrigin: 'top' }}
                transition={{ duration: .7, ease: EASE }}>
                <div style={{ background: '#fff', border: '1px solid var(--WBR)', borderRadius: 16, padding: 28, boxShadow: '0 8px 32px rgba(30,61,48,.07)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22, paddingBottom: 14, borderBottom: '1px solid var(--WBR2)' }}>
                        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(30,61,48,.07)', border: '1px solid var(--WBR)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--WA)' }}>
                            <FileText size={15} strokeWidth={1.8} />
                        </div>
                        <div>
                            <p className="mono" style={{ fontSize: 9, color: 'var(--WM)', letterSpacing: '.14em', marginBottom: 2 }}>UHC_DECRYPT_v2.3.pdf</p>
                            <p style={{ fontSize: 11, color: 'var(--WS)' }}>Decryption Blueprint</p>
                        </div>
                    </div>
                    {lines.map((ln, i) => (
                        <div key={i} style={{ marginBottom: 12 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                                <p style={{ fontSize: 10, color: 'var(--WB)', fontFamily: "'JetBrains Mono',monospace" }}>{ln.label}</p>
                                <span style={{ fontSize: 9, color: ln.color, fontFamily: "'JetBrains Mono',monospace", fontWeight: 600 }}>✓</span>
                            </div>
                            <div style={{ height: 2, background: 'rgba(30,61,48,.08)', borderRadius: 99, overflow: 'hidden' }}>
                                <motion.div initial={{ scaleX: 0 }} animate={v ? { scaleX: 1 } : {}}
                                    transition={{ duration: .8, ease: EASE, delay: .5 + i * .12 }}
                                    style={{ height: '100%', width: ln.w, background: ln.color, borderRadius: 99, transformOrigin: 'left' }} />
                            </div>
                        </div>
                    ))}
                    <motion.div initial={{ opacity: 0 }} animate={v ? { opacity: 1 } : {}} transition={{ delay: 1.4 }}
                        style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="badge b-live-w">● LIVE</span>
                        <span className="mono" style={{ fontSize: 9, color: 'var(--WS)' }}>rev_oct2023</span>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

const Module01 = () => (
    <section id="modules" className="wtex" style={{ padding: 'clamp(80px,10vw,120px) 0', background: 'var(--W1)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(30,61,48,.12),transparent)' }} />
        <W>
            <Reveal style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 48 }}>
                <div className="mod-w">01</div>
                <div style={{ borderLeft: '1px solid rgba(30,61,48,.15)', paddingLeft: 20 }}>
                    <span className="badge b-gold-w" style={{ marginBottom: 8, display: 'inline-flex' }}><Zap size={8} strokeWidth={2.5} /> LOGIC PATCH</span>
                    <h2 className="serif" style={{ fontSize: 'clamp(22px,3vw,40px)', fontWeight: 400, color: 'var(--WH)', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
                        The UHC 'Logic Patch'
                        <em style={{ color: 'var(--WM)', display: 'block', fontSize: '0.82em' }}> Policy & Strategy</em>
                    </h2>
                </div>
            </Reveal>

            <div className="r2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px,5vw,72px)', alignItems: 'start' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <TechDebt mode="w" label="Legislative Obfuscation — Kenya's UHC Acts (2023) assent created a logic gap between the national legislative mandate and facility-level compliance protocols, leaving county executives without a structured implementation pathway." />

                    <div className="wcard" style={{ borderRadius: 16, padding: 'clamp(20px,2.5vw,32px)' }}>
                        <p className="rcaps" style={{ color: 'var(--WM)', marginBottom: 14 }}>System Upgrade</p>
                        <h3 className="serif" style={{ fontSize: 'clamp(18px,2vw,26px)', fontWeight: 500, color: 'var(--WH)', marginBottom: 14, lineHeight: 1.3 }}>
                            UHC Act 2023 Decryption Blueprint
                        </h3>
                        <p style={{ fontSize: 14, color: 'var(--WB)', fontWeight: 300, lineHeight: 1.85, marginBottom: 20 }}>
                            A structured technical summary and implementation roadmap for county executives, CHMTs, and health workers — translating the legislative mandate into a step-by-step operational compliance framework. Validated across 3 counties post-assent.
                        </p>
                        {['UHC Act legislative summary (non-legal)', 'County compliance checklist (25 items)', 'CHMT sensitisation slide deck', 'Implementation timeline template'].map(item => (
                            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                <CheckCircle size={13} strokeWidth={2} color="var(--WM)" style={{ flexShrink: 0 }} />
                                <span style={{ fontSize: 13, color: 'var(--WB)', fontWeight: 300 }}>{item}</span>
                            </div>
                        ))}
                        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 20 }}>
                            <Btn v="primary" mode="w" href="/contact" sx={{ padding: '10px 20px' }}><Download size={13} strokeWidth={2} /> Request Access</Btn>
                            <Btn v="secondary" mode="w" href="/contact" sx={{ padding: '10px 20px' }}>Briefing session</Btn>
                        </div>
                    </div>

                    {/* Terminal block embedded in dark bg */}
                    <div style={{ background: 'var(--G5)', border: '1px solid rgba(110,203,150,.14)', borderRadius: 12, padding: '16px 20px' }}>
                        <p className="mono" style={{ fontSize: 9, color: 'rgba(110,203,150,.45)', marginBottom: 10, letterSpacing: '.14em' }}>// DEPLOYMENT_LOG</p>
                        <TermLine cmd="patch --county=nairobi --act=UHC_2023" out="✓ sensitised 120 CHMT officers" delay={.3} />
                        <TermLine cmd="patch --county=kirinyaga" out="✓ compliance checklist distributed" delay={.5} />
                        <TermLine cmd="patch --county=machakos" out="✓ county executive briefed, Oct 2023" delay={.7} />
                        <TermLine cmd="status --all" out="3/3 counties: COMPLIANT" delay={.9} />
                    </div>
                </div>

                <Reveal x={28} d={.12} style={{ position: 'sticky', top: 100 }}>
                    <DocumentUnfold />
                    <p className="mono" style={{ textAlign: 'center', fontSize: 10, color: 'var(--WS)', marginTop: 16, letterSpacing: '.12em' }}>
                        v2.3 · last_compiled: OCT_2023 · status: ACTIVE
                    </p>
                </Reveal>
            </div>
        </W>
    </section>
);

/* ══════════════════════════════════════════════════════════════
   §4  MODULE 02  ·  Forest Green — warm cream text
══════════════════════════════════════════════════════════════ */
const PCNDiagram = () => {
    const ref = useRef(null);
    const v = useInView(ref, { once: true });
    const cx = 180, cy = 180, r = 110;
    const spokes = [
        { label: 'Nairobi CBD', angle: -90 }, { label: 'Mathare', angle: -30 },
        { label: 'Eastleigh', angle: 30 }, { label: 'Kibera', angle: 90 },
        { label: 'Kasarani', angle: 150 }, { label: 'Westlands', angle: 210 },
    ];
    const toXY = (deg, rad) => ({ x: cx + rad * Math.cos(deg * Math.PI / 180), y: cy + rad * Math.sin(deg * Math.PI / 180) });
    return (
        <div ref={ref} style={{ display: 'flex', justifyContent: 'center' }}>
            <svg width="360" height="360" viewBox="0 0 360 360" fill="none">
                {[50, 80, 110].map((rr, i) => (
                    <motion.circle key={rr} cx={cx} cy={cy} r={rr} stroke="rgba(110,203,150,.1)" strokeWidth="1" fill="none"
                        initial={{ scale: 0, opacity: 0 }} animate={v ? { scale: 1, opacity: 1 } : {}}
                        transition={{ duration: .6, ease: EASE, delay: i * .08 }} />
                ))}
                {spokes.map((sp, i) => {
                    const { x, y } = toXY(sp.angle, r);
                    return (
                        <motion.line key={sp.label} x1={cx} y1={cy} x2={x} y2={y}
                            stroke="rgba(110,203,150,.18)" strokeWidth="1.2" strokeDasharray="4 4"
                            className="path-flow" style={{ animationDelay: `${i * .15}s` }}
                            initial={{ opacity: 0 }} animate={v ? { opacity: 1 } : {}}
                            transition={{ delay: .4 + i * .06, duration: .4 }} />
                    );
                })}
                {spokes.map((sp, i) => {
                    const { x, y } = toXY(sp.angle, r);
                    const lp = toXY(sp.angle, r + 28);
                    return (
                        <g key={sp.label + 'n'}>
                            <motion.circle cx={x} cy={y} r={7}
                                fill="rgba(12,28,20,.95)" stroke="rgba(110,203,150,.42)" strokeWidth="1.5"
                                initial={{ scale: 0 }} animate={v ? { scale: 1 } : {}}
                                transition={{ duration: .4, ease: EASE, delay: .6 + i * .08 }} />
                            <motion.circle cx={x} cy={y} fill="none" stroke="rgba(110,203,150,.26)" strokeWidth="1"
                                initial={{ r: 7, opacity: .8 }}
                                animate={v ? { r: [7, 18, 7], opacity: [.8, 0, .8] } : {}}
                                transition={{ duration: 2.5, repeat: Infinity, delay: i * .3, ease: 'easeOut' }} />
                            <text x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle"
                                style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8, fill: 'rgba(138,170,150,.58)', letterSpacing: '.08em' }}>
                                {sp.label.toUpperCase().replace(' ', '_')}
                            </text>
                        </g>
                    );
                })}
                <motion.circle cx={cx} cy={cy} r={30}
                    fill="rgba(12,28,20,.95)" stroke="rgba(110,203,150,.48)" strokeWidth="2"
                    initial={{ scale: 0 }} animate={v ? { scale: 1 } : {}} transition={{ duration: .5, ease: EASE, delay: .2 }} />
                <motion.circle cx={cx} cy={cy} r={30} fill="none" stroke="rgba(110,203,150,.16)" strokeWidth="1"
                    animate={v ? { r: [30, 50, 30], opacity: [.6, 0, .6] } : {}}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeOut' }} />
                <text x={cx} y={cy - 4} textAnchor="middle" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 7.5, fill: 'rgba(110,203,150,.85)', letterSpacing: '.08em' }}>PCN</text>
                <text x={cx} y={cy + 8} textAnchor="middle" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 7.5, fill: 'rgba(138,170,150,.55)', letterSpacing: '.08em' }}>HUB_NBI</text>
            </svg>
        </div>
    );
};

const Module02 = () => (
    <section className="gtex" style={{ padding: 'clamp(80px,10vw,120px) 0', background: 'var(--G)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(110,203,150,.14),transparent)' }} />
        <W>
            <Reveal style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 48 }}>
                <div className="mod-g">02</div>
                <div style={{ borderLeft: '1px solid rgba(110,203,150,.2)', paddingLeft: 20 }}>
                    <span className="badge b-mint" style={{ marginBottom: 8, display: 'inline-flex' }}><Radio size={8} strokeWidth={2.5} /> SYSTEM ARCHITECTURE</span>
                    <h2 className="serif" style={{ fontSize: 'clamp(22px,3vw,40px)', fontWeight: 400, color: 'var(--GH)', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
                        PCN 'System Architecture'
                        <em style={{ color: 'var(--GA)', display: 'block', fontSize: '0.82em' }}> Primary Healthcare</em>
                    </h2>
                </div>
            </Reveal>

            <div className="r2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px,5vw,72px)', alignItems: 'start' }}>
                <Reveal x={-28} d={.08}>
                    <div className="gcard" style={{ borderRadius: 20, padding: 'clamp(20px,2.5vw,28px)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                            <p className="mono" style={{ fontSize: 9.5, color: 'var(--GA)', letterSpacing: '.14em' }}>PCN_NETWORK_MAP · NAIROBI_COUNTY</p>
                            <span className="badge b-live">● LIVE</span>
                        </div>
                        <PCNDiagram />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 16 }}>
                            {[{ l: 'Network Latency', v: '<48hr', c: 'var(--GA)' }, { l: 'Node Coverage', v: '6 zones', c: 'var(--GD)' }, { l: 'eCHIS Sync', v: '100%', c: 'var(--GA)' }, { l: 'Integration Rate', v: 'Full', c: 'var(--GD)' }].map(m => (
                                <div key={m.l} style={{ background: 'rgba(0,0,0,.2)', border: '1px solid rgba(110,203,150,.1)', borderRadius: 10, padding: '10px 14px' }}>
                                    <p className="mono" style={{ fontSize: 8.5, color: 'var(--GS)', letterSpacing: '.12em', marginBottom: 4 }}>{m.l.toUpperCase()}</p>
                                    <p className="serif" style={{ fontSize: 20, color: m.c, fontWeight: 400 }}>{m.v}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Reveal>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <TechDebt mode="g" icon={<Network size={14} strokeWidth={2} />}
                        label="Protocol Decoupling — Hub-and-spoke models suffer from system latency during patient referrals. Disconnected subsystems between community health workers, sub-county nodes, and county hubs create care fragmentation and data gaps." />

                    <div className="gcard" style={{ borderRadius: 16, padding: 'clamp(20px,2.5vw,32px)' }}>
                        <p className="rcaps" style={{ color: 'var(--GA)', marginBottom: 14 }}>System Upgrade</p>
                        <h3 className="serif" style={{ fontSize: 'clamp(18px,2vw,26px)', fontWeight: 500, color: 'var(--GH)', marginBottom: 14, lineHeight: 1.3 }}>
                            PCN Operationalisation Toolkit
                        </h3>
                        <p style={{ fontSize: 14, color: 'var(--GB)', fontWeight: 300, lineHeight: 1.85, marginBottom: 20 }}>
                            End-to-end architecture kit: baseline assessment scripts, eCHIS integration maps, referral pathway diagrams, and CHMT capacity-building frameworks — designed for multidisciplinary PHC teams and sub-county health management units.
                        </p>
                        {['PCN baseline assessment script (50-point)', 'eCHIS integration map & onboarding guide', 'Referral pathway SOP templates', 'PHC multidisciplinary team role matrix', 'PCN readiness scorecard'].map(item => (
                            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                <CheckCircle size={13} strokeWidth={2} color="var(--GA)" style={{ flexShrink: 0 }} />
                                <span style={{ fontSize: 13, color: 'var(--GB)', fontWeight: 300 }}>{item}</span>
                            </div>
                        ))}
                        <div style={{ marginTop: 20 }}>
                            <Btn v="primary" mode="g" href="/contact" sx={{ padding: '10px 20px' }}><Download size={13} strokeWidth={2} /> Deploy Toolkit</Btn>
                        </div>
                    </div>
                </div>
            </div>
        </W>
    </section>
);

/* ══════════════════════════════════════════════════════════════
   §5  MODULE 03  ·  Warm Ivory — dark forest text
══════════════════════════════════════════════════════════════ */
const Module03 = () => {
    const protocols = [
        { label: 'EmNOC_PROTOCOL_v4', pct: 94, note: 'Emergency Obstetric & Neonatal Care' },
        { label: 'CONTRACEPTION_METHODS_v7', pct: 88, note: 'Modern Contraceptive Suite' },
        { label: 'DIABETES_MGMT_v3', pct: 82, note: 'Type 1 & 2 Community Protocols' },
        { label: 'MATERNAL_NUTRITION_v5', pct: 90, note: 'IYCF + Antenatal Nutrition' },
        { label: 'KQMH_COMPLIANCE_v2', pct: 96, note: 'Kenya Quality Model for Health' },
        { label: 'NCD_PREVENTION_v3', pct: 78, note: 'Hypertension + Diabetes Screening' },
    ];
    return (
        <section className="wtex" style={{ padding: 'clamp(80px,10vw,120px) 0', background: 'var(--W2)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(122,80,24,.16),transparent)' }} />
            <W>
                <Reveal style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 48 }}>
                    <div className="mod-w">03</div>
                    <div style={{ borderLeft: '1px solid rgba(122,80,24,.2)', paddingLeft: 20 }}>
                        <span className="badge b-gold-w" style={{ marginBottom: 8, display: 'inline-flex' }}><Cpu size={8} strokeWidth={2.5} /> KERNEL UPGRADE</span>
                        <h2 className="serif" style={{ fontSize: 'clamp(22px,3vw,40px)', fontWeight: 400, color: 'var(--WH)', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
                            Clinical 'Kernel Upgrades'
                            <em style={{ color: 'var(--WD)', display: 'block', fontSize: '0.82em' }}> Capacity Building</em>
                        </h2>
                    </div>
                </Reveal>

                <div className="r2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px,5vw,72px)', alignItems: 'start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        <TechDebt mode="w" icon={<Activity size={14} strokeWidth={2} />}
                            label="Knowledge Atrophy — High mortality rates in maternal and neonatal care are directly linked to outdated clinical protocols and skill-gap accumulation across facility staff. Without regular kernel upgrades, clinical performance degrades below safe thresholds." />

                        <div className="wcard" style={{ borderRadius: 16, padding: 'clamp(20px,2.5vw,32px)' }}>
                            <p className="rcaps" style={{ color: 'var(--WD)', marginBottom: 14 }}>System Upgrade</p>
                            <h3 className="serif" style={{ fontSize: 'clamp(18px,2vw,26px)', fontWeight: 500, color: 'var(--WH)', marginBottom: 14, lineHeight: 1.3 }}>
                                EmNOC & Contraceptive High-Performance Cards
                            </h3>
                            <p style={{ fontSize: 14, color: 'var(--WB)', fontWeight: 300, lineHeight: 1.85, marginBottom: 20 }}>
                                Rapid-access clinical protocol cards for emergency obstetric care and modern contraception — engineered for speed and accuracy under clinical pressure. Designed by a TOT Master Trainer who has deployed these protocols to 300+ healthcare workers across Nairobi County.
                            </p>
                            {['EmNOC rapid-response card set (laminated format)', 'Modern contraception method comparison matrix', 'Diabetes management pocket protocol (IDF-aligned)', 'KQMH facility self-assessment checklist', 'CME facilitator guide (4-hour session)'].map(item => (
                                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                    <CheckCircle size={13} strokeWidth={2} color="var(--WD)" style={{ flexShrink: 0 }} />
                                    <span style={{ fontSize: 13, color: 'var(--WB)', fontWeight: 300 }}>{item}</span>
                                </div>
                            ))}
                            <div style={{ marginTop: 20 }}>
                                <Btn v="primary" mode="w" href="/contact" sx={{ padding: '10px 20px' }}><Download size={13} strokeWidth={2} /> Access Protocol Cards</Btn>
                            </div>
                        </div>
                    </div>

                    <Reveal x={28} d={.1}>
                        <div className="wcard" style={{ borderRadius: 20, padding: 'clamp(22px,2.8vw,36px)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid var(--WBR2)' }}>
                                <p className="mono" style={{ fontSize: 9.5, color: 'var(--WD)', letterSpacing: '.14em' }}>KNOWLEDGE_ACQUISITION_METRICS</p>
                                <span className="badge b-mint-w">TOT CERTIFIED</span>
                            </div>
                            <p style={{ fontSize: 12, color: 'var(--WS)', marginBottom: 20, fontFamily: "'JetBrains Mono',monospace" }}>
                                // hover any bar to re-run simulation
                            </p>
                            {protocols.map((p, i) => (
                                <div key={p.label}>
                                    <ProgressBar mode="w" label={p.label} pct={p.pct} delay={i * .1} />
                                    <p style={{ fontSize: 10.5, color: 'var(--WS)', fontWeight: 300, marginTop: -8, marginBottom: 16 }}>↳ {p.note}</p>
                                </div>
                            ))}
                            <div style={{ marginTop: 8, padding: '12px 16px', background: 'rgba(29,102,64,.06)', border: '1px solid rgba(29,102,64,.15)', borderRadius: 10 }}>
                                <p className="mono" style={{ fontSize: 10, color: 'var(--WM)', letterSpacing: '.1em' }}>
                                    ✓ 300+ clinicians patched · avg competency score: 91.3%
                                </p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </W>
        </section>
    );
};

/* ══════════════════════════════════════════════════════════════
   §6  MODULE 04  ·  Dark Forest Green — warm cream text
══════════════════════════════════════════════════════════════ */
const GearDiagram = () => {
    const [active, setActive] = useState(false);
    const ref = useRef(null);
    const v = useInView(ref, { once: true });
    useEffect(() => { if (v) setActive(true); }, [v]);

    const GearSVG = ({ cx, cy, r, teeth = 10, dir = 'cw', fop = .08, sop = .35, l1, l2, small = false }) => {
        const th = r * .28;
        const pts = [];
        for (let i = 0; i < teeth; i++) {
            const a0 = (i / teeth) * 2 * Math.PI - Math.PI / 2, a1 = ((i + .35) / teeth) * 2 * Math.PI - Math.PI / 2;
            const a2 = ((i + .65) / teeth) * 2 * Math.PI - Math.PI / 2, a3 = ((i + 1) / teeth) * 2 * Math.PI - Math.PI / 2;
            pts.push(`${cx + r * Math.cos(a0)},${cy + r * Math.sin(a0)}`);
            pts.push(`${cx + (r + th) * Math.cos(a1)},${cy + (r + th) * Math.sin(a1)}`);
            pts.push(`${cx + (r + th) * Math.cos(a2)},${cy + (r + th) * Math.sin(a2)}`);
            pts.push(`${cx + r * Math.cos(a3)},${cy + r * Math.sin(a3)}`);
        }
        const spd = small ? '4s' : '6s';
        return (
            <g style={{ transformOrigin: `${cx}px ${cy}px`, animation: active ? `${dir === 'cw' ? 'gear-cw' : 'gear-ccw'} ${spd} linear infinite` : 'none' }}>
                <polygon points={pts.join(' ')} fill={`rgba(12,28,20,${fop})`} stroke={`rgba(110,203,150,${sop})`} strokeWidth="1" />
                <circle cx={cx} cy={cy} r={r * .45} fill="rgba(12,28,20,.92)" stroke={`rgba(110,203,150,${sop * .7})`} strokeWidth="1" />
                <circle cx={cx} cy={cy} r={r * .12} fill="rgba(110,203,150,.62)" />
                {l1 && <>
                    <text x={cx} y={cy - 6} textAnchor="middle" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: small ? 6 : 8, fill: 'rgba(196,184,154,.82)', letterSpacing: '.06em' }}>{l1}</text>
                    {l2 && <text x={cx} y={cy + 8} textAnchor="middle" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: small ? 5.5 : 7, fill: 'rgba(138,170,150,.56)' }}>{l2}</text>}
                </>}
            </g>
        );
    };

    return (
        <div ref={ref} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <div onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)} style={{ cursor: 'pointer' }}>
                <svg width="340" height="280" viewBox="0 0 340 280" fill="none">
                    <GearSVG cx={170} cy={140} r={55} teeth={16} dir="cw" fop={.15} sop={.45} l1="ALTURA" l2="HUB" />
                    <GearSVG cx={290} cy={90} r={34} teeth={10} dir="ccw" l1="UN" l2="AGENCIES" small />
                    <GearSVG cx={295} cy={195} r={30} teeth={9} dir="ccw" l1="USAID" l2="CDC" small />
                    <GearSVG cx={50} cy={90} r={34} teeth={10} dir="ccw" l1="COUNTY" l2="GOV" small />
                    <GearSVG cx={45} cy={195} r={30} teeth={9} dir="ccw" l1="KENYA" l2="MOH" small />
                    <motion.circle cx={170} cy={140} r={4} fill="rgba(110,203,150,.85)"
                        animate={active ? { r: [4, 8, 4], opacity: [.85, 0, .85] } : {}}
                        transition={{ duration: 2, repeat: Infinity }} />
                </svg>
                <p className="mono" style={{ textAlign: 'center', fontSize: 9.5, color: active ? 'var(--GA)' : 'var(--GT)', letterSpacing: '.14em', transition: 'color .3s' }}>
                    {active ? '● GEARS_ALIGNED · ROTATING' : '○ HOVER TO SYNCHRONISE'}
                </p>
            </div>
        </div>
    );
};

const Module04 = () => (
    <section className="gtex" style={{ padding: 'clamp(80px,10vw,120px) 0', background: 'var(--G4)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(110,203,150,.12),transparent)' }} />
        <W>
            <Reveal style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 48 }}>
                <div className="mod-g">04</div>
                <div style={{ borderLeft: '1px solid rgba(110,203,150,.2)', paddingLeft: 20 }}>
                    <span className="badge b-mint" style={{ marginBottom: 8, display: 'inline-flex' }}><Link size={8} strokeWidth={2.5} /> LINKAGE INTERFACE</span>
                    <h2 className="serif" style={{ fontSize: 'clamp(22px,3vw,40px)', fontWeight: 400, color: 'var(--GH)', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
                        Stakeholder 'Linkage Interface'
                        <em style={{ color: 'var(--GA)', display: 'block', fontSize: '0.82em' }}> Partnership Architecture</em>
                    </h2>
                </div>
            </Reveal>

            <div className="r2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px,5vw,72px)', alignItems: 'start' }}>
                <Reveal x={-28} d={.08}>
                    <div className="gcard" style={{ borderRadius: 20, padding: 'clamp(20px,2.5vw,28px)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                            <p className="mono" style={{ fontSize: 9.5, color: 'var(--GA)', letterSpacing: '.14em' }}>PARTNER_SYNC · ALIGNMENT_MATRIX</p>
                            <span className="badge b-live">● ACTIVE</span>
                        </div>
                        <GearDiagram />
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
                            {['UNICEF', 'UNFPA', 'WHO', 'USAID', 'CDC/PEPFAR', 'CIHEB', 'Kenya MOH', 'Nairobi CC'].map(p => (
                                <span key={p} className="mono"
                                    style={{ fontSize: 9, color: 'var(--GB)', padding: '4px 10px', borderRadius: 99, border: '1px solid rgba(110,203,150,.17)', background: 'rgba(110,203,150,.06)', letterSpacing: '.06em', transition: 'all .2s', cursor: 'default' }}
                                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(110,203,150,.14)'; e.currentTarget.style.color = 'var(--GH)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(110,203,150,.06)'; e.currentTarget.style.color = 'var(--GB)'; }}>
                                    {p}
                                </span>
                            ))}
                        </div>
                    </div>
                </Reveal>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <TechDebt mode="g" icon={<Workflow size={14} strokeWidth={2} />}
                        label="Siloed Redundancy — Fragmented parallel operations between UNICEF, WHO, USAID, and CDC create operational friction: duplicated field activities, misaligned reporting cycles, and missed co-financing opportunities. The system runs hot with inefficiency." />

                    <div className="gcard" style={{ borderRadius: 16, padding: 'clamp(20px,2.5vw,32px)' }}>
                        <p className="rcaps" style={{ color: 'var(--GA)', marginBottom: 14 }}>System Upgrade</p>
                        <h3 className="serif" style={{ fontSize: 'clamp(18px,2vw,26px)', fontWeight: 500, color: 'var(--GH)', marginBottom: 14, lineHeight: 1.3 }}>
                            Multisectoral Alignment Matrix
                        </h3>
                        <p style={{ fontSize: 14, color: 'var(--GB)', fontWeight: 300, lineHeight: 1.85, marginBottom: 20 }}>
                            A comprehensive directory and MOU review framework ensuring all implementing partners operate on a unified protocol — covering mandate deconfliction, M&E alignment, budget cycle synchronisation, and joint reporting standards. Built from direct MOU Review Committee experience in Nairobi's health sector.
                        </p>
                        {['Partner mandate mapping table (UNICEF/WHO/UNFPA/USAID/CDC)', 'MOU review checklist (32 compliance points)', 'Joint M&E indicator alignment framework', 'Budget cycle synchronisation calendar', 'Escalation & conflict resolution protocol'].map(item => (
                            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                <CheckCircle size={13} strokeWidth={2} color="var(--GA)" style={{ flexShrink: 0 }} />
                                <span style={{ fontSize: 13, color: 'var(--GB)', fontWeight: 300 }}>{item}</span>
                            </div>
                        ))}
                        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 20 }}>
                            <Btn v="primary" mode="g" href="/contact" sx={{ padding: '10px 20px' }}><Download size={13} strokeWidth={2} /> Access Matrix</Btn>
                            <Btn v="secondary" mode="g" href="/contact" sx={{ padding: '10px 20px' }}>Request alignment audit</Btn>
                        </div>
                    </div>

                    <div style={{ background: 'rgba(0,0,0,.22)', border: '1px solid rgba(110,203,150,.13)', borderRadius: 14, padding: '16px 20px' }}>
                        <p className="mono" style={{ fontSize: 9.5, color: 'var(--GA)', letterSpacing: '.14em', marginBottom: 12 }}>PARTNER_COVERAGE_METRICS</p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                            {[{ v: '10+', l: 'Partners aligned' }, { v: '100%', l: 'MOU compliance' }, { v: '5+', l: 'UN agencies active' }, { v: '3+', l: 'Counties covered' }].map(m => (
                                <div key={m.l} style={{ textAlign: 'center', padding: '10px', background: 'rgba(110,203,150,.07)', borderRadius: 10 }}>
                                    <div className="serif" style={{ fontSize: 24, color: 'var(--GA)', fontWeight: 400, lineHeight: 1 }}>{m.v}</div>
                                    <div style={{ fontSize: 11, color: 'var(--GS)', marginTop: 4 }}>{m.l}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </W>
    </section>
);

/* ══════════════════════════════════════════════════════════════
   §7  SYSTEM STATUS  ·  Warm Ivory — dark forest text
══════════════════════════════════════════════════════════════ */
const SystemStatus = () => {
    const checks = [
        { sys: 'UHC_COMPLIANCE_ENGINE', status: 'OPERATIONAL', v: '3 counties', color: 'var(--WM)' },
        { sys: 'PCN_NETWORK_STACK', status: 'OPERATIONAL', v: 'NBI/KIR/MAC', color: 'var(--WM)' },
        { sys: 'CLINICAL_KERNEL_v4', status: 'UPGRADED', v: '300+ nodes', color: 'var(--WD)' },
        { sys: 'PARTNER_SYNC_DAEMON', status: 'RUNNING', v: '10+ actors', color: 'var(--WM)' },
        { sys: 'RMNCAH_MODULE', status: 'ACTIVE', v: 'Full stack', color: 'var(--WM)' },
        { sys: 'KQMH_QUALITY_MONITOR', status: 'CERTIFIED', v: 'TOT_2024', color: 'var(--WD)' },
        { sys: 'eCHIS_INTEGRATION_LAYER', status: 'DEPLOYED', v: 'All PCNs', color: 'var(--WM)' },
        { sys: 'GLOBAL_HEALTH_CERTS', status: 'VALIDATED', v: 'UW/SDG/IDF', color: 'var(--WA)' },
    ];
    return (
        <section className="wtex" style={{ padding: 'clamp(64px,8vw,96px) 0', background: 'var(--W1)' }}>
            <W>
                <Reveal style={{ textAlign: 'center', marginBottom: 52 }}>
                    <p className="rcaps" style={{ color: 'var(--WM)', marginBottom: 14 }}>System Status · All Modules</p>
                    <h2 className="serif" style={{ fontSize: 'clamp(26px,4vw,50px)', fontWeight: 400, color: 'var(--WH)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                        All systems <em style={{ color: 'var(--WM)' }}>operational.</em>
                    </h2>
                </Reveal>
                <Reveal>
                    <div style={{ background: '#fff', border: '1px solid var(--WBR)', borderRadius: 18, overflow: 'hidden', boxShadow: '0 8px 40px rgba(30,61,48,.07)' }}>
                        {/* Header bar */}
                        <div style={{ padding: '12px 20px', background: 'var(--W2)', borderBottom: '1px solid var(--WBR2)', display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{ display: 'flex', gap: 6 }}>
                                {['#ff6058', '#ffbd2e', '#28c941'].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: .7 }} />)}
                            </div>
                            <span className="mono" style={{ fontSize: 11, color: 'var(--WS)', letterSpacing: '.1em' }}>altura_system_monitor · live_status</span>
                            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
                                <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--WM)' }} />
                                <span className="mono" style={{ fontSize: 10, color: 'var(--WM)' }}>ALL_CLEAR</span>
                            </div>
                        </div>
                        {checks.map((c, i) => (
                            <motion.div key={c.sys}
                                initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: .4, ease: EASE2, delay: i * .06 }}
                                style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: 24, padding: '14px 24px', borderBottom: i < checks.length - 1 ? '1px solid var(--WBR2)' : 'none', alignItems: 'center', transition: 'background .2s' }}
                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(30,61,48,.03)'}
                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: c.color, flexShrink: 0 }} />
                                    <span className="mono" style={{ fontSize: 11.5, color: 'var(--WB)', letterSpacing: '.06em' }}>{c.sys}</span>
                                </div>
                                <span className="mono" style={{ fontSize: 10, color: c.color, letterSpacing: '.1em' }}>{c.status}</span>
                                <span className="mono" style={{ fontSize: 10, color: 'var(--WS)', letterSpacing: '.06em', textAlign: 'right' }}>{c.v}</span>
                            </motion.div>
                        ))}
                    </div>
                </Reveal>
            </W>
        </section>
    );
};

/* ══════════════════════════════════════════════════════════════
   §8  CTA  ·  Forest Green — warm cream text
══════════════════════════════════════════════════════════════ */
const CTA = () => {
    const options = [
        { icon: <Download size={18} strokeWidth={1.5} />, t: 'Access All Resources', d: 'Request the full Altura Resource Vault — all four modules compiled into a single secured briefing package.', cta: 'Request access', href: '/contact' },
        { icon: <Terminal size={18} strokeWidth={1.5} />, t: 'Commission a Custom Brief', d: 'Need a resource engineered for your specific county, NGO, or programme mandate? We build bespoke advisory tools.', cta: 'Commission brief', href: '/contact' },
        { icon: <Users size={18} strokeWidth={1.5} />, t: 'Book a Live Session', d: 'A live capacity-building session or CME workshop delivered by a TOT Master Trainer — online or in-county.', cta: 'Book session', href: '/contact' },
    ];
    return (
        <section className="gtex" style={{ padding: 'clamp(80px,12vw,128px) clamp(20px,5vw,56px)', background: 'var(--G)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-12%', left: '50%', transform: 'translateX(-50%)', width: '80vw', height: '60vh', borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(58,102,82,.45) 0%,transparent 70%)', pointerEvents: 'none' }} />
            <Reveal style={{ position: 'relative', maxWidth: 760, margin: '0 auto' }}>
                <span className="badge b-mint" style={{ marginBottom: 22, display: 'inline-flex', margin: '0 auto 22px' }}>
                    <Zap size={9} strokeWidth={2.5} /> READY_TO_DEPLOY
                </span>
                <h2 className="serif" style={{ fontSize: 'clamp(28px,5vw,64px)', fontWeight: 400, color: 'var(--GH)', lineHeight: 1.07, letterSpacing: '-0.025em', margin: '0 auto 28px' }}>
                    Ready to upgrade
                    <em style={{ display: 'block', color: 'var(--GA)' }}> your system?</em>
                </h2>
                <p style={{ fontSize: 'clamp(14px,1.5vw,17px)', color: 'var(--GB)', fontWeight: 300, lineHeight: 1.9, maxWidth: 520, margin: '0 auto 52px' }}>
                    These tools are active blueprints — built from over a decade inside Kenya's health architecture. Whether you're a county government, NGO, or UN agency, Altura's resources are engineered for immediate deployment.
                </p>
                <div className="r3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 48, textAlign: 'left' }}>
                    {options.map(c => (
                        <div key={c.t} className="gcard rlift" style={{ borderRadius: 16, padding: 'clamp(18px,2.5vw,28px)', display: 'flex', flexDirection: 'column', gap: 14 }}>
                            <div style={{ width: 42, height: 42, borderRadius: 11, background: 'rgba(110,203,150,.1)', border: '1px solid rgba(110,203,150,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--GA)' }}>
                                {c.icon}
                            </div>
                            <h4 className="serif" style={{ fontSize: 19, fontWeight: 500, color: 'var(--GH)', lineHeight: 1.2 }}>{c.t}</h4>
                            <p style={{ fontSize: 13, color: 'var(--GB)', fontWeight: 300, lineHeight: 1.78, flexGrow: 1 }}>{c.d}</p>
                            <a href={c.href} className="rlg" style={{ fontSize: 13, fontWeight: 600, color: 'var(--GA)' }}>
                                {c.cta} <ArrowRight size={12} strokeWidth={2.2} />
                            </a>
                        </div>
                    ))}
                </div>
                <p style={{ fontSize: 12, color: 'var(--GT)', letterSpacing: '.04em', lineHeight: 1.8 }}>
                    alturahealth@outlook.com · P.O Box 70036 – 00400, Nairobi · +254 (0) 713 123 090
                </p>
            </Reveal>
        </section>
    );
};

/* ══════════════════════════════════════════════════════════════
   PAGE EXPORT
══════════════════════════════════════════════════════════════ */
export default function Resources() {
    return (
        <>
            <G />
            <main>
                <Hero />
                <Ticker />
                <Module01 />
                <Module02 />
                <Module03 />
                <Module04 />
                <SystemStatus />
                <CTA />
            </main>
        </>
    );
}