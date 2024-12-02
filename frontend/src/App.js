import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import Employees from './pages/employees';
import AddEmployee from './pages/addemployee';
import EmployeeDetails from './pages/employeedetails';
import UpdateEmployee from './pages/updateemployee';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protect the following routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/employees" element={<Employees />} />
            <Route path="/employees/add" element={<AddEmployee />} />
            <Route path="/employees/:id" element={<EmployeeDetails />} />
            <Route path="/employees/edit/:id" element={<UpdateEmployee />} />
          </Route>
        </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
