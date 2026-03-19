const mongoose = require('mongoose');

const detectionSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  symbolName: { type: String, required: true },
  confidence: { type: Number, required: true },
  status: { type: String, enum: ['Critical', 'Warning', 'Normal'], default: 'Normal' },
  imagePath: { type: String },
  boundingBox: {
    x: Number,
    y: Number,
    width: Number,
    height: Number
  }
});

module.exports = mongoose.model('Detection', detectionSchema);
