import * as React from 'react';
import { useState, useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// function createData(name, calories, fat, carbs, protein) {
//     return { Dessert, Calories, Fat, Carbs, Protein };
// }

// const food = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function BasicTable() {
    const [food, getFood] = useState([])
    const API = 'https://zpha3bm7o1.execute-api.us-west-1.amazonaws.com/api/';
    const fetchFood = () => {
        fetch(API)
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                getFood(res)
            })
    }
    useEffect(() => {
        fetchFood()
    }, [])
    return (
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
                    {food.map((food) => (
                        <TableRow
                            key={food.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {food.Dessert}
                            </TableCell>
                            <TableCell align="right">{food.Calories}</TableCell>
                            <TableCell align="right">{food.Fat}</TableCell>
                            <TableCell align="right">{food.Carbs}</TableCell>
                            <TableCell align="right">{food.Protein}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}