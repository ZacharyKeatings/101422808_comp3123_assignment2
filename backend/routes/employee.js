const express = require('express');
const {
  getAllEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  searchEmployees
} = require('../controllers/employeeController');
const router = express.Router();

router.get('/employees/search', searchEmployees);
router.get('/employees', getAllEmployees);
router.post('/employees', createEmployee);
router.get('/employees/:eid', getEmployeeById);
router.put('/employees/:eid', updateEmployee);
router.delete('/employees', deleteEmployee);

module.exports = router;
