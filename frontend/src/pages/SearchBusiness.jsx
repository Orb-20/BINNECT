import React, { useState } from 'react';
import { useAuth } from '../context/useAuth';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Briefcase, CheckCircle, Filter, Star } from 'lucide-react';
import toast from 'react-hot-toast';

const SearchBusiness = () => {
  const { token } = useAuth();
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('');
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!token) return toast.error("Please login first");
    setLoading(true);
    setHasSearched(true);

    try {
      // FIX: Corrected query param to 'service' and Endpoint to /api/business/search
      const response = await fetch(`http://localhost:5000/api/business/search?service=${query}&city=${city}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setResults(data.businesses || []);
    } catch (error) {
      toast.error("Network error");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 px-6 bg-pearl">
      <div className="max-w-7xl mx-auto">
        
        {/* Search Header */}
        <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-royal mb-6">Discover Partners</h1>
            <form onSubmit={handleSearch} className="premium-card p-3 max-w-4xl mx-auto flex flex-col md:flex-row gap-2">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate/40" />
                    <input 
                        className="w-full bg-transparent p-4 pl-12 text-graphite focus:outline-none placeholder:text-slate/40"
                        placeholder="Service, Industry or Keyword..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                <div className="w-[1px] bg-lavender/30 hidden md:block mx-2"></div>
                <div className="flex-1 relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate/40" />
                    <input 
                        className="w-full bg-transparent p-4 pl-12 text-graphite focus:outline-none placeholder:text-slate/40"
                        placeholder="City or State"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn-primary md:w-auto w-full rounded-lg shadow-royal/20">
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </form>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
            <AnimatePresence>
            {results.map((biz, index) => (
                <motion.div
                    key={biz._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="premium-card p-6 hover:translate-y-[-4px] group"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-xl bg-pearl border border-lavender/30 flex items-center justify-center text-royal group-hover:bg-royal group-hover:text-white transition-colors">
                            <Briefcase size={20} />
                        </div>
                        <span className="badge-verified">
                            <CheckCircle size={12} /> Verified
                        </span>
                    </div>
                    
                    {/* FIX: Using businessName */}
                    <h3 className="text-xl font-bold text-royal mb-1">{biz.businessName}</h3>
                    <p className="text-slate text-sm mb-4 flex items-center gap-1">
                        <MapPin size={14} className="text-dusty"/> {biz.location.city}, {biz.location.state}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {biz.servicesOffered.slice(0, 3).map((s, i) => (
                            <span key={i} className="text-xs font-medium text-slate bg-pearl border border-lavender/40 px-2 py-1 rounded">
                                {s}
                            </span>
                        ))}
                    </div>

                    <div className="pt-4 border-t border-lavender/20 flex justify-between items-center">
                        <div className="flex items-center gap-1 text-amber-500">
                             <Star size={14} fill="currentColor"/>
                             <span className="text-sm font-bold text-graphite">{biz.rating || 4.8}</span>
                        </div>
                        <button className="text-sm font-bold text-dusty hover:text-royal transition-colors">
                            View Profile &rarr;
                        </button>
                    </div>
                </motion.div>
            ))}
            </AnimatePresence>
        </div>

        {hasSearched && results.length === 0 && !loading && (
             <motion.div initial={{opacity:0}} animate={{opacity:1}} className="text-center py-20">
                <div className="w-16 h-16 bg-lavender/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Filter className="text-dusty" size={32} />
                </div>
                <h3 className="text-xl font-bold text-royal">No Results Found</h3>
                <p className="text-slate">Try adjusting your search terms or location.</p>
             </motion.div>
        )}
      </div>
    </div>
  );
};

export default SearchBusiness;