

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
        target: "Jobs",
        conditions: [ where("Client ID", "==", user.currentUser.uid) ],
        callback: async (booking) => {

            return booking
        }
    });

    console.log(data, user.currentUser.uid);


    return (
        <section>

            <div className="flex items-center justify-between mb-3">
                <h1 className="orb font-semibold mb-3">Jobs</h1>
                <Link to={"/admin/job/new"}>
                    <Btn.SmallBtn>New Job</Btn.SmallBtn>
                </Link>
            </div>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Job Title</TableCell>
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
                                    { safeGet(row, ["Job Details", "title"], "") }
                                </div>
                            </TableCell>
                            <TableCell>{safeGet(row, [ "Service Information", "Service Provided"], "")}</TableCell>
                            
                            <TableCell>Ghc{safeGet(row, ["Service Information", "Charge"], "")} / {safeGet(row, ["Service Information", "Charge Rate"], "")}
                            </TableCell>

                            <TableCell>{readableDate(safeGet(row, ["Upload Timestamp"], Object))}</TableCell>

                            <TableCell>
                                <Btn.SmallBtn onClick={() => navigate(`/admin/job/edit/${encrypt(row.id)}`)}>View Details</Btn.SmallBtn>
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