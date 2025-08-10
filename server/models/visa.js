
const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  passportDocument: { type: String, required: true },
  photoDocument: { type: String, required: true },
  itineraryDocument: { type: String, required: true },
  employmentLetter: { type: String, required: true },
  otherDocuments: [{ type: String }],
});

const applicationSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true },
  nationality: { type: String, required: true },
  maritalStatus: { type: String, required: true },
  passportNumber: { type: String, required: true },
  passportIssuedAt: { type: String, required: true },
  passportIssuedOn: { type: Date, required: true },
  passportExpiresOn: { type: Date, required: true },
  residencyCountry: { type: String },
  residencyCity: { type: String },
  residencyAddress: { type: String },
  residencyPostal: { type: String },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  emergencyContact: { type: String },
  travelPurpose: { type: String, required: true },
  travelDate: { type: Date, required: true },
  travelDuration: { type: String, required: true },
  visaType: { type: String, required: true },
  destinationCountry: { type: String, required: true },
  employmentStatus: { type: String, required: true },
  employerName: { type: String, required: true },
  jobTitle: { type: String, required: true },
  workAddress: { type: String, required: true },
  documents: { type: documentSchema, required: true },
  submittedAt: { type: Date, default: Date.now },
  status: { type: String, default: 'submitted' },
});

module.exports = mongoose.model('Visa', applicationSchema);
