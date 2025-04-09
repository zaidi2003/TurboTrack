import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Dashboard, LockedPage } from '../pages';


const DashboardRoutes = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} /> {/* Default route for dashboard */}
    <Route path="locked" element={<LockedPage />} />
  </Routes>
);

export default DashboardRoutes;
