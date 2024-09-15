const SubmitButton = ({ onClick }) => { // Destructure props to get onClick
    return (
    <div className="flex w-full justify-center">
      <button className="mr-12 flex bg-accentDark text-center p-2 px-8 rounded-xl" onClick={onClick}>
        <p className="text-white">Submit</p>
      </button>
    </div>
  );
};

export default SubmitButton;
