const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.js");
const isAdmin = require("../middleware/isAdmin");
const orderController = require("../Controllers/orderController.js");

router.get('/', orderController.getAllOrders)

module.exports = router;
