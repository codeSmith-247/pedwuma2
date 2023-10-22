
import { db } from "../../config/firebase";
import { addDoc, query, where, getCountFromServer, serverTimestamp } from "firebase/firestore";
import refs from "../refs";


export const newPlan = async (inputs) => {

    try {
        
        const queryBuild = query( refs.plans, where("Name", "==", inputs.name));
    
        const snapshot = await getCountFromServer(queryBuild);
    
        const count = snapshot.data().count;
    
        if(count > 0) return "exists";
    
        const docRef = await addDoc(refs.plans, {
            Amount: parseFloat(inputs.amount),
            Applications: parseFloat(inputs.applications),
            Features: inputs.features,
            Jobs: parseFloat(inputs.jobs),
            Name: inputs.name,
            Portfolios: parseFloat(inputs.portfolios),
            "Default Rating": parseFloat(inputs.rating),
            "Upload Timestamp": serverTimestamp(),
        });
    
        return "success";

    }

    catch (error) {
        console.log(error);
        return "error";
    }
}


export const confirmPayment = async (reference) => {

    let result = await fetch(`https://localhost/pedwuma2/scripts/verifypayment.php?reference=${reference}`);

    
    result = await result.json();
    
    console.log(result);

    if(result.status && result.data.status == "success") return true;
    
    return false;
}