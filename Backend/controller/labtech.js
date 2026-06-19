
const { validationResult } = require("express-validator");
const LabTechnician = require("../models/LabTechnician");
const HttpError = require("../models/http-error");
const { v4: uuidv4 } = require("uuid");

// ======================================
// GET ALL LAB TECHNICIANS
// GET /api/labtechnicians
// ======================================
const getLabTechnicians = async (req, res, next) => {
    try {
        const technicians = await LabTechnician.find()
            .populate("UserId")
            .populate("DepartmentId")
            .populate("AssignedTests");

        res.status(200).json({
            success: true,
            count: technicians.length,
            data: technicians
        });
    } catch (err) {
        return next(
            new HttpError(
                "Fetching lab technicians failed, please try again.",
                500
            )
        );
    }
};

// ======================================
// GET LAB TECHNICIAN BY ID
// GET /api/labtechnicians/:id
// ======================================
const getLabTechnicianById = async (req, res, next) => {
    const technicianId = req.params.id;

    let technician;

    try {
        technician = await LabTechnician.findById(technicianId)
            .populate("UserId")
            .populate("DepartmentId")
            .populate("AssignedTests");
    } catch (err) {
        return next(
            new HttpError(
                "Something went wrong, could not find technician.",
                500
            )
        );
    }

    if (!technician) {
        return next(
            new HttpError("Lab Technician not found.", 404)
        );
    }

    res.status(200).json({
        success: true,
        data: technician
    });
};

// ======================================
// CREATE LAB TECHNICIAN
// POST /api/labtechnicians
// ======================================
const createLabTechnician = async (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(
            new HttpError("Invalid inputs passed.", 422)
        );
    }

    const {
        UserId,
        TechnicianName,
        Qualification,
        DepartmentId,
        ContactNumber,
        Email,
        DateOfJoining,
        ShiftTiming,
        AvailableDays
    } = req.body;

    const createdTechnician = new LabTechnician({
        TechnicianID: `TECH-${uuidv4().substring(0, 8)}`,
        UserId,
        TechnicianName,
        Qualification,
        DepartmentId,
        ContactNumber,
        Email,
        DateOfJoining,
        ShiftTiming,
        AvailableDays,
        AssignedTests: []
    });

    try {
        await createdTechnician.save();
    } catch (err) {
        return next(
            new HttpError(
                "Creating lab technician failed, please try again.",
                500
            )
        );
    }

    res.status(201).json({
        success: true,
        data: createdTechnician
    });
};

// ======================================
// UPDATE LAB TECHNICIAN
// PATCH /api/labtechnicians/:id
// ======================================
const updateLabTechnician = async (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(
            new HttpError("Invalid inputs passed.", 422)
        );
    }

    const technicianId = req.params.id;

    const {
        TechnicianName,
        Qualification,
        DepartmentId,
        ContactNumber,
        Email,
        ShiftTiming,
        AvailableDays,
        IsActive
    } = req.body;

    let technician;

    try {
        technician = await LabTechnician.findById(technicianId);
    } catch (err) {
        return next(
            new HttpError(
                "Could not update lab technician.",
                500
            )
        );
    }

    if (!technician) {
        return next(
            new HttpError("Lab Technician not found.", 404)
        );
    }

    technician.TechnicianName =
        TechnicianName || technician.TechnicianName;

    technician.Qualification =
        Qualification || technician.Qualification;

    technician.DepartmentId =
        DepartmentId || technician.DepartmentId;

    technician.ContactNumber =
        ContactNumber || technician.ContactNumber;

    technician.Email =
        Email || technician.Email;

    technician.ShiftTiming =
        ShiftTiming || technician.ShiftTiming;

    technician.AvailableDays =
        AvailableDays || technician.AvailableDays;

    if (typeof IsActive === "boolean") {
        technician.IsActive = IsActive;
    }

    try {
        await technician.save();
    } catch (err) {
        return next(
            new HttpError(
                "Updating lab technician failed.",
                500
            )
        );
    }

    res.status(200).json({
        success: true,
        data: technician
    });
};

// ======================================
// DELETE LAB TECHNICIAN
// DELETE /api/labtechnicians/:id
// ======================================
const deleteLabTechnician = async (req, res, next) => {

    const technicianId = req.params.id;

    let technician;

    try {
        technician = await LabTechnician.findById(technicianId);
    } catch (err) {
        return next(
            new HttpError(
                "Could not delete lab technician.",
                500
            )
        );
    }

    if (!technician) {
        return next(
            new HttpError("Lab Technician not found.", 404)
        );
    }

    try {
        await technician.deleteOne();
    } catch (err) {
        return next(
            new HttpError(
                "Deleting lab technician failed.",
                500
            )
        );
    }

    res.status(200).json({
        success: true,
        message: "Lab Technician deleted successfully."
    });
};

exports.getLabTechnicians = getLabTechnicians;
exports.getLabTechnicianById = getLabTechnicianById;
exports.createLabTechnician = createLabTechnician;
exports.updateLabTechnician = updateLabTechnician;
exports.deleteLabTechnician = deleteLabTechnician;

