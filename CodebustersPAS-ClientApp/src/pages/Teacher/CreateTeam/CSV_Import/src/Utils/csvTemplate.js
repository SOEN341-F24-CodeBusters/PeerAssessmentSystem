// src/Utils/csvTemplate.js

export const downloadTemplate = () => {
    const csvContent = `data:text/csv;charset=utf-8,Team Name,Class,Student 1 Name,Student 1 ID,Student 2 Name,Student 2 ID,Student 3 Name,Student 3 ID,Student 4 Name,Student 4 ID,Student 5 Name,Student 5 ID,Student 6 Name,Student 6 ID\n`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "teams_template.csv");
    document.body.appendChild(link); // Required for Firefox
    link.click();
  };
  