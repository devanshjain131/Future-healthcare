const Admin = require('../models/Admin');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const generateToken = (adminId) => {
  return jwt.sign({ adminId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

exports.registerAdmin = async (req, res) => {
  try {
    const { contactNumber, email, password } = req.body;
    const adminExists = await Admin.findOne({ contactNumber });
    if (adminExists) return res.status(400).json({ message: 'Admin already exists' });

    const admin = await Admin.create({ contactNumber, email, password });
    const token = generateToken(admin._id);

    res.status(201).json({ admin, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { contactNumber, password } = req.body;
    const admin = await Admin.findOne({ contactNumber });
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(admin._id);

    res.status(200).json({ admin, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
