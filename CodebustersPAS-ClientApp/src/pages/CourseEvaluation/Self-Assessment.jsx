import React from "react";
import { useNavigate } from "react-router-dom";
import "./EvaluationStyles.css";
import AssessmentDimension from "./AssessmentDimension";

const SelfAssessment = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/Student/PeerAssessment");
  };

  return (
    <div className="container-evaluation">
      <h1 className="evaluation-title">Self-Assessment</h1>
      <div className="evaluation-info">
        <p>
          Course: <strong>Soen 341</strong>
        </p>
        <p>
          Name: <strong>John Doe</strong>
        </p>
      </div>
      <p className="evaluation-instructions">
        Please assess yourself based on the 5 assessment dimensions below.
      </p>

      <AssessmentDimension
        title="Cooperation"
        description="Actively participating in meetings; Communicating within the group; Cooperating within the group; Assisting team-mates when needed; Volunteering for tasks."
        members={["John Doe"]}
      />
      <AssessmentDimension
        title="Conceptual Contribution"
        description="Researching and gathering information; Quality of individual contribution; Suggesting ideas; Tying ideas together; Identifying difficulties; Identifying effective approaches."
        members={["John Doe"]}
      />
      <AssessmentDimension
        title="Practical Contribution"
        description="Writing of the report(s); Reviewing others’ report(s) or section(s); Providing constructive feedback on the report(s) or the presentation; Contributing to the organization of the work; Contributing to the preparation of presentation(s) (if appropriate)."
        members={["John Doe"]}
      />
      <AssessmentDimension
        title="Work Ethic"
        description="Displaying a positive attitude; Respecting team-mates; Respecting commitments; Respecting deadlines; Respecting team-mates’ ideas."
        members={["John Doe"]}
      />
      <AssessmentDimension
        title="Problem Solving"
        description="Demonstrating critical thinking; Proposing solutions; Adaptability to challenges; Addressing issues proactively; Implementing effective resolutions."
        members={["John Doe"]}
      />

      <div className="comment-section">
        <label htmlFor="comments">Additional Comments:</label>
        <textarea
          id="comments"
          name="comments"
          rows="4"
          placeholder="Add any comments or feedback..."
        ></textarea>
      </div>

      <button className="btn-submit" onClick={handleSubmit}>
        Submit
      </button>

      <div className="button-container">
        <button className="btn-back" onClick={handleBack}>
          Back
        </button>
        <button className="btn-submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default SelfAssessment;
