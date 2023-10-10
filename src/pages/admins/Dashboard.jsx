
import { Link } from "react-router-dom";
import { Cards, BoxSearch, Nav, SideScroll, Btn, WorkersScroll, CategoriesScroll, Footer, Testimonials } from "../../components";

import { LineChart } from '@mui/x-charts/LineChart';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

    const stats = [
        {
            name: 'Total Jobs',
            icon: 'box',
            value: 2345

        },
        {
            name: 'Total Bookings',
            icon: 'tag',
            value: 2345

        },
        {
            name: 'Total Workers',
            icon: 'person-workspace',
            value: 2345

        },
                {
            name: 'Total Employers',
            icon: 'people',
            value: 2345

        },
    ]

    return (
        <section>
            <h1 className="orb font-semibold text-xl">Dashboard</h1>
            <div className="summary grid-box-fit gap-4 my-3" style={{"--width": "230px"}}>
                {stats.map( (item, index) => 
                    <Cards.StatCard title={item?.name} icon={item?.icon} value={item?.value}/>
                )}
            </div>

            <div className="grid grid-cols-2 max-[800px]:grid-cols-1 gap-3 mt-6">
                <div className="bg-white rounded-md shadow-lg relative">
                    <div className="title absolute top-2 left-2 text font-semibold orb">Bookings This Week</div>
                    <LineChart
                        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                        series={[
                            {
                            data: [2, 5.5, 2, 8.5, 1.5, 5],
                            },
                        ]}
                        height={300}
                        fullWidth
                    />
                </div>
                <div className="bg-white rounded-md shadow-lg relative">
                    <div className="title absolute top-2 left-2 text font-semibold orb">Jobs This Week</div>
                    <LineChart
                        xAxis={[{ scaleType: 'point', data: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"] }]}
                        series={[
                            {
                            data: [2, 5.5, 2, 8.5, 1.5, 5, 10, ],
                            },
                        ]}
                        height={300}
                    />
                </div>
            </div>

            <div className="flex items-center justify-between">
                <h1 className="orb font-semibold mt-6 mb-3">Recent Bookings</h1>
                <Link className="text-blue-600 underline">View All</Link>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Dessert (100g serving)</TableCell>
                        <TableCell align="right">Calories</TableCell>
                        <TableCell align="right">Fat&nbsp;(g)</TableCell>
                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Protein&nbsp;(g)</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell align="right">{row.calories}</TableCell>
                        <TableCell align="right">{row.fat}</TableCell>
                        <TableCell align="right">{row.carbs}</TableCell>
                        <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </section>
    );
}