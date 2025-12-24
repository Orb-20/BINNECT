import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Globe, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-pearl">
      
      {/* ✅ HERO SECTION: The "Premium Container" 
        - Applies the new bg-hero-premium (layered gradient + radial glow)
        - Includes the optional noise grain for texture
      */}
      <section className="relative overflow-hidden bg-hero-premium pt-40 pb-24 px-6 lg:px-8">
        
        {/* 🎨 Grain Texture Layer (Opacity 3%) */}
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none z-0"></div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-lavender/40 text-royal text-sm font-medium shadow-sm mb-8 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-sage animate-pulse"></span>
            The #1 Trusted B2B Network
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold tracking-tight text-royal mb-8"
          >
            Connect without <br/>
            {/* Gradient text matches the brand glow */}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-dusty to-royal">Compromise.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-slate/90 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Eliminate middlemen and establish direct, authoritative partnerships. 
            Binnect provides the executive tools you need for serious B2B engagement.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/search" className="btn-primary text-lg shadow-royal/20">
              Start Searching <ArrowRight size={20} />
            </Link>
            <Link to="/register" className="btn-secondary text-lg">
              Register Business
            </Link>
          </motion.div>
        </div>
      </section>

      {/* --- Stats Banner (Sitting on Flat Pearl, creating contrast) --- */}
      <section className="border-y border-lavender/20 bg-ivory/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            <Stat number="10k+" label="Active Businesses" />
            <Stat number="$500M" label="Value Generated" />
            <Stat number="98%" label="Trust Score" />
            <Stat number="24/7" label="Support" />
        </div>
      </section>

      {/* --- Value Proposition --- */}
      <section className="py-32 bg-pearl">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard 
              icon={<Globe className="text-royal" size={32} />}
              title="Global Authority"
              desc="Access a curated network of verified suppliers across state and national borders."
              delay={0}
            />
            <ValueCard 
              icon={<ShieldCheck className="text-sage" size={32} />}
              title="Verified Trust"
              desc="Our Sage Green verification badge ensures you only deal with legitimate entities."
              delay={0.2}
            />
            <ValueCard 
              icon={<TrendingUp className="text-dusty" size={32} />}
              title="Direct Growth"
              desc="Remove agency fees from your bottom line. Negotiate terms that work for you."
              delay={0.4}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const Stat = ({ number, label }) => (
  <div className="text-center">
    <h4 className="text-4xl font-bold text-royal mb-1">{number}</h4>
    <p className="text-slate/80 text-sm uppercase tracking-wider font-medium">{label}</p>
  </div>
);

const ValueCard = ({ icon, title, desc, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
    className="premium-card p-10 group bg-ivory" 
  >
    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pearl to-white border border-lavender/30 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-sm">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-royal mb-4">{title}</h3>
    <p className="text-slate leading-relaxed">{desc}</p>
  </motion.div>
);

export default Home;