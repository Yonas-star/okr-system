import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MissionVision from './pages/Organization/MissionVision';
import DirectorsReport from './pages/Organization/DirectorsReport';
import DirectorPage from './pages/Directorates/DirectorPage';
import DivisionHead from './pages/Divisions/DivisionHead';
import EmployeePage from './pages/Employee/EmployeePage';
import Layout from './components/Layout';

const AppRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Routes>
      <Route 
        path="/login" 
        element={
          isAuthenticated ? 
            <Navigate to="/dashboard" replace /> : 
            <Login setIsAuthenticated={setIsAuthenticated} />
        } 
      />
      <Route 
        path="/" 
        element={
          isAuthenticated ? 
            <Layout setIsAuthenticated={setIsAuthenticated} /> : 
            <Navigate to="/login" replace />
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        
        {/* Organization Routes */}
        <Route path="organization/mission" element={<MissionVision />} />
        <Route path="organization/report" element={<DirectorsReport />} />
        
        {/* Directorate Routes */}
        <Route path="directorates/director" element={<DirectorPage />} />
        
        {/* Division Routes */}
        <Route path="divisions/head" element={<DivisionHead />} />
        
        {/* Employee Routes */}
        <Route path="employee" element={<EmployeePage />} />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;