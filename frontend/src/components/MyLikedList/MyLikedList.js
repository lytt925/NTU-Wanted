import { styled } from '@mui/material/styles'
import { Container } from '@mui/material';
import React, { useState, useEffect } from 'react'
import ResultPage from '../../containers/ResultPage';
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../containers/hooks/useUser';
import { PER_PAGE } from '../../utils/constants';

const Wrapper = styled(Container)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
})

const LikedListPage = () => {

    const body = document.querySelector('body');
    body.style.backgroundColor = '#FFFFFF';

    const [count, setCount] = useState(0);
    const { login, likedList } = useUser()
    const navigate = useNavigate()

    useEffect(() => {
        if (!login) {
            navigate('/')
        }
    }, [login])

    const newCount = Math.ceil(likedList.length / PER_PAGE);

    useEffect(() => {
        setCount(newCount);
    }, [count])

    return (
        <Wrapper className='App'>
            <h2 style={{ textAlign: "center", color: "rgb(211, 97, 3)}" }}>我的收藏</h2>
            {/* <SearchBar expList={likedList} setExpList={setLikedList} setCount={setCount} />
            <CheckTable /> */}
            <ResultPage expList={likedList} count={count} />
        </Wrapper >
    )
}



export default LikedListPage