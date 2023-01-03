import { useState, useEffect } from "react"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import axios from '../../containers/api'
import { useUser } from "../../containers/hooks/useUser";
import { BoyRounded } from "@mui/icons-material";


//// credited：<a href="https://www.flaticon.com/free-icons/poster" title="poster icons">Poster icons created by Freepik - Flaticon</a>


const pages = ['✆ 聯絡我們'];

function ResponsiveAppBar() {

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const { login, setLogin, email, setEmail, name, setName, pic, setPic, setLikedList } = useUser()

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };


    const navigate = useNavigate();
    const navigateToPost = () => {
        navigate('/newpost');
        setAnchorElUser(null);

    };

    const logoutevent = () => {
        setLogin(false);
        setEmail("");
        setName("");
        navigate('/');
        setAnchorElUser(null);
        setLikedList([])
        setPic('')
        localStorage.clear();
    }

    const myexp = () => {
        navigate('/myexperiment');
        setAnchorElUser(null);
    }

    const toLikedList = () => {
        navigate('/mylikedlist')
        setAnchorElUser(null)
    }

    const backtoHome = () => {
        navigate('/');
    }

    const responseGoogle = async (response) => {

        const userObject = jwt_decode(response.credential);

        setLogin(true);
        setEmail(userObject.email);
        setName(userObject.name);
        setPic(userObject.picture);

        const n = userObject.name;
        const e = userObject.email;

        axios.post('/checkUser', {
            name: n, email: e
        })

        const { data: { message, likedList: newLikeList } } = await axios.get('/getLikedList', {
            params: {
                email: e
            }
        })
        setLikedList(newLikeList)
    }

    return (// sticky
        // <ThemeProvider theme={theme}>
        <AppBar position="fixed" sx={{ mb: '5px', backgroundColor: '#FFD000' }} >
            <Container maxWidth="xl" >
                <Toolbar disableGutters >

                    {/* full screen { xs: 'none', md: 'flex' } NTU logo and name */}
                    {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
                    <img src={require("./wanted.png")} style={{ width: "4%" }} />
                    <Typography>
                        <Button
                            key='NTU-Wanted'
                            onClick={backtoHome}
                            // variant="outlined"
                            sx={{
                                // mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'arial black',
                                fontWeight: 800,
                                letterSpacing: '.3rem',
                                color: 'black',
                                textDecoration: 'none',
                                fontSize: '100%',
                                width: '100%',
                                height: '100%'
                            }}
                        // style={{outlineColor:"orange"}}
                        >
                            NTU-Wanted
                        </Button>
                    </Typography>

                    {/* smartphone screen { xs: 'flex', md: 'none' } three lines */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu} >
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* smartphone screen { xs: 'flex', md: 'none' } NTU logo and name */}
                    {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        onClick={backtoHome}
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'arial black',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            fontSize: "100%"
                        }}
                    >
                        NTU Wanted
                    </Typography>

                    {/* full screen { xs: 'none', md: 'flex' } 聯絡我們 */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page, index) => (
                            <Button
                                key={page}
                                id={index}
                                onClick={handleCloseNavMenu}
                                // variant="outlined"
                                sx={{
                                    color: 'white', display: 'block',
                                    backgroundColor: "orange", boxShadow: "3",
                                    '&:hover': {
                                        backgroundColor: "orangeRed"
                                    },
                                    position: "relative", left: "3%"
                                }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    {/* full screen { xs: 'none', md: 'flex' } login */}
                    {(login === false) ?
                        <Button id='login' style={{ backgroundColor: "#FFFFFF", padding: "3px 3px", }}
                            variant='contained' color='info' sx={{ flexGrow: 0, xs: 'none', md: 'flex', display: 'flex', "&:hover": { cursor: 'pointer' } }}>

                            <GoogleOAuthProvider clientId="705967299189-hj61h5r94cmlkljemcg45v1cq5anhhuj.apps.googleusercontent.com">
                                <GoogleLogin
                                    type='icon'
                                    // theme="filled_black"
                                    logo_alignment="left"
                                    clientId="705967299189-hj61h5r94cmlkljemcg45v1cq5anhhuj.apps.googleusercontent.com"
                                    // render={renderProps => (
                                    //     <Button onClick={renderProps.onClick} disabled={renderProps.disabled} variant='contained' color='info' sx={{ my: 2, color: 'white', display: 'block' }}>登入</Button>
                                    // )}
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                />
                            </GoogleOAuthProvider>
                            <Typography sx={{ color: 'black', ml: '8px', mr: '12px', display: { xs: 'none', md: 'flex' } }}>登入</Typography>

                        </Button>
                        :
                        <>
                            <Box sx={{ flexGrow: 0, xs: 'none', md: 'flex' }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar src={pic} />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem key="新增研究" onClick={navigateToPost}>
                                        <Typography textAlign="center"> + 新研究</Typography>
                                    </MenuItem>
                                    <MenuItem key="我發布的研究" onClick={myexp}>
                                        <Typography textAlign="center">我發布的研究</Typography>
                                    </MenuItem>
                                    <MenuItem key="我收藏的研究" onClick={toLikedList}>
                                        <Typography textAlign="center">我收藏的研究</Typography>
                                    </MenuItem>
                                    <MenuItem key="登出" onClick={logoutevent}>
                                        <Typography textAlign="center">登出</Typography>
                                    </MenuItem>
                                </Menu>
                            </Box></>

                    }

                    {/* smartphone screen { xs: 'flex', md: 'none' } login */}
                    {/* {(login === false) ?
                        <Box id='login' sx={{
                            xs: 'flex', md: 'none',
                            backgroundColor: 'white',
                            display: { xs: 'flex', md: 'none' }
                        }}>
                            <GoogleOAuthProvider clientId="705967299189-hj61h5r94cmlkljemcg45v1cq5anhhuj.apps.googleusercontent.com">
                                <GoogleLogin
                                    type='icon'
                                    clientId="705967299189-hj61h5r94cmlkljemcg45v1cq5anhhuj.apps.googleusercontent.com"
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                />
                            </GoogleOAuthProvider>
                        </Box> :
                        <>
                            <Box sx={{ xs: 'flex', md: 'none' }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar src={pic} sx={{ display: { xs: 'flex', md: 'none' } }} />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem key="新增研究" onClick={navigateToPost}>
                                        <Typography textAlign="center"> + 新研究</Typography>
                                    </MenuItem>
                                    <MenuItem key="我發布的研究" onClick={myexp}>
                                        <Typography textAlign="center">我發布的研究</Typography>
                                    </MenuItem>
                                    <MenuItem key="我收藏的研究" onClick={myexp}>
                                        <Typography textAlign="center">我收藏的研究</Typography>
                                    </MenuItem>
                                    <MenuItem key="登出" onClick={logoutevent}>
                                        <Typography textAlign="center">登出</Typography>
                                    </MenuItem>
                                </Menu>
                            </Box></>
                    } */}

                </Toolbar>
            </Container>
        </AppBar >
        // </ThemeProvider>
    );
}

// const useNavbar = () => useContext(Context);
export { ResponsiveAppBar };