import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ExercisesList from "./ExercisesList";
import api from "../apis/ExerciseService.js";

function ExercisesPage() {
  const [exercise, setExercises] = useState(null);

  useEffect(() => {
    api.getAll().then((response) => {
      setExercises(response.data);
    });
  }, []);

  if (!exercise) return <div>No exercises</div>;

  return <ExercisesList exercises={exercise.exercises} />;
}
export default ExercisesPage;
