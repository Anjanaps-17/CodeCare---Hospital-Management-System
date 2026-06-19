const { validationResult } = require("express-validator");
const Doctor = require("../models/Doctor");
const HttpError = require("../models/http-error");
const { v4: uuidv4 } = require("uuid");

// ======================================
// GET ALL DOCTORS
// GET /api/doctors
// ======================================
const getDoctors = async (req, res, next) => {
    try {
        const doctors = await Doctor.find()
            .populate("UserId")
            .populate("DepartmentId")
            .populate("Appointments")
            .populate("Patients");

        res.status(200).json({
            success: true,
            count: doctors.length,
            data: doctors
        });
    } catch (err) {
        return next(
            new HttpError("Fetching doctors failed, please try again.", 500)
        );
    }
};

// ======================================
// GET DOCTOR BY ID
// GET /api/doctors/:id
// ======================================
const getDoctorById = async (req, res, next) => {
    const doctorId = req.params.id;

    let doctor;

    try {
        doctor = await Doctor.findById(doctorId)
            .populate("UserId")
            .populate("DepartmentId")
            .populate("Appointments")
            .populate("Patients");
    } catch (err) {
        return next(
            new HttpError("Something went wrong, could not find doctor.", 500)
        );
    }

    if (!doctor) {
        return next(
            new HttpError("Doctor not found.", 404)
        );
    }

    res.status(200).json({
        success: true,
        data: doctor
    });
};

// ======================================
// CREATE DOCTOR
// POST /api/doctors
// ======================================
const createDoctor = async (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(
            new HttpError("Invalid inputs passed.", 422)
        );
    }

    const {
        UserId,
        DoctorName,
        Specialization,
        Qualification,
        LicenseNumber,
        DateOfJoining,
        DepartmentId,
        ContactNumber,
        Email,
        ConsultationFee,
        AvailableDays,
        ShiftTiming
    } = req.body;

    const createdDoctor = new Doctor({
        DoctorID: `DOC-${uuidv4().substring(0, 8)}`,
        UserId,
        DoctorName,
        Specialization,
        Qualification,
        LicenseNumber,
        DateOfJoining,
        DepartmentId,
        ContactNumber,
        Email,
        ConsultationFee,
        AvailableDays,
        ShiftTiming,
        Appointments: [],
        Patients: []
    });

    try {
        await createdDoctor.save();
    } catch (err) {
        return next(
            new HttpError("Creating doctor failed, please try again.", 500)
        );
    }

    res.status(201).json({
        success: true,
        data: createdDoctor
    });
};

// ======================================
// UPDATE DOCTOR
// PATCH /api/doctors/:id
// ======================================
const updateDoctor = async (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(
            new HttpError("Invalid inputs passed.", 422)
        );
    }

    const doctorId = req.params.id;

    const {
        DoctorName,
        Specialization,
        Qualification,
        DepartmentId,
        ContactNumber,
        Email,
        ConsultationFee,
        AvailableDays,
        ShiftTiming,
        IsActive
    } = req.body;

    let doctor;

    try {
        doctor = await Doctor.findById(doctorId);
    } catch (err) {
        return next(
            new HttpError("Could not update doctor.", 500)
        );
    }

    if (!doctor) {
        return next(
            new HttpError("Doctor not found.", 404)
        );
    }

    doctor.DoctorName = DoctorName || doctor.DoctorName;
    doctor.Specialization = Specialization || doctor.Specialization;
    doctor.Qualification = Qualification || doctor.Qualification;
    doctor.DepartmentId = DepartmentId || doctor.DepartmentId;
    doctor.ContactNumber = ContactNumber || doctor.ContactNumber;
    doctor.Email = Email || doctor.Email;
    doctor.ConsultationFee = ConsultationFee || doctor.ConsultationFee;
    doctor.AvailableDays = AvailableDays || doctor.AvailableDays;
    doctor.ShiftTiming = ShiftTiming || doctor.ShiftTiming;

    if (typeof IsActive === "boolean") {
        doctor.IsActive = IsActive;
    }

    try {
        await doctor.save();
    } catch (err) {
        return next(
            new HttpError("Updating doctor failed.", 500)
        );
    }

    res.status(200).json({
        success: true,
        data: doctor
    });
};

// ======================================
// DELETE DOCTOR
// DELETE /api/doctors/:id
// ======================================
const deleteDoctor = async (req, res, next) => {

    const doctorId = req.params.id;

    let doctor;

    try {
        doctor = await Doctor.findById(doctorId);
    } catch (err) {
        return next(
            new HttpError("Could not delete doctor.", 500)
        );
    }

    if (!doctor) {
        return next(
            new HttpError("Doctor not found.", 404)
        );
    }

    try {
        await doctor.deleteOne();
    } catch (err) {
        return next(
            new HttpError("Deleting doctor failed.", 500)
        );
    }

    res.status(200).json({
        success: true,
        message: "Doctor deleted successfully."
    });
};

exports.getDoctors = getDoctors;
exports.getDoctorById = getDoctorById;
exports.createDoctor = createDoctor;
exports.updateDoctor = updateDoctor;
exports.deleteDoctor = deleteDoctor;