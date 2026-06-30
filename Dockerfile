# In backend project
# Dockerfile

# Simple base image for Node.js apps
FROM node:20-alpine

# App directory inside container
WORKDIR /app

# Install dependencies first (better Docker cache)
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Production mode
ENV NODE_ENV=production
# like .env we can export environment variables here, for example PORT
ENV PORT=8089

# App port
EXPOSE 8089

# Start Express app (TypeScript via tsx)
CMD ["npx", "tsx", "index.ts"]