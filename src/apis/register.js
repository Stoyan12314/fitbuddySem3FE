import api from "./http-common";

const register = (data) => {
  return api.post(`/register`, data);
};

const login = (data) => {
  return api.post(`/login`, data);
};

const Service = {
  register,
  login,
};
export default Service;
