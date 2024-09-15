import { useEffect, useState } from "react";
import secrets from "../secrets.json";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import CohereFun from "../CohereFun.jsx";
import Spinner from "../components/Spinner.jsx";

const Home = () => {
  const navigate = useNavigate();
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(false);

  // Replace with data
  const challengeComplete = false;
  const expenses = 129;
  const targetBudget = 100;

  const handleNavigate = () => {
    if (challengeComplete) {
      // Update this condition
      if (expenses <= targetBudget) {
        navigate("/challengeResult/win");
      } else {
        navigate("/challengeResult/loss");
      }
    }
  };

  // Call handleNavigate when the component mounts or based on some other trigger
  useEffect(() => {
    handleNavigate();
  }, []); // Adjust dependency array as needed

  const getPoints = async () => {
    setLoading(true);
    const response = await fetch(
      "https://paywithpretendpointsapi.onrender.com/api/v1/loyalty/37/points",
      {
        headers: {
          Authorization: `Bearer ${secrets.RBC_API_KEY}`,
        },
      }
    );
    const json = await response.json();
    console.log("response is", json);
    setPoints(json.balance);
    setLoading(false);
  };

  const auth = getAuth(app);

  const signOutFunction = () => {
    signOut(auth);
    navigate("/login");
  };

  // useEffect to call getPoints on component mount
  useEffect(() => {
    getPoints();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }
  return (
    <>
      <div className="w-screen h-screen grid">
        <div id="top-bar" className="flex mt-5">
          <div className="w-[33%] items-center flex">
            <button className="" onClick={signOutFunction}>
              Logout
            </button>
          </div>
          <div className="w-[33%] flex justify-center">
            <h1 className="rakkas-medium text-xl text-black">Savvy Saver</h1>
          </div>
          <div className="w-[33%] flex justify-end mr-5 items-center">
            <h3 className="text-lightyellow">Points: {points}</h3>
          </div>
        </div>

        <div
          id="challenge-progress"
          className="w-[70%] justify-center bg-white flex shadow-md rounded-xl text-black mx-auto"
        >
          <div className="w-[80%] flex flex-col justify-center text-center mt-10 mx-auto">
            <div>
              <h2 className="mt-8 text-xl rakkas-medium font-bold">
                Cut Down Food Spending To $30
              </h2>
              <h2 className="rakkas-medium text-base font-bold">
                EARN <span className="text-gold">35</span> POINTS
              </h2>
              <p className="mt-2 text-balance text-base">Day 1 of 7</p>

              {/* Centering the paragraph */}
              <div className="flex justify-center">
                <p className="mt-8 mb-12 text-xl rakkas-medium font-bold bg-black text-white rounded-xl w-[80%] text-center">
                  $50 out of $100 left!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          id="in-depth-report"
          className="m-16 px-10 pb-10 w-[70%] justify-center bg-white shadow-md rounded-xl text-black mx-auto "
        >
          <h2 className="mt-8 text-xl font-bold rakkas-bold text-center">
            Your Financial Report
          </h2>

          <CohereFun />
        </div>
      </div>
    </>
  );
};

export default Home;
