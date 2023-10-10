import { useState } from 'react';



import { FormControl, InputLabel, OutlinedInput, InputAdornment, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { BigBtn } from "./Buttons"; 
import NoResults from "./NoResults";

import { LocationSuggestions, LocationDetails } from "../functions/Locations";

function LocationSearch({ callback = console.log }) {

    const [ showResult, setShowResult ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ predictions, setPredictions ] = useState([]);
    const [ searchInput, setSearchInput ] = useState('');

    const handleLocationSearch = (e) => {

        setSearchInput(e.target.value);

        if(searchInput.replaceAll(" ", "") == "") {
            resetValues()
            return false;
        }

        if(loading) return false;

        setLoading(true);

        LocationSuggestions(searchInput, (locationData) => {
            console.log(locationData);
            setLoading(false);
            setShowResult(true);
            setPredictions(locationData);
        });

    }

    const handleSelectResult = (data) => {
        callback(data);

        setSearchInput(data?.description);

        setShowResult(false);
        setLoading(false);
        setPredictions([]);
    }

    const resetValues = () => {
        setLoading(false);
        setShowResult(false);
        setPredictions([]);
    }



    return (
        <div className="relative">
            <FormControl fullWidth sx={{marginBottom: "2rem"}}>
                <InputLabel htmlFor="outlined-adornment-amount">Your Location</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    startAdornment={<InputAdornment position="start"> <i className="bi bi-geo-alt"></i> </InputAdornment>}
                    label="Your Location"
                    name="location"
                    placeholder="E.g Stadium Junction, Amasaman, Accra"
                    onChange={handleLocationSearch}
                    value={searchInput}
                />
            </FormControl>
            { showResult &&

                <div className="absolute z-[20] top-[65%] shadow-xl bg-white left-0 w-full h-max">
                    <div data-aos="fade-in" className=" max-h-[250px] overflow-y-scroll z-0">
                        {predictions.map((item, index) => 
                            <div onClick={() => LocationDetails(item, handleSelectResult)} key={index} className="px-5 py-3 text-md hover:bg-gray-200 active:bg-blue-600 active:text-white">
                                {item.description}
                            </div>
                        )}

                    </div>
                    <i onClick={resetValues} className="absolute -top-2 -right-2 bg-white h-[30px] w-[30px] flex items-center justify-center rounded-full shadow-xl hover:bg-red-500 hover:text-white z-10 bi bi-x"></i>
                </div>
            }

            { (!showResult && loading) &&

                <div data-aos="fade-in" className="absolute z-[20] top-[65%] shadow-xl bg-white left-0 w-full h-[250px] flex items-center justify-center">
                    <CircularProgress />
                </div>
            }
        </div>
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
                    
                    <LocationSearch />

                    <FormControl fullWidth sx={{marginBottom: "2rem"}}>
                        <InputLabel htmlFor="outlined-adornment-amount">What Service do you need?</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            startAdornment={<InputAdornment position="start"><i className="bi bi-person-circle"></i></InputAdornment>}
                            label="What Service do you need?"
                            name="service"
                            placeholder="E.g Mason, Carpenter, Fitter, Mechanic"
                        />
                    </FormControl>

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


