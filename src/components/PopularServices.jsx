
import { usePopularServices } from "functions/reads/Services";


import { Cards } from "./";

export default function({callback=()=>{}, }) {

    const { data } = usePopularServices();

    return (
        <div className="">
            {!data && Array.from({length: 20}, (item, index) => 
                <Cards.Small loading={true}/>
            )}

            {data && data.map( (item, index) => 
                <Cards.Small image={item.Pic} title={item.Title} onClick={() => callback(item)}/>
            )}
        </div>
    );
}