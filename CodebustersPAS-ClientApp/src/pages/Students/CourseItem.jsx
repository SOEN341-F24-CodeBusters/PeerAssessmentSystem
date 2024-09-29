import React from "react";
import styles from "./CourseListingStudentsPage.css";

function CourseItem({ name, description, startDate, endDate, status }) {
  return (
    <article className={styles.courseItem}>
      <h3 className={styles.courseName}>{name}</h3>
      <p className={styles.courseDescription}>{description}</p>
      <div className={styles.courseDates}>
        <time dateTime={startDate}>{startDate}</time>
        <span>-</span>
        <time dateTime={endDate}>{endDate}</time>
      </div>
      <div className={styles.courseStatus}>{status}</div>
    </article>
  );
}

export default CourseItem;
