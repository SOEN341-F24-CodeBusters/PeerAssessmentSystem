import React from "react";
import "./1CourseListingStudentsPage.css";

function TeamItem({ teamName, members }) {
  return (
    <>
    <div key={index} className="teamItem">
        <h3 className="teamName">{teamName}</h3>
        <p className="teamMembers">{members.join(", ")}</p>
    </div>
    </>
  );
}

export default TeamItem;
