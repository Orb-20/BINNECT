const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

const {
  registerBusiness,
  getMyBusinesses,
  searchBusinesses,
  getRecentBusinesses, // ✅ Import
} = require("../controllers/businessController");

router.post("/register", verifyToken, registerBusiness);
router.get("/my", verifyToken, getMyBusinesses);
router.get("/search", verifyToken, searchBusinesses);
router.get("/recent", verifyToken, getRecentBusinesses); // ✅ New Route

module.exports = router;