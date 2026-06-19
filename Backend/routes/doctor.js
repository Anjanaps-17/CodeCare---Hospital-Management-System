const express = require("express");
const router = express.Router();

const doctorController = require("../controllers/doctor");

router.get("/", doctorController.getAllDoctors);
router.post("/", doctorController.createDoctor);

module.exports = router;