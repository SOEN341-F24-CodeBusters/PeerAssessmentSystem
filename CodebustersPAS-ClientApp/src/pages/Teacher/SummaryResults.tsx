import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SummaryResults.css";

// Mock data for testing display
interface StudentEvaluation {
  studentId: string;
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
  id: string;
  name: string;
  studentEvaluations: StudentEvaluation[];
}

const SummaryResults: React.FC = () => {
  const [summary, setSummary] = useState<GroupSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { groupName } = useParams<{ groupName: string }>(); // Retrieve `groupName` from URL parameters

  // Use mock data for testing the display
  useEffect(() => {
    if (!groupName) {
      setError("Group name is required.");
      return;
    }

    // Simulating mock data for the group summary
    const mockData: GroupSummary = {
      id: "123",
      name: groupName,
      studentEvaluations: [
        {
          studentId: "S001",
          fullName: "John Doe",
          teamName: "Team A",
          cooperation: 4,
          conceptualContributions: 3,
          practicalContributions: 5,
          workEthic: 4,
          average: 4.0,
          peersWhoResponded: 3,
        },
        {
          studentId: "S002",
          fullName: "Jane Smith",
          teamName: "Team A",
          cooperation: 5,
          conceptualContributions: 4,
          practicalContributions: 4,
          workEthic: 5,
          average: 4.5,
          peersWhoResponded: 4,
        },
        {
          studentId: "S003",
          fullName: "Alice Brown",
          teamName: "Team A",
          cooperation: 3,
          conceptualContributions: 3,
          practicalContributions: 3,
          workEthic: 4,
          average: 3.25,
          peersWhoResponded: 2,
        },
      ],
    };

    setSummary(mockData);
  }, [groupName]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!summary) {
    return <div className="loading">Loading summary results...</div>;
  }

  return (
    <div className="summary-results-container">
      <h1>Summary of Results for Course: {summary.name}</h1>
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
          {summary.studentEvaluations.map((student) => (
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




/*
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SummaryResults.css";

interface StudentEvaluation {
  studentId: string;
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
  id: string;
  name: string;
  studentEvaluations: StudentEvaluation[];
}

const SummaryResults: React.FC = () => {
  const [summary, setSummary] = useState<GroupSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { groupName } = useParams<{ groupName: string }>(); // Retrieve `groupName` from URL parameters

  useEffect(() => {
    const fetchSummary = async () => {
      if (!groupName) {
        setError("Group name is required.");
        return;
      }

      try {
        const response = await fetch(`/Teacher/SummaryOfResults?groupName=${encodeURIComponent(groupName)}`);
        if (!response.ok) {
          throw new Error("Failed to fetch summary results");
        }

        const data: GroupSummary = await response.json();
        setSummary(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchSummary();
  }, [groupName]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!summary) {
    return <div className="loading">Loading summary results...</div>;
  }

  return (
    <div className="summary-results-container">
      <h1>Summary of Results for Group: {summary.name}</h1>
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
          {summary.studentEvaluations.map((student) => (
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
*/