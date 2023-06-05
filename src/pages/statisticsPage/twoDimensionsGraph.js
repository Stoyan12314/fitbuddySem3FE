import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import statisticsService from "../../apis/statisticsService";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const BarChartComponent = ({ startDate, endDate }) => {
  const [chartData, setChartData] = useState(null);
  const { getExerciseIntensity } = statisticsService;

  useEffect(() => {
    statisticsService
      .calculateAverageExerciseIntensity(startDate, endDate)
      .then((response) => {
        const data = response.data;
        const labels = data.map((item) => item.exerciseName);
        const averageWeights = data.map((item) => item.averageWeight);
        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Exercise Intensity",
              data: averageWeights,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
      });
  }, [startDate, endDate, getExerciseIntensity]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <button onClick={() => setChartData(null)}>Clear</button>
      <div style={{ width: "50%", height: "50%" }}>
        {chartData && <Bar data={chartData} options={{ responsive: true }} />}
      </div>
    </div>
  );
};

export default BarChartComponent;
