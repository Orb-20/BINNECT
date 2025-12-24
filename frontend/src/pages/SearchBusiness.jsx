import React, { useState } from 'react';
import { useAuth } from '../context/useAuth';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Briefcase, Star, Filter } from 'lucide-react';
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
    if (!token) {
        toast.error("Please login to search.");
        return;
    }
    setLoading(true);
    setHasSearched(true);

    try {
      const response = await fetch(`http://localhost:5000/api/businesses/search?query=${query}&city=${city}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch results");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 pb-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Search Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-royal mb-4">Find Your Next Partner</h2>
          
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto relative glass-card p-2 flex flex-col md:flex-row gap-2">
             <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate/40" size={20}/>
                <input 
                    type="text" 
                    placeholder="Service or Industry (e.g. Plumbing)" 
                    className="w-full pl-10 pr-4 py-3 bg-transparent focus:outline-none text-graphite placeholder:text-slate/50"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
             </div>
             <div className="w-px bg-lavender/50 hidden md:block"></div>
             <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate/40" size={20}/>
                <input 
                    type="text" 
                    placeholder="City (Optional)" 
                    className="w-full pl-10 pr-4 py-3 bg-transparent focus:outline-none text-graphite placeholder:text-slate/50"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
             </div>
             <button type="submit" className="btn-primary md:w-auto w-full">
                 Search
             </button>
          </form>
        </div>

        {/* Results Grid */}
        <div className="mt-8">
            {loading ? (
                <div className="flex justify-center py-20">
                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-royal"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                    {results.map((biz, index) => (
                        <motion.div
                            key={biz._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card hover:shadow-2xl transition-all duration-300 group overflow-hidden border-l-4 border-l-transparent hover:border-l-dusty"
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-cloud rounded-lg text-royal group-hover:bg-royal group-hover:text-white transition-colors">
                                        <Briefcase size={24} />
                                    </div>
                                    <span className="flex items-center gap-1 text-sm font-semibold text-royal bg-lavender/20 px-2 py-1 rounded">
                                        <Star size={14} className="fill-royal text-royal"/> {biz.rating || 4.5}
                                    </span>
                                </div>
                                
                                <h3 className="text-xl font-bold text-graphite mb-1">{biz.name}</h3>
                                <p className="text-slate text-sm mb-4 flex items-center gap-1">
                                    <MapPin size={14} /> {biz.city}, {biz.state}
                                </p>

                                <div className="space-y-3 mb-6">
                                    <div className="flex flex-wrap gap-2">
                                        {biz.services.slice(0, 3).map((service, i) => (
                                            <span key={i} className="text-xs bg-white border border-lavender/50 text-slate px-2 py-1 rounded-md">
                                                {service}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-lavender/30">
                                    <span className="text-sm font-medium text-slate">
                                        {biz.pricing || "Contact for pricing"}
                                    </span>
                                    <button className="text-dusty font-semibold text-sm hover:text-royal transition-colors">
                                        View Details &rarr;
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    </AnimatePresence>
                </div>
            )}
            
            {hasSearched && results.length === 0 && !loading && (
                <div className="text-center py-20 text-slate">
                    <Filter size={48} className="mx-auto mb-4 text-lavender" />
                    <p className="text-xl">No businesses found matching your criteria.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default SearchBusiness;