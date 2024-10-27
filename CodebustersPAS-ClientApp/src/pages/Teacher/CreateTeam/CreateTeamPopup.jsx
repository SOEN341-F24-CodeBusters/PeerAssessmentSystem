import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


const CreateTeamPopup = ({ onClose, onCreateTeam, editName }) => {
    const [teamName, setTeamName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (editName) {
            setTeamName(editName);
        }
    }, [editName]);

    const handleCreateTeam = () => {
        if (teamName.trim()) {
            onCreateTeam(teamName);
            setTeamName('');
            onClose();
        }
    };

    const handleLogout = async () => {
        const apiUrl = 'https://localhost:7010/api/Authentification/LogOut';
    
        try {
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (response.ok) {
            const contentType = response.headers.get('Content-Type');
            let responseData;
            if (contentType && contentType.includes('application/json')) {
            responseData = await response.json(); 
            console.log('Logout successful:', responseData)
          } else {
            console.log('Logout successful with no response data.');
          }
            navigate('/');
          } else {
            console.error('Logout failed with status:', response.status);
          }
        } catch (error) {
          console.error('An error occurred during logout:', error);
        }
      };

    return ( 
            <div className="popup-container">
                <div className="popup-header">
                    <h2>{editName ? 'Edit Team' : 'Create Team'}</h2>
                <button
                    onClick={handleLogout} className="logout-button"
                    onMouseEnter={(e) => (e.target.classList.add('hover'))}
                    onMouseLeave={(e) => (e.target.classList.remove('hover'))}
                >
                    Logout
                </button>
                </div>
                <div className="popup-content"></div>
                    <input
                        type="text"
                        className="team-input"
                        placeholder="Enter Team Name"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                    />
                <div className="popup-buttons">
                    <button className="popup-btn green" onClick={handleCreateTeam}>
                        {editName ? 'Save Changes' : 'Create Team'}
                    </button>
                    <button className="popup-btn gray" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
    );
};

export default CreateTeamPopup;