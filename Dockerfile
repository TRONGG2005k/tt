# ==========================================
# Stage 1: Build Next.js Application
# ==========================================
FROM node:20-alpine AS builder

USER root

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build


# ==========================================
# Stage 2: Production Image
# ==========================================
FROM node:20-alpine AS runner

USER root

# Cài nginx trong Alpine
RUN apk add --no-cache nginx

# Create app user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Copy nginx config
COPY nginx.conf /etc/nginx/http.d/default.conf

# Expose HuggingFace default port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start Next.js + Nginx
CMD ["sh", "-c", "node server.js & nginx -g 'daemon off;'"]