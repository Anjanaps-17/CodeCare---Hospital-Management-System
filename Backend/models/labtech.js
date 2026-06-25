const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
  {
    timestamps: true,
  }
);

const LabTest =
  mongoose.models.LabTest ||
  mongoose.model("LabTest", labTestSchema);

module.exports = LabTest;