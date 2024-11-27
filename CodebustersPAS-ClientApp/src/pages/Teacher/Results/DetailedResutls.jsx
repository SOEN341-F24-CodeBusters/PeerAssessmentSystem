import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import config from "../../../../config";

const DetailedResutls = () => {

    const { groupId } = useParams();

    const [results, setResults] = useState([]);


    useEffect(() => {
        fetchResults();
    }, []);


    const fetchResults = async () => {
        try {
            console.log("Fetching results...");
            const response = await fetch(`${config.apiBaseUrl}/api/Teacher/DetailedResults?groupId=${groupId}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Fetched Results Data:", data); // Log the fetched data
                setResults(data); // Update state with fetched data
            } else {
                console.error("Failed to fetch results");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="results">
            <h1 className="results__h1">Results</h1>
            <div className="results__group">
                Group: {results.groupName}
            </div>
            {results.teams?.map((team, index) => (
                <div className="results__team" key={index}>
                    <div className="results__team_title">
                        Team Name : {team.teamName}
                    </div>
                    {team.students?.map((student, index) => (
                        <div key={index} className="results__student">
                            <div className="results__details">
                                Student Id: {student.studentId}<br />
                                Student Name: {student.studentName}<br />
                            </div>
                            <div className="results__student_title">
                                Evaluations Received:
                            </div>
                            <table className="results__table">
                                <thead>
                                    <tr>
                                        <th>Student Id</th>
                                        <th>Student Name</th>
                                        <th>Cooperation</th>
                                        <th>Conceptual Contribution</th>
                                        <th>Practical Contribution</th>
                                        <th>Work Ethic</th>
                                        <th>Average</th>
                                        <th>Comment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {student.evaluations?.map((evaluation, index) => (
                                        <tr key={index}>
                                            <td>{evaluation.evaluatorStudentId}</td>
                                            <td>{evaluation.evaluatorStudentName}</td>
                                            <td>{evaluation.cooperation}</td>
                                            <td>{evaluation.conceptualContributions}</td>
                                            <td>{evaluation.practicalContributions}</td>
                                            <td>{evaluation.workEthic}</td>
                                            <td>{evaluation.average}</td>
                                            <td>{evaluation.comment}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="results__student_title">
                                Self Evaluation
                            </div>
                            <table className="results__table">
                                <thead>
                                    <tr>
                                        <th>Cooperation</th>
                                        <th>Conceptual Contribution</th>
                                        <th>Practical Contribution</th>
                                        <th>Work Ethic</th>
                                        <th>Average</th>
                                        <th>Comment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{student.selfEvaluation?.cooperation}</td>
                                        <td>{student.selfEvaluation?.conceptualContributions}</td>
                                        <td>{student.selfEvaluation?.practicalContributions}</td>
                                        <td>{student.selfEvaluation?.workEthic}</td>
                                        <td>{student.selfEvaluation?.average}</td>
                                        <td>{student.selfEvaluation?.comment}</td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default DetailedResutls;
