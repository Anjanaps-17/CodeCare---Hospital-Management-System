const express = require("express");
const { check } = require("express-validator");

const router = express.Router();
const admin = require("../controller/admin");
const { checkAuth, checkRole } = require("../middleware/admin-middleware");

router.use(checkAuth);


const {
  getDashboardData,
} = require("../controller/admin");

router.get(
  "/dashboard",
  getDashboardData
);

// USERS - Admin Only

router.post(
  "/users",
  checkRole(["Admin"]),
  [
    check("username")
      .notEmpty()
      .withMessage("username is required"),

    check("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 6 characters")
  ],
  admin.createUser
);

router.get("/users", checkRole(["Admin"]), admin.getUsers);

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
      .withMessage("username cannot be empty"),

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

// DEPARTMENTS - Admin Only

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

// DOCTORS - Admin Only

router.post(
  "/doctors",
  checkRole(["Admin"]),
  [
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

// DOCTORS - View

router.get(
  "/doctors",
  checkRole(["Admin", "Receptionist", "Doctor"]),
  admin.getDoctors
);

router.get(
  "/doctors/:id",
  checkRole(["Admin", "Receptionist", "Doctor"]),
  admin.getDoctorById
);

module.exports = router;