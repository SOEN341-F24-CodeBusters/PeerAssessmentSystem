import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto"; // Automatically registers necessary components

const TeamEvaluationChart = ({ data }) => {
  // Extracting data for the chart
  const memberNames = data.members.map((member) => member.name);
  const selfScores = data.members.map((member) => member.selfScore);
  const teamScores = data.members.map((member) => member.teamScore);

  // Chart.js data configuration
  const chartData = {
    labels: memberNames, // X-axis labels (team members)
    datasets: [
      {
        label: "Self Score",
        data: selfScores, // Data for the self-score bars
        backgroundColor: "rgba(255, 99, 132, 0.6)", // Pink color
        borderColor: "rgba(255, 99, 132, 1)", // Border for pink bars
        borderWidth: 1,
      },
      {
        label: "Team Score",
        data: teamScores, // Data for the team-score bars
        backgroundColor: "rgba(54, 162, 235, 0.6)", // Blue color
        borderColor: "rgba(54, 162, 235, 1)", // Border for blue bars
        borderWidth: 1,
      },
    ],
  };

  // Chart.js options configuration
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top", // Legend position
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Team Members",
          color: "#000", // Axis label color
          font: {
            size: 14, // Axis label font size
          },
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Scores",
          color: "#000", // Axis label color
          font: {
            size: 14, // Axis label font size
          },
        },
      },
    },
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <h2 style={{ color: "#333", fontSize: "24px" }}>{data.teamName} - Peer Evaluation</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default TeamEvaluationChart;
