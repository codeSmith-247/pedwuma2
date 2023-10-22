
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { errorAlert } from "../utils/Alert";
import refs from "../refs";

export const logIn = async (email, password) => {

    try {
        const auth = getAuth();
    
        await signInWithEmailAndPassword(auth, email, password);

    
        const snapshot = await getDocs(refs.users, query( where("User ID", "==", auth.currentUser.uid)));

        const result = snapshot.docs;
    
        if(result.length <= 0) return false;
    
        errorAlert({
            icon: "success",
            title: "Welcome Back"
        });
        
        return result[0].data();
    }
    catch (error) {
        console.log(error);

        errorAlert({
            title: "Invalid Email or Password",
            text: "Please check your email and password and try again."
        });

        return false;
    }
}