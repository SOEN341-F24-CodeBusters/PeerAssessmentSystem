import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./DetailedResults.css";

// Define interfaces for the data
interface Evaluation {
  evaluatorId: string;
  evaluatorName: string;
  cooperation: number;
  conceptual: number;
  practical: number;
  workEthic: number;
  average: number;
  comment: string;
}

interface DetailedStudent {
  studentId: string;
  studentName: string;
  evaluations: Evaluation[];
}

interface DetailedTeam {
  teamName: string;
  students: DetailedStudent[];
}

interface DetailedResultsData {
  groupName: string;
  teams: DetailedTeam[];
}

const DetailedResults: React.FC = () => {
  const { groupName } = useParams<{ groupName: string }>();  
  const [data, setData] = useState<DetailedResultsData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!groupName) {
      setError("Group name is required.");
      return;
    }

    // Mock data
    const mockData: DetailedResultsData = {
      groupName: groupName,
      teams: [
        {
          teamName: "Team Alpha",
          students: [
            {
              studentId: "S1",
              studentName: "Student 1",
              evaluations: [
                {
                  evaluatorId: "E1",
                  evaluatorName: "Evaluator 1",
                  cooperation: 3,
                  conceptual: 4,
                  practical: 2,
                  workEthic: 1,
                  average: 2.5,
                  comment: "Good effort, but needs improvement.",
                },
                {
                  evaluatorId: "E2",
                  evaluatorName: "Evaluator 2",
                  cooperation: 5,
                  conceptual: 3,
                  practical: 4,
                  workEthic: 5,
                  average: 4.25,
                  comment: "Great work!",
                },
              ],
            },
            {
              studentId: "S2",
              studentName: "Student 2",
              evaluations: [
                {
                  evaluatorId: "E3",
                  evaluatorName: "Evaluator 3",
                  cooperation: 4,
                  conceptual: 2,
                  practical: 2,
                  workEthic: 3,
                  average: 2.75,
                  comment: "",
                },
              ],
            },
          ],
        },
      ],
    };

    // Simulate API response
    setTimeout(() => {
      setData(mockData);
    }, 1000);
  }, [groupName]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!data) {
    return <div className="loading">Loading detailed results...</div>;
  }

  return (
    <div className="detailed-results-container">
      <h1>Detailed View for Group: {data.groupName}</h1>
      {data.teams.map((team) => (
        <div key={team.teamName} className="team-section">
          <h2>Team Name: {team.teamName}</h2>
          {team.students.map((student) => (
            <div key={student.studentId} className="student-section">
              <h3>Student Name: {student.studentName}</h3>
              <table className="results-table">
                <thead>
                  <tr>
                    <th>Member</th>
                    <th>Cooperation</th>
                    <th>Conceptual</th>
                    <th>Practical</th>
                    <th>Work Ethic</th>
                    <th>Average</th>
                  </tr>
                </thead>
                <tbody>
                  {student.evaluations.map((evaluation) => (
                    <tr key={evaluation.evaluatorId}>
                      <td>{evaluation.evaluatorName}</td>
                      <td>{evaluation.cooperation}</td>
                      <td>{evaluation.conceptual}</td>
                      <td>{evaluation.practical}</td>
                      <td>{evaluation.workEthic}</td>
                      <td>{evaluation.average.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="comments-section">
                <h4>Comments:</h4>
                {student.evaluations.map((evaluation) => (
                  <p key={evaluation.evaluatorId}>
                    {evaluation.evaluatorName} comment:{" "}
                    {evaluation.comment || "No comment provided."}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DetailedResults;

