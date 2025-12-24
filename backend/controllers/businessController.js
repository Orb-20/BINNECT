const Business = require("../models/Business");

// Register Business
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

    const business = await Business.create({
      owner: req.user._id,
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

// Get My Businesses
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

// Search Businesses
const searchBusinesses = async (req, res) => {
  try {
    const { service, city } = req.query;

    if (!service || !city) {
      return res.status(400).json({
        message: "Service and city are required",
      });
    }

    const businesses = await Business.find({
      servicesOffered: { $regex: service, $options: "i" },
      "location.city": { $regex: city, $options: "i" },
      owner: { $ne: req.user._id },
    });

    // 🔥 Recommendation scoring
    const rankedBusinesses = businesses.map((biz) => {
      let score = 0;

      // Service match
      biz.servicesOffered.forEach((s) => {
        if (s.toLowerCase().includes(service.toLowerCase())) {
          score += 5;
        }
      });

      // Industry match
      if (biz.industry.toLowerCase().includes(service.toLowerCase())) {
        score += 3;
      }

      // City match
      if (biz.location.city.toLowerCase() === city.toLowerCase()) {
        score += 2;
      }

      // Rating weight
      score += biz.rating || 0;

      return {
        ...biz._doc,
        recommendationScore: score,
      };
    });

    // 🔽 Sort by score
    rankedBusinesses.sort(
      (a, b) => b.recommendationScore - a.recommendationScore
    );

    res.json({
      count: rankedBusinesses.length,
      businesses: rankedBusinesses,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ⬇️ EXPORTS (THIS IS CRITICAL)
module.exports = {
  registerBusiness,
  getMyBusinesses,
  searchBusinesses,
};
