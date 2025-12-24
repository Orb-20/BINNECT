import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Loader2, X, Hexagon } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const initialIsSignup = location.pathname === '/signup' || location.state?.isSignup;
  const [isLogin, setIsLogin] = useState(!initialIsSignup);
  const isModal = !!location.state?.backgroundLocation;
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
     const currentlySignup = location.pathname === '/signup' || location.state?.isSignup;
     setIsLogin(!currentlySignup);
  }, [location]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Welcome Back", { icon: '👑' });
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success("Account Created Successfully");
      }
      navigate(location.state?.from?.pathname || "/");
    } catch (error) {
      toast.error(error.message.replace("Firebase: ", ""));
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (isModal && location.state?.backgroundLocation) {
        navigate(-1);
    } else {
        navigate('/');
    }
  };

  return (
    // OVERLAY: Deep Lavender-Indigo Backdrop
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        
        {/* Backdrop - darker overlay for focus */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#0F0A1F]/80 backdrop-blur-md transition-all" 
            onClick={handleClose} 
        />

        {/* CARD: The "Royal" Container */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="
                relative w-full max-w-[420px] 
                bg-gradient-to-b from-[#1B003F] to-[#13002E] /* Night Indigo Gradient */
                border border-white/10 
                rounded-lg /* Updated to match new clean aesthetic */
                shadow-2xl shadow-black/50
                overflow-hidden
                flex flex-col
            "
            onClick={(e) => e.stopPropagation()}
        >
            {/* Top Accent Line - Twilight Purple */}
            <div className="h-1 w-full bg-gradient-to-r from-twilight via-dusty to-twilight opacity-70"></div>

            {/* Close Button */}
            <button 
                onClick={handleClose}
                className="absolute top-5 right-5 text-lavender hover:text-white transition-colors z-10"
            >
                <X size={22} />
            </button>

            {/* Content Container */}
            <div className="p-10 pt-12">
                
                {/* 1. BRANDING & LOGO */}
                <div className="flex flex-col items-center justify-center mb-10">
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="mb-4 text-white"
                    >
                        <Hexagon size={48} strokeWidth={1.5} />
                    </motion.div>
                    
                    <h2 className="text-2xl font-serif tracking-wide text-white uppercase">
                        {isLogin ? "Member Login" : "Join Binnect"}
                    </h2>
                    <p className="text-lavender/60 text-xs tracking-[0.2em] mt-2 uppercase font-medium">
                        Professional Network
                    </p>
                </div>

                {/* 2. FORM */}
                <form onSubmit={handleAuth} className="space-y-6">
                    
                    {/* Email Input */}
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-lavender/70 tracking-wider pl-1">
                            Email Address
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Mail size={18} className="text-slate-400 group-focus-within:text-dusty transition-colors" />
                            </div>
                            <input
                                type="email"
                                className="
                                    w-full pl-12 pr-4 py-3.5 
                                    bg-[#2A1B4A]/50 border border-white/10 
                                    text-white placeholder-slate-500 
                                    focus:outline-none focus:border-twilight/80 focus:ring-1 focus:ring-twilight/30 
                                    transition-all rounded-md
                                "
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-lavender/70 tracking-wider pl-1">
                            Password
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock size={18} className="text-slate-400 group-focus-within:text-dusty transition-colors" />
                            </div>
                            <input
                                type="password"
                                className="
                                    w-full pl-12 pr-4 py-3.5 
                                    bg-[#2A1B4A]/50 border border-white/10 
                                    text-white placeholder-slate-500 
                                    focus:outline-none focus:border-twilight/80 focus:ring-1 focus:ring-twilight/30 
                                    transition-all rounded-md
                                "
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Action Button - Twilight Purple */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            w-full mt-6 py-4 
                            bg-twilight text-white 
                            font-bold uppercase tracking-widest text-xs
                            hover:bg-royal transition-all duration-300
                            flex items-center justify-center gap-2
                            border border-transparent hover:tracking-[0.2em] rounded-md
                            shadow-lg shadow-twilight/20
                        "
                    >
                        {loading ? <Loader2 className="animate-spin" size={18} /> : (
                            <>
                                {isLogin ? "Sign In" : "Register Now"} 
                                <ArrowRight size={16} />
                            </>
                        )}
                    </button>
                </form>

                {/* 3. FOOTER SWITCH */}
                <div className="mt-10 pt-6 border-t border-white/5 text-center">
                    <button
                        onClick={() => {
                             setIsLogin(!isLogin);
                             window.history.replaceState(null, '', isLogin ? '/signup' : '/login');
                        }}
                        className="text-slate-400 hover:text-white transition-colors text-xs font-medium"
                    >
                        {isLogin ? (
                            <span>Don't have an account? <span className="text-dusty underline underline-offset-4 decoration-dusty/30">Apply Here</span></span>
                        ) : (
                            <span>Already a member? <span className="text-dusty underline underline-offset-4 decoration-dusty/30">Login Here</span></span>
                        )}
                    </button>
                </div>
            </div>
        </motion.div>
    </div>
  );
};

export default Login;