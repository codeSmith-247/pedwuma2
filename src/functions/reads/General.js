
import { useQuery } from "react-query";
import { collection, getDocs, getCountFromServer, Timestamp, query, where, and, or, orderBy, limit, startAfter } from "firebase/firestore";
import { db } from "../../config/firebase";
import refs from "../refs";


const startDate = Timestamp.fromDate(new Date(0));
const endDate = new Date();
endDate.setHours(23, 59, 59, 999);


export const useTotal = (target="", start = startDate, end = endDate) => {

    return useQuery(["total", target, start, end], async () => {

        const queryBuild  =  
            query( collection(db, target) , 
                and(
                    where("Upload Timestamp", "<=", end), 
                    where("Upload Timestamp", ">=", start)
                )
            );
        
        const snapshot = await getCountFromServer(queryBuild);

        const data = snapshot.data().count;

        return data;
    })
}

export const useData = ({
    target="", 
    page = null, 
    start = startDate, 
    end = endDate, 
    conditions=[
        and(
            where("Upload Timestamp", "<=", end), 
            where("Upload Timestamp", ">=", start)
        ),
        orderBy("Upload Timestamp", "desc"),
        limit(35)
    ]
}) => {
    return useQuery(["data", target, page, start, end], async () => {

        page = page == 1 ? null : page;

        const queryBuild  =  
            query( collection(db, target) , 
                ...conditions
            );

        const snapshot = await getDocs(queryBuild);
        

        return [
            //filters the result to include the document id
            snapshot.docs.map( (doc) => { return {id: doc.id , ...doc.data()} }), 

            //return the last document for pagination purposes
            snapshot.docs[snapshot.docs.length - 1]
        ]

    });
}

export const useTotalUserType = (type) => {

    return useQuery(["total", type], async () => {

        const queryBuild    = query( refs.users, where("Role", "==", type));
        const snapshot      = await getCountFromServer(queryBuild);

        const data = snapshot.data().count;

        return data;
    })

}

export const useLocationSearch = (userInput) => {
    return useQuery(["location_search", userInput], async () => {
        let result = [];

        try {

            const autocomplete = new window.google.maps.places.AutocompleteService();
        
            await autocomplete.getPlacePredictions(
              {
                input: userInput,
                componentRestrictions: { country: 'GH' }, // Restrict to Ghana
              },
        
              (predictions, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                  result = predictions;
                }
              }
            );

            console.log(userInput, result);

            return result;
        }
        catch (error) {
            return result;
        }

    });
};

export const useLocationDetails = (prediction) => {

    return useQuery(["location_details", prediction], async () => {

        const placesService = new window.google.maps.places.PlacesService(document.createElement('div'));
    
        await placesService.getDetails({ placeId: prediction.place_id }, (place, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            prediction.lat = place.geometry.location.lat();
            prediction.lng = place.geometry.location.lng();
          }
        });

        return prediction;

    });

};

export const userExists = async (email, phone) => {

    console.log(email, phone);

    const queryBuild = 
        query( refs.users, 
            or(
                where("Email Address", "==", email?.replaceAll(" ", "")), 
                where("Mobile Number", "==", phone?.replaceAll(" ", "")),
            )
        );


    const snapshot = await getCountFromServer(queryBuild);

    const count = snapshot.data().count;

    if (count > 0) return true;

    return false;
}
