import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo-zama-squareyellow.png';

const Navbar: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#ffd209' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="logo" component={Link} to="/">
            <img src={logo} alt="Zama Logo" style={{ height: '100px' }} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
