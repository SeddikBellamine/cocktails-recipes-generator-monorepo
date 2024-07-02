import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddRecipePage from './pages/AddRecipePage';
import GenerateRecipe from './pages/GenerateRecipe';
import HomePage from './pages/HomePage';
import theme from './theme';
const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-recipe" element={<AddRecipePage />} />
          <Route path="/generate-recipes" element={<GenerateRecipe />} />
        </Routes>
      </Router>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default App;
