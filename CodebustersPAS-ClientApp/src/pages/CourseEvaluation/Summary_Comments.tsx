import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import './Summary_Comments.css';


interface TeamMember {
    name: string;
    scores: {
        cooperation: number;
        conceptualContributions: number;
        practicalContributions: number;
        workEthic: number;
    };
    comment: string;
}

const SummaryComments: React.FC = () => {
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [loggedInUserName, setLoggedInUserName] = useState("");
    const navigate = useNavigate();
    //const [scoreData, setScoreData] = useState([]);
    const location = useLocation();
    const { teamData, scoreData } = location.state || { teamData: [], scoreData: [] };

    useEffect(() => {
        console.log('Team Data:', teamData);
        console.log('Score Data:', scoreData);
      
        
      }, [teamData, scoreData]);
      
      
      
      
    const handleBack = () => {
        navigate(-1);
    };
    const handleNext = () => {
        navigate("/Student/SelfAssessment");
    };

    useEffect(() => {
        if (loggedInUserName) {
            getTeamData();
        }
    }, [loggedInUserName]);

    async function getTeamData() {

        const apiUrl = 'https://localhost:7010/api/Student/GetGroupsAndTeams';

        try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            },
            credentials: 'include'
        });

        if (response.ok){
            const data = await response.json();
            //setTeamData(data);
            //-->
            const teamList = data[0]?.studentList || [];

            // Filter out the logged-in user from the team list
            const filteredTeamMembers = teamList.filter((member: any) => member.name !== loggedInUserName);

            // Set the team data with the filtered members
            const mergedTeamMembers = filteredTeamMembers.map((member: any) => {
                const matchingScore = scoreData.find((score: any) => score.name === member.name);
                return {
                  name: member.name,
                  scores: matchingScore
                    ? matchingScore.scores
                    : {
                        cooperation: 0,
                        conceptualContributions: 0,
                        practicalContributions: 0,
                        workEthic: 0,
                      },
                  comment: "",
                };
            });
            setTeamMembers(mergedTeamMembers);


            console.log('Team is fetched successfully:', data);

        }else{
            const errorData = await response.json();
            console.error('Error fetching team data:', errorData);
            alert(errorData);
        }
        }catch (error) {
        console.error('Request failed:', error);
        alert('An error occurred. Please check your connection and try again.');
        }
        
    };

    async function fetchUserName() {
        try {
          const response = await fetch("https://localhost:7010/api/Student/GetLoggedInUserName", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          });
    
          if (response.ok) {
            const data = await response.json();
            setLoggedInUserName(data.name);
          } else {
            console.error("Error fetching logged in user name");
          }
        } catch (error) {
          console.error("Request failed:", error);
        }
      }

    

    useEffect(() => {
        fetchUserName();
    }, []);
    
    

    const handleCommentChange = (index: number, newComment: string) => {
        const updatedTeamMembers = [...teamMembers];
        updatedTeamMembers[index].comment = newComment;
        setTeamMembers(updatedTeamMembers);
    };
    

    return (
        <div className="summary-comments-page">
            <h2>Summary of Assigned Scores</h2>
            <table className="summary-table">
                <thead>
                    <tr>
                        <th>Team Member</th>
                        <th>1. Cooperation</th>
                        <th>2. Conceptual Contributions</th>
                        <th>3. Practical Contributions</th>
                        <th>4. Work Ethic</th>
                    </tr>
                </thead>
                <tbody>
                    {teamMembers.map((member, index) => (
                        <tr key={index}>
                            <td>{member.name}</td>
                            <td>{member.scores.cooperation}</td>
                            <td>{member.scores.conceptualContributions}</td>
                            <td>{member.scores.practicalContributions}</td>
                            <td>{member.scores.workEthic}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h4>Comments to your team members</h4>
            <p className="instructions">
                Please provide feedback to your team members. Remember that your feedback to them will be anonymous.
            </p>
            <div className="comments-section">
                {teamMembers.map((member, index) => (
                    <div key={index} className="comment-box">
                        <label htmlFor={`comment-${index}`}>{member.name}</label>
                        <textarea
                        id={`comment-${index}`}
                        value={member.comment}
                        onChange={(e) => handleCommentChange(index, e.target.value)}
                        placeholder="Enter your comments here"
                        />
                    </div>
                ))}
            </div>
            <div className="button-container">
            <button className="btn-back" onClick={handleBack}>Back</button>
            <button className="next-button" onClick={handleNext}>Next</button>
            </div>
        </div>
    );
};

export default SummaryComments;
