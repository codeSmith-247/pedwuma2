import { doc, addDoc, updateDoc, serverTimestamp } from "firebase/firestore"
import refs from "../refs"
import { db } from "../../config/firebase";

export const editJob = async (jobInputs) => {

    try {
    
        await updateDoc( doc( db, "Jobs", jobInputs.id), {
            "Seen By": jobInputs.seenBy,
            "Service Information": {
                "Charge": jobInputs.amount,
                "Charge Rate": jobInputs.chargeRate,
                "Expertise": jobInputs.expertise,
                "Service Category": jobInputs.category,
                "Service Provided": jobInputs.service
            },
            "Job Details": {
                "title": jobInputs.title,
                "description": jobInputs.desc,
            },
        });
    
        return true;
        
    } catch (error) {
        console.log(error);
        return false;
    }

} 