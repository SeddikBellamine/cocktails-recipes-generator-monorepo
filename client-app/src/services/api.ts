const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchRecipes = async (ingredients: string[]) => {
  try {
    const response = await fetch(`${API_BASE_URL}/recipes/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({ ingredients }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("fetchRecipes error:", error);
    throw error;
  }
};

export const addRecipe = async (recipe: {
  name: string;
  ingredients: string[];
  instructions: string;
}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/recipes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
      body: JSON.stringify(recipe),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`${response.statusText} - ${errorText}`);
    }

    return response.json();
  } catch (error) {
    console.error("addRecipe error:", error);
    throw error;
  }
};
