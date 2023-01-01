import { useEffect, useState } from "react"
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField';
// import MultipleSelect from "./MultiSelect";
import { useFilter } from "../../../containers/hooks/useFilter";
import LoadingButton from '@mui/lab/LoadingButton';
import SearchIcon from '@mui/icons-material/Search';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from '../../../containers/api';
import { useNavigate, useLocation } from 'react-router-dom'
import { PER_PAGE } from "../../../utils/constants";

const SearchInput = styled(TextField)`
  margin: 10px 10px 10px 10px;
`;

const RangeLabel = styled('span')({
    marginBottom: '16.4px'
})

const searchBoxCss = {
    mx: 'auto',
    pb: '12px',
    display: 'flex',
    alignItems: 'end',
    justifyContent: 'center',
    position: 'sticky',
    top: '68px',
    backgroundColor: '#FFFFFF',
    zIndex: 3,
    width: '69.5%',
    minWidth: '600px',
}

const SearchBar = ({ expList, setExpList, setCount }) => {
    const { setSearchTitle, setTimeRange, searchTitle, timeRange, locationTagsSelected, rewardTagsSelected, typeTagsSelected, } = useFilter()
    const [loading, setLoading] = useState(false)

    const { state } = useLocation();

    const sendSearch = async () => {
        // console.log({
        //     searchTitle,
        //     locationTagsSelected,
        //     timeRange,
        //     rewardTagsSelected,
        //     typeTagsSelected,
        // })
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
            console.log(contents)
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

    const formatDate = (newDate) => {
        const date = newDate.$d.toLocaleDateString().split('/')
        const year = date.pop()
        date.unshift(year)
        const displayDate = date.join('/')
        return displayDate
    }

    const disableDay = (day, from, to, timeRange) => {
        const date = formatDate(day)
        if (timeRange.from && to) {
            const d = new Date(date).getTime();
            const f = new Date(timeRange.from).getTime()
            if (d >= f) {
                return false
            }
            return true
        } else if (timeRange.to && from) {
            const d = new Date(date).getTime();
            const f = new Date(timeRange.to).getTime()
            if (d <= f) {
                return false
            }
            return true
        }
        return false
    }

    const DatePickerRange = () => {
        const DatePick = ({ date, from, to }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="zh-TW">
                <DatePicker
                    label={date ? '' : '日期'}
                    value={date}
                    onChange={(newDate) => {
                        // console.log(newDate.$d.toLocaleDateString())
                        const displayDate = formatDate(newDate)
                        const newTimeRange = { ...timeRange }
                        if (from) newTimeRange.from = displayDate
                        else if (to) newTimeRange.to = displayDate
                        setTimeRange(newTimeRange);
                    }}
                    shouldDisableDate={(day) => disableDay(day, from, to, timeRange)}
                    views={["year", "month", "day"]}
                    inputFormat="YYYY/MM/DD"
                    disableHighlightToday
                    renderInput={(InputProps) => {
                        let newParams = { ...InputProps, error: false }
                        return <TextField
                            size="small"
                            sx={{ width: '160px', margin: '10px' }}
                            variant="outlined"
                            InputProps={{ shrink: false }
                            }
                            {...newParams} />
                    }}
                />
            </LocalizationProvider >
        )
        return (
            <>
                <RangeLabel>自</RangeLabel>
                <DatePick date={timeRange.from} from={true} />
                <RangeLabel>至</RangeLabel>
                <DatePick date={timeRange.to} to={true} />
            </>
        )
    }

    return (
        <Box
            component="form"
            sx={searchBoxCss}
            noValidate
            autoComplete="on"
        >
            <SearchInput placeholder="搜尋" variant="outlined" sx={{ width: '300px', flexShrink: "2" }} onChange={searchTitleHandler} value={searchTitle} size='small' />
            <DatePickerRange />
            <LoadingButton
                onClick={sendSearch}
                endIcon={<SearchIcon />}
                loading={loading}
                loadingPosition="end"
                variant="contained"
                sx={{ height: '43px', width: "90px", margin: '10px' }}
            >
                搜尋
            </LoadingButton>
        </Box >
    );
}

export default SearchBar