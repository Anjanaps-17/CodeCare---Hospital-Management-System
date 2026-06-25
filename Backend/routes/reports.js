const express = require("express");
const router = express.Router();

const {
  getDashboardReport,
  getUserReport,
  getAppointmentReport
} = require("../controller/report.controller"); // adjust path if needed

router.get("/dashboard", getDashboardReport);
router.get("/users", getUserReport);
router.get("/appointments", getAppointmentReport);

module.exports = router;