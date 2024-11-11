import React from 'react';
import { useNavigate } from "react-router-dom";
import './Summary_Comments.css';

interface TeamMember {
    name: string;
    scores: {
        cooperation: number;
        conceptualContributions: number;
        practicalContributions: number;
        workEthic: number;
    };
    comment: string;
}

const SummaryComments: React.FC = () => {

    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
      };

    const [teamMembers, setTeamMembers] = React.useState<TeamMember[]>([
        { name: 'John Doe', scores: { cooperation: 5, conceptualContributions: 3, practicalContributions: 5, workEthic: 5 }, comment: '' },
        { name: 'John Doe', scores: { cooperation: 4, conceptualContributions: 3, practicalContributions: 5, workEthic: 3 }, comment: '' },
        { name: 'John Doe', scores: { cooperation: 3, conceptualContributions: 4, practicalContributions: 5, workEthic: 3 }, comment: '' }
    ]);

    const handleCommentChange = (index: number, newComment: string) => {
        const updatedTeamMembers = [...teamMembers];
        updatedTeamMembers[index].comment = newComment;
        setTeamMembers(updatedTeamMembers);
    };

    return (
        <div className="summary-comments-page">
            <h2>Summary of Assigned Scores</h2>
            <table className="summary-table">
                <thead>
                    <tr>
                        <th>Team Member</th>
                        <th>1. Cooperation</th>
                        <th>2. Conceptual Contributions</th>
                        <th>3. Practical Contributions</th>
                        <th>4. Work Ethic</th>
                    </tr>
                </thead>
                <tbody>
                    {teamMembers.map((member, index) => (
                        <tr key={index}>
                            <td>{member.name}</td>
                            <td>{member.scores.cooperation}</td>
                            <td>{member.scores.conceptualContributions}</td>
                            <td>{member.scores.practicalContributions}</td>
                            <td>{member.scores.workEthic}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3>Comments to your team members</h3>
            <p className="instructions">
                Please provide feedback to your team members. Remember that your feedback to them will be anonymous.
            </p>
            <div className="comments-section">
                {teamMembers.map((member, index) => (
                    <div key={index} className="comment-box">
                        <label htmlFor={`comment-${index}`}>{member.name}</label>
                        <textarea
                            id={`comment-${index}`}
                            value={member.comment}
                            onChange={(e) => handleCommentChange(index, e.target.value)}
                            placeholder="Enter your comments here"
                        />
                    </div>
                ))}
            </div>
            <div className="button-container">
            <button className="btn-back" onClick={handleBack}>Back</button>
            <button className="next-button">Next</button>
            </div>
        </div>
    );
};

export default SummaryComments;
