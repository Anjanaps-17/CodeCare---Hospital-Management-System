const express = require('express');
const { check } = require('express-validator');

const router = express.Router();

const labTechnicianController = require('../controller/labtech');

// UC-LAB-01 View Pending Tests
router.get(
'/pending',
labTechnicianController.getPendingTests
);

// UC-LAB-02 Start Test
router.patch(
'/:id/start',
labTechnicianController.startTest
);

// UC-LAB-03 Upload Result
router.patch(
'/:id/upload-result',
[
check('resultFile')
.not()
.isEmpty()
.withMessage('Result file is required')
],
labTechnicianController.uploadResult
);

// UC-LAB-04 Complete Test
router.patch(
'/:id/complete',
labTechnicianController.completeTest
);

module.exports = router;
