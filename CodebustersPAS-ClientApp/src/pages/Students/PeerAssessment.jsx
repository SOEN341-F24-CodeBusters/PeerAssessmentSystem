import React from "react";
import styles from "./CourseListingStudentsPage.css";
import CourseItem from "./CourseItem";

function PeerAssessment() {
  const courseData = [
    {
      name: "SOEN341",
      description: "This is description for the course",
      startDate: "03/09/2024",
      endDate: "02/12/2024",
      status: "Ready",
    },
  ];

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Peer Assessment</h1>
        <nav className={styles.studentTab}>Student's Tab</nav>
      </header>
      <section className={styles.courseContainer}>
        <div className={styles.courseHeader}>
          <div className={styles.courseInfo}>
            <h2 className={styles.courseListTitle}>
              Your courses are listed here
            </h2>
            <div className={styles.courseColumns}>
              <div>Course Name</div>
              <div>Project Description</div>
            </div>
          </div>
          <div className={styles.courseDuration}>Course Duration</div>
          <div className={styles.status}>Status</div>
        </div>
        {courseData.map((course, index) => (
          <CourseItem key={index} {...course} />
        ))}
      </section>
    </main>
  );
}

export default PeerAssessment;
