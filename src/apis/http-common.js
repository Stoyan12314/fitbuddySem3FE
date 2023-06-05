import axios from "axios";
import { useHistory } from "react-router-dom";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export default api;
