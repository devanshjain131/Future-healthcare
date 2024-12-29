const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    serviceType: { 
      type: String, 
      required: true 
    },
    // Define the structure of details based on the form data
    details: { 
      type: Map, 
      of: String, // You can also change this to 'Mixed' or a more specific type based on your form data structure
      required: true 
    },
    // If your form includes any specific subfields like 'date', 'location', etc.
    date: { 
      type: Date, 
      required: true 
    },
    location: { 
      type: String, 
      required: true 
    },
    status: { 
      type: String, 
      enum: ['pending', 'completed', 'cancelled'], 
      default: 'pending'
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Service', serviceSchema);
