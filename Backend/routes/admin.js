const express = require("express");

const router = express.Router();
const admin = require("../controller/admin");
const { checkAuth, checkRole } = require("../middleware/admin-middleware");


router.use(checkAuth);

// USERS - Admin Only

router.post("/users", checkRole(["Admin"]), admin.createUser);
router.get("/users", checkRole(["Admin"]), admin.getUsers);
router.get("/users/:id", checkRole(["Admin"]), admin.getUserById);
router.put("/users/:id", checkRole(["Admin"]), admin.updateUser);
router.delete("/users/:id", checkRole(["Admin"]), admin.deleteUser);

// DEPARTMENTS - Admin Only

router.post("/departments",checkRole(["Admin"]), admin.createDepartment);
router.get("/departments",checkRole(["Admin"]), admin.getDepartments);
router.get("/departments/:id",checkRole(["Admin"]), admin.getDepartmentById);
router.put("/departments/:id",checkRole(["Admin"]), admin.updateDepartment);
router.delete("/departments/:id",checkRole(["Admin"]), admin.deleteDepartment);

// DOCTORS - Admin Only (Create/Update/Delete)

router.post("/doctors",checkRole(["Admin"]), admin.createDoctor);
router.put("/doctors/:id",  checkRole(["Admin"]), admin.updateDoctor);
router.delete("/doctors/:id", checkRole(["Admin"]), admin.deleteDoctor);

// DOCTORS - View (Admin, Receptionist, Doctor)

router.get("/doctors",checkRole(["Admin", "Receptionist", "Doctor"]), admin.getDoctors);
router.get("/doctors/:id", checkRole(["Admin", "Receptionist", "Doctor"]), admin.getDoctorById);

module.exports = router;