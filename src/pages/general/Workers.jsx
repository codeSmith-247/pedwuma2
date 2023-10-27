import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { Header, Btn, Cards, PopularServices } from "components";

import { LocationSearch, ServiceSearch } from "../../components/BoxSearch";

import { InputLabel, MenuItem, FormControl, Select } from '@mui/material'

import { useData } from "functions/reads/General";

import { encrypt } from "functions/utils/Fixers";


export default function() {

    const [ showMenu, setShowMenu ] = useState(false);
    const navigate = useNavigate();

    const { data } = useData({
        target: "Booking Profile",
        callback: async (person) => {
            person.user = await getData({
                target: "users",
                conditions: [ where("User ID", "==", person["User ID"]) ],
                callback: async (user) => {
                    user.location = await getData({
                        target: "Location",
                        conditions: [ where("User ID", "==", person["User ID"]) ]
                    });

                    user.location = safeGet(user.location, ["0", "0"], {});

                    return user;
                }
            });

            person.user = safeGet(person.user, ["0", "0"], {});

            return person;
        }
    });

    return (
        <>

            <Header 
                image={`/images/workers.jpg`} 
                title={<>Find<span className="text-blue-400 orb"> The Workers You Need </span>For All Your Jobs</>}
                text={<>Are you looking for people to help with plumbing, carpentry, sewing, catering, or other jobs? You can check our list of workers and choose the right people for your job</>}
            />

            <div className="px-10 py-5 max-[1165px]:px-5">

                <h2 className="orb py-5 font-bold">Search For Workers</h2>

                <div className="gap-2 max-[850px]:hidden flex items-center grid grid-cols-6 rounded">
                    <div className="grid grid-cols-1 col-span-2 max-[850px]:col-span-6">
                        <LocationSearch sx={{boxShadow: "0 0 1px #2222223c"}} />
                    </div>

                    <div className="grid grid-cols-1 col-span-4 max-[850px]:col-span-6">
                        <ServiceSearch sx={{boxShadow: "0 0 1px #2222223c"}}/>
                    </div>
                </div>

                <div className="gap-2 hidden max-[850px]:grid max-[850px]:gap-4 flex items-center grid-cols-6 rounded">
                    <div className="grid grid-cols-1 col-span-2 max-[850px]:col-span-6">
                        <LocationSearch sx={{boxShadow: "0 0 1px #2222223c"}} size="small" />
                    </div>

                    <div className="grid grid-cols-1 col-span-4 max-[850px]:col-span-6">
                        <ServiceSearch sx={{boxShadow: "0 0 1px #2222223c"}} size="small" />
                    </div>
                </div>

            </div>

            <div className="px-10 max-[1165px]:px-5">
                <i onClick={() => setShowMenu(!showMenu)} className={`bi bi-${showMenu ? 'x-lg' : 'list'} max-[1185px]:flex hidden mb-5 shadow h-[40px] w-[40px] rounded items-center justify-center text-xl`}></i>
                <div className="overflow-hidden h-max splitboard flex gap-4 relative top-0 right-0" style={{"--menu": '300px'}}>
                    <div className={`left left-0 top-0 bg-white z-10 border shadow p-2 py-5 rounded-md h-max  ${ showMenu ? 'left-0' : '-left-[200vw]' }`}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Workers that are?</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={10}
                                label="Workers that are?"
                                size="small"
                                // onChange={handleChange}
                            >
                                <MenuItem value={10}>More Experienced</MenuItem>
                                <MenuItem value={20}>Less Experienced</MenuItem>
                                <MenuItem value={30}>Low Pay</MenuItem>
                                <MenuItem value={30}>High Pay</MenuItem>
                            </Select>
                        </FormControl>

                        <h1 className="orb my-5">Popular Services</h1>

                        <PopularServices callback={()=>{}} />
                    </div>
                    <div className="right min-h-screen flex grid-box-fill gap-3" style={{"--width": "240px"}}>
                        {!data && Array.from({length: 20}, (item, index) => 
                            <Cards.Profile key={index} btnText="Book Now" onBtnClick={() => navigate("/worker")} loading={true} name={<div className="orb font-semibold mb-1">David Shalom</div>}/>
                        )}

                        {data && data[0]?.map((item, index) => 
                        {
                            console.log(item, "over here");
                            return <Cards.Profile key={index} btnText="Book Now" onBtnClick={() => navigate(`/worker/${encrypt(item.id)}`)} item={item} name={<div className="orb font-semibold mb-1">{safeGet(item.user, ["First Name"], "")} {safeGet(item.user, ["Last Name"], "")}</div>}/>
                        }
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}