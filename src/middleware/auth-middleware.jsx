import { app } from '../../firebaseConfig';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/use-user';

export const AuthMiddleware = ({children}) => {

    const navigate = useNavigate();

    const {loading, user, surveyData, surveyLoading} = useUser();

    useEffect(() => {
        if(!loading && !user) {
            navigate("/login");
        }

        if(!surveyLoading && !loading && user && (surveyData.length === 0 || !surveyData)) {
            navigate("/survey")
        }
    }, [loading, surveyLoading, user])


      if (loading || surveyLoading) {
        return <div>Loading...</div>;
    }
    return user ? <>{children}</> : null;
}