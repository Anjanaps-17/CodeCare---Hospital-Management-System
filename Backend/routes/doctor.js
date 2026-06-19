
const express = require("express");
const { check } = require("express-validator");

const doctorControllers = require("../controllers/doctor-controller");

const router = express.Router();

// ======================================
// GET ALL DOCTORS
// GET /api/doctors
// ======================================
router.get(
    "/",
    doctorControllers.getDoctors
);

// ======================================
// GET DOCTOR BY ID
// GET /api/doctors/:id
// ======================================
router.get(
    "/:id",
    doctorControllers.getDoctorById
);

// ======================================
// CREATE DOCTOR
// POST /api/doctors
// ======================================
router.post(
    "/",
    [
        check("UserId")
            .not()
            .isEmpty(),

        check("DoctorName")
            .not()
            .isEmpty(),

        check("Specialization")
            .not()
            .isEmpty(),

        check("Qualification")
            .not()
            .isEmpty(),

        check("LicenseNumber")
            .not()
            .isEmpty(),

        check("DepartmentId")
            .not()
            .isEmpty(),

        check("ContactNumber")
            .not()
            .isEmpty(),

        check("Email")
            .normalizeEmail()
            .isEmail(),

        check("ConsultationFee")
            .isNumeric()
    ],
    doctorControllers.createDoctor
);

// ======================================
// UPDATE DOCTOR
// PATCH /api/doctors/:id
// ======================================
router.patch(
    "/:id",
    [
        check("DoctorName")
            .optional()
            .not()
            .isEmpty(),

        check("Specialization")
            .optional()
            .not()
            .isEmpty(),

        check("Qualification")
            .optional()
            .not()
            .isEmpty(),

        check("Email")
            .optional()
            .normalizeEmail()
            .isEmail(),

        check("ConsultationFee")
            .optional()
            .isNumeric()
    ],
    doctorControllers.updateDoctor
);

// ======================================
// DELETE DOCTOR
// DELETE /api/doctors/:id
// ======================================
router.delete(
    "/:id",
    doctorControllers.deleteDoctor
);

module.exports = router;