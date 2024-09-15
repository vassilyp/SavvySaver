import { useParams, Link, useNavigate } from "react-router-dom";

const ChallengeResult = () => {
  const { id } = useParams(); // Get the id from the URL
  const navigate = useNavigate(); // Initialize the navigate function

  // Array of messages for win and loss
  const messages = [
    {
      status: "win",
      title: "Challenge Complete!",
      pointsMessage: "Well done, warrior! You have gained 100 points!",
      bgColor: "bg-win",
      textColor: "text-black",
    },
    {
      status: "loss",
      title: "Challenge Failed :(",
      pointsMessage: "If at first don't succeed, fight more demons, hero!",
      bgColor: "bg-loss",
      textColor: "text-black",
    },
  ];

  // Find the current message based on the status
  const currentMessage = messages.find((message) => message.status === id);

  // Function to handle navigation to PickChallenge
  const handleStartNewChallenge = () => {
    navigate("/pickChallenge");
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-gray-100">
      {currentMessage ? (
        <div
          className={`${currentMessage.bgColor} p-10 rounded-lg shadow-lg text-center`}
        >
          <h2 className="text-2xl font-bold">{currentMessage.title}</h2>
          <p className="mt-4">{currentMessage.pointsMessage}</p>
          <button
            className="bg-white border p-2 mt-4"
            onClick={handleStartNewChallenge} // Add the click handler
          >
            Start New Challenge
          </button>
        </div>
      ) : (
        <div className="bg-gray-500 text-white p-10 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold">Unknown Result</h2>
          <p className="mt-4">The result is not recognized.</p>
        </div>
      )}
      <Link to="/" className="mt-8 text-blue-500 underline">
        Go back to the home page
      </Link>
    </div>
  );
};

export default ChallengeResult;
