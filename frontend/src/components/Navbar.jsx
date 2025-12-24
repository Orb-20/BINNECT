import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/useAuth';
import { Menu, X, Hexagon, LogOut, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add glass effect on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Search', path: '/search' },
    { name: 'Register', path: '/register' },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
        ? 'bg-midnight/90 backdrop-blur-md shadow-lg border-b border-white/5 py-3' 
        : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Brand Identity */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-dusty to-royal shadow-lg shadow-royal/30 group-hover:scale-105 transition-transform duration-300">
              <Hexagon className="text-white w-6 h-6" strokeWidth={2.5} />
            </div>
            <span className={`text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-lavender ${!scrolled && 'text-royal'}`}>
              BINNECT
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <div className="flex bg-white/5 rounded-full p-1 border border-white/10 backdrop-blur-sm mr-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300"
                >
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/10 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className={`${location.pathname === link.path ? 'text-white' : 'text-lavender hover:text-white'}`}>
                    {link.name}
                  </span>
                </Link>
              ))}
            </div>

            {user ? (
              <div className="flex items-center gap-4">
                <div className="text-right hidden lg:block">
                  <p className="text-xs text-lavender font-medium">Signed in as</p>
                  <p className="text-sm text-white font-semibold truncate max-w-[150px]">{user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2.5 bg-white/5 hover:bg-red-500/20 text-lavender hover:text-red-200 rounded-full border border-white/10 transition-all duration-300"
                  title="Sign Out"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn-royal py-2.5 px-6 text-sm shadow-none">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-midnight border-t border-white/10 overflow-hidden"
          >
            <div className="px-6 py-8 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block text-lg font-medium text-lavender hover:text-white pl-4 border-l-2 border-transparent hover:border-dusty transition-all"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;