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

module.exports = { registerBusiness };
