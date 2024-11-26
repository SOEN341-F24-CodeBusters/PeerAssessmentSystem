import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./EvaluationStyles.css";
import AssessmentDimension from "./AssessmentDimension";

const SelfAssessment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { teamData = [], groupEvaluationScores = [] } = location.state || {};
  
  //const [teamData, setTeamData] = useState([]);
  const [loggedInUserName, setLoggedInUserName] = useState("");
  const [selfAssessmentData, setSelfAssessmentData] = useState({
    scores: { cooperation: 0, conceptualContributions: 0, practicalContributions: 0, workEthic: 0 },
    comment: "",
  });
  
  

  const handleBack = () => {
    navigate(-1);
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

  const handleSelfAssessmentChange = (dimension, score) => {
    const updatedScores = {
      ...selfAssessmentData.scores,
      [dimension]: score,
    };

    setSelfAssessmentData((prev) => ({
      ...prev,
      scores: updatedScores,
    }));

    console.log("Updated Self-Assessment Data:", selfAssessmentData);
  };
  
  const handleSelfAssessmentCommentChange = (newComment) => {
    setSelfAssessmentData((prev) => ({
      ...prev,
      comment: newComment,
    }));

    console.log("Self assess comment data:", selfAssessmentData);
  };
  

  const handleSubmit = async () => {
    const combinedData = {
      groupEvaluations: location.state.finalData, // From GroupEvaluation + SummaryComments
      selfAssessment: {
        ...selfAssessmentData,
        name: loggedInUserName, // Include logged-in user's name
      }, 
    };
  
    try {
      const response = await fetch("https://localhost:7010/api/Student/SubmitEvaluations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(combinedData),
      });
  
      if (response.ok) {
        console.log("Evaluation submitted successfully!");
        alert("Evaluation submitted successfully!");
        navigate("/Student/PeerAssessment");
      } else {
        console.error("Error submitting evaluation");
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
    //navigate("/Student/PeerAssessment");
  };

  /*
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
    
  };*/



  useEffect(() => {
    fetchUserName();
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
      ].map((dimension, index) => (
        <AssessmentDimension
          key={index}
          title={dimension.title}
          description={dimension.description}
          members={[loggedInUserName]} // Only other team members
          onScoreChange={(score) => handleSelfAssessmentChange(dimension.title, score)}
        />
      ))}

      <div className="comment-section">
        <label htmlFor="comments">Additional Comments:</label>
        <textarea
          id="comments"
          name="comments"
          rows="4"
          placeholder="Add any comments or feedback..."
          value={selfAssessmentData.comment}
          onChange={(e) => handleSelfAssessmentCommentChange(e.target.value)}
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
