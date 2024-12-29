const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validateRegisterInput } = require('../utils/validateInput');

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

exports.registerUser = async (req, res) => {
  try {
    const { contactNumber, email, password, location } = req.body;

    const validationError = validateRegisterInput({ contactNumber, password, email });
    if (validationError) return res.status(400).json({ message: validationError });

    const userExists = await User.findOne({ contactNumber });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ contactNumber, email, password, location });
    const token = generateToken(user._id);

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { contactNumber, password } = req.body;

    const user = await User.findOne({ contactNumber });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user._id);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
