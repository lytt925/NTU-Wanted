import { useState } from "react"
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



const SearchBar = () => {
    const { setSearchName, setTimeRange, searchName, location, timeRange, tagSelected, typeSelected } = useFilter()
    const [loading, setLoading] = useState(false)


    const searchNameHandler = (e) => {
        setSearchName(e.target.value)
    }

    const sendSearch = async () => {
        console.log({
            searchName,
            location,
            timeRange,
            tagSelected,
            typeSelected,
        })
    };

    // const locations = ['校總區', '城中校區', '家裡'];

    const DatePickerRange = () => {
        const DatePick = ({ date, from, to }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label={date ? '' : '期間'}
                    value={date}
                    onChange={(newDate) => {
                        const newTimeRange = timeRange.slice()
                        const YDMList = [newDate.$y, newDate.$M, newDate.$D]
                        if (from) newTimeRange[0] = YDMList.join('/')
                        else if (to) newTimeRange[1] = YDMList.join('/')
                        console.log(newTimeRange)
                        setTimeRange(newTimeRange);
                    }}
                    views={["year", "month", "day"]}
                    inputFormat="YYYY/MM/DD"
                    disableHighlightToday
                    // InputProps={{ startAdornment: <InputAdornment position="start">自</InputAdornment> }}
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
            </LocalizationProvider>
        )

        return (
            <>
                <RangeLabel>自</RangeLabel>
                <DatePick date={timeRange[0]} from={true} />
                <RangeLabel>至</RangeLabel>
                <DatePick date={timeRange[1]} to={true} />
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
            <SearchInput placeholder="搜尋" variant="outlined" sx={{ width: '300px' }} onChange={searchNameHandler} value={searchName} size='small' />
            <DatePickerRange />
            {/* <MultipleSelect types={locations} label={"地點"} value={location} setValue={setLocation} /> */}
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