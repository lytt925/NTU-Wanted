import SearchBar from './Search/SearchBar';
import CheckTable from './Search/CheckTable'
import { styled } from '@mui/material/styles'
import { Container } from '@mui/material';
import React, { useRef, useState } from 'react'
import ResultPage from '../../containers/ResultPage';
import ScrollToTop from './ScrollToTop';
import { Tour } from 'antd';
// import {Button} from 'antd';
import './HomePage.css'
import { positions } from '@mui/system';

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
    alignItems: 'center'
})

const HomePage = () => {

    const body = document.querySelector('body');
    body.style.backgroundColor = '#FFFFFF';

    const [expList, setExpList] = useState([])
    const [count, setCount] = useState(0);
    const searchBarRef = useRef(null);
    const checkBoxRef = useRef(null);
    const [open, setOpen] = useState(false);
    const steps = [
        {
            title: '搜尋',
            description: '輸入您想尋找的研究標題關鍵字，並選取您有空的時段 (皆為選填)。',
            target: () => searchBarRef.current,
        },
        {
            title: '多重篩選',
            description: '自由篩選您想尋找的特定研究類型、報酬形式及研究地點。',
            target: () => checkBoxRef.current,
            placement: "leftBottom"
        },
        {
            title: '登入帳號',
            description: '連結google帳號以新增研究、查看您發佈和收藏的研究。',
            target: () => document.querySelector(".css-1ogtxmm"),
            placement: "topRight"
        }
    ];
    const buttonStyle = {
        backgroundColor: "white",
        border: 0,
        color: "red",
        positions: "relative",
        right: "12%"
    }

    return (
        <Wrapper className='App'>
            <ScrollToTop />
            <button className="tour" style={buttonStyle} onClick={() => setOpen(true)}>How to use?</button>
            <SearchBar ref={searchBarRef} expList={expList} setExpList={setExpList} setCount={setCount} />
            {/* <CheckTable ref={checkBoxRef} /> */}
            <ResultPage expList={expList} count={count} />
            <Tour open={open} onClose={() => setOpen(false)} steps={steps} placement="bottom" />
        </Wrapper >
    )
}


export default HomePage