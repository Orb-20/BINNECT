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

// ✅ NEW: Get Recent Businesses (For initial load)
const getRecentBusinesses = async (req, res) => {
  try {
    // Fetch top 9 most recent businesses, excluding the current user's own business
    const businesses = await Business.find({
      owner: { $ne: req.user._id }
    })
    .sort({ createdAt: -1 }) // Sort by newest first
    .limit(9); // Limit to 9 for a clean grid

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

    if (!service && !city) {
      return res.status(400).json({
        message: "Service or city is required for search",
      });
    }

    // Build query object dynamically
    let query = { owner: { $ne: req.user._id } };

    if (service) {
        query.servicesOffered = { $regex: service, $options: "i" };
    }
    if (city) {
        query["location.city"] = { $regex: city, $options: "i" };
    }

    const businesses = await Business.find(query);

    // Recommendation scoring
    const rankedBusinesses = businesses.map((biz) => {
      let score = 0;

      // Service match
      if (service) {
          biz.servicesOffered.forEach((s) => {
            if (s.toLowerCase().includes(service.toLowerCase())) {
              score += 5;
            }
          });
          // Industry match
          if (biz.industry.toLowerCase().includes(service.toLowerCase())) {
            score += 3;
          }
      }

      // City match
      if (city && biz.location.city.toLowerCase() === city.toLowerCase()) {
        score += 2;
      }

      // Rating weight
      score += biz.rating || 0;

      return {
        ...biz._doc,
        recommendationScore: score,
      };
    });

    // Sort by score
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

module.exports = {
  registerBusiness,
  getMyBusinesses,
  searchBusinesses,
  getRecentBusinesses, // ✅ Export the new function
};