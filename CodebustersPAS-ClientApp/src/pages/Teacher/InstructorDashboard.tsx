import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './InstructorDashboard.css';

const InstructorDashboard: React.FC = () => {
  const { groupName } = useParams<{ groupName: string }>();

  return (
    <div className="dashboard-container">
      <div className="header">
        <h1>Details for Course: {groupName} </h1>
      </div>
      <div className="links-container">
        <a href="/summary" className="dashboard-link">Summary of results</a>
        <a href="/detailed-summary" className="dashboard-link">Detailed Summary of results</a>
        <a href="/charts" className="dashboard-link">Charts</a>
        <a href="/Teacher/TeamOverview" className="dashboard-link">Return to main menu</a>
        {/* Add a link to the charts */}
        <Link to="/Teacher/TeamEvaluation" className="dashboard-link">View Team Evaluation Charts</Link>
      </div>
    </div>
  );
};

export default InstructorDashboard;
