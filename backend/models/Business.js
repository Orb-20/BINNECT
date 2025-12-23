const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    businessName: {
      type: String,
      required: true,
    },

    industry: {
      type: String,
      required: true,
    },

    location: {
      city: { type: String, required: true },
      state: { type: String },
    },

    servicesOffered: {
      type: [String],
      default: [],
    },

    servicesRequired: {
      type: [String],
      default: [],
    },

    pricingRange: {
      type: String,
    },

    verified: {
      type: Boolean,
      default: false,
    },

    rating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Business", businessSchema);
