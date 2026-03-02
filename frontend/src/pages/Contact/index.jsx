import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
    ArrowRight, Mail, Phone, MapPin, CheckCircle, AlertCircle,
    User, Building2, ChevronDown, Globe, Shield, Award, Clock,
    Activity, Zap, Send, Terminal, Wifi, Radio, Loader2,
    Server, Lock, Star, Users, TrendingUp, ExternalLink,
    FileText, Network, Cpu, Layers,
} from 'lucide-react';

/* ══════════════════════════════════════════════════════════════
   CONTACT.JSX — Altura Health Strategies
   ─────────────────────────────────────────────────────────────
   Colour system — identical token set to Resources.jsx
   ─────────────────────────────────────────────────────────────
   Section rhythm:
     Hero          → Forest green  var(--G)    → warm cream text
     ContactSection→ Warm ivory    var(--W1)   → dark forest text
     MapSection    → Dark forest   var(--G4)   → warm cream text
     QuickIntel    → Warm ivory    var(--W2)   → dark forest text
══════════════════════════════════════════════════════════════ */

const GlobalStyles = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=JetBrains+Mono:wght@300;400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      /* ── GREENS (shared palette with Resources) ── */
      --G:   #1e3d30;
      --G2:  #2a4e40;
      --G3:  #3a6652;
      --G4:  #182f22;
      --G5:  #0f2019;

      /* ── GREEN SECTION text — warm, visible, NEVER white ── */
      --GH:  #e8ddc8;               /* warm cream headings          */
      --GB:  #c4b89a;               /* warm tan body                */
      --GS:  #8aaa96;               /* sage sub-text                */
      --GA:  #6ecb96;               /* bright mint accent           */
      --GD:  #c8a660;               /* gold accent                  */
      --GT:  rgba(196,184,154,.5);  /* dim text on green            */
      --GBR: rgba(110,203,150,.18); /* border on green              */
      --GBR2:rgba(110,203,150,.10);

      /* ── WHITE/IVORY SECTION backgrounds ── */
      --W1:  #f5f1eb;
      --W2:  #ece7de;
      --W3:  #ffffff;

      /* ── WHITE SECTION text — dark forest ── */
      --WH:  #0d2017;               /* headings                     */
      --WB:  #284035;               /* body                         */
      --WS:  #4a6b5a;               /* sub-text                     */
      --WA:  #1e3d30;               /* forest accent                */
      --WM:  #1d6640;               /* bright forest mint           */
      --WD:  #7a5018;               /* dark gold                    */
      --WBR: rgba(30,61,48,.12);
      --WBR2:rgba(30,61,48,.07);
      --WLL: #7a9488;               /* light label                  */

      /* ── Ticker / terminal dark strip ── */
      --TK:  #090f0b;
    }

    html { scroll-behavior: smooth; }

    body {
      font-family: 'DM Sans', sans-serif;
      background: var(--G5);
      color: var(--GH);
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }

    .serif { font-family: 'Cormorant Garamond', Georgia, serif; }
    .mono  { font-family: 'JetBrains Mono', 'Fira Code', monospace; }
    a { color: inherit; text-decoration: none; }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--G5); }
    ::-webkit-scrollbar-thumb { background: var(--G3); border-radius: 99px; }

    /* ── Caps utility ── */
    .ccaps { font-family:'JetBrains Mono',monospace; font-size:9.5px; font-weight:500; letter-spacing:.18em; text-transform:uppercase; }
    .rcaps { font-family:'DM Sans',sans-serif; font-size:10px; font-weight:700; letter-spacing:.20em; text-transform:uppercase; }

    /* ── Grid textures ── */
    .gtex {
      background-image:
        linear-gradient(rgba(110,203,150,.022) 1px,transparent 1px),
        linear-gradient(90deg,rgba(110,203,150,.022) 1px,transparent 1px);
      background-size: 40px 40px;
    }
    .wtex {
      background-image:
        linear-gradient(rgba(30,61,48,.028) 1px,transparent 1px),
        linear-gradient(90deg,rgba(30,61,48,.028) 1px,transparent 1px);
      background-size: 40px 40px;
    }
    .scanline::after {
      content:''; position:absolute; inset:0;
      background:repeating-linear-gradient(0deg,transparent 0,transparent 2px,rgba(0,0,0,.04) 2px,rgba(0,0,0,.04) 4px);
      pointer-events:none;
    }

    /* ── Cards on GREEN sections ── */
    .gcard {
      background: rgba(255,255,255,.055);
      border: 1px solid rgba(110,203,150,.16);
      backdrop-filter: blur(14px);
    }

    /* ── Cards on WHITE sections ── */
    .wcard {
      background: var(--W3);
      border: 1px solid var(--WBR);
      box-shadow: 0 4px 24px rgba(30,61,48,.07), 0 1px 4px rgba(30,61,48,.04);
    }

    /* ── Form field (white section) ── */
    .cfield {
      width:100%;
      background: var(--W1);
      border: 1.5px solid var(--WBR);
      border-radius: 10px;
      padding: 13px 16px;
      font-size: 14px;
      font-family:'DM Sans',sans-serif;
      color: var(--WH);
      transition: border-color .2s, box-shadow .2s, background .2s;
      outline: none;
      appearance: none;
      -webkit-appearance: none;
    }
    .cfield::placeholder { color: var(--WLL); }
    .cfield:focus {
      border-color: var(--WM);
      background: var(--W3);
      box-shadow: 0 0 0 3px rgba(29,102,64,.1);
    }

    select.cfield {
      cursor:pointer;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%234a6b5a' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 14px center;
      padding-right: 40px;
    }

    textarea.cfield { resize:vertical; min-height:120px; line-height:1.72; }

    /* ── Submit button ── */
    .cbtn-submit {
      display:inline-flex; align-items:center; justify-content:center;
      gap:8px; border-radius:10px; padding:14px 28px;
      font-size:14px; font-weight:700;
      font-family:'DM Sans',sans-serif;
      letter-spacing:.04em; cursor:pointer;
      border:none; width:100%;
      transition: all .3s cubic-bezier(.2,.8,.2,1);
    }
    .cbtn-idle {
      background: linear-gradient(135deg, var(--G), var(--G2));
      color: var(--GH);
      box-shadow: 0 6px 24px rgba(30,61,48,.28);
    }
    .cbtn-idle:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 32px rgba(30,61,48,.38);
    }
    .cbtn-loading {
      background: rgba(30,61,48,.12);
      color: var(--WS);
      box-shadow:none; cursor:not-allowed;
    }
    .cbtn-success {
      background: linear-gradient(135deg,var(--G),var(--G2));
      color: var(--GH);
      box-shadow: 0 6px 24px rgba(30,61,48,.22);
    }

    /* ── Status blink ── */
    @keyframes status-blink { 0%,100%{opacity:1} 50%{opacity:.3} }
    .status-live { animation: status-blink 2s ease-in-out infinite; }

    /* ── Hover lift ── */
    .clift { transition: transform .3s cubic-bezier(.2,.8,.2,1), box-shadow .3s; }
    .clift:hover { transform: translateY(-3px); box-shadow: 0 14px 40px rgba(0,0,0,.14); }

    /* ── FAQ accordion ── */
    .faq-row { border-bottom: 1px solid var(--WBR); }

    /* ── Link underline ── */
    .rlg { position:relative; display:inline-flex; align-items:center; gap:5px; }
    .rlg::after { content:''; position:absolute; bottom:-1px; left:0; width:0; height:1px; background:currentColor; transition:width .3s; }
    .rlg:hover::after { width:100%; }

    /* ── Responsive ── */
    @media (max-width:1024px) { .c3col{grid-template-columns:repeat(2,1fr)!important;} }
    @media (max-width:768px) {
      .cmob-hide{display:none!important;}
      .c3col{grid-template-columns:1fr!important;}
      .c2col{grid-template-columns:1fr!important;}
    }
  `}</style>
);

/* ─── Motion constants ── */
const EASE = [0.16, 1, 0.3, 1];
const EASE2 = [0.4, 0, 0.2, 1];

/* ─── Scroll reveal ── */
const R = ({ children, d = 0, y = 20, x = 0, style = {}, className = '' }) => {
    const ref = useRef(null);
    const v = useInView(ref, { once: true, margin: '-48px' });
    return (
        <motion.div ref={ref} style={style} className={className}
            initial={{ opacity: 0, y, x }}
            animate={v ? { opacity: 1, y: 0, x: 0 } : {}}
            transition={{ duration: .58, ease: EASE, delay: d }}>
            {children}
        </motion.div>
    );
};

const W = ({ children, style = {} }) => (
    <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 clamp(20px,5vw,56px)', ...style }}>
        {children}
    </div>
);

/* Field label — white-section variant (dark forest) */
const Label = ({ children, sub }) => (
    <div style={{ marginBottom: 8 }}>
        <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--WB)', letterSpacing: '.06em', textTransform: 'uppercase', fontFamily: "'DM Sans',sans-serif", display: 'flex', alignItems: 'center', gap: 6 }}>
            {children}
        </label>
        {sub && <p style={{ fontSize: 11.5, color: 'var(--WS)', fontWeight: 300, marginTop: 4 }}>{sub}</p>}
    </div>
);

/* ══════════════════════════════════════════════════════════════
   §1  HERO  ·  Forest Green — warm cream text
══════════════════════════════════════════════════════════════ */
const Hero = () => {
    const [tick, setTick] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setTick(p => p + 1), 1000);
        return () => clearInterval(t);
    }, []);
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-KE', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    const dateStr = now.toLocaleDateString('en-KE', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });

    return (
        <section className="gtex scanline" style={{
            background: `radial-gradient(ellipse at 30% 0%,rgba(58,102,82,.55) 0%,transparent 65%), var(--G)`,
            paddingTop: 'clamp(100px,12vw,148px)',
            paddingBottom: 'clamp(48px,6vw,72px)',
            position: 'relative', overflow: 'hidden',
        }}>
            {/* Glows */}
            <div style={{ position: 'absolute', top: '-10%', right: '-4%', width: 'clamp(240px,38vw,480px)', aspectRatio: '1', borderRadius: '50%', background: 'radial-gradient(circle,rgba(110,203,150,.07) 0%,transparent 68%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-12%', left: '-4%', width: 'clamp(200px,30vw,400px)', aspectRatio: '1', borderRadius: '50%', background: 'radial-gradient(circle,rgba(30,61,48,.4) 0%,transparent 64%)', pointerEvents: 'none' }} />

            <W style={{ position: 'relative', zIndex: 2 }}>
                {/* Status bar */}
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}
                    style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 36, flexWrap: 'wrap' }}>
                    {/* macOS chrome */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(0,0,0,.22)', border: '1px solid rgba(110,203,150,.14)', borderRadius: 10, padding: '7px 14px' }}>
                        <div style={{ display: 'flex', gap: 5 }}>
                            {['#ff6058', '#ffbd2e', '#28c941'].map(c => <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c, opacity: .7 }} />)}
                        </div>
                        <span className="mono" style={{ fontSize: 10.5, color: 'var(--GS)', letterSpacing: '.08em' }}>altura_contact_gateway.sh</span>
                    </div>
                    {/* Live clock */}
                    <div className="mono" style={{ fontSize: 11, color: 'var(--GT)', letterSpacing: '.12em', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div className="status-live" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--GA)', flexShrink: 0 }} />
                        SYSTEM_ONLINE · EAT {timeStr}
                    </div>
                    <div className="mono cmob-hide" style={{ fontSize: 10, color: 'var(--GT)', letterSpacing: '.1em' }}>
                        {dateStr.toUpperCase()}
                    </div>
                </motion.div>

                {/* Main content split */}
                <div className="c2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px,6vw,88px)', alignItems: 'end' }}>
                    <div>
                        <motion.p className="rcaps" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, delay: .06 }}
                            style={{ color: 'var(--GA)', marginBottom: 18 }}>
                            Contact Gateway · Altura Health Strategies
                        </motion.p>

                        <motion.h1 className="serif" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: .12 }}
                            style={{ fontSize: 'clamp(36px,5.5vw,72px)', fontWeight: 400, color: 'var(--GH)', lineHeight: 1.05, letterSpacing: '-0.022em', marginBottom: 24 }}>
                            Initiate a
                            <em style={{ display: 'block', color: 'var(--GA)' }}> Strategic Engagement.</em>
                        </motion.h1>

                        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, ease: EASE, delay: .26 }}
                            style={{ fontSize: 'clamp(14px,1.5vw,17px)', fontWeight: 300, color: 'var(--GB)', lineHeight: 1.88, maxWidth: 480 }}>
                            Route your payload to Dr. Oda Conny Mirimo — Family Physician, Valedictorian, and the operational architect behind Kenya's PHC network rollout. No intake forms. Just structured, high-signal engagement.
                        </motion.p>
                    </div>

                    {/* Right — quick endpoints */}
                    <motion.div className="cmob-hide" initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .8, ease: EASE, delay: .22 }}
                        style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {[
                            { icon: <Mail size={14} strokeWidth={1.8} />, label: 'PRIMARY_GATEWAY', val: 'alturahealth@outlook.com', href: 'mailto:alturahealth@outlook.com' },
                            { icon: <Phone size={14} strokeWidth={1.8} />, label: 'VOICE_COMMS', val: '+254 (0) 713 123 090', href: 'tel:+254713123090' },
                            { icon: <MapPin size={14} strokeWidth={1.8} />, label: 'BASE_COORDINATES', val: 'Nairobi, Kenya', href: '#map' },
                        ].map((ep, i) => (
                            <motion.a key={ep.label} href={ep.href}
                                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: .45, ease: EASE, delay: .34 + i * .08 }}
                                style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '13px 16px', borderRadius: 12, background: 'rgba(0,0,0,.2)', border: '1px solid rgba(110,203,150,.14)', transition: 'background .22s,border-color .22s' }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(110,203,150,.1)'; e.currentTarget.style.borderColor = 'rgba(110,203,150,.28)'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,.2)'; e.currentTarget.style.borderColor = 'rgba(110,203,150,.14)'; }}>
                                <div style={{ width: 36, height: 36, borderRadius: 9, background: 'rgba(110,203,150,.12)', border: '1px solid rgba(110,203,150,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--GA)', flexShrink: 0 }}>
                                    {ep.icon}
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <p className="mono" style={{ fontSize: 8.5, color: 'var(--GS)', letterSpacing: '.14em', marginBottom: 3 }}>{ep.label}</p>
                                    <p style={{ fontSize: 13.5, color: 'var(--GH)', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ep.val}</p>
                                </div>
                                <div className="status-live" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--GA)', flexShrink: 0 }} />
                            </motion.a>
                        ))}
                    </motion.div>
                </div>
            </W>

            {/* Bottom divider */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(110,203,150,.2),transparent)' }} />
        </section>
    );
};

/* ══════════════════════════════════════════════════════════════
   §2  CONTACT SECTION  ·  Warm Ivory — dark forest text
         Form card is white. Terminal inset stays dark.
══════════════════════════════════════════════════════════════ */
const SUBMIT_STATES = { idle: 'idle', loading: 'loading', success: 'success', error: 'error' };

const ContactForm = () => {
    const [form, setForm] = useState({ name: '', org: '', email: '', phone: '', module: '', friction: '', priority: 'standard' });
    const [submitState, setSubmitState] = useState(SUBMIT_STATES.idle);
    const [errors, setErrors] = useState({});

    const modules = [
        { v: 'nutrition', l: 'Nutrition & Family Health Optimisation' },
        { v: 'corporate', l: 'Corporate Wellness Systems' },
        { v: 'strategy', l: 'Health Strategy & Policy Architecture (UHC/AWP)' },
        { v: 'training', l: 'Public Health Training & Kernel Upgrades (EmNOC/KQMH)' },
        { v: 'phc', l: 'Primary Healthcare (PHC) Network Deployment' },
        { v: 'tech', l: 'Health Tech, Medical Products & Linkages' },
        { v: 'partnerships', l: 'Stakeholder & Partnership Facilitation' },
        { v: 'other', l: 'Other / Multi-module Engagement' },
    ];

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = 'Initiator name required';
        if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
        if (!form.module) e.module = 'Select a service module route';
        if (!form.friction.trim()) e.friction = 'System friction description required';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setSubmitState(SUBMIT_STATES.loading);
        await new Promise(r => setTimeout(r, 2800));
        setSubmitState(SUBMIT_STATES.success);
    };

    const update = k => e => {
        setForm(p => ({ ...p, [k]: e.target.value }));
        if (errors[k]) setErrors(p => ({ ...p, [k]: undefined }));
    };

    /* Section block header (reusable) */
    const BlockHead = ({ icon, label, color = 'var(--WM)' }) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <div style={{ width: 24, height: 24, borderRadius: 6, background: `${color}14`, border: `1px solid ${color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>
                {icon}
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--WB)', letterSpacing: '.1em', textTransform: 'uppercase', fontFamily: "'DM Sans',sans-serif" }}>{label}</span>
        </div>
    );

    const FieldError = ({ field }) => errors[field]
        ? <p style={{ fontSize: 11, color: '#b83030', marginTop: 5, display: 'flex', alignItems: 'center', gap: 5, fontFamily: "'DM Sans',sans-serif" }}><AlertCircle size={11} strokeWidth={2} />{errors[field]}</p>
        : null;

    return (
        <div className="wcard" style={{ borderRadius: 20, overflow: 'hidden' }}>
            {/* Form header — forest green bar */}
            <div style={{ padding: '16px 26px', borderBottom: '1px solid var(--WBR2)', background: 'var(--G)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Terminal size={13} strokeWidth={1.8} color="var(--GA)" />
                    <span className="mono" style={{ fontSize: 9.5, color: 'var(--GS)', letterSpacing: '.14em' }}>INGESTION_ENGINE · STRUCTURED_PAYLOAD</span>
                </div>
                <span className="mono" style={{ fontSize: 9, color: 'var(--GA)', opacity: .7, letterSpacing: '.1em' }}>v2.1 · ACTIVE</span>
            </div>

            {/* Form body — ivory bg */}
            <div style={{ padding: 'clamp(22px,3vw,36px)', background: 'var(--W1)' }}>
                <AnimatePresence mode="wait">
                    {submitState === SUBMIT_STATES.success ? (
                        <motion.div key="success"
                            initial={{ opacity: 0, scale: .95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: .4, ease: EASE }}
                            style={{ textAlign: 'center', padding: '40px 20px' }}>
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 200, delay: .1 }}
                                style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(29,102,64,.1)', border: '2px solid var(--WM)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                                <CheckCircle size={28} strokeWidth={1.8} color="var(--WM)" />
                            </motion.div>
                            <h3 className="serif" style={{ fontSize: 'clamp(22px,3vw,32px)', fontWeight: 400, color: 'var(--WH)', marginBottom: 12, lineHeight: 1.3 }}>
                                Payload Routed Successfully.
                            </h3>
                            <p style={{ fontSize: 14, color: 'var(--WS)', fontWeight: 300, lineHeight: 1.78, marginBottom: 20 }}>
                                Your engagement request has been transmitted to Dr. Oda Mirimo. You will receive a structured response within 24–48 hours via your registered endpoint.
                            </p>
                            <div className="mono" style={{ fontSize: 10, color: 'var(--WM)', letterSpacing: '.14em', padding: '8px 16px', background: 'rgba(29,102,64,.07)', border: '1px solid rgba(29,102,64,.18)', borderRadius: 8, display: 'inline-block' }}>
                                ✓ TRANSMISSION_CONFIRMED · REF_{Math.random().toString(36).slice(2, 9).toUpperCase()}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.form key="form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 22 }} noValidate>

                            {/* §A — Initiator Node */}
                            <div>
                                <BlockHead icon={<Server size={12} strokeWidth={2} />} label="Initiator Node" color="var(--WA)" />
                                <div className="c2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                                    <div>
                                        <Label>Full Name <span style={{ color: '#b83030', marginLeft: 2 }}>*</span></Label>
                                        <div style={{ position: 'relative' }}>
                                            <User size={14} strokeWidth={1.8} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--WLL)', pointerEvents: 'none' }} />
                                            <input className="cfield" type="text" placeholder="Dr. / Mr. / Ms. ..." value={form.name} onChange={update('name')} style={{ paddingLeft: 40 }} />
                                        </div>
                                        <FieldError field="name" />
                                    </div>
                                    <div>
                                        <Label>Organisation</Label>
                                        <div style={{ position: 'relative' }}>
                                            <Building2 size={14} strokeWidth={1.8} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--WLL)', pointerEvents: 'none' }} />
                                            <input className="cfield" type="text" placeholder="County Gov / NGO / Agency ..." value={form.org} onChange={update('org')} style={{ paddingLeft: 40 }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="c2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 14 }}>
                                    <div>
                                        <Label>Email Endpoint <span style={{ color: '#b83030', marginLeft: 2 }}>*</span></Label>
                                        <div style={{ position: 'relative' }}>
                                            <Mail size={14} strokeWidth={1.8} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--WLL)', pointerEvents: 'none' }} />
                                            <input className="cfield" type="email" placeholder="you@organisation.com" value={form.email} onChange={update('email')} style={{ paddingLeft: 40 }} />
                                        </div>
                                        <FieldError field="email" />
                                    </div>
                                    <div>
                                        <Label>Voice / Comms</Label>
                                        <div style={{ position: 'relative' }}>
                                            <Phone size={14} strokeWidth={1.8} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--WLL)', pointerEvents: 'none' }} />
                                            <input className="cfield" type="tel" placeholder="+254 ..." value={form.phone} onChange={update('phone')} style={{ paddingLeft: 40 }} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* §B — Service Module Route */}
                            <div style={{ borderTop: '1px solid var(--WBR2)', paddingTop: 22 }}>
                                <BlockHead icon={<Layers size={12} strokeWidth={2} />} label="Service Module Route" color="var(--WM)" />
                                <Label sub="Select the Altura service pillar most relevant to your engagement.">
                                    Route Target <span style={{ color: '#b83030', marginLeft: 2 }}>*</span>
                                </Label>
                                <select className="cfield" value={form.module} onChange={update('module')}>
                                    <option value="">— Select service module —</option>
                                    {modules.map(m => <option key={m.v} value={m.v}>{m.l}</option>)}
                                </select>
                                <FieldError field="module" />
                            </div>

                            {/* §C — Technical Friction */}
                            <div style={{ borderTop: '1px solid var(--WBR2)', paddingTop: 22 }}>
                                <BlockHead icon={<AlertCircle size={12} strokeWidth={2} />} label="Technical Friction" color="var(--WD)" />
                                <Label sub="Be specific. The more precise your signal, the more targeted the strategic response.">
                                    Describe current system bottlenecks / friction <span style={{ color: '#b83030', marginLeft: 2 }}>*</span>
                                </Label>
                                <textarea className="cfield"
                                    placeholder="e.g. Our county PHC networks are operationally fragmented — referral latency is high and eCHIS adoption has stalled. We need a structured deployment plan..."
                                    value={form.friction} onChange={update('friction')} />
                                <FieldError field="friction" />
                            </div>

                            {/* §D — Priority */}
                            <div style={{ borderTop: '1px solid var(--WBR2)', paddingTop: 22 }}>
                                <Label>Engagement Priority</Label>
                                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                                    {[
                                        { v: 'standard', l: 'Standard Engagement', sub: '3–5 day response' },
                                        { v: 'priority', l: 'Priority Route', sub: '24–48 hr response' },
                                        { v: 'urgent', l: 'Urgent Brief', sub: 'Same-day routing' },
                                    ].map(p => (
                                        <label key={p.v} style={{ flex: 1, minWidth: 120, cursor: 'pointer' }}>
                                            <input type="radio" name="priority" value={p.v} checked={form.priority === p.v} onChange={update('priority')} style={{ display: 'none' }} />
                                            <div style={{
                                                padding: '10px 14px', borderRadius: 10, textAlign: 'center',
                                                border: form.priority === p.v ? `1.5px solid var(--WM)` : '1.5px solid var(--WBR)',
                                                background: form.priority === p.v ? 'rgba(29,102,64,.07)' : 'var(--W3)',
                                                transition: 'all .2s',
                                            }}>
                                                <div style={{ fontSize: 12, fontWeight: 600, color: form.priority === p.v ? 'var(--WM)' : 'var(--WB)', marginBottom: 3 }}>{p.l}</div>
                                                <div className="mono" style={{ fontSize: 9.5, color: form.priority === p.v ? 'rgba(29,102,64,.65)' : 'var(--WLL)', letterSpacing: '.08em' }}>{p.sub}</div>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Submit */}
                            <div style={{ borderTop: '1px solid var(--WBR2)', paddingTop: 22 }}>
                                <button type="submit" className={`cbtn-submit ${submitState === SUBMIT_STATES.loading ? 'cbtn-loading' : 'cbtn-idle'}`} disabled={submitState !== SUBMIT_STATES.idle}>
                                    {submitState === SUBMIT_STATES.loading ? (
                                        <>
                                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                                                <Loader2 size={15} strokeWidth={2.2} />
                                            </motion.div>
                                            <span className="mono" style={{ letterSpacing: '.08em', fontSize: 12 }}>ROUTING PAYLOAD TO ARCHITECT...</span>
                                        </>
                                    ) : (
                                        <><Send size={15} strokeWidth={2.2} /> Transmit Strategic Engagement Request</>
                                    )}
                                </button>
                                <p style={{ fontSize: 11.5, color: 'var(--WS)', textAlign: 'center', marginTop: 12, fontWeight: 300, lineHeight: 1.6 }}>
                                    Secured transmission · Response within 24–48 hrs · No unsolicited follow-up
                                </p>
                            </div>
                        </motion.form>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

/* ── Credential Sidebar — white cards on ivory section ── */
const CredentialSidebar = () => {
    const specs = [
        { label: 'Qualification', val: 'MBChB · University of Nairobi' },
        { label: 'Postgraduate', val: 'MMed Family Medicine — Valedictorian' },
        { label: 'Institution', val: 'Universidad de Ciencias Médicas, Havana' },
        { label: 'Operational Role', val: 'Head, PHC & Family Health Divisions' },
        { label: 'Jurisdiction', val: 'Nairobi City County Government' },
        { label: 'M&E Certification', val: 'University of Washington, 2020' },
        { label: 'Quality Standard', val: 'KQMH TOT Certified — MOH Kenya 2024' },
        { label: 'PHC Master', val: 'National TOT — MOH Kenya 2023' },
    ];
    const partners = ['UNICEF', 'UNFPA', 'WHO', 'USAID', 'CDC/PEPFAR', 'Kenya MOH', 'KAFP', 'Red Cross'];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Lead Architect card */}
            <R>
                <div className="wcard" style={{ borderRadius: 18, overflow: 'hidden' }}>
                    {/* Card header — forest green bar */}
                    <div style={{ background: 'var(--G)', padding: '16px 22px', borderBottom: '1px solid rgba(110,203,150,.12)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Shield size={12} strokeWidth={1.8} color="var(--GA)" />
                            <span className="mono" style={{ fontSize: 9, color: 'var(--GS)', letterSpacing: '.14em' }}>LEAD_ARCHITECT · CREDENTIAL_SPEC</span>
                        </div>
                    </div>

                    {/* Portrait + name — white bg */}
                    <div style={{ padding: '20px 22px', borderBottom: '1px solid var(--WBR2)', background: 'var(--W3)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                            <div style={{ width: 54, height: 54, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '2px solid rgba(30,61,48,.22)', background: 'var(--W2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src="/images/oda3.jpeg" alt="Dr. Oda Conny Mirimo"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement.innerHTML = '<span style="font-family:Cormorant Garamond,serif;font-size:22px;font-style:italic;color:rgba(30,61,48,.55)">O</span>'; }} />
                            </div>
                            <div>
                                <h3 className="serif" style={{ fontSize: 'clamp(17px,2vw,21px)', fontWeight: 500, color: 'var(--WH)', lineHeight: 1.2, marginBottom: 4 }}>
                                    Dr. Oda Conny Mirimo
                                </h3>
                                <p style={{ fontSize: 12, color: 'var(--WS)', fontWeight: 400, lineHeight: 1.4 }}>MBChB · MMed (Valedictorian)</p>
                                <p style={{ fontSize: 11.5, color: 'var(--WM)', fontWeight: 500, marginTop: 2 }}>Founder & Lead Consultant</p>
                            </div>
                        </div>
                        {/* Status badges */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {[
                                { t: '✓ Cuba-Trained', c: 'rgba(29,102,64,.08)', tc: 'var(--WM)', bc: 'rgba(29,102,64,.22)' },
                                { t: '✓ Valedictorian', c: 'rgba(122,80,24,.08)', tc: 'var(--WD)', bc: 'rgba(122,80,24,.22)' },
                                { t: '✓ Policy Lead', c: 'rgba(30,61,48,.07)', tc: 'var(--WA)', bc: 'rgba(30,61,48,.18)' },
                                { t: '✓ KQMH TOT', c: 'rgba(29,102,64,.07)', tc: 'var(--WM)', bc: 'rgba(29,102,64,.2)' },
                            ].map(b => (
                                <span key={b.t} style={{ fontSize: 10.5, fontWeight: 600, color: b.tc, padding: '4px 10px', borderRadius: 99, background: b.c, border: `1px solid ${b.bc}`, fontFamily: "'DM Sans',sans-serif" }}>{b.t}</span>
                            ))}
                        </div>
                    </div>

                    {/* Spec list */}
                    <div style={{ padding: '16px 22px', background: 'var(--W3)', borderBottom: '1px solid var(--WBR2)' }}>
                        {specs.map((s, i) => (
                            <div key={s.label} style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: 10, padding: '7px 0', borderBottom: i < specs.length - 1 ? '1px solid var(--WBR2)' : 'none' }}>
                                <span style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--WLL)', textTransform: 'uppercase', letterSpacing: '.05em', fontFamily: "'DM Sans',sans-serif", lineHeight: 1.5 }}>{s.label}</span>
                                <span style={{ fontSize: 12.5, color: 'var(--WB)', fontWeight: 400, lineHeight: 1.5 }}>{s.val}</span>
                            </div>
                        ))}
                    </div>

                    {/* Partners */}
                    <div style={{ padding: '16px 22px', background: 'var(--W3)' }}>
                        <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--WLL)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 12, fontFamily: "'DM Sans',sans-serif" }}>Global Connectivity</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                            {partners.map(p => (
                                <span key={p} style={{ fontSize: 10.5, fontWeight: 600, color: 'var(--WB)', padding: '4px 10px', borderRadius: 7, background: 'var(--W1)', border: '1px solid var(--WBR)', fontFamily: "'DM Sans',sans-serif", transition: 'all .2s', cursor: 'default' }}
                                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(29,102,64,.08)'; e.currentTarget.style.borderColor = 'rgba(29,102,64,.28)'; e.currentTarget.style.color = 'var(--WM)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = 'var(--W1)'; e.currentTarget.style.borderColor = 'var(--WBR)'; e.currentTarget.style.color = 'var(--WB)'; }}>
                                    {p}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </R>

            {/* System Endpoints card */}
            <R d={.1}>
                <div className="wcard" style={{ borderRadius: 16, overflow: 'hidden' }}>
                    <div style={{ background: 'var(--G)', padding: '13px 20px', borderBottom: '1px solid rgba(110,203,150,.12)' }}>
                        <span className="mono" style={{ fontSize: 9, color: 'var(--GS)', letterSpacing: '.14em' }}>SYSTEM_ENDPOINTS · MANUAL_ACCESS</span>
                    </div>
                    <div style={{ padding: '16px 20px', background: 'var(--W3)', display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {[
                            { icon: <Mail size={14} strokeWidth={1.8} />, l: 'Primary Gateway', v: 'alturahealth@outlook.com', href: 'mailto:alturahealth@outlook.com', col: 'var(--WM)' },
                            { icon: <Phone size={14} strokeWidth={1.8} />, l: 'Voice / Comms', v: '+254 (0) 713 123 090', href: 'tel:+254713123090', col: 'var(--WA)' },
                            { icon: <MapPin size={14} strokeWidth={1.8} />, l: 'Base Coordinates', v: 'P.O Box 70036 – 00400, Nairobi', href: '#map', col: 'var(--WD)' },
                        ].map(ep => (
                            <a key={ep.l} href={ep.href}
                                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 10, background: 'var(--W1)', border: '1px solid var(--WBR)', transition: 'all .22s' }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'var(--W3)'; e.currentTarget.style.borderColor = 'rgba(29,102,64,.25)'; e.currentTarget.style.transform = 'translateX(3px)'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'var(--W1)'; e.currentTarget.style.borderColor = 'var(--WBR)'; e.currentTarget.style.transform = 'none'; }}>
                                <div style={{ width: 34, height: 34, borderRadius: 9, background: `rgba(30,61,48,.08)`, border: `1px solid rgba(30,61,48,.14)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: ep.col, flexShrink: 0 }}>
                                    {ep.icon}
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--WLL)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 2, fontFamily: "'DM Sans',sans-serif" }}>{ep.l}</p>
                                    <p style={{ fontSize: 13, color: 'var(--WH)', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ep.v}</p>
                                </div>
                                <ExternalLink size={12} strokeWidth={1.8} color="var(--WLL)" />
                            </a>
                        ))}
                    </div>
                </div>
            </R>

            {/* Availability */}
            <R d={.15}>
                <div className="wcard" style={{ borderRadius: 14, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14, background: 'var(--W3)' }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(29,102,64,.08)', border: '2px solid rgba(29,102,64,.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative' }}>
                        <Wifi size={16} strokeWidth={1.8} color="var(--WM)" />
                        <div className="status-live" style={{ position: 'absolute', top: -2, right: -2, width: 10, height: 10, borderRadius: '50%', background: 'var(--WM)', border: '2px solid var(--W3)' }} />
                    </div>
                    <div>
                        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--WH)', marginBottom: 3 }}>Available for Engagements</p>
                        <p style={{ fontSize: 12, color: 'var(--WS)', fontWeight: 300, lineHeight: 1.55 }}>Mon – Fri · 08:00–18:00 EAT<br />Response guaranteed within 24–48 hrs</p>
                    </div>
                </div>
            </R>
        </div>
    );
};

/* ── ContactSection wrapper ── */
const ContactSection = () => (
    <section id="form" className="wtex" style={{ padding: 'clamp(64px,8vw,100px) 0', background: 'var(--W1)', position: 'relative' }}>
        <W>
            <div className="c2col" style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: 'clamp(28px,4vw,52px)', alignItems: 'start' }}>
                {/* LEFT — Form */}
                <R>
                    <div style={{ marginBottom: 20 }}>
                        <p className="rcaps" style={{ color: 'var(--WM)', marginBottom: 12 }}>Ingestion Engine</p>
                        <h2 className="serif" style={{ fontSize: 'clamp(24px,3.5vw,44px)', fontWeight: 400, color: 'var(--WH)', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 14 }}>
                            Route a structured
                            <em style={{ color: 'var(--WM)' }}> payload.</em>
                        </h2>
                        <p style={{ fontSize: 14.5, color: 'var(--WB)', fontWeight: 300, lineHeight: 1.82 }}>
                            This is not a contact form. It is a structured intake engine designed to route high-signal engagement requests directly to the Lead Architect.
                        </p>
                    </div>
                    <ContactForm />
                </R>

                {/* RIGHT — Sidebar */}
                <div>
                    <R style={{ marginBottom: 20 }}>
                        <p className="rcaps" style={{ color: 'var(--WM)', marginBottom: 12 }}>Lead Architect</p>
                        <h2 className="serif" style={{ fontSize: 'clamp(22px,3vw,40px)', fontWeight: 400, color: 'var(--WH)', lineHeight: 1.12, letterSpacing: '-0.02em', marginBottom: 14 }}>
                            Technical
                            <em style={{ color: 'var(--WM)' }}> credentials.</em>
                        </h2>
                    </R>
                    <CredentialSidebar />
                </div>
            </div>
        </W>
    </section>
);

/* ══════════════════════════════════════════════════════════════
   §3  MAP SECTION  ·  Dark Forest Green — warm cream text
══════════════════════════════════════════════════════════════ */
const KENYA_PATH = `
  M 190 22 L 210 24 L 235 20 L 262 22 L 285 28 L 305 35 L 318 48
  L 325 60 L 340 72 L 355 80 L 368 96 L 375 115 L 372 132
  L 360 148 L 355 162 L 358 178 L 352 190 L 340 200
  L 330 215 L 318 228 L 305 242 L 295 258 L 285 272
  L 272 285 L 258 298 L 245 312 L 232 325 L 220 338
  L 208 350 L 196 362 L 186 375 L 175 388 L 165 400
  L 155 408 L 145 415 L 132 418 L 120 415 L 108 408
  L 98 398 L 88 385 L 78 370 L 70 355 L 62 338
  L 55 320 L 50 302 L 46 284 L 44 265 L 44 246
  L 46 228 L 50 210 L 54 192 L 58 175 L 62 158
  L 65 140 L 65 122 L 68 105 L 74 90 L 82 76
  L 92 64 L 104 54 L 118 46 L 135 38 L 152 30 L 170 24 Z
`;

const CITIES = [
    { id: 'nairobi', name: 'Nairobi', x: 188, y: 260, label1: 'Dr. Oda Mirimo', label2: 'Divisional Head — PHC & Family Health', label3: '300+ Clinicians Trained', role: 'BASE_OF_OPERATIONS', color: '#6ecb96', size: 9, delay: 0 },
    { id: 'kirinyaga', name: 'Kirinyaga', x: 214, y: 220, label1: 'Kirinyaga County', label2: 'PCN Network Deployed', label3: 'PHC Integration Complete', role: 'ACTIVE_NODE', color: '#7ab8e0', size: 7, delay: .4 },
    { id: 'machakos', name: 'Machakos', x: 218, y: 278, label1: 'Machakos County', label2: 'PCN Architecture Delivered', label3: 'UHC Sensitisation Complete', role: 'ACTIVE_NODE', color: '#7ab8e0', size: 7, delay: .8 },
];

const KenyaMap = () => {
    const [hovered, setHovered] = useState(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const ref = useRef(null);
    const v = useInView(ref, { once: true });

    return (
        <div ref={ref} style={{ position: 'relative', borderRadius: 18, overflow: 'hidden' }}>
            <div style={{ background: 'rgba(0,0,0,.25)', border: '1px solid rgba(110,203,150,.16)', borderRadius: 18, position: 'relative', overflow: 'hidden' }}
                onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); setMousePos({ x: e.clientX - r.left, y: e.clientY - r.top }); }}>

                {/* Header */}
                <div style={{ padding: '12px 20px', borderBottom: '1px solid rgba(110,203,150,.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <Globe size={13} strokeWidth={1.8} color="var(--GA)" />
                        <span className="mono" style={{ fontSize: 9.5, color: 'var(--GA)', letterSpacing: '.14em' }}>DEPLOYMENT_VIEW · KENYA_HEALTH_INFRASTRUCTURE</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div className="status-live" style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--GA)' }} />
                        <span className="mono" style={{ fontSize: 9, color: 'var(--GS)', letterSpacing: '.1em' }}>3 NODES ACTIVE</span>
                    </div>
                </div>

                {/* SVG */}
                <div style={{ padding: '16px 20px 20px', position: 'relative' }}>
                    <svg width="100%" viewBox="0 0 380 440" style={{ display: 'block', maxHeight: 360 }}>
                        <defs>
                            <pattern id="cGrid" x="0" y="0" width="38" height="38" patternUnits="userSpaceOnUse">
                                <path d="M 38 0 L 0 0 0 38" fill="none" stroke="rgba(110,203,150,.04)" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <rect width="380" height="440" fill="url(#cGrid)" />
                        {[100, 200, 300].map(y => (
                            <line key={y} x1="0" y1={y} x2="380" y2={y} stroke="rgba(110,203,150,.05)" strokeWidth="1" strokeDasharray="4 8" />
                        ))}
                        {[95, 190, 285].map(x => (
                            <line key={x} x1={x} y1="0" x2={x} y2="440" stroke="rgba(110,203,150,.05)" strokeWidth="1" strokeDasharray="4 8" />
                        ))}
                        <motion.path d={KENYA_PATH}
                            fill="rgba(30,61,48,.55)" stroke="rgba(110,203,150,.28)" strokeWidth="1.5" strokeLinejoin="round"
                            initial={{ opacity: 0 }} animate={v ? { opacity: 1 } : {}} transition={{ duration: .8, ease: EASE }} />
                        {[
                            { x1: CITIES[0].x, y1: CITIES[0].y, x2: CITIES[1].x, y2: CITIES[1].y },
                            { x1: CITIES[0].x, y1: CITIES[0].y, x2: CITIES[2].x, y2: CITIES[2].y },
                        ].map((ln, i) => (
                            <motion.line key={i} x1={ln.x1} y1={ln.y1} x2={ln.x2} y2={ln.y2}
                                stroke="rgba(110,203,150,.22)" strokeWidth="1" strokeDasharray="4 6"
                                initial={{ pathLength: 0, opacity: 0 }} animate={v ? { pathLength: 1, opacity: 1 } : {}}
                                transition={{ duration: 1, ease: EASE, delay: .6 + i * .2 }} />
                        ))}
                        {CITIES.map(city => (
                            <g key={city.id} style={{ cursor: 'pointer' }}
                                onMouseEnter={() => setHovered(city)} onMouseLeave={() => setHovered(null)}>
                                <motion.circle cx={city.x} cy={city.y} fill="none" stroke={city.color} strokeWidth="1"
                                    animate={v ? { r: [city.size, city.size + 14, city.size], opacity: [.6, 0, .6] } : {}}
                                    transition={{ duration: 2.5, repeat: Infinity, delay: city.delay, ease: 'easeOut' }} />
                                <motion.circle cx={city.x} cy={city.y} fill="none" stroke={city.color} strokeWidth="1"
                                    animate={v ? { r: [city.size, city.size + 22, city.size], opacity: [.4, 0, .4] } : {}}
                                    transition={{ duration: 2.5, repeat: Infinity, delay: city.delay + .8, ease: 'easeOut' }} />
                                <motion.circle cx={city.x} cy={city.y} r={city.size}
                                    fill={city.id === 'nairobi' ? city.color : 'rgba(122,184,224,.85)'}
                                    stroke={city.color} strokeWidth="2"
                                    initial={{ scale: 0 }} animate={v ? { scale: 1 } : {}}
                                    transition={{ duration: .5, ease: EASE, delay: .5 + city.delay }}
                                    style={{ filter: `drop-shadow(0 0 6px ${city.color}88)` }} />
                                <motion.text
                                    x={city.id === 'nairobi' ? city.x - 12 : city.x + 14}
                                    y={city.id === 'nairobi' ? city.y - 16 : city.y + 4}
                                    textAnchor={city.id === 'nairobi' ? 'middle' : 'start'}
                                    style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: city.id === 'nairobi' ? 9 : 8, fill: city.color, letterSpacing: '.08em', fontWeight: 600 }}
                                    initial={{ opacity: 0 }} animate={v ? { opacity: 1 } : {}}
                                    transition={{ delay: .8 + city.delay, duration: .4 }}>
                                    {city.name.toUpperCase()}
                                </motion.text>
                            </g>
                        ))}
                    </svg>

                    {/* Tooltip */}
                    <AnimatePresence>
                        {hovered && (
                            <motion.div
                                initial={{ opacity: 0, scale: .92, y: 6 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: .92, y: 6 }}
                                transition={{ duration: .18 }}
                                style={{ position: 'absolute', left: Math.min(mousePos.x + 12, 260), top: Math.max(mousePos.y - 70, 8), background: 'rgba(9,20,13,.96)', border: `1px solid ${hovered.color}44`, borderLeft: `3px solid ${hovered.color}`, borderRadius: 10, padding: '12px 16px', minWidth: 210, backdropFilter: 'blur(16px)', pointerEvents: 'none', zIndex: 10, boxShadow: '0 8px 32px rgba(0,0,0,.4)' }}>
                                <p className="mono" style={{ fontSize: 8, color: hovered.color, letterSpacing: '.14em', marginBottom: 6, opacity: .8 }}>{hovered.role}</p>
                                <p style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--GH)', marginBottom: 3 }}>{hovered.label1}</p>
                                <p style={{ fontSize: 12, color: 'var(--GB)', fontWeight: 300, lineHeight: 1.55, marginBottom: 3 }}>{hovered.label2}</p>
                                <p className="mono" style={{ fontSize: 10, color: hovered.color, opacity: .75 }}>↳ {hovered.label3}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Legend */}
                <div style={{ padding: '12px 20px', borderTop: '1px solid rgba(110,203,150,.08)', display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                    {[{ col: '#6ecb96', l: 'Base of Operations' }, { col: '#7ab8e0', l: 'Active Deployment Node' }].map(l => (
                        <div key={l.l} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                            <div style={{ width: 7, height: 7, borderRadius: '50%', background: l.col, boxShadow: `0 0 6px ${l.col}88` }} />
                            <span className="mono" style={{ fontSize: 9, color: 'var(--GS)', letterSpacing: '.1em' }}>{l.l.toUpperCase()}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const MapSection = () => (
    <section id="map" className="gtex" style={{ padding: 'clamp(64px,8vw,100px) 0', background: 'var(--G4)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(110,203,150,.14),transparent)' }} />
        <W style={{ position: 'relative' }}>
            <R style={{ textAlign: 'center', marginBottom: 52 }}>
                <p className="rcaps" style={{ color: 'var(--GA)', marginBottom: 14 }}>Geospatial Node Interface · System Deployment View</p>
                <h2 className="serif" style={{ fontSize: 'clamp(26px,4vw,52px)', fontWeight: 400, color: 'var(--GH)', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 16 }}>
                    Active nodes across
                    <em style={{ color: 'var(--GA)' }}> Kenya's health infrastructure.</em>
                </h2>
                <p style={{ fontSize: 15, color: 'var(--GB)', fontWeight: 300, lineHeight: 1.82, maxWidth: 560, margin: '0 auto' }}>
                    Hover any beacon to view deployment status and active programmes at each node. Green = Altura Base of Operations. Blue = Active Deployment Site.
                </p>
            </R>

            <div className="c2col" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 'clamp(24px,4vw,48px)', alignItems: 'start' }}>
                <R x={-24} d={.06}><KenyaMap /></R>

                <R x={24} d={.1}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        <p className="rcaps" style={{ color: 'var(--GS)', marginBottom: 6 }}>Node Deployment Status</p>

                        {CITIES.map(c => (
                            <div key={c.id} className="gcard clift" style={{ borderRadius: 14, padding: '16px 18px', borderColor: `${c.color}20` }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                                    <div style={{ position: 'relative', width: 32, height: 32, flexShrink: 0 }}>
                                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: `${c.color}18`, border: `1.5px solid ${c.color}55`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Radio size={13} strokeWidth={1.8} color={c.color} />
                                        </div>
                                        <div className="status-live" style={{ position: 'absolute', bottom: -1, right: -1, width: 9, height: 9, borderRadius: '50%', background: c.color, border: '1.5px solid rgba(15,32,25,.95)' }} />
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: 15, fontWeight: 600, color: 'var(--GH)', lineHeight: 1.2 }}>{c.name} County</h4>
                                        <p className="mono" style={{ fontSize: 8.5, color: c.color, letterSpacing: '.12em', marginTop: 2 }}>{c.role}</p>
                                    </div>
                                </div>
                                <div style={{ paddingLeft: 44 }}>
                                    <p style={{ fontSize: 12.5, color: 'var(--GB)', fontWeight: 300, lineHeight: 1.65, marginBottom: 6 }}>{c.label2}</p>
                                    <p className="mono" style={{ fontSize: 10, color: c.color, opacity: .75 }}>↳ {c.label3}</p>
                                </div>
                            </div>
                        ))}

                        {/* Expand CTA */}
                        <div className="gcard" style={{ borderRadius: 14, padding: '18px', textAlign: 'center', marginTop: 4 }}>
                            <p className="mono" style={{ fontSize: 9.5, color: 'var(--GS)', letterSpacing: '.12em', marginBottom: 12 }}>EXPAND_NETWORK?</p>
                            <p style={{ fontSize: 13.5, color: 'var(--GH)', fontWeight: 400, lineHeight: 1.65, marginBottom: 16 }}>
                                Request a deployment assessment for your county or programme area.
                            </p>
                            <motion.a href="#form" whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: .97 }}
                                style={{ display: 'inline-flex', alignItems: 'center', gap: 7, borderRadius: 99, padding: '11px 22px', fontSize: 12.5, fontWeight: 600, letterSpacing: '.04em', fontFamily: "'DM Sans',sans-serif", background: 'linear-gradient(135deg,var(--G),var(--G2))', color: 'var(--GH)', cursor: 'pointer' }}>
                                <MapPin size={13} strokeWidth={2} /> Request Node Assessment
                            </motion.a>
                        </div>
                    </div>
                </R>
            </div>
        </W>
    </section>
);

/* ══════════════════════════════════════════════════════════════
   §4  QUICK INTEL  ·  Warm Ivory — dark forest text
══════════════════════════════════════════════════════════════ */
const QuickIntel = () => {
    const [open, setOpen] = useState(null);
    const items = [
        { q: 'Who does Altura work with?', a: 'County and national governments, UN agencies (UNICEF, UNFPA, WHO), USAID-funded programmes, CDC/PEPFAR partners, NGOs, and private organisations with a health mandate across Sub-Saharan Africa.' },
        { q: 'What is the typical engagement timeline?', a: 'Initial strategic call within 48 hours of submission. Proposal delivery within 5–7 working days. Programme kickoff subject to scope — typically 2–4 weeks from contract execution.' },
        { q: 'Can Altura work across multiple counties simultaneously?', a: 'Yes. Altura has demonstrated capacity across Nairobi, Kirinyaga, and Machakos concurrently as National Master Trainer. Multi-county engagements are a core operational competency.' },
        { q: 'Does Altura offer bespoke resource development?', a: 'Yes — custom policy briefs, training curricula, MOU frameworks, CME programmes, and situational analyses are all commissioned on a project basis. Use the ingestion engine above to describe your friction.' },
    ];

    return (
        <section className="wtex" style={{ padding: 'clamp(56px,7vw,88px) 0', background: 'var(--W2)', borderTop: '1px solid var(--WBR2)' }}>
            <W>
                <R style={{ textAlign: 'center', marginBottom: 44 }}>
                    <p className="rcaps" style={{ color: 'var(--WM)', marginBottom: 14 }}>Quick Intel</p>
                    <h2 className="serif" style={{ fontSize: 'clamp(24px,3.8vw,48px)', fontWeight: 400, color: 'var(--WH)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                        Frequently asked
                        <em style={{ color: 'var(--WM)' }}> system queries.</em>
                    </h2>
                </R>

                <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 0 }}>
                    {items.map((item, i) => (
                        <R key={item.q} d={i * .06}>
                            <div className="faq-row">
                                <button onClick={() => setOpen(open === i ? null : i)}
                                    style={{ width: '100%', background: 'none', border: 'none', padding: 'clamp(16px,2.5vw,22px) 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, cursor: 'pointer', textAlign: 'left' }}>
                                    <span className="serif" style={{ fontSize: 'clamp(16px,2vw,21px)', fontWeight: 400, color: open === i ? 'var(--WM)' : 'var(--WH)', lineHeight: 1.3, transition: 'color .2s' }}>{item.q}</span>
                                    <motion.div animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: .25 }} style={{ flexShrink: 0 }}>
                                        <Zap size={15} strokeWidth={2} color={open === i ? 'var(--WM)' : 'var(--WBR)'} />
                                    </motion.div>
                                </button>
                                <AnimatePresence>
                                    {open === i && (
                                        <motion.div key="answer"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: .3, ease: EASE }}
                                            style={{ overflow: 'hidden' }}>
                                            <p style={{ fontSize: 14.5, color: 'var(--WB)', fontWeight: 300, lineHeight: 1.85, paddingBottom: 20 }}>{item.a}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </R>
                    ))}
                </div>
            </W>
        </section>
    );
};

/* ══════════════════════════════════════════════════════════════
   PAGE EXPORT
══════════════════════════════════════════════════════════════ */
export default function Contact() {
    return (
        <>
            <GlobalStyles />
            <main>
                <Hero />
                <ContactSection />
                <MapSection />
                <QuickIntel />
            </main>
        </>
    );
}