import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../config/firebase";
import { getStorage, ref, uploadBytes } from "firebase/storage";

import refs from "../refs";

import { extractNames } from "../utils/Fixers";

export const newUser = async (userdata) => {

    try {

        const auth = getAuth();
        auth.useDeviceLanguage();
    
        const result = await createUserWithEmailAndPassword(auth, userdata.email, userdata.password);

        sendEmailVerification(auth.currentUser);

        updateProfile(auth.currentUser, {
            displayName: userdata.name,
            phoneNumber: userdata.phone,
        });

        const { firstname, lastname } = extractNames(userdata.name)


        await addDoc(refs.users, {
            "Email Address": userdata.email,
            "First Name": firstname,
            "Last Name": lastname,
            "Mobile Number": userdata.phone,
            Pic: "",
            Plan: userdata.plan,
            Role: userdata.accountType,
            "User ID": auth.currentUser.uid,
            verified: false,
        });

        return true;
    }

    catch(error) {
        console.log(error);
        return false;
    }

}

export const newProfile = async (profiledata) => {
    try {
        const auth = getAuth();

        const storage = getStorage();
        // const certifcateRef =  ref()

        const result = 
            await addDoc(refs.bookingProfiles, {
                Deadline: "",
                "Job Details": {
                    "Applier IDs": [],
                    "People Applied": 0,
                },
                "Service Information": {
                    Charge: profiledata.amount,
                    "Charge Rate": profiledata.charge_rate,
                    "Expertise": profiledata.experience,
                    "Service Category": profiledata.service_category,
                    "Service Provided": profiledata.services,
                },
                "Upload Timestamp": serverTimestamp(),
                "User ID": auth.currentUser.uid,
                "User Pic": "",
                "Work Experience & Certification": {
                    "Certification": [],
                    "Experience": [],
                    "Jobs Completed": 0,
                    "Portfolio": [],
                    "Rating": 0,
                    "Reference": [],
                }
            })

    }
    catch(error) {
        console.log(error);
        return false;
    }
}