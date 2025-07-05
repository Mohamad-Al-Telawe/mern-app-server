const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");

// 📌 إضافة سجل حضور
router.post("/", async (req, res) => {
   try {
      const { studentId, date, timeIn } = req.body;

      if (!studentId || !date) {
         return res.status(400).json({ error: "studentId و date مطلوبان" });
      }

      const attendance = new Attendance({
         studentId,
         date,
         timeIn,
      });

      await attendance.save();
      res.status(201).json(attendance);
   } catch (err) {
      console.error("خطأ في إضافة الحضور:", err);
      res.status(500).json({ error: "فشل في إضافة الحضور" });
   }
});

// 📌 جلب الحضور لطالب معيّن
router.get("/student/:studentId", async (req, res) => {
   try {
      const { studentId } = req.params;

      const attendances = await Attendance.find({ studentId }).sort({
         date: -1,
      });

      res.json(attendances);
   } catch (err) {
      console.error("خطأ في جلب الحضور:", err);
      res.status(500).json({ error: "فشل في جلب الحضور" });
   }
});

// 📌 جلب كل الحضور ضمن فترة (اختياري start و end)
router.get("/", async (req, res) => {
   try {
      const { start, end } = req.query;
      const query = {};

      if (start || end) {
         query.date = {};
         if (start) query.date.$gte = new Date(start);
         if (end) query.date.$lte = new Date(end);
      }

      const attendances = await Attendance.find(query).populate("studentId");
      res.json(attendances);
   } catch (err) {
      console.error("خطأ في جلب الحضور:", err);
      res.status(500).json({ error: "فشل في جلب الحضور" });
   }
});

module.exports = router;
