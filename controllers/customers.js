const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// GET all customers
const getAllCustomers = async (req, res) => {
  try {
    const customers = await mongodb.getDb().collection('customers').find().toArray();
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET customer by ID
const getCustomerById = async (req, res) => {
  try {
    const customerId = new ObjectId(req.params.id);
    const customer = await mongodb.getDb().collection('customers').findOne({ _id: customerId });

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE customer
const createCustomer = async (req, res) => {
  try {
    const { name, email, phone, address, createdAt } = req.body;

    // VALIDATION (IMPORTANT)
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    const newCustomer = {
      name,
      email,
      phone,
      address,
      createdAt
    };

    const result = await mongodb.getDb().collection('customers').insertOne(newCustomer);

    res.status(201).json({ message: 'Customer created', id: result.insertedId });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE customer
const updateCustomer = async (req, res) => {
  try {
    const customerId = new ObjectId(req.params.id);
    const { name, email, phone, address, createdAt } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    const updatedCustomer = {
      name,
      email,
      phone,
      address,
      createdAt
    };

    const result = await mongodb.getDb().collection('customers').replaceOne(
      { _id: customerId },
      updatedCustomer
    );

    res.status(200).json({ message: 'Customer updated', result });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE customer
const deleteCustomer = async (req, res) => {
  try {
    const customerId = new ObjectId(req.params.id);

    const result = await mongodb.getDb().collection('customers').deleteOne({ _id: customerId });

    res.status(200).json({ message: 'Customer deleted', result });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer
};