import authHeader from "./auth-header";
import api from "./http-common";
const get = (id) => {
  return api.get(`/exercises/${id}`);
};

const getAll = () => {
  return api.get("/exercises");
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
  get,
  getAll,
  createExercise,
};
export default Service;
