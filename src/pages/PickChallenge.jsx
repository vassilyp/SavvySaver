import AnswerButton from "../components/AnswerButton"

const PickChallenge = () => {
  return (
    <div>
      <h1>Welcome hero!</h1>
      <h2>Pick the Villian to Vanquish:</h2>
      <div>
        <AnswerButton text="Reduce Starbucks Spending By $100" />
        <AnswerButton text="Reduce Car Spending By $100" />
        <AnswerButton text="Reduce Grocery Spending By $100" />
      </div>
      <AnswerButton text="Submit" />
    </div>
  )
}

export default PickChallenge
