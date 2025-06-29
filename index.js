const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// استدعاء الاتصال من ملف خارجي
const connectDB = require("./config/db");

// تحميل المتغيرات البيئية من .env
dotenv.config();

// إنشاء تطبيق إكسبريس
const app = express();

// ميدل ويرز
app.use(cors());
app.use(express.json());

// الاتصال بقاعدة البيانات
connectDB();

// راوت تجريبي
app.get("/", (req, res) => {
   res.send("🚀 API is running!");
});

// راوتات الطلاب (سننشئ الملف لاحقًا)
const studentRoutes = require("./routes/students");
app.use("/api/students", studentRoutes);

const sessionRoutes = require("./routes/sessions");
app.use("/api/sessions", sessionRoutes);

// بدء السيرفر
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log(`🚀 Server running on http://localhost:${PORT}`);
});

app.get("/health", (req, res) => {
   res.json({ status: "up", time: new Date() });
});