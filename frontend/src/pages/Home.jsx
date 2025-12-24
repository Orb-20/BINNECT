import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ShieldCheck, Globe, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const heroRef = useRef(null);

  // Track scroll progress of the hero section
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  /* 1. Text scrolls upward naturally */
  const textY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);

  /* 2. Middle models move outward (Opening the gate) 
     - Reduced distance to +/- 160 because fixed models are now CLOSER
  */
  const model2X = useTransform(scrollYProgress, [0.2, 0.6], [0, -160]);
  const model3X = useTransform(scrollYProgress, [0.2, 0.6], [0, 160]);

  /* 3. CTA text appears EARLIER 
     - Starts at 0.40 (quick response)
     - Fully visible by 0.60
  */
  const ctaOpacity = useTransform(scrollYProgress, [0.40, 0.60], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.40, 0.60], [30, 0]);

  return (
    <div className="min-h-screen bg-haze font-sans selection:bg-twilight selection:text-white">
      
      {/* --- HERO SECTION --- 
          Height is 200vh to give enough scroll room for the animation sequence 
      */}
      <section
        ref={heroRef}
        className="relative min-h-[200vh] bg-hero-premium px-6 lg:px-8"
      >
        {/* Sticky Container: Keeps content in view while we scroll through animations */}
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center w-full overflow-hidden">

          {/* BACKGROUND AMBIENCE */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/80 via-haze to-haze z-0 pointer-events-none" />

          {/* MAIN CONTENT WRAPPER */}
          <div className="relative w-full max-w-7xl mx-auto flex flex-col items-center">

            {/* HEADLINE 
               - Added mt-32 to push it LOWER
               - z-0 so it sits BEHIND the models if they overlap
            */}
            <motion.div style={{ y: textY }} className="relative z-0 mb-8 mt-32 text-center">
              <h1 className="text-6xl md:text-8xl font-bold text-royal leading-tight tracking-tighter">
                Connect without
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-twilight to-royal">
                  Compromise.
                </span>
              </h1>
            </motion.div>

            {/* MODELS CONTAINER 
               - Reduced width to max-w-6xl to keep fixed models closer
               - Negative margin top to allow overlap with text
            */}
            <div className="relative w-full max-w-6xl h-[400px] md:h-[500px] flex justify-center items-end pointer-events-none z-20 mt-[-60px]">
              
              {/* Model 1 (Static - Anchored Left but CLOSER) */}
              <div className="absolute left-0 md:left-24 bottom-0">
                 <img
                  src="/model-1.png"
                  alt="Executive Left"
                  className="h-56 md:h-96 object-contain brightness-95"
                />
              </div>

              {/* INNER GROUP (Starts Center, Splits Outward) */}
              <div className="flex items-end justify-center mb-0 relative z-20">
                 {/* Model 2 (Moves Left to meet Model 1) */}
                <motion.img
                  src="/model-2.png"
                  alt="Executive"
                  style={{ x: model2X }}
                  className="h-60 md:h-[26rem] object-contain drop-shadow-2xl relative left-8" 
                />

                {/* Model 3 (Moves Right to meet Model 4) */}
                <motion.img
                  src="/model-3.png"
                  alt="Executive"
                  style={{ x: model3X }}
                  className="h-60 md:h-[26rem] object-contain drop-shadow-2xl relative right-8" 
                />
              </div>

              {/* Model 4 (Static - Anchored Right but CLOSER) */}
              <div className="absolute right-0 md:right-24 bottom-0">
                <img
                  src="/model-4.png"
                  alt="Executive Right"
                  className="h-56 md:h-96 object-contain brightness-95"
                />
              </div>
            </div>

            {/* SCROLL-REVEALED CTA 
                Appears in the space created by the moving models
            */}
            <motion.div
              style={{ opacity: ctaOpacity, y: ctaY }}
              className="absolute bottom-24 md:bottom-32 z-30 w-full px-4"
            >
              <div className="bg-white/70 backdrop-blur-md px-10 py-8 rounded-2xl border border-white/50 shadow-lg max-w-lg mx-auto text-center">
                  <p className="text-xl text-royal/80 mb-6 font-medium leading-relaxed">
                    Build trusted partnerships without middlemen.<br/> 
                    <span className="text-sm opacity-70">Direct. Verified. Secure.</span>
                  </p>

                  <div className="flex justify-center gap-4">
                    <Link to="/search" className="btn-primary text-lg shadow-lg hover:shadow-royal/20 transition-all">
                        Start with us <ArrowRight size={20} />
                    </Link>
                  </div>
              </div>
            </motion.div>

          </div>

          {/* Scroll Indicator */}
           <motion.div 
              style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-royal/40"
            >
              <span className="text-xs uppercase tracking-widest font-bold">Scroll to Connect</span>
              <div className="w-px h-12 bg-gradient-to-b from-royal/40 to-transparent"></div>
            </motion.div>

        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="relative z-20 bg-white border-y border-royal/5">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <Stat number="10k+" label="Active Businesses" />
            <Stat number="$500M" label="Value Generated" />
            <Stat number="98%" label="Trust Score" />
            <Stat number="24/7" label="Support" />
        </div>
      </section>

      {/* --- VALUE PROPOSITION SECTION --- */}
      <section className="relative z-20 py-32 bg-pearl">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-royal mb-6">Built for the <span className="text-twilight">Modern Economy</span></h2>
            <p className="max-w-2xl mx-auto text-royal/60 text-lg">
              We've redesigned the B2B landscape to prioritize speed, trust, and autonomy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard 
              icon={<Globe className="text-royal" size={32} />}
              title="Global Authority"
              desc="Access a curated network of verified suppliers across state and national borders."
              delay={0}
            />
            <ValueCard 
              icon={<ShieldCheck className="text-twilight" size={32} />}
              title="Verified Trust"
              desc="Our verification process ensures you only deal with legitimate, high-value entities."
              delay={0.2}
            />
            <ValueCard 
              icon={<TrendingUp className="text-indigo-600" size={32} />}
              title="Direct Growth"
              desc="Remove agency fees from your bottom line. Negotiate terms that work for you."
              delay={0.4}
            />
          </div>

          <div className="mt-24 text-center">
            <Link to="/register" className="inline-flex items-center gap-2 px-8 py-4 bg-royal text-white rounded-full font-bold hover:bg-royal/90 transition-all shadow-lg hover:shadow-royal/20 hover:-translate-y-1">
              Join the Network <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// Sub-components
const Stat = ({ number, label }) => (
  <div className="text-center">
    <h4 className="text-4xl md:text-5xl font-bold text-royal mb-2">{number}</h4>
    <p className="text-royal/60 text-xs md:text-sm uppercase tracking-widest font-bold">{label}</p>
  </div>
);

const ValueCard = ({ icon, title, desc, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
    className="bg-white p-10 rounded-2xl shadow-sm border border-royal/5 hover:shadow-xl transition-shadow duration-300" 
  >
    <div className="w-16 h-16 rounded-2xl bg-haze/50 flex items-center justify-center mb-8 text-royal">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-royal mb-4">{title}</h3>
    <p className="text-royal/70 leading-relaxed">{desc}</p>
  </motion.div>
);

export default Home;