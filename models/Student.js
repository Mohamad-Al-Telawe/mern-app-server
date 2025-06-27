const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, enum: ["مكثفة", "A", "B"], required: true },
  class: { type: String }, // مثلاً "صف 5"
  parentContact: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Student", studentSchema);
