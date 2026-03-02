import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EM = "#50C878"; const EM2 = "#3daf64"; const GD = "#c8a96e";
const NAVY = "#060f1a"; const SL = "#0d1c2e"; const SL2 = "#132540"; const CR = "#f0ece3";

const BOOT_LOG = [
    { t: "ALTURA_HEALTH_OS v4.2.1  ...............  BOOTING", c: "rgba(80,200,120,.58)", d: 0 },
    { t: "BIOS_CHECK  .................................  OK", c: EM, d: 210 },
    { t: "INITIALIZING PHC_NETWORK_ARCH  .............  OK", c: EM, d: 450 },
    { t: "MOUNTING NAIROBI_COUNTY_FILESYSTEM", c: "rgba(139,172,210,.7)", d: 660 },
    { t: "LOADING UHC_ACT_COMPLIANCE_PROTOCOLS  ......  OK", c: EM, d: 900 },
    { t: "SYNCING COUNTY_HEALTH_NODES", c: "rgba(139,172,210,.7)", d: 1110 },
    { t: "  ↳ NAIROBI  ·  KIRINYAGA  ·  MACHAKOS  ....  OK", c: EM, d: 1260 },
    { t: "LOADING EmNOC_PROTOCOL_v4  ..................  OK", c: EM, d: 1430 },
    { t: "LINKING UNICEF / UNFPA / WHO / USAID / CDC", c: "rgba(139,172,210,.7)", d: 1600 },
    { t: "LOADING KQMH_QUALITY_MONITOR  ...............  OK", c: EM, d: 1750 },
    { t: "VERIFYING_VALEDICTORIAN_CREDENTIALS  ........  OK", c: GD, d: 1930 },
    { t: "eCHIS_INTEGRATION_LAYER  ....................  OK", c: EM, d: 2060 },
    { t: "RMNCAH_MODULE  ..............................  OK", c: EM, d: 2180 },
    { t: "PCN_NETWORK_STACK  ..........................  OK", c: EM, d: 2300 },
    { t: "─────────────────────────────────────────────────", c: "rgba(80,200,120,.18)", d: 2460 },
    { t: "ALL SYSTEMS NOMINAL  ·  DEPLOYING INTERFACE", c: CR, d: 2580 },
];

const ECG_PATH = "M0,28 L18,28 L24,28 L28,5 L33,51 L38,5 L43,28 L52,28 L58,28 L64,28 L68,14 L73,42 L78,14 L82,28 L92,28 L130,28";
const TILE_DATA = Array.from({ length: 80 }, () => ({ d: Math.random() * .4, dur: .22 + Math.random() * .28, s: .5 + Math.random() * .5 }));
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({ id: i, x: Math.random() * 100, y: Math.random() * 100, sz: Math.random() * 2.2 + .8, dur: Math.random() * 4 + 3, del: Math.random() * 2.5 }));

export default function App() {
    const [key, setKey] = useState(0);
    const [done, setDone] = useState(false);
    return (
        <div style={{ minHeight: "100vh", background: NAVY }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=DM+Sans:opsz,wght@9..40,300;9..40,400&family=JetBrains+Mono:wght@300;400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}body{background:${NAVY};overflow:hidden}
        @keyframes orbit{to{transform:rotate(360deg)}}
        @keyframes rorbit{to{transform:rotate(-360deg)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes scan{0%{top:-2px}100%{top:100%}}
        .blink{animation:blink 1.1s step-end infinite}
        .float{animation:float 3.8s ease-in-out infinite}
        .orbit{animation:orbit 22s linear infinite;transform-origin:center}
        .rorbit{animation:rorbit 15s linear infinite;transform-origin:center}
      `}</style>
            <AnimatePresence mode="wait">
                {!done
                    ? <SplashScreen key={key} onComplete={() => setDone(true)} />
                    : <motion.div key="app" initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: .8, ease: [.16, 1, .3, 1] }}
                        style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", textAlign: "center", padding: 40 }}>
                        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: EM, letterSpacing: ".2em", marginBottom: 18, opacity: .65 }}>ALL SYSTEMS NOMINAL · READY</div>
                        <div style={{ width: 44, height: 1, background: `linear-gradient(90deg,transparent,${EM},transparent)`, marginBottom: 20, opacity: .4 }} />
                        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(40px,6vw,72px)", fontWeight: 400, color: CR, letterSpacing: ".1em", marginBottom: 8 }}>ALTURA</h1>
                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 300, color: "rgba(240,236,227,.38)", letterSpacing: ".28em", marginBottom: 52 }}>HEALTH STRATEGIES LIMITED</p>
                        <motion.button whileHover={{ scale: 1.04, y: -1 }} whileTap={{ scale: .97 }}
                            onClick={() => { setDone(false); setKey(k => k + 1); }}
                            style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: ".14em", padding: "11px 28px", borderRadius: 99, background: "transparent", border: `1px solid rgba(80,200,120,.3)`, color: EM, cursor: "pointer" }}>
                            REPLAY_BOOT_SEQUENCE →
                        </motion.button>
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    );
}

function SplashScreen({ onComplete }) {
    const [phase, setPhase] = useState("in");
    const [progress, setProgress] = useState(0);
    const [logLines, setLogLines] = useState([]);
    const logRef = useRef(null);
    const doneRef = useRef(false);

    const exit = useCallback(() => {
        if (doneRef.current) return;
        doneRef.current = true;
        setProgress(100);
        setPhase("exit");
        setTimeout(() => onComplete?.(), 820);
    }, [onComplete]);

    useEffect(() => {
        let doc = false, mdt = false;
        const go = () => { if (doc && mdt) exit(); };
        const t1 = setTimeout(() => { mdt = true; go(); }, 2800);     // MDT — 2.8s demo
        const t2 = setTimeout(exit, 8000);                              // Safe-exit
        const onLoad = () => { doc = true; go(); };
        if (document.readyState === "complete") { doc = true; go(); }
        else window.addEventListener("load", onLoad);
        return () => { clearTimeout(t1); clearTimeout(t2); window.removeEventListener("load", onLoad); };
    }, [exit]);

    useEffect(() => {
        const t = setTimeout(() => setPhase(p => p === "in" ? "pulse" : p), 700);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        const ts = BOOT_LOG.map((_, i) =>
            setTimeout(() => {
                setLogLines(p => [...p, i]);
                if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
            }, BOOT_LOG[i].d + 300)
        );
        return () => ts.forEach(clearTimeout);
    }, []);

    useEffect(() => {
        [[8, 80], [20, 280], [34, 540], [49, 800], [63, 1080], [76, 1440], [87, 1760], [94, 2100], [98, 2450]].forEach(([to, d]) => {
            setTimeout(() => setProgress(p => Math.max(p, to)), d);
        });
    }, []);

    const pulse = phase === "pulse", exiting = phase === "exit";

    return (
        <motion.div initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.06, filter: "blur(16px)", transition: { duration: .72, ease: [.4, 0, 1, 1] } }}
            style={{
                position: "fixed", inset: 0, zIndex: 9999, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center",
                background: `radial-gradient(ellipse at 50% 36%, ${SL2} 0%, ${SL} 36%, ${NAVY} 100%)`
            }}>

            {/* Hex grid */}
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: .048 }}>
                <defs><pattern id="hx" width="56" height="48" patternUnits="userSpaceOnUse"><polygon points="28,2 52,14 52,34 28,46 4,34 4,14" fill="none" stroke={EM} strokeWidth=".8" /></pattern></defs>
                <rect width="100%" height="100%" fill="url(#hx)" />
            </svg>

            {/* Scanlines */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1, background: "repeating-linear-gradient(0deg,transparent 0,transparent 2px,rgba(0,0,0,.065) 2px,rgba(0,0,0,.065) 4px)" }} />

            {/* Horizontal sweep */}
            <div style={{
                position: "absolute", left: 0, right: 0, height: "1px", zIndex: 2, pointerEvents: "none",
                background: `linear-gradient(90deg,transparent,${EM},transparent)`, opacity: .13, animation: "scan 3.5s linear infinite"
            }} />

            {/* Radial spokes */}
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
                {Array.from({ length: 12 }, (_, i) => {
                    const a = (i * 30) * Math.PI / 180; return (
                        <motion.line key={i} x1="400" y1="300" x2={400 + Math.cos(a) * 520} y2={300 + Math.sin(a) * 520}
                            stroke="rgba(80,200,120,.035)" strokeWidth="1"
                            initial={{ pathLength: 0, opacity: 0 }} animate={pulse ? { pathLength: 1, opacity: 1 } : {}}
                            transition={{ duration: 1.4, delay: i * .05, ease: "easeOut" }} />
                    );
                })}
            </svg>

            {/* Particles */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
                {PARTICLES.map(p => (
                    <motion.div key={p.id} animate={pulse ? { opacity: [0, .55, 0], scale: [0, 1, 0], y: [0, -32, -64] } : {}}
                        transition={{ duration: p.dur, delay: p.del, repeat: Infinity, ease: "easeOut" }}
                        style={{ position: "absolute", left: `${p.x}%`, top: `${p.y}%`, width: p.sz, height: p.sz, borderRadius: "50%", background: EM }} />
                ))}
            </div>

            {/* Orbit rings */}
            <motion.div initial={{ opacity: 0, scale: .3 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, ease: [.16, 1, .3, 1], delay: .4 }}
                style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", zIndex: 2 }}>
                <div style={{ width: 280, height: 280, borderRadius: "50%", position: "relative" }}>
                    <div className="orbit" style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px dashed rgba(80,200,120,.1)" }}>
                        <div style={{ position: "absolute", top: -5, left: "50%", marginLeft: -5, width: 10, height: 10, borderRadius: "50%", background: EM, boxShadow: `0 0 12px ${EM},0 0 28px ${EM}55` }} />
                    </div>
                    <div className="rorbit" style={{ position: "absolute", inset: 20, borderRadius: "50%", border: "1px dashed rgba(80,200,120,.07)" }}>
                        <div style={{ position: "absolute", bottom: -4, right: "22%", width: 7, height: 7, borderRadius: "50%", background: GD, boxShadow: `0 0 8px ${GD}` }} />
                    </div>
                </div>
            </motion.div>

            {/* Side rails */}
            {["left", "right"].map(side => (
                <motion.div key={side} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: .5 }}
                    style={{ position: "absolute", top: "16%", bottom: "16%", [side]: 20, display: "flex", flexDirection: "column", justifyContent: "center", gap: 5, zIndex: 3 }}>
                    {Array.from({ length: 14 }).map((_, i) => (
                        <motion.div key={i} animate={{ opacity: [.06, .38, .06] }} transition={{ duration: 1.5 + i * .09, repeat: Infinity, delay: i * .12, ease: "easeInOut" }}
                            style={{ width: 2, height: i % 3 === 0 ? 14 : 8, background: EM, borderRadius: 99 }} />
                    ))}
                </motion.div>
            ))}

            {/* Corner brackets */}
            {[["tl", "top", "left"], ["tr", "top", "right"], ["bl", "bottom", "left"], ["br", "bottom", "right"]].map(([k, v, h]) => (
                <div key={k} style={{ position: "absolute", [v]: 16, [h]: 16, pointerEvents: "none", zIndex: 4 }}>
                    <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
                        <path d={v === "top" && h === "left" ? "M2,17 L2,2 L17,2" : v === "top" ? "M17,2 L32,2 L32,17" : h === "left" ? "M2,17 L2,32 L17,32" : "M17,32 L32,32 L32,17"}
                            stroke={EM} strokeWidth="1.5" strokeLinecap="square" opacity=".38" />
                    </svg>
                </div>
            ))}

            {/* ════════════ CENTRAL PANEL ════════════ */}
            <div className="float" style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: 430, padding: "0 24px" }}>

                {/* Status badge */}
                <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .25, ease: [.16, 1, .3, 1] }}
                    style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
                    <motion.div animate={{ opacity: [1, .2, 1] }} transition={{ duration: 1.8, repeat: Infinity }}
                        style={{ width: 6, height: 6, borderRadius: "50%", background: EM, boxShadow: `0 0 10px ${EM},0 0 22px ${EM}44` }} />
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "rgba(80,200,120,.6)", letterSpacing: ".2em" }}>
                        SYSTEM INITIALIZATION · BOOT_SEQ_4.2
                    </span>
                </motion.div>

                {/* Pulse node */}
                <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: 140, height: 140 }}>
                    {[82, 108, 136].map((sz, i) => (
                        <motion.div key={sz} style={{ position: "absolute", width: sz, height: sz, borderRadius: "50%", border: `1px solid ${EM}`, opacity: 0 }}
                            animate={pulse ? { scale: [1, 1.55, 1], opacity: [.44, 0, .44] } : {}}
                            transition={{ duration: 1, repeat: Infinity, delay: i * .3, ease: "easeOut" }} />
                    ))}
                    <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: .9, ease: [.34, 1.56, .64, 1] }}
                        style={{ position: "absolute", width: 90, height: 90, borderRadius: "50%", border: "1px solid rgba(80,200,120,.2)" }} />
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={exiting ? { scale: 2, opacity: 0, transition: { duration: .35, ease: [.55, 0, 1, .45] } } : { scale: 1, opacity: 1, transition: { duration: .95, ease: [.16, 1, .3, 1] } }}
                        style={{
                            position: "relative", width: 70, height: 70, borderRadius: "50%",
                            background: `radial-gradient(circle at 35% 32%, #74eeA0 0%, ${EM} 42%, ${EM2} 100%)`,
                            boxShadow: `0 0 0 3px rgba(80,200,120,.12),0 0 28px rgba(80,200,120,.55),0 0 80px rgba(80,200,120,.18)`,
                            display: "flex", alignItems: "center", justifyContent: "center"
                        }}>
                        <motion.div animate={pulse ? { scale: [1, 1.16, 1] } : {}} transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}>
                            <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
                                <path d="M12 21S3 14.5 3 8.5C3 5.42 5.42 3 8.5 3c1.74 0 3.31.9 3.5 2 .19-.1 1.76-2 3.5-2C18.58 3 21 5.42 21 8.5 21 14.5 12 21 12 21z"
                                    fill="rgba(255,255,255,.2)" stroke="rgba(255,255,255,.55)" strokeWidth="1.2" strokeLinejoin="round" />
                            </svg>
                        </motion.div>
                    </motion.div>
                </div>

                {/* ECG line */}
                <div style={{ width: "100%", display: "flex", justifyContent: "center", margin: "14px 0 6px" }}>
                    <svg width="210" height="58" viewBox="0 -8 130 58" style={{ overflow: "visible" }}>
                        <motion.path d={ECG_PATH} fill="none" stroke={EM} strokeWidth="4" strokeLinecap="round"
                            style={{ filter: "blur(6px)", opacity: .28 }}
                            initial={{ pathLength: 0 }} animate={pulse ? { pathLength: [0, 1, 1] } : {}}
                            transition={{ duration: 1.2, delay: .4, ease: "easeInOut", repeat: Infinity, repeatDelay: .85 }} />
                        <motion.path d={ECG_PATH} fill="none" stroke={EM} strokeWidth="1.8" strokeLinecap="round"
                            initial={{ pathLength: 0 }} animate={pulse ? { pathLength: [0, 1, 1] } : {}}
                            transition={{ duration: 1.2, delay: .4, ease: "easeInOut", repeat: Infinity, repeatDelay: .85 }} />
                    </svg>
                </div>

                {/* Logotype */}
                <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75, delay: .6, ease: [.16, 1, .3, 1] }}
                    style={{ textAlign: "center", marginBottom: 20 }}>
                    <h1 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 32, fontWeight: 400, color: CR, letterSpacing: ".12em", lineHeight: 1, marginBottom: 5 }}>ALTURA</h1>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9.5, fontWeight: 300, color: "rgba(240,236,227,.38)", letterSpacing: ".28em" }}>Health Strategies Limited</p>
                    <div style={{ width: 44, height: 1, background: `linear-gradient(90deg,transparent,${EM},transparent)`, margin: "9px auto 0", opacity: .42 }} />
                </motion.div>

                {/* Progress bar */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .72, duration: .4 }} style={{ width: "100%", marginBottom: 16 }}>
                    <div style={{ width: "100%", height: 2, background: "rgba(80,200,120,.09)", borderRadius: 99, overflow: "hidden", position: "relative" }}>
                        <motion.div animate={{ width: `${progress}%` }} transition={{ duration: .38, ease: [.4, 0, .2, 1] }}
                            style={{ height: "100%", borderRadius: 99, background: `linear-gradient(90deg,${EM2},${EM},#80f0a8)` }} />
                        <motion.div animate={{ left: ["-10%", "110%"] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: .3 }}
                            style={{ position: "absolute", top: 0, bottom: 0, width: 60, background: "linear-gradient(90deg,transparent,rgba(255,255,255,.5),transparent)" }} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 7 }}>
                        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8.5, color: "rgba(80,200,120,.42)", letterSpacing: ".14em" }}>LOADING_ASSETS</span>
                        <motion.span animate={{ opacity: [.55, 1, .55] }} transition={{ duration: 1.1, repeat: Infinity }}
                            style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8.5, color: EM, letterSpacing: ".14em", fontWeight: 600 }}>
                            {Math.round(progress)}%
                        </motion.span>
                    </div>
                </motion.div>

                {/* Boot terminal */}
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .85, duration: .45 }}
                    style={{ width: "100%", background: "rgba(0,0,0,.35)", borderRadius: 11, border: "1px solid rgba(80,200,120,.1)", overflow: "hidden" }}>
                    <div style={{ padding: "8px 14px", background: "rgba(255,255,255,.03)", borderBottom: "1px solid rgba(80,200,120,.07)", display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{ display: "flex", gap: 5 }}>
                            {["#ff6058", "#ffbd2e", "#28c941"].map(c => <div key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c, opacity: .65 }} />)}
                        </div>
                        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8.5, color: "rgba(255,255,255,.28)", letterSpacing: ".1em", marginLeft: 4 }}>altura_boot.sh — 80×14</span>
                        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 5 }}>
                            <motion.div animate={{ opacity: [1, .2, 1] }} transition={{ duration: 1.6, repeat: Infinity }} style={{ width: 5, height: 5, borderRadius: "50%", background: EM }} />
                            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8, color: "rgba(80,200,120,.5)", letterSpacing: ".1em" }}>RUNNING</span>
                        </div>
                    </div>

                    <div ref={logRef} style={{ padding: "12px 14px", height: 132, overflowY: "hidden", position: "relative" }}>
                        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 28, zIndex: 2, pointerEvents: "none", background: "linear-gradient(to bottom,rgba(0,0,0,.35),transparent)" }} />
                        {BOOT_LOG.map((line, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={logLines.includes(i) ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: .18, ease: "easeOut" }}
                                style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, lineHeight: 1.72, color: line.c, whiteSpace: "pre", letterSpacing: ".03em" }}>
                                <span style={{ color: "rgba(80,200,120,.28)", marginRight: 6, userSelect: "none" }}>›</span>{line.t}
                            </motion.div>
                        ))}
                    </div>

                    <div style={{ padding: "5px 14px 11px", fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, color: EM }}>
                        <span style={{ opacity: .38 }}>root@altura:~$</span>
                        <span className="blink" style={{ marginLeft: 5, fontWeight: 600 }}>▌</span>
                    </div>
                </motion.div>

                {/* Footer */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.05, duration: .4 }}
                    style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginTop: 13 }}>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8, color: "rgba(80,200,120,.3)", letterSpacing: ".1em" }}>MDT:1500ms · SAFE_EXIT:8s</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <motion.div animate={{ opacity: [1, .22, 1] }} transition={{ duration: .9, repeat: Infinity }}
                            style={{ width: 5, height: 5, borderRadius: "50%", background: exiting ? GD : EM, boxShadow: exiting ? `0 0 8px ${GD}` : `0 0 8px ${EM}` }} />
                        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8, color: exiting ? GD : "rgba(80,200,120,.5)", letterSpacing: ".12em", transition: "color .3s" }}>
                            {exiting ? "LAUNCHING..." : "BOOT_ACTIVE"}
                        </span>
                    </div>
                </motion.div>
            </div>

            {/* Pixel de-rez */}
            <AnimatePresence>
                {exiting && (
                    <motion.div key="dz" style={{ position: "absolute", inset: 0, zIndex: 20, pointerEvents: "none", display: "grid", gridTemplateColumns: "repeat(10,1fr)", gridTemplateRows: "repeat(8,1fr)" }}>
                        {TILE_DATA.map((t, i) => (
                            <motion.div key={i} initial={{ opacity: 1 }} animate={{ opacity: 0, scale: t.s }}
                                transition={{ duration: t.dur, delay: t.d, ease: "easeIn" }} style={{ background: `${NAVY}f5` }} />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}