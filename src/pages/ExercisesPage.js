import React, { useState } from "react";
import InputExercise from "../components/InputExercise.js";

function Exercises() {
  // This data is only present for demo purposes. Usually you obtain this through the backend.
  const exerciseData = [
    {
      id: 1,
      title: "Push ups",
    },
    {
      id: 2,
      title: "Bench press",
    },
    {
      id: 3,
      title: "Squad",
    },
  ];

  const [exercises, setExercises] = useState(exerciseData);

  const addItem = (title) => {
    const newItem = {
      id: 4,
      title: title,
    };
    setExercises([...exercises, newItem]);
  };

  return (
    <div className="container">
      <div className="inner">{/* <ExercisesPage addItem={addItem} /> */}</div>
    </div>
  );
}

export default Exercises;
