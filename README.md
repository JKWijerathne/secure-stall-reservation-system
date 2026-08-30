# Book Fair System

A full-stack reservation system for a book fair, with a React frontend, Spring Boot backend, and PostgreSQL persistence layer.

## Architecture Overview

- Frontend: React + Vite
- Backend: Java 25 + Spring Boot 4
- Database: PostgreSQL
- Authentication: Auth0 OIDC / JWT validation

## Features

- Role-based access for admin, employee, and vendor users
- Stall floor plan browsing and reservation flow
- QR verification and reservation checks
- Profile management and secure authenticated endpoints
- Admin dashboards and employee duties workflow

## Tech Stack

### Frontend
- React 19
- Vite
- Axios
- React Router
- Auth0 React SDK

### Backend
- Java 25
- Spring Boot 4
- Spring Security
- Spring Data JPA
- PostgreSQL JDBC
- Spring Boot Mail

### Database
- PostgreSQL

## Prerequisites

Before running the project locally, install the following:

- Node.js 20+ (LTS recommended)
- JDK 25 (Temurin / Eclipse Adoptium recommended)
- PostgreSQL 15+ running locally
- Git

Make sure the following are available in your terminal:

- `node` and `npm`
- `java`
- `psql`

## 1. Database Setup

Create the local PostgreSQL database and load the schema and seed scripts.

### Create database

```bash
psql -U postgres -d postgres -c "CREATE DATABASE bookfair_db;"
```

### Run schema and seed data

From the project root:

```bash
psql -U postgres -d bookfair_db -f database/schema.sql
psql -U postgres -d bookfair_db -f database/seed.sql
```

### Run any required migrations

If you are restoring or migrating an older database, run the Auth0-related migration scripts as needed:

```bash
psql -U postgres -d bookfair_db -f database/migration_add_auth0_sub.sql
psql -U postgres -d bookfair_db -f database/migration_add_auth0_sub_to_reservations.sql
```

## 2. Configure Local SSL Keystore

The backend runs with HTTPS on port 8443. Generate a local keystore before starting the Spring Boot app:

```bash
cd backend/src/main/resources
"C:\Program Files\Eclipse Adoptium\jdk-25.0.4.101-hotspot\bin\keytool.exe" -genkeypair -alias bookfair -keyalg RSA -keysize 2048 -storetype PKCS12 -keystore keystore.p12 -validity 365
```

If your JDK is installed in a different location, update the path accordingly.

## 3. Required Environment Variables

Set these before starting the backend and frontend.

### Frontend environment variables
Create a file named `frontend/.env`:

```env
VITE_AUTH0_DOMAIN=your-auth0-domain
VITE_AUTH0_CLIENT_ID=your-auth0-client-id
VITE_AUTH0_AUDIENCE=https://stallreservation.com/api
VITE_API_BASE_URL=https://localhost:8443/api
```

### Backend environment variables
Use environment variables or set them in the Spring Boot runtime environment. The project expects values such as:

```env
PORT=8443
SSL_ENABLED=true
SSL_KEY_STORE=classpath:keystore.p12
SSL_KEY_STORE_PASSWORD=your-keystore-password
SSL_KEY_STORE_TYPE=PKCS12
SSL_KEY_ALIAS=bookfair

SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/bookfair_db
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=your-postgres-password

MAIL_HOST=smtp.gmail.com
MAIL_PORT=465
MAIL_PROTOCOL=smtps
MAIL_USERNAME=your-email@example.com
MAIL_PASSWORD=your-email-password
MAIL_DEBUG=false

AUTH0_ISSUER_URI=https://your-tenant.auth0.com/
AUTH0_AUDIENCE=https://stallreservation.com/api

```

The Spring config in [backend/src/main/resources/application.properties](backend/src/main/resources/application.properties) reads these values and falls back to localhost-safe defaults when unset.

## 4. Run the Backend

From the project root:

```bash
cd backend
./mvnw spring-boot:run
```

The backend should start with HTTPS enabled on:

- https://localhost:8443

## 5. Run the Frontend

Open a second terminal and run:

```bash
cd frontend
npm install
npm run dev
```

The frontend development server typically runs at:

- http://localhost:5173

## 6. Verify the app

- Frontend: http://localhost:5173
- Backend API: https://localhost:8443/api

If the app does not start:

1. Confirm PostgreSQL is running and the database exists.
2. Confirm the Auth0 variables are set correctly.
3. Confirm the keystore file exists at `backend/src/main/resources/keystore.p12`.
4. Confirm the database credentials match your local PostgreSQL user.

## Troubleshooting

- If the backend fails to start on HTTPS, regenerate the keystore.
- If the frontend cannot authenticate, check that `VITE_AUTH0_DOMAIN`, `VITE_AUTH0_CLIENT_ID`, and `VITE_AUTH0_AUDIENCE` are set in `frontend/.env`.
- If the database connection fails, verify the PostgreSQL server is running and the database name matches `bookfair_db`.

