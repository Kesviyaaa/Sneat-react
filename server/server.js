const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

/* ✅ MongoDB connection */
mongoose
  .connect("mongodb+srv://anniekesviyaa_db:anniekesviya10A@react-form-cluster.bkeubt5.mongodb.net/testdb?appName=react-form-cluster")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

/* ✅ Schema */
const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  post: String,
  city: String,
  date_joined: String,
  salary: String,
});

const Employee = mongoose.model("Employee", employeeSchema, "users");

/* ✅ API route */
app.get("/employees", async (req, res) => {
  const employees = await Employee.find();

  res.json({
    data: employees,
  });
});

/* ✅ Start server */
app.listen(5000, () => {
  console.log("Server running on port 5000");
});