import React from 'react'
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import Button from '@mui/material/Button';

const BoxCss = {
    px: '25px',
    py: '10px',
    width: "100%",
    border: "1px solid lightgrey",
    marginBottom: "10px"
}

const BoxTopCss = {
    px: '25px',
    py: '10px',
    width: "100%",
    border: "1px solid transparent",
    marginBottom: "10px"
}

const bigBoxCss = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    top: '150px',
    width: '69.5%',
    minWidth: '370px',
    '&, .ExpInfo:first-of-type': { marginTop: "10px" },
}

const titleCss = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
}


const List = styled('ul')({
    listStyleType: 'none',
    padding: 0,
})

const Information = ({ info }) => {

    // console.log(info)
    const [liked, setLiked] = useState(false)

    const handleLike = () => {
        setLiked(!liked)
    }

    const age = info.age ?
        info.age.lower === 0 || !info.age.lower ?
            (info.age.upper === 99 || !info.age.upper ? "無" : `限${info.age.upper}歲以下`)
            :
            info.age.upper === 99 || !info.age.upper ?
                `限${info.age.lower}歲以上` : `限${info.age.lower}歲至${info.age.upper}歲`
        :
        "無"

    return (
        <Box sx={bigBoxCss}>
            <Box sx={BoxTopCss} className='ExpInfo' component={Paper}>
                <Box sx={titleCss}>
                    <Typography variant="h5" fontWeight='bold' sx={{ mt: '10px', mb: '10px' }}>
                        {info.title}
                    </Typography>
                    {/* {liked ? <Favorite onClick={handleLike} sx={{ color: 'red', "&:hover": { cursor: 'pointer' } }} />
                        : <FavoriteBorder onClick={handleLike} sx={{ "&:hover": { cursor: 'pointer' } }} />} */}
                </Box>
            </Box >
            <Box sx={BoxCss} className='ExpInfo' component={Paper}>
                <Box sx={{ wordWrap: 'break-word' }}>
                    <List>
                        <Typography gutterBottom variant="h6" component="div" fontWeight='bold'>
                            研究資訊
                        </Typography>
                        <li>時長：{info.length}</li>
                        <li>時間：{info.timeRange.from} ~ {info.timeRange.to}</li>
                        <li>地點：{info.location}</li>
                    </List>
                </Box>

            </Box >
            <Box sx={BoxCss} className='ExpInfo' component={Paper} elevation={1}>
                <Box sx={{ wordWrap: 'break-word' }}>
                    <List>
                        <Typography gutterBottom variant="h6" component="div" fontWeight='bold'>
                            參與者條件
                        </Typography>
                        <li>年齡限制：{age}</li>
                        <li>{info.requirements ? info.requirements : ""}</li>
                    </List>
                </Box>
            </Box >
            <Box sx={BoxCss} className='ExpInfo' component={Paper} elevation={1}>
                <Box sx={{ wordWrap: 'break-word' }}>
                    <List>
                        <Typography gutterBottom variant="h6" component="div" fontWeight='bold'>
                            研究報酬
                        </Typography>
                        <li>{info.reward}</li>
                    </List>
                </Box>
            </Box >
            <Box sx={BoxCss} className='ExpInfo' component={Paper}>
                <Box sx={{ wordWrap: 'break-word' }}>
                    <List>
                        <Typography gutterBottom variant="h6" component="div" fontWeight='bold'>
                            研究內容
                        </Typography>
                        <li>{info.introduction}</li>
                    </List>
                </Box>
            </Box >
            <Box sx={BoxCss} className='ExpInfo' component={Paper}>
                <Box sx={{ wordWrap: 'break-word' }}>
                    <List>
                        <Typography gutterBottom variant="h6" component="div" fontWeight='bold'>
                            備註
                        </Typography>
                        <li>{info.memo}</li>
                    </List>
                </Box>
            </Box >

            <Box sx={BoxCss} className='ExpInfo' component={Paper}>
                <Box sx={{ wordWrap: 'break-word' }}>
                    <List>
                        <Typography gutterBottom variant="h6" component="div" fontWeight='bold'>
                            聯絡資訊
                        </Typography>
                        <li>研究主試人員：{info.experimenter}</li>
                        <li>聯絡電話：{info.phone}</li>
                        <li>電子郵件：{info.email}</li>
                    </List>
                </Box>
            </Box >
            {(info.link === undefined) ? <></> :
                <Box sx={BoxCss} className='ExpInfo' component={Paper}>
                    <Box sx={{ wordWrap: 'break-word' }}>
                        <List>
                            <Typography gutterBottom variant="h6" component="div" fontWeight='bold'>
                                研究報名連結
                            </Typography>
                            <Button variant="outlined" href={info.link} target='_blank'>Link</Button>
                        </List>
                    </Box>
                </Box >
            }
        </Box>
    )
}
export default Information