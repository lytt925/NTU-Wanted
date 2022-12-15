import { useState } from "react"
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput'
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 100,
        },
    },
};

function getStyles(task, taskName, theme) {
    return {
        fontWeight:
            taskName.indexOf(task) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function MultipleSelect({ label, types, value, setValue }) {
    const theme = useTheme();

    const handleChange = (event) => {
        const { target: { value } } = event;
        setValue(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div>
            <FormControl variant='standard' sx={{ m: 1, width: 185 }}>
                <InputLabel >{label}</InputLabel>
                <Select
                    multiple
                    value={value}
                    onChange={handleChange}
                    MenuProps={MenuProps}
                >
                    {types.map((type) => (
                        <MenuItem
                            key={type}
                            value={type}
                            style={getStyles(type, value, theme)}
                        >
                            {type}
                        </MenuItem>
                    ))}
                </Select>
                {/* <FormHelperText>Helper Text</FormHelperText> */}
            </FormControl>
        </div >
    );
}