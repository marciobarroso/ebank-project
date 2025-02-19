# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies first (caching)
COPY package*.json ./
COPY .npmrc ./
RUN npm install

# Copy rest of the application
COPY . .

# Build the Next.js application
RUN npm run build

# Expose port
EXPOSE 8080

# Start the application
CMD ["npm", "start", "--", "-p", "8080"] 