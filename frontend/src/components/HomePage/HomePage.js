import ResponsiveAppBar from './AppBar'
import SearchBar from './SearchBar';
import CheckTable from './CheckTable'
import { styled } from '@mui/material/styles'
import ResultList from './ResultsList'
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

const HomePage = () => (
    <Wrapper className='App'>
        <SearchBar />
        <CheckTable />
        <Box sx={{ height: '1px', width: '100vw', borderTop: '1px solid lightgrey', position: 'sticky', top: '148px' }}></Box>
        <ResultList />
    </Wrapper >
)

export default HomePage