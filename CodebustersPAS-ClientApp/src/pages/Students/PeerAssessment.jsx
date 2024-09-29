import React from "react";
import "./CourseListingStudentsPage.css";
import CourseItem from "./CourseItem";

function PeerAssessment() {
  // const courseData = [
  //   {
  //     name: "SOEN341",
  //     description: "This is description for the course",
  //     startDate: "03/09/2024",
  //     endDate: "02/12/2024",
  //     status: "Ready",
  //   },
  // ];

  const [courseData, setCourseData] = React.useState([]);

  React.useEffect(() => {
    updateCourseData();
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
    </div>
  );
}

export default PeerAssessment;
