import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import Dashboard from './Components/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  );
}

export default App;
