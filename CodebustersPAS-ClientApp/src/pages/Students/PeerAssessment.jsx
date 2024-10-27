import React, { useState } from "react";
import "./CourseListingStudentsPage.css";
import CourseItem from "./CourseItem";
import TeamItem from "./TeamItem";

function PeerAssessment() {

  const [courseData, setCourseData] = React.useState([]);
  const [teamData, setTeamData] = useState([]);

  React.useEffect(() => {
    updateCourseData();
    getTeamData();
  }, []);

  async function updateCourseData() {
    let temp_data = await getCourseData();
    setCourseData(temp_data);
  }

  async function getCourseData() {
    //here needs to be actual request
    let temp_data = [
      {
        name: "SOEN341",
        description: "This is description for the course",
        startDate: "03/09/2024",
        endDate: "02/12/2024",
        status: "Ready",
      },
    ];

    return temp_data;
  }


  async function getTeamData() {

    /*const apiUrl = 'https://localhost:7010/api/';

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(teamData),
      });

      if (response.ok){
        //const responseData = await response.json(); 
        //console.log('Login successful:', responseData);

        const data = await response.json();
        setTeamData(data);
        console.log('Team is displayed');

      }else{
        const errorData = await response.json();
        console.error('Error fetching team data:', errorData);
        alert(errorData);
      }
    }catch (error) {
      console.error('Request failed:', error);
      alert('An error occurred. Please check your connection and try again.');
    }*/
    const teamData = [
      {
        teamName: "Demo1",
        members: ["tina", "louis", "pacifique", "theo", "omar", "valeriia"],
      },
    ];
    setTeamData(teamData);
    
  };



  return (
    <div className="container">
      <header className="header">
        <h1 className="title">Peer Assessment</h1>
        <nav className="studentTab">Student's Tab</nav>
      </header>

      <section className="courseContainer">
        <h2 className="courseListTitle">Your courses are listed here</h2>
        <div className="courseColumns">
          <h3>Course Name</h3>
          <h3>Project Description</h3>
          <h3>Course Duration</h3>
          <h3>Status</h3>
        </div>

        <div className="courseItems-list">
          {courseData.map((course, index) => (
            <CourseItem key={index} {...course} />
          ))}
        </div>
      </section>
      
      <section className="teamContainer">
        <h2 className="teamListTitle">Your teams are listed here</h2>
        <div className="teamColumns">
          <h3>Team Name</h3>
          <h3>Members</h3>
        </div>

        <div className="teamItems-list">
          {teamData.length > 0 ? (
            teamData.map((team, index) => (
              <TeamItem key={index} {...team} />
            ))
          ) : (
            <p>You are not assigned in any team yet</p>
          )}
        </div>
      </section>
      
    </div>
  );
}

export default PeerAssessment;
