import React from "react";
import "./CourseListingStudentsPage.css";

function TeamItem({ teamName, studentList }) {
  return (
    <>
    <div className="teamItem">
        <h3 className="teamName">{teamName}</h3>
        <p className="teamMembers">{studentList.map(student => student.name).join(", ")}</p>
    </div>
    </>
  );
}

export default TeamItem;
