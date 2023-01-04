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
import { useLocation, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { useUser } from "../../containers/hooks/useUser";
import axios from "../../containers/api";
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import { resolveObjectURL } from "buffer";

const buttonStyle = {
    "&:hover": { cursor: 'pointer' },
    backgroundColor: "transparent",
    // border: 0,
    color: "red",
    positions: "static",
    // right: "12%"
}
var width = window.innerWidth;

// const port = (window.location.origin + '/');

//// credited：<a href="https://www.flaticon.com/free-icons/poster" title="poster icons">Poster icons created by Freepik - Flaticon</a>


const pages = ['✆ 關於我們'];
const google_key = '705967299189-hj61h5r94cmlkljemcg45v1cq5anhhuj.apps.googleusercontent.com';

function ResponsiveAppBar({ setOpen }) {

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

    const toPage = (e) => {
        // if (e.target.innerHTML === '✆ 聯絡我們')
        navigate('/contactus')
    }

    const { pathname } = useLocation()

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
    }

    return (// sticky
        // <ThemeProvider theme={theme}>
        <AppBar position="fixed" sx={{ mb: '5px', backgroundColor: '#FFD000', zIndex: 1 }} >
            <Container maxWidth="xl" >
                <Toolbar disableGutters >

                    {/* full screen { xs: 'none', md: 'flex' } NTU logo and name */}
                    {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}

                    <Box component="img" src={require("./wanted.png")} style={{ width: "4%" }} sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Tooltip title="回首頁">
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
                    </Tooltip>

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
                                    <Typography textAlign="center" onClick={toPage}>{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* smartphone screen { xs: 'flex', md: 'none' } NTU logo and name */}
                    {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
                    {/* <Box component="img" src={require("./wanted.png")} style={{ width: "4%" }} sx={{ display: { xs: 'flex', md: 'none' }, ml: 3 }} /> */}
                    {/* <Typography> */}
                    <Button
                        key='NTU-Wanted'
                        onClick={backtoHome}
                        // variant="outlined"
                        sx={{
                            // mr: 3,
                            display: { xs: 'flex', md: 'none' },
                            fontFamily: 'arial black',
                            fontWeight: 800,
                            letterSpacing: '.3rem',
                            color: 'black',
                            textDecoration: 'none',
                            fontSize: '80%',
                            width: '100%',
                            height: '100%'
                        }}
                    // style={{outlineColor:"orange"}}
                    >
                        NTU-Wanted
                    </Button>
                    {/* </Typography> */}

                    {/* full screen { xs: 'none', md: 'flex' } 聯絡我們 */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page, index) => (
                            <Button
                                key={page}
                                id={index}
                                onClick={toPage}

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
                    {((width > 1200) && pathname === '/') ?
                        <Tooltip title="How to use?">
                            <Button>
                                <HelpCenterIcon className="tour" sx={buttonStyle}
                                    onClick={() => setOpen(true)} />
                            </Button>
                        </Tooltip>
                        : <></>}

                    {/* full screen { xs: 'none', md: 'flex' } login */}
                    {(login === false) ?
                        <Tooltip title="點擊 Google icon 來登入">
                            <Button id='login' style={{ backgroundColor: "#FFFFFF", padding: "3px 3px", }}
                                variant='contained' color='info' sx={{ flexGrow: 0, xs: 'none', md: 'flex', display: 'flex', "&:hover": { cursor: 'pointer' } }}>
                                {(google_key === '') ? <></> :
                                    <GoogleOAuthProvider clientId={google_key}>
                                        <GoogleLogin
                                            type='icon'
                                            // theme="filled_black"
                                            logo_alignment="left"
                                            clientId={google_key}
                                            // render={renderProps => (
                                            //     <Button onClick={renderProps.onClick} disabled={renderProps.disabled} variant='contained' color='info' sx={{ my: 2, color: 'white', display: 'block' }}>登入</Button>
                                            // )}
                                            onSuccess={responseGoogle}
                                            onFailure={responseGoogle}
                                            cookiePolicy={'single_host_origin'}
                                        />
                                    </GoogleOAuthProvider>}

                                <Typography sx={{ color: 'black', ml: '8px', mr: '12px', display: { xs: 'none', md: 'flex' } }}>登入</Typography>

                            </Button>
                        </Tooltip>
                        :
                        <>
                            <Box sx={{ flexGrow: 0, xs: 'none', md: 'flex' }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar id='login' src={pic} />
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


                </Toolbar>
            </Container>
        </AppBar >
        // </ThemeProvider>
    );
}

// const useNavbar = () => useContext(Context);
export { ResponsiveAppBar };