FROM nginx:alpine

WORKDIR /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
RUN rm -rf ./*

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
