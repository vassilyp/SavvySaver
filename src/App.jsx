import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Survey from "./pages/Survey";
import PickChallenge from "./pages/PickChallenge";
import ChallengeResult from "./pages/ChallengeResult";
import { Route, Routes } from "react-router-dom";
import CohereFun from "./CohereFun.jsx";
import { AuthMiddleware } from "./middleware/auth-middleware";
import { UserProvider } from "./hooks/use-user";
import { CheckGoal } from "./utils/CheckGoal";
import { useEffect } from "react";


function App() {

  const {isLoading, isGoalReached} = CheckGoal();

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
    <UserProvider>
    <Routes>
        <Route path="/*" element={<ProtectedRoutes />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </UserProvider>
    </>
  );
}

export default App;
