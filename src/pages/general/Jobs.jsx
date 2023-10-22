import { useState } from "react";

import { Link } from "react-router-dom";
import { Header, Btn } from "components";

import { LocationSearch, ServiceSearch } from "../../components/BoxSearch";

import { InputLabel, MenuItem, FormControl, Select } from '@mui/material'


export default function() {

    const [ showMenu, setShowMenu ] = useState(false);

    return (
        <>

            <Header 
                image={`/images/jobs.jpg`} 
                title={<>Find <span className="text-blue-400 orb"> Jobs Closer To You </span></>}
                text={<>Are you looking for a job, check our list of jobs and apply for jobs that are right for you, apply now to start earning</>}
            />

            <div className="px-10 py-5 max-[1165px]:px-5">

                <h2 className="orb py-5 font-bold">Search For Jobs</h2>

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

                <div className="flex items-center justify-end">
                    <i onClick={() => setShowMenu(!showMenu)} className={`bi bi-${showMenu ? 'x-lg' : 'list'} max-[1185px]:flex hidden mb-5 shadow h-[40px] w-[40px] rounded items-center justify-center text-xl`}></i>
                </div>

                <div className="overflow-hidden h-max splitboard flex gap-4 relative top-0 right-0" style={{"--menu": '300px'}}>
                    <div className="right grid max-[865px]:grid-cols-1 gap-5 min-h-screen">
                        {Array.from({length: 20}, (item, index) => 
                            <div key={index} className="min-h-[222px] border border-gray-200 shadow-xs hover:shadow-lg bg-white rounded-md overflow-hidden relative grid grid-cols-10">
                                <div className="image col-span-2 max-[865px]:col-span-3 max-[550px]:col-span-10 max-[550px]:h-[250px] ">
                                    <img src="/images/pedwuma.jpg" className="object-cover h-full w-full " />
                                </div>
                                <div className="col-span-6 bg-white p-4 max-[865px]:col-span-7 max-[550px]:col-span-10">
                                    <div className="text-gray-600 flex items-center gap-2 mb-1 text-xs">
                                        <i className="bi bi-geo-alt border rounded-full h-[20px] w-[20px] flex items-center justify-center"></i>
                                        <span className="" style={{width: 'calc(100% - 35px)'}}>Amasaman, Temah, Kumasi, Accra...</span>
                                    </div>
                                    <div className="title orb text-lg my-3">Very Good Mechanic Needed for 5 Car Repairs</div>
    
                                    <p className="text-xs mb-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed consequuntur sint asperiores ipsum quae ipsa, ipsam natus inventore cupiditate! Ut...</p>
    
                                    <div className="font mb-1 text-sm">
                                        Experience: Expert(+6 years)
                                    </div>

                                    <div className="font mb-1 text-sm">
                                        Minimum Rating: 5 stars
                                    </div>

                                    <div className="font mb-1 text-sm">
                                        Service Needed: House Cleaning
                                    </div>
                                </div>
                                <div className="col-span-2 bg-blue-50 max-[865px]:col-span-10 max-[865px]:min-h-[150px] p-2 flex flex-col">

                                    <div className="flex flex-col items-center justify-center text-center flex-grow">
                                        <div className="orb mb-1">
                                            <span className="orb text-xs">Ghc</span>
                                            <span className="orb text-lg">655</span>/Hour
                                        </div>

                                        <div className="orb text-xs">13 Applications</div>
                                    </div>
        
                                    <Link to="/job">
                                        <Btn.SmallBtn fullWidth>Apply Now</Btn.SmallBtn>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={`left right-0 top-0 bg-white z-10 border shadow p-2 py-5 rounded-md h-max  ${ showMenu ? 'right-0' : '-right-[200vw]' }`}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Jobs That Need</InputLabel>
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

                        <div className="">
                            {Array.from({length: 20}, (item, index) => 
                                <div key={index} className="relative flex border mb-3 rounded-md overflow-hidden">
                                    <div className="image  h-[60px]">
                                        <img src="/images/pedwuma.jpg" className="object-cover h-full w-full " />
                                    </div>
                                    <div className="bg-white px-3 py-2 ">
                                        <div className="text-gray-600 flex items-center gap-2 text-xs">
                                            <span className="" style={{width: 'calc(100% - 35px)'}}>Amasaman, Temah, Kumasi, Accra...</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}