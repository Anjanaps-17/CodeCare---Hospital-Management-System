const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* =======================
   Consultation Schema
======================= */
const consultationSchema = new Schema(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    appointmentId: {
      type: Schema.Types.ObjectId,
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
  { timestamps: true }
);

/* =======================
   Prescription Schema
======================= */
const prescriptionSchema = new Schema(
  {
    consultationId: {
      type: Schema.Types.ObjectId,
      ref: "Consultation",
      required: true,
    },

    patientId: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    medicines: [
      {
        medicineName: { type: String, required: true, trim: true },
        dosage: { type: String, required: true, trim: true },
        duration: { type: String, required: true, trim: true },
      },
    ],
  },
  { timestamps: true }
);

/* =======================
   Lab Test Schema
======================= */
const labTestSchema = new Schema(
  {
    consultationId: {
      type: Schema.Types.ObjectId,
      ref: "Consultation",
      required: true,
    },

    patientId: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    testType: {
      type: String,
      enum: ["Blood Test", "ECG", "X-Ray", "MRI", "Urine Test"],
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },

    resultFile: {
      type: String,
      default: null,
    },

    orderedBy: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
  },
  { timestamps: true }
);

/* =======================
   SAFE MODEL EXPORT (FIX FOR OVERWRITE ERROR)
======================= */

const Consultation =
  mongoose.models.Consultation ||
  mongoose.model("Consultation", consultationSchema);

const Prescription =
  mongoose.models.Prescription ||
  mongoose.model("Prescription", prescriptionSchema);

const LabTest =
  mongoose.models.LabTest ||
  mongoose.model("LabTest", labTestSchema);

module.exports = {
  Consultation,
  Prescription,
  LabTest,
};