import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import CreateExercise from "./pages/CreateExercisePage/CreateExercise";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import Forbidden from "./pages/Forbidden/Forbidden";
import NavBar from "./components/NavBar";
import { AuthProvider } from "./context/AuthProvider";
import PersistLogin from "../src/pages/PersistLogin";
import OverviewExercises from "../src/pages/OverviewExercises";
import ExercisePage from "./pages/assignWoekoutPage/ExercisesPage";
import PrivateRoute from "./pages/PrivateRoute";
import StatisticsPage from "./pages/statisticsPage/statisticsPage";
import StatisticsPageCus from "./pages/statisticsPage/statisticsPageCus";
import AdminExercisePage from "./pages/adminExercisesPage/AdminExercisePage";
import TrainerPage from "./pages/ChatFunctions/trainerPage";
import UserList from "./pages/ChatFunctions/UserList";
import CustomerChat from "./pages/ChatFunctions/customerPage";
import AssignExercise from "./pages/assignExercises/assignExercise";
import UserListAssign from "./pages/assignExercises/userListAssign";
import UserExercises from "./pages/assignExercises/userExercises";
function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />

          <Route path="/Logout" element={<Logout />} />

          <Route path="/CreateExercise" element={<CreateExercise />} />
          <Route path="/ExercisePage/:id" element={<ExercisePage />} />
          <Route
            path="/AdminExercisePage/:id"
            element={<AdminExercisePage />}
          />
          <Route path="/UserList" element={<UserList />} />

          <Route path="/customerPage/" element={<CustomerChat />} />

          <Route path="/trainerPage/:id" element={<TrainerPage />} />
          <Route path="/assignExercise/:userId" element={<AssignExercise />} />
          <Route path="/userExercises" element={<UserExercises />} />
          <Route path="/userListAssign" element={<UserListAssign />} />

          <Route path="/statisticsPageCus" element={<StatisticsPageCus />} />
          <Route path="/statisticsPage" element={<StatisticsPage />} />
          <Route path="/OverviewExercises" element={<OverviewExercises />} />

          <Route path="/Forbidden" element={<Forbidden />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
