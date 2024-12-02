import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api';
import '../App.css';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('/emp/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      setError('Failed to fetch employees');
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('/emp/employees/search', {
        params: { department, position }
      });
      setEmployees(response.data);
    } catch (error) {
      console.error('Error searching employees:', error);
      setError('Failed to search employees');
    }
  };

  const deleteEmployee = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await axios.delete(`/emp/employees?eid=${id}`);
        fetchEmployees(); 
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  return (
    <div className="container">
      <h2>Employees List</h2>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="search-form">
        <div className="form-group">
          <label>Department:</label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="Search by department"
          />
        </div>
        <div className="form-group">
          <label>Position:</label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="Search by position"
          />
        </div>
        <button type="submit" className="btn btn-primary">Search</button>
        <button type="button" className="btn btn-cancel" onClick={fetchEmployees}>Clear</button>
      </form>

      {error && <p className="error">{error}</p>}

      <div className="add-button-container">
        <Link to="/employees/add" className="btn btn-primary">Add Employee</Link>
      </div>

      {/* Employees Table */}
      <table className="table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.first_name}</td>
              <td>{employee.last_name}</td>
              <td>{employee.email}</td>
              <td>{employee.position}</td>
              <td>{employee.department}</td>
              <td>
                <button 
                  className="btn btn-update" 
                  onClick={() => navigate(`/employees/edit/${employee._id}`)}
                >
                  Update
                </button>
                <button 
                  className="btn btn-delete" 
                  onClick={() => deleteEmployee(employee._id)}
                >
                  Delete
                </button>
                <button 
                  className="btn btn-view" 
                  onClick={() => navigate(`/employees/${employee._id}`)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employees;
