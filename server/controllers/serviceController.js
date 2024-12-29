const Service = require('../models/Service');

exports.createService = async (req, res) => {
    try {
      const { serviceType, details, date, location } = req.body;
  
      // Create a new service entry with form data
      const service = await Service.create({
        userId: req.user._id,  // Assuming `req.user` contains the logged-in user's data
        serviceType,
        details,
        date,
        location
      });
  
      res.status(201).json(service); // Return the created service
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

exports.getUserServices = async (req, res) => {
  try {
    const services = await Service.find({ userId: req.user._id });
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};