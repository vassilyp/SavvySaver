const AnswerButton = ({ text, onClick, isSelected }) => {
  const buttonStyle = {
    color: isSelected ? 'white' : 'black', // Change text color when selected
    backgroundColor: isSelected ? 'red' : '#f1f1f1', // Change background color when selected
    padding: '10px', // Add padding around the button
    margin: '5px', // Add margin between buttons
    border: isSelected ? '2px solid darkred' : '2px solid black', // Border color based on selection
    cursor: 'pointer', // Pointer cursor for clickable effect
    transition: 'all 0.3s ease', // Smooth transition for styles
  };

  return (
    <button style={buttonStyle} onClick={onClick}>
      {text}
    </button>
  );
};

export default AnswerButton;