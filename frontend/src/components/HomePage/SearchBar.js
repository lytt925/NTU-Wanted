import { useState } from "react"
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField';
import MultipleSelect from "./MultiSelect";
import { useInfo } from "../../containers/hooks/useInfo";
import LoadingButton from '@mui/lab/LoadingButton';
import SearchIcon from '@mui/icons-material/Search';

const SearchInput = styled(TextField)`
  margin: 10px;
`;

const searchBoxCss = {
    mx: 'auto',
    my: '20px',
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'sticky',
    top: '68px'
}


const SearchBar = () => {
    const { sendSearch, test, setTest, searchName, setSearchName, location, setLocation } = useInfo()
    const [loading, setLoading] = useState(false)

    const searchNameHandler = (e) => {
        setSearchName(e.target.value)
    }

    const locations = ['校總區', '城中校區', '家裡'];

    return (
        <Box
            component="form"
            sx={searchBoxCss}
            noValidate
            autoComplete="on"
        >
            <SearchInput label="名稱" variant="standard" sx={{ width: 500 }} onChange={searchNameHandler} />
            <MultipleSelect types={locations} label={"地點"} value={location} setValue={setLocation} />
            <LoadingButton
                onClick={sendSearch}
                endIcon={<SearchIcon />}
                loading={loading}
                loadingPosition="end"
                variant="contained"
                sx={{ height: '43px', width: "90px", margin: '8px' }}
            >
                搜尋
            </LoadingButton>
        </Box >
    );
}

export default SearchBar