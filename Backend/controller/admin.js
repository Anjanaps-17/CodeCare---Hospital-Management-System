const { User, Department, Doctor } = require("../models/admin");


// GET ALL USERS
const getUsers = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        let filter = {};

        if (req.query.role) {
            filter.role = req.query.role;
        }

        if (req.query.isActive !== undefined) {
            filter.isActive = req.query.isActive === "true";
        }

        const users = await User.find(filter)
            .skip(skip)
            .limit(limit);

        const totalRecords = await User.countDocuments(filter);

        res.status(200).json({
            success: true,
            page,
            limit,
            totalRecords,
            totalPages: Math.ceil(totalRecords / limit),
            count: users.length,
            data: users
        });
    } catch (err) {
        next({ code: 500, message: "Unable to fetch users" });
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
        next({ code: 500, message: "Unable to fetch user" });
    }
};

// CREATE USER
const createUser = async (req, res, next) => {
    try {
        const user = await User.create(req.body);

        res.status(201).json({
            success: true,
            data: user
        });
    } catch (err) {
        next({ code: 500, message: err.message });
    }
};

// UPDATE USER
const updateUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

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
        next({ code: 500, message: "Unable to update user" });
    }
};

// DELETE USER
const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    } catch (err) {
        next({ code: 500, message: "Unable to delete user" });
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
        const department = await Department.findByIdAndDelete(req.params.id);

        if (!department) {
            return res.status(404).json({
                success: false,
                message: "Department not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Department deleted successfully"
        });
    } catch (err) {
        next({ code: 500, message: "Unable to delete department" });
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
        const doctor = await Doctor.create(req.body);

        res.status(201).json({
            success: true,
            data: doctor
        });
    } catch (err) {
        next({ code: 500, message: err.message });
    }
};

// UPDATE DOCTOR
const updateDoctor = async (req, res, next) => {
    try {
        const doctor = await Doctor.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

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
        next({ code: 500, message: "Unable to update doctor" });
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