import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import ExercisesPage from "./pages/ExercisesPage.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import NavBar from "./components/NavBar";
function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/exercises" element={<ExercisesPage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
