import React from "react";

const AssessmentDimension = ({ title, description, members, onScoreChange }) => {
  return (
    <div className="container-dimension">
      <h2 className="dimension-title">{title}</h2>
      <p className="dimension-description">{description}</p>
      <p className="dimention-explanation">
        Please rate each team member on a scale of 1 (strongly disagree) to 7
        (strongly agree) whether they cooperated as described above.
      </p>
      {members.map((member, index) => (
        <div key={index} className="container-member">
          <label className="member-label">{member}</label>
          <select
            className="member-input"
            onChange={
              onScoreChange
                ? (e) =>{              
                  const formattedTitle = title
                  .toLowerCase()
                  .replace(/\s(.)/g, (match, group1) => group1.toUpperCase())
                  .replace(/\s/g, "");

                    onScoreChange(
                      member,
                      formattedTitle,
                      parseInt(e.target.value)
                    )
                  }
                : null
            }
          >
            <option>Choose 1 - 5</option>
            {[...Array(5)].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>

        </div>
      ))}
    </div>
  );
};

export default AssessmentDimension;
