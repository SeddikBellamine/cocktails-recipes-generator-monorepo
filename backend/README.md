# Cocktail Recipe Generator Backend

This is the backend service for the Cocktail Recipe Generator application. It is built using NestJS and connects to a MongoDB database. The service handles user authentication via Google OAuth, manages API keys, and provides endpoints for managing and retrieving cocktail recipes.

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
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=your-google-callback-url
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
```

#### How to Get Each Environment Variable

- **GOOGLE_CLIENT_ID** and **GOOGLE_CLIENT_SECRET**:

  1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
  2. Create a new project or select an existing project.
  3. Navigate to "APIs & Services" > "Credentials".
  4. Click on "Create Credentials" and select "OAuth 2.0 Client IDs".
  5. Configure the consent screen and create the credentials.
  6. Copy the `Client ID` and `Client Secret` to your `.env` file.

- **GOOGLE_CALLBACK_URL**:

  1. This is the URL to which Google will redirect users after they have authenticated. It should be in the form `http://localhost:3000/auth/google/callback`.

- **MONGO_URI**:

  1. This is the connection string for your MongoDB instance. If you are using the MongoDB container provided in the `docker-compose.yml` file, it should be in the form `mongodb://cocktaildb:pwcocktail@mongo:27017/cocktail-app`.

### Step 2: Build and Run the Containers

Use Docker Compose to build and start the containers:

```bash
docker-compose up --build -d
```

This will build the backend service, set up the MongoDB database, and start both containers.

### Step 3: Access the Backend Service

The backend service will be available at `http://localhost:3000`.

## API Endpoints

### Authentication

- **GET /auth/google**: Initiates the Google OAuth flow.

```bash
curl -X GET http://localhost:3000/auth/google
```

- **POST /auth/google/callback**: Handles the OAuth callback and token exchange and return the page of authorization that should be opened in the browser.

```bash
curl -X POST http://localhost:3000/auth/google/callback
```

### API Key Management

- **POST /api-key/generate**: Generates API keys with specified permissions.

```bash
curl -X POST http://localhost:3000/api-key/generate \
  -H "Content-Type: application/json" \
  -d '{
        "userId": "your-google-user-id",
        "permissions": ["addRecipe", "viewRecipes"]
      }'
```

### Recipe Management

- **POST /recipes**: Adds a new recipe.

```bash
curl -X POST http://localhost:3000/recipes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-api-key" \
  -d '{
        "name": "Mojito",
        "ingredients": ["Rum", "Mint", "Sugar", "Lime", "Soda Water"],
        "instructions": "Muddle mint leaves with sugar and lime juice. Add a splash of soda water, fill the glass with ice, and pour the rum over the ice. Top with soda water, garnish with mint, and serve."
      }'
```

- **POST /recipes/search**: Fetches recipes that can be made with the provided ingredients.

```bash
curl -X POST http://localhost:3000/recipes/search \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer your-api-key" \
 -d '{
"ingredients": ["Rum", "Mint"]
}'
```

this should be a get

## Stopping the Containers

To stop the containers, run:

```bash
docker-compose down
```

This will stop and remove the containers but preserve the data in the MongoDB volume.

## Cleaning Up

To remove the containers, networks, and volumes created by Docker Compose, run:

```bash
docker-compose down -v
```

This will also delete the data stored in the MongoDB volume.

# Running the backend without docker

## Installation

```bash
$ npm ci
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
