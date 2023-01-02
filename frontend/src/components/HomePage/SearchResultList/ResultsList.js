import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import TaskInfo from './TaskInfo';
import { Context } from '../../Navbar/Navbar';
import { useNavigate, useLocation } from 'react-router-dom'
import Pagination from '@mui/material/Pagination';
import axios from '../../../containers/api'

// import { ExpList } from '../../db';


export default function ResultList({ pageList }) { // { expList, setExpList }

    // let likedList
    // const getLikedList = async () => {
    //     if (Context.email) {
    //         likedList = await axios.get('getLikedList', {
    //             params: {
    //                 email: Context.email
    //             }
    //         })
    //         console.log(likedList)
    //     }
    // }

    // useEffect(() => {
    //     getLikedList()
    // })

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