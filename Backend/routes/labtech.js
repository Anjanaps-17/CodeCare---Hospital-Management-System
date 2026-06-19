
const express = require("express");
const { check } = require("express-validator");

const labTechnicianControllers = require("../controllers/labtechnician-controller");

const router = express.Router();

// ======================================
// GET ALL LAB TECHNICIANS
// GET /api/labtechnicians
// ======================================
router.get(
    "/",
    labTechnicianControllers.getLabTechnicians
);

// ======================================
// GET LAB TECHNICIAN BY ID
// GET /api/labtechnicians/:id
// ======================================
router.get(
    "/:id",
    labTechnicianControllers.getLabTechnicianById
);

// ======================================
// CREATE LAB TECHNICIAN
// POST /api/labtechnicians
// ======================================
router.post(
    "/",
    [
        check("UserId")
            .not()
            .isEmpty(),

        check("TechnicianName")
            .not()
            .isEmpty(),

        check("Qualification")
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

        check("DateOfJoining")
            .not()
            .isEmpty()
    ],
    labTechnicianControllers.createLabTechnician
);

// ======================================
// UPDATE LAB TECHNICIAN
// PATCH /api/labtechnicians/:id
// ======================================
router.patch(
    "/:id",
    [
        check("TechnicianName")
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

        check("ContactNumber")
            .optional()
            .not()
            .isEmpty()
    ],
    labTechnicianControllers.updateLabTechnician
);

// ======================================
// DELETE LAB TECHNICIAN
// DELETE /api/labtechnicians/:id
// ======================================
router.delete(
    "/:id",
    labTechnicianControllers.deleteLabTechnician
);

module.exports = router;

