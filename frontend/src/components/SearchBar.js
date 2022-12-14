import { useState } from "react"
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import MultipleSelect from "./MultiSelect";

const SearchInput = styled(TextField)`
  margin: 10px;
`;

const locations = ['校總區', '城中校區', '家裡'];
// const tags = ['普心實驗', '現金', '食物', '其他']

const SearchBar = () => {
    return (
        <Box
            component="form"
            sx={{ mx: 'auto', my: '20px', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            noValidate
            autoComplete="on"
        >
            <SearchInput label="名稱" variant="standard" sx={{ width: 300 }} />
            <MultipleSelect tasks={locations} label={"實驗地點"} />
            {/* <MultipleSelect tasks={tags} label={"時間"} /> */}
            <TextField id="date"
                type="date"
                variant="standard"
                label="實驗時間"
                sx={{ width: 250 }}
                InputLabelProps={{
                shrink: true,
                }}
            />
            <Button sx={{ margin: "8px" }} variant="contained" size="large">搜尋</Button>
        </Box>
    );
}

export default SearchBar