import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api';
import '../App.css';

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`/emp/employees/${id}`);
        setEmployee(response.data);
      } catch (err) {
        console.error('Error fetching employee details:', err);
        setError('Failed to fetch employee details');
      }
    };

    fetchEmployee();
  }, [id]);

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!employee) {
    return <p>Loading...</p>;
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="employee-details-container">
      <h2>View Employee Details</h2>
      <div className="employee-info">
        <p><strong>First Name:</strong> {employee.first_name}</p>
        <p><strong>Last Name:</strong> {employee.last_name}</p>
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Position:</strong> {employee.position}</p>
        <p><strong>Salary:</strong> ${employee.salary.toLocaleString()}</p>
        <p><strong>Date of Joining:</strong> {formatDate(employee.date_of_joining)}</p>
        <p><strong>Department:</strong> {employee.department}</p>
        <p><strong>Created At:</strong> {formatDate(employee.created_at)}</p>
        <p><strong>Updated At:</strong> {formatDate(employee.updated_at)}</p>
      </div>
      <button className="btn btn-back" onClick={() => navigate('/employees')}>
        Back to List
      </button>
    </div>
  );
};

export default EmployeeDetails;
