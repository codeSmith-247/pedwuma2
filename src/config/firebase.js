// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOlurlj6JFZsXEEnHj7gq9AlNhIIKZpZg",
  authDomain: "pedwumaauth.firebaseapp.com",
  projectId: "pedwumaauth",
  storageBucket: "pedwumaauth.appspot.com",
  messagingSenderId: "1019439351726",
  appId: "1:1019439351726:web:b29155fc2a57c58cd4aa3f",
  measurementId: "G-6YNX2TBWR4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = app.firestore();
export const analytics = getAnalytics(app);
