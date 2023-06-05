import authHeader from "./auth-header";
import api from "./http-common";

const getUserExercises = (userId, exerciseId) => {
  return api.get(`/request/${userId}/exercises/${exerciseId}`);
};
const createRequest = (request) => {
  return api.post("/request", request, { headers: authHeader() });
};

const deleteRequest = (id) => {
  return api.delete(`/request/${id}`);
};
const Service = {
  getUserExercises,
  createRequest,
  deleteRequest,
};
export default Service;
