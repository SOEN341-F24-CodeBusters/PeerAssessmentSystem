import React, { useEffect, useState }  from "react";
import { useNavigate } from "react-router-dom";
import "./EvaluationStyles.css";
import AssessmentDimension from "./AssessmentDimension";


const GroupEvaluation = () => {
  const navigate = useNavigate();
  const [teamData, setTeamData] = useState([]);
  const [loggedInUserName, setLoggedInUserName] = useState("");
  const [scoreData, setScoreData] = useState([]);

  const handleNext = () => {
    navigate("/Student/SummaryComments", { state: { teamData, scoreData } });
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
        
        const teamList = data.flatMap(group => group.studentList || []);
        // Set the teamData excluding the logged-in user
        setTeamData(teamList.filter((member) => !member.isRated));
        //<--
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


  useEffect(() => {
    fetchUserName();
    getTeamData();
  }, []);

  const handleScoreChange = (memberName, dimension, score) => {
    const updatedScoreData = [...scoreData];
    const memberIndex = updatedScoreData.findIndex((member) => member.name === memberName);
  
    if (memberIndex !== -1) {
      // Update existing member's score
      updatedScoreData[memberIndex].scores = {
        ...updatedScoreData[memberIndex].scores,
        [dimension]: score,
      };
    } else {
      // Add new member with score
      updatedScoreData.push({
        name: memberName,
        scores: { [dimension]: score },
      });
    }

    console.log("New Score Data", updatedScoreData);
  
    setScoreData(updatedScoreData);
  };
  
  


  return (
    <div className="container-evaluation">
      <h1 className="evaluation-title">Class Group Work Evaluation</h1>
      <div className="evaluation-info">
        <p>
          Course: <strong>Soen 341</strong>
        </p>
        <p>
          Team name: <strong>Test team1</strong>
        </p>
        <p>
          Name: <strong>{loggedInUserName}</strong>
        </p>
      </div>
      <p className="evaluation-instructions">
        Please evaluate each member of your team based on 5 assessment
        dimensions below
      </p>

      {[
        { title: "Cooperation", description: "Actively participating in meetings; Communicating within the group; Cooperating within the group; Assisting team-mates when needed; Volunteering for tasks." },
        { title: "Conceptual Contribution", description: "Researching and gathering information; Quality of individual contribution; Suggesting ideas; Tying ideas together; Identifying difficulties; Identifying effective approaches." },
        { title: "Practical Contribution", description: "Writing of the report(s); Reviewing others’ report(s) or section(s); Providing constructive feedback on the report(s) or the presentation; Contributing to the organization of the work; Contributing to the preparation of presentation(s) (if appropriate)." },
        { title: "Work Ethic", description: "Displaying a positive attitude; Respecting team-mates; Respecting commitments; Respecting deadlines; Respecting team-mates’ ideas." },
      ].map((dimension, index) => (
        <AssessmentDimension
          key={index}
          title={dimension.title}
          description={dimension.description}
          members={teamData.map((member) => member.name)} // Only other team members
          onScoreChange={handleScoreChange}
        />
      ))}


      <div className="button-container">
        <button className="btn-next" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default GroupEvaluation;
