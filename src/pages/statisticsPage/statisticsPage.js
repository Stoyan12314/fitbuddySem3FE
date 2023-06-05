import React, { useState } from "react";
import statisticsService from "../../apis/statisticsService";
import PieChartComponent from "./PieChartComponent";
import styles from "../statisticsPage/statisitcsPage.module.css";
const { getQuarterlyExerciseCount } = statisticsService;

const StatisticsPage = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  return (
    <div className={styles.statisticsContainer}>
      Distribution of exercises performed by users within a given date range
      <label>
        Start Date:
        <input type="date" value={startDate} onChange={handleStartDateChange} />
      </label>
      <label>
        End Date:
        <input type="date" value={endDate} onChange={handleEndDateChange} />
      </label>
      {startDate && endDate && (
        <PieChartComponent startDate={startDate} endDate={endDate} />
      )}
    </div>
  );
};

export default StatisticsPage;
