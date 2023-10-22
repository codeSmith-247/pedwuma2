import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LocationSearch } from "components/BoxSearch";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

import { FormControl, InputLabel, OutlinedInput, InputAdornment, Select, MenuItem } from "@mui/material";

import { Btn } from "components/";


export default function () {

    const [ inDisplay, setInDisplay ] = useState("booking");

    const navigate = useNavigate();

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="p-10 py-5 max-w-[1165px] mx-auto">

                <div className="py-1">
                    <Btn.SmallBtn onClick={() => navigate(-1)}>Back</Btn.SmallBtn>
                </div>

                <div className="min-h-[222px] border border-gray-200 shadow-xs hover:shadow-lg bg-white rounded-md overflow-hidden relative grid grid-cols-10 mb-6">
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

                    </div>
                </div>

                <div className="col-span-7 min-h-[90vh]">
                    <h3 className="font-semibold orb mb-5">Application Information</h3>

                    <form className="my-3">
                        <div className="grid grid-cols-10 gap-3 mb-6">

                            <div className="col-span-3">
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">How do you charge?</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={10}
                                        label="How do you charge?"
                                        startAdornment={<InputAdornment position="start">I Charge</InputAdornment>}
                                        // onChange={handleChange}
                                    >
                                        <MenuItem value={10}>Per Job</MenuItem>
                                        <MenuItem value={20}>Per Day</MenuItem>
                                        <MenuItem value={30}>Per Hour</MenuItem>
                                        <MenuItem value={30}>Every 6 hours</MenuItem>
                                        <MenuItem value={30}>Every 12 hours</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                            <div className="col-span-7">
                                <FormControl sx={{ width: "100%"}}>
                                    <InputLabel htmlFor="outlined-adornment-amount">How much do you charge?</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-amount"
                                        startAdornment={<InputAdornment position="start">Ghc</InputAdornment>}
                                        label="How much do you charge?"
                                        name="fullname"
                                        type="number"
                                        sx={{background: ""}}
                                        fullWidth
                                        
                                    />
                                </FormControl>
                            </div>
                        </div>

                        <div className="mb-6 grid">
                                <DateTimePicker varient="outlined" label="When can you start work?" fullWidth defaultValue={dayjs('2022-04-17T15:30')} />
                        </div>

                        <div className="mb-6">
                            <FormControl sx={{ width: "100%"}}>
                                <InputLabel htmlFor="outlined-adornment-amount">Application Document (not compulsary)</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    startAdornment={<InputAdornment position="start"></InputAdornment>}
                                    label="Application Document (not compulsary)"
                                    name="document"
                                    type="file"
                                    sx={{background: ""}}
                                    placeholder="Images, PDFs, or other documents that can help with your application"
                                    fullWidth
                                    
                                />
                            </FormControl>
                        </div>

                        <div className="mb-6">
                            <FormControl sx={{ width: "100%"}}>
                                <InputLabel htmlFor="outlined-adornment-amount">Reference Link (not compulsary)</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    startAdornment={<InputAdornment position="start"></InputAdornment>}
                                    label="Reference Link (not compulsary)"
                                    name="link"
                                    type="link"
                                    sx={{background: ""}}
                                    placeholder=""
                                    fullWidth
                                    
                                />
                            </FormControl>
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



                        <Btn.SmallBtn styles={{padding: ".25rem 0", height: '42px', fontSize: "0.85rem", width: "100%"}}>Complete Application</Btn.SmallBtn>

                    </form>
                </div>
                




            </div>
        </LocalizationProvider>
        
    );
}