// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAiy7GZn2WFEMMaDKqR_IlnKSb4oRprHFM",
  authDomain: "pedwuma-a471c.firebaseapp.com",
  projectId: "pedwuma-a471c",
  storageBucket: "pedwuma-a471c.appspot.com",
  messagingSenderId: "929723458806",
  appId: "1:929723458806:web:2de7e5c508fb87cd3db8d7",
  measurementId: "G-SDSTW61NSV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);