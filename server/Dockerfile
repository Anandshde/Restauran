# ---- Build Stage ----
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json tsconfig.json ./
COPY src ./src
RUN npm install --production=false
RUN npm run build

# ---- Production Stage ----
FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 4000
CMD ["node", "dist/index.js"] 