import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/useAuth';
import { Menu, X, Building2, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Search Partners', path: '/search' },
    { name: 'Register Business', path: '/register' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-r from-royal via-midnight to-royal text-white shadow-lg shadow-midnight/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-all duration-300">
              <Building2 className="w-6 h-6 text-lavender" />
            </div>
            <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-lavender">
              BINNECT
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative px-1 py-2 text-sm font-medium transition-colors duration-300 
                  ${location.pathname === link.path ? 'text-white' : 'text-lavender hover:text-white'}`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 bottom-0 w-full h-0.5 bg-dusty shadow-[0_0_8px_rgba(75,79,168,0.8)]"
                  />
                )}
              </Link>
            ))}

            {user ? (
              <div className="flex items-center gap-4 ml-4">
                <div className="flex items-center gap-2 text-sm text-lavender/80 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                  <User size={14} />
                  <span>{user.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-lavender hover:text-white hover:bg-white/10 rounded-full transition-all"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn-primary py-2 px-4 text-sm bg-none bg-white text-royal hover:bg-ivory border-0">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-lavender hover:text-white transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-midnight border-t border-white/10"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 rounded-md text-base font-medium text-lavender hover:text-white hover:bg-white/5"
                >
                  {link.name}
                </Link>
              ))}
              {user && (
                 <button
                 onClick={() => { handleLogout(); setIsOpen(false); }}
                 className="w-full text-left px-3 py-3 rounded-md text-base font-medium text-red-300 hover:bg-white/5"
               >
                 Sign Out
               </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;