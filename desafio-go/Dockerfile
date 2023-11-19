FROM golang:latest AS build

WORKDIR /app
COPY . /app
RUN CGO_ENABLED=0 GOOS=linux go build -o app main.go

FROM scratch
WORKDIR /app
COPY --from=build /app ./


CMD ["./app"]