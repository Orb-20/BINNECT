const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const {
  registerBusiness,
  getMyBusinesses,
} = require("../controllers/businessController");

// Register business
router.post("/register", verifyToken, registerBusiness);

// Get logged-in user's businesses
router.get("/my", verifyToken, getMyBusinesses);

module.exports = router;
