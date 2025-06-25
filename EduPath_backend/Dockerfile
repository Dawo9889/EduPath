# See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

# This stage is used when running from VS in fast mode (Default for Debug configuration)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081


# This stage is used to build the service project
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["EduPath_backend.API/EduPath_backend.API.csproj", "EduPath_backend.API/"]
COPY ["EduPath_backend.Application/EduPath_backend.Application.csproj", "EduPath_backend.Application/"]
COPY ["EduPath_backend.Domain/EduPath_backend.Domain.csproj", "EduPath_backend.Domain/"]
COPY ["EduPath_backend.Infrastructure/EduPath_backend.Infrastructure.csproj", "EduPath_backend.Infrastructure/"]
RUN dotnet restore "./EduPath_backend.API/EduPath_backend.API.csproj"
COPY . .
WORKDIR "/src/EduPath_backend.API"
RUN dotnet build "./EduPath_backend.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

# This stage is used to publish the service project to be copied to the final stage
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./EduPath_backend.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# This stage is used in production or when running from VS in regular mode (Default when not using the Debug configuration)
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "EduPath_backend.API.dll"]