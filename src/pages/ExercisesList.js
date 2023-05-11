import React from "react";

function ExercisesList({ exercises }) {
  return (
    <div>
      <h2>Exercises</h2>
      <ul>
        {exercises.map((exercise) => (
          <li key={exercise.id}>
            <h3>{exercise.name}</h3>
            <p>{exercise.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExercisesList;
