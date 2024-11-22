import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CSVUpload from './CSVUpload'; 
import CreateTeamPopup from './CreateTeamPopup';
import './TeamOverview.css';

const TeamOverview = () => {
    const [groups, setGroups] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [groupName, setGroupName] = useState("");
    const [error, setError] = useState("");

    // Fetch groups on component mount
    useEffect(() => {
        fetchGroupsAndTeams();
    }, []);

    // Fetch groups and teams data from the API
    const fetchGroupsAndTeams = async () => {
        try {
            console.log("Fetching groups and teams...");
            const response = await fetch("https://localhost:7010/api/Teacher/GetGroupsAndTeams", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Fetched Groups Data:", data); // Log the fetched data
                setGroups(data); // Update state with fetched data
            } else {
                console.error("Failed to fetch groups and teams");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Create a new group and update the state
    const handleCreateGroup = async () => {
        if (!groupName.trim()) {
            setError("Group name cannot be empty.");
            return;
        }
        try {
            console.log("Creating new group:", groupName);
            const response = await fetch("https://localhost:7010/api/Teacher/group", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: groupName })
            });

            if (response.ok) {
                const newGroup = await response.json();
                console.log("Group created successfully:", newGroup);
                setGroups((prevGroups) => [...prevGroups, newGroup]); // Add new group to state
                setGroupName(""); // Clear input
                setError(""); // Clear any error
            } else {
                console.error("Failed to create group");
            }
        } catch (error) {
            console.error("Error creating group:", error);
        }
    };

    const handleOpenPopup = () => setIsPopupOpen(true);
    const handleClosePopup = () => setIsPopupOpen(false);

    return (
        <div className="container">
            <header className="header">
                <h1 className="title">Team Overview</h1>
                <nav className="studentTab">Teacher's Tab</nav>
            </header>
            <section className="courseTeamContainer">
                <h2 className="courseListTitle">Manage your groups and teams</h2>
                
                <div className="csv-upload">
                    <CSVUpload onTeamsUpload={(data) => console.log("CSV Data:", data)} />
                </div>

                <div className="groupSection">
                    <h3>Create a New Group</h3>
                    <input
                        type="text"
                        placeholder="Enter Group Name"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        className="group-input"
                    />
                    <button className="create-group-btn" onClick={handleCreateGroup}>
                        Create Group
                    </button>
                    {error && <p className="error-message">{error}</p>}
                </div>

                <div className="groupColumns">
                    <h3>Group Name</h3>
                    <h3>Teams</h3>
                    <h3>Actions</h3>
                </div>

                <div className="groupItems-list">
                    {groups.map((group) => (
                        <div key={group.id} className="groupItem">
                            <div className="groupCell">
                            <Link to={`/Teacher/Dashboard/${group.name}`} className="group-link">   
                                {group.name}
                                </Link>
                                </div>
                            <div className="groupCell">
                                {group.teams.length > 0 ? (
                                    group.teams.map((team) => (
                                        <div key={team.id} className="team-item">{team.teamName}</div>
                                    ))
                                ) : (
                                    <p>No Teams Yet</p>
                                )}
                            </div>
                            <div className="groupCell">
                                <button className="create-team-btn" onClick={handleOpenPopup}>
                                    Add Team
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {isPopupOpen && (
                <CreateTeamPopup
                    onClose={handleClosePopup}
                    onCreateTeam={(teamName) => console.log("Team created:", teamName)}
                />
            )}
        </div>
    );
};

export default TeamOverview;
