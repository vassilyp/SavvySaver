import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { app } from './initializeFirebase';

const auth = getAuth(app);

