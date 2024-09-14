import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Survey from "./pages/Survey";
import PickChallenge from "./pages/PickChallenge";
import ChallengeResult from "./pages/ChallengeResult";

function App() {
  return (
    <>
      <p>fjdksf</p>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/pickChallenge" element={<PickChallenge />} />
        <Route path="/challengeResult/:id" element={<ChallengeResult />} />
      </Routes>
    </>
  );
}

export default App;
