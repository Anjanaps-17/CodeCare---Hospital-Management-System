const express = require("express");
const router = express.Router();

const {
  checkAuth,
  checkRole,
} = require("../middleware/admin-middleware");

const doctorController = require("../controller/doctor");

router.use(checkAuth);
router.use(checkRole(["Doctor"]));
// Today's Appointments
// GET /api/doctor/appointments/today/:doctorId
// =======================
router.get(
  "/appointments/today/:doctorId",
  doctorController.getTodayAppointments
);

// =======================
// Get Appointment By ID
// GET /api/doctor/appointments/:id
// =======================
router.get(
  "/appointments/:id",
  doctorController.getAppointmentById
);

// =======================
// Patient History
// GET /api/doctor/patients/:patientId/history
// =======================
router.get(
  "/patients/:patientId/history",
  doctorController.getPatientHistory
);

// =======================
// Create Consultation
// POST /api/doctor/consultations
// =======================
router.post(
  "/consultations",
  doctorController.createConsultation
);

// =======================
// Update Consultation
// PUT /api/doctor/consultations/:id
// =======================
router.put(
  "/consultations/:id",
  doctorController.updateConsultation
);

// =======================
// Get Consultation By ID
// GET /api/doctor/consultations/:id
// =======================
router.get(
  "/consultations/:id",
  doctorController.getConsultationById
);

// =======================
// Create Prescription
// POST /api/doctor/prescriptions
// =======================
router.post(
  "/prescriptions",
  doctorController.createPrescription
);

// =======================
// Get Prescription By ID
// GET /api/doctor/prescriptions/:id
// =======================
router.get(
  "/prescriptions/:id",
  doctorController.getPrescriptionById
);

// =======================
// Order Lab Test
// POST /api/doctor/labtests/order
// =======================
router.post(
  "/labtests/order",
  doctorController.orderLabTest
);

// =======================
// Get Lab Tests By Patient
// GET /api/doctor/labtests/patient/:patientId
// =======================
router.get(
  "/labtests/patient/:patientId",
  doctorController.getLabTestsByPatient
);
// =======================
// View All Doctors and Departments
// GET /api/doctor/doctors
// =======================
router.get(
  "/doctors",
  doctorController.getAllDoctors
);

// =======================
// View Particular Doctor Details
// GET /api/doctor/doctors/:id
// =======================
router.get(
  "/doctors/:id",
  doctorController.getDoctorById
);

module.exports = router;