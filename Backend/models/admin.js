const mongoose = require("mongoose");

// ======================
// USER SCHEMA
// ======================

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    phoneNumber: {
      type: String,
      required: true,
      match: [/^[6-9]\d{9}$/, "Invalid phone number"]
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: [
        "Admin",
        "Receptionist",
        "Doctor",
        "Lab Technician"
      ],
      required: true
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"]
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
        "O-"
      ]
    },

    address: {
      type: String
    },

    qualification: {
      type: String
    },

    birthDate: {
      type: Date
    },

    dateOfJoining: {
      type: Date,
      default: Date.now
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

// ======================
// DEPARTMENT SCHEMA
// ======================

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

// ======================
// DOCTOR SCHEMA
// ======================

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true
    },

    schedule: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

// ======================
// MODELS
// ======================

const User = mongoose.model("User", userSchema);

const Department = mongoose.model(
  "Department",
  departmentSchema
);

const Doctor = mongoose.model(
  "Doctor",
  doctorSchema
);



module.exports = {
  User,
  Department,
  Doctor
};
