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
import { message, Input } from "antd";
import ReplyIcon from '@mui/icons-material/Reply';
import axios from '../../containers/api'
import { useUser } from '../../containers/hooks/useUser';


const BoxCss = {
    px: '25px',
    py: '10px',
    width: "95%",
    borderTop: "1px solid grey",
    backgroundColor: "#FFFFFF",
    // '& .CommentInfo:last-of-type': { marginBottom: "20px" },
}

const childBoxCss = {
    px: '25px',
    py: '10px',
    width: "100%",
    borderTop: "1px solid lightgrey",
    backgroundColor: "#FFFFFF",
    justify: 'left',
    // '& .CommentInfo:last-of-type': { marginBottom: "20px" },
}

const commenttitleCss = {
    px: '25px',
    py: '10px',
    width: "100%",
    border: "1px solid transparent",
    backgroundColor: "#FFFFFF",
    marginBottom: "20px",
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
    // '&.CommentInfo:last-of-type': { backgroundColor: "red", marginBottom: "20px" },
    marginBottom: "25px",
    border: "1px solid lightgray",
    backgroundColor: "#FFFFFF",
    marginTop: "15px",
    // backgroundColor: "blue"
}

const List = styled('ul')({
    listStyleType: 'none',
    padding: 0,
})

const Comment = ({ expID, comments, setComments, setLoad }) => {
    // const [rating, setRating] = useState(0)
    // const [name, setName] = useState('')
    const [content, setContent] = useState('')
    const [replycontent, setReplycontent] = useState('')
    const [error, setError] = useState(false);

    const { name, login } = useUser()

    // const changeRating = (newRating) => {
    //     setRating(newRating)
    // };


    const storeComment = async () => {
        await axios.post('createComment/', {
            // TODO Part III-3-b: store the comment to the DB
            expID, name, content
        })
    }

    const storeReply = async (expID, name, content, reply) => {
        await axios.post('createReply/', {
            // TODO Part III-3-b: store the comment to the DB
            expID, name, content, reply
        })
    }

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
        // console.log('submit', this);
        if (content !== "") {
            storeComment();
            setComments([...comments, { 'name': name, 'content': content, 'reply': [] }])
            // comments.push({ 'name': name, 'content': content, 'reply': [] });

            // const firstName = document.getElementById('content');
            // const firstNameInput = document.getElementById('name');

            // Send value to server
            // console.log(firstNameInput.value);

            // 👇️ clear input field
            // firstName.value = '';
            // firstNameInput.value = '';

            // setName('');
            setContent('');
            setLoad(true);
            setError(false);
        }

    }

    function handleReply(v) {
        if (v !== "") {
            setReplycontent(v);
            // console.log('handleReply', replycontent)
        }
    }

    function submitReply(e) {
        // TODO Part III-3-b: submit a comment and reset input fields
        // storeComment();
        // setComments([...comments, { 'name': name, 'content': content }])
        // console.log('text1', text)
        // console.log('submit', e.target.id);
        // const text = document.getElementById(`outlined-textarea${e.target.id}`);
        // console.log('text', replycontent)


        if (replycontent !== "") {
            // var nname = name;
            // if (name === "") {
            //     setName("匿名");
            //     nname = "匿名"
            // }
            // console.log(comments[parseInt(e.target.id)]);
            const recentExpID = comments[parseInt(e.target.id)].expID;
            const recentName = comments[parseInt(e.target.id)].name;
            const recentContent = comments[parseInt(e.target.id)].content;
            comments[parseInt(e.target.id)].reply.push({ 'name': name, 'content': replycontent });
            const allreply = comments[parseInt(e.target.id)].reply;
            storeReply(recentExpID, recentName, recentContent, allreply)

            const firstName = document.getElementById(`outlined-textarea${e.target.id}`);
            // const firstNameInput = document.getElementById('name');

            // Send value to server
            // console.log(firstNameInput.value);

            // 👇️ clear input field
            firstName.value = '';
            // firstNameInput.value = '';

            // setName('');
            setReplycontent('');
            setLoad(true);
            setError(false);
        }


    }

    // const submitAfter = (key) => {
    //     <Button size='small' endIcon={<ReplyIcon />} onClick={submitReply(key)}>Reply</Button>
    //     // <Button variant="contained" size='small' endIcon={<SendIcon />} onClick={submitComment}>Submit</Button>
    // };

    // console.log('frontend_comments', comments);
    return (
        <Box sx={bigBoxCss}>
            <Box sx={commenttitleCss}>
                {/* <Box> */}
                <Typography variant="h6" fontWeight='bold' sx={{ mt: "25px", textAlign: 'left' }}>
                    留言板
                </Typography>
                {/* </Box> */}
            </Box >
            {
                comments.map((comment, key) => (
                    <Box sx={BoxCss} className='CommentInfo' key={key}>
                        {/* <Box sx={{ float: 'left' }}> */}
                        <List>
                            <li style={{ fontWeight: 'bold', marginBottom: "8px" }}>{comment.name}</li>
                            <li>{comment.content}</li>
                        </List>
                        {/* <Button variant="outlined" size='small' style={{ marginBottom: "10px" }} endIcon={<ReplyIcon />}>
                            Reply
                        </Button> */}
                        {/* </Box> */}
                        {
                            (comment.reply === undefined) ?
                                <div style={{ marginBottom: "15px" }}>
                                    {(login === false) ? <></> : <>
                                        <TextField
                                            id={`outlined-textarea${key}`}
                                            // label="Multiline Placeholder"
                                            placeholder="Type a reply here..."
                                            multiline
                                            variant="standard"
                                            onChange={e => handleReply(e.target.value)}
                                            // onChange={e => setReplycontent(e.target.value)}
                                            // defaultValue={replycontent}
                                            sx={{ width: '85%', marginRight: '10px' }}
                                        />
                                        <Button variant='contained' size='small' id={key} endIcon={<ReplyIcon />} onClick={submitReply}>Reply</Button>
                                    </>}
                                    {/* <TextField id="standard-basic" label="Standard" size='small' variant="Standard" /> */}

                                </div> :
                                <>
                                    {
                                        comment.reply.map((childcomment, key1) => (
                                            <Box sx={childBoxCss} className='ChildCommentInfo' key={key1}>
                                                {/* <Box sx={{ float: 'left' }}> */}
                                                <List style={{ marginBottom: "5px", marginTop: "1px" }}>
                                                    <li style={{ fontWeight: 'bold', marginBottom: "8px" }}>{childcomment.name}</li>
                                                    <li>{childcomment.content}</li>
                                                </List>
                                                {/* </Box> */}

                                            </Box >

                                        ))
                                    }
                                    {(login === false) ? <></> : <>
                                        <TextField
                                            id={`outlined-textarea${key}`}
                                            // label="Multiline Placeholder"
                                            placeholder="Type a reply here..."
                                            multiline
                                            variant="standard"
                                            onChange={e => handleReply(e.target.value)}
                                            // onChange={e => setReplycontent(e.target.value)}
                                            // defaultValue={replycontent}
                                            sx={{ width: '85%', marginRight: '10px' }}
                                        />
                                        <Button variant='contained' size='small' id={key} endIcon={<ReplyIcon />} onClick={submitReply}>Reply</Button>
                                    </>}
                                </>
                        }
                    </Box >
                ))
            }

            <Box sx={BoxCss} >
                {/* <Box sx={{ float: 'left' }} >
                    <TextField fullWidth id="name" label="Name" variant="standard" value={name} onChange={e => setName(e.target.value)} />
                </Box> */}
                {(login === false) ? <></> : <>
                    <TextField
                        fullWidth
                        id="content"
                        label="Type your comment"
                        multiline
                        rows={4}
                        value={content}
                        sx={{ mt: '20px' }}
                        onChange={e => setContent(e.target.value)}
                        error={error === true}
                        helperText={(error === true) ? "Please enter comment." : ''}
                    />

                    <Box display="flex" justifyContent="flex-end">
                        <Button variant="contained" sx={{ mt: '20px', mb: '20px', mr: '10px' }} endIcon={<SendIcon />} onClick={submitComment}>Submit</Button>
                    </Box>
                </>}
            </Box >
        </Box>
    )
}
export default Comment