import React, { useState } from 'react';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu'; // Import the MenuIcon
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import {Avatar} from "@mui/material";
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';
// import Theme from '../assets/Theme';
const Header = ({ hasHiddenAuthButtons }) => {
  const history = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md')); // Change breakpoint to 'md'
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isloggedIn = localStorage.getItem("username")

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  const handleLogout=()=>{
    localStorage.clear();
    window.location.reload();
  }

  if (hasHiddenAuthButtons) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {isSmallScreen && (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => toggleDrawer(true)} // Toggle the drawer
                sx={{ mr: 2 }}
              >

              </IconButton>
            )}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              upGrad Eshop
            </Typography>
            <Button
              className="explore-button"
              startIcon={<ShoppingBasketIcon />}
              variant="text"
              onClick={() => history('/')}
              style={{ backgroundColor: 'white' }}
            >
              BACK TO EXPLORE
            </Button>
          </Toolbar>
        </AppBar>

      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {isSmallScreen && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => toggleDrawer(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            upGrad Eshop
          </Typography>
          {isSmallScreen ? null : (
            isloggedIn ? (
              
                <>
                  <Avatar src="" alt={isloggedIn} />
                  <span>{localStorage.getItem("username")}</span>
                  <Button onClick={handleLogout} sx={{color:"white"}}>LOGOUT</Button>
                </>
              
            ) : (
              <>
                <Button color="inherit" onClick={() => history('/signin')}>
                  Login
                </Button>
                <Button color="primary" variant="contained" onClick={() => history('/signup')}>
                  Register
                </Button>
              </>
            )
          )}
        </Toolbar>
      </AppBar>
      {
        isSmallScreen && ( // Display the Drawer only on small screens
          <Drawer anchor="right" open={drawerOpen} onClose={() => toggleDrawer(false)}>
            <List>
              <ListItemButton onClick={() => history('/signin')}>
                <ListItemText primary="Login" />
              </ListItemButton>
              <ListItemButton onClick={() => history('/signup')}>
                <ListItemText primary="Register" />
              </ListItemButton>
            </List>
          </Drawer>
        )
      }
    </Box >
  );
};

export default Header;