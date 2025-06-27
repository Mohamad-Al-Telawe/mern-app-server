const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// ✅ GET: جميع الطلاب
router.get("/", async (req, res) => {
   try {
      const students = await Student.find();
      res.json(students);
   } catch (err) {
      res.status(500).json({ error: "حدث خطأ أثناء جلب الطلاب" });
   }
});

// ✅ POST: إضافة طالب جديد
router.post("/", async (req, res) => {
   try {
      const { name, level, class: className, parentContact } = req.body;
      const student = new Student({
         name,
         level,
         class: className,
         parentContact,
      });
      await student.save();
      res.status(201).json(student);
   } catch (err) {
      console.error("Error adding student:", err); // هنا طباعة الخطأ في الكونسول
      res.status(400).json({
         error: "خطأ أثناء إضافة الطالب",
         details: err.message,
      });
   }
});

module.exports = router;
