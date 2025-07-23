# ===========================
# Stage 1: Build Angular frontend
# ===========================
FROM node:20 AS ng-builder

WORKDIR /app
COPY ./ClientApp ./ClientApp
WORKDIR /app/ClientApp

RUN npm install
RUN npm run build -- --configuration production

# ===========================
# Stage 2: Build .NET backend
# ===========================
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src
COPY . .
RUN dotnet restore
RUN dotnet publish -c Release -o /app/publish

# ===========================
# Stage 3: Final runtime image
# ===========================
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final

# ✅ Fix SSL: install CA certs for MongoDB Atlas
RUN apt-get update && \
    apt-get install -y --no-install-recommends ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# ✅ Optional: avoid TLS regression issues on some Linux hosts
ENV DOTNET_SYSTEM_NET_HTTP_USESOCKETSHTTPHANDLER=0

WORKDIR /app

# Copy published backend
COPY --from=build /app/publish .

# Copy Angular build output to wwwroot
COPY --from=ng-builder /app/ClientApp/dist/ClientApp /app/wwwroot

# Expose HTTP port
EXPOSE 80

# Start app
ENTRYPOINT ["dotnet", "ServerApp.dll"]
