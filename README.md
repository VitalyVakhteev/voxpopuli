# VoxPopuli
An open-source polling system. Built in an 9-hour hackathon on March 2nd.

# Plans
- Password Forgotten Feature

# Patch Notes
### 0.0.4
- Added pagination
- Added service to delete polls 1 day after end-date
- Clarified vote errors

### 0.0.3
- Added password resets

### 0.0.2
- Fixed an issue where a user cannot vote on multiple polls once they have voted on only one

# Building
The backend runs on Java, using dependencies like SpringBoot and BCrypt. Make sure to install these dependencies with Maven.

For properly running the application, you need to run `mvn clean package` from the root directory. Then, run `docker build -t . voxpopuli-app`.

Afterwards, you should be able to run `docker-compose up -d` and run both the Postgres server + the backend API.

After the backend is setup, simply run the frontend development server from the frontend directory with `npm start`.

# Credits
Vitaly Vakhteev - Backend API, original frontend code

Marc Hyeler, Seon Mo Kim - Svelte Frontend Code
