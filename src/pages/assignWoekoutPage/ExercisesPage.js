// // import React, { useState, useEffect } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import styles from "./ExercisePage.module.css";
// // import api from "../../apis/requestService";
// // import useAuth from "../../hooks/useAuth";

// // function Exercises() {
// //   const { setAuth, auth, loading } = useAuth();
// //   const { id } = useParams();
// //   const navigate = useNavigate();
// //   const [requests, setRequests] = useState([]);
// //   const [exerciseData, setExerciseData] = useState({
// //     weight: "",
// //     reps: "",
// //     exerciseId: id,
// //     date: null,
// //   });
// //   const [err, setErr] = useState("");
// //   const [popupStyle, showPopup] = useState("hide");

// //   const { weight, reps } = exerciseData;
// //   // useEffect(() => {
// //   //   setExerciseData((prevData) => ({
// //   //     ...prevData,

// //   //     exerciseId: id,
// //   //     date: new Date(),
// //   //   }));
// //   //   console.log("Auth before getting the exercises" + auth?.id);
// //   //   api.getUserExercises(auth?.id).then((response) => {
// //   //     setRequests(response.data);
// //   //     console.log("Requests: " + requests);
// //   //   });
// //   // }, [id, auth?.id]);

// //   //this one works
// //   // useEffect(() => {
// //   //   if (auth && auth.id) {
// //   //     setExerciseData((prevData) => ({
// //   //       ...prevData,
// //   //       exerciseId: id,
// //   //       date: new Date(),
// //   //     }));
// //   //     console.log("Auth before getting the exercises" + auth?.id);
// //   //     api.getUserExercises(auth?.id).then((response) => {
// //   //       setRequests(response.data);
// //   //       console.log("Requests: " + requests);
// //   //     });
// //   //   }
// //   // }, [id, auth]);

// //   useEffect(() => {
// //     setExerciseData((prevData) => ({
// //       ...prevData,
// //       exerciseId: id,
// //       date: new Date(),
// //     }));
// //     console.log("Auth before getting the exercises" + auth?.id);
// //     api
// //       .getUserExercises(auth?.id)
// //       .then((response) => {
// //         // Ensure the 'request' property exists and is an array
// //         if (response.data && Array.isArray(response.data.request)) {
// //           setRequests(response.data.request);
// //         } else {
// //           console.error("Unexpected response format: ", response.data);
// //         }
// //       })
// //       .catch((error) => {
// //         console.error("Error fetching user exercises: ", error);
// //       });
// //   }, [id, auth?.id]);

// //   const onInputChange = (e) => {
// //     setExerciseData({ ...exerciseData, [e.target.name]: e.target.value });
// //   };

// //   const onSubmit = (e) => {
// //     e.preventDefault();
// //     console.log("User id" + auth.id);
// //     const updatedExerciseData = {
// //       ...exerciseData,
// //       userId: auth.id,
// //       date: new Date(),
// //     };
// //     console.log("Updated Exercise data: " + updatedExerciseData.userId);
// //     api

// //       .createRequest(updatedExerciseData)
// //       .then((response) => {
// //         if (response.data.id) {
// //           console.log("User id before getting the exercises" + auth.id);
// //           return api.getUserExercises(auth.id);
// //         } else {
// //           throw new Error("An error occurred while creating the request.");
// //         }
// //       })
// //       .then((response) => {
// //         setRequests(response.data);

// //         setExerciseData({ ...updatedExerciseData, weight: "", reps: "" });
// //       })
// //       .catch((error) => {
// //         console.error(error);
// //         setErr("An error occurred while creating the request.");
// //       });
// //   };

// //   const popup = () => {
// //     showPopup("exercise-popup");
// //     setTimeout(() => showPopup("hide"), 3000);
// //   };

// //   return (
// //     <div className={styles.wrapper}>
// //       <div className={styles.content}>
// //         {requests.length > 0 ? (
// //           requests.map((request, index) => (
// //             <div key={index} className={styles.requestBox}>
// //               <div className={styles.requestDetails}>
// //                 <h2>{request.exercise.name}</h2>
// //                 <p>{request.exercise.description}</p>
// //               </div>
// //               <img
// //                 src={request.exercise.imageUrl}
// //                 alt={request.exercise.name}
// //               />
// //               <div className={styles.requestInfo}>
// //                 <p>Weight: {request.weight} kg</p>
// //                 <p>Reps: {request.reps}</p>
// //                 <p>Date: {new Date(request.date).toLocaleDateString()}</p>
// //               </div>
// //             </div>
// //           ))
// //         ) : (
// //           <p>No exercises assigned yet.</p>
// //         )}
// //       </div>
// //       <form onSubmit={(e) => onSubmit(e)} className={styles.exerciseForm}>
// //         <h1 className={styles.h1Text}>
// //           Set <br /> Exercise
// //         </h1>
// //         <div className={styles.inputContainer}>
// //           <label htmlFor="weight" className={styles.inputLabel}>
// //             Enter weight
// //           </label>
// //           <input
// //             id="weight"
// //             name="weight"
// //             type="number"
// //             value={weight}
// //             min="0"
// //             onChange={onInputChange}
// //             className={styles.inputBox}
// //           />
// //         </div>
// //         <div className={styles.inputContainer}>
// //           <label htmlFor="reps" className={styles.inputLabel}>
// //             Enter reps
// //           </label>
// //           <input
// //             id="reps"
// //             name="reps"
// //             type="number"
// //             value={reps}
// //             min="0"
// //             onChange={onInputChange}
// //             className={styles.inputBox}
// //           />
// //         </div>
// //         <button className={styles.exerciseBtn} type="submit">
// //           +
// //         </button>
// //         <div className={popupStyle}>
// //           <h3>{err}</h3>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // }

// // export default Exercises;
// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import styles from "./ExercisePage.module.css";
// import api from "../../apis/requestService";
// import useAuth from "../../hooks/useAuth";

// function Exercises() {
//   const { setAuth, auth, loading } = useAuth();
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [requests, setRequests] = useState([]);
//   const [exerciseData, setExerciseData] = useState({
//     weight: "",
//     reps: "",
//     exerciseId: id,
//     date: null,
//   });
//   const [err, setErr] = useState("");
//   const [popupStyle, showPopup] = useState("hide");

//   const { weight, reps } = exerciseData;

//   useEffect(() => {
//     setExerciseData((prevData) => ({
//       ...prevData,
//       exerciseId: id,
//       date: new Date(),
//     }));
//     console.log("Auth before getting the exercises" + auth?.id);
//     api
//       .getUserExercises(auth?.id)
//       .then((response) => {
//         if (response.data && Array.isArray(response.data.request)) {
//           setRequests(response.data.request);
//         } else {
//           console.error("Unexpected response format: ", response.data);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching user exercises: ", error);
//       });
//   }, [id, auth?.id]);

//   const onInputChange = (e) => {
//     setExerciseData({ ...exerciseData, [e.target.name]: e.target.value });
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();
//     console.log("User id" + auth.id);
//     const updatedExerciseData = {
//       ...exerciseData,
//       userId: auth.id,
//       date: new Date(),
//     };
//     console.log("Updated Exercise data: " + updatedExerciseData.userId);
//     api
//       .createRequest(updatedExerciseData)
//       .then((response) => {
//         if (response.data.id) {
//           console.log("User id before getting the exercises" + auth.id);
//           return api.getUserExercises(auth.id);
//         } else {
//           throw new Error("An error occurred while creating the request.");
//         }
//       })
//       .then((response) => {
//         setRequests(response.data);

//         setExerciseData({ ...updatedExerciseData, weight: "", reps: "" });
//       })
//       .catch((error) => {
//         console.error(error);
//         setErr("An error occurred while creating the request.");
//       });
//   };

//   const popup = () => {
//     showPopup("exercise-popup");
//     setTimeout(() => showPopup("hide"), 3000);
//   };

//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.content}>
//         {requests.length > 0 ? (
//           requests.map((request, index) => (
//             <div key={index} className={styles.requestBox}>
//               <div className={styles.requestInfo}>
//                 <p>Weight: {request.weight} kg</p>
//                 <p>Reps: {request.reps}</p>
//                 <p>Date: {new Date(request.date).toLocaleDateString()}</p>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No exercises assigned yet.</p>
//         )}
//       </div>

//       <form onSubmit={(e) => onSubmit(e)} className={styles.exerciseForm}>
//         <h1 className={styles.h1Text}>
//           Set <br /> Exercise
//         </h1>
//         <div className={styles.inputContainer}>
//           <label htmlFor="weight" className={styles.inputLabel}>
//             Enter weight
//           </label>
//           <input
//             id="weight"
//             name="weight"
//             type="number"
//             value={weight}
//             min="0"
//             onChange={onInputChange}
//             className={styles.inputBox}
//           />
//         </div>
//         <div className={styles.inputContainer}>
//           <label htmlFor="reps" className={styles.inputLabel}>
//             Enter reps
//           </label>
//           <input
//             id="reps"
//             name="reps"
//             type="number"
//             value={reps}
//             min="0"
//             onChange={onInputChange}
//             className={styles.inputBox}
//           />
//         </div>
//         <button className={styles.exerciseBtn} type="submit">
//           +
//         </button>
//         <div className={popupStyle}>
//           <h3>{err}</h3>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Exercises;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./ExercisePage.module.css";
import api from "../../apis/requestService";
import useAuth from "../../hooks/useAuth";

function Exercises() {
  const { setAuth, auth, loading: authLoading } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [exerciseData, setExerciseData] = useState({
    weight: "",
    reps: "",
    exerciseId: id,
    date: null,
  });
  const [err, setErr] = useState("");
  const [popupStyle, showPopup] = useState("hide");
  const [loading, setLoading] = useState(true); // New loading state

  const { weight, reps } = exerciseData;

  useEffect(() => {
    setExerciseData((prevData) => ({
      ...prevData,
      exerciseId: id,
      date: new Date(),
    }));
    console.log("Auth before getting the exercises" + auth?.id);
    api
      .getUserExercises(auth?.id)
      .then((response) => {
        if (response.data && Array.isArray(response.data.request)) {
          setRequests(response.data.request);
        } else {
          console.error("Unexpected response format: ", response.data);
        }
        setLoading(false); // Set loading to false when data is loaded
      })
      .catch((error) => {
        console.error("Error fetching user exercises: ", error);
      });
  }, [id, auth?.id]);

  const onInputChange = (e) => {
    setExerciseData({ ...exerciseData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("User id" + auth.id);
    const updatedExerciseData = {
      ...exerciseData,
      userId: auth.id,
      date: new Date(),
    };
    console.log("Updated Exercise data: " + updatedExerciseData.userId);
    api
      .createRequest(updatedExerciseData)
      .then((response) => {
        if (response.data.id) {
          console.log("User id before getting the exercises" + auth.id);
          return api.getUserExercises(auth.id);
        } else {
          throw new Error("An error occurred while creating the request.");
        }
      })
      .then((response) => {
        if (response.data && Array.isArray(response.data.request)) {
          setRequests(response.data.request);
        } else {
          console.error("Unexpected response format: ", response.data);
        }

        setExerciseData({ ...updatedExerciseData, weight: "", reps: "" });
      })
      .catch((error) => {
        console.error(error);
        setErr("An error occurred while creating the request.");
      });
  };

  const popup = () => {
    showPopup("exercise-popup");
    setTimeout(() => showPopup("hide"), 3000);
  };

  if (loading || authLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        {requests.length > 0 ? (
          [...requests].reverse().map((request, index) => (
            <div key={index} className={styles.requestBox}>
              <div className={styles.requestInfo}>
                <p>Weight: {request.weight} kg</p>
                <p>Reps: {request.reps}</p>
                <p>Date: {new Date(request.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No exercises assigned yet.</p>
        )}
      </div>

      <form onSubmit={(e) => onSubmit(e)} className={styles.exerciseForm}>
        <h1 className={styles.h1Text}>
          Set <br /> Exercise
        </h1>
        <div className={styles.inputContainer}>
          <label htmlFor="weight" className={styles.inputLabel}>
            Enter weight
          </label>
          <input
            id="weight"
            name="weight"
            type="number"
            value={weight}
            min="0"
            onChange={onInputChange}
            className={styles.inputBox}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="reps" className={styles.inputLabel}>
            Enter reps
          </label>
          <input
            id="reps"
            name="reps"
            type="number"
            value={reps}
            min="0"
            onChange={onInputChange}
            className={styles.inputBox}
          />
        </div>
        <button className={styles.exerciseBtn} type="submit">
          +
        </button>
        <div className={popupStyle}>
          <h3>{err}</h3>
        </div>
      </form>
    </div>
  );
}

export default Exercises;
