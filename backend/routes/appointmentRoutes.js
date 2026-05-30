const express = require("express");
const Appointment = require("../models/Appointment");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| GET ALL APPOINTMENTS
|--------------------------------------------------------------------------
*/
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patientId", "name email")
      .populate({
        path: "doctorId",
        populate: {
          path: "userId",
          select: "name email role"
        }
      });

    const formattedAppointments = appointments.map(
      (appointment) => ({
        _id: appointment._id,
        patientName:
          appointment.patientId?.name,
        patientEmail:
          appointment.patientId?.email,

        doctorName:
          appointment.doctorId?.userId?.name,
        doctorEmail:
          appointment.doctorId?.userId?.email,

        specialization:
          appointment.doctorId?.specialization,

        experience:
          appointment.doctorId?.experience,

        fees:
          appointment.doctorId?.fees,

        appointmentDate:
          appointment.appointmentDate,

        appointmentTime:
          appointment.appointmentTime,

        status:
          appointment.status,
      })
    );

    res.status(200).json({
      success: true,
      count: formattedAppointments.length,
      data: formattedAppointments,
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
| GET APPOINTMENT BY ID
|--------------------------------------------------------------------------
*/
router.get("/:id", async (req, res) => {
  try {

    const appointment =
      await Appointment.findById(req.params.id)
        .populate("patientId", "name email")
        .populate({
          path: "doctorId",
          populate: {
            path: "userId",
            select: "name email role"
          }
        });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      data: appointment,
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
| CREATE APPOINTMENT
|--------------------------------------------------------------------------
*/
router.post("/", async (req, res) => {
  try {

    const {
      patientId,
      doctorId,
      appointmentDate,
      appointmentTime,
    } = req.body;

    if (
      !patientId ||
      !doctorId ||
      !appointmentDate ||
      !appointmentTime
    ) {
      return res.status(400).json({
        success: false,
        message:
          "patientId, doctorId, appointmentDate and appointmentTime are required",
      });
    }

    const appointment =
      await Appointment.create({
        patientId,
        doctorId,
        appointmentDate,
        appointmentTime,
      });

    const populatedAppointment =
      await Appointment.findById(
        appointment._id
      )
        .populate("patientId", "name email")
        .populate({
          path: "doctorId",
          populate: {
            path: "userId",
            select: "name email role"
          }
        });

    res.status(201).json({
      success: true,
      message:
        "Appointment booked successfully",
      data: populatedAppointment,
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
| UPDATE APPOINTMENT
|--------------------------------------------------------------------------
*/
router.put("/:id", async (req, res) => {
  try {

    const updatedAppointment =
      await Appointment.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      )
        .populate("patientId", "name email")
        .populate({
          path: "doctorId",
          populate: {
            path: "userId",
            select: "name email role"
          }
        });

    if (!updatedAppointment) {
      return res.status(404).json({
        success: false,
        message:
          "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Appointment updated successfully",
      data: updatedAppointment,
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
| DELETE APPOINTMENT
|--------------------------------------------------------------------------
*/
router.delete("/:id", async (req, res) => {
  try {

    const appointment =
      await Appointment.findByIdAndDelete(
        req.params.id
      );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message:
          "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Appointment deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});

module.exports = router;