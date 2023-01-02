import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import { Stack, Chip } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom'

// const a = ExpList[0]

const BoxCss = {
    px: '25px',
    py: '10px',
    width: "100%",
    border: "1px solid lightgrey",
}

const List = styled('ul')({
    listStyleType: 'none',
    padding: '0',
    margin: '10px 0'
})

const TaskInfo = ({ task }) => {
    const { state } = useLocation();
    const [liked, setLiked] = useState(false)

    const handleLike = (e) => {
        e.stopPropagation()
        setLiked(!liked)
    }

    const navigate = useNavigate();
    const ToExp = (id) => {
        // TODO Part III-1: navigate the user to restaurant page with the corresponding id
        navigate('/experiment/' + id);
        const body = document.querySelector('body');
        body.style.backgroundColor = '#f2f2f2';
    }

    return (
        <Box sx={BoxCss} className='TaskInfo'>
            <Box sx={{ mt: '3px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', "&:hover": { cursor: 'pointer', '&, .Title': { color: '#4267B2' } } }} onClick={() => ToExp(task.id)}>
                <Typography className="Title" variant="h6" sx={{ "&:hover": { color: '#4267B2' } }}>
                    {task.title}
                </Typography>
                {liked ? <Favorite onClick={handleLike} sx={{ color: 'red' }} />
                    : <FavoriteBorder onClick={handleLike} />}
            </Box>
            <List>
                <li>時長：{task.length}</li>
                <li>時間：{task.time}</li>
                <li>地點：{task.location}</li>
            </List>
            <Stack direction="row" spacing={1} sx={{ mb: "8px", verticalAlign: 'middle' }}>
                {task.typeTags.map((type) => (<Chip key={type} sx={{ padding: 'None', fontSize: '12px' }} label={type} color="primary" variant="outlined" />))}
                {task.rewardTags.map((tag) => (<Chip key={tag} sx={{ padding: 'None', fontSize: '12px' }} label={tag} color="success" variant="outlined" />))}
                {task.locationTags.map((tag) => (<Chip key={tag} sx={{ padding: 'None', fontSize: '12px' }} label={tag} color="error" variant="outlined" />))}
            </Stack>
        </Box>

    )
}

export default TaskInfo