import React from "react";
import "./EvaluationStyles.css";
import AssessmentDimension from "./AssessmentDimension";

const GroupEvaluation = () => {
  return (
    <div className="container-evaluation">
      <h1 className="evaluation-title">Class Group Work Evaluation</h1>
      <div className="evaluation-info">
        <p>
          Course: <strong>Soen 341</strong>
        </p>
        <p>
          Group: <strong>Group 1</strong>
        </p>
        <p>
          Name: <strong>John Doe</strong>
        </p>
      </div>
      <p className="evaluation-instructions">
        Please evaluate each member of your team based on 5 assessment
        dimensions below
      </p>

      <AssessmentDimension
        title="COOPERATION"
        description="Actively participating in meetings; Communicating within the group; Cooperating within the group; Assisting team-mates when needed; Volunteering for tasks."
        members={["John Doe", "John Doe", "John Doe"]}
      />

      <button className="btn-submit">Submit</button>
    </div>
  );
};

export default GroupEvaluation;
