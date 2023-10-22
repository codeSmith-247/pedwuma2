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
                    <div className="right flex flex-wrap gap-5 min-h-screen">
                        {Array.from({length: 20}, (item, index) => 
                            <div key={index} className="relative flex-grow w-[250px] h-max border border-gray-200 shadow-xs hover:shadow-lg bg-white rounded-md ">
                                <div className=" overflow-hidden relative grid grid-cols-10 h-full rounded-md">
                                    <div className="image col-span-10 h-[250px]">
                                        <img src="/images/pedwuma.jpg" className="object-cover h-full w-full " />
                                    </div>
                                    <div className="bg-white p-4 col-span-10">
                                            <div className="text-gray-600 flex items-center gap-2 mb-1 text-xs">
                                                <i className="bi bi-geo-alt border rounded-full h-[20px] w-[20px] flex items-center justify-center"></i>
                                                <span className="" style={{width: 'calc(100% - 35px)'}}>Amasaman, Temah, Kumasi, Accra...</span>
                                            </div>
                                            <div className="title orb text-lg my-3">Adeniyi David Shalom</div>

                                            <p className="text-xs mb-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed consequuntur sint asperiores ipsum quae ipsa, ipsam natus inventore cupiditate! Ut...</p>

                                            <div className="orb mb-3">
                                                <span className="orb">Ghc</span>
                                                <span className="orb text-lg">655</span>
                                            </div>
                                        <Link to="/worker">
                                            <Btn.SmallBtn >Book Now</Btn.SmallBtn>
                                        </Link>
                                    </div>
                                </div>
                                <div className="absolute -top-3 -right-3 h-[40px] w-[40px] border border-gray-200 rounded-full bg-white shadow">
                                    <img src="/images/verify-badge.png" alt="" className="object-cover h-full w-full" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}