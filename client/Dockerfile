# ---- Build Stage ----
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json tsconfig.json next.config.* ./
COPY src ./src
COPY public ./public
RUN npm install --production=false
RUN npm run build

# ---- Production Stage ----
FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["npm", "start"] 