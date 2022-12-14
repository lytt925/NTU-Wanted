import ResponsiveAppBar from '../components/AppBar'
import SearchBar from '../components/SearchBar';
import CheckboxesGroup from '../components/CheckBox'
import CheckTable from '../components/CheckTable'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box';
import ResultList from '../components/ResultsList'
import { Container } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import InfoForm from '../components/InfoForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const BoxCss = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'sticky', top: '68px', left: 0,
    backgroundColor: 'white',
    zIndex: 3
    // borderBottom: '2px solid lightgrey'
}


const Wrapper = styled(Container)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
})

function App() {
    // const navigate = useNavigate();
    // const Topost = () => {
    //     navigate('/newpost')
    // }
    // console.log(postPage);
    // useEffect(() => {
    //     if (postPage === true) {
    //         Topost();
    //     }
    // }, [postPage])

    return (
        <Router>
            <ResponsiveAppBar />
            <Routes>
                <Route path="/" element={<Wrapper className='App'>
                    <Box sx={BoxCss}>
                        <SearchBar />
                        {/* <CheckboxesGroup /> */}
                    </Box>
                    <CheckTable />
                    <Box sx={{ height: '1px', width: '100vw', borderTop: '1px solid lightgrey', position: 'sticky', top: '176px' }}></Box>
                    <ResultList />
                </Wrapper >} />
                <Route path="/newpost" element={<InfoForm />} />

            </Routes>
        </Router>
    );
}

export default App;
