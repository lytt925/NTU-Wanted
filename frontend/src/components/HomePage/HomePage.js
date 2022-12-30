import ResponsiveAppBar from '../Navbar/Navbar'
import SearchBar from './Search/SearchBar';
import CheckTable from './Search/CheckTable'
import { styled } from '@mui/material/styles'
import ResultList from './SearchResultList/ResultsList'
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import React, { useState, useEffect } from 'react'

const BoxCss = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'sticky', top: '68px', left: 0, // 68px is the height of the Appbar
    backgroundColor: 'white',
    zIndex: 3
}

const Wrapper = styled(Container)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
})

const HomePage = () => {

    const body = document.querySelector('body');
    body.style.backgroundColor = '#FFFFFF';

    const [result, setResult] = useState([])

    return (
        <Wrapper className='App'>
            <SearchBar result={result} setResult={setResult} />
            <CheckTable />
            <Box sx={{ height: '1px', width: '99vw', borderTop: '1px solid lightgrey', position: 'sticky', top: '144px' }}></Box>
            <ResultList result={result} setResult={setResult} />
        </Wrapper >
    )
}



export default HomePage