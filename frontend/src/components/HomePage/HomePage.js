import ResponsiveAppBar from '../Navbar/Navbar'
import SearchBar from './Search/SearchBar';
import CheckTable from './Search/CheckTable'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import React, { useState, useEffect } from 'react'
import ResultPage from '../../containers/ResultPage';
import ScrollToTop from './ScrollToTop';

// const BoxCss = {
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'sticky', top: '68px', left: 0, // 68px is the height of the Appbar
//     backgroundColor: 'white',
//     zIndex: 3
// }

const Wrapper = styled(Container)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
})

const HomePage = () => {

    const body = document.querySelector('body');
    body.style.backgroundColor = '#FFFFFF';

    const [expList, setExpList] = useState([])
    const [count, setCount] = useState(0);

    return (
        <Wrapper className='App'>
            <ScrollToTop />
            <SearchBar expList={expList} setExpList={setExpList} setCount={setCount} />
            <CheckTable />
            <ResultPage expList={expList} count={count} />
        </Wrapper >
    )
}


export default HomePage