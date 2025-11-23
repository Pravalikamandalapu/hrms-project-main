import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Employees from './pages/Employees';
import Teams from './pages/Teams';
import Login from './pages/Login';
import RegisterOrg from './pages/RegisterOrg';

function App(){
  return (
    <BrowserRouter>
      <div style={{padding:12}}>
        <div className="nav" style={{marginBottom:12}}>
          <Link to="/">Home</Link> | <Link to="/employees">Employees</Link> | <Link to="/teams">Teams</Link> | <Link to="/login">Login</Link> | <Link to="/register">Register Org</Link>
        </div>
        <Routes>
          <Route path="/" element={<div><h2>Welcome to HRMS</h2></div>} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterOrg />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
