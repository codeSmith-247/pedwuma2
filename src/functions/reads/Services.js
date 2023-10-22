
import { useQuery } from "react-query";
import { query, where, and, orderBy, startAt, endAt, getDocs } from "firebase/firestore"
import refs from "../refs";

export const useServiceSearch = (searchInput, state="active") => {
    console.log(searchInput);
    return useQuery(["service search", searchInput, state ], async () => {

        const queryBuild = query(refs.categories, where("Category Name", ">=", searchInput), where("Category Name", "<=", `${searchInput}\uf8ff`), orderBy("Category Name"));

        const snapshot = await getDocs(queryBuild);

        const result = snapshot.docs.map( doc => { return { id: doc.id, ...doc.data() } });

        console.log(result);
    
        return result;

    });
}


export const useServices = (state="active") => {

    return useQuery(["all services", state ], async () => {


        const snapshot = await getDocs(refs.categories);

        const result = snapshot.docs.map( doc => { return { id: doc.id, ...doc.data() } });

        console.log(result);
    
        return result;

    });
}