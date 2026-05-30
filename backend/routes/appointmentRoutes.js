const express = require("express");
const Appointment = require("../models/Appointment");

const router = express.Router();


// Create Appointment
router.post("/", async (req, res) => {
  try {

    const appointment = await Appointment.create(
      req.body
    );

    res.status(201).json(appointment);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});


// Get All Appointments
router.get("/", async (req, res) => {
  try {

    const appointments =
      await Appointment.find();

    res.status(200).json(appointments);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});


// Get Single Appointment
router.get("/:id", async (req, res) => {
  try {

    const appointment =
      await Appointment.findById(
        req.params.id
      );

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found"
      });
    }

    res.status(200).json(appointment);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});


// Update Appointment
router.put("/:id", async (req, res) => {
  try {

    const updatedAppointment =
      await Appointment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.status(200).json(
      updatedAppointment
    );

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});


// Delete Appointment
router.delete("/:id", async (req, res) => {
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
});

module.exports = router;