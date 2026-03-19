const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Detection = require('../models/Detection');

// Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// GET /api/history - Get detection history
router.get('/history', async (req, res) => {
  try {
    const history = await Detection.find().sort({ timestamp: -1 }).limit(50);
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/detect - Run AI Detection (Simulation)
router.post('/detect', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image uploaded' });
  }

  // SIMULATION: In a real system, we would call a Python script here:
  // spawn('python', ['scripts/detect.py', req.file.path])

  const simulatedDetections = [
    {
      symbolName: 'Engine Check',
      confidence: 0.98,
      status: 'Critical',
      boundingBox: { x: 100, y: 150, width: 80, height: 80 }
    }
  ];

  try {
    const savedDetections = await Promise.all(
      simulatedDetections.map(det => {
        const newDet = new Detection({
          ...det,
          imagePath: req.file.path
        });
        return newDet.save();
      })
    );
    res.json({ detections: savedDetections, imagePath: req.file.path });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
