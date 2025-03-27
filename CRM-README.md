# SetFindr Waitlist CRM System

## Overview

This package includes a complete Customer Relationship Management (CRM) system for the SetFindr waitlist. It allows you to collect, store, and analyze user registrations from the waitlist signup form.

## Features

- **Backend API**: Node.js Express server that handles form submissions
- **Data Storage**: JSON-based storage system for waitlist entries
- **Admin Dashboard**: Visual interface to view and analyze waitlist data
- **Analytics**: Charts and statistics about signups
- **Export**: Export waitlist data to CSV

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Install dependencies:
   ```
   npm install
   ```

2. Start the server:
   ```
   npm start
   ```

3. For development with auto-restart:
   ```
   npm run dev
   ```

### Accessing the System

- **Frontend Waitlist**: http://localhost:3000/waitlist.html
- **Signup Form**: http://localhost:3000/waitlist-signup.html
- **Admin Dashboard**: http://localhost:3000/admin.html

## System Architecture

### Backend (server.js)

- Express.js server handling API requests
- JSON file-based database (waitlist-data.json)
- RESTful API endpoints for waitlist operations

### Frontend

- **waitlist.html**: Landing page with waitlist information
- **waitlist-signup.html**: Form for collecting user information
- **admin.html**: Dashboard for viewing and analyzing waitlist data

## API Endpoints

- **POST /api/waitlist**: Submit a new waitlist entry
- **GET /api/waitlist/count**: Get the current number of waitlist entries
- **GET /api/admin/stats**: Get statistics about waitlist entries
- **GET /api/admin/waitlist**: Get all waitlist entries

## Data Structure

Each waitlist entry contains:

- **name**: User's full name
- **email**: User's email address
- **city**: User's city
- **role**: User's role (filmmaker, cinematographer, etc.)
- **interests**: Array of user's interests
- **newsletter**: Boolean indicating newsletter subscription
- **timestamp**: Date and time of submission
- **id**: Unique identifier
- **sessionData**: Additional data about the user's session

## Deployment

### Local Development

The system is configured to run locally for development purposes.

### Production Deployment

For production deployment, you'll need to:

1. Set up a proper database (MongoDB, PostgreSQL, etc.)
2. Configure environment variables
3. Set up authentication for the admin dashboard
4. Deploy to a hosting service (Heroku, AWS, etc.)

## GitHub Pages Integration

For GitHub Pages deployment:

1. The static frontend files (HTML, CSS, JS) can be deployed to GitHub Pages
2. The backend server needs to be deployed separately to a service like Heroku
3. Update API endpoints in the frontend to point to your deployed backend

## Security Considerations

- The current implementation is for demonstration purposes
- For production, implement proper authentication for the admin dashboard
- Consider encrypting sensitive user data
- Add rate limiting to prevent abuse

## Customization

You can customize the system by:

- Modifying the form fields in waitlist-signup.html
- Adding additional analytics to the admin dashboard
- Extending the backend API with additional endpoints
- Implementing email notifications for new signups