import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { LineChart } from '@mui/x-charts/LineChart';
import axios from 'axios';

// Define the interface for the data
interface PeerAssessmentData {
  teamName: string;
  averageScore: number;
}

const Charts: React.FC = () => {
  const { groupName } = useParams<{ groupName: string }>(); // Extract groupName from the route parameters
  const [data, setData] = useState<PeerAssessmentData[]>([]); // State for chart data
  const [loading, setLoading] = useState(true); // State for loading indicator

  // Fetch peer assessment data on component mount or when groupName changes
  useEffect(() => {
    axios
      .get<PeerAssessmentData[]>(`/api/peer-assessment-data/${groupName}`) // Fetch data from API
      .then((response) => {
        setData(response.data); // Update the data state with the response
      })
      .catch((error) => {
        console.error('Error fetching data:', error); // Log any errors
      })
      .then(() => {
        setLoading(false); // Update loading state after the promise resolves
      });
  }, [groupName]);

  // Render loading state
  if (loading) {
    return <p>Loading charts...</p>;
  }

  // Render message if no data is available
  if (!data || data.length === 0) {
    return <p>No peer assessment data available yet for {groupName}.</p>;
  }

  // Render the chart
  return (
    <div className="chart-container">
      <h2>Peer Assessment Charts for {groupName}</h2>
      <LineChart
        xAxis={[
          { scaleType: 'band', data: data.map((item) => item.teamName) }, // Map team names for the x-axis
        ]}
        series={[
          {
            data: data.map((item) => item.averageScore), // Map average scores for the series
            label: 'Average Score',
          },
        ]}
        width={800} // Chart width
        height={400} // Chart height
      />
    </div>
  );
};

export default Charts;
