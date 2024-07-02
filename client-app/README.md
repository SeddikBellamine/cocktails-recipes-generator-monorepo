# Cocktail Recipe Generator Frontend

This is the frontend application for the Cocktail Recipe Generator. It is built using React and Vite, allowing users to interact with the backend service to generate and add cocktail recipes.

## Prerequisites

- Docker
- Docker Compose

## Getting Started

### Step 1: Set Up Environment Variables

Copy the `env.template` file to `.env` and fill in the required environment variables:

```bash
cp env.template .env
```

Edit the `.env` file and provide the following values:

```bash
VITE_API_KEY=your-generated-api-key
VITE_BACKEND_URL=backend-url
```

#### How to Get Each Environment Variable

- **VITE_API_KEY**:

  1. This is the API key you generated using the CLI tool or the backend service. It is used to authenticate requests to the backend.

- **VITE_BACKEND_URL**:
  1. This is the URL of the backend service. It should be in the form `http://localhost:3000` if you are running the backend locally.

### Step 2: Build and Run the Containers

Use Docker Compose to build and start the containers:

```bash
docker-compose up --build -d
```

This will build the frontend application and start the container.

### Step 3: Access the Frontend Application

The frontend application will be available at `http://localhost` or `http://localhost:80` .

## Cleaning Up

To stop the containers, run:

```bash
docker-compose down
```

This will stop and remove the containers.

To remove the containers, networks, and volumes created by Docker Compose, run:

```bash
docker-compose down -v
```

This will also delete any data stored in volumes.
