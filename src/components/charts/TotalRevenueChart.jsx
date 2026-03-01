import React from "react";
import Chart from "react-apexcharts";

const TotalRevenueChart = () => {
  const options = {
    chart: {
      id: "total-revenue",
      type: "bar",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    xaxis: {
      categories: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ],
      labels: {
        style: { colors: "#6e6b7b", fontSize: "12px" },
      },
    },
    yaxis: {
      labels: {
        formatter: (val) => `$${val}k`,
        style: { colors: "#6e6b7b", fontSize: "12px" },
      },
    },
    dataLabels: { enabled: false },
    grid: { borderColor: "#e7e7e7" },
    colors: ["#7367f0"], // primary color
  };

  const series = [
    {
      name: "Revenue",
      data: [10, 15, 12, 18, 25, 20, 30, 28, 35, 40, 38, 45], // your revenue numbers
    },
  ];

  return (
    <Chart options={options} series={series} type="bar" height={300} />
  );
};

export default TotalRevenueChart;