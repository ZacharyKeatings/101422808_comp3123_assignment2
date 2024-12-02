import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api';
import '../App.css';

const UpdateEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [employee, setEmployee] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    salary: '',
    date_of_joining: '',
    department: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`/emp/employees/${id}`);
        setEmployee(response.data);
      } catch (err) {
        console.error('Error fetching employee:', err);
        setError('Failed to fetch employee details');
      }
    };
    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/emp/employees/${id}`, employee);
      navigate('/employees');
    } catch (err) {
      console.error('Error updating employee:', err);
      setError('Failed to update employee');
    }
  };

  const handleCancel = () => {
    navigate('/employees');
  };

  return (
    <div className="add-employee-container">
      <h2>Update Employee</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name:</label>
          <input 
            type="text" 
            name="first_name" 
            value={employee.first_name} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input 
            type="text" 
            name="last_name" 
            value={employee.last_name} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email" 
            name="email" 
            value={employee.email} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Position:</label>
          <input 
            type="text" 
            name="position" 
            value={employee.position} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Salary:</label>
          <input 
            type="number" 
            name="salary" 
            value={employee.salary} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Date of Joining:</label>
          <input 
            type="date" 
            name="date_of_joining" 
            value={employee.date_of_joining.substring(0, 10)} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Department:</label>
          <input 
            type="text" 
            name="department" 
            value={employee.department} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="buttons">
          <button type="submit" className="btn btn-save">Save</button>
          <button type="button" className="btn btn-cancel" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateEmployee;
