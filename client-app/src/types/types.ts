export interface Recipe {
  _id: string;
  name: string;
  ingredients: string[]; // Updated to match the response
  instructions: string;
}
