// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGp43x7RweeqBZp9MTVgeSjL0kMSACv_I",
  authDomain: "budget-tracker-4b5e6.firebaseapp.com",
  projectId: "budget-tracker-4b5e6",
  storageBucket: "budget-tracker-4b5e6.appspot.com",
  messagingSenderId: "646828502483",
  appId: "1:646828502483:web:c176afed43d6dfe6e75326"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db, app}

