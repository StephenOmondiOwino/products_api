const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// GET all users
const getAllUsers = async (req, res) => {
  try {
    const users = await mongodb.getDb().collection('users').find().toArray();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET single user
const getUserById = async (req, res) => {
  try {
    const user = await mongodb.getDb().collection('users')
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE user
const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    const result = await mongodb.getDb().collection('users').insertOne({
      name,
      email
    });

    res.status(201).json({ message: 'User created', id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE user
const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    const result = await mongodb.getDb().collection('users').replaceOne(
      { _id: new ObjectId(req.params.id) },
      { name, email }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE user
const deleteUser = async (req, res) => {
  try {
    const result = await mongodb.getDb().collection('users').deleteOne({
      _id: new ObjectId(req.params.id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};