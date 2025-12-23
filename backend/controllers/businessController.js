const Business = require("../models/Business");

const registerBusiness = async (req, res) => {
  try {
    const {
      businessName,
      industry,
      location,
      servicesOffered,
      servicesRequired,
      pricingRange,
    } = req.body;
    const getMyBusinesses = async (req, res) => {
  try {
    const businesses = await Business.find({
      owner: req.user._id,
    }).sort({ createdAt: -1 });

    res.json({
      count: businesses.length,
      businesses,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const searchBusinesses = async (req, res) => {
  try {
    const { service, city } = req.query;

    if (!service || !city) {
      return res.status(400).json({
        message: "Service and city are required for search",
      });
    }

    const businesses = await Business.find({
      servicesOffered: { $regex: service, $options: "i" },
      "location.city": { $regex: city, $options: "i" },
      owner: { $ne: req.user._id }, // exclude own businesses
    }).sort({ rating: -1 });

    res.json({
      count: businesses.length,
      businesses,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



    const business = await Business.create({
      owner: req.user._id, // from auth middleware
      businessName,
      industry,
      location,
      servicesOffered,
      servicesRequired,
      pricingRange,
    });

    res.status(201).json({
      message: "Business registered successfully",
      business,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerBusiness,
  getMyBusinesses,
  searchBusinesses,
};

