# Stage 1: Build the app
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the NestJS application
RUN npm run build

# Stage 2: Serve the app
FROM node:18-alpine AS runner

# Set environment variables
ENV NODE_ENV production

# Set the working directory
WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Expose the port NestJS will run on
EXPOSE 3000

# Start the NestJS app
CMD ["npm", "run", "start:prod"]
