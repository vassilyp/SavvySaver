import {useState, useEffect} from "react";
import {collection, query, where, getDocs} from "firebase/firestore";
import { db } from "../../firebaseConfig";

export const useSurveyResults = (userEmail) => {
    const [surveyResults, setSurveyResults] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchNotes = async () => {

            setLoading(true);
    
            try {
                const resultsRef = collection(db, "survey-results");
                const q = query(resultsRef, where("email", "==", userEmail))
        
                const querySnapshot = await getDocs(q);
                const userResults = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
        
                setSurveyResults(userResults);
                console.log(`Survey Fetch ${JSON.stringify(userResults).toString()}`)
            } catch(error) {
                setError(error.message);
                console.log(error);
            }
            setLoading(false);
        }
        fetchNotes();
    }, [userEmail])

    return {surveyResults, loading, error};
}