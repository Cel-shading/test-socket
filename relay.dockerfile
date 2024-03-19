# Define the base image
FROM node:21

# Define the working directory
WORKDIR /usr/src/app

# Copy the rest of the application files
COPY . .

# Install ws module
RUN npm install ws

# Expose ports
EXPOSE 4146
EXPOSE 4147

# Start the application
CMD [ "node", "index.js" ]