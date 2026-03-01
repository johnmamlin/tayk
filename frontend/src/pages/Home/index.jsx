import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, ChevronLeft, ChevronRight } from 'lucide-react';

/* ════════════════════════════════════════════
   GLOBAL STYLES
   Exact Parsley Health colour tokens:
   #1e3d30  dark forest green  → hero, footer, dark sections
   #f5f1ea  warm cream         → main light sections
   #d6ebe2  pale mint          → testimonial bg
   #e8ede8  very pale mint     → light-mint sections
   warm terracotta gradient    → "need help" CTA band
════════════════════════════════════════════ */
const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    :root{
      --G:  #1e3d30;
      --G2: #2a4e40;
      --CR: #f5f1ea;
      --CR2:#ede8df;
      --MT: #d6ebe2;
      --MT2:#e4f0ea;
      --TX: #1e3d30;
      --TM: #3a5448;
      --TL: #6b7f74;
      --BD: #ddd8cf;
      --WH: #ffffff;
      --TC1:#8b4a2b;
      --TC2:#c47840;
    }
    html{scroll-behavior:smooth;}
    body{background:var(--CR);color:var(--TX);font-family:'DM Sans',sans-serif;-webkit-font-smoothing:antialiased;font-size:16px;line-height:1.6;}
    .sr{font-family:'Cormorant Garamond',Georgia,serif;}
    a{color:inherit;text-decoration:none;}
    ::-webkit-scrollbar{width:4px;}
    ::-webkit-scrollbar-track{background:var(--G);}
    ::-webkit-scrollbar-thumb{background:var(--G2);border-radius:9px;}

    /* sticky get-care pill */
    .sc{position:fixed;bottom:26px;left:50%;transform:translateX(-50%);z-index:200;
      background:var(--G);color:#fff;border:none;border-radius:99px;
      padding:13px 28px;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:500;
      cursor:pointer;display:inline-flex;align-items:center;gap:8px;
      box-shadow:0 4px 24px rgba(30,61,48,.4);transition:background .2s,opacity .2s;}
    .sc:hover{background:var(--G2);}
  `}</style>
);

/* ─── animation helper ─── */
const EASE = [0.16, 1, 0.3, 1];
const R = ({ children, d = 0, y = 24, style = {}, className = '' }) => {
  const ref = useRef(null);
  const v = useInView(ref, { once: true, margin: '-48px' });
  return (
    <motion.div ref={ref} style={style} className={className}
      initial={{ opacity: 0, y }} animate={v ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: EASE, delay: d }}>
      {children}
    </motion.div>
  );
};

/* ─── max-width wrapper ─── */
const W = ({ ch, style = {} }) => (
  <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px', ...style }}>{ch}</div>
);

/* ─── pill button ─── */
const Btn = ({ ch, v = 'green', href = '#', sx = {} }) => {
  const vs = {
    green:   { bg: 'var(--G)',   col: '#fff',        br: 'none' },
    sand:    { bg: '#e8c9a0',    col: 'var(--G)',     br: 'none' },
    outline: { bg: 'transparent',col: 'var(--G)',     br: '1.5px solid var(--G)' },
    'ow':    { bg: 'transparent',col: '#fff',         br: '1.5px solid rgba(255,255,255,.45)' },
    white:   { bg: '#fff',       col: 'var(--G)',     br: 'none' },
    light:   { bg: 'var(--MT)',  col: 'var(--G)',     br: 'none' },
  };
  const s = vs[v] || vs.green;
  return (
    <motion.a href={href} whileHover={{ scale: 1.025 }} whileTap={{ scale: .97 }}
      style={{ display:'inline-flex', alignItems:'center', gap:8, borderRadius:99,
        padding:'13px 28px', fontSize:15, fontWeight:500,
        background:s.bg, color:s.col, border:s.br||'none', cursor:'pointer', ...sx }}>
      {ch}
    </motion.a>
  );
};

/* ═══════════════════════════════════════════
   §1  HERO  — dark green, left text, right round image
   (mirrors screenshot 17)
═══════════════════════════════════════════ */
const Hero = () => (
  <section style={{ background:'var(--G)', padding:'120px 0 80px' }}>
    <W ch={
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:60, alignItems:'center' }}>

        {/* left */}
        <div>
          <motion.h1 className="sr"
            initial={{ opacity:0, y:36 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:.9, ease:EASE, delay:.1 }}
            style={{ fontSize:'clamp(40px,5vw,64px)', fontWeight:400, color:'#fff', lineHeight:1.08, marginBottom:24 }}>
            Care that helps you feel better and stay well
          </motion.h1>

          <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:.8, ease:EASE, delay:.26 }}
            style={{ fontSize:17, fontWeight:300, color:'rgba(255,255,255,.75)', lineHeight:1.7, marginBottom:36, maxWidth:460 }}>
            Root-cause health consultancy bridging clinical medicine and public health policy
            to resolve your underlying symptoms and build lasting, systemic health.
          </motion.p>

          <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:.7, ease:EASE, delay:.38 }}
            style={{ display:'flex', alignItems:'center', gap:20, flexWrap:'wrap', marginBottom:52 }}>
            <Btn v="sand" href="/contact" ch={<>Get care <ArrowRight size={16}/></>}/>
            <a href="/services" style={{ color:'rgba(255,255,255,.78)', fontSize:15, textDecoration:'underline', textUnderlineOffset:3 }}>
              Start with labs
            </a>
          </motion.div>

          <motion.ul initial={{ opacity:0 }} animate={{ opacity:1 }}
            transition={{ duration:.8, delay:.55 }}
            style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:14 }}>
            {[
              'Board-certified clinicians in functional and conventional medicine',
              'Advanced lab testing and biomarker interpretation',
              'Health policy expertise across national, county and NGO levels',
              '89% of members improve or eliminate symptoms within 1 year',
            ].map(t => (
              <li key={t} style={{ display:'flex', alignItems:'flex-start', gap:10,
                color:'rgba(255,255,255,.7)', fontSize:15 }}>
                <Check size={15} strokeWidth={2.5} color="#e8c9a0" style={{ marginTop:3, flexShrink:0 }}/>{t}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* right — rounded blob image */}
        <motion.div initial={{ opacity:0, scale:.95 }} animate={{ opacity:1, scale:1 }}
          transition={{ duration:1.1, ease:EASE, delay:.2 }}
          style={{ display:'flex', justifyContent:'center' }}>
          <div style={{
            width:'100%', maxWidth:440, aspectRatio:'1/1',
            borderRadius:'55% 45% 50% 50% / 55% 50% 50% 45%',
            overflow:'hidden',
            backgroundImage:'url(/images/backpage2.jpeg)',
            backgroundSize:'cover', backgroundPosition:'center',
            backgroundColor:'var(--G2)',
          }}/>
        </motion.div>
      </div>
    }/>
  </section>
);

/* ═══════════════════════════════════════════
   §2  THREE WAYS  — cream, 3 outlined cards
   (mirrors screenshot 16)
═══════════════════════════════════════════ */
const ThreeWays = () => {
  const cards = [
    { tag:'FOR INDIVIDUAL CARE',   icon:'⚕', title:'Complete Care',
      desc:'Our most comprehensive care experience designed to resolve your symptoms and transform your health. Partner with a dedicated clinician and care team who treat the root cause and support you for the long-term.',
      cta:'Get care', sub:'Learn more', href:'/contact' },
    { tag:'FOR PREVENTIVE CARE',   icon:'⚗', title:'Longevity & Diagnostics',
      desc:'Annual advanced labs panel with expert clinician interpretation, to better understand your body, intervene early, and maintain your health over time. Best for proactive health or early symptoms.',
      cta:'Start with labs', sub:'Learn more', href:'/services' },
    { tag:'FOR ORGANISATIONS',     icon:'⚖', title:'Health Policy Consulting',
      desc:'Institutional support for health policy formulation, programme development and implementation. We bring clinical and public health expertise to national, county and NGO health strategies.',
      cta:'Learn more', sub:'Talk to an advisor', href:'/contact' },
  ];
  return (
    <section style={{ background:'var(--CR)', padding:'96px 0' }}>
      <W ch={<>
        <R style={{ textAlign:'center', marginBottom:64 }}>
          <p style={{ fontSize:12, fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--TL)', marginBottom:14 }}>
            WHERE TO START
          </p>
          <h2 className="sr" style={{ fontSize:'clamp(32px,4vw,52px)', fontWeight:400, color:'var(--TX)', lineHeight:1.1 }}>
            Three ways to start fixing the root cause today
          </h2>
        </R>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }}>
          {cards.map((c,i) => (
            <R key={c.title} d={i*.1}>
              <div style={{ border:'1px solid var(--BD)', borderRadius:12, padding:'36px 32px',
                background:'#fff', display:'flex', flexDirection:'column', height:'100%' }}>
                <p style={{ fontSize:11, fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--TL)', marginBottom:16 }}>
                  {c.tag}
                </p>
                <h3 className="sr" style={{ fontSize:30, fontWeight:400, color:'var(--TX)', marginBottom:16, lineHeight:1.15 }}>
                  {c.title}
                </h3>
                <p style={{ fontSize:15, color:'var(--TM)', lineHeight:1.72, fontWeight:300, flexGrow:1, marginBottom:32 }}>
                  {c.desc}
                </p>
                <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                  <Btn v="outline" href={c.href} ch={<>{c.cta} <ArrowRight size={14}/></>}/>
                  <a href={c.href} style={{ fontSize:14, color:'var(--TX)', textDecoration:'underline', textUnderlineOffset:3, paddingLeft:4 }}>
                    {c.sub}
                  </a>
                </div>
              </div>
            </R>
          ))}
        </div>
        <R d={.3} style={{ textAlign:'center', marginTop:40 }}>
          <a href="/contact" style={{ fontSize:15, color:'var(--TX)', textDecoration:'underline', textUnderlineOffset:3 }}>
            Not sure where to start? Talk to an advisor →
          </a>
        </R>
      </>}/>
    </section>
  );
};

/* ═══════════════════════════════════════════
   §3  TERRACOTTA NEED-HELP BAND
   (mirrors screenshot 10)
═══════════════════════════════════════════ */
const NeedHelp = () => (
  <section style={{ background:'linear-gradient(135deg,var(--TC1) 0%,var(--TC2) 100%)', padding:'72px 40px' }}>
    <div style={{ maxWidth:1100, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:60, alignItems:'center' }}>
      <R>
        <h2 className="sr" style={{ fontSize:'clamp(28px,3.5vw,46px)', fontWeight:400, color:'#fff', lineHeight:1.15 }}>
          Need help deciding where to start?
        </h2>
      </R>
      <R d={.12}>
        <p style={{ fontSize:16, color:'rgba(255,255,255,.82)', marginBottom:28, fontWeight:300 }}>
          Schedule a free 15-minute consultation with an Altura advisor.
        </p>
        <Btn v="white" href="/contact" ch={<>Talk to an advisor <ArrowRight size={15}/></>}/>
      </R>
    </div>
  </section>
);

/* ═══════════════════════════════════════════
   §4  A MORE COMPLETE UNDERSTANDING
   3-column symptom cards on cream
   (mirrors screenshot 9)
═══════════════════════════════════════════ */
const Understanding = () => {
  const cols = [
    { icon:'◉', head:'Low energy, weight gain, brain fog',
      bold:'Often linked to thyroid, metabolic, or hormonal imbalances that routine labs miss',
      body:'We run deeper testing and connect patterns across your whole system to treat the root cause' },
    { icon:'◈', head:'Bloating, skin flares, digestive issues',
      bold:'Frequently driven by gut inflammation, food sensitivities, or microbiome imbalance',
      body:'We identify triggers and heal the gut to relieve and eliminate symptoms' },
    { icon:'◇', head:'Hormone issues, poor sleep, chronic stress',
      bold:'Often dismissed or treated in isolation instead of as part of a connected system',
      body:'We assess hormones, stress, and lifestyle together to restore balance over time' },
  ];
  return (
    <section style={{ background:'var(--CR)', padding:'96px 0' }}>
      <W ch={<>
        <R style={{ textAlign:'center', marginBottom:56 }}>
          <h2 className="sr" style={{ fontSize:'clamp(28px,4vw,50px)', fontWeight:400, color:'var(--TX)', marginBottom:20, lineHeight:1.12 }}>
            A more complete understanding of your health
          </h2>
          <p style={{ fontSize:16, color:'var(--TL)', maxWidth:600, margin:'0 auto', fontWeight:300 }}>
            Our connected, root-cause approach looks at how your body's systems work together to support lasting health.
          </p>
        </R>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:0, borderLeft:'1px solid var(--BD)' }}>
          {cols.map((c,i) => (
            <R key={c.head} d={i*.1}>
              <div style={{ padding:'40px 36px', borderRight:'1px solid var(--BD)' }}>
                <div style={{ fontSize:28, color:'var(--TL)', marginBottom:20 }}>{c.icon}</div>
                <h3 className="sr" style={{ fontSize:28, fontWeight:400, color:'var(--TX)', marginBottom:16, lineHeight:1.15 }}>
                  {c.head}
                </h3>
                <p style={{ fontSize:14, color:'var(--TX)', fontWeight:500, marginBottom:12, lineHeight:1.6 }}>{c.bold}</p>
                <p style={{ fontSize:14, color:'var(--TL)', fontWeight:300, lineHeight:1.7 }}>{c.body}</p>
              </div>
            </R>
          ))}
        </div>
        <R d={.3} style={{ textAlign:'center', marginTop:48 }}>
          <Btn v="green" href="/services" ch={<>Get started <ArrowRight size={15}/></>}/>
        </R>
      </>}/>
    </section>
  );
};

/* ═══════════════════════════════════════════
   §5  BIG QUOTE — mint gradient background
   (mirrors screenshot 7 / 15)
═══════════════════════════════════════════ */
const BigQuote = ({ quote, name, role }) => (
  <section style={{ background:'linear-gradient(180deg,var(--MT2) 0%,var(--MT) 100%)', padding:'112px 40px', textAlign:'center' }}>
    <R>
      <div style={{ fontSize:20, letterSpacing:'.28em', color:'var(--G)', marginBottom:36 }}>★★★★★</div>
      <blockquote className="sr" style={{
        fontSize:'clamp(22px,3.2vw,40px)', fontWeight:400, fontStyle:'italic',
        color:'var(--TX)', lineHeight:1.45, maxWidth:860, margin:'0 auto 36px' }}>
        "{quote}"
      </blockquote>
      <p style={{ fontSize:15, fontStyle:'italic', color:'var(--TM)', marginBottom:6 }}>{name}</p>
      <p style={{ fontSize:11, fontWeight:600, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--TL)' }}>{role}</p>
      <div style={{ marginTop:44 }}>
        <Btn v="green" href="/contact" ch={<>Get Care <ArrowRight size={15}/></>}/>
      </div>
    </R>
  </section>
);

/* ═══════════════════════════════════════════
   §6  WHY ROOT-CAUSE STATS
   (mirrors screenshot 13)
═══════════════════════════════════════════ */
const WhyStats = () => {
  const stats = [
    { v:'70%',  l:'of Kenyans lack access to quality primary health care' },
    { v:'4–7',  l:'years to get a correct diagnosis for many chronic conditions' },
    { v:'89%',  l:'of Altura members improve or eliminate symptoms within 1 year' },
  ];
  return (
    <section style={{ background:'var(--CR)', padding:'96px 0' }}>
      <W ch={
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'start' }}>
          <R>
            <p style={{ fontSize:12, fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--TL)', marginBottom:16 }}>
              WHY ROOT-CAUSE HEALTHCARE MATTERS
            </p>
            <h2 className="sr" style={{ fontSize:'clamp(28px,3.5vw,44px)', fontWeight:400, color:'var(--TX)', lineHeight:1.2 }}>
              Why root-cause healthcare matters
            </h2>
          </R>
          <div>
            {stats.map((s,i) => (
              <R key={s.v} d={i*.09}>
                <div style={{ display:'flex', alignItems:'baseline', gap:24,
                  padding:'24px 0', borderBottom: i < stats.length-1 ? '1px solid var(--BD)' : 'none' }}>
                  <span className="sr" style={{ fontSize:'clamp(48px,5vw,72px)', fontWeight:400, color:'var(--TX)', minWidth:130, lineHeight:1 }}>
                    {s.v}
                  </span>
                  <span style={{ fontSize:15, color:'var(--TL)', lineHeight:1.55, fontWeight:300 }}>{s.l}</span>
                </div>
              </R>
            ))}
          </div>
        </div>
      }/>
    </section>
  );
};

/* ═══════════════════════════════════════════
   §7  HOW ALTURA DELIVERS DEEPER CARE
   circular images, 3-col
   (mirrors screenshot 12)
═══════════════════════════════════════════ */
const HowWeDeliver = () => {
  const cols = [
    { img:'/images/backpage3.jpeg', title:'Whole-body approach',
      desc:'Your clinician takes time to understand your symptoms, health history, lifestyle, and goals, so care is grounded in the full context of your health.' },
    { img:'/images/backpage2.jpeg', title:'Clarity from your labs',
      desc:'Advanced lab testing helps identify patterns, imbalances, and drivers of symptoms that standard care often misses.' },
    { img:'/images/oda1.jpeg',      title:'Policy-informed guidance',
      desc:'You receive expert, personalised guidance shaped by both clinical practice and evidence-based public health policy across national and county levels.' },
  ];
  return (
    <section style={{ background:'var(--CR)', padding:'96px 0' }}>
      <W ch={<>
        <R style={{ textAlign:'center', marginBottom:64 }}>
          <h2 className="sr" style={{ fontSize:'clamp(28px,4vw,48px)', fontWeight:400, color:'var(--TX)', marginBottom:20 }}>
            How Altura delivers deeper care
          </h2>
          <p style={{ fontSize:16, color:'var(--TL)', maxWidth:640, margin:'0 auto', fontWeight:300 }}>
            A connected, root-cause approach that looks at the full picture, not isolated symptoms.
            Available in-person in Nairobi and via telehealth nationwide.
          </p>
        </R>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:48 }}>
          {cols.map((c,i) => (
            <R key={c.title} d={i*.1} style={{ textAlign:'center' }}>
              <div style={{ width:200, height:200, borderRadius:'50%', margin:'0 auto 28px',
                backgroundImage:`url(${c.img})`, backgroundSize:'cover', backgroundPosition:'center',
                backgroundColor:'var(--MT)' }}/>
              <h3 className="sr" style={{ fontSize:28, fontWeight:400, color:'var(--TX)', marginBottom:14, lineHeight:1.2 }}>
                {c.title}
              </h3>
              <p style={{ fontSize:15, color:'var(--TM)', lineHeight:1.72, fontWeight:300 }}>{c.desc}</p>
            </R>
          ))}
        </div>
        <R d={.3} style={{ textAlign:'center', marginTop:56 }}>
          <Btn v="green" href="/contact" ch={<>Get care <ArrowRight size={15}/></>}/>
        </R>
      </>}/>
    </section>
  );
};

/* ═══════════════════════════════════════════
   §8  MEMBER OUTCOMES STATS
   (mirrors screenshot 4)
═══════════════════════════════════════════ */
const MemberOutcomes = () => {
  const stats = [
    { v:'89%',  l:'improved or eliminated symptoms in the first year' },
    { v:'71%',  l:'improved mental wellbeing and quality of life' },
    { v:'15+',  l:'countries of health service delivery experience' },
  ];
  return (
    <section style={{ background:'var(--CR2)', padding:'96px 0' }}>
      <W ch={
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'start' }}>
          <R>
            <p style={{ fontSize:12, fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--TL)', marginBottom:16 }}>
              MEMBER OUTCOMES
            </p>
            <h2 className="sr" style={{ fontSize:'clamp(28px,3.5vw,44px)', fontWeight:400, color:'var(--TX)', lineHeight:1.2 }}>
              Get more out of medicine than you ever thought possible
            </h2>
          </R>
          <div>
            {stats.map((s,i) => (
              <R key={s.v} d={i*.09}>
                <div style={{ display:'flex', alignItems:'baseline', gap:24,
                  padding:'24px 0', borderBottom: i < stats.length-1 ? '1px solid var(--BD)' : 'none' }}>
                  <span className="sr" style={{ fontSize:'clamp(48px,5vw,72px)', fontWeight:400, color:'var(--TX)', minWidth:120, lineHeight:1 }}>
                    {s.v}
                  </span>
                  <span style={{ fontSize:15, color:'var(--TL)', lineHeight:1.55, fontWeight:300 }}>{s.l}</span>
                </div>
              </R>
            ))}
          </div>
        </div>
      }/>
    </section>
  );
};

/* ═══════════════════════════════════════════
   §9  WHY CHOOSE ALTURA — comparison table
   (mirrors screenshot 6)
═══════════════════════════════════════════ */
const CompareTable = () => {
  const rows = [
    'Board-certified physicians trained in functional and conventional medicine',
    'Whole-body assessment and advanced lab interpretation',
    'Standardised clinical protocol',
    'Longer visits — initial consultations are 60 minutes',
    'Root-cause approach across metabolic, hormonal, gut, immune and mental health',
    'Clinically-guided supplement and lifestyle recommendations',
    'Care team support between visits for questions and medical record management',
  ];
  return (
    <section style={{ background:'var(--CR)', padding:'96px 0' }}>
      <W ch={<>
        <R style={{ textAlign:'center', marginBottom:56 }}>
          <p style={{ fontSize:12, fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--TL)', marginBottom:14 }}>
            WHY CHOOSE ALTURA?
          </p>
          <h2 className="sr" style={{ fontSize:'clamp(28px,4vw,48px)', fontWeight:400, color:'var(--TX)', marginBottom:16 }}>
            A different model of care
          </h2>
          <p style={{ fontSize:16, color:'var(--TL)', maxWidth:600, margin:'0 auto', fontWeight:300 }}>
            See how Altura compares to traditional healthcare across training, structure, and support.
          </p>
        </R>

        {/* table */}
        <div style={{ border:'1px solid var(--BD)', borderRadius:12, overflow:'hidden' }}>
          {/* header row */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 220px 220px',
            background:'#fff', borderBottom:'1px solid var(--BD)' }}>
            <div style={{ padding:'20px 24px' }}/>
            <div style={{ padding:'20px 24px', background:'var(--MT)', textAlign:'center',
              fontSize:14, fontWeight:600, color:'var(--G)' }}>Altura Health</div>
            <div style={{ padding:'20px 24px', textAlign:'center',
              fontSize:14, fontWeight:500, color:'var(--TL)' }}>Traditional Care</div>
          </div>
          {rows.map((r,i) => (
            <R key={r} d={i*.05}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 220px 220px',
                borderBottom: i < rows.length-1 ? '1px solid var(--BD)' : 'none',
                background: i%2===0 ? '#fff' : 'var(--CR)' }}>
                <div style={{ padding:'22px 24px', fontSize:15, color:'var(--TX)', fontWeight:300, lineHeight:1.6 }}>{r}</div>
                <div style={{ padding:'22px 24px', background:'rgba(214,235,226,.35)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Check size={18} strokeWidth={2.5} color="var(--G)"/>
                </div>
                <div style={{ padding:'22px 24px', display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:14, color:'var(--TL)', fontWeight:300 }}>
                  {i < 2 ? '' : i < 4 ? 'Sometimes' : 'Rarely'}
                </div>
              </div>
            </R>
          ))}
        </div>
      </>}/>
    </section>
  );
};

/* ═══════════════════════════════════════════
   §10  DARK GREEN STATEMENT
   (mirrors screenshot 5)
═══════════════════════════════════════════ */
const Statement = () => (
  <section style={{ background:'var(--G)', padding:'96px 40px', textAlign:'center' }}>
    <R>
      <h2 className="sr" style={{ fontSize:'clamp(28px,4vw,52px)', fontWeight:400, color:'#fff', lineHeight:1.35, maxWidth:820, margin:'0 auto' }}>
        Your health is complex, and your symptoms are only part of the story.
        We listen, uncover the why, and treat the root cause.
      </h2>
    </R>
  </section>
);

/* ═══════════════════════════════════════════
   §11  SCHEDULE A CALL / PARTNERS LOGOS
   (mirrors screenshot 3)
═══════════════════════════════════════════ */
const ScheduleAndLogos = () => (
  <>
    <section style={{ background:'linear-gradient(180deg,#e8f0ec 0%,var(--CR) 100%)', padding:'72px 40px', textAlign:'center' }}>
      <R>
        <p style={{ fontSize:17, color:'var(--TX)', marginBottom:32, fontWeight:300 }}>
          Schedule a call with an advisor now, or call/text us at{' '}
          <strong style={{ fontWeight:500 }}>+254 (0) 713 123 090</strong>.
        </p>
        <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
          <Btn v="green" href="/contact" ch={<>Schedule a call <ArrowRight size={15}/></>}/>
          <Btn v="outline" href="tel:+254713123090" ch="Call / Text us"/>
        </div>
      </R>
    </section>

    <section style={{ background:'var(--CR)', padding:'72px 0', borderTop:'1px solid var(--BD)' }}>
      <W ch={<>
        <R style={{ textAlign:'center', marginBottom:48 }}>
          <h2 className="sr" style={{ fontSize:'clamp(24px,3vw,38px)', fontWeight:400, color:'var(--TX)' }}>
            Partnered with
          </h2>
        </R>
        <div style={{ display:'flex', gap:48, justifyContent:'center', alignItems:'center', flexWrap:'wrap' }}>
          {['UNICEF','WHO','UNFPA','USAID','Kenya MOH','Kenya Red Cross'].map(p => (
            <R key={p} d={.05}>
              <div style={{ fontSize:15, fontWeight:600, color:'var(--TL)', letterSpacing:'.04em',
                padding:'10px 20px', border:'1px solid var(--BD)', borderRadius:6 }}>
                {p}
              </div>
            </R>
          ))}
        </div>
      </>}/>
    </section>
  </>
);

/* ═══════════════════════════════════════════
   §12  CONDITIONS CAROUSEL
   (mirrors screenshot 14)
═══════════════════════════════════════════ */
const Conditions = () => {
  const [idx, setIdx] = useState(0);
  const cards = [
    { title:'Gut & Digestive Health',    desc:'Root-cause care for persistent digestive symptoms that affect daily life.',
      syms:'IBS, IBD, acid reflux, SIBO, leaky gut, constipation, bloating, food intolerances', href:'/services' },
    { title:'Hormone Health',            desc:'Support hormone health by understanding patterns across the whole body.',
      syms:'Fatigue, weight changes, PMS, acne, irregular cycles, hair loss, PCOS', href:'/services' },
    { title:'Autoimmune & Inflammation', desc:'Care that looks deeper when immune or inflammatory symptoms persist.',
      syms:"Hashimoto's, lupus, psoriasis, rheumatoid arthritis, joint pain, chronic fatigue", href:'/services' },
    { title:'Mental & Emotional Health', desc:'An integrative approach to mental wellbeing that considers biology and lifestyle.',
      syms:'Anxiety, brain fog, low mood, insomnia, fatigue, difficulty concentrating', href:'/services' },
    { title:'Metabolic Health',          desc:'Root-cause care for blood sugar, weight, and metabolic function.',
      syms:'Weight gain, insulin resistance, prediabetes, type 2 diabetes, unexplained fatigue', href:'/services' },
    { title:'Maternal & Reproductive Health', desc:'Whole-body care supporting reproductive health at every stage.',
      syms:'Antenatal care, postnatal recovery, family planning, PCOS, fertility, gestational diabetes', href:'/services' },
  ];
  const vis = [0,1,2].map(o => (idx+o) % cards.length);

  return (
    <section style={{ background:'var(--CR)', padding:'96px 0', overflow:'hidden' }}>
      <W ch={<>
        <div style={{ display:'grid', gridTemplateColumns:'300px 1fr', gap:64, alignItems:'start' }}>
          <R>
            <h2 className="sr" style={{ fontSize:'clamp(28px,3.5vw,44px)', fontWeight:400, color:'var(--TX)', lineHeight:1.12, marginBottom:32 }}>
              Root-cause care for complex health and lasting vitality
            </h2>
            <div style={{ display:'flex', gap:12 }}>
              <motion.button whileTap={{ scale:.92 }} onClick={() => setIdx(p => (p-1+cards.length)%cards.length)}
                style={{ width:44, height:44, borderRadius:'50%', border:'1px solid var(--BD)',
                  background:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--TX)' }}>
                <ChevronLeft size={18}/>
              </motion.button>
              <motion.button whileTap={{ scale:.92 }} onClick={() => setIdx(p => (p+1)%cards.length)}
                style={{ width:44, height:44, borderRadius:'50%', border:'1px solid var(--G)',
                  background:'var(--G)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff' }}>
                <ChevronRight size={18}/>
              </motion.button>
            </div>
          </R>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}>
            <AnimatePresence mode="popLayout">
              {vis.map(vi => (
                <motion.div key={vi}
                  initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-40 }}
                  transition={{ duration:.4, ease:EASE }}
                  style={{ border:'1px solid var(--BD)', borderRadius:10, padding:'28px 24px',
                    background:'#fff', display:'flex', flexDirection:'column' }}>
                  <div style={{ width:52, height:52, borderRadius:'50%', background:'var(--MT)', marginBottom:20,
                    backgroundImage:`url(/images/backpage${vi%2===0?'2':'3'}.jpeg)`,
                    backgroundSize:'cover', backgroundPosition:'center' }}/>
                  <h3 className="sr" style={{ fontSize:22, fontWeight:400, color:'var(--TX)', marginBottom:12, lineHeight:1.2 }}>
                    {cards[vi].title}
                  </h3>
                  <p style={{ fontSize:14, color:'var(--TM)', marginBottom:10, lineHeight:1.65, fontWeight:300 }}>
                    {cards[vi].desc}
                  </p>
                  <p style={{ fontSize:12, color:'var(--TL)', lineHeight:1.6, fontWeight:300, flexGrow:1 }}>
                    {cards[vi].syms}
                  </p>
                  <a href={cards[vi].href} style={{ marginTop:20, fontSize:14, color:'var(--G)',
                    display:'flex', alignItems:'center', gap:6, fontWeight:500 }}>
                    {cards[vi].title.split(' ')[0]} care <ArrowRight size={13}/>
                  </a>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </>}/>
    </section>
  );
};

/* ═══════════════════════════════════════════
   §13  COMMUNITY STORIES CAROUSEL
   (mirrors screenshot 11)
═══════════════════════════════════════════ */
const Stories = () => {
  const [page, setPage] = useState(0);
  const all = [
    { name:'Amara O.',  tag:'"Finally, real answers."',     quote:'Altura gave me answers after years of being dismissed. My fatigue disappeared within three months. I feel like myself again.' },
    { name:'James K.',  tag:'"Life-changing expertise."',   quote:'The level of attention is unlike anything I have experienced. They don\'t just treat symptoms — they trace everything to its origin.' },
    { name:'Selin T.',  tag:'"The lab results changed everything."', quote:'I came in sceptical. The comprehensive panel was eye-opening. The care plan that followed transformed how I understand my own health.' },
    { name:'Grace M.',  tag:'"Policy meets practice."',     quote:'Working with Altura helped our county health team develop a PHC strategy that is actually grounded in what patients need.' },
    { name:'David N.',  tag:'"Truly holistic care."',       quote:'After years of being told my symptoms were stress, Altura identified the root cause within the first two consultations. Remarkable.' },
    { name:'Faith A.',  tag:'"Preventive care that works."', quote:'The longevity labs revealed things my GP had never tested for. I now have a proactive health plan instead of just waiting for problems.' },
  ];
  const total = Math.ceil(all.length / 3);
  const vis = all.slice(page*3, page*3+3);

  return (
    <section style={{ background:'var(--CR)', padding:'96px 0' }}>
      <W ch={<>
        <R style={{ textAlign:'center', marginBottom:56 }}>
          <h2 className="sr" style={{ fontSize:'clamp(28px,4vw,48px)', fontWeight:400, color:'var(--TX)' }}>
            Hear directly from our community
          </h2>
        </R>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24, marginBottom:40 }}>
          <AnimatePresence mode="wait">
            {vis.map((s,i) => (
              <motion.div key={s.name+page}
                initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }}
                transition={{ duration:.4, ease:EASE, delay:i*.08 }}>
                <div style={{ border:'1px solid var(--BD)', borderRadius:10, overflow:'hidden', background:'#fff' }}>
                  <div style={{ height:180, background:'var(--MT)', display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:48, color:'var(--TL)' }}>◎</div>
                  <div style={{ padding:'24px 24px 28px', borderTop:'1px solid var(--BD)' }}>
                    <p style={{ fontSize:15, fontWeight:600, color:'var(--TX)', marginBottom:6, textAlign:'center' }}>{s.name}</p>
                    <p style={{ fontSize:13, color:'var(--G)', fontStyle:'italic', marginBottom:14, textAlign:'center' }}>{s.tag}</p>
                    <p style={{ fontSize:14, color:'var(--TM)', lineHeight:1.7, fontWeight:300, textAlign:'center' }}>"{s.quote}"</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* dots + arrows */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <motion.button whileTap={{ scale:.92 }} onClick={() => setPage(p => Math.max(0,p-1))}
            style={{ width:44, height:44, borderRadius:'50%', border:'1px solid var(--BD)',
              background: page===0 ? '#fff' : 'var(--G)',
              color: page===0 ? 'var(--TL)' : '#fff',
              cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <ChevronLeft size={18}/>
          </motion.button>
          <div style={{ display:'flex', gap:10 }}>
            {Array.from({ length:total }).map((_,i) => (
              <motion.button key={i} onClick={() => setPage(i)}
                style={{ width: i===page ? 28 : 10, height:10, borderRadius:99, border:'none', cursor:'pointer',
                  background: i===page ? 'var(--G)' : 'var(--BD)', transition:'all .3s' }}/>
            ))}
          </div>
          <motion.button whileTap={{ scale:.92 }} onClick={() => setPage(p => Math.min(total-1,p+1))}
            style={{ width:44, height:44, borderRadius:'50%', border:'none',
              background:'var(--G)', color:'#fff',
              cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <ChevronRight size={18}/>
          </motion.button>
        </div>
      </>}/>
    </section>
  );
};

/* ═══════════════════════════════════════════
   §14  SECOND TERRACOTTA QUOTE
   (mirrors screenshot 2)
═══════════════════════════════════════════ */
const TerraQuote = () => (
  <section style={{ background:'linear-gradient(135deg,#7a3a24 0%,#b06040 40%,#8a5030 100%)', padding:'112px 40px', textAlign:'center' }}>
    <R>
      <h2 className="sr" style={{ fontSize:'clamp(24px,3vw,38px)', fontWeight:400, color:'#fff', marginBottom:48 }}>
        Life-changing care starts now
      </h2>
      <div style={{ width:1, height:80, background:'rgba(255,255,255,.3)', margin:'0 auto 48px' }}/>
      <div style={{ fontSize:20, letterSpacing:'.28em', color:'rgba(255,255,255,.8)', marginBottom:36 }}>★★★★★</div>
      <blockquote style={{ fontSize:'clamp(16px,2vw,22px)', fontWeight:300, fontStyle:'italic',
        color:'rgba(255,255,255,.92)', lineHeight:1.65, maxWidth:720, margin:'0 auto 36px' }}>
        "Altura has been life-changing for me. The team caught patterns in my labs and helped me avoid
        serious outcomes. My health has vastly improved since I became an Altura patient. Highly recommend."
      </blockquote>
      <p style={{ fontSize:13, fontWeight:600, letterSpacing:'.12em', textTransform:'uppercase', color:'rgba(255,255,255,.7)', marginBottom:4 }}>
        GRACE M.
      </p>
      <p style={{ fontSize:12, letterSpacing:'.1em', textTransform:'uppercase', color:'rgba(255,255,255,.5)', marginBottom:44 }}>
        ALTURA HEALTH MEMBER
      </p>
      <a href="/contact" style={{ fontSize:15, color:'rgba(255,255,255,.8)',
        display:'inline-flex', alignItems:'center', gap:6, textDecoration:'underline', textUnderlineOffset:3 }}>
        Hear more member stories <ArrowRight size={14}/>
      </a>
    </R>
  </section>
);

/* ═══════════════════════════════════════════
   §15  FOOTER
   (mirrors screenshot 1)
═══════════════════════════════════════════ */
const Footer = () => {
  const [email, setEmail] = useState('');
  const cols = [
    { h:'Conditions', links:['Gut Health','Hormone Health','Autoimmune','Menopause','Fertility','Heart Health','Metabolic Health','Mental Health'] },
    { h:'Care',       links:['What We Offer','Complete Care','Longevity Labs','Lab Review','How It Works'] },
    { h:'Our Approach', links:['Our Methodology','Our Clinicians','Nutrition Coaching','Member Stories','About Altura'] },
    { h:'Resources',  links:['FAQs','Blog','Research','Press','Careers','Contact Us'] },
  ];
  return (
    <footer style={{ background:'var(--G)', padding:'80px 0 40px' }}>
      <W ch={<>
        <div style={{ display:'grid', gridTemplateColumns:'280px repeat(4,1fr)', gap:48, marginBottom:64 }}>
          {/* brand col */}
          <div>
            <div className="sr" style={{ fontSize:32, fontWeight:400, color:'#fff', marginBottom:20 }}>Altura</div>
            <p style={{ fontSize:13, color:'rgba(255,255,255,.45)', lineHeight:1.75, fontWeight:300, marginBottom:28, maxWidth:220 }}>
              Root-cause health consultancy bridging clinical medicine and public health policy.
            </p>
            <p style={{ fontSize:12, fontWeight:600, letterSpacing:'.08em', color:'#8eb8a0', marginBottom:12 }}>
              Sign up for our newsletter
            </p>
            <div style={{ display:'flex', gap:0, borderRadius:99, overflow:'hidden', border:'1px solid rgba(255,255,255,.15)' }}>
              <input value={email} onChange={e=>setEmail(e.target.value)}
                placeholder="Enter your email"
                style={{ flex:1, padding:'10px 16px', background:'rgba(255,255,255,.08)',
                  border:'none', color:'#fff', fontSize:13, outline:'none' }}/>
              <button onClick={()=>setEmail('')}
                style={{ padding:'10px 18px', background:'rgba(255,255,255,.15)', color:'#fff',
                  border:'none', cursor:'pointer', fontSize:13, fontWeight:500, whiteSpace:'nowrap' }}>
                Sign Up
              </button>
            </div>
            <div style={{ display:'flex', gap:16, marginTop:24 }}>
              {['f','in','▶','@'].map(s => (
                <a key={s} href="#" style={{ width:36, height:36, borderRadius:'50%',
                  border:'1px solid rgba(255,255,255,.15)', display:'flex', alignItems:'center', justifyContent:'center',
                  color:'rgba(255,255,255,.5)', fontSize:13 }}>{s}</a>
              ))}
            </div>
          </div>

          {/* link cols */}
          {cols.map(c => (
            <div key={c.h}>
              <p style={{ fontSize:12, fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase', color:'#8eb8a0', marginBottom:20 }}>
                {c.h}
              </p>
              <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:12 }}>
                {c.links.map(l => (
                  <li key={l}>
                    <a href="#" onMouseEnter={e=>e.target.style.color='#fff'} onMouseLeave={e=>e.target.style.color='rgba(255,255,255,.45)'}
                      style={{ fontSize:14, color:'rgba(255,255,255,.45)', fontWeight:300, transition:'color .15s' }}>
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* bottom bar */}
        <div style={{ borderTop:'1px solid rgba(255,255,255,.08)', paddingTop:32,
          display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:16 }}>
          <span style={{ fontSize:13, color:'rgba(255,255,255,.25)' }}>
            © 2026 Altura Health. P.O Box 70036 – 00400, Nairobi, Kenya. All rights reserved.
          </span>
          <div style={{ display:'flex', gap:24 }}>
            {['Privacy Policy','Terms of Use','Accessibility'].map(l => (
              <a key={l} href="#" style={{ fontSize:13, color:'rgba(255,255,255,.25)' }}>{l}</a>
            ))}
          </div>
        </div>
      </>}/>
    </footer>
  );
};

/* ═══════════════════════════════════════════
   PAGE EXPORT
═══════════════════════════════════════════ */
export default function Index() {
  return (
    <>
      <G/>
      {/* Sticky get-care pill */}
      <a href="/contact" className="sc">Get care <ArrowRight size={16}/></a>

      <main>
        <Hero/>
        <ThreeWays/>
        <NeedHelp/>
        <Understanding/>
        <BigQuote
          quote="Altura gave me my health back after years of worsening symptoms. I had been to several different specialists over the years and Altura was the first to successfully identify the underlying cause of my seemingly mysterious symptoms."
          name="Grace M."
          role="ALTURA HEALTH MEMBER"
        />
        <WhyStats/>
        <HowWeDeliver/>
        <MemberOutcomes/>
        <CompareTable/>
        <Statement/>
        <ScheduleAndLogos/>
        <Conditions/>
        <Stories/>
        <TerraQuote/>
        <Footer/>
      </main>
    </>
  );
}