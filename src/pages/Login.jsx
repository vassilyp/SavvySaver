import GoogleButton from "react-google-button";

const Login = () => {
  return (
    <>
    <h1>Sign in!</h1>
      <GoogleButton
        onClick={() => {
          console.log("Google button clicked");
        }}
      />
    </>
  );
};

export default Login;
