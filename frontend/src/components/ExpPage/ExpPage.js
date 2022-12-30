import React, { useState, useEffect } from 'react'
import Information from './imformation';
import Comment from './comments';
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles'
import { Container } from '@mui/material';
// import { ExpList } from '../db';

import axios from '../../containers/api'



// const a = ExpList[0]
// import axios from 'axios'
// // import { isHtmlElement } from 'react-router-dom/dist/dom';
// const instance = axios.create({
//     baseURL: 'http://localhost:4000/api'
// })

const Wrapper = styled(Container)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2'
})

const bigBoxCss = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'sticky',
    top: '150px',
    width: '69.5%',
    minWidth: '450px',
    '&, .TaskInfo:first-of-type': { marginTop: "10px" },
}

const ExpPage = () => {
    const { id } = useParams()
    // console.log('RestaurantPageID',id);
    const [info, setInfo] = useState({})
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)
    const getInfo = async () => {
        // console.log('RestaurantPageID',id);
        // TODO Part III-2: get a restaurant's info
        // const { data } = await instance.get('/getInfo', { params: { id } });
        // console.log('restpage',data.contents[0].name);

        const { data } = await axios.get('/getInfo', { params: { id } });
        setInfo(data.contents[0]);
        // console.log(data.contents)

        // fake render data
        // for (var i = 0; i < ExpList.length; i++) {
        //     if (ExpList[i].id === id) { setInfo(ExpList[i]); }
        // }

    }
    const getComments = async () => {
        // TODO Part III-3: get a restaurant's comments
        // const { data } = await instance.get('/getCommentsByRestaurantId', { params: { id } });
        // console.log('restpage',data);

        const { data } = await axios.get('/getCommentsByExpId', { params: { id } });
        // console.log('restpage',data);
        setComments(data.contents);

        // fake render data
        // for (var i = 0; i < ExpList.length; i++) {
        //     if (ExpList[i].id === id) { setComments(ExpList[i].comments);; }
        // }


    }
    useEffect(() => {
        if (Object.keys(info).length === 0) {
            getInfo()
        }
    }, [])

    useEffect(() => {
        // TODO Part III-3-c: update the comment display immediately after submission
        getComments();
        setLoading(false);
    }, [comments])

    // /* TODO Part III-2-b: calculate the average rating of the restaurant */
    // let rating = 0;
    // for (const comment of comments) {
    //     // console.log('rating',comment);
    //     rating += comment.rating
    // }
    // rating = rating / comments.length;

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