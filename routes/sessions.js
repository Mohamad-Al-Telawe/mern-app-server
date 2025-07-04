const express = require("express");
const router = express.Router();
const Session = require("../models/Session");

// جلب كل جلسات طالب معين، مرتبة حسب التاريخ الأحدث أولاً
router.get("/student/:studentId", async (req, res) => {
   try {
      const sessions = await Session.find({
         studentId: req.params.studentId,
      }).sort({ date: -1 });
      res.json(sessions);
   } catch (err) {
      res.status(500).json({ error: "حدث خطأ أثناء جلب الجلسات" });
   }
});

// جلب كل الجلسات
router.get("/", async (req, res) => {
   try {
      const sessions = await Session.find().populate("studentId");
      res.json(sessions);
   } catch (err) {
      res.status(500).json({
         error: "خطأ أثناء جلب الجلسات",
         details: err.message,
      });
   }
});

// إضافة جلسة جديدة مع تحقق من الحقول المطلوبة
router.post("/", async (req, res) => {
   const {
      studentId,
      teacherId,
      pageNumber,
      tajweedMark,
      hifzMark,
      type,
      date,
   } = req.body;

   if (!studentId || !pageNumber || !type) {
      return res
         .status(400)
         .json({ error: "الحقول studentId، pageNumber، و type مطلوبة" });
   }

   try {
      const session = new Session({
         studentId,
         teacherId,
         pageNumber,
         tajweedMark,
         hifzMark,
         type,
         date,
      });
      await session.save();
      res.status(201).json(session);
   } catch (err) {
      console.error("Error adding session:", err);
      res.status(500).json({
         error: "خطأ أثناء إضافة الجلسة",
         details: err.message,
      });
   }
});

// إدخال عدة جلسات دفعة واحدة
router.post("/bulk", async (req, res) => {
   const { sessions } = req.body;

   if (!Array.isArray(sessions) || sessions.length === 0) {
      return res.status(400).json({ error: "يجب إرسال مصفوفة جلسات صالحة" });
   }

   try {
      const inserted = await Session.insertMany(sessions);
      res.status(201).json({
         message: `${inserted.length} جلسة تم حفظها بنجاح`,
         data: inserted,
      });
   } catch (err) {
      console.error("خطأ في حفظ الجلسات:", err);
      res.status(500).json({
         error: "حدث خطأ أثناء حفظ الجلسات",
         details: err.message,
      });
   }
});

// تعديل جلسة حسب ID
router.patch("/:id", async (req, res) => {
   try {
      const sessionId = req.params.id;
      const updateData = req.body;

      const updatedSession = await Session.findByIdAndUpdate(
         sessionId,
         updateData,
         { new: true }
      );

      if (!updatedSession) {
         return res.status(404).json({ error: "الجلسة غير موجودة" });
      }

      res.json(updatedSession);
   } catch (err) {
      console.error("Error updating session:", err);
      res.status(500).json({
         error: "خطأ أثناء تعديل الجلسة",
         details: err.message,
      });
   }
});

// حذف جلسة حسب ID
router.delete("/:id", async (req, res) => {
   try {
      const sessionId = req.params.id;

      const deletedSession = await Session.findByIdAndDelete(sessionId);

      if (!deletedSession) {
         return res.status(404).json({ error: "الجلسة غير موجودة" });
      }

      res.json({ message: "تم حذف الجلسة بنجاح" });
   } catch (err) {
      console.error("Error deleting session:", err);
      res.status(500).json({
         error: "خطأ أثناء حذف الجلسة",
         details: err.message,
      });
   }
});

module.exports = router;
