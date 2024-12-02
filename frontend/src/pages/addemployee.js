import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api';
import '../App.css';

const AddEmployee = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email) {
      setError('All fields are required');
      return;
    }

    try {
      await axios.post('/emp/employees', {
        first_name: firstName,
        last_name: lastName,
        email: email,
      });
      navigate('/employees'); 
    } catch (error) {
      console.error('Error adding employee:', error);
      setError('Failed to add employee. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/employees');
  };

  return (
    <div className="add-employee-container">
      <h2>Add Employee</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email ID:</label>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

export default AddEmployee;
