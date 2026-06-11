const express = require("express");
const router = express.Router();

const {
  registerPatient,
  searchPatient,
  getPatientById,
  updatePatient,
  updatePatientStatus,
  deletePatient,     
  bookAppointment,
  verifyQR,
} = require("../controller/receptionist");

// Register Patient
router.post("/patients", registerPatient);

// Search Patient
router.get("/patients/search", searchPatient);

// Get Patient by ID
router.get("/patients/:id", getPatientById);

// Update Patient Details
router.put("/patients/:id", updatePatient);

// Update Patient Status
router.patch("/patients/:id/status", updatePatientStatus);

// Delete Patient
router.delete("/patients/:id", deletePatient);

// Book Appointment
router.post("/appointments", bookAppointment);

// Verify QR Code
router.get("/appointments/verify-qr", verifyQR);

module.exports = router;