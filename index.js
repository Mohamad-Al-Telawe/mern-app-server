const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const uri =
   "mongodb+srv://abwb7293:mohamad2003@cluster0.7yjkzmr.mongodb.net/mydb?retryWrites=true&w=majority&appName=Cluster0";

// ربط مونجو
mongoose
   .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => console.log("✅ MongoDB connected"))
   .catch((err) => console.error("❌ MongoDB connection error:", err));

// سكيمات
const studentSchema = new mongoose.Schema({
   name: { type: String, required: true },
   level: String,
   class: String,
   parentContact: String,
});
const Student = mongoose.model("Student", studentSchema);

const sessionSchema = new mongoose.Schema({
   studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
   },
   pageNumber: Number,
   tajweedMark: Number,
   hifzMark: Number,
   type: { type: String, enum: ["جديد", "مراجعة"] },
   date: { type: Date, default: Date.now },
});
const Session = mongoose.model("Session", sessionSchema);

// راوترات الطلاب (CRUD)

app.get("/students", async (req, res) => {
   const students = await Student.find();
   res.json(students);
});

app.post("/students", async (req, res) => {
   try {
      const student = new Student(req.body);
      await student.save();
      res.status(201).json(student);
   } catch (e) {
      res.status(400).json({ error: e.message });
   }
});

app.put("/students/:id", async (req, res) => {
   try {
      const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
         new: true,
      });
      if (!student) return res.status(404).json({ error: "طالب غير موجود" });
      res.json(student);
   } catch (e) {
      res.status(400).json({ error: e.message });
   }
});

app.delete("/students/:id", async (req, res) => {
   try {
      const result = await Student.findByIdAndDelete(req.params.id);
      if (!result) return res.status(404).json({ error: "طالب غير موجود" });
      res.json({ message: "تم حذف الطالب" });
   } catch (e) {
      res.status(400).json({ error: e.message });
   }
});

// راوترات الجلسات

app.get("/sessions", async (req, res) => {
   const sessions = await Session.find().populate("studentId", "name");
   res.json(sessions);
});

app.post("/sessions", async (req, res) => {
   try {
      const session = new Session(req.body);
      await session.save();
      res.status(201).json(session);
   } catch (e) {
      res.status(400).json({ error: e.message });
   }
});

app.put("/sessions/:id", async (req, res) => {
   try {
      const session = await Session.findByIdAndUpdate(req.params.id, req.body, {
         new: true,
      });
      if (!session) return res.status(404).json({ error: "جلسة غير موجودة" });
      res.json(session);
   } catch (e) {
      res.status(400).json({ error: e.message });
   }
});

app.delete("/sessions/:id", async (req, res) => {
   try {
      const result = await Session.findByIdAndDelete(req.params.id);
      if (!result) return res.status(404).json({ error: "جلسة غير موجودة" });
      res.json({ message: "تم حذف الجلسة" });
   } catch (e) {
      res.status(400).json({ error: e.message });
   }
});

// بدء السيرفر
const PORT = 5000;
app.listen(PORT, () =>
   console.log(`🚀 Server running on http://localhost:${PORT}`)
);
