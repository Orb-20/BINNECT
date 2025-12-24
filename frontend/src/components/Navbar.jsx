import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { Hexagon, Menu, X, User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../context/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  // 1. Get current location needed for modal background routing
  const location = useLocation(); 
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 30;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Search', path: '/search' },
    { name: 'Register', path: '/register' },
  ];

  useEffect(() => {
    const handleClick = () => setIsProfileOpen(false);
    if (isProfileOpen) window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [isProfileOpen]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    setIsProfileOpen(false);
  };

  // Helper to pass background location state to links
  const getModalState = (isSignup) => ({
    isSignup,
    // IMPORTANT: This tells App.jsx to keep the current page visible behind the login modal
    backgroundLocation: location 
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <nav
        className={`
          pointer-events-auto
          flex items-center justify-between
          bg-[#23204A]/80 backdrop-blur-2xl border border-white/10
          shadow-2xl shadow-[#23204A]/20
          transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)]
          ${scrolled
            ? 'w-[92%] max-w-6xl mt-5 rounded-2xl py-3 px-6 border-white/15'
            : 'w-full mt-0 rounded-none border-x-0 border-t-0 py-5 px-8 md:px-12 bg-[#23204A]/60'
          }
        `}
      >
        {/* Brand */}
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
             <div className="relative pl-2" onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 group"
                >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-royal to-dusty flex items-center justify-center shadow-inner">
                        <User size={16} className="text-white" />
                    </div>
                </button>

                {isProfileOpen && (
                    <div className="absolute top-full right-0 mt-3 w-48 bg-[#23204A] border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                        <div className="p-1">
                            <Link to="/register" className="flex items-center gap-3 px-4 py-3 text-sm text-lavender hover:bg-white/10 hover:text-white rounded-lg transition-colors">
                                <Settings size={16} />
                                Profile
                            </Link>
                            <div className="h-[1px] bg-white/10 my-1 mx-2"></div>
                            <button 
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-colors text-left"
                            >
                                <LogOut size={16} />
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>
          ) : (
            <div className="flex items-center gap-3 pl-2">
                {/* Update Login Link with state */}
                <Link 
                    to="/login" 
                    state={getModalState(false)}
                    className="text-sm font-semibold text-lavender hover:text-white transition-colors"
                >
                    Login
                </Link>
                {/* Update Sign Up Link with state */}
                <Link 
                    to="/signup"
                    state={getModalState(true)}
                    className="px-5 py-2 rounded-full bg-white text-royal font-bold text-sm hover:bg-ivory hover:scale-105 transition-all duration-300 shadow-xl shadow-white/5"
                >
                    Sign Up
                </Link>
            </div>
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
                    <>
                        <Link 
                            to="/register"
                            onClick={() => setIsMobileOpen(false)}
                            className="text-center text-lavender hover:text-white hover:bg-white/10 py-3 rounded-xl transition-all font-medium"
                        >
                            My Profile
                        </Link>
                        <button 
                            onClick={() => { handleLogout(); setIsMobileOpen(false); }} 
                            className="text-center text-red-400 hover:bg-red-500/10 py-3 rounded-xl transition-all font-medium"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <div className="flex flex-col gap-2 p-2">
                         <Link 
                            to="/login" 
                            state={getModalState(false)}
                            onClick={() => setIsMobileOpen(false)} 
                            className="text-center text-lavender hover:text-white py-3 font-semibold"
                        >
                            Login
                        </Link>
                        <Link 
                            to="/signup"
                            state={getModalState(true)}
                            onClick={() => setIsMobileOpen(false)} 
                            className="text-center bg-white text-royal py-3 rounded-xl font-bold"
                        >
                            Sign Up
                        </Link>
                    </div>
                )}
            </div>
        )}

      </nav>
    </div>
  );
};

// ... (NavPill component remains exactly the same)
const NavPill = ({ children, to, active }) => {
  const containerRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);
  const tlRef = useRef(null);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const { width: w, height: h } = el.getBoundingClientRect();
    const diameter = Math.max(w, h) * 1.5;

    gsap.set(circleRef.current, {
      width: diameter,
      height: diameter,
      xPercent: -50,
      yPercent: 50,
      scale: 0,
      transformOrigin: "50% 50%", 
    });

    const tl = gsap.timeline({ paused: true, defaults: { ease: "power2.out", duration: 0.4 } });
    
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
      {active && (
         <span className="absolute inset-0 bg-white/5 rounded-full border border-white/10" />
      )}
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