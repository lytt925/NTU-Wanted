import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles'

const typeRows = ['實驗', '問卷', '訪談'];
const tagRows = ['普心加分', '現金', '食物']

export default function BasicTable() {
    return (
        <TableContainer sx={{ maxWidth: 800 }} component={Paper} variant={'outlined'} square>
            <Table sx={{ maxWidth: '100%' }} size="small" aria-label="simple table">
                <TableBody>
                    <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            報酬類型
                        </TableCell>
                        <TableCell align='left'>
                            {tagRows.map((tag) => (
                                <FormControlLabel
                                    control={
                                        <Checkbox name={tag} />
                                    }
                                    label={tag}
                                    key={tag}
                                />
                            ))}
                        </TableCell>
                    </TableRow>
                    <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            類型
                        </TableCell>
                        <TableCell align='left'>
                            {typeRows.map((type) => (
                                <FormControlLabel
                                    control={
                                        <Checkbox name={type} />
                                    }
                                    label={type}
                                    key={type}
                                />
                            ))}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}