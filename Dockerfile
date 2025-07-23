# ========================
# Stage 1: Angular build
# ========================
FROM node:20 AS ng-builder

WORKDIR /app
COPY ./ClientApp ./ClientApp
WORKDIR /app/ClientApp

RUN npm install
RUN npm run build -- --configuration production


# =========================
# Stage 2: .NET build
# =========================
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src
COPY . .
RUN dotnet restore ./ServerApp/ServerApp.csproj
RUN dotnet publish ./ServerApp/ServerApp.csproj -c Release -o /app/publish


# =============================
# Stage 3: Runtime image
# =============================
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final

# ✅ Fix SSL issues (TLS/CA certs)
RUN apt-get update && \
    apt-get install -y --no-install-recommends ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# ✅ TLS handshake workaround (optional but helps on Render)
ENV DOTNET_SYSTEM_NET_HTTP_USESOCKETSHTTPHANDLER=0

WORKDIR /app

# Copy .NET published backend
COPY --from=build /app/publish .

# Copy Angular dist to wwwroot
COPY --from=ng-builder /app/ClientApp/dist/ClientApp ./wwwroot

# Expose port (Render uses 80 by default)
EXPOSE 80

# Start app
ENTRYPOINT ["dotnet", "ServerApp.dll"]
