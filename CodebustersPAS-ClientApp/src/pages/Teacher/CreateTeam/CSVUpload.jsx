// src/Components/CSVUploads.jsx

import React, { useState } from 'react';
import Papa from 'papaparse';
import config from '../../../../config';

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
      const response = await fetch(`${config.apiBaseUrl}/api/Teacher/upload-csv`, {
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


  /*return (
    <div>
      <h2 style={{ color: 'white' }}>Upload Teams CSV File</h2>
      <input 
        type="text" 
        placeholder="Enter Course Name" 
        value={groupName} 
        onChange={(e) => setGroupName(e.target.value)} 
      />
      <button onClick={downloadTemplate}>Download CSV Template</button>
      <input type="file" accept=".csv"  />

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {uploadStatus && <p style={{ color: 'green' }}>{uploadStatus}</p>}

      <button onClick={handleUploadCSV}>Upload CSV</button>

    
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
};*/
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "white" }}>Upload Teams CSV File</h2>

      {/* Group Name Input */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter Course Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          style={{
            padding: "10px",
            width: "100%",
            maxWidth: "400px",
            marginBottom: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button
          onClick={downloadTemplate}
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Download CSV Template
        </button>

        <input
          type="file"
          accept=".csv"
          style={{
            padding: "10px",
            borderRadius: "5px",
            cursor: "pointer",
            color:"black",
            backgroundColor: "#f8f9fa",
          }}
        />

        <button
          onClick={handleUploadCSV}
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Upload CSV
        </button>
      </div>

      {/* Feedback Messages */}
      {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}
      {uploadStatus && <p style={{ color: "green", fontWeight: "bold" }}>{uploadStatus}</p>}

      {/* CSV Data Preview */}
      {csvData.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>CSV Data Preview</h3>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "10px",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#007BFF", color: "white" }}>
                <th style={{ border: "1px solid #ccc", padding: "10px" }}>Team Name</th>
                <th style={{ border: "1px solid #ccc", padding: "10px" }}>Student ID 1</th>
                <th style={{ border: "1px solid #ccc", padding: "10px" }}>Student ID 2</th>
                <th style={{ border: "1px solid #ccc", padding: "10px" }}>Student ID 3</th>
              </tr>
            </thead>
            <tbody>
              {csvData.map((row, index) => (
                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#f8f9fa" : "white" }}>
                  <td style={{ border: "1px solid #ccc", padding: "10px" }}>{row["Team Name"]}</td>
                  <td style={{ border: "1px solid #ccc", padding: "10px" }}>{row["Student ID 1"]}</td>
                  <td style={{ border: "1px solid #ccc", padding: "10px" }}>{row["Student ID 2"]}</td>
                  <td style={{ border: "1px solid #ccc", padding: "10px" }}>{row["Student ID 3"]}</td>
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
