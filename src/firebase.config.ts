import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFOsorayeHfPuCX0yNkE9BMesOtsZaj4I",
  authDomain: "omsu-schedule.firebaseapp.com",
  projectId: "omsu-schedule",
  storageBucket: "omsu-schedule.appspot.com",
  messagingSenderId: "905148206944",
  appId: "1:905148206944:web:611ef01dbc0a0694ad1805",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);
