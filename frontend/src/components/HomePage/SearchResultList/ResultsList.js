import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import TaskInfo from './TaskInfo';
import { Context } from '../../Navbar/Navbar';
import { useNavigate, useLocation } from 'react-router-dom'
import Pagination from '@mui/material/Pagination';
import axios from '../../../containers/api'
import { useUser } from '../../../containers/hooks/useUser';

// import { ExpList } from '../../db';


export default function ResultList({ pageList }) { // { expList, setExpList }

    const { likedList } = useUser()

    return (
        <>
            {
                pageList.map((task, key) => (
                    <TaskInfo task={task} key={key} liked={likedList.includes(task._id)} />
                ))
            }
        </>
    )
}