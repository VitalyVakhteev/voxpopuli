# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the node server with vite
RUN npm run build

# Set the environment variable for the port
ENV PORT=4000

# Expose the port that your app will run on (change as needed)
EXPOSE 4000

# Start the node.js server
CMD ["node", "build"]
