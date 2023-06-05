import authHeader from "./auth-header";
import api from "./http-common";
const get = (id) => {
  return api.get(`/exercises/${id}`);
};

const getExercisesByName = (name, page, size) => {
  const headers = {
    "Content-Type": "application/json",
    ...authHeader(),
  };

  let url = `/exercises?page=${page}&size=${size}`;

  if (name) {
    url += `&name=${name}`;
  }

  return api.get(url, { headers: headers });
};
const deleteExercise = (id) => {
  return api.delete(`/exercises/${id}`, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...authHeader(),
    },
  });
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
  getExercisesByName,
  createExercise,
};
export default Service;
