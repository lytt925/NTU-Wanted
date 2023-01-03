import React, { useState, useEffect } from 'react'
import Information from './information';
import Comment from './comments';
import { useParams } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import { Container } from '@mui/material';
// import { ExpList } from '../db';

import axios from '../../containers/api'

const Wrapper = styled(Container)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2'
})

const ExpPage = () => {
    const { id } = useParams()
    const [info, setInfo] = useState({})
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)
    const getInfo = async () => {

        const { data } = await axios.get('/getInfo', { params: { id } });
        setInfo(data.contents[0]);
    }
    const getComments = async () => {

        const { data } = await axios.get('/getCommentsByExpId', { params: { id } });
        setComments(data.contents);

    }
    useEffect(() => {
        if (Object.keys(info).length === 0) {
            getInfo()
        }
    }, [])

    useEffect(() => {
        getComments();
        setLoading(false);
    }, [comments])

    const body = document.querySelector('body');
    body.style.backgroundColor = '#f2f2f2';

    return (
        <Wrapper className='ExpPage'>
            {Object.keys(info).length === 0 ? <></> : <Information info={info} />}
            <Comment expID={id} comments={comments} setComments={setComments} setLoad={setLoading} />
        </Wrapper>
    )
}
export default ExpPage