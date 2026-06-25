const reportService = require("../controller/report.service");

const getDashboardReport = async (req, res) => {
  try {
    const data = await reportService.dashboardReport();
    res.json(data);
  } catch (err) {
  console.error("DASHBOARD REPORT ERROR:", err);
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}
};

const getUserReport = async (req, res) => {
  try {
    const data = await reportService.userReport();
    res.json(data);
  } catch (err) {
  console.error("USER REPORT ERROR:", err);
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}
};

const getAppointmentReport = async (req, res) => {
  try {
    const data = await reportService.appointmentReport();
    res.json(data);
  }catch (err) {
  console.error("APPOINMENT REPORT ERROR:", err);
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}
};

module.exports = {
  getDashboardReport,
  getUserReport,
  getAppointmentReport,
};