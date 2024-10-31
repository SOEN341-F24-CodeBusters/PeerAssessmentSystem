// src/Components/CSVUploads.jsx

import React, { useState } from 'react';
import Papa from 'papaparse';

console.log("CSVUpload rendered");


const CSVUpload = () => {
  const [csvData, setCsvData] = useState([]);
  const [error, setError] = useState("");
  const [groupName, setGroupName] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");


  const downloadTemplate = () => {
    const csvContent = `data:text/csv;charset=utf-8,Team Name,Student 1 ID,Student 2 ID,Student 3 ID,Student 4 ID,Student 5 ID,Student 6 ID\n`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "teams_template.csv");
    document.body.appendChild(link); // Required for Firefox
    link.click();
  };

  // Handle file upload and parsing
  /*const handleFileUpload = (event) => {
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
            setError("Invalid CSV format. Ensure required columns: Team Name, Student IDs.");
          }
        },
        error: function () {
          setError("There was an issue parsing the file.");
        },
        header: true,  // Assume the first row is the header
        skipEmptyLines: true
      });
    }
  };*/

  // Function to validate the CSV data format
  /*const validateCSV = (data) => {
    const requiredFields = ["Team Name", "Student ID 1", "Student ID 2", "Student ID 3"];
    if (data.length > 0) {
      const firstRow = data[0];
      return requiredFields.every(field => field in firstRow);
    }
    return false;
  };*/

  const handleUploadCSV = async () => {
    if (!groupName) {
      setError("Please enter a group name.");
      return;
    }

    const fileInput = document.querySelector('input[type="file"]');
    const csvBlob = fileInput.files[0];
    
    const formData = new FormData();
    formData.append("file", csvBlob);
    formData.append("groupName", groupName);

    try {
      const response = await fetch("https://localhost:7010/api/Teacher/upload-csv", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (response.ok) {
        setUploadStatus("Upload successful!");
      } else {
        setUploadStatus("Upload failed. Please check the CSV format or contact support.");
      }
    } catch (error) {
      setUploadStatus("An error occurred while uploading.");
    }
  };


  return (
    <div>
      <h2>Upload Teams CSV File</h2>
      <input 
        type="text" 
        placeholder="Enter Group Name" 
        value={groupName} 
        onChange={(e) => setGroupName(e.target.value)} 
      />
      <button onClick={downloadTemplate}>Download CSV Template</button>
      <input type="file" accept=".csv"  />

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {uploadStatus && <p style={{ color: 'green' }}>{uploadStatus}</p>}

      <button onClick={handleUploadCSV}>Upload CSV</button>

      {/*{csvData.length > 0 && (
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
                  {Array.from({ length: 6 }, (_, i) => (
                    <React.Fragment key={i}>
                      <td>{row[`Student ${i + 1} ID`] || ""}</td>
                    </React.Fragment>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>*/}
    
    {csvData.length > 0 && (
        <div>
          <h3>CSV Data Preview</h3>
          <table>
            <thead>
              <tr>
                <th>Team Name</th>
                <th>Student ID 1</th>
                <th>Student ID 2</th>
                <th>Student ID 3</th>
              </tr>
            </thead>
            <tbody>
              {csvData.map((row, index) => (
                <tr key={index}>
                  <td>{row['Team Name']}</td>
                  <td>{row['Student ID 1']}</td>
                  <td>{row['Student ID 2']}</td>
                  <td>{row['Student ID 3']}</td>
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
