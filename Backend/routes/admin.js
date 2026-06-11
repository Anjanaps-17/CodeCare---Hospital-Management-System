const express = require("express");

const router = express.Router();
const admin = require("../controller/admin");

// USERS

router.post("/users", admin.createUser);
router.get("/users", admin.getUsers);
router.get("/users/:id", admin.getUserById);
router.put("/users/:id", admin.updateUser);
router.delete("/users/:id", admin.deleteUser);

// DEPARTMENTS

router.post("/departments", admin.createDepartment);
router.get("/departments", admin.getDepartments);
router.get("/departments/:id", admin.getDepartmentById);
router.put("/departments/:id", admin.updateDepartment);
router.delete("/departments/:id", admin.deleteDepartment);

// DOCTORS

router.post("/doctors", admin.createDoctor);
router.get("/doctors", admin.getDoctors);
router.get("/doctors/:id", admin.getDoctorById);
router.put("/doctors/:id", admin.updateDoctor);
router.delete("/doctors/:id", admin.deleteDoctor);


module.exports = router;