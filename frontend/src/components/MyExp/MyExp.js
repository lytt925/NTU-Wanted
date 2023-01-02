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
import { useNavigate, useLocation } from 'react-router-dom'
import { useUser } from '../../containers/hooks/useUser';


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
    const { name, email } = useUser()

    const sendmySearch = async () => {
        const { data: { message, contents } } =
            await axios.get('/getMyexp', {
                params: {
                    name, email
                }
            },)
        if (message === 'success') {
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
            <ResultPage expList={expList} count={count} />
        </Wrapper >
    )
}



export default HomePage