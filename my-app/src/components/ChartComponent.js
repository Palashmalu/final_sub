


import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


// component
const ChartComponent = ({ chartData, chartOptions, width, height }) => {
  return (
    <div style={{ width: width, height: height, margin: "0 auto", padding: "10px" }}>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default ChartComponent;