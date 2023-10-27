

import { Link, useNavigate } from "react-router-dom";
import { getData, useData } from "functions/reads/General";
import { updateAllDocs } from "functions/updates/General";
import { getPast7Days, getHumanReadableDateDifference, readableDate, safeGet, encrypt } from "functions/utils/Fixers";
import { Btn, EmptyBox } from "components";
import { where } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';




export default function() {

    const user = getAuth();

    const navigate = useNavigate();

    const { data, isLoading, isError } = useData({
        target: "Bookings",
        conditions: [ where("Requester ID", "==", user.currentUser.uid) ],
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

    console.log(data, user.currentUser.uid);


    return (
        <section>

            <div className="flex items-center justify-between">
                <h1 className="orb font-semibold mb-3">Bookings</h1>
            </div>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Worker</TableCell>
                        <TableCell>Service</TableCell>
                        <TableCell>Charge</TableCell>
                        <TableCell>Start Date</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {typeof(data) != 'undefined' && 
                        data[0]?.map((row) => (
                            <TableRow
                            key={row?.Name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell>
                                <div className="flex items-center font-semibold gap-3">
                                    <div className="h-[60px] w-[60px] rounded shadow overflow-hidden">
                                        <img src={safeGet(row, ["bookingDetails", "User Pic"], safeGet(row, ["worker", "Pic"], "/images/user.png"))} alt="" className="object-cover h-full w-full" />
                                    </div>
                                    {safeGet(row, ["worker", "First Name"], "") + " " + safeGet(row, ["worker", "Last Name"], "")}
                                </div>
                            </TableCell>
                            <TableCell>{safeGet(row, ["bookingDetails", "Service Information", "Service Provided"], "")}</TableCell>
                            
                            <TableCell>Ghc{
                                safeGet(row, ["Charge"], 
                                safeGet(row, ["bookingDetails", "Service Information", "Charge"], ""))} / {safeGet(row, ["Charge Rate"], safeGet(row, ["bookingDetails", "Service Information", "Charge Rate"], ""))}
                            </TableCell>

                            <TableCell>{readableDate(safeGet(row, ["Upload Timestamp"], Object))}</TableCell>

                            <TableCell>
                                <Btn.SmallBtn onClick={() => navigate(`/admin/booking/${encrypt(row.id)}`)}>View Details</Btn.SmallBtn>
                            </TableCell>
                            </TableRow>
                        ))
                    }
                    </TableBody>
                </Table>
            </TableContainer>

            <EmptyBox load={typeof(data) != 'undefined' && data[0]?.length <= 0} title="No Bookings Yet" text=""/>

        </section>
    );
}