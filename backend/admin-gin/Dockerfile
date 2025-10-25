FROM golang:1.22.5-alpine AS build
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o main ./cmd/server/main.go

FROM alpine:latest
WORKDIR /root/
COPY --from=build /app/main .
ENV GIN_MODE=release \
    DB_HOST=139.155.143.190 \
    DB_PORT=3306 \
    DB_USER=root \
    DB_PASSWORD=ly15984093508 \
    DB_NAME=website
EXPOSE 8081 
CMD ["./main"]