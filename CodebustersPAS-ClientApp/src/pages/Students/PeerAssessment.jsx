import React from "react";
import { useNavigate } from "react-router-dom";
import "./CourseListingStudentsPage.css";
import CourseItem from "./CourseItem";

function PeerAssessment() {
  const [courseData, setCourseData] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    updateCourseData();
  }, []);

  async function updateCourseData() {
    let temp_data = await getCourseData();
    setCourseData(temp_data);
  }

  async function getCourseData() {
    // Here needs to be the actual request.
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

  const handleLogout = async () => {
    const apiUrl = 'https://localhost:7010/api/Authentification/LogOut';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const responseData = await response.json(); 
        console.log('Logout successful:', responseData)

        navigate('/');
      } else {
        console.error('Logout failed with status:', response.status);
      }
    } catch (error) {
      console.error('An error occurred during logout:', error);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">Peer Assessment</h1>
        <nav className="studentTab">Student's Tab</nav>
        <button
          onClick={handleLogout} className="logout-button"
          onMouseEnter={(e) => (e.target.classList.add('hover'))}
          onMouseLeave={(e) => (e.target.classList.remove('hover'))}
        >
          Logout
        </button>
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
    </div>
  );
}

export default PeerAssessment;

