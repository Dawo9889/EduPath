FROM node:18 AS builder

WORKDIR /app

COPY ../package*.json ./
COPY ../tsconfig.* ./
RUN npm install

COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN VITE_API_URL=$VITE_API_URL npm run build


FROM nginx:stable-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html

COPY Docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
