
const LabTest = require('../models/labtech');

// UC-LAB-01 View Pending Tests
const getPendingTests = async (req, res, next) => {
let pendingTests;


try {
    pendingTests = await LabTest.find({ status: 'Pending' })
        .populate('patientId', 'name')
        .populate('orderedBy', 'name');
} catch (err) {
    return next(
        new HttpError(
            'Fetching pending tests failed, please try again.',
            500
        )
    );
}

res.status(200).json({
    pendingTests: pendingTests.map(test =>
        test.toObject({ getters: true })
    )
});


};

// UC-LAB-02 Start Test
const startTest = async (req, res, next) => {
const testId = req.params.id;


let labTest;

try {
    labTest = await LabTest.findById(testId);
} catch (err) {
    return next(
        new HttpError(
            'Fetching test failed, please try again.',
            500
        )
    );
}

if (!labTest) {
    return next(new HttpError('Test not found.', 404));
}

if (labTest.status !== 'Pending') {
    return next(
        new HttpError(
            'Only pending tests can be started.',
            400
        )
    );
}

labTest.status = 'In Progress';
labTest.updatedAt = new Date();

try {
    await labTest.save();
} catch (err) {
    return next(
        new HttpError(
            'Starting test failed, please try again.',
            500
        )
    );
}

res.status(200).json({
    message: 'Test marked In Progress',
    labTest: labTest.toObject({ getters: true })
});


};

// UC-LAB-03 Upload Result
const uploadResult = async (req, res, next) => {
const errors = validationResult(req);

if (!errors.isEmpty()) {
    return next(
        new HttpError(errors.array()[0].msg, 422)
    );
}

const testId = req.params.id;
const { resultFile } = req.body;

let labTest;

try {
    labTest = await LabTest.findById(testId);
} catch (err) {
    return next(
        new HttpError(
            'Fetching test failed, please try again.',
            500
        )
    );
}

if (!labTest) {
    return next(new HttpError('Test not found.', 404));
}

if (labTest.status !== 'In Progress') {
    return next(
        new HttpError(
            'Test must be In Progress before uploading results.',
            400
        )
    );
}

labTest.resultFile = resultFile;
labTest.updatedAt = new Date();

try {
    await labTest.save();
} catch (err) {
    return next(
        new HttpError(
            'Uploading result failed, please try again.',
            500
        )
    );
}

res.status(200).json({
    message: 'Result uploaded successfully',
    resultFile: labTest.resultFile
});


};

// UC-LAB-04 Complete Test
const completeTest = async (req, res, next) => {
const testId = req.params.id;

let labTest;

try {
    labTest = await LabTest.findById(testId);
} catch (err) {
    return next(
        new HttpError(
            'Fetching test failed, please try again.',
            500
        )
    );
}

if (!labTest) {
    return next(new HttpError('Test not found.', 404));
}

if (!labTest.resultFile) {
    return next(
        new HttpError(
            'Upload result before completing the test.',
            400
        )
    );
}

labTest.status = 'Completed';
labTest.updatedAt = new Date();

try {
    await labTest.save();
} catch (err) {
    return next(
        new HttpError(
            'Completing test failed, please try again.',
            500
        )
    );
}

res.status(200).json({
    message: 'Test completed successfully',
    labTest: labTest.toObject({ getters: true })
});


};

exports.getPendingTests = getPendingTests;
exports.startTest = startTest;
exports.uploadResult = uploadResult;
exports.completeTest = completeTest;
