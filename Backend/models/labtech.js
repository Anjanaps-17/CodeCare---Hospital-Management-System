const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const labTestSchema = new Schema({
consultationId: {
type: mongoose.Types.ObjectId,
ref: 'Consultation',
required: true
},


patientId: {
    type: mongoose.Types.ObjectId,
    ref: 'Patient',
    required: true
},

testType: {
    type: String,
    enum: ['Blood Test', 'ECG', 'X-Ray', 'MRI', 'Urine Test'],
    required: true
},

status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending'
},

resultFile: {
    type: String,
    default: null
},

orderedBy: {
    type: mongoose.Types.ObjectId,
    ref: 'Doctor',
    required: true
},

updatedAt: {
    type: Date,
    default: Date.now
}


});

module.exports = mongoose.model('LabTest', labTestSchema);
