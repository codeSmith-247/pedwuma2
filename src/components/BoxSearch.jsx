import { useState } from 'react';



import { FormControl, InputLabel, OutlinedInput, InputAdornment, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { BigBtn } from "./Buttons"; 
import NoResults from "./NoResults";

import { useServiceSearch } from "../functions/reads/Services";
import { useLocationSearch, useLocationDetails } from "../functions/reads/General";
import { Search } from "../components/Search";

export function LocationSearch({ callback = console.log, ...props }) {

    const [ searchInput, setSearchInput ] = useState("");

    const { data, isLoading, isError } = useLocationSearch(searchInput);
    const charlie = useLocationSearch(searchInput);

    return (
        <Search
            data={data}
            isLoading={isLoading || isError}

            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start"><i className="bi bi-geo-alt"></i></InputAdornment>}
            label="Your Location"
            name="service"
            placeholder="E.g Accra, Amasaman, Tema, Ejisu"
            searchCallback={(data, setInput) => {callback(data); setInput(data?.description)}}
            searchingCallback={setSearchInput}
            resultUi={ (item) =>
                <div onClick={() => callback(item)} className="px-5 py-3 text-md hover:bg-gray-200 active:bg-blue-600 active:text-white">
                    {item.description}
                </div>
            }
            {...props}
        />
    );
}

export function ServiceSearch({ callback = console.log, status="active", ...props }) {

    const [ searchInput, setSearchInput ] = useState("");

    const { data, isLoading, isError } = useServiceSearch(searchInput, status);

    return (
        <Search
            data={data}
            isLoading={isLoading || isError}
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start"><i className="bi bi-person-circle"></i></InputAdornment>}
            label="What Service do you need?"
            name="service"
            placeholder="E.g Mason, Carpenter, Fitter, Mechanic"
            searchCallback={(data, setInput) => {callback(data); setInput(data?.name)}}
            searchingCallback={setSearchInput}
            resultUi={ (item) =>
                <div onClick={() => callback(item)} className="px-5 py-3 text-md hover:bg-gray-200 active:bg-blue-600 active:text-white">
                    {item.name}
                </div>
            }
            {...props}
        />
    );

}

export default function() {

    const [ workers, setWorkers ] = useState([]);
    const [ searchData, setSearchData ] = useState(null);

    return (
        <div className="p-10 max-[1165px]:p-0 h-[700px] max-[1165px]:h-max max-[1165px]:flex-col max-[1165px]:gap-0 flex gap-5 z-10 relative">
            <form className="bg-white rounded-md h-max max-w-[570px] max-[1165px]:max-w-[100%] max-[1165px]:rounded-none shadow sticky">
                <h1 className="capitalize orb font-semibold text-5xl max-[475px]:text-3xl p-10 max-[475px]:p-5 border-b border-gray-200">Find The <span className="text-blue-700 orb">Best Workers</span> Now</h1>

                <div className="p-10 max-[475px]:p-5">
                    
                    <LocationSearch sx={{marginBottom: "2rem"}}/>

                    <ServiceSearch sx={{marginBottom: "2rem"}}/>

                    <div className="grid grid-cols-1 gap-2">

                        <BigBtn>
                            Find Service
                        </BigBtn>

                        <p className="text-sm">
                            Not finding the worker of your choice? <Link className="text-blue-600 inline font-semibold underline">Sign Up</Link> now to <Link className="text-blue-600 inline font-semibold underline">Post Your Job</Link> on pedwuma 
                            and recive notifications from interested workers
                        </p>
                    </div>
                </div>
            </form>

        { searchData !== null && 
            <div data-aos="fade-in" className="flex-grow bg-black bg-opacity-30 min-h-[500px] max-[1165px]:backdrop-blur-xl rounded">
                <NoResults title="Skilled Workers Unavailable" text="Click the button to post your job, all skilled workers would be notified and would contact you as soon as possible" link={['Post Your Job', '']} classname="min-h-[500px] flex items-center justify-center text-white"/>
            </div>
        }    
        </div>
    );
}


