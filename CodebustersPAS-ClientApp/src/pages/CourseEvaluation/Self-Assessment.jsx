import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./EvaluationStyles.css";
import AssessmentDimension from "./AssessmentDimension";

const SelfAssessment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { groupEvaluationScores = [] } = location.state || {};
  
  const [teamData, setTeamData] = useState([]);
  const [teamId, setTeamId] = useState("");
  const [loggedInUserName, setLoggedInUserName] = useState("");
  const [loggedInUserId, setLoggedInUserId] = useState(null);

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

  const handleSelfAssessmentChange = (memberName, dimension, score) => {
    // Ensure updates apply only to the logged-in user.
    if (memberName !== loggedInUserName) return;
  
    const updatedScores = {
      ...selfAssessmentData.scores,
      [dimension]: score,
    };
  
    setSelfAssessmentData((prev) => ({
      ...prev,
      scores: updatedScores,
    }));
  
    console.log("Updated Self-Assessment Data:", {
      ...selfAssessmentData,
      scores: updatedScores,
    });
  };
  
  const handleSelfAssessmentCommentChange = (newComment) => {
    setSelfAssessmentData((prev) => ({
      ...prev,
      comment: newComment,
    }));

    console.log("Self assess comment data:", selfAssessmentData);
  };
  
  
  
  const handleSubmit = async () => {

    console.log("Before Submit - groupEvaluationScores:", groupEvaluationScores);
  if (!groupEvaluationScores || groupEvaluationScores.length === 0) {
    console.log("No group evaluation scores available.");
    return;
  }
    const studentNameToIdMap = teamData.reduce((acc, member) => {
      acc[member.name] = member.studentId; // Create a map with name as key and studentId as value
      return acc;
    }, {});
  
    // Debugging: Check the studentNameToIdMap
    console.log("studentNameToIdMap:", studentNameToIdMap);
    console.log("groupscores:",groupEvaluationScores);

    // Combine team data and the self-assessment data
    const ratings = [
      ...groupEvaluationScores.map((member) => {
        const studentId = studentNameToIdMap[member.name] || null; // Match name to studentId using the map
  
        // Debugging: Check if studentId is found
        console.log(`Mapping ${member.name} to studentId: ${studentId}`);
  
        return {
          studentId: studentId, // Adjust to use the correct identifier for `studentId`
          cooperation: member.scores.cooperation,
          conceptualContributions: member.scores.conceptualContributions,
          practicalContributions: member.scores.practicalContributions,
          workEthic: member.scores.workEthic,
          comment: member.comment || "", // Default to empty string if no comment provided
        };
      }),
      {
        studentId: loggedInUserId, // Add self-assessment
        cooperation: selfAssessmentData.scores.cooperation,
        conceptualContributions: selfAssessmentData.scores.conceptualContributions,
        practicalContributions: selfAssessmentData.scores.practicalContributions,
        workEthic: selfAssessmentData.scores.workEthic,
        comment: selfAssessmentData.comment || "",
      },
    ];

    const payload = {
      teamId: teamId, // Ensure teamId is passed in location.state
      ratings,
    };

    console.log("Payload to be submitted:", payload);


    try {
      const response = await fetch("https://localhost:7010/api/Student/RateStudents", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        credentials: "include",
        body: JSON.stringify(payload),
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
        const teamId = data[0]?.teamId; // Ensure this matches the API response structure
        //const studentList = data[0]?.studentList || [];
        const studentList = data.flatMap(group => group.studentList || []);
        console.log('Logged-in User Name:', loggedInUserName);
        console.log('Student List:', studentList);

        const loggedInUser = studentList.find(member => member.name === loggedInUserName);
        const loggedInStudentId = loggedInUser ? loggedInUser.studentId : null;

        // Log the studentId for the logged-in user
        console.log('Logged-in user studentId:', loggedInStudentId);

        // Set team data excluding the logged-in user and include `studentId`
        const filteredTeamData = studentList
          .filter((member) => !member.isRated) // Exclude already rated members
          .map((member) => ({
            studentId: member.studentId, // Extract studentId from the member object
            name: member.name,
            isRated: member.isRated, // If you need this for UI purposes
          }));

        // Update the state with teamId and filtered team data
        setTeamData(filteredTeamData);
        setTeamId(teamId); // Store the teamId separately for use in the payload
        setLoggedInUserId(loggedInStudentId);

        console.log('Team fetched successfully:', { teamId, filteredTeamData, loggedInStudentId });

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
  }, [loggedInUserName,loggedInUserId]);


  return (
    <div className="container-evaluation">
      <h1 className="evaluation-title">Self-Assessment</h1>
      <div className="evaluation-info">
        <p>
          Course: <strong>Soen 341</strong>
        </p>
        <p>
          Team Name: <strong>teamName</strong>
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
        { title: "Conceptual Contributions", description: "Researching and gathering information; Quality of individual contribution; Suggesting ideas; Tying ideas together; Identifying difficulties; Identifying effective approaches." },
        { title: "Practical Contributions", description: "Writing of the report(s); Reviewing others’ report(s) or section(s); Providing constructive feedback on the report(s) or the presentation; Contributing to the organization of the work; Contributing to the preparation of presentation(s) (if appropriate)." },
        { title: "Work Ethic", description: "Displaying a positive attitude; Respecting team-mates; Respecting commitments; Respecting deadlines; Respecting team-mates’ ideas." },
      ].map((dimension, index) => (
        <AssessmentDimension
          key={index}
          title={dimension.title}
          description={dimension.description}
          members={[loggedInUserName]} // Only other team members
          onScoreChange={handleSelfAssessmentChange}
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
