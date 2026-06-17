const mongoose = require("mongoose");
// ======================
// Patient Schema
// ======================
const patientSchema = new mongoose.Schema(
  {
    patientId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    name: {
      type: String,
      required: [true, "Patient name is required"],
      trim: true,
    },

    dob: {
      type: Date,
      required: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^[0-9]{10}$/, "Phone number must contain 10 digits"],
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    bloodGroup: {
      type: String,
      enum: [
        "A+",
        "A-",
        "B+",
        "B-",
        "AB+",
        "AB-",
        "O+",
        "O-",
      ],
    },

    status: {
  type: String,
  enum: [
    "Registered",
    "Doctor Consultation",
    "Clinical Services",
    "Completed"
  ],
  default: "Registered"
},

    qrCode: {
      type: String,
      required: true,
      unique: true,
    },

    emergencyContact: {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      phone: {
        type: String,
        required: true,
        match: [/^[0-9]{10}$/, "Emergency contact number must contain 10 digits"],
      },
    },
  },
  {
    timestamps: true,
  }
);

// ======================
// Appointment Schema
// ======================
const appointmentSchema = new mongoose.Schema(
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

    department: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: Date,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

   status: {
  type: String,
  enum: [
    "Scheduled",
    "Checked In",
    "Consultation Completed",
    "Cancelled"
  ],
  default: "Scheduled"
},
    token: {
      type: String,
      required: true,
      unique: true,
    }
  },
  {
    timestamps: true,
  }
);
// Export Models
const Patient = mongoose.model("Patient", patientSchema);
const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = {
  Patient,
  Appointment,
};