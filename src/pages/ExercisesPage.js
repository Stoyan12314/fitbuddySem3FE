import React, { useState } from "react";
import InputExercise from "../components/InputExercise.js";
function Exercises(exer) {
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
      <div className="inner">{<exercises />}</div>
    </div>
  );
}

export default Exercises;
