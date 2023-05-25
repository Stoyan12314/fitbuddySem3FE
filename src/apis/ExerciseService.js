import authHeader from "./auth-header";
import api from "./http-common";
const get = (id) => {
  return api.get(`/exercises/${id}`);
};

const getAll = () => {
  return api.get("/exercises");
};

const deleteExercise = (id) => {
  return api.delete(`/exercises/${id}`);
};

const updateExercise = (exerciseId, data) => {
  console.log("Id in the updateExercise :" + exerciseId);
  return api.put(`/exercises/${exerciseId}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...authHeader(),
    },
  });
};

const createExercise = (data) => {
  return api.post(`/exercises`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...authHeader(),
    },
  });
};
const Service = {
  deleteExercise,
  updateExercise,
  get,
  getAll,
  createExercise,
};
export default Service;
