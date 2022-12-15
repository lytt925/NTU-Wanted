import ResponsiveAppBar from '../components/AppBar'
import SearchBar from '../components/SearchBar';
import CheckTable from '../components/CheckTable'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box';
import ResultList from '../components/ResultsList'
import { Container } from '@mui/material';
import React, { useState, useEffect } from 'react'
import { width } from '@mui/system';

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
        <Box sx={BoxCss}>
            <SearchBar />
            {/* <CheckboxesGroup /> */}
        </Box>
        <CheckTable />
        <Box sx={{ height: '1px', width: '100vw', borderTop: '1px solid lightgrey', position: 'sticky', top: '176px' }}></Box>
        <ResultList />
    </Wrapper >
)

export default HomePage