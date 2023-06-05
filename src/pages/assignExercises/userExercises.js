import React, { useEffect, useState } from "react";
import { ExerciseContext } from "../../context/ExerciseContext";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

import UserService from "../../apis/userExerciseService";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

const localizer = momentLocalizer(moment);

const UserExerciseCalendar = () => {
  const navigate = useNavigate();

  const { auth } = useAuth();
  const { id: userId } = auth;
  const [assignedExercises, setAssignedExercises] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment().toDate());

  useEffect(() => {
    UserService.getAllUserExercises(userId)
      .then((response) => {
        console.log("API response:", response.data.exercise);

        const exerciseEvents = response.data.exercises.map((exercise) => {
          const start = moment(exercise.date).startOf("day").toDate();
          const end = moment(start).endOf("day").toDate();
          return {
            id: exercise.exercise.id,
            title: exercise.exercise.name,
            start,
            end,
            allDay: true,
          };
        });
        console.log("Exercise events:", exerciseEvents);
        setAssignedExercises(exerciseEvents);
      })
      .catch((error) => {
        console.log("API error:", error);
      });
  }, [userId]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleEventSelect = (event) => {
    navigate(`/ExercisePage/${event.id}`);
  };
  const CustomToolbar = ({ label }) => (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button type="button" className="rbc-btn">
          {label}
        </button>
      </span>
    </div>
  );

  return (
    <div>
      <h2>My Exercise Calendar</h2>
      <Calendar
        // onSelectEvent={(event) => alert(event.title)}
        // popup
        onSelectEvent={handleEventSelect}
        popup
        popupOffset={{ x: 30, y: 20 }}
        localizer={localizer}
        events={assignedExercises}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
        onNavigate={handleDateChange}
        components={{
          toolbar: CustomToolbar,
        }}
        views={{
          month: true,
        }}
      />
    </div>
  );
};

export default UserExerciseCalendar;
