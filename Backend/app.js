const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const dns = require('dns')

const app = express();


const adminRoutes = require("./routes/admin");
const doctorRoutes = require("./routes/doctor");
const receptionistRoutes = require("./routes/receptionist");
const labtechRoutes = require("./routes/labtech");


app.use(express.json());


app.use("/api/admin", adminRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/receptionist", receptionistRoutes);
app.use("/api/labtech", labtechRoutes);

app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }

    res.status(error.code || 500);
    res.json({
        message: error.message || "An unknown error occurred!"
    });
});


dns.setServers([
  '8.8.8.8',
  '8.8.4.4'
]);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(5000, () => {
            console.log("Server running on port 5000");
        });
    })
    .catch(err => {
        console.error(err);
    });