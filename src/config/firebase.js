import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";


// const firebaseConfig = {
//   apiKey: "AIzaSyDOlurlj6JFZsXEEnHj7gq9AlNhIIKZpZg",
//   authDomain: "pedwumaauth.firebaseapp.com",
//   projectId: "pedwumaauth",
//   storageBucket: "pedwumaauth.appspot.com",
//   messagingSenderId: "1019439351726",
//   appId: "1:1019439351726:web:b29155fc2a57c58cd4aa3f",
//   measurementId: "G-6YNX2TBWR4"
// }


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
