import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import Dashboard from './Components/Dashboard';
import TaskForm from './Components/TaskForm';
import TaskDetail from './Components/TaskDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/taskForm' element={<TaskForm />} />
      <Route path="/taskDetail" element={<TaskDetail />} />
    </Routes>
  );
}

export default App;
