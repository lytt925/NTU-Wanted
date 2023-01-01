import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import TaskInfo from './TaskInfo';
import { useNavigate, useLocation } from 'react-router-dom'
import Pagination from '@mui/material/Pagination';

// import { ExpList } from '../../db';


export default function ResultList({ pageList }) { // { expList, setExpList }
    const BoxCss = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'sticky',
        top: '150px',
        width: '69.5%',
        minWidth: '450px',
        '&, .TaskInfo:first-of-type': { marginTop: "10px", borderTopRightRadius: "5px", borderTopLeftRadius: "5px" },
        '&, .TaskInfo:last-of-type': { marginBottom: "20px", borderBottomRightRadius: "5px", borderBottomLeftRadius: "5px" },
    }

    return (
        <>
        <Box sx={BoxCss}>
            {
                pageList.map((a, key) => (
                    <TaskInfo a={a} key={key} />
                ))
            }
        </Box>
        </>
    )
}