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

/* ✅ Add Employee */
app.post("/employees", async (req, res) => {
  try {

    const newEmployee = new Employee({
      name: req.body.name,
      email: req.body.email,
      post: req.body.post,
      city: req.body.city,
      date_joined: req.body.date_joined,
      salary: req.body.salary
    });

    const savedEmployee = await newEmployee.save();

    res.json({
      success: true,
      data: savedEmployee
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

app.delete("/employees/:id", async (req, res) => {

  try {

    await Employee.findByIdAndDelete(req.params.id);

    res.json({
      success: true
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});

app.put("/employees/:id", async (req, res) => {

  try {

    const updated = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      data: updated
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});

/* ✅ Start server */
app.listen(5000, () => {
  console.log("Server running on port 5000");
});