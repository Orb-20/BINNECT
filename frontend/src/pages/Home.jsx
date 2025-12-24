import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Globe, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const Home = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-royal/5 rounded-full blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-dusty/5 rounded-full blur-3xl opacity-50 -translate-x-1/2 translate-y-1/2"></div>
        </div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.span variants={fadeInUp} className="inline-block py-1 px-3 rounded-full bg-lavender/20 text-royal text-sm font-semibold tracking-wide border border-royal/10 mb-6">
            The Future of B2B Networking
          </motion.span>
          
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold text-graphite tracking-tight mb-6">
            Connect <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal to-dusty">Directly.</span><br />
            No Middlemen.
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="text-xl text-slate mb-10 max-w-2xl mx-auto leading-relaxed">
            Binnect empowers businesses to register services, discover partners, and build long-term value chains without the noise.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/search" className="btn-primary">
              Find Partners <ArrowRight size={18} />
            </Link>
            <Link to="/register" className="btn-secondary">
              Register Business
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white/50 border-t border-lavender/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <FeatureCard 
              icon={<Globe className="text-dusty" size={32} />}
              title="Global Reach"
              desc="Expand your supply chain beyond local limits. Find partners across cities and states instantly."
            />
            <FeatureCard 
              icon={<ShieldCheck className="text-sage" size={32} />}
              title="Verified Trust"
              desc="Our recommendation engine prioritizes rated and verified businesses for safe collaboration."
            />
            <FeatureCard 
              icon={<Zap className="text-royal" size={32} />}
              title="Direct Access"
              desc="Cut out the agency fees. Speak directly to service providers and negotiate your own terms."
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="glass-card p-8 hover:-translate-y-2 transition-transform duration-300">
    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pearl to-cloud border border-white shadow-sm flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-royal mb-3">{title}</h3>
    <p className="text-slate leading-relaxed">{desc}</p>
  </div>
);

export default Home;