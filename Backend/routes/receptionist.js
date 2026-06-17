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
  getAppointmentById,
  getAppointmentsByDoctor,
  updateAppointment,
  cancelAppointment,
  deleteAppointment,
  getAppointmentsByPatient,
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

// Appointment Routes

// Book Appointment
router.post("/appointments", bookAppointment);

// Verify QR Code
router.get("/appointments/verify-qr", verifyQR);

// Get Appointment by ID
router.get("/appointments/:id", getAppointmentById);

// Get Appointments by Patient ID
router.get("/appointments/patient/:patientId", getAppointmentsByPatient);

// Get Appointments by Doctor ID
router.get("/appointments/doctor/:doctorId", getAppointmentsByDoctor);

// Update Appointment
router.put("/appointments/:id", updateAppointment);

// Cancel Appointment
router.patch("/appointments/:id/cancel", cancelAppointment);

// Delete Appointment
router.delete("/appointments/:id", deleteAppointment);
module.exports = router;