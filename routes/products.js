const router = require('express').Router();
const productsController = require('../controllers/products');

/**
 * #swagger.tags = ['Products']
 * #swagger.summary = 'Get all products'
 */
router.get('/', productsController.getAllProducts);

/**
 * #swagger.tags = ['Products']
 * #swagger.summary = 'Update a product'
 */
router.put('/:id', productsController.updateProduct);

/**
 * #swagger.tags = ['Products']
 * #swagger.summary = 'Create a new product'
 * #swagger.parameters['obj'] = {
 *   in: 'body',
 *   description: 'Product data',
 *   required: true,
 *   schema: {
 *     name: 'Phone',
 *     price: 20000,
 *     category: 'Electronics',
 *     brand: 'Samsung',
 *     inStock: true,
 *     rating: 4.5,
 *     createdAt: '2026-03-25'
 *   }
 * }
 */
router.post('/', productsController.createProduct);

/**
 * #swagger.tags = ['Products']
 * #swagger.summary = 'Delete a product'
 */
router.delete('/:id', productsController.deleteProduct);

module.exports = router;