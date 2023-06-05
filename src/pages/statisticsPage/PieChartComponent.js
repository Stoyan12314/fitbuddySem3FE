import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import statisticsService from "../../apis/statisticsService";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartComponent = ({ startDate, endDate }) => {
  const [chartData, setChartData] = useState(null);
  const { getQuarterlyExerciseCount } = statisticsService;

  useEffect(() => {
    console.log("startDate : " + startDate + "endDate : " + endDate);
    getQuarterlyExerciseCount(startDate, endDate).then((response) => {
      const data = response.data;
      const labels = data.map((item) => item.exerciseName);
      const counts = data.map((item) => item.count);
      setChartData({
        labels: labels,
        datasets: [
          {
            data: counts,
            backgroundColor: [
              "Red",
              "Blue",
              "Yellow",
              "Green",
              "Purple",
              "Orange",
            ],
          },
        ],
      });
    });
  }, [startDate, endDate, getQuarterlyExerciseCount]);

  <div style={{ width: "50%", height: "50%" }}>
    <Pie data={chartData} options={{ responsive: true }} />
  </div>;
  const clearData = () => {
    setChartData(null);
  };
  return (
    chartData && (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "5rem",
        }}
      >
        <button
          onClick={clearData}
          style={{ display: "block", margin: "0 auto" }}
        >
          Clear
        </button>
        <div style={{ width: "40%", height: "40%" }}>
          <Pie data={chartData} options={{ responsive: true }} />
        </div>
      </div>
    )
  );
};

export default PieChartComponent;
