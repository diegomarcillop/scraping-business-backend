# Initiate a container to build the application in.
FROM node:14-alpine as builder
ENV NODE_ENV=build
WORKDIR /usr/src/app

# Copy the package.json into the container.
COPY package*.json ./

# Install the dependencies required to build the application.
RUN npm install

# Copy the application source into the container.
COPY . .

# Build the application.
RUN npm run build

# Uninstall the dependencies not required to run the built application.
RUN npm prune --production

# Initiate a new container to run the application in.
FROM node:14-alpine
  ENV NODE_ENV=production
WORKDIR /usr/src/app

# Copy everything required to run the built application into the new container.
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules/ ./node_modules/
COPY --from=builder /usr/src/app/dist/ ./dist/

# Expose the web server's port.
EXPOSE 3000

# Run the application.
CMD ["node", "dist/main"]