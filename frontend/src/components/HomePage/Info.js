import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { ExpList } from '../db';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import { Stack, Chip } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom'

const a = ExpList[0]

const BoxCss = {
    px: '25px',
    py: '10px',
    width: "100%",
    border: "1px solid lightgrey",
}

const List = styled('ul')({
    listStyleType: 'none',
    padding: 0,
})

const TaskInfo = () => {
    const { state } = useLocation();
    const [liked, setLiked] = useState(false)

    const handleLike = () => {
        setLiked(!liked)
    }

    const navigate = useNavigate();
    const ToExp = (id) => {
        // TODO Part III-1: navigate the user to restaurant page with the corresponding id
        navigate('/experiment/' + id)
    }

    return (
        <Box sx={BoxCss} className='TaskInfo'>
            <Box sx={{ float: 'left', "&:hover": { cursor: 'pointer' } }} onClick={() => ToExp(a.id)}>
                <Typography variant="h6" sx={{ mt: "10px" }}>
                    {a.title}
                </Typography>
                <List>
                    <li>時長：{a.length}</li>
                    <li>時間：{a.time}</li>
                    <li>地點：{a.location}</li>
                </List>
                <Stack direction="row" spacing={1} sx={{ mb: "5px" }}>
                    {a.tags.map((tag) => (<Chip key={tag} sx={{ padding: '0', fontSize: '0.5em' }} label={tag} color="primary" variant="outlined" />))}
                </Stack>
            </Box>
            <Box sx={{ float: 'right', mx: "10px", mt: "10px", zIndex: 2 }}>
                {liked ? <Favorite onClick={handleLike} sx={{ color: 'red', "&:hover": { cursor: 'pointer' } }} />
                    : <FavoriteBorder onClick={handleLike} sx={{ "&:hover": { cursor: 'pointer' } }} />}
            </Box>
        </Box >
    )
}

export default TaskInfo