import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LocationSearch } from "components/BoxSearch";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

import { FormControl, InputLabel, OutlinedInput, InputAdornment } from "@mui/material";

import { Btn } from "components/";


export default function () {

    const [ inDisplay, setInDisplay ] = useState("booking");

    const navigate = useNavigate();

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="p-10 py-5 grid grid-cols-10 gap-5 max-w-[1165px] mx-auto">

                <div className="col-span-10 py-1">
                    <Btn.SmallBtn onClick={() => navigate(-1)}>Back</Btn.SmallBtn>
                </div>
            
                <div className="flex flex-col col-span-3">
                    <div className="image h-[260px] w-[260px] rounded-md shadow overflow-hidden">
                        <img src="/images/pedwuma.jpg" alt="" className="h-full w-full object-cover" />
                    </div>

                    <div className="grid grid-cols-2 gap-3 w-[260px] mt-3">

                        {inDisplay !== "profile" &&
                            <Btn.SmallBtn onClick={() => setInDisplay("profile")} styles={{background: 'whitesmoke', border: '2px solid #1d4ed8', color: '#1d4ed8', padding: ".25rem 1rem", height: '32px', fontSize: "0.65rem", '&:hover' : {color: 'white', background: '#1d4ed8'}}}>Profile</Btn.SmallBtn>
                        }

                        {inDisplay !== "reviews" && 
                            <Btn.SmallBtn onClick={() => setInDisplay("reviews")} styles={{background: 'whitesmoke', border: '2px solid #1d4ed8', color: '#1d4ed8', padding: ".25rem 1rem", height: '32px', fontSize: "0.65rem", '&:hover' : {color: 'white', background: '#1d4ed8'}}}>Reviews</Btn.SmallBtn>
                        }

                        {inDisplay !== "booking" &&
                            <Btn.SmallBtn onClick={() => setInDisplay("booking")} styles={{background: 'whitesmoke', border: '2px solid #1d4ed8', color: '#1d4ed8', padding: ".25rem 1rem", height: '32px', fontSize: "0.65rem", '&:hover' : {color: 'white', background: '#1d4ed8'}}}>Book Now</Btn.SmallBtn>
                        }

                    </div>
                </div>

                {inDisplay == "booking" &&

                    <div className="col-span-7 min-h-[90vh]">
                        <h3 className="font-semibold orb mb-5">Booking Information</h3>

                        <form className="my-3">
                            <div className="grid mb-6">
                                <LocationSearch label="Where is the Job Located?" sx={{boxShadow: "0 0 1px #2222223c"}} />
                            </div>

                            <div className="mb-6 grid">
                                    <DateTimePicker varient="outlined" label="What time would you need this service?" fullWidth defaultValue={dayjs('2022-04-17T15:30')} />
                            </div>

                            <div className="mb-6">
                                <FormControl fullWidth sx={{marginBottom: "1rem"}}>
                                    <InputLabel htmlFor="outlined-adornment-amount">Booking Note / Message</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-amount"
                                        startAdornment={<InputAdornment position="start"><i className="bi bi-boy-text"></i></InputAdornment>}
                                        label="Booking Note / Message"
                                        name="service"
                                        placeholder="Type your message here..."
                                        sx={{
                                            borderColor: 'blue'
                                        }}
                                        size="small"
                                        multiline
                                        rows={3}
                                    />
                                </FormControl>
                            </div>

                            <Btn.SmallBtn styles={{padding: ".25rem 0", height: '42px', fontSize: "0.85rem", width: "100%"}}>Complete Booking</Btn.SmallBtn>

                        </form>
                    </div>
                }


                {inDisplay == "profile" &&

                    <div className="col-span-7 min-h-[90vh]">
                        <h3 className="font-semibold orb mb-3">Certifications</h3>
                        <div className="flex flex-wrap gap-3">
                            {Array.from({length: 10}, (item, index) => 
                                <div className="h-[100px] w-[100px] bg-gray-100 shadow"></div>
                            )}
                        </div>

                        <h3 className="font-semibold orb my-2">Experience</h3>

                        <div className="flex flex-wrap gap-3">
                            {Array.from({length: 10}, (item, index) => 
                                <div className="h-[100px] w-[100px] bg-gray-100 shadow"></div>
                            )}
                        </div>

                        <h3 className="font-semibold orb my-2">References</h3>

                        <div className="flex flex-wrap gap-3">
                            {Array.from({length: 10}, (item, index) => 
                                <div className="h-[100px] w-[100px] bg-gray-100 shadow"></div>
                            )}
                        </div>
                    </div>
                }


                {inDisplay == "reviews" &&

                    <div className="col-span-7 min-h-[90vh]">
                        <h3 className="font-semibold orb mb-3">Reviews</h3>

                        <div className="">
                            {Array.from({length: 20}, (item, index) => 
                                <div key={index} className="shadow rounded p-2 flex gap-5 mb-3">
                                    <div className="h-[100px] w-[100px] rounded-md shadow overflow-hidden">
                                        <img src="/images/pedwuma.jpg" alt="" className="h-full w-full object-cover" />
                                    </div>

                                    <div className="flex-grow" style={{width: "calc(100% - 100px)"}}>
                                        <div className="font-semibold orb">Adeniyi David Jones</div>
                                        <div className="flex mb-1">
                                            {Array.from({length: 4}, (item, index) => 
                                                <i key={index} className="bi bi-star-fill text-yellow-300 mr-2"></i>
                                            )}

                                            {Array.from({length: 5 - 4}, (item, index) => 
                                                <i key={index} className="bi bi-star-fill text-gray-200 mr-2"></i>
                                            )}
                                        </div>

                                        <p className="text-sm">
                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem cupiditate deleniti repellendus officia incidunt, similique repellat vero est cumque quod?
                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem cupiditate deleniti repellendus officia incidunt, similique repellat vero est cumque quod?
                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem cupiditate deleniti repellendus officia incidunt, similique repellat vero est cumque quod?
                                        </p>

                                        <div className="flex mt-5">
                                            <i className="bi bi-thumbs-up"></i>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        
                    </div>
                }

            </div>
        </LocalizationProvider>
        
    );
}