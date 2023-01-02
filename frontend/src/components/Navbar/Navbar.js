import { useState, useEffect, createContext, useContext } from "react"
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
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate, useLocation } from 'react-router-dom';
import { Password } from "@mui/icons-material";
// import { GoogleLogin } from 'react-google-login';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import axios from '../../containers/api'
import { width } from "@mui/system";
import { useUser } from "../../containers/hooks/useUser";
// import { getDecodedOAuthJwtGoogle } from "../../containers/hooks/useLogin";


var Context = [];

const pages = ['聯絡我們'];
const settings = ['我發布的研究', '登出'];
// var postPage = false;

function ResponsiveAppBar() {

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const { login, setLogin, email, setEmail, name, setName, pic, setPic, likedList, setLikedList } = useUser()
    const port = (window.location.origin) + "/newpost";
    // console.log(port);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
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
    }

    const myexp = () => {
        navigate('/myexperiment');
        setAnchorElUser(null);
    }

    const backtoHome = () => {
        navigate('/');
        // setLogin(true);
        // setEmail(email);
        // setName(name);
        // setPic(pic);
    }
    // function onSignIn(googleUser) {
    //     var profile = googleUser.getBasicProfile();
    //     console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    //     console.log('Name: ' + profile.getName());
    //     console.log('Image URL: ' + profile.getImageUrl());
    //     console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    // }

    // const checkuser = async () => {

    // }

    const responseGoogle = async (response) => {
        // const realUserData = getDecodedOAuthJwtGoogle(response.credential)
        // console.log('responseGoogle', response.credential);
        const userObject = jwt_decode(response.credential);
        // console.log('responseGoogle', userObject);
        setLogin(true);
        setEmail(userObject.email);
        setName(userObject.name);
        setPic(userObject.picture);

        const n = userObject.name;
        const e = userObject.email;

        axios.post('/checkUser', {
            // TODO Part III-3-b: store the comment to the DB
            name: n, email: e
        })

        const { data: { message, likedList: newLikeList } } = await axios.get('/getLikedList', {
            params: {
                email: e
            }
        })
        setLikedList(newLikeList)
    }

    // console.log('responseGoogle', { name, email, login, pic });

    useEffect(() => {
        Context = { 'name': name, 'email': email, 'login': login, 'pic': pic, 'login': login }
    }, [name, email, login, pic]);


    return (// sticky
        <AppBar position="sticky" sx={{ mb: '5px' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography>
                        <Button
                            key='NTU-Wanted'
                            onClick={backtoHome}
                            variant="outlined"
                            sx={{
                                // mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                fontSize: '100%',
                                width: '100%',
                                height: '100%'
                            }}
                        >
                            NTU-Wanted
                        </Button>

                    </Typography>
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
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    {/*  */}
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        NTU Wanted
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                variant="outlined"
                                sx={{ color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    {(login === false) ?
                        <Box id='login' sx={{
                            minWidth: '100px',
                            borderRadius: '6px',
                            mr: 3, flexGrow: 0, display: {
                                width: '6%', xs: 'none', md: 'flex'
                            }, backgroundColor: 'black',
                        }}>
                            {/* <Tooltip title="Login"> */}
                            <GoogleOAuthProvider clientId="705967299189-hj61h5r94cmlkljemcg45v1cq5anhhuj.apps.googleusercontent.com">
                                <GoogleLogin
                                    type='icon'
                                    theme="filled_black"
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
                            <Typography sx={{ color: 'white', mt: '8px', ml: '12px' }}>登入</Typography>
                            {/* </Tooltip> */}
                        </Box> :
                        <>
                            {/* <Box id='newExp' sx={{ mr: 3, flexGrow: 0, display: { xs: 'none', md: 'flex' } }} visibility={(window.location.href === port) ? 'hidden' : 'visiable'}>
                                <Tooltip title="Post experiments">
                                    <Button
                                        key='Post'
                                        variant="contained"
                                        onClick={navigateToPost}
                                        color="success"
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        + 新研究
                                    </Button>
                                </Tooltip>
                            </Box> */}


                            <Box sx={{ flexGrow: 0 }}>
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
                                    <MenuItem key="我收藏的研究" onClick={myexp}>
                                        <Typography textAlign="center">我收藏的研究</Typography>
                                    </MenuItem>
                                    <MenuItem key="登出" onClick={logoutevent}>
                                        <Typography textAlign="center">登出</Typography>
                                    </MenuItem>
                                </Menu>
                            </Box></>
                    }
                </Toolbar>
            </Container>
        </AppBar >
    );
}

// const useNavbar = () => useContext(Context);
export { ResponsiveAppBar, Context };