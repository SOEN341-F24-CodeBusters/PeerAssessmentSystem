import React from "react";
import "./CourseListingStudentsPage.css";
import { Link } from "react-router-dom";

function CourseItem({ name, description, startDate, endDate, status }) {
  return (
    <>
      <div className="courseItem">
        <Link to="/group-evaluation">{name}</Link>
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
