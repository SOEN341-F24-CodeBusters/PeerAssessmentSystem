import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './InstructorDashboard.css';

const InstructorDashboard: React.FC = () => {
  const { groupName } = useParams<{ groupName: string }>();

  return (
    <div className="dashboard-container">
      <div className="header">
        <h1>Details for Course: {groupName}</h1>
      </div>
      <div className="links-container">
        {/* Use Link components for navigation */}
        <Link to="/summary" className="dashboard-link">Summary of results</Link>
        <Link to="/detailed-summary" className="dashboard-link">Detailed Summary of results</Link>
        <Link to="/Teacher/Dashboard/Charts" className="dashboard-link">Charts</Link>
        <Link to="/Teacher/TeamOverview" className="dashboard-link">Return to main menu</Link>
      </div>
    </div>
  );
};

export default InstructorDashboard;
