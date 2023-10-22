import { collection } from "firebase/firestore";
import { db } from "../config/firebase";



export const users              = collection(db, "users");
export const plans              = collection(db, "Plans");
export const applications       = collection(db, "Applications");
export const bookings           = collection(db, "Bookings");
export const bookingProfiles    = collection(db, "Booking Profile");
export const categories         = collection(db, "Category");

export default {
    users,
    plans,
    applications,
    bookings,
    bookingProfiles,
    categories,
}
