const Category = require("../ORM/category.model.js");

async function addCategory(req, res) {
  try {
    const { category_name, description } = req.body;

    // Validate input
    if (!category_name) {
      return res
        .status(400)
        .json({ message: "Please provide the category name" });
    }

    if (typeof category_name !== "string") {
      return res
        .status(400)
        .json({ message: "the category name must be a string" });
    }

    // Create new category
    const newCategory = await Category.create({ category_name, description });

    // Send response with new category
    res
      .status(201)
      .json({
        message: "Category created successfully",
        category: newCategory,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getAllCategories(req, res) {
  try {
    // Fetch all categories from the database
    const categories = await Category.findAll();

    // Send response with all categories
    res.status(200).json({ categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Delete a category :
async function deleteCategory(req, res) {
  try {
    const { category_id } = req.params;

    // Check if category exists
    const category = await Category.findByPk(category_id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Delete category
    await category.destroy();

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  addCategory,
  getAllCategories,
  deleteCategory,
};
