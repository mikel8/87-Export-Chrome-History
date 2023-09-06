// Handle button click event
// document.getElementById("exportButton").addEventListener("click", exportHistory);

document.addEventListener("DOMContentLoaded", function() {
  // Code that depends on the DOM being fully loaded
  document.getElementById("exportButton").addEventListener("click", exportHistory);
});


// Export history
function exportHistory() {
  chrome.history.search({ text: "", maxResults: 1000 }, function (results) {
    const csvContent = convertToCSV(results);
    downloadCSV(csvContent, "chrome_history.csv");
  });
}

// Convert history data to CSV format
function convertToCSV(historyData) {
  let csvContent = "URL,Title,Visit Count\n";

  historyData.forEach(function (historyItem) {
    const url = historyItem.url.replace(/,/g, ""); // Remove commas from URLs
    const title = historyItem.title.replace(/,/g, ""); // Remove commas from titles
    const visitCount = historyItem.visitCount;

    const row = `${url},${title},${visitCount}\n`;
    csvContent += row;
  });

  return csvContent;
}

// Download CSV file
function downloadCSV(csvContent, filename) {
  const element = document.createElement("a");
  element.setAttribute("href", "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent));
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
