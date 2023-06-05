import api from "./http-common";
import authHeader from "./auth-header";

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

const getAllUsers = (page = 0, size = 10) => {
  const headers = {
    "Content-Type": "application/json",
    ...authHeader(),
  };

  return api
    .get(`/users`, { headers: headers, params: { page, size } })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error during getting all users:", error);
      throw error;
    });
};

const getUsersByEmail = (email, page, size) => {
  const headers = {
    "Content-Type": "application/json",
    ...authHeader(),
  };

  return api
    .get(`/users/getUsers`, { headers: headers, params: { email, page, size } })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error during getting users by email:", error);
      throw error;
    });
};
const getUser = (id) => {
  return api
    .get(`/users/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error during getting user:", error);
      throw error;
    });
};

const Service = {
  getUsersByEmail,
  register,
  login,
  logout,
  getAllUsers,
  getUser,
};

export default Service;
