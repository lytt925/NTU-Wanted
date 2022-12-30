import { useState } from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import { useFilter } from "../../../containers/hooks/useFilter";



const BoxCss = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '20px',
    width: '69.5%',
    minWidth: '600px',
    zIndex: 1
}

const HeaderTableCell = styled(TableCell)({
    borderRight: '1px solid rgb(224,224,224)',
    padding: '2px 6px 2px 15px'
})

const RowTableCell = styled(TableCell)({
    padding: '2px 16px'
})

export default function BasicTable() {
    const { rewardTagsSelected, setRewardTagsSelected, typeTagsSelected, setTypeTagsSelected, locationTagsSelected, setLocationTagsSelected } = useFilter()

    const typeTagsRows = ['實驗', '問卷', '訪談', '其他'];
    const rewardTagsRows = ['普心時數', '現金', '食物', '其他']
    const locationTagsRows = ['校總區', '城中校區', '家裡']

    const checkBoxList = [
        { header: '報酬形式', checkBoxes: typeTagsRows, boxState: typeTagsSelected, setBoxState: setTypeTagsSelected },
        { header: '實驗類型', checkBoxes: rewardTagsRows, boxState: rewardTagsSelected, setBoxState: setRewardTagsSelected },
        { header: '地點', checkBoxes: locationTagsRows, boxState: locationTagsSelected, setBoxState: setLocationTagsSelected }
    ]

    const handleCheck = (e, boxState, setBoxState) => {
        const newBoxSelected = boxState.slice()
        if (e.target.checked) newBoxSelected.push(e.target.name)
        else {
            const boxToRemoveIdx = newBoxSelected.indexOf(e.target.name);
            if (boxToRemoveIdx > -1) { // only splice array when item is found
                newBoxSelected.splice(boxToRemoveIdx, 1); // 2nd parameter means remove one item only
            }
        }
        setBoxState(newBoxSelected)
        console.log(newBoxSelected)
    }

    const CheckButtonRow = ({ header, checkBoxes, boxState, setBoxState }) => {
        return <TableRow>
            <HeaderTableCell component="th" scope="row">
                {header}：
            </HeaderTableCell>
            <RowTableCell align='left'>
                {checkBoxes.map((box) => (
                    <FormControlLabel
                        control={
                            <Checkbox
                                name={box}
                                onChange={(e) => handleCheck(e, boxState, setBoxState)}
                                checked={boxState.includes(box)}
                            />
                        }
                        label={box}
                        key={box}
                    />
                ))}
            </RowTableCell>
        </TableRow>
    }

    return (
        <Box sx={BoxCss}>
            <TableContainer component={Paper} variant={'outlined'}>
                <Table sx={{ maxWidth: '100%' }} size="small" padding='none' aria-label="filter table">
                    <TableBody>
                        {/* <DatePickerRange /> */}
                        {checkBoxList.map(({ header, checkBoxes, boxState, setBoxState }) => (
                            <CheckButtonRow key={header} header={header} checkBoxes={checkBoxes} boxState={boxState} setBoxState={setBoxState} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}