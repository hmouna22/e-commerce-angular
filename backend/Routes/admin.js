const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.js");
const isAdmin = require("../middleware/isAdmin");
const promoController = require("../Controllers/promoController.js");

// Create a new promotion
router.post("/new", promoController.createPromotion);

// Get all promotions
router.get("/", promoController.getAllPromotions);

// Get a single promotion by ID
router.get("/:promotionId", promoController.getPromotionById);

// Update a promotion by ID
router.put("/:promotionId", promoController.updatePromotion);

// Delete a promotion by ID
router.delete("/:promotionId", promoController.deletePromotion);

module.exports = router;
