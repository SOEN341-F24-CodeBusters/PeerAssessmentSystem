import React from "react";
import TeamEvaluationChart from "./TeamEvaluationChart";

const TeamEvaluation = () => {
  // Example static data for Team A
  const teamData = {
    teamName: "Team A",
    members: [
      { name: "Chocolate", selfScore: 35, teamScore: 25 },
      { name: "Vanilla", selfScore: 40, teamScore: 30 },
      { name: "Raspberry", selfScore: 30, teamScore: 28 },
    ],
  };

  return (
    <div>
      <h1>Team Evaluation Dashboard</h1>
      {/* Render the TeamEvaluationChart component */}
      <TeamEvaluationChart data={teamData} />
    </div>
  );
};

export default TeamEvaluation;
