import React from 'react'
import { useState } from "react";
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import ReplyIcon from '@mui/icons-material/Reply';
import axios from '../../containers/api'
import { useUser } from '../../containers/hooks/useUser';


const BoxCss = {
    px: '25px',
    py: '10px',
    width: "95%",
    borderTop: "1px solid grey",
    backgroundColor: "#FFFFFF",
}

const childBoxCss = {
    px: '25px',
    py: '10px',
    width: "100%",
    borderTop: "1px solid lightgrey",
    backgroundColor: "#FFFFFF",
    justify: 'left',
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
    top: '150px',
    width: '69.5%',
    minWidth: '310px',
    marginBottom: "25px",
    border: "1px solid lightgray",
    backgroundColor: "#FFFFFF",
    marginTop: "15px",
}

const List = styled('ul')({
    listStyleType: 'none',
    padding: 0,
})

const Comment = ({ expID, comments, setComments, setLoad }) => {
    const [content, setContent] = useState('')
    const [replycontent, setReplycontent] = useState('')
    const [error, setError] = useState(false);

    const { name, login } = useUser()

    const storeComment = async () => {
        await axios.post('createComment/', {
            expID, name, content
        })
    }

    const storeReply = async (expID, name, content, reply) => {
        await axios.post('createReply/', {
            expID, name, content, reply
        })
    }

    const submitComment = () => {
        if (content !== "") {
            storeComment();
            setComments([...comments, { 'name': name, 'content': content, 'reply': [] }])
            setContent('');
            setLoad(true);
            setError(false);
        }

    }

    function handleReply(v) {
        if (v !== "") {
            setReplycontent(v);
        }
    }

    function submitReply(e) {

        if (replycontent !== "") {
            const recentExpID = comments[parseInt(e.target.id)].expID;
            const recentName = comments[parseInt(e.target.id)].name;
            const recentContent = comments[parseInt(e.target.id)].content;
            const c = comments;
            c[parseInt(e.target.id)].reply.push({ 'name': name, 'content': replycontent });
            const allreply = c[parseInt(e.target.id)].reply;
            storeReply(recentExpID, recentName, recentContent, allreply)
            setComments(c);

            const firstName = document.getElementById(`outlined-textarea${e.target.id}`);
            firstName.value = '';
            setReplycontent('');
            setLoad(true);
            setError(false);
        }


    }

    return (
        <Box sx={bigBoxCss}>
            <Box sx={commenttitleCss}>
                <Typography variant="h6" fontWeight='bold' sx={{ mt: "25px", textAlign: 'left' }}>
                    留言板
                </Typography>
            </Box >
            {
                comments.map((comment, key) => (
                    <Box sx={BoxCss} className='CommentInfo' key={key}>
                        <List>
                            <li style={{ fontWeight: 'bold', marginBottom: "8px" }}>{comment.name}</li>
                            <li>{comment.content}</li>
                        </List>

                        {
                            (comment.reply === undefined) ?
                                <div style={{ marginBottom: "15px" }}>
                                    {(login === false) ? <></> : <>
                                        <TextField
                                            id={`outlined-textarea${key}`}
                                            placeholder="Type a reply here..."
                                            multiline
                                            variant="standard"
                                            onChange={e => handleReply(e.target.value)}
                                            sx={{ width: '85%', marginRight: '10px' }}
                                        />
                                        <Button variant='contained' size='small' id={key} endIcon={<ReplyIcon />} onClick={submitReply}>Reply</Button>
                                    </>}

                                </div> :
                                <>
                                    {
                                        comment.reply.map((childcomment, key1) => (
                                            <Box sx={childBoxCss} className='ChildCommentInfo' key={key1}>
                                                <List style={{ marginBottom: "5px", marginTop: "1px" }}>
                                                    <li style={{ fontWeight: 'bold', marginBottom: "8px" }}>{childcomment.name}</li>
                                                    <li>{childcomment.content}</li>
                                                </List>
                                            </Box >

                                        ))
                                    }
                                    {(login === false) ? <></> : <Box sx={{ display: 'flex', flexWrap: 'nowrap' }}>
                                        <TextField
                                            id={`outlined-textarea${key}`}
                                            placeholder="Type a reply here..."
                                            multiline
                                            variant="standard"
                                            onChange={e => handleReply(e.target.value)}
                                            sx={{ width: '85%', marginRight: '10px', flex: '1 1 160px' }}
                                        />
                                        <Button variant='contained' size='small' id={key} endIcon={<ReplyIcon />} onClick={submitReply} sx={{ flex: '1 1 73px', maxWidth: '80px' }}>Reply</Button>
                                    </Box>}
                                </>
                        }
                    </Box >
                ))
            }

            <Box sx={BoxCss} >
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