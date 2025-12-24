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
        toast.success("Welcome back!");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success("Account created successfully!");
      }
      navigate("/");
    } catch (error) {
      toast.error(error.message.replace("Firebase: ", ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-4 relative">
        {/* Background blobs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-royal/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-dusty/10 rounded-full blur-3xl -z-10 animate-pulse delay-700"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-card w-full max-w-md p-8 md:p-10"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-royal mb-2">
            {isLogin ? "Welcome Back" : "Join Binnect"}
          </h2>
          <p className="text-slate text-sm">
            {isLogin ? "Access your business dashboard" : "Start your B2B journey today"}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-5">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-royal uppercase tracking-wider ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate/40" size={18} />
              <input
                type="email"
                className="input-primary pl-10"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-royal uppercase tracking-wider ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate/40" size={18} />
              <input
                type="password"
                className="input-primary pl-10"
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
            className="btn-primary w-full mt-4"
          >
            {loading ? <Loader2 className="animate-spin" /> : (
                <>
                {isLogin ? "Sign In" : "Create Account"} <ArrowRight size={18} />
                </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate text-sm">
            {isLogin ? "New to Binnect? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-dusty font-semibold hover:text-royal transition-colors"
            >
              {isLogin ? "Register here" : "Login here"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;