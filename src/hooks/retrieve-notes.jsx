import {useState, useEffect} from "react";
import {collection, query, where, getDocs} from "firebase/firestore";
import { db } from "../../initializeFirebase";

export const useUserNotes = (userEmail) => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchNotes = async () => {

            setLoading(true);
    
            try {
                const notesRef = collection(db, "notes");
                const q = query(notesRef, where("userEmail", "==", userEmail))
        
                const querySnapshot = await getDocs(q);
                const userNotes = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
        
                setNotes(userNotes);
            } catch(error) {
                setError(error.message);
                console.log(error);
            }
    
            setLoading(false);
        }
        fetchNotes();
    }, [userEmail])

    return {notes, loading, error};
}