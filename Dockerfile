# # syntax=docker/dockerfile:1

# # Comments are provided throughout this file to help you get started.
# # If you need more help, visit the Dockerfile reference guide at
# # https://docs.docker.com/go/dockerfile-reference/

# ARG NODE_VERSION=18.18.2

# FROM node:${NODE_VERSION}-alpine


# # Use production node environment by default.
# ENV NODE_ENV development

# WORKDIR /home/node

# RUN mkdir -p /home/node \
#     && chown -R node:node /home/node \
#     && chmod -R 777 /home/node 

# # Run  mkdir -p /home/node/public/node/ \
# #     && chown -R node:node /home/node/ \
# #     && chmod -R 777 /home/node/

# USER node
# # Run mkdir -p /home/node/p \
# #     && chown -R node:node 
# # Download dependencies as a separate step to take advantage of Docker's caching.
# # Leverage a cache mount to /root/.npm to speed up subsequent builds.
# # Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# # into this layer.
# # RUN --mount=type=bind,source=package.json,target=package.json \
# #     --mount=type=bind,source=package-lock.json,target=package-lock.json \
# #     --mount=type=cache,target=/root/.npm \
# #     npm ci --omit=dev
# COPY package*.json ./

# # Switch to the 'node' user



# # Run the application as a non-root user.
# RUN npm install
# # USER node

# # Copy the rest of the source files into the image.
# COPY . .




# # Change ownership of /usr/src/app to the 'node' user



# # Expose the port that the application listens on.
# EXPOSE 3000

# # Run the application.
# CMD npm run dev


# Use a specific version of Node as a base image
ARG NODE_VERSION=18.18.2
FROM node:${NODE_VERSION}-alpine

# Set the working directory
WORKDIR /home/node

# Create necessary directories, set ownership, and adjust permissions
RUN mkdir -p /home/node \
    && chown -R node:node /home/node \
    && chmod -R 777 /home/node 

Run mkdir -p /home/node/Logs \
    && chown -R node:node /home/node/Logs \
    && chmod -R 777 /home/node/Logs 

# Switch to the 'node' user
USER node

# Copy package.json and package-lock.json separately to take advantage of Docker caching
COPY --chown=node:node package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source files into the image
COPY --chown=node:node . .

# Expose the port that the application listens on
EXPOSE 3000

# Run the application
CMD npm run dev
