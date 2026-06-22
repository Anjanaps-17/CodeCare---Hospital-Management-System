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
   PhoneNumber: String,
    Email: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Doctor", doctorSchema);