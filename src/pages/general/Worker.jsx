import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ImageBg } from "components";
import { LocationSearch } from "components/BoxSearch";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

import { where } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { FormControl, InputLabel, OutlinedInput, InputAdornment } from "@mui/material";

import { Btn, Loading } from "components/";

import { useDocById, useData } from "functions/reads/General";
import { decrypt, safeGet, checkInputsOnObj } from "functions/utils/Fixers";
import { errorAlert } from "functions/utils/Alert";
import { newBooking } from "functions/creates/Bookings";


let minDate= new Date();
let maxDate= new Date();
maxDate.setFullYear(maxDate.getFullYear + 1);

export default function () {

    const { id } = useParams();

    const { data } = useDocById("Booking Profile", decrypt(id));
    // console.log(data);
    const [ worker, setWorker] = useState({});

    const user = useData({
        target: "users",
        conditions: [
            where("User ID", "==", safeGet(data, ["User ID"], ""))
        ]
    });
    
    // console.log(worker);

    useEffect(() => {
        setWorker(safeGet(user, ["data", "0", "0"], ""));
    }, [user]);

    const [ inDisplay, setInDisplay ] = useState("booking");

    const [ inputs, setInputs ] = useState({
        date: dayjs(minDate),
        note: "",
    });

    const [ location, setLocation ] = useState({});

    const [ load, setLoad ] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = () => {
        
        const user = getAuth();

        let booking_data = {
            ...inputs, 
            location, 
            userId: user?.currentUser?.uid, 
            skilledId: safeGet(data, ["User ID"], ""),
            charge: safeGet(data, ["Service Information", "Charge"], ""),
            chargeRate: safeGet(data, ["Service Information", "Charge Rate"], ""),
        };

        // console.log(booking_data);

        if( !checkInputsOnObj(booking_data, ["date"]) || (!checkInputsOnObj(booking_data, "address") && !checkInputsOnObj(booking_data, "location")) ) {
            errorAlert({
                title: "Empty Inputs",
                text: "Please provide all inputs and try again",
            });

            // console.log(!checkInputsOnObj(booking_data, ["date"]), !checkInputsOnObj(booking_data, "address") , !checkInputsOnObj(booking_data, "location"))

            return false;
        }

        if(user.currentUser == null || role.role !== "Regular Customer") {
            errorAlert({
                title: "Registered Requesters Only",
                text: 'Please log in or sign up as a requester to book this service worker',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: "Log In",
            }).then( result => {
                if(result.isConfirmed) {
                    navigate("/login");
                    return false;
                }
            });

            return false;
        } 

        setLoad(true);
        newBooking(booking_data).then( result => {
            console.log(result);
            setLoad(false);
        });

    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>

            <Loading load={load} />

            <div className="mx-auto max-w-[1000px] max-[1165px]:scale-x-95">

                <div className="mx-auto max-w-[1000px] flex max-[550px]:flex-col shadow rounded-lg border p-2 my-6 h-max">
                    <div className="image h-[180px] max-[550px]:h-[80px] w-[180px] max-[550px]:w-[80px] max-[550px]:mx-auto rounded-md shadow overflow-hidden">
                        <img src={safeGet(data, ["User Pic"], safeGet(worker, ["User Pic"], "/images/user.png"))} alt="" className="h-full w-full object-cover" />
                    </div>

                    <div className="details px-6 max-[550px]:text-center">
                        <div className="orb text-xl font-semibold mb-3">{`${safeGet(worker, ["First Name"], "")} ${safeGet(worker, ["Last Name"], "")}`}</div>
                        <div className="text-sm font-medium text-gray-700 my-1">Contact: {`${safeGet(worker, ["Mobile Number"], "")}`}</div>
                        <div className="text-sm font-medium text-gray-700 my-1">Email: {`${safeGet(worker, ["Email Address"], "")}`}</div>

                        <div className="flex gap-2 items-center max-[550px]:justify-center max-[550px]:text-center">
                            {Array.from({length: safeGet(data, ["Work Experience & Certification", "Rating"] )}, (item, index) => <i key={index} className="bi bi-star-fill text-yellow-400" />)}
                            {Array.from({length: 5 - safeGet(data, ["Work Experience & Certification", "Rating"], 0)}, (item, index) => <i key={index} className="bi bi-star-fill text-gray-400" />)}
                        </div>

                        <div className="font-semibold orb mt-2">{safeGet(data, ["Service Information", "Service Category"])}</div>
                        <div className="font-semibold orb text-xs mb-2">{safeGet(data, ["Service Information", "Service Provided"])}</div>
                        <div className="text-sm p-05 text-gray-500"> <span className="font-semibold text-xs">Experience: </span>{safeGet(data, ["Service Information", "Expertise"])}</div>
                        <div className="text-sm p-05 text-gray-500"> <span className="font-semibold text-xs">Charge Rate: </span> Ghc {safeGet(data, ["Service Information", "Charge"])} / {safeGet(data, ["Service Information", "Charge Rate"])}</div>

                    </div>
                </div>

                <div className="flex flex-wrap gap-3 mt-3">

                        <Btn.SmallBtn onClick={() => setInDisplay("booking")} styles={{background: inDisplay == "booking" ? "#1d4ed8" : 'whitesmoke', border: '2px solid #1d4ed8', color: inDisplay == "booking" ? 'white' : '#1d4ed8', padding: ".25rem 1rem", height: '32px', fontSize: "0.65rem", '&:hover' : {color: 'white', background: '#1d4ed8'}}}>Book Now</Btn.SmallBtn>

                        <Btn.SmallBtn onClick={() => setInDisplay("profile")} styles={{background: inDisplay == "profile" ? "#1d4ed8" : 'whitesmoke', border: '2px solid #1d4ed8', color: inDisplay == "profile" ? 'white' : '#1d4ed8', padding: ".25rem 1rem", height: '32px', fontSize: "0.65rem", '&:hover' : {color: 'white', background: '#1d4ed8'}}}>Profile</Btn.SmallBtn>
        
                        <Btn.SmallBtn onClick={() => setInDisplay("reviews")} styles={{background: inDisplay == "reviews" ? "#1d4ed8" : 'whitesmoke', border: '2px solid #1d4ed8', color: inDisplay == "reviews" ? 'white' : '#1d4ed8', padding: ".25rem 1rem", height: '32px', fontSize: "0.65rem", '&:hover' : {color: 'white', background: '#1d4ed8'}}}>Reviews</Btn.SmallBtn>
      
                    
                </div>


                <div className="py-5 grid grid-cols-1 gap-5 max-w-[1165px] mx-auto">


                    {inDisplay == "booking" &&

                        <div className="col-span-7 min-h-[90vh]">
                            <h3 className="font-semibold orb mb-5">Booking Information</h3>

                            <form className="my-3">
                                <div className="grid mb-6">
                                    <LocationSearch 
                                        typingCallback={(address) => { setInputs({...inputs, address}); setLocation({}); }} 
                                        callback={ (location) => {setLocation( {...location} ) } } 
                                        label="Where is the Job Located?" 
                                        sx={{boxShadow: "0 0 1px #2222223c"}} 
                                    />
                                </div>

                                <div className="mb-6 grid">
                                        <DateTimePicker 
                                            onChange={(date) => setInputs({...inputs, date})}  
                                            varient="outlined" 
                                            label="What time would you need this service?" 
                                            defaultValue={dayjs(minDate)} 
                                            fullWidth
                                            maxDate={dayjs(maxDate)}
                                            minDate={dayjs(minDate)}
                                        />
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
                                            onChange={(e) => setInputs({...inputs, note: e.target.value})}
                                            size="small"
                                            multiline
                                            rows={3}
                                        />
                                    </FormControl>
                                </div>

                                <Btn.SmallBtn onClick={handleSubmit} styles={{padding: ".25rem 0", height: '42px', fontSize: "0.85rem", width: "100%"}}>Complete Booking</Btn.SmallBtn>

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
            </div>


        </LocalizationProvider>
        
    );
}