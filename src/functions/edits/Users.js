import { getAuth, updateEmail, updateProfile, reauthenticateWithCredential, EmailAuthProvider, sendPasswordResetEmail } from "firebase/auth";
import { updateDoc, arrayUnion, doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { getDocById } from "../reads/General";
import { uploadFile } from "../utils/Files";

export const changeEmail = async (email, password, oldEmail) => {

    try {

        const auth = getAuth();
        auth.useDeviceLanguage();

        let result = await reauthenticateWithCredential(auth.currentUser, EmailAuthProvider.credential(oldEmail, password) );

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


export const updateBookingProfile = async (profiledata, admin=false) => {
    try {

        const auth = getAuth();

        let previous = await getDocById("Booking Profile", profiledata.id);

        if(auth.currentUser.uid !== previous["User ID"] && !admin) return false;


        let certificates = previous["Work Experience & Certification"]["Certification"].filter( item => profiledata.certificateUrl.indexOf(item) >= 0);
        let experience   = previous["Work Experience & Certification"]["Experience"].filter( item => profiledata.experienceUrl.indexOf(item) >= 0);


        await updateDoc(doc( db, "Booking Profile", profiledata.id), {
            ...previous,
            "Service Information": {
                ...previous["Service Information"],
                Charge: profiledata?.amount,
                "Charge Rate": profiledata?.chargeRate,
                "Expertise": profiledata?.expertise,
                
            },
            "Work Experience & Certification": {
                ...previous["Work Experience & Certification"],
                "Certification": certificates,
                "Experience": experience,
                "Reference": typeof profiledata?.reference == "undefined" ? [] : profiledata.reference,
            }
        });


        certificates = [];
        experience = [];
        let pic = previous["User Pic"];

        previous = await getDocById("Booking Profile", profiledata.id);

        if(typeof profiledata?.certificate !== "undefined")
        for(let i = 0; i < profiledata.certificate.length; i++) {
            let file = profiledata.certificate[i];
            let path = await uploadFile(`bookingProfile/certificates/${previous["Service Information"]["Service Provided"]}_${i}`, file.file);
            certificates.push(path);
        }

        if(typeof profiledata?.experience !== "undefined")
        for(let i = 0; i < profiledata.experience.length; i++) {
            let file = profiledata.experience[i];
            let path = await uploadFile(`bookingProfile/experience/${previous["Service Information"]["Service Provided"]}_${i}`, file.file);
            experience.push(path);
        }

        if(profiledata.pic) {
            pic = await uploadFile(`bookingProfile/pics/${previous["Service Information"]["Service Provided"]}`, profiledata.pic);
        }

        await updateDoc(doc( db, "Booking Profile", profiledata.id), {
            ...previous,
            "User Pic" : pic,
            "Work Experience & Certification": {
                ...previous["Work Experience & Certification"],
                "Certification": arrayUnion(...certificates),
                "Experience": arrayUnion(...experience),
            }
        });


        return true;
    }
    catch(error) {
        console.log(error);
        return false;
    }
}