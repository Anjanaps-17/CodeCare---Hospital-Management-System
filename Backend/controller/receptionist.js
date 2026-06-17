const { Patient, Appointment } = require("../models/receptionist");


// ======================
// Register Patient
// ======================
const registerPatient = async (req, res) => {
  try {
    const patient = new Patient(req.body);

    await patient.save();

    res.status(201).json({
      message: "Patient registered successfully",
      patient,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ======================
// Search Patient
// ======================
const searchPatient = async (req, res) => {
  try {
    const { patientId, name, phone, qrCode } = req.query;

    const patient = await Patient.findOne({
      $or: [{ patientId }, { name }, { phone }, { qrCode }],
    });

    if (!patient) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ======================
// Get Patient By ID
// ======================
const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ======================
// Update Patient Details
// ======================
const updatePatient = async (req, res) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedPatient) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    res.status(200).json({
      message: "Patient updated successfully",
      updatedPatient,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ======================
// Update Patient Status
// ======================
const updatePatientStatus = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!patient) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    res.status(200).json({
      message: "Patient status updated successfully",
      patient,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ======================
// Delete Patient
// ======================
const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);

    if (!patient) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    res.status(200).json({
      message: "Patient deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ======================
// Book Appointment
// ======================
const bookAppointment = async (req, res) => {
  try {
    const appointment = new Appointment(req.body);

    await appointment.save();

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ======================
// Verify QR
// ======================
const verifyQR = async (req, res) => {
  try {
    const patient = await Patient.findOne({
      qrCode: req.query.qrCode,
    });

    if (!patient) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ======================
// Get Appointment By ID
// ======================
const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ======================
// Get Appointments By Patient
// ======================
const getAppointmentsByPatient = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patientId: req.params.patientId,
    });

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ======================
// Get Appointments By Doctor
// ======================
const getAppointmentsByDoctor = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      doctorId: req.params.doctorId,
    });

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ======================
// Update Appointment
// ======================
const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      message: "Appointment updated successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ======================
// Cancel Appointment
// ======================
const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: "Cancelled" },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      message: "Appointment cancelled successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ======================
// Delete Appointment
// ======================
const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  registerPatient,
  searchPatient,
  getPatientById,
  updatePatient,
  updatePatientStatus,
  deletePatient,
  bookAppointment,
  verifyQR,
  getAppointmentById,
  getAppointmentsByPatient,
  getAppointmentsByDoctor,
  updateAppointment,
  cancelAppointment,
  deleteAppointment,
};