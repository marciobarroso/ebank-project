# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV NEXT_PUBLIC_USER_SERVICE_URL=http://localhost:8081
ENV NEXT_PUBLIC_TRANSACTION_SERVICE_URL=http://localhost:8082
ENV NEXT_PUBLIC_RATE_SERVICE_URL=http://localhost:8083
RUN npm run build

# Production stage
FROM node:20-alpine
WORKDIR /app

# Copy built assets
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

# Set runtime environment variables
ENV NEXT_PUBLIC_USER_SERVICE_URL=http://localhost:8081
ENV NEXT_PUBLIC_TRANSACTION_SERVICE_URL=http://localhost:8082
ENV NEXT_PUBLIC_RATE_SERVICE_URL=http://localhost:8083

# Expose port
EXPOSE 8080

# Start the application
CMD ["npm", "start", "--", "-p", "8080"] 