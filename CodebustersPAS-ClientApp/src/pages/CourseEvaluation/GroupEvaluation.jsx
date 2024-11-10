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
        title="Cooperation"
        description="Actively participating in meetings; Communicating within the group; Cooperating within the group; Assisting team-mates when needed; Volunteering for tasks."
        members={["John Doe", "John Doe", "John Doe"]}
      />
      <AssessmentDimension
        title="Conceptual Contribution"
        description="Researching and gathering information; Quality of
 individual contribution; Suggesting ideas; Tying ideas together; Identifying difficulties;
 Identifying effective approaches."
        members={["John Doe", "John Doe", "John Doe"]}
      />
      <AssessmentDimension
        title="Practical Contribution"
        description="Writing of the report(s); Reviewing others’ report(s) or
 section(s); Providing constructive feedback on the report(s) or the presentation;
 Contributing to the organization of the work; Contributing to the preparation of
 presentation(s) (if appropriate)."
        members={["John Doe", "John Doe", "John Doe"]}
      />
      <AssessmentDimension
        title="Work Ethic"
        description="Displaying a positive attitude; Respecting team-mates; Respecting
 commitments; Respecting deadlines; Respecting team-mates’ ideas."
        members={["John Doe", "John Doe", "John Doe"]}
      />

      <button className="btn-next">Next</button>
    </div>
  );
};

export default GroupEvaluation;
