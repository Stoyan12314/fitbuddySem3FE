var navigation = [];
const setNavigation = (role) => {
  console.log("Role: " + role);
  if (!role) {
    navigation = [
      {
        id: 1,
        path: "/Login",
        text: "Login",
      },
      {
        id: 2,
        path: "/Register",
        text: "Register",
      },
    ];
  } else {
    switch (role[0]) {
      case "ADMINISTRATION":
        navigation = [
          {
            id: 1,
            path: "/users",
            text: "Users",
          },
          {
            id: 2,
            path: "/CreateExercise",
            text: "CreateExercise",
          },
          {
            id: 3,
            path: "Chatroom",
            text: "Chatroom",
          },
          {
            id: 4,
            path: "/Logout",
            text: "Logout",
          },
        ];
        break;

      case "CUSTOMER":
        navigation = [
          {
            id: 1,
            path: "/Exercises",
            text: "Exercises",
          },
          {
            id: 2,
            path: "Chatroom",
            text: "Chatroom",
          },
          {
            id: 3,
            path: "/Logout",
            text: "Logout",
          },
        ];
        break;

      case "TRAINER":
        navigation = [
          {
            id: 1,
            path: "/Exercises",
            text: "exercises",
          },
          {
            id: 2,
            path: "Chatroom",
            text: "Chatroom",
          },
          {
            id: 3,
            path: "/Logout",
            text: "Logout",
          },
        ];
        break;

      default:
        navigation = [
          {
            id: 1,
            path: "/Exercises",
            text: "Exercises",
          },
          {
            id: 2,
            path: "CreateExercise",
            text: "Create Exercise",
          },
          {
            id: 3,
            path: "/login",
            text: "Login",
          },
          {
            id: 4,
            path: "/Register",
            text: "Register",
          },
        ];
    }
  }
  return navigation;
};

export default setNavigation;
