const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = require('../middleware/upload');
const {
  createVisa,
  getAllVisas,
  getVisaById
} = require('../controllers/visaController');

// Multer error handling middleware
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: `Multer error: ${err.message}` });
  }
  next(err);
};

// Submit visa application with file upload
router.post(
  '/',
  upload.fields([
    { name: 'passportDocument', maxCount: 1 },
    { name: 'photoDocument', maxCount: 1 },
    { name: 'itineraryDocument', maxCount: 1 },
    { name: 'employmentLetter', maxCount: 1 }
  ]),
  handleMulterError,
  createVisa
);

// Read routes
router.get('/', getAllVisas);
router.get('/:id', getVisaById);

module.exports = router;
