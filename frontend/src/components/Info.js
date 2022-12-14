import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { ExpList } from './db';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const a = ExpList[0]

const BoxCss = {
    margin: "15px",
    px: '25px',
    py: '10px',
    maxWidth: "800px",
    minWidth: "800px",
    border: "1px solid lightgrey",
}

const List = styled('ul')({
    listStyleType: 'none',
    padding: 0,
})



const TaskInfo = () => {
    const [liked, setLiked] = useState(false)

    const handleLike = () => {
        setLiked(!liked)
    }

    return (
        <Box sx={BoxCss}>
            <Box sx={{ float: 'left' }}>
                <Typography variant="h6">
                    {a.title}
                </Typography>
                <List>
                    <li>時長：{a.length}</li>
                    <li>時間：{a.time}</li>
                    <li>地點：臺大心理系南館S329室</li>
                </List>
            </Box>
            <Box sx={{ float: 'right', mx: "10px" }}>
                {liked ? <FavoriteIcon onClick={handleLike} sx={{ color: 'red', "&:hover": { cursor: 'pointer' } }} />
                    : <FavoriteBorderIcon onClick={handleLike} sx={{ "&:hover": { cursor: 'pointer' } }} />}
                {/* {a.experimenter}/台大心理學系 */}
            </Box>
        </Box >
    )
}

export default TaskInfo