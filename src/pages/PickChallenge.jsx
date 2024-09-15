import AnswerButton from "../components/AnswerButton";
import SubmitButton from "../components/SubmitButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


const challenges = [
  "Reduce Starbucks Spending By $100",
  "Reduce Car Spending By $100",
  "Reduce Grocery Spending By $100",
];

const PickChallenge = () => {
  const [selectedChallenge, setselectedChallenge] = useState(null);
  const navigate = useNavigate();

  const handleChallengeClick = (index) => {
    setselectedChallenge(challenges[index]);
  };

  const handleSubmit = () => {
    if (selectedChallenge) {
      console.log("Submitted answer:", selectedChallenge);
      // Use selected challenge
      navigate("/");
    } else {
      console.log("No answer selected.");
    }
  };

  return (
    <div>
      <h1>Welcome Hero!</h1>
      <h2>Pick the Villain to Vanquish:</h2>
      <div>
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