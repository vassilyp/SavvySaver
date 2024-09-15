import { useEffect, useState } from "react";
import secrets from "../secrets.json";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import CohereFun from "../CohereFun.jsx";
import Spinner from "../components/Spinner.jsx";
import TransactionList from "../components/TransactionList.jsx";
import transactions from "../transactionData.json";
import { useLocation } from "react-router-dom";
import { useUser } from "../hooks/use-user";


const Home = () => {
  const navigate = useNavigate();
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  // var selectedChallenge = location.state?.challenge;

  const [currentChallenge, setCurrentChallenge] = useState(null);

  const {userLoading, user, surveyData, surveyLoading, goal, goalLoading} = useUser();

  // Replace with data
  const challengeComplete = true;
  const expenses = 129;
  const targetBudget = 100;

  // Format Date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  const parseChallenge = (input) => {
    if (input != undefined) {
      return input.split(":")[0].trim();
    }
  };


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

//   const handleNavigate = () => {
//     // if (challengeComplete) {
//       // Update this condition

//       // ALEXXX: change (expenses <= targetBudget) into boolean
//       if (expenses <= targetBudget) {
//         navigate("/challengeResult/win");
//       } else {
//         navigate("/challengeResult/loss");
//       }
//     // }
//   };

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

//   // Call handleNavigate when the component mounts or based on some other trigger
//   useEffect(() => {
//     handleNavigate();
//   }, []); // Adjust dependency array as needed

  const auth = getAuth(app);

  const signOutFunction = () => {
    signOut(auth);
    navigate("/login");
  };

  // useEffect to call getPoints on component mount
  useEffect(() => {
    getPoints();
  }, []);

  useEffect(() => {
    if(!goalLoading && user) {
      setCurrentChallenge(goal);
    }
  }, [goalLoading, goal])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="overflow-x-hidden">
      <div className="mb-0 w-screen h-screen grid">
        <div id="top-bar" className="flex mt-5">
          <div className="w-[33%] flex justify-start mr-5 items-center"></div>
          <div className="w-[33%] flex justify-center">
            <h1 className="rakkas-medium text-[90px] text-black">
              Savvy Saver
            </h1>
          </div>
          <div className="w-[33%] items-center justify-end flex">
            <div className="mr-12 flex bg-black text-center p-2 px-8 rounded-xl">
              <button className="text-sm text-white" onClick={signOutFunction}>
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="mb-10 mt-0 flex justify-center mr-5 items-center">
          <div className="flex bg-accentDark text-center p-2 px-8 rounded-xl">
            <h3 className="text-white text-xl">Points: {points}</h3>
          </div>
        </div>

        <div
          id="challenge-progress"
          className="w-[70%] justify-center bg-white flex shadow-md rounded-xl text-black mx-auto"
        >
          <div className="w-[80%] flex flex-col justify-center text-center mt-10 mx-auto">
            <div>
              <h2 className="mt-8 rakkas-medium text-[50px] font-bold">
                {currentChallenge ? (parseChallenge(currentChallenge.selectedChallenge)) : ""}
              </h2>

              <h2 className="text-lg rakkas-medium font-bold">
                EARN <span className="text-accentDark">100</span> POINTS
              </h2>
              <p className="mt-2 text-balance text-base">Day 1 of 7</p>

              {/* Centering the paragraph */}
              <div className="flex justify-center">
                <p className="mt-7 mb-10 text-xl rakkas-medium font-bold bg-black text-white rounded-xl w-[80%] text-center">
                  $50 out of $100 left!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          id="in-depth-report"
          className="m-16 px-10 pb-10 w-[70%] justify-center bg-white shadow-md rounded-xl text-black mx-auto ]"
        >
          <h2 className="mt-8 text-xl font-bold rakkas-bold text-center">
            Your Financial Report
          </h2>

          <CohereFun />
        </div>
        {/* Transaction List */}
        <div className="container mx-auto p-6">
          {/* <h1 className="text-3xl font-bold mb-6">Transaction History</h1> */}
          <TransactionList transactions={transactions.transactions} />
        </div>
      </div>
    </div>
  );
};

export default Home;
