# Cocktail Recipe Generator Monorepo

This monorepo contains three main components: the backend service, the CLI tool, and the frontend application. Follow the steps below to set up and run the entire application.

## Prerequisites

- Docker
- Docker Compose
- Node.js (v18.3.0 or later)
- npm (v8.11.0 or later)

## Structure

- `backend/`: Contains the backend service built with NestJS.
- `cocktails-cli/`: Contains the CLI tool for interacting with the backend.
- `client-app/`: Contains the frontend application built with React and Vite.

## Setup and Run the Backend

### Step 1: Set Up Environment Variables

Navigate to the `backend` directory:

```bash
cd backend
```

Copy the `env.template` file to `.env` and fill in the required environment variables:

```bash
cp env.template .env
```

Edit the `.env` file and provide the following values:

```bash
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=your-google-callback-url
```

**All the instructions on how to get the env variables are in the Readme of the backend.**

### Step 2: Build and Run the Backend Containers

Use Docker Compose to build and start the backend containers:

```bash
docker-compose up --build -d
```

The backend service will be available at `http://localhost:3000`.

## Install and Use the CLI

### Step 1: Install the CLI Globally

Install the CLI globally using npm:

```bash
npm install -g cocktail-recipes-cli
```

### Step 2: Generate an API Key

Ensure the backend is running, then use the CLI to authenticate and generate an API key:

```bash
cocktail login
cocktail api-key --generate --permission-addRecipe --permission-viewRecipes
```

**All the instructions on how to use the cli are in the Readme of CLI**
**Now Copy the generated API key for use in the frontend application.**

## Setup and Run the Frontend

### Step 1: Set Up Environment Variables

Navigate to the `client-app` directory:

```bash
cd ../client-app
```

Copy the `env.template` file to `.env` and fill in the required environment variables:

```bash
cp env.template .env
```

Edit the `.env` file and provide the following values:

```bash
VITE_API_KEY=your-generated-api-key
VITE_BACKEND_URL=http://localhost:3000
```

### Step 2: Build and Run the Frontend Containers

Use Docker Compose to build and start the frontend containers:

```bash
docker-compose up --build -d
```

The frontend application will be available at `http://localhost` or `http://localhost:80` .

## Reset api key env variable

If you wish to change the api key in the frontend .env file you have to reset env variables and to do that you have to execute:

```bash
docker-compose down
```

Then rebuild and run the docker compose:

```bash
docker-compose up --build -d
```

## Summary

1. **Run the Backend**: Ensure the backend service is running at `http://localhost:3000`.
2. **Install and Use the CLI**: Install the CLI globally, authenticate, and generate an API key.
3. **Run the Frontend**: Configure the frontend with the generated API key and start the frontend application.
