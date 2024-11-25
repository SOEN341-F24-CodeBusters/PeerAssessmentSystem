// CourseEvaluation.jsx
import React, { useState, useEffect } from 'react';
import TeamEvaluationChart from './TeamEvaluationChart';

const CourseEvaluation = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [evaluationData, setEvaluationData] = useState([]);

  const courses = ['Course 101', 'Course 102', 'Course 103']; // Example courses

  useEffect(() => {
    if (selectedCourse) {
      // Simulating API call to fetch evaluation data for the selected course
      fetch(`/api/course-evaluation?course=${selectedCourse}`) // Replace with your actual endpoint
        .then((response) => response.json())
        .then((data) => {
          setEvaluationData(data.teams);
        })
        .catch((error) => console.error('Error fetching evaluation data:', error));
    }
  }, [selectedCourse]);

  return (
    <div>
      <h1>Course Evaluation Summary</h1>
      <select onChange={(e) => setSelectedCourse(e.target.value)} value={selectedCourse || ''}>
        <option value="" disabled>Select a course</option>
        {courses.map((course) => (
          <option key={course} value={course}>
            {course}
          </option>
        ))}
      </select>
      {evaluationData.length > 0 ? (
        evaluationData.map((team) => (
          <TeamEvaluationChart key={team.teamName} teamName={team.teamName} scores={team.scores} />
        ))
      ) : (
        <p>Please select a course to view evaluations.</p>
      )}
    </div>
  );
};

export default CourseEvaluation;
