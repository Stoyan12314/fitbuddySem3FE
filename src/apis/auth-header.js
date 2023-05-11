export default function authHeader() {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const role = JSON.parse(localStorage.getItem("roles"));

  if (accessToken && role) {
    return { Authorization: "Bearer " + accessToken };
  } else {
    return {};
  }
}
