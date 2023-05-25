import React from "react";
import ExercisePage from "./assignWoekoutPage/ExercisesPage";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import styles from "../pages/exercisesList.module.css";
import AdminExercisePage from "./adminExercisesPage/AdminExercisePage";
function ExercisesList({ exercises }) {
  const { auth } = useAuth();
  console.log("Exercises in ExercisesList: " + exercises);
  console.log(auth.roles);

  const generateLink = (exercise) => {
    console.log("This is in the generate link" + exercise);
    console.log("the role from the auth " + auth.roles);
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
            <Link to={generateLink(exercise)}>
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

// import React from "react";
// import ExercisePage from "./assignWoekoutPage/ExercisesPage";
// import { useNavigate } from "react-router-dom";
// import useAuth from "../hooks/useAuth";

// import styles from "../pages/exercisesList.module.css"; // Import the CSS module

// function ExercisesList({ exercises }) {
//   const { auth } = useAuth();
//   console.log("Exercises in ExercisesList: " + exercises);
//   console.log(auth.roles);
//   const role = auth.roles;

//   const navigate = useNavigate();

//   const generateLink = (exercise) => {
//     return role === "ADMINISTRATION"
//       ? `/AdminExercisePage/${exercise.id}`
//       : `/ExercisePage/${exercise.id}`;
//   };

//   return (
//     <div>
//       <h2>Exercises</h2>
//       <ul className={styles["exercises-list"]}>
//         {exercises.map((exercise) => (
//           <li key={exercise.id} className={styles["exercises-list__item"]}>
//             <button onClick={() => navigate(generateLink(exercise))}>
//               <h3>{exercise.name}</h3>
//             </button>
//             <p>{exercise.description}</p>
//             <img src={exercise.imageUrl} alt={exercise.name} />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default ExercisesList;
