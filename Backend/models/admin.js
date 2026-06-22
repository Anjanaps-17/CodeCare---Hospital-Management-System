const mongoose = require("mongoose");

// User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["Admin", "Receptionist", "Doctor", "Lab Technician"],
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

// Department Schema
const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

// Doctor Schema
const doctorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true
  },
  schedule: {
    type: String
  }
});
const User = mongoose.model("User", userSchema);
const Department = mongoose.model("Department", departmentSchema);
const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = {User,Department,Doctor};