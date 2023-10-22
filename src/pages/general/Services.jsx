import { useState } from "react";

import { Link } from "react-router-dom";
import { Header, Btn, Cards } from "components";

import { LocationSearch, ServiceSearch } from "../../components/BoxSearch";

import { InputLabel, MenuItem, FormControl, Select } from '@mui/material'


export default function() {

    const [ showMenu, setShowMenu ] = useState(false);

    return (
        <>
            <div className="px-10 py-5 max-[1165px]:px-5">

                <h2 className="orb py-5 font-bold">Find a service</h2>

                <div className="gap-2 max-[850px]:hidden flex items-center grid grid-cols-4 rounded">
                    <div className="grid grid-cols-1 col-span-4 ">
                        <ServiceSearch sx={{boxShadow: "0 0 1px #2222223c"}}/>
                    </div>
                </div>

                <div className="gap-2 hidden max-[850px]:grid max-[850px]:gap-4 flex items-center grid-cols-4 rounded">
                    <div className="grid grid-cols-1 col-span-4 ">
                        <ServiceSearch sx={{boxShadow: "0 0 1px #2222223c"}} size="small" />
                    </div>
                </div>

            </div>

            <div className="px-10 max-[1165px]:px-5">
                <div className="grid-box-fit gap-3" style={{"--width": '300px'}}>
                    {Array.from({length: 20}, (item, index) => 
                        <Cards.Description
                            key={index}
                            title={"Carpenter"}
                            description={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, 
                            amet aperiam nostrum impedit nobis aut? Minima perferendis quidem cupiditate rerum!`}
                            btnText="See Workers"
                        />
                    )}
                </div>
            </div>
        </>
    );
}