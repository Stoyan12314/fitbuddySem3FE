import api from "./http-common";

const register = (data) => {
  return api.post(`/register`, data);
};

const login = (user) => {
  return api
    .post(`/login`, user)
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem(
          "accessToken",
          JSON.stringify(response.data.accessToken)
        );
        localStorage.setItem("roles", JSON.stringify(response.data.roles));
        localStorage.setItem("id", JSON.stringify(response.data.userId));
        console.log(
          "User data in local storage:",
          localStorage.getItem("accessToken"),
          localStorage.getItem("roles"),
          localStorage.getItem("id")
        );
      }
      return response.data;
    })
    .catch((error) => {
      console.error("Error during login:", error);
      throw error;
    });
};

const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("roles");
};
const Service = {
  register,
  login,
  logout,
};
export default Service;
