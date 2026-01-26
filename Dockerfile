FROM node:20-alpine AS builder

WORKDIR /app

# Accept build arguments for Next.js public env vars
ARG NEXT_PUBLIC_GOOGLE_CLIENT_ID
ARG NEXT_PUBLIC_USER_API
ARG NEXT_PUBLIC_MOVIE_API
ARG NEXT_PUBLIC_API_TIMEOUT

# Set environment variables during build
ENV NEXT_PUBLIC_GOOGLE_CLIENT_ID=$NEXT_PUBLIC_GOOGLE_CLIENT_ID
ENV NEXT_PUBLIC_USER_API=$NEXT_PUBLIC_USER_API
ENV NEXT_PUBLIC_MOVIE_API=$NEXT_PUBLIC_MOVIE_API
ENV NEXT_PUBLIC_API_TIMEOUT=$NEXT_PUBLIC_API_TIMEOUT

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

#note

FROM node:20-alpine AS runner
WORKDIR /app

# Accept runtime env vars
ARG NEXT_PUBLIC_GOOGLE_CLIENT_ID
ARG NEXT_PUBLIC_USER_API
ARG NEXT_PUBLIC_MOVIE_API
ARG NEXT_PUBLIC_API_TIMEOUT

# Set runtime environment variables
ENV NODE_ENV=production
ENV NEXT_PUBLIC_GOOGLE_CLIENT_ID=$NEXT_PUBLIC_GOOGLE_CLIENT_ID
ENV NEXT_PUBLIC_USER_API=$NEXT_PUBLIC_USER_API
ENV NEXT_PUBLIC_MOVIE_API=$NEXT_PUBLIC_MOVIE_API
ENV NEXT_PUBLIC_API_TIMEOUT=$NEXT_PUBLIC_API_TIMEOUT

COPY --from=builder /app/package.json /app/yarn.lock ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

ENV PORT=3000
EXPOSE 3000

CMD ["yarn", "start"]
