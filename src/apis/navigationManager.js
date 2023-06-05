var navigation = [];
const setNavigation = (role) => {
  console.log("Role in Set Navigation: " + role);
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
            path: "/CreateExercise",
            text: "CreateExercise",
          },
          {
            id: 2,
            path: "/Logout",
            text: "Logout",
          },
          {
            id: 3,
            path: "/OverviewExercises",
            text: "OverviewExercises",
          },
          {
            id: 4,
            path: "/statisticsPage",
            text: "statistics",
          },
        ];
        break;

      case "CUSTOMER":
        navigation = [
          {
            id: 1,
            path: "/OverviewExercises",
            text: "Exercises",
          },
          {
            id: 2,
            path: "/StatisticsPageCus",
            text: "Statistics",
          },

          {
            id: 3,
            path: "/customerPage",
            text: "chat",
          },
          {
            id: 4,
            path: "/userExercises",
            text: "Schedule",
          },
          {
            id: 5,
            path: "/Logout",
            text: "Logout",
          },
        ];
        break;

      case "TRAINER":
        navigation = [
          {
            id: 1,
            path: "/UserList",
            text: "chat",
          },
          {
            id: 2,
            path: "/userListAssign",
            text: "User Exercises",
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
            path: "/CreateExercise",
            text: "Create Exercise",
          },
          {
            id: 2,
            path: "/Login",
            text: "Login",
          },
          {
            id: 3,
            path: "/Register",
            text: "Register",
          },
          {
            id: 4,
            path: "/Logout",
            text: "Logout",
          },
          {
            id: 5,
            path: "/OverviewExercises",
            text: "OverviewExercises",
          },
        ];
    }
  }
  return navigation;
};

export default setNavigation;
