// src/Components/CSVUploads.jsx

import React, { useState } from 'react';
import Papa from 'papaparse';
import { downloadTemplate } from '../Utils/csvTemplate';  // Ensure case-sensitive path here

const CSVUpload = () => {
  const [csvData, setCsvData] = useState([]);
  const [error, setError] = useState("");

  // Handle file upload and parsing
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: function (results) {
          const parsedData = results.data;
          const isValid = validateCSV(parsedData);
          if (isValid) {
            setCsvData(parsedData);
            setError("");
          } else {
            setError("Invalid CSV format. Ensure required columns: Team Name, Class, Student Names, and IDs.");
          }
        },
        error: function () {
          setError("There was an issue parsing the file.");
        },
        header: true,  // Assume the first row is the header
        skipEmptyLines: true
      });
    }
  };

  // Function to validate the CSV data format
  const validateCSV = (data) => {
    const requiredFields = ["Team Name", "Class"];
    for (let i = 1; i <= 6; i++) {
      requiredFields.push(`Student ${i} Name`);
      requiredFields.push(`Student ${i} ID`);
    }

    if (data.length > 0) {
      const firstRow = data[0];
      return requiredFields.every(field => field in firstRow);
    }
    return false;
  };

  return (
    <div>
      <h2>Upload Teams CSV File</h2>
      <button onClick={downloadTemplate}>Download CSV Template</button>
      <input type="file" accept=".csv" onChange={handleFileUpload} />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {csvData.length > 0 && (
        <div>
          <h3>CSV Data</h3>
          <table>
            <thead>
              <tr>
                <th>Team Name</th>
                <th>Class</th>
                {Array.from({ length: 6 }, (_, i) => (
                  <React.Fragment key={i}>
                    <th>Student {i + 1} Name</th>
                    <th>Student {i + 1} ID</th>
                  </React.Fragment>
                ))}
              </tr>
            </thead>
            <tbody>
              {csvData.map((row, index) => (
                <tr key={index}>
                  <td>{row['Team Name']}</td>
                  <td>{row['Class']}</td>
                  {Array.from({ length: 6 }, (_, i) => (
                    <React.Fragment key={i}>
                      <td>{row[`Student ${i + 1} Name`] || ""}</td>
                      <td>{row[`Student ${i + 1} ID`] || ""}</td>
                    </React.Fragment>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CSVUpload;
