import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';
import logo from '../assets/logo-zama-squareyellow.png';

const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ backgroundColor: '#ffd209', color: 'black', textAlign: 'center', p: 2, mt: 'auto' }}>
      <img src={logo} alt="Zama Logo" style={{ height: '40px' }} />
      <Typography variant="body2">
        &copy; 2024 Zama.ai. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
