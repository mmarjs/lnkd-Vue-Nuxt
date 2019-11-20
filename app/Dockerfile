FROM node:latest

# Set environment variables
ENV API_URL=https://api.lnkd.co
ENV NODE_ENV=production
# otherwise the app is unavailable to the host running Docker
ENV HOST=0.0.0.0

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install --only=production

# Bundle app source
COPY . .

# Build Nuxt app
RUN npm run build

# Expose the app's port
EXPOSE 3000

CMD [ "npm", "run", "start" ]