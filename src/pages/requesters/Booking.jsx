
import { useParams, useNavigate } from "react-router-dom";
import { getData, useData } from "functions/reads/General";
import { decrypt, safeGet, readableDate } from "functions/utils/Fixers";
import { and, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { MapShow, Btn } from "components";

export default function () {

    const user = getAuth();

    const navigate = useNavigate();

    const { id } = useParams();

    const { data } = useData({
        target: "Bookings",
        conditions: [ and(
                        where("Requester ID", "==", user.currentUser.uid),
                        where("Booking ID", "==", decrypt(id))
                     )
                   ],
        callback: async (booking) => {

            booking.worker = await getData({
                target: "users",
                conditions: [ where("User ID", "==", booking["Worker ID"]) ],
            });

            booking.worker = safeGet(booking.worker, ["0", "0"], {});

            booking.bookingDetails = await getData({
                target: "Booking Profile",
                conditions: [ where("User ID", "==", booking["Worker ID"]) ]
            });

            booking.bookingDetails = safeGet(booking.bookingDetails, ["0", "0"], {});

            return booking
        }
    });

    console.clear();
    console.log(data, decrypt(id));

    const status = safeGet(data, ["0", "0", "Booking Status"], "Pending");


    return (
        <div>

            <div className="flex items-center gap-1">
                <i onClick={() => navigate(-1)} className="bi bi-chevron-left bg-blue-500 text-white h-[30px] w-[30px] rounded-md flex items-center justify-center"></i>
                <h1 className="orb text-lg mb-1">Booking Details</h1>
            </div>

            <div className="mx-auto max-w-[800px] shadow-lg rounded-md p-3">
                <div className="flex gap-2">
                    <div className="w-[150px] h-[150px] rounded-md shadow overflow-hidden">
                        <img src={safeGet(data, ["0", "0", "bookingDetails", "User Pic"], safeGet(data, ["0", "0", "worker", "Pic"], "/images/user.png"))} alt="" className="object-cover h-full w-full" />
                    </div>
                    <div className="details">
                        <div className="name orb font-semibold">{safeGet(data, ["0", "0", "worker", "First Name"], "") + " " + safeGet(data, ["0", "0", "worker", "Last Name"], "")}</div>
                        <div className="text-sm font-medium text-gray-700 my-1">Contact: {`${safeGet(data, ["0", "0", "worker", "Mobile Number"], "")}`}</div>
                        <div className="text-sm font-medium text-gray-700 my-1">Email: {`${safeGet(data, ["0", "0", "worker", "Email Address"], "")}`}</div>

                        <div className="flex gap-2 items-center max-[550px]:justify-center max-[550px]:text-center">
                            {Array.from({length: safeGet(data, ["0", "0", "bookingDetails", "Work Experience & Certification", "Rating"], 0 )}, (item, index) => <i key={index} className="bi bi-star-fill text-yellow-400" />)}
                            {Array.from({length: 5 - safeGet(data, ["0", "0", "bookingDetails", "Work Experience & Certification", "Rating"], 0)}, (item, index) => <i key={index} className="bi bi-star-fill text-gray-400" />)}
                        </div>

                        <div className="font-semibold orb mt-2">{safeGet(data, ["Service Information", "Service Category"])}</div>
                        <div className="font-semibold orb text-xs mb-2">{safeGet(data, ["Service Information", "Service Provided"])}</div>
                        <div className="text-sm p-05 text-gray-500"> <span className="font-semibold text-xs">Experience: </span>{safeGet(data, ["0", "0", "bookingDetails", "Service Information", "Expertise"])}</div>
                        <div className="text-sm p-05 text-gray-500"> <span className="font-semibold text-xs">Charge Rate: </span> Ghc {safeGet(data, ["0", "0", "Charge"], "")} / {safeGet(data, ["0", "0", "Charge Rate"], "")}</div>
                    </div>
                </div>

                <div className="my-4">
                    <div className="my-1 flex gap-2 items-center font-semibold text-gray-600">
                        <span>Service:</span>
                        <span>{safeGet(data, ["0", "0", "bookingDetails", "Service Information", "Service Provided"], "")}</span>
                    </div>

                    <div className="my-1 flex gap-2 items-center font-semibold text-gray-600">
                        <span>Start Date:</span>
                        <span>{safeGet(data, ["0", "0", "Upload Timestamp"]) ? readableDate(safeGet(data, ["0", "0", "Upload Timestamp"])) : ""}</span>
                    </div>

                    <div className="my-1 flex gap-2 items-center font-semibold text-gray-600">
                        <span>Status:</span>
                        <span className={`${status == "Pending" ? "bg-orange-500" : status == "Rejected" ? "bg-red-500" : "bg-blue-500"} px-3 py-1.5 rounded-lg text-white`}>{safeGet(data, ["0", "0", "Booking Status"], "Pending")}</span>
                    </div>

                    <div className="my-1 flex gap-2 items-center font-semibold text-gray-600">
                        <span>Location:</span>
                        <span className={``}>{safeGet(data, ["0", "0", "Address"], "")}</span>
                    </div>
                </div>

                <MapShow showInput={false} lat={safeGet(data, ["0", "0", "Latitude"], 0)} lng={safeGet(data, ["0", "0", "Longitude"], 0)}/>
            </div>

            {(safeGet(data, ["0", "0", "Booking Status"]) && status !== "Pending" && status !== "Rejected" ) &&
                
                <div className=" grid grid-cols-1 items-center gap-1 absolute bottom-0 left-0 w-full bg-white p-2">
                    <div className="">
                        <Btn.SmallBtn onClick={() => {}} fullWidth>
                            <span>Chat With Requester</span>
                            <i className="bi bi-chat-fill text-xl mx-2 "></i>
                        </Btn.SmallBtn>
                    </div>
                </div>
            }

        </div>
    );
}