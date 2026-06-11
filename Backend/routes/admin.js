const express = require("express");

const router = express.Router();
const admin = require("../controllers/admin");

// User Routes
router.post("/users", admin.createUser);
router.get("/users", admin.getUsers);

// Department Routes
router.post("/departments", admin.createDepartment);
router.get("/departments", admin.getDepartments);

// Doctor Routes
router.post("/doctors", admin.createDoctor);
router.get("/doctors", admin.getDoctors);

module.exports = router;