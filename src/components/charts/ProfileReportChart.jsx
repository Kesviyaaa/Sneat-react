// src/components/ProfileReportChart.jsx
import React from "react";
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
import { Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ProfileReportChart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"], // X-axis
    datasets: [
      {
        label: "Revenue",
        data: [5000, 7000, 6000, 8000, 7500, 9000, 10000, 9500], // Y-axis values
        borderColor: "#696cff",   // line color (Sneat theme)
        backgroundColor: "rgba(105,108,255,0.2)", // fill under line
        tension: 0.4, // smooth curve
        pointRadius: 4,
        pointBackgroundColor: "#696cff",
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // hide legend
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // remove vertical grid lines
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 2000,
        },
      },
    },
  };

  return <Line data={data} options={options} height={150} />;
};

export default ProfileReportChart;