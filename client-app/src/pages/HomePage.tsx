import { Box, Button, Container, Typography } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import cocktailImage from '../assets/cocktail.png';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const HomePage: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#ffffff', color: 'black', fontFamily:'Telegraf' }}>
      <Box sx={{ width: '100%', borderBottom: '2px solid black' }}>
        <Navbar />
      </Box>
      <Box sx={{ flex: 1, py: 4, backgroundColor: '#ffd209', paddingTop: '0' }}>
        <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop:'60px' }}>
          <Box sx={{ maxWidth: '50%' }}>
            <Typography variant="h4" gutterBottom>Welcome to the Custom Cocktail Recipe Generator</Typography>
            <Typography variant="body1" paragraph>
              Discover new and exciting cocktail recipes with our easy-to-use cocktail generator. Whether you're a seasoned mixologist or just starting out, 
              our tool allows you to input your available ingredients and find the perfect cocktail to make. You can also contribute by adding your favorite cocktail recipes 
              to our growing collection. Let's shake things up!
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Button
                component={RouterLink}
                to="/generate-recipes"
                variant="contained"
                color="primary"
                sx={{ mr: 2 }}
              >
                Generate Cocktails
              </Button>
              <Button
                component={RouterLink}
                to="/add-recipe"
                variant="contained"
                color="primary"
              >
                Add Recipe
              </Button>
            </Box>
          </Box>
          <Box sx={{ maxWidth: '45%' }}>
            <img src={cocktailImage} alt="Cocktail" style={{ width: '100%', borderRadius: '8px' }} />
          </Box>
        </Container>
      </Box>
      <Box sx={{ width: '100%', borderBottom: '2px solid black' }}></Box>
      <Footer />
    </Box>
  );
};

export default HomePage;
