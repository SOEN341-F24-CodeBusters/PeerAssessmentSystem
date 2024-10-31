import React, { useState } from 'react';
import CreateTeamPopup from './CreateTeamPopup';
import './TeamOverview.css';

const TeamOverview = () => {
    const [teams, setTeams] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [editIndex, setEditIndex] = useState(null); // New state for editing

    const handleCreateTeam = (teamName) => {
        if (editIndex !== null) {
            // Edit existing team
            const updatedTeams = [...teams];
            updatedTeams[editIndex].name = teamName;
            setTeams(updatedTeams);
            setEditIndex(null);
        } else {
            // Create a new team
            setTeams([...teams, { name: teamName, members: 5 }]); // Mock data with 5 members
        }
    };

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    const handleTeamEdit = (index) => {
        setEditIndex(index);
        setIsPopupOpen(true);
    };

    return (
        <div className="team-overview-container">
            <button className="create-team-btn" onClick={handleOpenPopup}>
                {editIndex !== null ? 'Edit Team' : 'Create Teams +'}
            </button>
            <div className="teams-container">
                {teams.map((team, index) => (
                    <div key={index} id={index} className="team-card">
                        <h3>{team.name}</h3>
                        <p>{team.members} Members</p>
                        <button onClick={() => handleTeamEdit(index)}>Edit</button>
                    </div>
                ))}
            </div>
            {isPopupOpen && (
                <CreateTeamPopup
                    onClose={handleClosePopup}
                    onCreateTeam={handleCreateTeam}
                />
            )}
        </div>
    );
};

export default TeamOverview;
