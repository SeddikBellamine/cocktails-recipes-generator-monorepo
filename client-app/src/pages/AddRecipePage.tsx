import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Box, Button, Container, IconButton, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { addRecipe } from '../services/api';

const AddRecipePage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [ingredients, setIngredients] = useState<string[]>(['']);
  const [instructions, setInstructions] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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

  const handleSubmit = async () => {
    setError(null);
    setSuccess(null);
      try {
          await addRecipe({ name, ingredients: ingredients.filter(ing => ing.trim()), instructions });
          setSuccess('Recipe added successfully!');
          setName('');
          setIngredients(['']);
          setInstructions('');
          toast.success('Recipe added successfully!');
      } catch (err) {
          const errorMessage = (err as Error).message;
          setError(errorMessage);
        
          toast.error(`Failed to add recipe. Error: ${errorMessage}`);
      }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#ffffff', color: 'black' }}>
      <Navbar />
          <Container sx={{ flex: 1, mt: 4 }}>
              <Box display="flex" alignItems="center" mb={2}>
          <IconButton component={RouterLink} to="/" color="primary">
            <ArrowBackIcon />
          </IconButton>
        </Box>
        <Typography variant="h4" gutterBottom>Add a New Recipe</Typography>
        <TextField
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter recipe name"
          fullWidth
          sx={{ mb: 2, backgroundColor: '#fff', borderRadius: 1, borderColor:'black' }}
        />
        {ingredients.map((ingredient, index) => (
          <Box key={index} display="flex" alignItems="center" mb={2}>
            <TextField
              variant="outlined"
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
              placeholder="Enter an ingredient"
              fullWidth
              sx={{ mr: 2, backgroundColor: '#fff', borderRadius: 1, borderColor:'black' }}
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
        <TextField
          variant="outlined"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="Enter instructions"
          multiline
          rows={4}
          fullWidth
          sx={{ mt: 2, mb: 2, backgroundColor: '#fff', borderRadius: 1, borderColor:'black', }}
        />
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Add Recipe
        </Button>
        {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
        {success && <Typography color="success" sx={{ mt: 2 }}>{success}</Typography>}
      </Container>
      <Footer />
    </Box>
  );
};

export default AddRecipePage;
