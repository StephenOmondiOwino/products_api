const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/auth');

const ordersController = require('../controllers/orders');

// GET
router.get('/', isAuthenticated, ordersController.getAllOrders);
router.get('/:id', ordersController.getOrderById);

// POST
router.post('/', isAuthenticated, ordersController.createOrder);
// PUT
router.put('/:id', isAuthenticated, ordersController.updateOrder);

// DELETE
router.delete('/:id', isAuthenticated, ordersController.deleteOrder);

module.exports = router;