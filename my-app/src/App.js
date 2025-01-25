
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import ChartComponent from "./components/ChartComponent";
import HistoryTable from "./components/HistoryTable";

function App() {
  const [model, setModel] = useState("model_1"); // Default model
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]); 

  const apiUrl = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

  // Fetch history data on component mount
  useEffect(() => {
    fetchHistory();
  }, []);

  // Fetch history from backend
  const fetchHistory = async () => {
    try {
      // const response = await axios.get("http://127.0.0.1:8000/history");
      const response = await axios.get(`${apiUrl}/history`);
      setHistory(response.data.history); 
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  // Handle text analysis submission
  const analyzeText = async (e) => {
    e.preventDefault();

    if (text.trim() === "") {
      setResult("Please enter the text properly.");
      return;
    }

    setLoading(true);
    setResult(null); // Clear previous result during loading

    try {
      // Send text to backend for analysis
      const response = await axios.post(`${apiUrl}/result/${model}`, {
        text,
      }); 
      setResult(response.data.analysis); 
      fetchHistory(); // Refresh history after new analysis
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setResult(error.response.data.detail || "Please enter the text properly.");
      } else {
        setResult("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Format historical data for charts
  const formatChartData = (modelId) => {
    const modelHistory = history.filter((entry) => entry.model_id === modelId);
    const labels = modelHistory.map((entry) => entry.analysis.label);
    const scores = modelHistory.map((entry) => entry.analysis.score);

    return {
      labels: labels,
      datasets: [
        {
          label: "Scores",
          data: scores,
          borderColor: modelId === "model_1" ? "rgba(75,192,192,1)" : "rgba(153,102,255,1)",
          fill: false,
        },
      ],
    };
  };

  // Chart features
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Model Analysis",
      },
    },
    scales: {
      y: {
        min: 0,
        max: 1,
        ticks: {
          stepSize: 0.1, 
        },
      },
    },
  };

  return (
    <div className="container">
      <h1 className="heading">Text Analysis</h1>
      <form onSubmit={analyzeText} className="form">
        {/* Model selection dropdown */}
        <label className="label">
          Choose Model:
          <select value={model} onChange={(e) => setModel(e.target.value)} className="model">
            <option value="model_1">Roberta Base Go Emotions</option>
            <option value="model_2">Bert Base Multilingual Sentiment</option>
          </select>
        </label>

        {/* Text input */}
        <label className="label">
          Enter text:
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="textInput"
            placeholder="Enter text to analyze..."
          />
        </label>

        {/* Submit Button */}
        <button type="submit" disabled={loading} className="button">
          {loading ? "Analyzing..." : "Analyze Text"}
        </button>
      </form>

      {/* Result Display */}
      {loading ? (
        <div className="loading">Loading, please wait...</div>
      ) : result && (
        <div className="result-container" style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", marginTop: "20px" }}>
          <div className="result">
            {result.label ? (
              <>
                <h2>Result:</h2>
                <p>Label: {result.label}</p>
                <p>Score: {result.score}</p>
              </>
            ) : (
              <p style={{ color: "red" }}>{result}</p> 
            )}
          </div>
        </div>
      )}

      {/* Charts */}
      <h2>Roberta Base Go Emotions Graph Analysis</h2>
      <ChartComponent chartData={formatChartData("model_1")} chartOptions={chartOptions} width="1000px" height="500px" />

      <h2>Bert Base Multilingual Sentiment Graph Analysis</h2>
      <ChartComponent chartData={formatChartData("model_2")} chartOptions={chartOptions} width="1000px" height="500px" />

      {/* History Table */}
      <HistoryTable history={history} /> {/* Pass history data as a prop */}
    </div>
  );
}

export default App;