const mongoose = require("mongoose");

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
      default: "",
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

const Doctor =
  mongoose.models.Doctor ||
  mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;