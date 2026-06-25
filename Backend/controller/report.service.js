const {User} = require("../models/admin.js");
const {Appointment} = require("../models/receptionist.js")


const dashboardReport = async () => {
  const totalUsers = await User.countDocuments();
  const doctors = await User.countDocuments({ role: "Doctor" });
  const receptionists = await User.countDocuments({ role: "Receptionist" });

  const totalAppointments = await Appointment.countDocuments();

  return {
    users: {
      total: totalUsers,
      doctors,
      receptionists
    },
    appointments: {
      total: totalAppointments
    }
  };
};

 const userReport = async () => {
  const users = await User.find().select("-password");

  return {
    total: users.length,
    data: users
  };
};

 const appointmentReport = async () => {
  const total = await Appointment.countDocuments();
  const completed = await Appointment.countDocuments({ status: "Completed" });
  const pending = await Appointment.countDocuments({ status: "Pending" });

  return {
    total,
    completed,
    pending
  };
};

module.exports = {
  dashboardReport,
  userReport,
  appointmentReport,
};