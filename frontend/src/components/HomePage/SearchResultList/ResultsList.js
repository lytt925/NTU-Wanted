import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import TaskInfo from './TaskInfo';
import { useNavigate, useLocation } from 'react-router-dom'
import Pagination from '@mui/material/Pagination';

// import { ExpList } from '../../db';


export default function ResultList({ pageList }) { // { expList, setExpList }

    return (
        <>
            {
                pageList.map((task, key) => (
                    <TaskInfo task={task} key={key} />
                ))
            }
        </>
    )
}