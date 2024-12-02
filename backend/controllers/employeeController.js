const Employee = require('../models/Employee');

// Add Employee
exports.addEmployee = async (req, res) => {
  try {
    const { firstName, lastName, email, department, position } = req.body;
    const employee = new Employee({ firstName, lastName, email, department, position });
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Employees
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Employee by ID
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Employee
exports.updateEmployee = async (req, res) => {
  try {
    const { firstName, lastName, email, department, position } = req.body;
    const employee = await Employee.findByIdAndUpdate(req.params.id, {
      firstName, lastName, email, department, position
    }, { new: true });

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Employee
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search Employees by department or position
exports.searchEmployees = async (req, res) => {
  try {
    const { department, position } = req.query;
    const query = {};

    if (department) {
      query.department = department;
    }
    if (position) {
      query.position = position;
    }

    const employees = await Employee.find(query);
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
