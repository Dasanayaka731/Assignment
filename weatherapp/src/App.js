import LoginPage from "./pages/LoginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./components/HomePage";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" Component={LoginPage} />
          <Route exact path="/register" Component={RegisterPage} />
          <Route exact path="/home" Component={HomePage} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
