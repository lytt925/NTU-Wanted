import ResponsiveAppBar from '../Navbar/Navbar'
// import SearchBar from '../HomePage/Search/SearchBar';
// import CheckTable from '../HomePage/Search/CheckTable'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import React, { useState, useEffect } from 'react'
import ResultPage from '../../containers/ResultPage';
import axios from '../../containers/api';
import { PER_PAGE } from '../../utils/constants';
import { Context } from '../Navbar/Navbar';
import { useNavigate, useLocation } from 'react-router-dom'


const Wrapper = styled(Container)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
})

const HomePage = () => {

    const body = document.querySelector('body');
    body.style.backgroundColor = '#FFFFFF';

    const { state } = useLocation();
    const [expList, setExpList] = useState([])
    const [count, setCount] = useState(0);
    const c = Context;
    const name = c.name;
    const email = c.email

    const sendmySearch = async () => {
        // console.log({
        //     searchTitle,
        //     locationTagsSelected,
        //     timeRange,
        //     rewardTagsSelected,
        //     typeTagsSelected,
        // })
        // setLoading(true)
        // console.log({ name, email });
        const { data: { message, contents } } =
            await axios.get('/getMyexp', {
                params: {
                    name, email
                }
            },)
        if (message === 'success') {
            // console.log(contents)
            setExpList(contents)
            //計算分頁數
            const newCount = Math.ceil(contents.length / PER_PAGE);
            setCount(newCount);
        }
    }

    useEffect(() => {
        sendmySearch();
    }, [state])


    return (
        <Wrapper className='App'>
            {/* <SearchBar expList={expList} setExpList={setExpList} setCount={setCount} /> */}
            {/* <CheckTable /> */}
            {/* <Box sx={{ height: '1px', width: '99vw', borderTop: '1px solid lightgrey', position: 'sticky', top: '144px' }}></Box> */}
            <ResultPage expList={expList} count={count} />
        </Wrapper >
    )
}



export default HomePage