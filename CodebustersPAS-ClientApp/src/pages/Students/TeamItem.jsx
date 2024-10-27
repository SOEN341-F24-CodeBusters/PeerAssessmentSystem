import React from "react";
import "./CourseListingStudentsPage.css";

function TeamItem({ teamName, members }) {
  return (
    <>
    <div className="teamItem">
        <h3 className="teamName">{teamName}</h3>
        <p className="teamMembers">{members.join(", ")}</p>
    </div>
    </>
  );
}

export default TeamItem;
