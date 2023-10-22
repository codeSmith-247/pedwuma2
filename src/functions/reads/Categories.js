import { getCountFromServer, query, where } from "firebase/firestore";
import refs from "../refs";


export const categoryExists = async (title) => {

    try {

        const queryBuild = query(refs.categories, where("title", "==", title));
        const snapshot = await getCountFromServer(queryBuild);

        return snapshot.data().count > 0;

    }
    catch (error) {
        console.log(error);
        return true;
    }
}