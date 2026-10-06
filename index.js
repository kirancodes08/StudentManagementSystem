const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const Student = require("./studentsModel");
const app = express();
app.use(cors());

app.use(express.json());

const port = 8080;

app.get("/", (req, res) => {
  res.send("Student API is running!");
});

app.post("/api/student", async (req, res) => {
  try {
    const student = await Student.create(req.body);

    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

app.get("/api/student", async (req, res) => {
  try {
    const students = await Student.find();

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.get("/api/student/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({
      message: "Invalid student ID",
    });
  }
});

app.put("/api/student/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

app.delete("/api/student/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json({
      message: "Student deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "Invalid student ID",
    });
  }
});

mongoose
  .connect(
    "mongodb+srv://kiransaud1308_db_user:Kiran008@cluster0.xkrsapi.mongodb.net/?appName=Cluster0,",
  )
  .then(() => {
    console.log("Connected to MongoDB!");

    app.listen(port, () => {
      console.log(`My Server live at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed:", error);
  });
