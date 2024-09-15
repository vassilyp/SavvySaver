import GoogleButton from "react-google-button";
import { app } from "../../firebase-initialize";
import { getAuth } from 'firebase/auth';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


const Login = () => {

  const auth = getAuth(app);

  const navigate = useNavigate();


  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClick = () => {
      signInWithGoogle();
  }

  useEffect(() => {
      if(!loading && error) {
          setErrorMessage(error.message);
      }

      if(!loading && user) {
          navigate("/");
      }
  }, [loading, error, user])
  return (
    <>

    <div className="flex flex-col mt-10 items-center">
    <div className="flex flex-col mt-10 items-center justify-center w-[300px] h-[400px] border rounded-md shadow-xl">
      <div>
      <GoogleButton
        onClick={handleClick}
      />
      <p className="text-center text-red-500">{errorMessage}</p>
      </div>
    </div>
    </div>
    </>
  );
};

export default Login;
