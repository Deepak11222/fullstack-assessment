const Attendance = require("../models/Attendance");

exports.markAttendance = async (req, res) => {

  try {

    const { employee, date, status } = req.body;

    if (!employee || !date || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const attendance = await Attendance.create({
      employee,
      date,
      status
    });

    res.status(201).json(attendance);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};



exports.getAttendance = async (req, res) => {

  try {

    const records = await Attendance
      .find()
      .populate("employee", "fullName employeeId");

    res.json(records);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};