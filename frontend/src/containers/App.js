import { ResponsiveAppBar } from '../components/Navbar/Navbar'
import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import InfoForm from '../components/CreatePost/InfoForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import HomePage from '../components/HomePage/HomePage';
import ExpPage from '../components/ExpPage/ExpPage';
import MyExp from '../components/MyExp/MyExp';
import MyLikedListPage from '../components/MyLikedList/MyLikedList'

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
                <Route path="/" element={<HomePage />} />
                <Route path="/newpost" element={<InfoForm />} />
                <Route path="/experiment/:id" element={<ExpPage />} />
                <Route path='/myexperiment' element={<MyExp />} />
                <Route path='/mylikedlist' element={<MyLikedListPage />} />
            </Routes>
        </Router>
    );
}

export default App;
