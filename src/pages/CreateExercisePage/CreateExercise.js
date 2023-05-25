import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import api from "../../apis/ExerciseService";
import styles from "./CreateExercise.module.css";

function CreateExercisePage() {
  const navigate = useNavigate();
  const { auth, setAuth, loading } = useAuth();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [message, setMessage] = useState("");
  const [exercise, setExercise] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (!loading) {
      if (!auth || !auth.roles || auth.roles.length === 0) {
        console.log("No role found");
        navigate("/Login");
      } else if (auth.roles[0] !== "ADMINISTRATION") {
        console.log("Wrong role");
        navigate("/Forbidden");
      }
    }
  }, [auth, navigate, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

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

  const { name, description } = exercise;

  const onInputChange = (e) => {
    setExercise({ ...exercise, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name || !description || !uploadedImage) {
      setMessage("Please fill in all the required fields.");
      return;
    }
    console.log(auth);
    console.log(exercise);

    const formData = new FormData();
    formData.append(
      "exercise",
      new Blob([JSON.stringify(exercise)], { type: "application/json" })
    );
    if (uploadedImage) {
      formData.append("file", uploadedImage);
      console.log("uploadedImage" + uploadedImage);
    }
    console.log("Form data:" + formData.exercise);
    api
      .createExercise(formData)
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          setMessage("Your request has been submitted successfully!");
          navigate("/OverviewExercises");
        } else {
          setMessage("An error occurred while creating the exercise!");
        }
      })
      .catch((err) =>
        setMessage("All fields must be filled in. Please, try again.")
      );
  };

  return (
    <form onSubmit={(e) => onSubmit(e)} className={styles["container-div"]}>
      <h1>Exercise name</h1>
      <input
        id="ExerciseName"
        name="name"
        type="text"
        placeholder="Exercise name"
        value={name}
        onChange={onInputChange}
        className={styles["input-field"]}
      />
      <h1>Description</h1>
      <input
        id="Description"
        name="description"
        type="text"
        placeholder="Description"
        value={description}
        onChange={onInputChange}
        className={styles["input-field"]}
      />
      <input
        id="Image"
        name="Image"
        type="file"
        placeholder="Upload Image"
        onChange={onImageInputChange}
        className={styles["input-field"]}
      />

      <button className={styles["auth-btn"]} type="submit">
        Save
      </button>
      <p className={styles.message}>{message}</p>
    </form>
  );
}

export default CreateExercisePage;
