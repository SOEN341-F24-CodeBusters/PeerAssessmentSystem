import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import config from "../../../../config";

import './results.css';

const SummaryResults = () => {

    const { groupId } = useParams();

    const [results, setResults] = useState([]);


    useEffect(() => {
        fetchResults();
    }, []);


    const fetchResults = async () => {
        try {
            console.log("Fetching results...");
            const response = await fetch(`${config.apiBaseUrl}/api/Teacher/SummaryOfResults?groupId=${groupId}`, {
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
            <div>
                <table className="results__table">
                    <thead>
                        <tr>
                            <th>Student Id</th>
                            <th>Student Name</th>
                            <th>Team Name</th>
                            <th>Cooperation</th>
                            <th>Conceptual Contribution</th>
                            <th>Practical Contribution</th>
                            <th>Work Ethic</th>
                            <th>Average</th>
                            <th>Number of evaluations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.students?.map((student, index) => (
                            <tr key={index}>
                                <td>{student.studentId}</td>
                                <td>{student.studentName}</td>
                                <td>{student.team}</td>
                                <td>{student.cooperation}</td>
                                <td>{student.conceptualContributions}</td>
                                <td>{student.practicalContributions}</td>
                                <td>{student.workEthic}</td>
                                <td>{student.average}</td>
                                <td>{student.count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SummaryResults;
