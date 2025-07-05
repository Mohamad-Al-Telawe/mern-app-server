const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// ✅ GET: جميع الطلاب
router.get("/", async (req, res) => {
   try {
      const students = await Student.find();
      res.json(students);
   } catch (err) {
      res.status(500).json({
         error: "حدث خطأ أثناء جلب الطلاب",
         details: err.message,
      });
   }
});

// ✅ GET: معلومات طالب واحد حسب ID
router.get("/:id", async (req, res) => {
   try {
      const student = await Student.findById(req.params.id);
      if (!student) {
         return res.status(404).json({ error: "الطالب غير موجود" });
      }
      res.json(student);
   } catch (err) {
      res.status(500).json({
         error: "حدث خطأ أثناء جلب الطالب",
         details: err.message,
      });
   }
});

// ✅ POST: إضافة طالب جديد (محدثة)
router.post("/", async (req, res) => {
   console.log("Received body:", req.body);
   try {
      const {
         name,
         level,
         group,
         grade,
         parentContact,
         birthDay,
         photoUrl,
         generalStatus,
         currentAttendanceStatus,
         disciplinedStatus,
         tajweedDegre,
         hasMemorized,
         hasHomework,
         notes,
      } = req.body;

      const student = new Student({
         name,
         level,
         group,
         grade,
         parentContact,
         birthDay,
         photoUrl,
         generalStatus,
         currentAttendanceStatus,
         disciplinedStatus,
         tajweedDegre,
         hasMemorized,
         hasHomework,
         notes,
      });

      await student.save();
      res.status(201).json(student);
   } catch (err) {
      console.error("Error adding student:", err);
      res.status(400).json({
         error: "خطأ أثناء إضافة الطالب",
         details: err.message,
      });
   }
});

// تحديث بيانات طالب موجود
router.patch("/:id", async (req, res) => {
   try {
      const updatedStudent = await Student.findByIdAndUpdate(
         req.params.id,
         req.body,
         { new: true, runValidators: true }
      );
      if (!updatedStudent) {
         return res.status(404).json({ error: "الطالب غير موجود" });
      }
      res.json(updatedStudent);
   } catch (err) {
      console.error("خطأ في تحديث الطالب:", err);
      res.status(400).json({
         error: "فشل في تحديث الطالب",
         details: err.message,
      });
   }
});

module.exports = router;
