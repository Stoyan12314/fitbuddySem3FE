import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import CreateExercise from "./pages/CreateExercise";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import Forbidden from "./pages/Forbidden/Forbidden";
import NavBar from "./components/NavBar";
import { AuthProvider } from "./context/AuthProvider";
import PersistLogin from "../src/pages/PersistLogin";
function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <AuthProvider>
          <Routes>
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />

            <Route element={<PersistLogin />}>
              <Route path="/CreateExercise" element={<CreateExercise />} />
            </Route>
            <Route path="/Forbidden" element={<Forbidden />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
