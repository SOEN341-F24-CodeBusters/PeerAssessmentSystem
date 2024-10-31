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

    return ( 
            <div className="popup-container">
                <div className="popup-header">
                    <h2>{editName ? 'Edit Team' : 'Create Team'}</h2>
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