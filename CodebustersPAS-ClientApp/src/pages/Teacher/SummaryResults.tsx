import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SummaryResults.css";

// Define the structure of the response data based on your backend's DTOs
interface StudentEvaluation {
  studentId: number;
  fullName: string;
  teamName: string;
  cooperation: number;
  conceptualContributions: number;
  practicalContributions: number;
  workEthic: number;
  average: number;
  peersWhoResponded: number;
}

interface GroupSummary {
  groupId: string;
  groupName: string;
  students: StudentEvaluation[];
}

const SummaryResults: React.FC = () => {
  const [summary, setSummary] = useState<GroupSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { groupName, groupId } = useParams<{ groupName: string; groupId: string }>(); // Retrieve `groupName` and `groupId` from URL parameters

  // Fetch group summary data from the API
  useEffect(() => {
    if (!groupId) {
      setError("Group ID is required.");
      return;
    }

    // Use fetch API to make the request
    fetch(`/api/teacher/SummaryOfResults?groupId=${groupId}`)
      .then((response) => {
        if (!response.ok) {
          // Handle HTTP error responses
          throw new Error("Failed to fetch data.");
        }
        return response.json(); // Parse JSON response
      })
      .then((data) => {
        const studentEvaluations = data.students.map((student: any) => ({
          studentId: student.studentId,
          fullName: student.studentName,
          teamName: student.team,
          cooperation: student.cooperation,
          conceptualContributions: student.conceptualContributions,
          practicalContributions: student.practicalContributions,
          workEthic: student.workEthic,
          average: student.average,
          peersWhoResponded: student.count,
        }));

        setSummary({
          groupId: data.groupId,
          groupName: data.groupName,
          students: studentEvaluations,
        });
      })
      .catch((err) => {
        console.error("Error fetching group summary data", err);
        setError("Failed to load summary results.");
      });
  }, [groupId]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!summary) {
    return <div className="loading">Loading summary results...</div>;
  }

  return (
    <div className="summary-results-container">
      <h1>Summary of Results for Group: {summary.groupName}</h1>
      <table className="summary-table">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Full Name</th>
            <th>Team</th>
            <th>Cooperation</th>
            <th>Conceptual Contributions</th>
            <th>Practical Contributions</th>
            <th>Work Ethic</th>
            <th>Average</th>
            <th>Peers Who Responded</th>
          </tr>
        </thead>
        <tbody>
          {summary.students.map((student) => (
            <tr key={student.studentId}>
              <td>{student.studentId}</td>
              <td>{student.fullName}</td>
              <td>{student.teamName}</td>
              <td>{student.cooperation}</td>
              <td>{student.conceptualContributions}</td>
              <td>{student.practicalContributions}</td>
              <td>{student.workEthic}</td>
              <td>{student.average.toFixed(2)}</td>
              <td>{student.peersWhoResponded}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SummaryResults;
