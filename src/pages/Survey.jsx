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
    navigate("/pickChallenge");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-lg font-bold mb-6">What is your age?</h1>
      <div className="grid grid-cols-3 gap-4 w-[90%]">

        {selectedAnswers.map((answer, index) => (
          <AnswerButton
            key={index}
            text={answer}
            onClick={() => handleAnswerClick(index)}
            isSelected={selectedAnswer === answer}
            className="px-6 py-10 text-lg font-semibold border-2 rounded-md"
          />
        ))}
      </div>
    </div>
  );
};

export default Survey;
