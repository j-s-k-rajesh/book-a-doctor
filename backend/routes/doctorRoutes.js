const express = require("express");
const Doctor = require("../models/Doctor");

const router = express.Router();


// Get all doctors
router.get("/", async (req, res) => {
  try {

    const doctors = await Doctor.find();

    res.status(200).json(doctors);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});


// Get doctor by ID
router.get("/:id", async (req, res) => {
  try {

    const doctor =
      await Doctor.findById(
        req.params.id
      );

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found"
      });
    }

    res.status(200).json(doctor);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});


// Create doctor
router.post("/", async (req, res) => {
  try {

    const doctor =
      await Doctor.create(req.body);

    res.status(201).json(doctor);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});


// Update doctor
router.put("/:id", async (req, res) => {
  try {

    const updatedDoctor =
      await Doctor.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.status(200).json(
      updatedDoctor
    );

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});


// Delete doctor
router.delete("/:id", async (req, res) => {
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

module.exports = router;