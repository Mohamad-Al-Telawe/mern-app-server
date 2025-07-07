const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
   studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
   },
   date: {
      type: Date,
      required: true,
   },
   hifz: {
      type: String,
      enum: ["حافظ","غير حافظ","لا يوجد تسميع"],
      default: "غير حافظ",
   },
   timeIn: {
      type: String, // hh:mm مثلاً "08:35" - فقط للمكثفة
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
});

module.exports = mongoose.model("Attendance", attendanceSchema);
