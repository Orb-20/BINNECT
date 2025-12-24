import React, { useState } from 'react';
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building, MapPin, DollarSign, Tag, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const RegisterBusiness = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  
  // FIX: Using businessName to match schema
  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    city: '',
    state: '',
    services: '',
    pricing: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
        toast.error("You must be logged in.");
        return;
    }
    setSubmitting(true);

    try {
      const servicesArray = formData.services.split(',').map(s => s.trim());
      
      const payload = {
        businessName: formData.businessName,
        industry: formData.industry,
        location: {
            city: formData.city,
            state: formData.state
        },
        servicesOffered: servicesArray,
        pricingRange: formData.pricing
      };

      // FIX: Correct Endpoint
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
                        required
                    />
                </div>
            </div>

            {/* Services */}
            <div>
                <label className="block text-sm font-semibold text-royal mb-2 flex items-center gap-2">
                    <CheckCircle size={16} className="text-dusty"/> Services Offered
                </label>
                <textarea
                    name="services"
                    className="input-primary min-h-[100px]"
                    placeholder="List your services separated by commas (e.g., Web Design, SEO, Hosting)"
                    onChange={handleChange}
                    required
                />
            </div>

            <button type="submit" disabled={submitting} className="btn-primary w-full">
                {submitting ? 'Registering...' : 'Complete Registration'}
            </button>
        </form>
      </motion.div>
    </div>
  );
};

export default RegisterBusiness;