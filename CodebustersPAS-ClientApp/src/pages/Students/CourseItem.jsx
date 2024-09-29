import React from "react";
import "./CourseListingStudentsPage.css";

function CourseItem({ name, description, startDate, endDate, status }) {
  return (
    <>
      <div className="courseItem">
        <h3 className="courseName">{name}</h3>
        <p className="courseDescription">{description}</p>
        <div className="courseDuration">
          <span className="dateRange">{startDate}</span>
          <span>-</span>
          <span>{endDate}</span>
        </div>
        <span className="courseStatus">{status}</span>
      </div>
    </>
  );
}

export default CourseItem;
