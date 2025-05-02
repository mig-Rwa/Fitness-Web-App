import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import './App.css';
import { Box, Button, Divider } from '@mui/material';

// Protected route component
const PrivateRoute = ({ children }: React.PropsWithChildren) => {
  const token = localStorage.getItem('token');
  const location = useLocation();
  if (!token) {
    return <Login />;
  }
  return <>{children}</>;
};

function App() {
  const location = window.location.pathname;
  return (
    <Router>
      {location !== '/dashboard' && (
        <Box sx={{ position: 'fixed', top: 24, left: 24, zIndex: 1000, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button component={Link} to="/login" variant="text" sx={{ color: '#6366f1', fontWeight: 600, fontSize: 18, textTransform: 'none', '&:hover': { color: '#4338ca', bgcolor: 'transparent' } }}>
            Login
          </Button>
          <Divider orientation="vertical" flexItem sx={{ borderColor: '#a5b4fc', mx: 0.5 }} />
          <Button component={Link} to="/register" variant="text" sx={{ color: '#6366f1', fontWeight: 600, fontSize: 18, textTransform: 'none', '&:hover': { color: '#4338ca', bgcolor: 'transparent' } }}>
            Register
          </Button>
        </Box>
      )}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
