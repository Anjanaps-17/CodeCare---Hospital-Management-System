const mongoose = require("mongoose");



// ======================
// Doctor Schema
// ======================

const doctorSchema = new mongoose.Schema(
  {
    DoctorID: {
      type: String,
      required: true,
      unique: true,

      trim: true,
    },

    DoctorName: {
      type: String,
      required: true,
      trim: true,
    },

    Specialization: {
      type: String,
      required: true,
      trim: true,
    },

    Department: {
      type: String,
      required: true,
      trim: true,
    },

    Schedule: {
      type: String,
      default: "",
      trim: true,
    },

    PhoneNumber: {
      type: String,
      default: "",
      trim: true,
    },

    Email: {
      type: String,
      default: "",
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);



// ======================
// Consultation Schema
// ======================
const consultationSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },

    symptoms: {
      type: String,
      required: true,
      trim: true,
    },

    diagnosis: {
      type: String,
      required: true,
      trim: true,
    },

    notes: {
      type: String,
      default: "",
      trim: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);



// ======================
// Prescription Schema
// ======================
const prescriptionSchema = new mongoose.Schema(
  {
    consultationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Consultation",
      required: true,
    },

    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    medicines: [
      {
        medicineName: {
          type: String,
          required: true,
        },

        dosage: {
          type: String,
          required: true,
        },

        duration: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);



// ======================
// Lab Test Schema
// ======================
const labTestSchema = new mongoose.Schema(
  {
    consultationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Consultation",
      required: true,
    },

    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    orderedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    testType: {
      type: String,
      enum: [
        "Blood Test",
        "ECG",
        "X-Ray",
        "MRI",
        "Urine Test",
      ],
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "In Progress",
        "Completed",
      ],
      default: "Pending",
    },

    resultFile: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);



// ======================
// Models
// ======================
const Doctor =
  mongoose.models.Doctor ||
  mongoose.model("Doctor", doctorSchema);

const Consultation =
  mongoose.models.Consultation ||
  mongoose.model("Consultation", consultationSchema);

const Prescription =
  mongoose.models.Prescription ||
  mongoose.model("Prescription", prescriptionSchema);

const LabTest =
  mongoose.models.LabTest ||
  mongoose.model("LabTest", labTestSchema);



// ======================
// Exports
// ======================
module.exports = {
  Doctor,
  Consultation,
  Prescription,
  LabTest,
};

