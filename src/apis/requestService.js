import authHeader from "./auth-header";
import api from "./http-common";

const getUserExercises = (id) => {
  return api.get(`/request/${id}`);
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
