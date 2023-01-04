import React, { useState, useEffect } from 'react'
import Information from './information';
import Comment from './comments';
import { useParams } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import { Container } from '@mui/material';
// import { ExpList } from '../db';
import CircularProgress from '@mui/material/CircularProgress';

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
    const [infoLoading, setInfoLoading] = useState(true);
    const [commentsLoading, setCommentsLoading] = useState(true);
    
    const getInfo = async () => {
        const { data } = await axios.get('/getInfo', { params: { id } });
        setInfo(data.contents[0]);
        setInfoLoading(false);
        // console.log(data)
    }
    const getComments = async () => {

        const { data } = await axios.get('/getCommentsByExpId', { params: { id } });
        setComments(data.contents);
        setCommentsLoading(false);

    }
    useEffect(() => {
        if (Object.keys(info).length === 0) {
            getInfo();
        }
    }, [])

    useEffect(() => {
        getComments();
    }, [comments])


    const body = document.querySelector('body');
    body.style.backgroundColor = '#f2f2f2';

    const loadingCircle = <CircularProgress sx={{ color: 'rgb(223, 230, 217)' }} />

    return (
        <Wrapper className='ExpPage'>
            {infoLoading && commentsLoading ?
                loadingCircle 
                :
                <>
                {infoLoading ? 
                    loadingCircle : <Information info={info} />}
                {commentsLoading? 
                    loadingCircle : <Comment expID={id} comments={comments} setComments={setComments} setLoad={setCommentsLoading} />
}
                </>
            }             
        </Wrapper>
    )
}
export default ExpPage

// {Object.keys(info).length === 0 ? <></>