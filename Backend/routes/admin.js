const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const admin = require("../controller/admin");

const {
  checkAuth,
  checkRole
} = require("../middleware/admin-middleware");

router.use(checkAuth);

// ======================
// DASHBOARD
// ======================

router.get(
  "/dashboard",
  admin.getDashboardData
);

// ======================
// USERS - ADMIN ONLY
// ======================

router.post(
  "/users",
  checkRole(["Admin"]),
  [
    check("username")
      .notEmpty()
      .withMessage("Username is required"),
    check("fullName")
  .notEmpty()
  .withMessage("Full Name is required"),  

    check("email")
      .isEmail()
      .withMessage("Valid email is required"),

    check("phoneNumber")
      .matches(/^[6-9]\d{9}$/)
      .withMessage("Invalid phone number"),

    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),

    check("role")
      .notEmpty()
      .withMessage("Role is required")
  ],
  admin.createUser
);

router.get(
  "/users",
  checkRole(["Admin"]),
  admin.getUsers
);

router.get(
  "/users/:id",
  checkRole(["Admin"]),
  admin.getUserById
);

router.put(
  "/users/:id",
  checkRole(["Admin"]),
  [
    check("username")
      .optional()
      .notEmpty()
      .withMessage("Username cannot be empty"),
    check("fullName")
  .optional()
  .notEmpty()
  .withMessage("Full Name is required"),

    check("email")
      .optional()
      .isEmail()
      .withMessage("Valid email is required"),

    check("phoneNumber")
      .optional()
      .matches(/^[6-9]\d{9}$/)
      .withMessage("Invalid phone number"),

    check("password")
      .optional()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters")
  ],
  admin.updateUser
);

router.delete(
  "/users/:id",
  checkRole(["Admin"]),
  admin.deleteUser
);

// ======================
// DEPARTMENTS - ADMIN ONLY
// ======================

router.post(
  "/departments",
  checkRole(["Admin"]),
  [
    check("name")
      .notEmpty()
      .withMessage("Department name is required")
  ],
  admin.createDepartment
);

router.get(
  "/departments",
  checkRole(["Admin"]),
  admin.getDepartments
);

router.get(
  "/departments/:id",
  checkRole(["Admin"]),
  admin.getDepartmentById
);

router.put(
  "/departments/:id",
  checkRole(["Admin"]),
  [
    check("name")
      .notEmpty()
      .withMessage("Department name is required")
  ],
  admin.updateDepartment
);

router.delete(
  "/departments/:id",
  checkRole(["Admin"]),
  admin.deleteDepartment
);

// ======================
// DOCTORS - ADMIN ONLY
// ======================

router.post(
  "/doctors",
  checkRole(["Admin"]),
  [
    check("userId")
      .notEmpty()
      .withMessage("User is required"),

    check("name")
      .notEmpty()
      .withMessage("Doctor name is required"),

    check("department")
      .notEmpty()
      .withMessage("Department is required")
  ],
  admin.createDoctor
);

router.put(
  "/doctors/:id",
  checkRole(["Admin"]),
  [
    check("name")
      .optional()
      .notEmpty()
      .withMessage("Doctor name cannot be empty"),

    check("department")
      .optional()
      .notEmpty()
      .withMessage("Department is required")
  ],
  admin.updateDoctor
);

router.delete(
  "/doctors/:id",
  checkRole(["Admin"]),
  admin.deleteDoctor
);

// ======================
// DOCTORS - VIEW ACCESS
// ======================

router.get(
  "/doctors",
  checkRole([
    "Admin",
    "Receptionist",
    "Doctor"
  ]),
  admin.getDoctors
);

router.get(
  "/doctors/:id",
  checkRole([
    "Admin",
    "Receptionist",
    "Doctor"
  ]),
  admin.getDoctorById
);

module.exports = router;