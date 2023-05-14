import React from "react";
import ExercisePage from "./assignWoekoutPage/ExercisesPage";
import { Link } from "react-router-dom";

import styles from "../pages/exercisesList.module.css"; // Import the CSS module

function ExercisesList({ exercises }) {
  console.log("Exercises in ExercisesList: " + exercises);
  return (
    <div>
      <h2>Exercises</h2>
      <ul className={styles["exercises-list"]}>
        {exercises.map((exercise) => (
          <li key={exercise.id} className={styles["exercises-list__item"]}>
            <Link to={`/ExercisePage/${exercise.id}`}>
              <h3>{exercise.name}</h3>
            </Link>
            <p>{exercise.description}</p>
            <img src={exercise.imageUrl} alt={exercise.name} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExercisesList;
