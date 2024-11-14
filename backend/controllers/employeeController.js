const Employee = require('../models/employee');

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json({ message: "Employee created successfully.", employee_id: employee._id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.eid);
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true });
    res.status(200).json({ message: "Employee details updated successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.query.eid);
    res.status(204).json({ message: "Employee deleted successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.searchEmployees = async (req, res) => {
  const { department, position } = req.query;
  const query = {};

  if (department) query.department = department;
  if (position) query.position = position;

  try {
    const employees = await Employee.find(query);
    res.status(200).json(employees);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
