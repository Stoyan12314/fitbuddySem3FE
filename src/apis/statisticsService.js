import authHeader from "./auth-header";
import api from "./http-common";

const getQuarterlyExerciseCount = (startDate, endDate) => {
  return api.get("/statistics/exerciseCount", {
    params: { startDate, endDate },
    headers: {
      ...authHeader(),
    },
  });
};

const calculateAverageExerciseIntensity = (startDate, endDate) => {
  return api.get("/statistics/exerciseIntensity", {
    params: { startDate, endDate },
    headers: {
      ...authHeader(),
    },
  });
};

const Service = {
  getQuarterlyExerciseCount,
  calculateAverageExerciseIntensity,
};

export default Service;
