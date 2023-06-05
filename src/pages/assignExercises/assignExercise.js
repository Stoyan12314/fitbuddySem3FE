import React, { useEffect, useContext, useState } from "react";
import ExerciseService from "../../apis/ExerciseService";
import UserService from "../../apis/userExerciseService";
import { ExerciseContext } from "../../context/ExerciseContext";
import { useParams } from "react-router-dom";
import styles from "./UserExercisePage.module.css";
import Calendar from "react-calendar";
import Modal from "react-modal";

const UserExercisePage = () => {
  const { userId } = useParams();
  const { exercises, fetchExercises } = useContext(ExerciseContext);
  const [assignedExercises, setAssignedExercises] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalIsOpen, setIsOpen] = useState(false);
  console.log("User id in assignExercise : " + userId);
  useEffect(() => {
    const adjustedDate = new Date(selectedDate);
    const timeZoneOffsetInHours = adjustedDate.getTimezoneOffset() / 60;
    adjustedDate.setHours(adjustedDate.getHours() - timeZoneOffsetInHours);
    const date = adjustedDate.toISOString().split("T")[0];
    console.log("User id in assign Exercise is + " + userId);
    fetchExercises();
    UserService.getAssignedExercises(userId, date).then((response) => {
      console.log("Reponse exercises :" + response.data.exercises);
      setAssignedExercises(response.data.exercises);
    });
  }, [userId, selectedDate]);

  const assignExercise = (exerciseId) => {
    const adjustedDate = new Date(selectedDate);
    const timeZoneOffsetInHours = adjustedDate.getTimezoneOffset() / 60;
    adjustedDate.setHours(adjustedDate.getHours() - timeZoneOffsetInHours);
    const date = adjustedDate.toISOString().split("T")[0];

    const AssignExerciseRequest = {
      userId: userId,
      exerciseId: exerciseId,
      date: date,
    };
    console.log("Date for getAssignedExercises :" + date);
    UserService.assignExerciseToUser(AssignExerciseRequest).then(() => {
      UserService.getAssignedExercises(userId, date).then((response) => {
        setAssignedExercises(response.data.exercises);
      });
    });
  };

  const unassignExercise = (exerciseId) => {
    const date = selectedDate.toISOString().split("T")[0];
    UserService.unassignExerciseFromUser(exerciseId).then(() => {
      UserService.getAssignedExercises(userId, date).then((response) => {
        setAssignedExercises(response.data.exercises);
      });
    });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsOpen(true);
  };

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.h1Text}>User Exercise Page</h1>
        <div className={styles.calendar}>
          <h2>Select a date</h2>
          <Calendar
            className={styles.reactCalendar}
            onChange={handleDateChange}
            value={selectedDate}
          />
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Assign Exercise Modal"
        >
          <div className={styles.modalContent}>
            <div className={styles.exerciseList}>
              <h2>Available Exercises</h2>
              {exercises &&
                exercises.map((exercise) => (
                  <div key={exercise.id} className={styles.requestBox}>
                    <p>{exercise.name}</p>
                    <button
                      onClick={() => {
                        assignExercise(exercise.id);
                        closeModal();
                      }}
                      className={styles.exerciseBtn}
                    >
                      +
                    </button>
                  </div>
                ))}
            </div>
            <div className={styles.exerciseList}>
              <h2>Assigned Exercises</h2>
              {assignedExercises &&
                assignedExercises.map((exercise) => (
                  <div key={exercise.id} className={styles.requestBox}>
                    <p>{exercise.exercise.name}</p>
                    <button
                      onClick={() => {
                        unassignExercise(exercise.id);
                        closeModal();
                      }}
                      className={styles.exerciseBtn}
                    >
                      -
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default UserExercisePage;
