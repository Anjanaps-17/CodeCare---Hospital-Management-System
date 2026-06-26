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
    const { patientId, name, phone, qr } = req.query;


    const conditions = [];

if (patientId) conditions.push({ patientId });
if (name) {
  conditions.push({
    name: {
      $regex: name,
      $options: "i",
    },
  });
}
if (phone) conditions.push({ phone });
if (qr) conditions.push({ qrCode: qr });

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
    let patient;

    // Find patient using ObjectId or PAT-xxxx
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

    // Check whether patient has appointments
    const existingAppointment = await Appointment.findOne({
      patientId: patient._id,
    });

    if (existingAppointment) {
      return res.status(400).json({
        message: "Cannot delete patient with existing appointments",
      });
    }

    // Delete patient
    await Patient.findByIdAndDelete(patient._id);

    res.status(200).json({
      message: "Patient deleted successfully",
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find()
      .select("name patientId");

    res.status(200).json(patients);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================
// Book Appointment
// ======================
const bookAppointment = async (req, res) => {
  console.log("bookAppointment called");
  console.log(req.body);
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

  const doctor = await Doctor.findById(req.body.doctorId)
  .populate("department", "name");

  console.log("Doctor:", doctor);
console.log("Department:", doctor?.department);

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    // Check whether doctor already has an appointment
const existingAppointment = await Appointment.findOne({
  doctorId: req.body.doctorId,
  date: req.body.date,
  time: req.body.time,
  status: { $ne: "Cancelled" }
});

if (existingAppointment) {
  return res.status(400).json({
    message: "Doctor already has an appointment at this time"
  });
}

    const count = await Appointment.countDocuments({
  doctorId: req.body.doctorId,
  date: req.body.date,
  status: { $ne: "Cancelled" }
});

const appointmentId = `APT-${Date.now()}`;

const appointment = new Appointment({
  appointmentId,
  patientId: patient._id,
  doctorId: req.body.doctorId,
  department: doctor.department.name,
  date: req.body.date,
  time: req.body.time,
  token: count + 1,
});
    await appointment.save();

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
  console.error("BOOK APPOINTMENT ERROR");
  console.error(error);

  res.status(500).json({
    message: error.message,
  });
}
};
// ======================
// Get All Doctors
// ======================
const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find()
      .populate("department", "name")
      .select("name schedule department");

    res.status(200).json(doctors);

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// ======================
// Doctor Availability
// ======================
const getDoctorAvailability = async (req, res) => {
  try {
    const doctors = await Doctor.find()
      .populate("department", "name");

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const availability = await Promise.all(
      doctors.map(async (doctor) => {
        const booked = await Appointment.countDocuments({
          doctorId: doctor._id,
          date: {
            $gte: today,
            $lt: tomorrow,
          },
          status: {
            $ne: "Cancelled",
          },
        });

        const MAX_APPOINTMENTS = 20;

        return {
          _id: doctor._id,
          name: doctor.name,
          department: doctor.department.name,
          schedule: doctor.schedule,
          booked,
          limit: MAX_APPOINTMENTS,
          available: booked < MAX_APPOINTMENTS,
        };
      })
    );

    res.json(availability);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================
// Verify QR
// ======================
const verifyQR = async (req, res) => {
  try {
    const patient = await Patient.findOne({
      patientId: req.query.qr,
    });

    if (!patient) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    const appointment = await Appointment.findOne({
      patientId: patient._id,
    })
    .populate({
    path: "doctorId",
    select: "name",
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      patient,
      appointment,
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
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
    let patient;

    if (mongoose.Types.ObjectId.isValid(req.params.patientId)) {
      patient = await Patient.findOne({
        $or: [
          { _id: req.params.patientId },
          { patientId: req.params.patientId }
        ]
      });
    } else {
      patient = await Patient.findOne({
        patientId: req.params.patientId
      });
    }

    if (!patient) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    const appointments = await Appointment.find({
      patientId: patient._id,
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
const getTodayAppointments = async (req, res) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const appointments = await Appointment.find({
      date: {
        $gte: start,
        $lte: end,
      },
    })
      .populate("patientId")
      .populate("doctorId");

    res.status(200).json({
      data: appointments,
    });

  } catch (error) {
    res.status(200).json({
  data: appointments,
    });
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

const getDashboard = async (req, res) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const totalPatientsToday = await Appointment.countDocuments({
      date: {
        $gte: start,
        $lte: end,
      },
      status: { $ne: "Cancelled" },
    });

    const pendingAppointments = await Appointment.countDocuments({
      date: {
        $gte: start,
        $lte: end,
      },
      status: "Scheduled",
    });

    res.status(200).json({
      data: {
        totalPatientsToday,
        pendingAppointments,
      },
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  registerPatient,
  searchPatient,
  getPatientById,
  updatePatient,
  updatePatientStatus,
  deletePatient,
  getPatients,
  bookAppointment,
  verifyQR,
  getDoctors,
  getDoctorAvailability,
  getAppointmentById,
  getAppointmentsByPatient,
  getAppointmentsByDoctor,
  getTodayAppointments,
  updateAppointment,
  cancelAppointment,
  getDashboard,
};