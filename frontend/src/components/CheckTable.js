import { useState } from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';



const BoxCss = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '20px',
    width: '100vw',
    zIndex: 1
}

const HeaderTableCell = styled(TableCell)({
    borderRight: '1px solid rgb(224,224,224)'
})

export default function BasicTable() {
    const [dateFrom, setDateFrom] = useState([null, null])
    const [dateTo, setDateTo] = useState([null, null])

    const typeRows = ['實驗', '問卷', '訪談'];
    const tagRows = ['普心加分', '現金', '食物']

    const TagCheckButton = () => (
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <HeaderTableCell component="th" scope="row">
                報酬形式：
            </HeaderTableCell>
            <TableCell align='left'>
                {tagRows.map((tag) => (
                    <FormControlLabel
                        control={<Checkbox name={tag} />}
                        label={tag}
                        key={tag}
                    />
                ))}
            </TableCell>
        </TableRow>
    )

    const TypeCheckButton = () => (
        <TableRow>
            <HeaderTableCell component="th" scope="row">
                實驗類型：
            </HeaderTableCell>
            <TableCell align='left'>
                {typeRows.map((type) => (
                    <FormControlLabel
                        control={<Checkbox name={type} />}
                        label={type}
                        key={type}
                    />
                ))}
            </TableCell>
        </TableRow>
    )

    const DatePickerRange = () => {
        const DatePick = ({ date, setDate }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label={date ? '' : '期間'}
                    value={date}
                    onChange={(newDate) => {
                        setDate(newDate);
                    }}
                    views={["year", "month", "day"]}
                    inputFormat="YYYY/MM/DD"
                    disableHighlightToday
                    // InputProps={{ startAdornment: <InputAdornment position="start">自</InputAdornment> }}
                    renderInput={(InputProps) => {
                        let newParams = { ...InputProps, error: false }
                        return <TextField
                            size="small"
                            sx={{ width: '180px', mr: '30px', ml: '10px' }}
                            variant="outlined"
                            InputProps={{ shrink: false }
                            }
                            {...newParams} />
                    }}
                />
            </LocalizationProvider>
        )

        return (
            <TableRow>
                <HeaderTableCell component="th" scope="row">
                    期間：
                </HeaderTableCell>
                <TableCell align='left' sx={{ display: 'flex', alignItems: 'center', fontSize: '1em' }}>
                    自
                    <DatePick date={dateFrom} setDate={setDateFrom} />
                    至
                    <DatePick date={dateTo} setDate={setDateTo} />
                </TableCell>
            </TableRow >
        )
    }

    return (
        <Box sx={BoxCss}>
            <TableContainer sx={{ maxWidth: 800 }} component={Paper} variant={'outlined'} square>
                <Table sx={{ maxWidth: '100%' }} size="small" aria-label="simple table">
                    <TableBody>
                        <DatePickerRange />
                        <TagCheckButton />
                        <TypeCheckButton />
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}