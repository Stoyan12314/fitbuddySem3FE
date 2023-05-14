// // import axios from "axios";

// // export default axios.create({
// //   baseURL: `http://localhost:8080`,
// // });

// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:8080",
// });

// api.interceptors.response.use(
//   (response) => {
//     // If the request was successful, simply return the response.
//     return response;
//   },
//   (error) => {
//     // If the request resulted in an error, check if it was a 401 error (unauthorized).
//     if (error.response && error.response.status === 401) {
//       // If it was, remove the user data from local storage.
//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("roles");
//       localStorage.removeItem("userId");

//       // And redirect the user to the login page.
//       window.location = "/login";
//     }

//     // If it wasn't a 401 error, or if there was no response, simply reject the promise as usual.
//     return Promise.reject(error);
//   }
// );

// export default api;
import axios from "axios";
import { useHistory } from "react-router-dom";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export default api;
