import React from "react";
import "./CourseListingStudentsPage.css";
import { Link } from "react-router-dom";


function TeamItem({ groupName, teamName, studentList }) {
  return (
    <><Link className="teamName" to="/group-evaluation">{groupName}</Link>
      <h3 className="teamName">{teamName}</h3>
      <p className="teamMembers">{studentList.map(student => student.name).join(", ")}</p>
    </>
  );
}

export default TeamItem;
