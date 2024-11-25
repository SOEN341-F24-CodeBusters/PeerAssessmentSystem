// TeamEvaluationChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Import auto to register the chart.js modules

const TeamEvaluationChart = ({ teamName, scores }) => {
  const data = {
    labels: ['Clarity', 'Engagement', 'Relevance', 'Pace'], // Example evaluation categories
    datasets: [
      {
        label: `${teamName} Scores`,
        data: scores,
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  return (
    <div style={{ width: '600px', margin: 'auto' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default TeamEvaluationChart;
