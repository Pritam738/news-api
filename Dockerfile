# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of your application code into the container
COPY . .

# Expose a port that your application will listen on
EXPOSE 3000

# Define the command to run your application
CMD [ "node", "app.js" ]
