const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
   {
      studentId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Student",
         required: true,
      },
      teacherId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Teacher", // لاحقاً ممكن تنشئ موديل Teacher
      },
      pageNumber: { type: Number, required: true },
      tajweedMark: { type: Number, min: 0, max: 10 },
      hifzMark: { type: Number, min: 0, max: 10 },
      type: { type: String, enum: ["جديد", "مراجعة"], required: true },
      date: { type: Date, default: Date.now },
   },
   { timestamps: true }
);

module.exports = mongoose.model("Session", sessionSchema);
