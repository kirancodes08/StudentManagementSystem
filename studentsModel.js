const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
      min: 5,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    enrolled: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);
const studentsModel = mongoose.model("studentsModel", studentSchema);
module.exports = studentsModel;
