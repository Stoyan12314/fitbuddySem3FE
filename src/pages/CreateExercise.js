import * as React from "react";
import "./CreateExerciseModule.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import api from "../apis/ExerciseService";
function CreateExercisePage() {
  let navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const authToken = localStorage.getItem("accessToken");
    const userRole = localStorage.getItem("roles");
    if (authToken && userRole) {
      setAuth({ accessToken: authToken, roles: [userRole] });
    } else {
      navigate("/Login");
    }
  }, []);

  const [uploadedImage, setUploadedImage] = useState(null);
  const onImageInputChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(file);
    }
  };

  const role = auth.userRole;

  useEffect(() => {
    if (!role) {
      console.log("no role");
      navigate("/login");
    } else {
      if (role[0] !== "ADMINISTRATION") {
        console.log("/wrong role");
        navigate("/Forbidden");
      }
    }
  }, []);

  const [message, setMessage] = useState("");

  const [exercise, setExercise] = useState({
    name: "",
    description: "",
  });
  const { name, description } = exercise;

  const onInputChange = (e) => {
    setExercise({ ...exercise, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(auth);
    console.log(exercise);

    const formData = new FormData();
    formData.append(
      "exercise",
      new Blob([JSON.stringify(exercise)], { type: "application/json" })
    );
    if (uploadedImage) {
      formData.append("file", uploadedImage);
    }

    api
      .createExercise(formData)
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          setMessage("Your request has been submitted successfully!");
        } else {
          setMessage("An error occurred while creating the exercise!");
        }
      })
      .catch((err) =>
        setMessage("All fields must be filled in. Please, try again.")
      );
  };

  return (
    <form onSubmit={(e) => onSubmit(e)} className="cover">
      <h1>Exercise name</h1>
      <input
        id="ExerciseName"
        name="name"
        type="text"
        placeholder="Exercise name"
        value={name}
        onChange={onInputChange}
      />
      <h1>Description</h1>
      <input
        id="Description"
        name="description"
        type="text"
        placeholder="Description"
        value={description}
        onChange={onInputChange}
      />
      <input
        id="Image"
        name="Image"
        type="file"
        placeholder="Upload Image"
        onChange={onImageInputChange}
      />

      <button className="login-btn" type="submit">
        Save
      </button>
    </form>
  );
}

export default CreateExercisePage;
