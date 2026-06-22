const { Patient, Appointment } = require("../models/receptionist");
const { Doctor } = require("../models/admin");
const mongoose = require("mongoose");

// ======================
// Register Patient
// ======================
const registerPatient = async (req, res) => {
  try {
    const existingPatient = await Patient.findOne({
      phone: req.body.phone,
      dob: req.body.dob
    });

    if (existingPatient) {
      return res.status(400).json({
        message: "Patient already registered",
        patient: existingPatient
      });
    }
    const uniqueId = Date.now();

    const patient = new Patient({
      ...req.body,
      patientId: `PAT-${uniqueId}`,
      qrCode: `QR-${uniqueId}`
    });

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

    const conditions = [];

if (patientId) conditions.push({ patientId });
if (name) conditions.push({ name });
if (phone) conditions.push({ phone });
if (qrCode) conditions.push({ qrCode });

if (conditions.length === 0) {
  return res.status(400).json({
    message: "Provide at least one search parameter",
  });
}

const patients = await Patient.find({
  $or: conditions,
});

if (patients.length === 0) {
  return res.status(404).json({
    message: "Patient not found",
  });
}

res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ======================
// Get Patient By ID
// ======================
const getPatientById = async (req, res) => {
  try {
    let patient;

    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      patient = await Patient.findOne({
        $or: [
          { _id: req.params.id },
          { patientId: req.params.id }
        ]
      });
    } else {
      patient = await Patient.findOne({
        patientId: req.params.id
      });
    }

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
    let updatedPatient;

    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      updatedPatient = await Patient.findOneAndUpdate(
        {
          $or: [
            { _id: req.params.id },
            { patientId: req.params.id }
          ]
        },
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
    } else {
      updatedPatient = await Patient.findOneAndUpdate(
        { patientId: req.params.id },
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
    }

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
    let patient;

    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      patient = await Patient.findOneAndUpdate(
        {
          $or: [
            { _id: req.params.id },
            { patientId: req.params.id }
          ]
        },
        { status: req.body.status },
        {
          new: true,
          runValidators: true,
        }
      );
    } else {
      patient = await Patient.findOneAndUpdate(
        { patientId: req.params.id },
        { status: req.body.status },
        {
          new: true,
          runValidators: true,
        }
      );
    }

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
    const existingAppointment = await Appointment.findOne({
      patientId: req.params.id,
    });

    if (existingAppointment) {
      return res.status(400).json({
        message: "Cannot delete patient with existing appointments",
      });
    }

    let patient;

if (mongoose.Types.ObjectId.isValid(req.params.id)) {
  patient = await Patient.findOneAndDelete({
    $or: [
      { _id: req.params.id },
      { patientId: req.params.id }
    ]
  });
} else {
  patient = await Patient.findOneAndDelete({
    patientId: req.params.id
  });
}

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
   let patient;

if (mongoose.Types.ObjectId.isValid(req.body.patientId)) {
  patient = await Patient.findOne({
    $or: [
      { _id: req.body.patientId },
      { patientId: req.body.patientId }
    ]
  });
} else {
  patient = await Patient.findOne({
    patientId: req.body.patientId
  });
}

    if (!patient) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    const doctor = await Doctor.findById(req.body.doctorId);

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    const uniqueId = Date.now();

    const appointment = new Appointment({
      ...req.body,
      token: `APT-${uniqueId}`,
    });

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
      qrCode: req.query.qr,
    });

    if (!patient) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    const appointment = await Appointment.findOne({
      patientId: patient._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      patient,
      appointment,
    });
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
    })
      .populate("patientId")
      .populate("doctorId");

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
    })
      .populate("patientId")
      .populate("doctorId");

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
      {
        new: true,
        runValidators: true,
      }
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
      {
        new: true,
        runValidators: true,
      }
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
};