const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  updateUser,
  getUserById,
  deleteUser,
  getUsers,
} = require("../Controllers/userController.js");
const auth = require("../middleware/auth.js");
const isAdmin = require("../middleware/isAdmin");
const orderController = require("../Controllers/orderController.js");

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/:user_id', updateUser);
router.get('/:user_id', auth, getUserById);
router.delete('/:user_id', deleteUser);
router.get('/', getUsers);
router.get('/orders/:user_id',orderController.getOrdersByUserId)

module.exports = router;
