# Use official lightweight Node.js image
FROM node:20-slim

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm ci --only=production

# Bundle app source
COPY src/ ./src/

# Expose backend port
EXPOSE 8080

# Run the web service on container startup
CMD ["npm", "start"]
