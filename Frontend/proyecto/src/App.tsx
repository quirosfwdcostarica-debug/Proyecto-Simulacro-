import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StudentDirectory } from './pages/StudentDirectory/StudentDirectory';
import { AlumniDirectory } from './pages/AlumniDirectory/AlumniDirectory';
import { MatchingSystem } from './pages/MatchingSystem/MatchingSystem';
import { LandingPage } from './pages/LandingPage/LandingPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/students" element={<StudentDirectory />} />
        <Route path="/alumni" element={<AlumniDirectory />} />
        <Route path="/matching" element={<MatchingSystem />} />
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/students" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
