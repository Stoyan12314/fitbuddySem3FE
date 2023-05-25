import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../apis/ExerciseService";
import styles from "./adminExercisePage.module.css";

function AdminExercisePage() {
  const { id } = useParams();
  const [uploadedImage, setUploadedImage] = useState(null);

  const navigate = useNavigate();
  const [exercise, setExercise] = useState(null);
  const [formData, setFormData] = useState({
    exerciseId: id,
    name: "",
    description: "",
    imageUrl: "",
  });

  useEffect(() => {
    api.get(id).then((response) => {
      console.log(JSON.stringify(response));
      setExercise(response.data.exercise);
      setFormData({
        exerciseId: id,
        name: response.data.exercise.name,
        description: response.data.exercise.description,
        imageUrl: response.data.exercise.imageUrl,
      });
    });
  }, [id]);
  const { name, description, imageUrl } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const exId = id;
    const updatedExerciseData = new FormData();

    const exerciseData = {
      id: id,
      name: formData.name,
      description: formData.description,
      imageUrl: formData.imageUrl,
    };

    updatedExerciseData.append(
      "exercise",
      new Blob([JSON.stringify(exerciseData)], { type: "application/json" })
    );

    if (uploadedImage) {
      updatedExerciseData.append("file", uploadedImage);
    }
    console.log("Up image: " + uploadedImage);
    api.updateExercise(exId, updatedExerciseData).then((response) => {
      setExercise(response.data);
      navigate("/OverviewExercises");
    });
  };

  const handleDelete = () => {
    api.deleteExercise(id).then(() => {
      navigate("/OverviewExercises");
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
  console.log(
    "Exercise data: " + exercise.name + "des : " + exercise.description
  );
  return (
    <form onSubmit={(e) => onSubmit(e)} className={styles["container-div"]}>
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
            value={name}
            onChange={handleChange}
            className={styles.inputAdmin}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={description}
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
        <button type="submit" className={styles.buttonAdmin}>
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
