import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import TaskInfo from './TaskInfo';

import { useNavigate, useLocation } from 'react-router-dom'
// import { ExpList } from '../../db';

import axios from 'axios'
// import { isHtmlElement } from 'react-router-dom/dist/dom';
const instance = axios.create({
    baseURL: 'http://localhost:4000/api'
})



export default function ResultList({ expList, setExpList }) {
    const { state } = useLocation();
    // const [expList, setExpList] = useState([])
    // const getExpList = async () => {
    //     // TODO Part I-3-b: get information of restaurants from DB
    //     // const location = state.location
    //     const { data } = await instance.get('/getSearch', { params: {} });
    //     // console.log(data);
    //     setExpList(data.contents);
    // }

    // useEffect(() => {
    //     getExpList()
    // }, [state])

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
        <Box sx={BoxCss}>
            {
                expList.map((a, key) => (
                    <TaskInfo a={a} key={key} />
                ))
            }
        </Box>
    )
}