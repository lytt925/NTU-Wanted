import SearchBar from './Search/SearchBar';
import CheckTable from './Search/CheckTable'
import { styled } from '@mui/material/styles'
import { Container } from '@mui/material';
import React, { useRef, useState } from 'react'
import ResultPage from '../../containers/ResultPage';
import ScrollToTop from './ScrollToTop';
import { Tour } from 'antd';
import Button from '@mui/material/Button';
import './HomePage.css'
import { positions } from '@mui/system';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';

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
            target: () => document.querySelector("#searchbar"),
        },
        {
            title: '多重篩選',
            description: '自由篩選您想尋找的特定研究類型、報酬形式及研究地點。',
            target: () => document.querySelector("#checktable"),
            // placement: "leftBottom"
        },
        {
            title: '登入帳號',
            description: '連結google帳號以新增研究、查看您發佈和收藏的研究。',
            target: () => document.querySelector("#login"),
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
    var width = window.innerWidth;


    return (
        <Wrapper className='App'>
            <ScrollToTop />
            {/* <Fab className="tour" style={buttonStyle} sx={{ position: 'fixed', top: 80, left: '10%' }} onClick={() => setOpen(true)}> */}
            {/* How to use? */}
            {(width > 540) ?
                <Tooltip title="How to use?">
                    <HelpCenterIcon className="tour" style={buttonStyle}
                        sx={{ position: '-webkit-sticky', "&:hover": { cursor: 'pointer' } }} onClick={() => setOpen(true)} />
                </Tooltip>
                : <></>}
            {/* </Fab> */}
            <SearchBar ref={searchBarRef} expList={expList} setExpList={setExpList} setCount={setCount} />
            <CheckTable ref={checkBoxRef} />
            <ResultPage expList={expList} count={count} />
            {
                width > 540 ?
                    <Tour className="tour" open={open} onClose={() => setOpen(false)}
                        steps={steps} />
                    :
                    <></>
            }
        </Wrapper >
    )
}


export default HomePage