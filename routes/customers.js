const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/auth');

const customersController = require('../controllers/customers');

// GET
router.get('/', isAuthenticated, customersController.getAllCustomers);
router.get('/:id', isAuthenticated, customersController.getCustomerById);

// POST
router.post('/', isAuthenticated, customersController.createCustomer);
// PUT
router.put('/:id', isAuthenticated, customersController.updateCustomer);

// DELETE
router.delete('/:id', isAuthenticated, customersController.deleteCustomer);

module.exports = router;