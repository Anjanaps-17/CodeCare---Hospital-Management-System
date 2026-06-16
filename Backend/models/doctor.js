const mongoose = require('mongoose')
const Schema = mongoose.Schema

const doctorSchema = new Schema({

    DoctorID: {
        type: String,
        required: true,
        unique: true
    },

    UserId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },

    DoctorName: {
        type: String,
        required: true
    },

    Specialization: {
        type: String,
        required: true
    },

    Qualification: {
        type: String,
        required: true
    },

    LicenseNumber: {
        type: String,
        required: true,
        unique: true
    },

    DateOfJoining: {
        type: Date,
        required: true
    },

    DepartmentId: {
        type: mongoose.Types.ObjectId,
        ref: "Department",
        required: true
    },

    Appointments: [{
        type: mongoose.Types.ObjectId,
        ref: "Appointment"
    }],

    Patients: [{
        type: mongoose.Types.ObjectId,
        ref: "Patient"
    }],

    ContactNumber: {
        type: String,
        required: true
    },

    Email: {
        type: String,
        required: true,
        unique: true
    },

    ConsultationFee: {
        type: Number,
        required: true
    },

    AvailableDays: [{
        type: String,
        enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    }],

    ShiftTiming: {
        StartTime: {
            type: String,
            required: true
        },
        EndTime: {
            type: String,
            required: true
        }
    },

    IsActive: {
        type: Boolean,
        default: true
    }

})

module.exports = mongoose.model("Doctor", doctorSchema) 
