import { getAuth, updateEmail, updateProfile, reauthenticateWithCredential, EmailAuthProvider, sendPasswordResetEmail } from "firebase/auth";

export const changeEmail = async (email, password, oldEmail) => {

    try {

        const auth = getAuth();
        auth.useDeviceLanguage();

        console.log(auth.currentUser);

        let result = await reauthenticateWithCredential(auth.currentUser, EmailAuthProvider.credential(oldEmail, password) );

        console.log("re authenticated", result);

        await updateEmail(result.user, email);

        return true;
    }

    catch(error) {
        console.log(error);
        return false;
    }

}


export const resetPassword = async (email) => {
    try { 

        const auth = getAuth();

        await sendPasswordResetEmail(auth, email);

        return true;
    }
    catch(error) {
        console.log(error);
        return false;
    }
}