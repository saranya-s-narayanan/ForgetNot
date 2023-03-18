import * as React from 'react';
import { useNavigate } from "react-router-dom";

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

import CakeIcon from '@mui/icons-material/Cake';
import GroupsIcon from '@mui/icons-material/Groups';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel';


import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EmailIcon from '@mui/icons-material/Email';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';


import { mainListItems } from './labelItems';
import {get,post} from '../utils/requests'
import {appName} from './Globals.js';
import Schedule from './Schedule.js';
import {useEffect} from "react";

const settings = ['Home','My profile', 'My groups', 'Logout'];

window.localStorage.getItem( 'isGuest',0);
var labelId=window.localStorage.getItem( 'labelId');
var publicPath=process.env.PUBLIC_URL;
var logoPath= '/assets/images/background.jpg';
var isGuest=window.localStorage.getItem( 'isGuest'); // To enable or disbale guest mode
var guestEventID=window.localStorage.getItem( 'guestEventID'); // The guest eventID



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
	  {appName}
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function DashboardContent() {
    const navigate = useNavigate();
    const [label_data,setLabelData] = React.useState([]);
    const [now_label_id,setNowLabelId] = React.useState(0);
    const [open, setOpen] = React.useState(false);
  

    const toggleDrawer = () => {
		if(isGuest!=1) // Not guest mode
		{
			   setOpen(!open);

		}
    };
  

//To test

if(isGuest==0)
	console.log("USER mode is active!");
else
	console.log("GUEST mode is active!");

    {/* <--- User icon on top right & corresponding listview ---> */}
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleLogoutClick = () => {
	if(isGuest!=1) // Not guest mode
	{
	  if (window.confirm('Are you sure you want to logout?')) 
	  {
		 navigate('/forgetNot',true);
	  } 
	}
   
  };
  
   const handleProfileClick = () => {
	
	if(isGuest!=1) // Not guest mode
	{

		 navigate('/profile',true);
	 
	}
   
  };

	
    // init
    useEffect(()=> {
		
		if(isGuest!=1) // Not guest mode
		{
        get('api/label/get/',{})
            .then(function (res){
                console.log(res)
                setLabelData(res.data)
                setNowLabelId(res.data[0].id)
            })
		}
    },[])

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
			{appName}
            </Typography>
			
				{/* My profile icon */}
			<IconButton color="inherit" onClick={handleProfileClick}>
				<AccountBoxIcon fontSize="large"/>
			</IconButton>
			
			{/* Logout icon */}

			<IconButton color="inherit" onClick={handleLogoutClick}>
				<LogoutOutlinedIcon fontSize="large" />
			</IconButton>
            
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
              {label_data.map((value) => (
                  <ListItemButton key={value.id} onClick={() => setNowLabelId(value.id)} sx={{ backgroundColor: "#d1e18960" }}>
                      <ListItemIcon>
                          <ModeOfTravelIcon/>
                      </ListItemIcon>
                      <ListItemText primary={value.text} />
                  </ListItemButton>
              ))}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            /*backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',*/
			backgroundImage: `url(${publicPath+logoPath})`,
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center',
			backgroundSize: 'cover',
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="100vh" maxheight="100vh" sx={{ mt: 4, mb: 4 }}>
          
			  {/* Schedule */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  {/*<Schedule />*/}
                  <Schedule
                      label_id={now_label_id}
                      label_data={label_data}
                  />
                </Paper>
              </Grid>
           			
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}