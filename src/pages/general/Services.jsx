import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { Header, Btn, Cards } from "components";

import { LocationSearch, ServiceSearch } from "../../components/BoxSearch";

import { InputLabel, MenuItem, FormControl, Select } from '@mui/material'

import { useData } from "../../functions/reads/General";
import { limit } from "firebase/firestore";

export default function() {

    const [ showMenu, setShowMenu ] = useState(false);

    const navigate = useNavigate();

    const { data } = useData({
        target: "Category",
        conditions: [ limit(50) ],
    });

    return (
        <>
            <div className="px-10 py-5 max-[1165px]:px-5">

                <h2 className="orb py-5 font-bold">Find a service</h2>

                <div className="gap-2 max-[850px]:hidden items-center grid grid-cols-4 rounded">
                    <div className="grid grid-cols-1 col-span-4 ">
                        <ServiceSearch callback={(title) => navigate(`/service/${title.Title}`)} sx={{boxShadow: "0 0 1px #2222223c"}}/>
                    </div>
                </div>

                <div className="gap-2 hidden max-[850px]:grid max-[850px]:gap-4  items-center grid-cols-4 rounded">
                    <div className="grid grid-cols-1 col-span-4 ">
                        <ServiceSearch callback={(title) => navigate(`/service/${title.Title}`)} sx={{boxShadow: "0 0 1px #2222223c"}} size="small" />
                    </div>
                </div>

            </div>

            <div className="px-10 max-[1165px]:px-5">
                <div className="grid-box-fit gap-3" style={{"--width": '300px'}}>
                    {data && data[0].map( (item, index) => 
                        <Cards.Description
                            key={index}

                            image={item["Pic"]}
                            title={item["Category Name"]}
                            description={<div className="text-xs">{item["Desc"].slice(0, 100)}...</div>}
                            topInfo=""
                            btnText="See Workers"
                            onBtnClick={() => {navigate(`/category/${item["Category Name"]}`)}}
                            className="w-[400px] h-[500px] max-[1165px]:w-[300px] max-[1165px]:h-[400px] border border-gray-200 shadow-xs hover:shadow-lg bg-white rounded-md overflow-hidden relative group"
                        />
                    )}

                    {!data && Array.from({length: 20}, (item, index) => 
                        <Cards.Loading
                            key={index}
                        />
                    )}
                </div>
            </div>
        </>
    );
}