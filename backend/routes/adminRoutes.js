const express = require("express");

const User = require("../models/User");
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");

const router = express.Router();


// Get all users
router.get("/users", async (req, res) => {
  try {

    const users = await User.find();

    res.status(200).json(users);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});


// Get all doctors
router.get("/doctors", async (req, res) => {
  try {

    const doctors = await Doctor.find();

    res.status(200).json(doctors);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});


// Get all appointments
router.get("/appointments", async (req, res) => {
  try {

    const appointments =
      await Appointment.find();

    res.status(200).json(
      appointments
    );

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});


// Delete user
router.delete("/users/:id", async (req, res) => {
  try {

    await User.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message:
        "User deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});


// Delete doctor
router.delete("/doctors/:id", async (req, res) => {
  try {

    await Doctor.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message:
        "Doctor deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});


// Delete appointment
router.delete(
  "/appointments/:id",
  async (req, res) => {
    try {

      await Appointment.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        message:
          "Appointment deleted successfully"
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }
  }
);

module.exports = router;