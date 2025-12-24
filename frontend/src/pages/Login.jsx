import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Access Granted", { icon: 'bx-check-shield' });
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success("Account Created");
      }
      navigate("/");
    } catch (error) {
      toast.error(error.message.replace("Firebase: ", ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-pearl relative overflow-hidden">
        {/* Abstract Background Art */}
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-royal/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-dusty/5 rounded-full blur-[100px]" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="premium-card w-full max-w-md p-8 md:p-12 border-white/80 shadow-2xl"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-royal mb-2 tracking-tight">
            {isLogin ? "Welcome Back" : "Start Here"}
          </h2>
          <p className="text-slate text-sm">
            {isLogin ? "Enter your credentials to access the network." : "Join the premium B2B ecosystem."}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-royal/70 uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate/40 group-focus-within:text-royal transition-colors" size={20} />
              <input
                type="email"
                className="input-royal pl-12"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-royal/70 uppercase tracking-widest ml-1">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate/40 group-focus-within:text-royal transition-colors" size={20} />
              <input
                type="password"
                className="input-royal pl-12"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-royal w-full mt-4"
          >
            {loading ? <Loader2 className="animate-spin" /> : (
                <>
                {isLogin ? "Sign In" : "Create Account"} <ArrowRight size={18} />
                </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-lavender/30">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-slate hover:text-royal transition-colors font-medium"
          >
            {isLogin ? "New to Binnect? Apply for access." : "Already have an account? Sign in."}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;