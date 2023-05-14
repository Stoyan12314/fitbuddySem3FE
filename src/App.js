import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import CreateExercise from "./pages/CreateExercisePage/CreateExercise";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import Logout from "./pages/Logout";
import Forbidden from "./pages/Forbidden/Forbidden";
import NavBar from "./components/NavBar";
import { AuthProvider } from "./context/AuthProvider";
import PersistLogin from "../src/pages/PersistLogin";
import OverviewExercises from "../src/pages/OverviewExercises";
import ExercisePage from "./pages/assignWoekoutPage/ExercisesPage";
import PrivateRoute from "./pages/PrivateRoute";
function App() {
  return (
    <div className="App">
      <Router>
        {/* <AuthProvider> */}
        <NavBar />
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />

          <Route path="/Logout" element={<Logout />} />

          {/* <Route element={<PersistLogin />}> */}
          <Route path="/CreateExercise" element={<CreateExercise />} />
          <Route path="/ExercisePage/:id" element={<ExercisePage />} />

          <Route path="/OverviewExercises" element={<OverviewExercises />} />
          {/* </Route> */}

          <Route path="/Forbidden" element={<Forbidden />} />
        </Routes>
        {/* </AuthProvider> */}
      </Router>
    </div>
  );
}

export default App;
