[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/ylPS-Tsf)

# Event Management System Backend

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with:
```
MONGODB_URI=mongodb://localhost:27017/eventmanagement
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

3. Start MongoDB service on your system

4. Run the server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user

### Events
- GET `/api/events` - Get all events
- GET `/api/events/:id` - Get single event
- POST `/api/events` - Create event (requires auth)
- PUT `/api/events/:id` - Update event (requires auth)
- DELETE `/api/events/:id` - Delete event (requires auth)

## Frontend Integration

Update your frontend API calls to use:
- Base URL: `http://localhost:5000/api`
- Include JWT token in Authorization header for protected routes
