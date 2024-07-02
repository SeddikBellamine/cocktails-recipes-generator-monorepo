import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Avatar, Box, Button, Container, IconButton, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GenerateRecipeImage from '../assets/generate-recipe.png';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { fetchRecipes } from '../services/api';
import { Recipe } from '../types/types';

const GenerateRecipe: React.FC = () => {
  const [ingredients, setIngredients] = useState<string[]>(['']);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const handleRemoveIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const handleGenerateRecipes = async () => {
    setError(null);
    try {
        const data = await fetchRecipes(ingredients.map(ingredient => ingredient.trim()).filter(ingredient => ingredient));
      setRecipes(Array.isArray(data) ? data : []); 
    } catch (err) {
        const errorMessage = (err as Error).message;
        
          toast.error(`Failed to fetch recipes. Error: ${errorMessage}`);
        
      
      setRecipes([]);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#ffffff', color: 'black', fontFamily: 'Telegraf' }}>
      <Navbar />
      <Box sx={{ flex: 1, py: 4, backgroundColor: '#ffd209', paddingTop: '10px' }}>
        <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ maxWidth: '50%' }}>
            <Typography variant="h4" gutterBottom>This is the Custom Cocktail Recipe Generator</Typography>
            <Typography variant="body1" paragraph>
              Enter the ingredients you have available in the fields below to generate delicious cocktail recipes. Simply add each ingredient you have on hand, and we'll provide you with a variety of recipes that you can make right now. Get ready to discover new favorites and enjoy your perfect cocktail!
            </Typography>
            <Box sx={{ mt: 4 }}></Box>
          </Box>
          <Box sx={{ maxWidth: '45%' }}>
            <img src={GenerateRecipeImage} alt="Cocktail" style={{ width: '100%', borderRadius: '8px' }} />
          </Box>
        </Container>
      </Box>
      <Container sx={{ flex: 1, mt: 4 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <IconButton component={RouterLink} to="/" color="primary">
            <ArrowBackIcon />
          </IconButton>
        </Box>
        <Typography variant="h4" gutterBottom>Generate Recipes</Typography>
        {ingredients.map((ingredient, index) => (
          <Box key={index} display="flex" alignItems="center" mb={2}>
            <TextField
              variant="outlined"
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
              placeholder="Enter an ingredient"
              fullWidth
              sx={{ mr: 2, backgroundColor: '#fff', borderRadius: 1, borderColor: 'black' }}
            />
            {index > 0 && (
              <IconButton onClick={() => handleRemoveIngredient(index)} color="error">
                <RemoveCircleOutlineIcon />
              </IconButton>
            )}
          </Box>
        ))}
        <Button onClick={handleAddIngredient} variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />}>
          Add Ingredient
        </Button>
        <Button onClick={handleGenerateRecipes} variant="contained" color="primary" sx={{ ml: 2 }}>
          Generate Recipes
        </Button>
        {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}

        <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper', mt: 4 }}>
          {Array.isArray(recipes) && recipes.map((recipe) => (
            <ListItem key={recipe._id} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar>
                  <LocalBarIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={recipe.name}
                secondary={
                  <React.Fragment>
                    <Typography variant="subtitle1" component="span" color="textPrimary">
                      Ingredients:
                    </Typography>
                    <ul>
                      {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                    <Typography variant="subtitle1" component="span" color="textPrimary">
                      Instructions:
                    </Typography>
                    <Typography component="span">{recipe.instructions}</Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          ))}
        </List>
      </Container>
      <Footer />
    </Box>
  );
};

export default GenerateRecipe;
