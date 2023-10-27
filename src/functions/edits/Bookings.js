
import { doc, updateDoc, } from "firebase/firestore";

import { db } from "../../config/firebase";



export const setBookingState = async (id, state) => {

    try {

        const result = await updateDoc(doc( db, "Bookings", id), {
            "Booking Status": state,
        })

        return true;
    }
    catch(error) {
        
        return false;
    }
}