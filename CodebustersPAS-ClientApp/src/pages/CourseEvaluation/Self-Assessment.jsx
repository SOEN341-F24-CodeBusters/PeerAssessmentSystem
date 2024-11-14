import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EvaluationStyles.css";
import AssessmentDimension from "./AssessmentDimension";

const SelfAssessment = () => {
  const navigate = useNavigate();
  const [teamData, setTeamData] = useState([]);
  const [loggedInUserName, setLoggedInUserName] = useState("");


  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = () => {
    navigate("/Student/PeerAssessment");
  };

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

        // Identify the logged-in user from the list
        const loggedInUser = teamList.find((member) => member.isRated);
        setLoggedInUserName(loggedInUser ? loggedInUser.name : "Logged-in User");

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
    getTeamData();
  }, []);


  return (
    <div className="container-evaluation">
      <h1 className="evaluation-title">Self-Assessment</h1>
      <div className="evaluation-info">
        <p>
          Course: <strong>Soen 341</strong>
        </p>
        <p>
          Name: <strong>{loggedInUserName}</strong>
        </p>
      </div>
      <p className="evaluation-instructions">
        Please assess yourself based on the 5 assessment dimensions below.
      </p>

      {[
        { title: "Cooperation", description: "Actively participating in meetings; Communicating within the group; Cooperating within the group; Assisting team-mates when needed; Volunteering for tasks." },
        { title: "Conceptual Contribution", description: "Researching and gathering information; Quality of individual contribution; Suggesting ideas; Tying ideas together; Identifying difficulties; Identifying effective approaches." },
        { title: "Practical Contribution", description: "Writing of the report(s); Reviewing others’ report(s) or section(s); Providing constructive feedback on the report(s) or the presentation; Contributing to the organization of the work; Contributing to the preparation of presentation(s) (if appropriate)." },
        { title: "Work Ethic", description: "Displaying a positive attitude; Respecting team-mates; Respecting commitments; Respecting deadlines; Respecting team-mates’ ideas." },
        { title: "Problem Solving", description: "Demonstrating critical thinking; Proposing solutions; Adaptability to challenges; Addressing issues proactively; Implementing effective resolutions." }
      ].map((dimension, index) => (
        <AssessmentDimension
          key={index}
          title={dimension.title}
          description={dimension.description}
          members={teamData.map((member) => member.name)} // Only other team members
        />
      ))}

      <div className="comment-section">
        <label htmlFor="comments">Additional Comments:</label>
        <textarea
          id="comments"
          name="comments"
          rows="4"
          placeholder="Add any comments or feedback..."
        ></textarea>
      </div>

      {/* <button className="btn-submit" onClick={handleSubmit}>
        Submit
      </button> */}

      <div className="button-container">
        <button className="btn-submit-back" onClick={handleBack}>
          Back
        </button>
        <button className="btn-submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default SelfAssessment;
