import { useState } from "react"
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import MultipleSelect from "./MultiSelect";

const SearchInput = styled(TextField)`
  margin: 10px;
`;


const tasks = ['問卷', '實驗', '訪談'];
const tags = ['普心實驗', '現金', '食物', '其他']

const SearchBar = () => {
    return (
        <Box
            component="form"
            sx={{ mx: 'auto', my: '20px', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            noValidate
            autoComplete="on"
        >
            <SearchInput label="名稱" variant="standard" sx={{ width: 300 }} />
            <MultipleSelect tasks={tasks} label={"地點"} />
            <MultipleSelect tasks={tags} label={"時間"} />
            <Button sx={{ margin: "8px" }} variant="contained" size="large">搜尋</Button>
        </Box>
    );
}

export default SearchBar