import { useState } from "react"
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import MultipleSelect from "./MultiSelect";
import { useInfo } from "../../containers/hooks/useInfo";
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';

const SearchInput = styled(TextField)`
  margin: 10px;
`;

const locations = ['校總區', '城中校區', '家裡'];

const SearchBar = () => {
    const { sendSearch, test, setTest } = useInfo()
    const [loading, setLoading] = useState(false)
    console.log(test)

    return (
        <Box
            component="form"
            sx={{ mx: 'auto', my: '20px', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'sticky', top: '68px', left: 0 }}
            noValidate
            autoComplete="on"
        >
            <SearchInput label="名稱" variant="standard" sx={{ width: 500 }} />
            <MultipleSelect tasks={locations} label={"地點"} />
            <LoadingButton
                onClick={() => setTest(!test)}
                endIcon={<SendIcon />}
                loading={loading}
                loadingPosition="end"
                variant="contained"
                sx={{ height: '43px', width: "90px", margin: '8px' }}
            >
                {test ? '搜尋' : 'ddd'}
            </LoadingButton>
        </Box >
    );
}

export default SearchBar