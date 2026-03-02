import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/* ─── max-width wrapper ─── */
const W = ({ ch, style = {} }) => (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 48px', ...style }}>{ch}</div>
);

/* ═══════════════════════════════════════════
   §15  FOOTER
═══════════════════════════════════════════ */
const Footer = () => {
    const [email, setEmail] = useState('');
    const cols = [
        {
            h: 'Navigation',
            links: [
                { label: 'Home', href: '/' },
                { label: 'About', href: '/about' },
                { label: 'Services', href: '/services' },
                { label: 'Resources', href: '/resources' }
            ]
        },
        {
            h: 'Services',
            links: [
                { label: 'Health Strategy', href: '/services#strategy' },
                { label: 'Primary Care', href: '/services#primary-care' },
                { label: 'Training', href: '/services#training' },
                { label: 'Tech & Linkages', href: '/services#tech' }
            ]
        },
        {
            h: 'Resources',
            links: [
                { label: 'FAQs', href: '/resources#faqs' },
                { label: 'Blog', href: '/resources#blog' },
                { label: 'Research', href: '/resources#research' },
                { label: 'Press', href: '/resources#press' },
                { label: 'Careers', href: '/resources#careers' },
                { label: 'Contact', href: '/resources#contact' }
            ]
        },
        {
            h: 'Company',
            links: [
                { label: 'About Altura', href: '/about' },
                { label: 'Our Team', href: '/about#team' },
                { label: 'Mission', href: '/about#mission' },
                { label: 'Partners', href: '/about#partners' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Use', href: '/terms' }
            ]
        },
    ];
    const socials = [
        { l: 'f', t: 'Facebook' },
        { l: 'in', t: 'LinkedIn' },
        { l: '▶', t: 'YouTube' },
        { l: '@', t: 'Instagram' },
    ];

    return (
        <footer style={{ background: '#3a6652', padding: '88px 0 40px' }}>
            <W ch={<>
                <div style={{ display: 'grid', gridTemplateColumns: '300px repeat(4,1fr)', gap: 48, marginBottom: 72 }}>
                    {/* Brand col */}
                    <div>
                        <div className="sr" style={{ fontSize: 30, fontWeight: 400, color: '#e8ddc8', marginBottom: 6, letterSpacing: '-0.01em' }}>
                            Altura
                        </div>
                        <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6ecb96', marginBottom: 20 }}>
                            Health Strategies
                        </p>
                        <p style={{ fontSize: 13, color: '#c4b89a', lineHeight: 1.8, fontWeight: 300, marginBottom: 32, maxWidth: 220 }}>
                            Root-cause medicine for Kenya's health system. Architectural health strategies for primary care infrastructure.
                        </p>

                        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6ecb96', marginBottom: 14 }}>
                            Newsletter
                        </p>
                        <div style={{
                            display: 'flex', borderRadius: 99, overflow: 'hidden',
                            border: '1px solid rgba(110,203,150,.12)',
                            background: 'rgba(0,0,0,.22)',
                        }}>
                            <input
                                value={email} onChange={e => setEmail(e.target.value)}
                                placeholder="Your email"
                                style={{
                                    flex: 1, padding: '10px 16px',
                                    background: 'transparent', border: 'none',
                                    color: '#e8ddc8', fontSize: 13, outline: 'none',
                                }}
                            />
                            <button onClick={() => setEmail('')}
                                style={{
                                    padding: '10px 20px', background: '#2a4e40', color: '#e8ddc8',
                                    border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600,
                                    letterSpacing: '0.06em', whiteSpace: 'nowrap', transition: 'background .2s',
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = '#1e3d30'}
                                onMouseLeave={e => e.currentTarget.style.background = '#2a4e40'}
                            >
                                Subscribe
                            </button>
                        </div>

                        <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
                            {socials.map(s => (
                                <a key={s.l} href="#"
                                    style={{
                                        width: 36, height: 36, borderRadius: '50%',
                                        border: '1px solid rgba(110,203,150,.12)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: '#6ecb96', fontSize: 12,
                                        transition: 'border-color .2s, color .2s, background .2s',
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(110,203,150,.3)'; e.currentTarget.style.color = '#e8ddc8'; e.currentTarget.style.background = 'rgba(110,203,150,.06)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(110,203,150,.12)'; e.currentTarget.style.color = '#6ecb96'; e.currentTarget.style.background = 'transparent'; }}
                                    title={s.t}
                                >{s.l}</a>
                            ))}
                        </div>
                    </div>

                    {/* Link cols */}
                    {cols.map(c => (
                        <div key={c.h}>
                            <p style={{
                                fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
                                textTransform: 'uppercase', color: '#6ecb96', marginBottom: 22,
                            }}>
                                {c.h}
                            </p>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 11 }}>
                                {c.links.map(link => (
                                    <li key={link.label}>
                                        <Link
                                            to={link.href}
                                            style={{ fontSize: 13.5, color: '#c4b89a', fontWeight: 300, transition: 'color .2s', display: 'inline-block', textDecoration: 'none' }}
                                            onMouseEnter={e => e.currentTarget.style.color = '#e8ddc8'}
                                            onMouseLeave={e => e.currentTarget.style.color = '#c4b89a'}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div style={{
                    borderTop: '1px solid rgba(110,203,150,.07)', paddingTop: 28,
                    display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, alignItems: 'center',
                }}>
                    <span style={{ fontSize: 12.5, color: '#8aaa96' }}>
                        © 2026 Altura Health Strategies · P.O Box 70036 – 00400, Nairobi, Kenya
                    </span>
                    <div style={{ display: 'flex', gap: 28 }}>
                        {[
                            { label: 'Privacy Policy', href: '/privacy' },
                            { label: 'Terms of Use', href: '/terms' },
                            { label: 'Accessibility', href: '/accessibility' }
                        ].map(link => (
                            <Link
                                key={link.label}
                                to={link.href}
                                style={{ fontSize: 12.5, color: '#8aaa96', transition: 'color .2s', textDecoration: 'none' }}
                                onMouseEnter={e => e.currentTarget.style.color = '#6ecb96'}
                                onMouseLeave={e => e.currentTarget.style.color = '#8aaa96'}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </>} />
        </footer>
    );
};

export default Footer;