import React from 'react'
import { useState, useEffect } from "react";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import { Stack, Chip } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { message } from "antd";
// import axios from 'axios'

// const instance = axios.create({
//     baseURL: 'http://localhost:4000/api'
// })

const BoxCss = {
    px: '25px',
    py: '10px',
    width: "100%",
    border: "1px solid lightgrey",
    backgroundColor: "#FFFFF4"
}

const commenttitleCss = {
    px: '25px',
    py: '10px',
    width: "100%",
    border: "1px solid transparent",
}

const bigBoxCss = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'sticky',
    top: '150px',
    width: '69.5%',
    minWidth: '450px',
    '&, .ExpInfo:first-of-type': { marginTop: "10px" },
}

const List = styled('ul')({
    listStyleType: 'none',
    padding: 0,
})

const Comment = ({ restaurantId, comments, setComments, setLoad }) => {
    // const [rating, setRating] = useState(0)
    const [name, setName] = useState('')
    const [content, setContent] = useState('')
    const [error, setError] = useState(false);

    // const changeRating = (newRating) => {
    //     setRating(newRating)
    // };


    // const storeComment = async () => {
    //     await instance.post('createComment/', {
    //         // TODO Part III-3-b: store the comment to the DB
    //         restaurantId, name, content, rating
    //     })
    // }

    // const displayStatus = (s) => {
    //     if (s.payload) {
    //         const { type, payload } = s;
    //         const content = {
    //             content: payload, duration: 0.8
    //         }
    //         switch (type) {
    //             case 'success':
    //                 message.success(content)
    //                 break
    //             case 'error':
    //             default:
    //                 message.error(content)
    //                 break
    //         }
    //     }
    // }

    const submitComment = () => {
        // TODO Part III-3-b: submit a comment and reset input fields
        // storeComment();
        // setComments([...comments, { 'name': name, 'content': content }])



        if (content === "") {
            setError(true);
        }
        else {
            var nname = name;
            if (name === "") {
                setName("匿名");
                nname = "匿名"
            }
            // fake add comments
            // console.log({ 'name': nname, 'content': content });
            comments.push({ 'name': nname, 'content': content });
            // console.log(name, content);
            // console.log(comments);

            const firstName = document.getElementById('content');
            const firstNameInput = document.getElementById('name');

            // Send value to server
            // console.log(firstNameInput.value);

            // 👇️ clear input field
            firstName.value = '';
            firstNameInput.value = '';

            setName('');
            setContent('');
            setLoad(true);
            setError(false);
        }


    }
    // console.log('frontend_comments', comments);
    return (
        <Box sx={bigBoxCss}>
            <Box sx={commenttitleCss}>
                <Box>
                    <Typography variant="h6" sx={{ mt: "25px", textAlign: 'left' }}>
                        留言板
                    </Typography>
                </Box>
            </Box >
            {
                comments.map((comment, key) => (
                    <Box sx={BoxCss} className='ExpInfo' key={key}>
                        <Box sx={{ float: 'left' }}>
                            <List>
                                <li style={{ textDecoration: 'underline' }}>{comment.name}</li>
                                <li style={{ color: '#6698FF' }}>{comment.content}</li>
                            </List>
                        </Box>

                    </Box >

                ))
            }


            <div className='comments'>


            </div>
            <Box sx={BoxCss} className='ExpInfo' >
                <Box sx={{ float: 'left' }} >
                    <TextField fullWidth id="name" label="Name" variant="standard" defaultValue={name} onChange={e => setName(e.target.value)} />
                </Box>
                <TextField
                    fullWidth
                    id="content"
                    label="Type your comment"
                    multiline
                    rows={4}
                    defaultValue={content}
                    sx={{ mt: '20px' }}
                    onChange={e => setContent(e.target.value)}
                    error={error === true}
                    helperText={(error === true) ? "Please enter comment." : ''}
                />

                <Box display="flex" justifyContent="flex-end">
                    <Button variant="contained" sx={{ mt: '20px', mb: '20px', mr: '10px' }} endIcon={<SendIcon />} onClick={submitComment}>Submit</Button>
                </Box>
            </Box >
        </Box>


    )
}
export default Comment