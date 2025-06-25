// import React, { useEffect } from 'react'
import { useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const { isAuthenticated, userRole, authReady } = useAuth();
  const navigate = useNavigate();

useEffect(() => {
  if (!authReady) return; // Don't check before ready

  if (!isAuthenticated || userRole !== 'admin') {
    navigate('/unauthorized');
  }
}, [authReady, isAuthenticated, userRole, navigate]);


if (!authReady) {
  return (
    <div className="flex justify-center items-center mt-20">
      <div className="loader"></div>

      <style>{`
        .loader {
          border: 6px solid #f3f3f3; /* Light gray */
          border-top: 6px solid #3498db; /* Blue */
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}



  return (
    <div>AdminDashboard</div>
  )
}

export default AdminDashboard