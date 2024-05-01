# Use an official Node runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or other package manager lock files)
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Bundle app source inside the Docker image
COPY . .

# Build the TypeScript application
RUN npm run build

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define the command to run your app using CMD which defines your runtime
CMD ["node", "dist/index.js"]
# CMD ["npm", "run", "dev"]
