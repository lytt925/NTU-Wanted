import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { ExpList } from '../db';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip'

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
    const [liked, setLiked] = useState(false)

    const handleLike = () => {
        setLiked(!liked)
    }

    return (
        <Box sx={BoxCss} className='TaskInfo' >
            <Box sx={{ float: 'left' }}>
                <Typography variant="h6" sx={{ mt: "10px" }}>
                    {a.title}
                </Typography>
                <List>
                    <li>時長：{a.length}</li>
                    <li>時間：{a.time}</li>
                    <li>地點：臺大心理系南館S329室</li>
                </List>
                <Stack direction="row" spacing={1} sx={{ mb: "5px" }}>
                    {a.tags.map((tag) => (<Chip key={tag} sx={{ padding: '0', fontSize: '0.5em' }} label={tag} color="primary" variant="outlined" />))}
                </Stack>
            </Box>
            <Box sx={{ float: 'right', mx: "10px", mt: "10px" }}>
                {liked ? <FavoriteIcon onClick={handleLike} sx={{ color: 'red', "&:hover": { cursor: 'pointer' } }} />
                    : <FavoriteBorderIcon onClick={handleLike} sx={{ "&:hover": { cursor: 'pointer' } }} />}
                {/* {a.experimenter}/台大心理學系 */}
            </Box>
        </Box >
    )
}

export default TaskInfo