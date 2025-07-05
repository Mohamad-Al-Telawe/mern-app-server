const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
   name: { type: String, required: true },
   level: { type: String, enum: ["مكثفة", "A", "B"], default: "B" },
   group: { type: String },
   grade: { type: Number },
   parentContact: { type: Number },
   birthDay: { type: Date, default: Date.now },
   photoUrl: { type: String },
   generalStatus: {
      type: String,
      enum: ["ممتاز", "جيد", "غير جيد"],
      default: "جيد",
   },
   currentAttendanceStatus: {
      type: String,
      enum: ["يحضر", "لا يحضر"],
   },
   disciplinedStatus: {
      type: String,
      enum: ["منضبط", "عادي", "غير منضبط"],
      default: "عادي",
   },
   tajweedDegre: { type: Number, default: 0 },
   hasMemorized: { type: String },
   hasHomework: { type: String },
   notes: { type: String },
   createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Student", studentSchema);
