import { app } from '../../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

export const AuthMiddleware = ({children}) => {

    const navigate = useNavigate();

    const auth = getAuth(app);


    const [user, loading] = useAuthState(auth);


    useEffect(() => {
        if(!loading && !user) {
            navigate("/login");
        }
    }, [loading, user, navigate])


    if (loading) {
        return <div>Loading...</div>;
      }
    
    return user ? <>{children}</> : null;
}
