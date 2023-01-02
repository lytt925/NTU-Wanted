import ResponsiveAppBar from '../Navbar/Navbar'
import SearchBar from '../HomePage/Search/SearchBar';
import CheckTable from '../HomePage/Search/CheckTable'
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

const LikedListPage = () => {

    const body = document.querySelector('body');
    body.style.backgroundColor = '#FFFFFF';

    const { state } = useLocation();
    const [count, setCount] = useState(0);
    const { login, name, email, likedList, setLikedList } = useUser()
    const navigate = useNavigate()

    useEffect(() => {
        if (!login) {
            navigate('/')
        }
    }, [login])

    return (
        <Wrapper className='App'>
            {/* <SearchBar expList={likedList} setExpList={setLikedList} setCount={setCount} />
            <CheckTable /> */}
            <ResultPage expList={likedList} count={count} />
        </Wrapper >
    )
}



export default LikedListPage