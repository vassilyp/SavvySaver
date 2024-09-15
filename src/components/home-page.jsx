import { getAuth, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { app, db } from '../../initializeFirebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import { useState, useEffect } from 'react';
import { useUserNotes } from '../hooks/retrieve-notes';


export const HomePage = () => {
    const auth = getAuth(app);

    const [user, loading] = useAuthState(auth);
    const [note, setNote] = useState("");
    const { notes, notesLoading, error } = useUserNotes(user.email);

    const [localNotes, setLocalNotes] = useState([]);


    useEffect(() => {
        if (notes && !notesLoading) {
          setLocalNotes(notes);
        }
      }, [notes, notesLoading]);

    if(loading || notesLoading) {
        return (
            <div className="text-center mt-10">Loading...</div>
        )
    }


    const addNote = async (e) => 
        {
        e.preventDefault();
        try {
            const timeStamp = serverTimestamp();
            const docRef = await addDoc(collection(db, "notes"), {
            userEmail: user.email,
            note,
            createdAt: timeStamp,
            })
            const newNote = {
                id: docRef.id,
                note: note,
                userEmail: user.email,
                createdAt: timeStamp,
            }
            setLocalNotes([newNote, ...localNotes])
            setNote('');
            console.log("Written in docref with ", docRef.id);
        } catch(error) {
            console.log(error);
        }
        }

    const signOutFunction = () => {
        signOut(auth);
        navigate("/login");
    }

    return (
        <>
            <div className="flex items-center flex-col">
                <h1>Hello {user.displayName.split(' ')[0]}</h1>
                <button className="text-white bg-blue-500 p-4 rounded-md" onClick={signOutFunction}>Sign Out</button>
            </div>
            <div className="mt-10">
                <form onSubmit={addNote} className="flex flex-col items-center space-y-3">
                    <input value={note} onChange={(e) => setNote(e.target.value)} className="p-3 border border-gray-500 rounded-md" type="text" required placeholder="Note..."/>
                    <button className="bg-blue-500 p-3 rounded-xl text-white" type="submit">Add Note</button>
                </form>
            </div>
            <div className="flex flex-col items-center space-y-3 mt-10">
                {localNotes.map((note) => (
                    <li key={note.id}>
                        {note.note}
                    </li>
                ))}
            </div>
        </>
    )
}