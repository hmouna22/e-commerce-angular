const Promotion = require("../ORM/promotion.model");

// Create a new promotion
const createPromotion = async (req, res) => {
  try {
    const { promotion_name, discount, start_date, end_date, is_active } =
      req.body;

    const promotion = await Promotion.create({
      promotion_name,
      discount,
      start_date,
      end_date,
      is_active,
    });

    res.status(201).json(promotion);
  } catch (error) {
    res.status(500).json({ error: "Failed to create promotion" });
  }
};

// Get all promotions
const getAllPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.findAll();
    res.json(promotions);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve promotions" });
  }
};

// Get a promotion by ID
const getPromotionById = async (req, res) => {
  const { promotionId } = req.params;
  try {
    const promotion = await Promotion.findByPk(promotionId);
    if (!promotion) {
      return res.status(404).json({ error: "Promotion not found" });
    }
    res.json(promotion);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve promotion" });
  }
};

// Update a promotion
const updatePromotion = async (req, res) => {
  const { promotionId } = req.params;
  try {
    const promotion = await Promotion.findByPk(promotionId);
    if (!promotion) {
      return res.status(404).json({ error: "Promotion not found" });
    }

    const { promotion_name, discount, start_date, end_date, is_active } =
      req.body;
    await promotion.update({
      promotion_name,
      discount,
      start_date,
      end_date,
      is_active,
    });

    res.json(promotion);
  } catch (error) {
    res.status(500).json({ error: "Failed to update promotion" });
  }
};

// Delete a promotion
const deletePromotion = async (req, res) => {
  const { promotionId } = req.params;
  try {
    const promotion = await Promotion.findByPk(promotionId);
    if (!promotion) {
      return res.status(404).json({ error: "Promotion not found" });
    }
    await promotion.destroy();
    res.json({ message: "Promotion deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete promotion" });
  }
};

module.exports = {
  createPromotion,
  getAllPromotions,
  getPromotionById,
  updatePromotion,
  deletePromotion,
};
