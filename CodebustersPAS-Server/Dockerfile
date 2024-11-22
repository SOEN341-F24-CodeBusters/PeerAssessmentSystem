# syntax=docker/dockerfile:1.7-labs

# Use the official .NET SDK image to build the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy the solution file and restore dependencies
COPY *.sln ./
COPY --parents **/*.csproj ./
RUN dotnet restore CodebustersPAS-Server.sln

# Copy the rest of the application code
COPY . .
RUN dotnet publish -c Release -o out

# Use the official ASP.NET runtime image to run the application
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Copy the published output
COPY --from=build /src/out .

# Expose the port the application runs on
EXPOSE 8080

# EXPOSE data
VOLUME /data

# Set the entry point for the application
ENTRYPOINT ["dotnet", "API.dll"]
