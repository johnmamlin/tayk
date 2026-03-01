import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Care',         href: '/services'   },
  { label: 'Conditions',   href: '/conditions' },
  { label: 'Our Approach', href: '/about'      },
  { label: 'Resources',    href: '/docs'       },
  { label: 'Contact',      href: '/contact'    },
];

const SPRING = { type: 'spring', stiffness: 340, damping: 30 };

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => setMobileOpen(false), [location.pathname]);

  const active = (href) => location.pathname === href;
  /* on home page at top → transparent with white text */
  const ghost  = location.pathname === '/' && !scrolled;

  return (
    <>
      {/* ════════════════ MAIN BAR ════════════════ */}
      <header
        className={[
          'fixed top-0 left-0 right-0 z-[400] w-full transition-all duration-300',
          scrolled
            ? 'bg-white/95 backdrop-blur-xl border-b border-[var(--color-border)] shadow-sm'
            : ghost
              ? 'bg-transparent'
              : 'bg-white/95 border-b border-[var(--color-border)]',
        ].join(' ')}
      >
        <div className="flex items-center justify-between w-full h-[70px] px-12">

          {/* LOGO */}
          <Link
            to="/"
            className="shrink-0 font-serif text-[22px] font-semibold tracking-[0.1em] uppercase transition-colors duration-300"
            style={{ color: ghost ? '#fff' : 'var(--color-forest)' }}
          >
            Altura
          </Link>

          {/* CENTER NAV — desktop only */}
          <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="relative px-[18px] py-2 text-[14px] rounded-full transition-all duration-200"
                style={{
                  fontWeight:      active(item.href) ? 500 : 400,
                  color:           active(item.href)
                    ? (ghost ? '#fff' : 'var(--color-forest)')
                    : (ghost ? 'rgba(255,255,255,0.72)' : 'var(--color-muted)'),
                  backgroundColor: 'transparent',
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = ghost
                  ? 'rgba(255,255,255,0.10)'
                  : 'rgba(30,61,48,0.07)'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                {item.label}
                {active(item.href) && (
                  <motion.span
                    layoutId="nav-dot"
                    transition={SPRING}
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full block"
                    style={{ backgroundColor: ghost ? 'var(--color-sand)' : 'var(--color-forest)' }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* RIGHT: CTAs + burger */}
          <div className="flex items-center gap-2.5 shrink-0">

            {/* Start with labs — outlined */}
            <Link
              to="/services"
              className="hidden md:inline-flex items-center px-5 py-2 rounded-full text-[13px] font-medium border transition-all duration-200"
              style={{
                borderColor: ghost ? 'rgba(255,255,255,0.40)' : 'var(--color-border)',
                color:       ghost ? '#fff' : 'var(--color-forest)',
                background:  'transparent',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor  = ghost ? 'rgba(255,255,255,0.75)' : 'var(--color-forest)';
                e.currentTarget.style.background   = ghost ? 'rgba(255,255,255,0.10)' : 'var(--color-mint)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor  = ghost ? 'rgba(255,255,255,0.40)' : 'var(--color-border)';
                e.currentTarget.style.background   = 'transparent';
              }}
            >
              Start with labs
            </Link>

            {/* Get care — solid */}
            <Link
              to="/contact"
              className="hidden md:inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-[13px] font-semibold text-white border transition-all duration-200"
              style={{
                background:  ghost ? 'rgba(255,255,255,0.15)' : 'var(--color-forest)',
                borderColor: ghost ? 'rgba(255,255,255,0.30)' : 'var(--color-forest)',
              }}
              onMouseEnter={e => e.currentTarget.style.background = ghost
                ? 'rgba(255,255,255,0.25)'
                : 'var(--color-forest-dark)'}
              onMouseLeave={e => e.currentTarget.style.background = ghost
                ? 'rgba(255,255,255,0.15)'
                : 'var(--color-forest)'}
            >
              Get care <ArrowUpRight size={13} strokeWidth={2.5} />
            </Link>

            {/* Mobile burger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden w-10 h-10 rounded-full border flex items-center justify-center transition-colors duration-200"
              style={{
                borderColor: ghost ? 'rgba(255,255,255,0.35)' : 'var(--color-border)',
                background:  ghost ? 'rgba(255,255,255,0.10)' : '#fff',
                color:       ghost ? '#fff' : 'var(--color-forest)',
              }}
            >
              <Menu size={18} strokeWidth={2} />
            </button>
          </div>
        </div>
      </header>

      {/* ════════════════ MOBILE DRAWER ════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/45 z-[500]"
            />
            <motion.div
              key="drawer"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
              className="fixed top-0 right-0 bottom-0 w-[300px] z-[600] flex flex-col px-8 pt-7 pb-12"
              style={{ backgroundColor: 'var(--color-cream)' }}
            >
              {/* header */}
              <div className="flex justify-between items-center mb-12">
                <span
                  className="font-serif text-[22px] font-semibold tracking-[0.08em]"
                  style={{ color: 'var(--color-forest)' }}
                >
                  Altura
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-9 h-9 rounded-full border flex items-center justify-center"
                  style={{ borderColor: 'var(--color-border)', background: '#fff', color: 'var(--color-forest)' }}
                >
                  <X size={16} />
                </button>
              </div>

              {/* links */}
              <nav className="flex-1">
                {NAV_LINKS.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.055, duration: 0.28 }}
                  >
                    <Link
                      to={item.href}
                      className="flex items-center justify-between py-4 text-[17px]"
                      style={{
                        borderBottom: `1px solid var(--color-border)`,
                        fontWeight:   active(item.href) ? 600 : 400,
                        color:        active(item.href) ? 'var(--color-forest)' : 'var(--color-muted)',
                      }}
                    >
                      {item.label}
                      {active(item.href) && (
                        <span className="w-1.5 h-1.5 rounded-full block"
                          style={{ background: 'var(--color-forest)' }} />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* CTAs */}
              <div className="flex flex-col gap-3">
                <Link to="/services"
                  className="flex items-center justify-center py-3 px-6 rounded-full text-[14px] font-medium border"
                  style={{ borderColor: 'var(--color-border)', color: 'var(--color-forest)' }}>
                  Start with labs
                </Link>
                <Link to="/contact"
                  className="flex items-center justify-center gap-2 py-3 px-6 rounded-full text-[14px] font-semibold text-white"
                  style={{ background: 'var(--color-forest)' }}>
                  Get care <ArrowUpRight size={14} />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}