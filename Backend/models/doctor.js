const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    DoctorID: {
      type: String,
      required: true,
      unique: true,
    },

    DoctorName: {
      type: String,
      required: true,
    },

    Specialization: {
      type: String,
      required: true,
    },

    Department: {
      type: String,
      default: "",
    },

    Schedule: {
      type: String,
      default: "",
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