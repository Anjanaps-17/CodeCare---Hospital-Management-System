const { Patient, Appointment } = require("../models/receptionist");
const { Consultation, Prescription, LabTest } = require("../models/doctor");
const Doctor = require("../models/Doctor");
const mongoose = require("mongoose");


// ======================
// Today's Appointments
// ======================
const getTodayAppointments = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const appointments = await Appointment.find({
      doctorId: req.params.doctorId,
      date: { $gte: today, $lt: tomorrow }
    })
      .populate("patientId")
      .populate("doctorId");

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ======================
// Get Appointment By ID
// ======================
const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate("patientId")
      .populate("doctorId");

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ======================
// Patient History
// ======================
const getPatientHistory = async (req, res) => {
  try {
    const patient = await Patient.findOne({
      $or: [
        { _id: mongoose.Types.ObjectId.isValid(req.params.patientId) ? req.params.patientId : null },
        { patientId: req.params.patientId }
      ]
    });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const consultations = await Consultation.find({ patientId: patient._id });
    const prescriptions = await Prescription.find({
      consultationId: { $in: consultations.map(c => c._id) }
    });

    const labTests = await LabTest.find({ patientId: patient._id });

    res.status(200).json({
      patient,
      consultations,
      prescriptions,
      labTests
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ======================
// Create Consultation
// ======================
const createConsultation = async (req, res) => {
  try {
    const consultation = new Consultation(req.body);
    await consultation.save();

    res.status(201).json({
      message: "Consultation created successfully",
      consultation
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ======================
// Update Consultation
// ======================
const updateConsultation = async (req, res) => {
  try {
    const consultation = await Consultation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!consultation) {
      return res.status(404).json({ message: "Consultation not found" });
    }

    res.status(200).json({
      message: "Consultation updated successfully",
      consultation
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ======================
// Get Consultation By ID
// ======================
const getConsultationById = async (req, res) => {
  try {
    const consultation = await Consultation.findById(req.params.id)
      .populate("patientId")
      .populate("doctorId")
      .populate("appointmentId");

    if (!consultation) {
      return res.status(404).json({ message: "Consultation not found" });
    }

    res.status(200).json(consultation);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ======================
// Create Prescription
// ======================
const createPrescription = async (req, res) => {
  try {
    const prescription = new Prescription(req.body);
    await prescription.save();

    res.status(201).json({
      message: "Prescription created successfully",
      prescription
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ======================
// Get Prescription By ID
// ======================
const getPrescriptionById = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id)
      .populate("consultationId");

    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    res.status(200).json(prescription);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ======================
// Order Lab Test
// ======================
const orderLabTest = async (req, res) => {
  try {
    const labTest = new LabTest(req.body);
    await labTest.save();

    res.status(201).json({
      message: "Lab test ordered successfully",
      labTest
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ======================
// Get Lab Tests By Patient
// ======================
const getLabTestsByPatient = async (req, res) => {
  try {
    const patient = await Patient.findOne({
      $or: [
        { _id: mongoose.Types.ObjectId.isValid(req.params.patientId) ? req.params.patientId : null },
        { patientId: req.params.patientId }
      ]
    });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const labTests = await LabTest.find({ patientId: patient._id });

    res.status(200).json(labTests);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ======================
// Get All Doctors
// ======================
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();

    res.status(200).json({
      count: doctors.length,
      doctors
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ======================
// Get Doctor By ID (FIXED)
// ======================
const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({
      $or: [
        { _id: mongoose.Types.ObjectId.isValid(req.params.id) ? req.params.id : null },
        { DoctorID: req.params.id }
      ]
    });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json(doctor);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ======================
// EXPORTS
// ======================
module.exports = {
  getTodayAppointments,
  getAppointmentById,
  getPatientHistory,
  createConsultation,
  updateConsultation,
  getConsultationById,
  createPrescription,
  getPrescriptionById,
  orderLabTest,
  getLabTestsByPatient,
  getAllDoctors,
  getDoctorById
};