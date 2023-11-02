import { useState } from "react";
import { usePopularServices } from "functions/reads/Services";


import { Cards } from "./";

export default function({callback=()=>{}, }) {

    const { data } = usePopularServices();

    const [ selectedItem, setSelectedItem ] = useState(null);

    return (
        <div className="min-h-screen">
            {!data && Array.from({length: 20}, (item, index) => 
                <Cards.Small loading={true}/>
            )}
            {data &&
                <Cards.Small selected={"" == selectedItem} image={"/images/logo.png"} title={"All Services"} onClick={() => {callback(""); setSelectedItem("")}}/>
            }
            {data && data.map( (item, index) => 
                <Cards.Small selected={item.Title == selectedItem} image={item.Pic} title={item.Title} onClick={() => {callback(item); setSelectedItem(item.Title)}}/>
            )}
        </div>
    );
}