import React, { useState } from 'react';
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Building, MapPin, DollarSign, Tag, CheckCircle, X, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

const RegisterBusiness = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  
  // State for form fields
  // Changed 'services' to an array in initial state for better handling
  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    city: '',
    state: '',
    pricing: ''
  });

  // Separate state for the interactive tag input
  const [services, setServices] = useState([]);
  const [currentService, setCurrentService] = useState('');
  
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Tag Input Handlers
  const handleServiceKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmed = currentService.trim();
      if (trimmed && !services.includes(trimmed)) {
        setServices([...services, trimmed]);
        setCurrentService('');
      } else if (services.includes(trimmed)) {
        toast.error('Service already added');
      }
    }
  };

  const removeService = (serviceToRemove) => {
    setServices(services.filter(s => s !== serviceToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
        toast.error("You must be logged in.");
        return;
    }

    if (services.length === 0) {
        toast.error("Please add at least one service.");
        return;
    }

    setSubmitting(true);

    try {
      // Construct payload using the array state directly
      const payload = {
        businessName: formData.businessName,
        industry: formData.industry,
        location: {
            city: formData.city,
            state: formData.state
        },
        servicesOffered: services, // Direct array usage
        pricingRange: formData.pricing
      };

      const response = await fetch('http://localhost:5000/api/business/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Business Registered Successfully!");
        navigate('/search');
      } else {
        toast.error(data.message || "Registration failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-pearl">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-royal">Register Your Business</h2>
          <p className="text-slate mt-2">Join the network and start receiving direct inquiries.</p>
        </div>

        <form onSubmit={handleSubmit} className="premium-card p-8 md:p-10 space-y-6">
            
            {/* Business Name */}
            <div>
                <label className="block text-sm font-semibold text-royal mb-2 flex items-center gap-2">
                    <Building size={16} className="text-dusty"/> Business Name
                </label>
                <input
                    name="businessName" 
                    className="input-primary"
                    placeholder="e.g. Acme Logistics"
                    onChange={handleChange}
                    value={formData.businessName}
                    required
                />
            </div>

            {/* Location Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-royal mb-2 flex items-center gap-2">
                        <Tag size={16} className="text-dusty"/> Industry
                    </label>
                    <input
                        name="industry"
                        className="input-primary"
                        placeholder="e.g. Manufacturing"
                        onChange={handleChange}
                        value={formData.industry}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-royal mb-2 flex items-center gap-2">
                        <DollarSign size={16} className="text-dusty"/> Pricing Model
                    </label>
                    <input
                        name="pricing"
                        className="input-primary"
                        placeholder="e.g. Hourly, Fixed, Per Unit"
                        onChange={handleChange}
                        value={formData.pricing}
                        required
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-royal mb-2 flex items-center gap-2">
                        <MapPin size={16} className="text-dusty"/> City
                    </label>
                    <input
                        name="city"
                        className="input-primary"
                        placeholder="e.g. New York"
                        onChange={handleChange}
                        value={formData.city}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-royal mb-2 flex items-center gap-2">
                        <MapPin size={16} className="text-dusty"/> State
                    </label>
                    <input
                        name="state"
                        className="input-primary"
                        placeholder="e.g. NY"
                        onChange={handleChange}
                        value={formData.state}
                        required
                    />
                </div>
            </div>

            {/* Interactive Services Input */}
            <div>
                <label className="block text-sm font-semibold text-royal mb-2 flex items-center gap-2">
                    <CheckCircle size={16} className="text-dusty"/> Services Offered
                </label>
                
                <div className="bg-white border border-lavender/30 rounded-xl p-3 focus-within:ring-2 focus-within:ring-royal/20 focus-within:border-royal/50 transition-all min-h-[100px]">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <AnimatePresence>
                      {services.map((service) => (
                        <motion.span
                          key={service}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sage/10 text-sage font-medium text-sm border border-sage/20"
                        >
                          {service}
                          <button
                            type="button"
                            onClick={() => removeService(service)}
                            className="hover:text-red-500 transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </motion.span>
                      ))}
                    </AnimatePresence>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Plus size={16} className="text-slate/40" />
                    <input 
                      type="text"
                      className="flex-1 bg-transparent outline-none text-royal placeholder:text-slate/40"
                      placeholder={services.length === 0 ? "Type a service and press Enter (e.g. Web Design)" : "Add another..."}
                      value={currentService}
                      onChange={(e) => setCurrentService(e.target.value)}
                      onKeyDown={handleServiceKeyDown}
                    />
                  </div>
                </div>
                <p className="text-xs text-slate/60 mt-2 pl-1">Press <b>Enter</b> to add a tag.</p>
            </div>

            <button 
              type="submit" 
              disabled={submitting} 
              className={`btn-primary w-full flex items-center justify-center gap-2 ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
                {submitting ? 'Registering...' : 'Complete Registration'}
            </button>
        </form>
      </motion.div>
    </div>
  );
};

export default RegisterBusiness;