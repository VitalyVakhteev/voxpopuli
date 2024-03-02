# VoxPopuli
An open-source polling system. Built in an 9-hour hackathon on March 2nd.

# Building
The backend runs on Java, using dependencies like SpringBoot and BCrypt. Make sure to install these dependencies with Maven.

For properly running the application, you need to run `mvn clean package` from the root directory. Then, run `docker build -t . voxpopuli-app`.

Afterwards, you should be able to run `docker-compose up -d` and run both the Postgres server + the backend API.

After the backend is setup, simply run the frontend development server from the frontend directory with `npm start`.

# Credits
Vitaly Vakhteev - Backend API, original frontend code
Marc Hyeler, Seon Mo Kim - Svelte Frontend Code
