import { createContext } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { app, db } from "../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useContext, useState, useEffect } from "react";
import {collection, query, where, getDocs} from "firebase/firestore";

export const UserContext = createContext();


export const UserProvider = ({children}) => {
    const auth = getAuth(app);
    const [user, loading] = useAuthState(auth);
    const [surveyData, setSurveyData] = useState([]);
    const [surveyLoading, setSurveyLoading] = useState(true);


    useEffect(() => {


        const fetchNotes = async (userEmail) => {
    
            try {
                const resultsRef = collection(db, "survey-results");
                const q = query(resultsRef, where("email", "==", userEmail))
        
                const querySnapshot = await getDocs(q);
                const userResults = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
        
                setSurveyData(userResults);
                setSurveyLoading(false);
                console.log(`Survey Fetch ${JSON.stringify(userResults).toString()}`)
            } catch(error) {
                console.log(error);
            }
        }
        
        if(!loading && user) {
            fetchNotes(user.email);
        }
    }, [loading, user])

    return (
        <UserContext.Provider value={{loading, user, surveyData, surveyLoading}}>{children}</UserContext.Provider>
    )
}

export const useUser = () => {
    return useContext(UserContext);
}