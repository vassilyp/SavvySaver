import AnswerButton from "../components/AnswerButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SubmitButton from "../components/SubmitButton";

const selectedAnswers = ["18-20", "20-50", "50+"];

const Survey = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const navigate = useNavigate();

  const handleAnswerClick = (index) => {
    setSelectedAnswer(selectedAnswers[index]);
  };

  const handleSubmit = () => {
    if (selectedAnswer) {
      console.log("Submitted answer:", selectedAnswer);
      navigate("/pickChallenge");
    } else {
      console.log("No answer selected.");
    }
  };

  return (
    <>
      <h1>Age</h1>

      <div>
        {selectedAnswers.map((answer, index) => (
          <AnswerButton
            key={index} // Use index as key (better to use a unique ID if possible)
            text={answer}
            onClick={() => handleAnswerClick(index)}
            isSelected={selectedAnswer === answer} // Determine if the button is selected
          />
        ))}
      </div>
      <SubmitButton onClick={handleSubmit} />
    </>
  );
};

export default Survey;