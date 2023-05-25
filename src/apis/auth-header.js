export default function authHeader() {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const role = JSON.parse(localStorage.getItem("roles"));
  console.log("The access token: " + accessToken);
  console.log("The role :" + role);
  if (accessToken && role) {
    return { Authorization: "Bearer " + accessToken };
  } else {
    return {};
  }
}
