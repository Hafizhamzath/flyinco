const Visa = require('../models/visa');

exports.createVisa = async (req, res) => {
  try {
    const files = req.files;
    const formData = req.body;

    // Validate required fields
    const requiredFields = [
      'firstName', 'lastName', 'dateOfBirth', 'gender', 'nationality',
      'maritalStatus', 'passportNumber', 'passportIssuedAt',
      'passportIssuedOn', 'passportExpiresOn', 'email', 'phoneNumber',
      'travelPurpose', 'travelDate', 'travelDuration', 'visaType',
      'destinationCountry', 'employmentStatus', 'employerName',
      'jobTitle', 'workAddress'
    ];
    const missingFields = requiredFields.filter((field) => !formData[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
    }

    // Validate required files
    const requiredFiles = ['passportDocument', 'photoDocument', 'itineraryDocument', 'employmentLetter'];
    const missingFiles = requiredFiles.filter((field) => !files[field]?.[0]?.path);
    if (missingFiles.length > 0) {
      return res.status(400).json({ error: `Missing required files: ${missingFiles.join(', ')}` });
    }

    const documents = {
      passportDocument: files.passportDocument?.[0]?.path || '',
      photoDocument: files.photoDocument?.[0]?.path || '',
      itineraryDocument: files.itineraryDocument?.[0]?.path || '',
      employmentLetter: files.employmentLetter?.[0]?.path || ''
    };

    const visaData = {
      ...formData,
      dateOfBirth: new Date(formData.dateOfBirth),
      passportIssuedOn: new Date(formData.passportIssuedOn),
      passportExpiresOn: new Date(formData.passportExpiresOn),
      travelDate: new Date(formData.travelDate),
      documents,
      submittedAt: new Date()
    };

    const newVisa = new Visa(visaData);
    const savedVisa = await newVisa.save();
    res.status(201).json({ message: 'Application submitted successfully', visa: savedVisa });
  } catch (err) {
    console.error('Error creating visa:', err);
    res.status(400).json({ error: err.message });
  }
};

exports.getAllVisas = async (req, res) => {
  try {
    const visas = await Visa.find().sort({ submittedAt: -1 });
    res.status(200).json(visas);
  } catch (err) {
    console.error('Error fetching visas:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getVisaById = async (req, res) => {
  try {
    const visa = await Visa.findById(req.params.id);
    if (!visa) return res.status(404).json({ message: 'Visa not found' });
    res.status(200).json(visa);
  } catch (err) {
    console.error('Error fetching visa:', err);
    res.status(500).json({ error: err.message });
  }
};
