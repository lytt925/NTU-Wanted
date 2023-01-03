import { useEffect, useState } from "react"
import './SearchBar.css'
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField';
// import MultipleSelect from "./MultiSelect";
import { useFilter } from "../../../containers/hooks/useFilter";
import LoadingButton from '@mui/lab/LoadingButton';
import SearchIcon from '@mui/icons-material/Search';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from '../../../containers/api';
import { useLocation } from 'react-router-dom'
import { PER_PAGE } from "../../../utils/constants";
import { Form, DatePicker } from 'antd';
import dayjs from 'dayjs'
const { RangePicker } = DatePicker;

const SearchInput = styled(TextField)`
  margin: 10px 10px 10px 10px;
`;

// const RangeLabel = styled('span')({
//     marginBottom: '16.4px'
// })

const searchBoxCss = {
    mx: 'auto',
    pb: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '71%',
    minWidth: '310px',
    flexWrap: 'wrap'
}

const SearchBar = ({ expList, setExpList, setCount }) => {
    const { setSearchTitle, setTimeRange, searchTitle, timeRange, locationTagsSelected, rewardTagsSelected, typeTagsSelected, } = useFilter()
    const [loading, setLoading] = useState(false)

    const { state } = useLocation();

    const sendSearch = async () => {
        setLoading(true)
        const { data: { message, contents } } =
            await axios.get('/getExpList', {
                params: {
                    searchTitle,
                    locationTagsSelected,
                    timeRange,
                    rewardTagsSelected,
                    typeTagsSelected,
                },
            })
        if (message === 'success') {
            setExpList(contents)
            //計算分頁數
            const newCount = Math.ceil(contents.length / PER_PAGE);
            setCount(newCount);
        }
    }

    useEffect(() => {
        sendSearch()
    }, [state])

    useEffect(() => {
        if (expList) {
            setLoading(false)
        }
    }, [expList])

    const searchTitleHandler = (e) => {
        setSearchTitle(e.target.value)
    }

    const timeRangeHandler = (rangeValue) => {
        const newTimeRange = {
            from: rangeValue[0]?.format('YYYY/MM/DD'),
            to: rangeValue[1]?.format('YYYY/MM/DD')
        }
        setTimeRange(newTimeRange)
    }

    const DateRangePicker = () => {
        const toDayjs = (formattedDate) => {
            if (formattedDate)
                return dayjs(formattedDate, 'YYYY/MM/DD')
            return null
        }
        return (
            <Form name="dateForm" style={{ margin: '10px', display: 'flex', boxSizing: 'border-box', height: '41px', flex: '1 1', minWidth: '260px' }}>
                <RangePicker placeholder={["開始時間", "結束時間"]} className='rangePicker'
                    style={{ boxSizing: 'border-box', height: '41px', flex: '1 1 45%' }}
                    format='YYYY/MM/DD'
                    value={[toDayjs(timeRange?.from), toDayjs(timeRange?.to)]}
                    onChange={timeRangeHandler}
                />
            </Form >
        )
    }


    return (
        <Box
            sx={searchBoxCss}
            noValidate
            autoComplete="on"
        >
            <SearchInput placeholder="搜尋" variant="outlined" sx={{ boxSizing: 'border-box', flex: '1 1 45%',
                                                                        outlineColor:"red"}} 
                            onChange={searchTitleHandler} value={searchTitle} size='small' />
            {/* <DatePickerRange /> */}
            <DateRangePicker />
            <LoadingButton
                onClick={sendSearch}
                endIcon={<SearchIcon />}
                loading={loading}
                loadingPosition="end"
                variant="contained"
                sx={{ height: '40px', minWidth: '88px', 
                width: "90px", margin: '7px', flex: '1 1 10%',
                backgroundColor:"#AEC17B",
                '&:hover':{
                    backgroundColor:"orangeRed"
                } 
                }}
            >
                搜尋
            </LoadingButton>
        </Box >
    );
}

export default SearchBar