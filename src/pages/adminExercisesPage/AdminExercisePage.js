// import { useParams, useNavigate } from "react-router-dom";
// import { useContext, useState, useEffect } from "react";
// import api from "../../apis/ExerciseService";
// import styles from "./adminExercisePage.module.css";
// import { ExerciseContext } from "../../context/ExerciseContext";
// function AdminExercisePage() {
//   const { id } = useParams();
//   const [uploadedImage, setUploadedImage] = useState(null);

//   const { fetchExercises } = useContext(ExerciseContext);

//   const navigate = useNavigate();
//   const [exercise, setExercise] = useState(null);
//   const [formData, setFormData] = useState({
//     exerciseId: id,
//     name: "",
//     description: "",
//     imageUrl: "",
//   });

//   useEffect(() => {
//     api.get(id).then((response) => {
//       console.log(JSON.stringify(response));
//       setExercise(response.data.exercise);
//       setFormData({
//         exerciseId: id,
//         name: response.data.exercise.name,
//         description: response.data.exercise.description,
//         imageUrl: response.data.exercise.imageUrl,
//       });
//     });
//   }, [id]);
//   const { name, description, imageUrl } = formData;

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleDelete = (event) => {
//     event.preventDefault();
//     console.log("Delete exercise : " + id);
//     api
//       .deleteExercise(id)
//       .then(() => {
//         return fetchExercises();
//       })
//       .then(() => {
//         navigate("/OverviewExercises");
//       })
//       .catch((error) => {
//         console.error("Error during deletion: ", error);
//       });
//   };
//   // const handleUpdate = (event) => {
//   //   event.preventDefault();

//   //   const formData = new FormData();
//   //   formData.append(
//   //     "exercise",
//   //     new Blob([JSON.stringify(exercise)], { type: "application/json" })
//   //   );
//   //   if (uploadedImage) {
//   //     formData.append("file", uploadedImage);
//   //     console.log("uploadedImage" + uploadedImage);
//   //   }

//   //   console.log("Up image: " + uploadedImage);
//   //   console.log("Updating exercise : " + id);
//   //   return api.updateExercise(id, formData);
//   // };

//   const handleUpdate = (event) => {
//     event.preventDefault();

//     const formData = new FormData();
//     console.log("Exercise in handleUpdate : " + JSON.stringify(exercise));
//     formData.append(
//       "exercise",
//       new Blob([JSON.stringify(exercise)], { type: "application/json" })
//     );

//     // formData.append("exerciseId", id);
//     // formData.append("name", name);
//     // formData.append("description", description);
//     // formData.append("imageUrl", imageUrl);

//     if (uploadedImage) {
//       formData.append("file", uploadedImage);
//       console.log("uploadedImage" + uploadedImage);
//     }

//     console.log("Up image: " + uploadedImage);
//     console.log("Updating exercise : " + id);
//     return api
//       .updateExercise(id, formData)
//       .then(() => {
//         fetchExercises();
//         navigate("/OverviewExercises");
//       })
//       .catch((error) => {
//         console.error("Error during update: ", error);
//       });
//   };

//   const onImageInputChange = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size > 1048576) {
//         alert("File size exceeds the limit of 1MB.");
//         e.target.value = null;
//       } else {
//         setUploadedImage(file);
//       }
//     }
//   };

//   if (!exercise) {
//     return <div>Loading...</div>;
//   }
//   console.log(
//     "Exercise data: " + exercise.name + "des : " + exercise.description
//   );
//   return (
//     <form className={styles["container-div"]}>
//       <div className={styles.containerAdmin}>
//         <h1>{exercise.name}</h1>
//         <p>{exercise.description}</p>
//         <img
//           className={styles.imgAdmin}
//           src={exercise.imageUrl}
//           alt={exercise.name}
//         />

//         <label>
//           Name:
//           <input
//             type="text"
//             name="name"
//             value={name}
//             onChange={handleChange}
//             className={styles.inputAdmin}
//           />
//         </label>
//         <label>
//           Description:
//           <input
//             type="text"
//             name="description"
//             value={description}
//             onChange={handleChange}
//             className={styles.inputAdmin}
//           />
//         </label>
//         <input
//           id="Image"
//           name="Image"
//           type="file"
//           placeholder="Upload Image"
//           onChange={onImageInputChange}
//           className={styles.inputAdmin}
//         />

//         <button
//           onClick={(event) => handleUpdate(event)}
//           className={styles.buttonAdmin}
//         >
//           Update
//         </button>

//         <button
//           onClick={(event) => handleDelete(event)}
//           className={styles.buttonAdmin}
//         >
//           Delete
//         </button>
//       </div>
//     </form>
//   );
// }

// export default AdminExercisePage;

import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import api from "../../apis/ExerciseService";
import styles from "./adminExercisePage.module.css";
import { ExerciseContext } from "../../context/ExerciseContext";

function AdminExercisePage() {
  const { id } = useParams();
  const [uploadedImage, setUploadedImage] = useState(null);

  const { fetchExercises } = useContext(ExerciseContext);

  const navigate = useNavigate();
  const [exercise, setExercise] = useState({
    exerciseId: id,
    name: "",
    description: "",
    imageUrl: "",
  });

  useEffect(() => {
    api.get(id).then((response) => {
      console.log(JSON.stringify(response));
      setExercise(response.data.exercise);
    });
  }, [id]);

  const handleChange = (e) => {
    setExercise({ ...exercise, [e.target.name]: e.target.value });
  };

  const handleDelete = (event) => {
    event.preventDefault();
    console.log("Delete exercise : " + id);
    api
      .deleteExercise(id)
      .then(() => {
        return fetchExercises();
      })
      .then(() => {
        navigate("/OverviewExercises");
      })
      .catch((error) => {
        console.error("Error during deletion: ", error);
      });
  };

  const handleUpdate = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append(
      "exercise",
      new Blob([JSON.stringify(exercise)], { type: "application/json" })
    );

    if (uploadedImage) {
      formData.append("file", uploadedImage);
      console.log("uploadedImage" + uploadedImage);
    }

    console.log("Updating exercise : " + id);
    return api
      .updateExercise(id, formData)
      .then(() => {
        fetchExercises();
        navigate("/OverviewExercises");
      })
      .catch((error) => {
        console.error("Error during update: ", error);
      });
  };

  const onImageInputChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1048576) {
        alert("File size exceeds the limit of 1MB.");
        e.target.value = null;
      } else {
        setUploadedImage(file);
      }
    }
  };

  if (!exercise) {
    return <div>Loading...</div>;
  }

  return (
    <form className={styles["container-div"]}>
      <div className={styles.containerAdmin}>
        <h1>{exercise.name}</h1>
        <p>{exercise.description}</p>
        <img
          className={styles.imgAdmin}
          src={exercise.imageUrl}
          alt={exercise.name}
        />

        <label>
          Name:
          <input
            type="text"
            name="name"
            value={exercise.name}
            onChange={handleChange}
            className={styles.inputAdmin}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={exercise.description}
            onChange={handleChange}
            className={styles.inputAdmin}
          />
        </label>
        <input
          id="Image"
          name="Image"
          type="file"
          placeholder="Upload Image"
          onChange={onImageInputChange}
          className={styles.inputAdmin}
        />

        <button onClick={handleUpdate} className={styles.buttonAdmin}>
          Update
        </button>

        <button onClick={handleDelete} className={styles.buttonAdmin}>
          Delete
        </button>
      </div>
    </form>
  );
}

export default AdminExercisePage;
