import { createContext } from "react";
import { getAuth } from "firebase/auth";
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
    const [goal, setGoal] = useState(null);
    const [goalLoading, setGoalLoading] = useState(true);

    console.log(loading);


    useEffect(() => {


        const fetchGoal = async (userEmail) => {
            try {
                const resultsRef = collection(db, "challenges");
                const q = query(resultsRef, where("email", "==", userEmail))
                const querySnapshot = await getDocs(q);
                const userResults = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
                setGoal(userResults[0]);
            } catch(error) {
                console.log(error);
            } finally {
                setGoalLoading(false);
            }
        }


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
                console.log(`Challenge fetch ${JSON.stringify(userResults).toString()}`)
            } catch(error) {
                console.log(error);
            }
        }
        
        if(!loading && user) {
            fetchNotes(user.email);
            fetchGoal(user.email);
        }
    }, [loading, user])

    return (
        <UserContext.Provider value={{loading, user, surveyData, surveyLoading, goal, goalLoading}}>{children}</UserContext.Provider>
    )
}

export const useUser = () => {
    return useContext(UserContext);
}