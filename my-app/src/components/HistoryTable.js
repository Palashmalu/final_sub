
import React from "react";

const HistoryTable = ({ history }) => {
  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Analysis History</h2>
      <div
        style={{
          maxHeight: "400px",
          overflowY: "auto", 
          border: "1px solid #ddd", 
          borderRadius: "8px", 
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2", position: "sticky", top: 0 }}>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Model</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Text</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Label</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Score</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry, index) => (
              <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white" }}>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{entry.model_id}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{entry.text}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{entry.analysis.label}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{entry.analysis.score.toFixed(4)}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{new Date(entry.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryTable;