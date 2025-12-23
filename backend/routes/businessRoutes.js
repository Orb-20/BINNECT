const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const { registerBusiness } = require("../controllers/businessController");

// Register business (protected)
router.post("/register", verifyToken, registerBusiness);

module.exports = router;
