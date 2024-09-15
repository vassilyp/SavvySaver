import AnswerButton from "../components/AnswerButton";
import SubmitButton from "../components/SubmitButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CohereClient } from "cohere-ai";
import secrets from "../secrets.json";
import Spinner from "../components/Spinner";
import transactions from '../transactionData.json'; 
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import { useUser } from "../hooks/use-user";
import { db } from "../../firebaseConfig";

// const challenges = [
//   "Reduce Starbucks Spending By $100",
//   "Reduce Car Spending By $100",
//   "Reduce Grocery Spending By $100",
// ];

const PickChallenge = () => {
  const trans = JSON.stringify(transactions);
  const [selectedChallenge, setselectedChallenge] = useState(null);
  const navigate = useNavigate();
  const [challenges, setChallengeTitles] = useState([]);
  const [loading, setLoading] = useState(false);
  const PREAMBLE =
    "You are a financial advisor at the most prestigious financial institution and sharing your knowledge with a youth that wants to get support with their budgeting and investing. Use your general knowledge, do not refer to the documents.";
  const CHALLENGE_TITLES_PROMPT = `Please provide three key areas I need to work on based on my spending habits. Label them 1. 2. 3. Each key area must be one concise sentence. Please make specific references to my latest transactions: ${trans}`

  const {userLoading, user} = useUser();

  const handleChallengeClick = (index) => {
    setselectedChallenge(challenges[index]);
  };


  const handleSubmit = async () => {
    if (selectedChallenge) {
      console.log("Submitted answer:", selectedChallenge);

        const timeStamp = serverTimestamp();
    
    
        try {
          await addDoc(collection(db, "challenges"), {
            email: user.email,
            timeStamp: timeStamp,
            selectedChallenge: selectedChallenge
    
          })
        } catch(error) {
          console.log(error);
        }
    
      
    
      // Use selected challenge
      navigate("/", { state: { challenge: selectedChallenge } });
    } else {
      console.log("No answer selected.");
    }
  };

  const parseNumberedResponse = (input) => {
    // Split the input based on the pattern: number followed by period and space (e.g., "1. ", "2. ")
    const items = input
      .split(/\d+\.\s+/)
      .filter(
        (item) =>
          item.trim() !== "" &&
          !item
            .trim()
            .includes(
              "Based on your latest transactions, here are three key areas you should focus on:"
            )
      );

    return items.map((item) => item.trim());
  };

  // Define generateGoal as a function
  const generateChallengeTitles = async () => {
    setLoading(true);
    const cohere = new CohereClient({
      token: secrets.COHERE_API_KEY,
    });

    const response = await cohere.chat({
      message: CHALLENGE_TITLES_PROMPT,
      model: "command-r-plus",
      preamble: PREAMBLE,
    });

    setChallengeTitles(parseNumberedResponse(response.text));
    setLoading(false);
  };

  useEffect(() => {
    generateChallengeTitles();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center text-center">
      <h1 className="text-[120px] text-accentDark rakkas-medium">
        Welcome, Hero!
      </h1>
      <h2 className="mb-5 text-lg">Pick the Villain to Vanquish:</h2>
      <div className="flex flex-row m-8">
        {challenges.map((challenge, index) => (
          <AnswerButton
            key={index} // Use index as key (consider using a unique ID if available)
            text={challenge}
            onClick={() => handleChallengeClick(index)}
            isSelected={selectedChallenge === challenge} // Pass challenge to handle click
          />
        ))}
      </div>
      <SubmitButton onClick={handleSubmit} />
    </div>
  );
};

export default PickChallenge;
