# Cocktail CLI

The Cocktail CLI is a command-line tool for interacting with the Cocktail Recipe Generator backend. It allows developers to authenticate using Google OAuth, generate API keys, and manage cocktail recipes.

[![npm version](https://badge.fury.io/js/cocktail-cli-test.svg)](https://www.npmjs.com/package/cocktail-cli-test)

## Prerequisites

- Node.js (v18 or later)
- npm (v8 or later)

## Installation

You can install the Cocktail CLI globally using npm:

```bash
npm install -g cocktail-cli-test
```

## IMPORTANT

**The backend service must be running before executing the CLI commands. Ensure that the backend is running on `http://localhost:3000`.**

## Commands

### `cocktail login`

Authenticates the user via Google OAuth. Opens a browser window for authentication.

```bash
cocktail login
```

### `cocktail api-key --generate`

Generates an API key with specified permissions. Prompts the user to authenticate if not already authenticated.

```bash
cocktail api-key --generate
```

### `cocktail api-key --generate--permission-addRecipe --permission-viewRecipes`

Generates an API key with permission to add and view recipes.

```bash
cocktail api-key --generate--permission-addRecipe --permission-viewRecipes
```

## TODO: Not implemented yet

### `cocktail add-recipe`

Adds a new recipe to the backend. Prompts for recipe details.

```bash
cocktail add-recipe
```

### `cocktail get-recipes`

Fetches recipes based on provided ingredients. Prompts for ingredient input.

```bash
cocktail get-recipes
```

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request. We appreciate your contributions!

## License

This project is licensed under the MIT License.
