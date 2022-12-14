import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import TaskInfo from './Info';

const BoxCss = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}

export default function ResultList() {
    return (
        <Box sx={BoxCss}>
            <TaskInfo />
        </Box>
    )
}