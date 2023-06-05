import authHeader from "./auth-header";
import api from "./http-common";

const getAssignedExercises = (userId, date) => {
  return api.get(`/userExercises/${userId}?date=${date}`, {
    headers: {
      ...authHeader(),
    },
  });
};

const assignExerciseToUser = (AssignExerciseRequest) => {
  return api.post("/userExercises", AssignExerciseRequest, {
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
  });
};

const unassignExerciseFromUser = (exerciseId) => {
  return api.delete(`/userExercises/${exerciseId}`, {
    headers: {
      ...authHeader(),
    },
  });
};

const getAllUserExercises = (userId) => {
  return api.get(`/userExercises/${userId}/all`, {
    headers: {
      ...authHeader(),
    },
  });
};

const Service = {
  getAssignedExercises,
  assignExerciseToUser,
  unassignExerciseFromUser,
  getAllUserExercises,
};

export default Service;
