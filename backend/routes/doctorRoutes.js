const express = require("express");
const Doctor = require("../models/Doctor");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| GET ALL DOCTORS
|--------------------------------------------------------------------------
*/
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find().populate(
      "userId",
      "name email role"
    );

    res.status(200).json({
      success: true,
      count: doctors.length,
      data: doctors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/*
|--------------------------------------------------------------------------
| GET DOCTOR BY ID
|--------------------------------------------------------------------------
*/
router.get("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate(
      "userId",
      "name email role"
    );

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      data: doctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/*
|--------------------------------------------------------------------------
| CREATE DOCTOR
|--------------------------------------------------------------------------
*/
router.post("/", async (req, res) => {
  try {
    const {
      userId,
      specialization,
      experience,
      fees,
      availability,
    } = req.body;

    if (
      !userId ||
      !specialization ||
      experience === undefined ||
      fees === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          "userId, specialization, experience and fees are required",
      });
    }

    const doctor = await Doctor.create({
      userId,
      specialization,
      experience,
      fees,
      availability,
    });

    const populatedDoctor = await Doctor.findById(
      doctor._id
    ).populate("userId", "name email role");

    res.status(201).json({
      success: true,
      message: "Doctor created successfully",
      data: populatedDoctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/*
|--------------------------------------------------------------------------
| UPDATE DOCTOR
|--------------------------------------------------------------------------
*/
router.put("/:id", async (req, res) => {
  try {
    const updatedDoctor =
      await Doctor.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      ).populate("userId", "name email role");

    if (!updatedDoctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Doctor updated successfully",
      data: updatedDoctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/*
|--------------------------------------------------------------------------
| DELETE DOCTOR
|--------------------------------------------------------------------------
*/
router.delete("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(
      req.params.id
    );

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Doctor deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;