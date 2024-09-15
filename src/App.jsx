import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Survey from "./pages/Survey";
import PickChallenge from "./pages/PickChallenge";
import ChallengeResult from "./pages/ChallengeResult";
import { Route, Routes } from "react-router-dom";
import { AuthMiddleware } from "./middleware/auth-middleware";

function App() {

  const ProtectedRoutes = () => {
    return (
      <AuthMiddleware>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/pickChallenge" element={<PickChallenge />} />
          <Route path="/challengeResult/:id" element={<ChallengeResult />} />
        </Routes>
      </AuthMiddleware>
    );
  };
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<ProtectedRoutes />} />
      </Routes>
    </>
  );
}

export default App;
