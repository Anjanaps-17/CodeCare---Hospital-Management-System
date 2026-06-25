const bcrypt = require("bcryptjs");
const { User, Department, Doctor } = require("../models/admin");

const {
  sendUserCredentials,
} = require("../services/emailService");

// =======================
// DASHBOARD
// =======================

const getDashboardData = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalDoctors = await Doctor.countDocuments();
    const totalDepartments = await Department.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalDoctors,
        totalDepartments
      }
    });
  } catch (err) {
    next({
      code: 500,
      message: "Unable to fetch dashboard data"
    });
  }
};

// =======================
// USERS
// =======================

// GET ALL USERS
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (err) {
    next({
      code: 500,
      message: "Unable to fetch users"
    });
  }
};

// GET USER BY ID
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    next({
      code: 500,
      message: "Unable to fetch user"
    });
  }
};

// CREATE USER
const createUser = async (req, res, next) => {
  console.log("BODY RECEIVED:");
  console.log(req.body);
  try {
    const existingUsername = await User.findOne({
      username: req.body.username
    });

    if (existingUsername) {
      return res.status(409).json({
        success: false,
        message: "Username already exists"
      });
    }

    const existingEmail = await User.findOne({
      email: req.body.email
    });

    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: "Email already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(
      req.body.password,
      12
    );

    const user = await User.create({
      username: req.body.username,
      fullName: req.body.fullName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: hashedPassword,
      role: req.body.role,
      gender: req.body.gender,
      bloodGroup: req.body.bloodGroup,
      address: req.body.address,
      qualification: req.body.qualification,
      birthDate: req.body.birthDate,
      dateOfJoining: req.body.dateOfJoining,
      isActive:
        req.body.isActive !== undefined
          ? req.body.isActive
          : true
    });
    console.log("SAVED USER:");
console.log(user);

try {
  console.log("Sending email to:", user.email);

  const info = await sendUserCredentials(
    user.email,
    user.username,
    req.body.password,
    user.role
  );

  console.log("EMAIL SENT:", info.response);
} catch (emailError) {
  console.error("EMAIL ERROR:", emailError);
}

res.status(201).json({
  success: true,
  data: user
});

  } catch (err) {
    next({
      code: 500,
      message: err.message
    });
  }

  
};



// UPDATE USER
const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (
      req.body.username &&
      req.body.username !== user.username
    ) {
      const existingUsername = await User.findOne({
        username: req.body.username
      });

      if (existingUsername) {
        return res.status(409).json({
          success: false,
          message: "Username already exists"
        });
      }
    }

    if (
      req.body.email &&
      req.body.email !== user.email
    ) {
      const existingEmail = await User.findOne({
        email: req.body.email
      });

      if (existingEmail) {
        return res.status(409).json({
          success: false,
          message: "Email already exists"
        });
      }
    }

    if (req.body.password) {
      req.body.password = await bcrypt.hash(
        req.body.password,
        12
      );
    }

    const updatedUser =
      await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true
        }
      );

    res.status(200).json({
      success: true,
      data: updatedUser
    });

  } catch (err) {
    next({
      code: 500,
      message: err.message
    });
  }
};

// DELETE USER
const deleteUser = async (req, res, next) => {
  try {
    const user =
      await User.findByIdAndDelete(
        req.params.id
      );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    await Doctor.deleteOne({
      userId: user._id
    });

    res.status(200).json({
      success: true,
      message: "User deleted successfully"
    });

  } catch (err) {
    next({
      code: 500,
      message: "Unable to delete user"
    });
  }
};

// =======================
// DEPARTMENTS
// =======================

// GET ALL DEPARTMENTS
const getDepartments = async (req, res, next) => {
    try {
        const departments = await Department.find();

        res.status(200).json({
            success: true,
            count: departments.length,
            data: departments
        });
    } catch (err) {
        next({ code: 500, message: "Unable to fetch departments" });
    }
};

// GET DEPARTMENT BY ID
const getDepartmentById = async (req, res, next) => {
    try {
        const department = await Department.findById(req.params.id);

        if (!department) {
            return res.status(404).json({
                success: false,
                message: "Department not found"
            });
        }

        res.status(200).json({
            success: true,
            data: department
        });
    } catch (err) {
        next({ code: 500, message: "Unable to fetch department" });
    }
};

// CREATE DEPARTMENT
const createDepartment = async (req, res, next) => {
    try {
        const department = await Department.create(req.body);

        res.status(201).json({
            success: true,
            data: department
        });
    } catch (err) {
        next({ code: 500, message: err.message });
    }
};

// UPDATE DEPARTMENT
const updateDepartment = async (req, res, next) => {
    try {
        const department = await Department.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!department) {
            return res.status(404).json({
                success: false,
                message: "Department not found"
            });
        }

        res.status(200).json({
            success: true,
            data: department
        });
    } catch (err) {
        next({ code: 500, message: "Unable to update department" });
    }
};

// DELETE DEPARTMENT
const deleteDepartment = async (req, res, next) => {
    try {

        const doctorExists = await Doctor.findOne({
            department: req.params.id
        });

        if (doctorExists) {
            return res.status(400).json({
                success: false,
                message:
                    "Cannot delete department. Doctors are assigned to it."
            });
        }

        const department =
            await Department.findByIdAndDelete(
                req.params.id
            );

        if (!department) {
            return res.status(404).json({
                success: false,
                message: "Department not found"
            });
        }

        res.status(200).json({
            success: true,
            message:
                "Department deleted successfully"
        });

    } catch (err) {
        next({
            code: 500,
            message:
                "Unable to delete department"
        });
    }
};


// DOCTORS


// GET ALL DOCTORS
const getDoctors = async (req, res, next) => {
    try {
        const doctors = await Doctor.find()
            .populate("userId")
            .populate("department");

        res.status(200).json({
            success: true,
            count: doctors.length,
            data: doctors
        });
    } catch (err) {
        next({ code: 500, message: "Unable to fetch doctors" });
    }
};

// GET DOCTOR BY ID
const getDoctorById = async (req, res, next) => {
    try {
        const doctor = await Doctor.findById(req.params.id)
            .populate("userId")
            .populate("department");

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found"
            });
        }

        res.status(200).json({
            success: true,
            data: doctor
        });
    } catch (err) {
        next({ code: 500, message: "Unable to fetch doctor" });
    }
};

// CREATE DOCTOR
const createDoctor = async (req, res, next) => {
    try {

        const user = await User.findById(req.body.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (user.role !== "Doctor") {
            return res.status(400).json({
                success: false,
                message: "Selected user is not a Doctor"
            });
        }

        const existingDoctor = await Doctor.findOne({
            userId: req.body.userId
        });

        if (existingDoctor) {
            return res.status(400).json({
                success: false,
                message: "Doctor profile already exists for this user"
            });
        }

        const doctor = await Doctor.create({
            userId: req.body.userId,
            name: req.body.name,
            department: req.body.department,
            schedule: req.body.schedule
        });

        res.status(201).json({
            success: true,
            data: doctor
        });
      
existingDoctor = await Doctor.findOne({
  userId: req.body.userId
});

if (existingDoctor) {
  return res.status(400).json({
    message: "Doctor already registered"
  });
}
    } catch (err) {
        next({
            code: 500,
            message: err.message
        });
    }
};

// UPDATE DOCTOR
const updateDoctor = async (req, res, next) => {
    try {

        const doctor =
            await Doctor.findById(req.params.id);

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found"
            });
        }

        if (req.body.userId) {

            const user =
                await User.findById(
                    req.body.userId
                );

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            if (user.role !== "Doctor") {
                return res.status(400).json({
                    success: false,
                    message:
                        "Selected user is not a Doctor"
                });
            }
        }

        const updatedDoctor =
            await Doctor.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );

        res.status(200).json({
            success: true,
            data: updatedDoctor
        });

    } catch (err) {
        next({
            code: 500,
            message: err.message
        });
    }
};

// DELETE DOCTOR
const deleteDoctor = async (req, res, next) => {
    try {
        const doctor = await Doctor.findByIdAndDelete(req.params.id);

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Doctor deleted successfully"
        });
    } catch (err) {
        next({ code: 500, message: "Unable to delete doctor" });
    }
};



// EXPORTS


module.exports = {
    //Dashboard
    getDashboardData,

    // Users
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,

    // Departments
    getDepartments,
    getDepartmentById,
    createDepartment,
    updateDepartment,
    deleteDepartment,

    // Doctors
    getDoctors,
    getDoctorById,
    createDoctor,
    updateDoctor,
    deleteDoctor
};