const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const labTechnicianSchema = new Schema(
{
    TechnicianID: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    TechnicianName: {
        type: String,
        required: true,
        trim: true
    },

    Qualification: {
        type: String,
        required: true,
        trim: true
    },

    DepartmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        required: true
    },

    ContactNumber: {
        type: String,
        required: true,
        trim: true
    },

    Email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    DateOfJoining: {
        type: Date,
        required: true
    },

    AssignedTests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "LabTest"
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

    AvailableDays: [{
        type: String,
        enum: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
        ]
    }],

    IsActive: {
        type: Boolean,
        default: true
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("LabTechnician", labTechnicianSchema);