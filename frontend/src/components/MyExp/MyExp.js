import { styled } from '@mui/material/styles'
import { Container } from '@mui/material';
import React, { useState, useEffect } from 'react'
import ResultPage from '../../containers/ResultPage';
import axios from '../../containers/api';
import { PER_PAGE } from '../../utils/constants';
import { useLocation } from 'react-router-dom'
import { useUser } from '../../containers/hooks/useUser';


const Wrapper = styled(Container)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
})

const MyExp = () => {

    const body = document.querySelector('body');
    body.style.backgroundColor = '#FFFFFF';

    const { state } = useLocation();
    const [expList, setExpList] = useState([])
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const { name, email } = useUser();
    const [loading, setLoading] = useState(true)

    const sendmySearch = async () => {
        setLoading(true)
        const { data: { message, contents } } =
            await axios.get('/getMyexp', {
                params: {
                    name, email
                }
            },)
        console.log('sendmySearch', message, contents);
        if (message === 'success') {

            console.log('inside', message, contents);
            setExpList(contents)
            //計算分頁數
            const newCount = Math.ceil(contents.length / PER_PAGE);
            setCount(newCount);
            setLoading(false);
        }
    }

    useEffect(() => {
        sendmySearch();
    }, [state])


    return (
        <Wrapper className='App'>
            <h2 style={{ textAlign: "center", color: "rgb(211, 97, 3)}" }}>我的研究</h2>
            <ResultPage expList={expList} count={count} loading={loading} page={page} setPage={setPage}/>
        </Wrapper >
    )
}



export default MyExp