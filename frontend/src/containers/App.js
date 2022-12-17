import ResponsiveAppBar from '../components/Navbar/Navbar'
import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import InfoForm from '../components/CreatePost/InfoForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../components/HomePage/HomePage';

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
            </Routes>
        </Router>
    );
}

export default App;
