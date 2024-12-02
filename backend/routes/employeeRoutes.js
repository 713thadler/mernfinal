const express = require('express');
const {
  addEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  searchEmployees
} = require('../controllers/employeeController');
const router = express.Router();

// Add Employee
router.post('/', addEmployee);

// Get All Employees
router.get('/', getEmployees);

// Get Employee by ID
router.get('/:id', getEmployeeById);

// Update Employee by ID
router.put('/:id', updateEmployee);

// Delete Employee by ID
router.delete('/:id', deleteEmployee);

// Search Employees by department or position
router.get('/search', searchEmployees);

module.exports = router;
