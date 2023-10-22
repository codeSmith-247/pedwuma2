

import { Link } from "react-router-dom";
import { useTotal, useData } from "functions/reads/General";
import { updateAllDocs } from "functions/updates/General";
import { getPast7Days, getHumanReadableDateDifference, readableDate } from "functions/utils/Fixers";
import { Btn, EmptyBox } from "components";
import { serverTimestamp } from "firebase/firestore";

import { LineChart } from '@mui/x-charts/LineChart';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import StatCards from "./dashboard/StatCards";


function createData(
  name,
  calories,
  fat,
  carbs,
  protein,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


export default function() {

    const { data, isLoading, isError } = useData({target: "Jobs"});


    return (
        <section>

            <div className="flex items-center justify-between">
                <h1 className="orb font-semibold mb-3">Bookings</h1>
            </div>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Requester</TableCell>
                        <TableCell>Start Date</TableCell>
                        <TableCell>Service</TableCell>
                        <TableCell>Charge</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {typeof(data) != 'undefined' && 
                        data[0]?.map((row) => (
                            <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell>
                                {row.Name}
                            </TableCell>
                            <TableCell>{readableDate(row["Start Date"])}</TableCell>
                            <TableCell>{getHumanReadableDateDifference(row["Start Date"], row["End Date"])}</TableCell>
                            <TableCell>Ghc{row["Charge"]} / {row["Charge Rate"]}</TableCell>
                            <TableCell>
                                <Btn.SmallBtn>View Details</Btn.SmallBtn>
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