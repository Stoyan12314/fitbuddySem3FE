import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import styles from "../pages/exercisesList.module.css";

function ExercisesList({ exercises }) {
  const { auth } = useAuth();

  const generateLink = (exercise) => {
    return auth.roles[0] === "ADMINISTRATION"
      ? `/AdminExercisePage/${exercise.id}`
      : `/ExercisePage/${exercise.id}`;
  };

  return (
    <div>
      <h2>Exercises</h2>
      <ul className={styles["exercises-list"]}>
        {exercises.map((exercise) => (
          <li key={exercise.id} className={styles["exercises-list__item"]}>
            <Link
              to={generateLink(exercise)}
              className={styles["exercise-link"]}
            >
              <h3>{exercise.name}</h3>
              <p>{exercise.description}</p>
              <img src={exercise.imageUrl} alt={exercise.name} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExercisesList;
