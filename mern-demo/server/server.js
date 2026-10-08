require('dotenv').config();
console.log(process.env.MONGODB_URI);
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // 1. Import cors
const Student = require("./model/Student");
const app = express();

app.use(express.json());
app.use(cors()); // 2. Kích hoạt CORS
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Atlas connected successfully!"))
  .catch((err) => console.error("MongoDB connection failed:", err));

app.get("/", (req, res) => {
  res.send("Express + MongoDB Atlas is running!");
});

const PORT = process.env.PORT || 5000;


//sửa lab05
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(null, true); // Hoặc truyền origin cụ thể
    }
  },
  credentials: true
}));

app.use(express.json());



//cau36
app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//cau37
app.post("/api/students", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
//cau38
app.put("/api/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ message: "Không tìm thấy sinh viên" });
    }

    res.json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//cau39
app.delete("/api/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Không tìm thấy sinh viên" });
    }

    res.json({ message: "Xóa thành công" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});