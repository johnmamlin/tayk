import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, ArrowUpRight } from 'lucide-react';
import { NAV_DATA } from './Navbar';

const T = {
  dn: '#0a1628',
  dn2: '#1a3560',
  dn3: '#4a6080',
  em: '#50C878',
  fo: '#1e3d30',
  cr: '#f5f1eb',
};

export default function MobileMenu({ open, onClose, navData, location }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 600,
            display: 'flex',
            flexDirection: 'column',
            background: T.cr,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '20px 24px',
              borderBottom: `1px solid ${T.fo}10`,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '26px',
                  fontWeight: 700,
                  color: T.dn,
                  letterSpacing: '-0.02em',
                  fontFamily: "'Cormorant Garamond', serif",
                }}
              >
                Altura
              </div>
              <div
                style={{
                  fontSize: '8px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  color: `${T.dn}60`,
                }}
              >
                Health Strategies
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                background: `${T.fo}0a`,
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: T.dn,
                transition: 'background 0.2s',
              }}
              onMouseOver={e => e.currentTarget.style.background = `${T.fo}14`}
              onMouseOut={e => e.currentTarget.style.background = `${T.fo}0a`}
            >
              <X size={20} strokeWidth={2} />
            </button>
          </div>

          {/* Nav Links */}
          <nav
            style={{
              flex: 1,
              padding: '32px 28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            {navData.map((item, i) => {
              const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/');
              const isExactMatch = location.pathname === item.href;

              const handleClick = (e) => {
                if (isExactMatch) {
                  e.preventDefault();
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                  });
                }
                onClose();
              };

              return (
                <motion.div
                  key={item.id}
                  initial={{ x: -24, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -24, opacity: 0 }}
                  transition={{
                    delay: i * 0.06,
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                >
                  <Link
                    to={item.href}
                    onClick={handleClick}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '14px 16px',
                      borderRadius: '12px',
                      textDecoration: 'none',
                      background: isActive ? `${T.fo}08` : 'transparent',
                      color: isActive ? T.dn : `${T.dn}90`,
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '18px',
                      fontWeight: isActive ? 600 : 400,
                      letterSpacing: '-0.01em',
                      transition: 'all 0.2s',
                      borderLeft: isActive ? `3px solid ${T.dn}` : '3px solid transparent',
                    }}
                  >
                    {item.label}
                    <ArrowUpRight
                      size={14}
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? 'translate(0,0)' : 'translate(-4px, 4px)',
                        transition: 'all 0.2s',
                        color: T.dn,
                      }}
                    />
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* CTA Area */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            style={{
              padding: '20px 24px 32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              background: 'white',
              borderTop: `1px solid ${T.fo}10`,
            }}
          >
            <Link
              to="/contact"
              onClick={onClose}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: T.dn,
                color: 'white',
                padding: '15px',
                borderRadius: '100px',
                textDecoration: 'none',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                boxShadow: `0 8px 32px ${T.dn}40`,
                transition: 'all 0.3s',
              }}
              onMouseOver={e => {
                e.currentTarget.style.background = T.dn2;
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = T.dn;
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Contact
              <ArrowUpRight size={14} strokeWidth={2.5} />
            </Link>
            <Link
              to="/resources"
              onClick={onClose}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: 'transparent',
                color: T.dn,
                padding: '14px',
                borderRadius: '100px',
                textDecoration: 'none',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                border: `1.5px solid ${T.dn}30`,
                transition: 'all 0.2s',
              }}
              onMouseOver={e => e.currentTarget.style.borderColor = `${T.dn}80`}
              onMouseOut={e => e.currentTarget.style.borderColor = `${T.dn}30`}
            >
              Resources
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
