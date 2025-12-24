const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

const {
  registerBusiness,
  getMyBusinesses,
  searchBusinesses,
} = require("../controllers/businessController");

router.post("/register", verifyToken, registerBusiness);
router.get("/my", verifyToken, getMyBusinesses);
router.get("/search", verifyToken, searchBusinesses);

module.exports = router;
