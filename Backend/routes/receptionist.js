const express = require("express");
const router = express.Router();

const { checkAuth, checkRole } = require("../middleware/admin-middleware");

const {
  registerPatient,
  searchPatient,
  getPatientById,
  updatePatient,
  updatePatientStatus,
  deletePatient,
  bookAppointment,
  verifyQR,
  getDoctors,
  getTodayAppointments,
  getAppointmentById,
  getAppointmentsByDoctor,
  getAppointmentsByPatient,
  updateAppointment,
  cancelAppointment,
} = require("../controller/receptionist");


router.use(checkAuth);
router.use(checkRole(["Receptionist"]));
// ======================
// Patient Routes
// ======================

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

// View Doctors
router.get("/doctors", getDoctors);


// ======================
// Appointment Routes
// ======================

// Book Appointment
router.post("/appointments", bookAppointment);

// Verify QR Code
router.get("/appointments/verify-qr", verifyQR);

// Get Appointments by Patient ID
router.get("/appointments/patient/:patientId", getAppointmentsByPatient);

// Get Appointments by Doctor ID
router.get("/appointments/doctor/:doctorId", getAppointmentsByDoctor);

// Today's Appointments
router.get("/appointments/today", getTodayAppointments);

// Get Appointment by ID
router.get("/appointments/:id", getAppointmentById);

// Update Appointment
router.put("/appointments/:id", updateAppointment);

// Cancel Appointment
router.patch("/appointments/:id/cancel", cancelAppointment);

module.exports = router;