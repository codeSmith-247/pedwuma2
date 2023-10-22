
import { db } from "../../config/firebase";

import { doc, deleteDoc } from "firebase/firestore";

import { errorAlert, deleteAlert }  from "functions/utils/Alert";


export const deletePlan = async (id, load) => {

    const confirmDelete = await deleteAlert();

    if(!confirmDelete) return false;

    load(true);

    const docRef = doc(db, "Plans", id);

    await deleteDoc(docRef);

    load(false);

    errorAlert({
        icon: "success",
        title: "Delete Successfull"
    });

    return true;
}