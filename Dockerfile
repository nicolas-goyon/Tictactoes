# Stage 1: Build
FROM node:18-alpine AS builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY ./my-project/package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application files for the build
COPY ./my-project/* .


# Stage 2: Run
FROM node:18-alpine

# Set the working directory in the runtime container
WORKDIR /usr/src/app

# Copy only the production dependencies and built files from the builder stage
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app .

# Expose the port your app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
