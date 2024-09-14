import AnswerButton from "../components/AnswerButton";

const Survey = () => {
  return (
    <>
      <h1>Age?</h1>
      <div className="answer-buttons">
        <AnswerButton text="18-20" />
        <AnswerButton text="20-50" />
        <AnswerButton text="50+" />
      </div>
    </>
  );
};

export default Survey;
