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

        console.log(
          "User data in local storage:",
          localStorage.getItem("accessToken"),
          localStorage.getItem("roles")
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
  localStorage.removeItem("user");
};
const Service = {
  register,
  login,
  logout,
};
export default Service;
