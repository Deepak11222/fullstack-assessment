const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema(
{
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: [true, "Employee is required"]
  },

  date: {
    type: Date,
    required: [true, "Date is required"]
  },

  status: {
    type: String,
    enum: ["Present", "Absent"],
    required: [true, "Status is required"]
  }

},
{ timestamps: true }
);

module.exports = mongoose.model("Attendance", AttendanceSchema);