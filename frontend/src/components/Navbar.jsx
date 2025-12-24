import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { Hexagon, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../context/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // 1. Smooth Scroll Detection with Hysteresis
  useEffect(() => {
    const handleScroll = () => {
      // Buffer of 30px prevents flickering at the very top
      const isScrolled = window.scrollY > 30;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    // Passive listener for optimal performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Search', path: '/search' },
    { name: 'Register', path: '/register' },
  ];

  return (
    // Container: Floats above all content, allows clicks to pass through empty areas
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      
      {/* THE DYNAMIC DOCK */}
      <nav
        className={`
          pointer-events-auto
          flex items-center justify-between
          bg-[#23204A]/80 backdrop-blur-2xl border border-white/10
          shadow-2xl shadow-[#23204A]/20
          
          /* ✨ THE LIQUID MORPH ANIMATION ✨ */
          transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)]
          
          /* State Logic: Header (Top) vs. Dock (Scrolled) */
          ${scrolled
            ? 'w-[92%] max-w-6xl mt-5 rounded-2xl py-3 px-6 border-white/15'  // Scrolled State
            : 'w-full mt-0 rounded-none border-x-0 border-t-0 py-5 px-8 md:px-12 bg-[#23204A]/60' // Top State
          }
        `}
      >
        
        {/* Brand Identity */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-dusty to-royal shadow-lg shadow-black/20 group-hover:scale-110 transition-transform duration-500 ease-out ring-1 ring-white/10">
            <Hexagon className="text-white w-5 h-5" strokeWidth={3} />
          </div>
          <span className="text-xl font-bold tracking-tight text-white hidden sm:block">
            BINNECT
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavPill 
              key={link.name} 
              to={link.path} 
              active={location.pathname === link.path}
            >
              {link.name}
            </NavPill>
          ))}

          <div className="w-[1px] h-6 bg-white/10 mx-3"></div>

          {/* Auth Section */}
          {user ? (
            <div className="flex items-center gap-3 pl-2">
              <span className="text-xs font-semibold text-lavender hidden lg:block tracking-wide uppercase">
                {user.email.split('@')[0]}
              </span>
              <button
                onClick={() => { logout(); navigate('/login'); }}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white hover:bg-red-500/20 hover:text-red-200 hover:border-red-500/30 transition-all duration-300 flex items-center justify-center group"
                title="Sign Out"
              >
                <LogOut size={16} className="group-hover:scale-110 transition-transform duration-300"/>
              </button>
            </div>
          ) : (
            <Link 
                to="/login" 
                className="px-6 py-2.5 rounded-full bg-white text-royal font-bold text-sm hover:bg-ivory hover:scale-105 transition-all duration-300 shadow-xl shadow-white/5"
            >
                Login
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsMobileOpen(!isMobileOpen)} 
          className="md:hidden text-white p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Dropdown */}
        {isMobileOpen && (
            <div className="absolute top-full left-0 right-0 mt-3 p-2 bg-[#23204A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200 origin-top">
                {navLinks.map((link) => (
                    <Link 
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMobileOpen(false)}
                    className="text-center text-lavender hover:text-white hover:bg-white/10 py-3 rounded-xl transition-all font-medium"
                    >
                    {link.name}
                    </Link>
                ))}
                <div className="h-[1px] bg-white/10 my-2 mx-4"></div>
                {user ? (
                    <button onClick={() => { logout(); setIsMobileOpen(false); }} className="text-center text-red-400 hover:bg-red-500/10 py-3 rounded-xl transition-all font-medium">
                        Logout
                    </button>
                ) : (
                    <Link to="/login" onClick={() => setIsMobileOpen(false)} className="text-center bg-white text-royal py-3 rounded-xl font-bold mx-2">
                        Login Now
                    </Link>
                )}
            </div>
        )}

      </nav>
    </div>
  );
};

// --- 🎨 Premium Pill Animation (GSAP) ---
const NavPill = ({ children, to, active }) => {
  const containerRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);
  const tlRef = useRef(null);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Calculate dynamic size for the hover circle
    const { width: w, height: h } = el.getBoundingClientRect();
    const diameter = Math.max(w, h) * 1.5;

    // Initial GSAP State
    gsap.set(circleRef.current, {
      width: diameter,
      height: diameter,
      xPercent: -50,
      yPercent: 50,
      scale: 0,
      transformOrigin: "50% 50%", 
    });

    // Create Timeline
    const tl = gsap.timeline({ paused: true, defaults: { ease: "power2.out", duration: 0.4 } });
    
    // Animation: Expand Glow & Pop Text
    tl.to(circleRef.current, { scale: 1, yPercent: -50 }, 0);
    tl.to(textRef.current, { scale: 1.05, color: '#FFFFFF' }, 0);

    tlRef.current = tl;
    return () => tl.kill();
  }, [children]);

  return (
    <Link
      to={to}
      ref={containerRef}
      onMouseEnter={() => tlRef.current?.play()}
      onMouseLeave={() => tlRef.current?.reverse()}
      className={`
        relative overflow-hidden inline-flex items-center justify-center 
        px-5 py-2 rounded-full font-medium text-sm transition-all duration-300
        ${active ? 'text-white' : 'text-lavender/80'}
      `}
    >
      {/* Active State Indicator (Subtle Ring) */}
      {active && (
         <span className="absolute inset-0 bg-white/5 rounded-full border border-white/10" />
      )}

      {/* Hover Effect Layer (Animated) */}
      <span 
        ref={circleRef}
        className="absolute left-1/2 bottom-0 rounded-full bg-white/10 pointer-events-none blur-md"
      />

      <span ref={textRef} className="relative z-10 block leading-none">
        {children}
      </span>
    </Link>
  );
};

export default Navbar;