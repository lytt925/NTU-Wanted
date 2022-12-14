import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
// import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';

export default function CheckboxesGroup() {
    const [state, setState] = React.useState({
        問卷: false,
        實驗: false,
        訪談: false,
    });

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };

    const { gilad, jason, antoine } = state;
    const error = [gilad, jason, antoine].filter((v) => v).length !== 2;

    return (
        <FormControl sx={{ m: '10px', display: 'flex', 'flexDirection': 'row' }} component="fieldset" variant="standard">
            <FormLabel sx={{ float: 'left', display: 'flex', alignItems: 'center' }} component="legend">類型</FormLabel>
            <FormGroup row>
                <FormControlLabel
                    control={
                        <Checkbox checked={gilad} onChange={handleChange} name="gilad" />
                    }
                    label="問卷"
                />
                <FormControlLabel
                    control={
                        <Checkbox checked={jason} onChange={handleChange} name="jason" />
                    }
                    label="實驗"
                />
                <FormControlLabel
                    control={
                        <Checkbox checked={antoine} onChange={handleChange} name="antoine" />
                    }
                    label="訪談"
                />
            </FormGroup>
        </FormControl >
    );
}