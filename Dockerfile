ARG BUILD_CONFIG=prod

# ------------ Stage 1: Build the Angular app ------------
FROM node:20-alpine AS build

# Redeclare ARG inside this stage
ARG BUILD_CONFIG

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire Angular project
COPY . .

# Build the production version of the Angular app
RUN npm run build:${BUILD_CONFIG}


# ------------ Stage 2: Serve the app with Nginx ------------
FROM nginx:alpine

# Create your custom folder
RUN mkdir -p /usr/share/nginx/html

# Remove default Nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built Angular files from Stage 1
#COPY --from=build /app/dist/* /usr/share/nginx/html
#COPY --from=build /app/dist/ /usr/share/nginx/html/
COPY --from=build /app/dist/school-manager-portal/ /usr/share/nginx/html/




# Replace Nginx default.conf so it serves from /ustc
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose Nginx port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
