import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import { Stack, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import axios from '../../../containers/api'
import { useUser } from '../../../containers/hooks/useUser';
import { message } from 'antd';
import { useState } from 'react';


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


const TaskInfo = ({ task, liked }) => {

    const { email, setLikedList, login } = useUser()
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false)
    // const [like, setLike] = useState(liked)

    const handleLike = async (e, expId, action) => {
        // console.log(login)
        if (!login) {
            // console.log(login)
            messageApi.open({
                type: 'warning',
                content: '請先登入再收藏研究',
            });
        }
        else {
            e.stopPropagation()
            setLoading(true)
            if (action === 'unlike') {
                setLike(false)
            } else {
                setLike(true)
            }

            const { data: { message, likedList: newLikedList } } =
                await axios.post("/updateLikeList", { email, expId, action })
            if (message === 'success') {
                setLikedList(newLikedList)
            }
            else {
                // console.log(action, "failed ")
            }
            setLoading(false)
        }
    }

    const navigate = useNavigate();
    const ToExp = (id) => {

        navigate('/experiment/' + id);
        const body = document.querySelector('body');
        body.style.backgroundColor = '#f2f2f2';
    }

    return (
        <>
            {contextHolder}
            <Box sx={BoxCss} className='TaskInfo'>
                <Box sx={{ mt: '3px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', "&:hover": { cursor: 'pointer', '&.Title': { color: '#4267B2' } } }}>
                    <Typography className="Title" variant="h6" sx={{ "&:hover": { color: '#4267B2' } }} onClick={() => ToExp(task.id)}>
                        {task.title}
                    </Typography>
                    {liked ? <Favorite onClick={(e) => handleLike(e, task._id, 'unlike')} sx={{ color: 'red' }} />
                        : <FavoriteBorder onClick={(e) => handleLike(e, task._id, 'like')} />}
                </Box>
                <List>
                    <li>時長：{task.length}</li>
                    <li>時間：{task.time}</li>
                    <li>地點：{task.location}</li>
                </List>
                <Box sx={{ display: 'flex', mb: "8px", verticalAlign: 'middle', flexWrap: 'wrap' }}>
                    {task.typeTags.map((type) => (<Chip key={type} sx={{ mt: '5px', mr: '8px', padding: 'None', fontSize: '12px' }} label={type} color="primary" variant="outlined" />))}
                    {task.rewardTags.map((tag) => (<Chip key={tag} sx={{ mt: '5px', mr: '8px', padding: 'None', fontSize: '12px' }} label={tag} color="success" variant="outlined" />))}
                    {task.locationTags.map((tag) => (<Chip key={tag} sx={{ mt: '5px', mr: '8px', padding: 'None', fontSize: '12px' }} label={tag} color="error" variant="outlined" />))}
                </Box>
            </Box>
        </>
    )
}

export default TaskInfo