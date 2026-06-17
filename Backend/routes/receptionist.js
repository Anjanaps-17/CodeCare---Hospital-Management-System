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
  getAppointmentById,
  getAppointmentsByDoctor,
  getAppointmentsByPatient,
  updateAppointment,
  deleteAppointment,
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

// Get Appointment by ID
router.get("/appointments/:id", getAppointmentById);

// Update Appointment
router.put("/appointments/:id", updateAppointment);

// Delete Appointment (changes status to Cancelled)
router.delete("/appointments/:id", deleteAppointment);

module.exports = router;