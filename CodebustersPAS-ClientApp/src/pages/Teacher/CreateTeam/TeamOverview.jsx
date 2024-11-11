import React, { useState } from 'react';
import CSVUpload from './CSVUpload'; // Import the new component
import CreateTeamPopup from './CreateTeamPopup';
import './TeamOverview.css';

const TeamOverview = () => {
    const [teams, setTeams] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [editIndex, setEditIndex] = useState(null); // New state for editing
    const [groupName, setGroupName] = useState(""); // State for group name
    const [selectedGroupId, setSelectedGroupId] = useState(null); // State for selected group ID
    const [selectedTeamId, setSelectedTeamId] = useState(null); // State for selected team

    const handleTeamsUpload = (data) => {
        // Process uploaded teams from CSV
        const teamsFromCsv = data.map((row) => ({
            name: row['Team Name'],
            members: row['Class'] || 'N/A', // Adjust as needed
        }));
        setTeams(teamsFromCsv);
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

    // New handler for creating a group
    const handleCreateGroup = async () => {
        console.log("Creating group:", groupName);
        // Add any additional logic for creating a group, e.g., API call to save the group
        try {
            const response = await fetch("https://localhost:7010/api/Teacher/group", {
              method: "POST",
              credentials: "include",
              body: JSON.stringify({ name: groupName }),
            });
      
            if (response.ok) {
                console.log("Group created successfully!");
                const newGroup = await response.json();
                setSelectedGroupId(newGroup.id);
            } else {
                console.log("Failed to create group");
            }
          } catch (error) {
            setUploadStatus("An error occurred while creating the group:", error);
        }
        
        
        setGroupName(""); // Clear the input after creation
    };

    const handleCreateTeam = async (teamName) => {
        if (editIndex !== null) {
            // Edit existing team
            const updatedTeams = [...teams];
            updatedTeams[editIndex].name = teamName;
            setTeams(updatedTeams);
            setEditIndex(null);
        } else {
            // Create a new team
            try {
                const response = await fetch("https://localhost:7010/api/Teacher/team", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: teamName,
                        groupId: selectedGroupId 
                    })
                });

                if (response.ok) {
                    console.log("Team created successfully!");
                    const newTeam = await response.json();
                    setSelectedTeamId(newTeam.id);
                    //setTeams([...teams, { name: teamName, members: 5 }]); // Mock data for members count
                } else {
                    console.error("Failed to create team");
                }
            } catch (error) {
                console.error("An error occurred while creating the team:", error);
            }
        }
    };

    const handleAddStudentToTeam = async (teamId, studentId) => {
        try {
            const response = await fetch(`https://localhost:7010/api/Teacher/team/add-student`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                    teamId: selectedTeamId, 
                    studentId })
            });
    
            if (response.ok) {
                console.log("Student added to team successfully!");
            } else {
                console.log("Failed to add student to team");
            }
        } catch (error) {
            console.error("An error occurred while adding student to team:", error);
        }
    };
    


    return (
        <div className="team-overview-container">
            <div className="csv-upload">
                <CSVUpload onTeamsUpload={handleTeamsUpload} />
            </div>
            <input
                type="text"
                placeholder="Enter Group Name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="group-name-input"
            />
            <button className="create-group-btn" onClick={handleCreateGroup}>
                Create Group +
            </button>
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
