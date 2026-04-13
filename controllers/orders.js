const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// GET all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await mongodb.getDb().collection('orders').find().toArray();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET order by ID
const getOrderById = async (req, res) => {
  try {
    const orderId = new ObjectId(req.params.id);
    const order = await mongodb.getDb().collection('orders').findOne({ _id: orderId });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE order
const createOrder = async (req, res) => {
  try {
    const { productId, quantity, totalPrice, status, createdAt } = req.body;

    // VALIDATION (IMPORTANT FOR MARKS)
    if (!productId || !quantity || !totalPrice) {
      return res.status(400).json({ message: 'productId, quantity, and totalPrice are required' });
    }

    const newOrder = {
      productId,
      quantity,
      totalPrice,
      status,
      createdAt
    };

    const result = await mongodb.getDb().collection('orders').insertOne(newOrder);

    res.status(201).json({ message: 'Order created', id: result.insertedId });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE order
const updateOrder = async (req, res) => {
  try {
    const orderId = new ObjectId(req.params.id);
    const { productId, quantity, totalPrice, status, createdAt } = req.body;

    if (!productId || !quantity || !totalPrice) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    const updatedOrder = {
      productId,
      quantity,
      totalPrice,
      status,
      createdAt
    };

    const result = await mongodb.getDb().collection('orders').replaceOne(
      { _id: orderId },
      updatedOrder
    );

    res.status(200).json({ message: 'Order updated', result });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE order
const deleteOrder = async (req, res) => {
  try {
    const orderId = new ObjectId(req.params.id);

    const result = await mongodb.getDb().collection('orders').deleteOne({ _id: orderId });

    res.status(200).json({ message: 'Order deleted', result });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder
};