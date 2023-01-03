import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography';
import { useFilter } from "../../../containers/hooks/useFilter";
import React from 'react';
import { useState } from 'react';
import { Collapse } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ClearAllIcon from '@mui/icons-material/ClearAll';


const BoxCss = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '20px',
    width: '69.5%',
    minWidth: '330px',
}

const HeaderTableCell = styled(TableCell)({
    borderRight: '1px solid rgb(224,224,224)',
    padding: '2px 6px 2px 12px',
    width: '120px',
    minWidth: '96px'
})

const RowTableCell = styled(TableCell)({
    padding: '2px 16px'
})

const BasicTable = React.forwardRef((props, ref) => {
    const { rewardTagsSelected, setRewardTagsSelected, typeTagsSelected, setTypeTagsSelected, locationTagsSelected, setLocationTagsSelected, setTimeRange } = useFilter()

    const typeTagsRows = ['實驗', '問卷', '訪談', '其他'];
    const rewardTagsRows = ['普心時數', '現金', '食物', '其他']
    const locationTagsRows = ['校總區', '城中校區', '線上']

    const checkBoxList = [
        { header: '📃 研究類型', checkBoxes: typeTagsRows, boxState: typeTagsSelected, setBoxState: setTypeTagsSelected },
        { header: '💰 報酬形式', checkBoxes: rewardTagsRows, boxState: rewardTagsSelected, setBoxState: setRewardTagsSelected },
        { header: '🚗 地點', checkBoxes: locationTagsRows, boxState: locationTagsSelected, setBoxState: setLocationTagsSelected }
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
    }

    const CheckButtonRow = ({ header, checkBoxes, boxState, setBoxState }) => {
        return <TableRow >
            <HeaderTableCell component="th" scope="row" sx={{
                fontWeight: "bold",
                backgroundColor: "rgb(223, 230, 217)",
                textAlign: "left"
            }}>
                {header}：
            </HeaderTableCell>
            <RowTableCell align='left'>
                {checkBoxes.map((box) => (
                    <FormControlLabel
                        control={
                            <Checkbox
                                size="small"
                                name={box}
                                onChange={(e) => handleCheck(e, boxState, setBoxState)}
                                checked={boxState.includes(box)}
                                sx={{
                                    '&.Mui-checked': {
                                        color: "#AEC17B",
                                    }
                                }}
                            />
                        }
                        label={<Typography sx={{ fontSize: '15px' }}>{box}</Typography>}
                        key={box}
                    />
                ))}
            </RowTableCell>
        </TableRow>
    }

    const [open, setOpen] = useState(true);
    const handleClick = () => {
        setOpen(!open);
    };

    const clearFilter = () => {
        setRewardTagsSelected([])
        setTypeTagsSelected([])
        setLocationTagsSelected([])
        setTimeRange([])
    }


    return (
        <Box id="checktable" sx={BoxCss} >
            <TableContainer component={Paper} variant={'outlined'}>
                <Table sx={{ maxWidth: '100%' }} size="small" padding='none' aria-label="filter table" ref={ref}>
                    <TableHead>
                        <TableRow >
                            <TableCell sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <IconButton
                                        aria-label="expand row"
                                        size="small"
                                        onClick={() => setOpen(!open)}
                                    >
                                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                    </IconButton>
                                    篩選條件
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    清除條件
                                    <IconButton
                                        aria-label="expand row"
                                        size="small"
                                        onClick={clearFilter}
                                        sx={{ float: 'right' }}
                                    >
                                        <ClearAllIcon />
                                    </IconButton>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Collapse in={open} timeout="auto" sx={{ backgroundColor: "rgb(235, 242, 230)", border: 2, borderColor: "white" }}>
                                    <Table>
                                        {/* <DatePickerRange /> */}
                                        {checkBoxList.map(({ header, checkBoxes, boxState, setBoxState }, index) => (
                                            <TableBody key={index} style={{ width: "100%" }}>
                                                <CheckButtonRow key={header} header={header} checkBoxes={checkBoxes} boxState={boxState} setBoxState={setBoxState} />
                                            </TableBody>
                                        ))}
                                    </Table>
                                </Collapse>
                            </TableCell>
                        </TableRow>
                    </TableBody>



                </Table>
            </TableContainer>
        </Box >
    );
})
export default BasicTable;