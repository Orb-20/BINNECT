import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Globe, Zap, Users, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-pearl">
      
      {/* --- Ambient Background Gradients --- */}
      <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-b from-royal to-pearl -z-20" />
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-dusty/20 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-[-10%] w-[600px] h-[600px] bg-lavender/30 rounded-full blur-[100px] -z-10" />

      {/* --- Hero Section --- */}
      <section className="pt-40 pb-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-lavender text-sm mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-sage animate-pulse"></span>
            The #1 Trusted B2B Network
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold tracking-tight text-white mb-8"
          >
            Connect without <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lavender to-white">Compromise.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-lavender/80 max-w-2xl mx-auto mb-12 leading-relaxed"
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
            <Link to="/search" className="btn-royal text-lg">
              Start Searching <ArrowRight size={20} />
            </Link>
            <Link to="/register" className="btn-ghost text-white border-white/30 hover:bg-white/10 hover:text-white">
              Register Business
            </Link>
          </motion.div>
        </div>
      </section>

      {/* --- Stats Banner --- */}
      <section className="border-y border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            <Stat number="10k+" label="Active Businesses" />
            <Stat number="$500M" label="Value Generated" />
            <Stat number="98%" label="Trust Score" />
            <Stat number="24/7" label="Support" />
        </div>
      </section>

      {/* --- Value Proposition (Floating Cards) --- */}
      <section className="py-32">
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
    <h4 className="text-4xl font-bold text-white mb-1">{number}</h4>
    <p className="text-lavender text-sm uppercase tracking-wider">{label}</p>
  </div>
);

const ValueCard = ({ icon, title, desc, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
    className="premium-card p-10 group"
  >
    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pearl to-cloud border border-white flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-sm">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-graphite mb-4">{title}</h3>
    <p className="text-slate leading-relaxed">{desc}</p>
  </motion.div>
);

export default Home;