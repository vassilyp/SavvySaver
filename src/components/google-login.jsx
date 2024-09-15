import { getAuth, signOut } from 'firebase/auth';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { app } from '../../initializeFirebase';
import { useState } from "react";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const GoogleLoginPage = () => {
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
        <div className="flex items-center flex-col mt-10">
            <button onClick={handleClick} className="bg-blue-500 p-4 rounded-xl text-white">Login</button>
            <p className="text-red-500">{errorMessage}</p>
        </div>
        </>
    )
}