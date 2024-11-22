# Use the official .NET SDK image to build the application
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src

# Copy the solution file and restore dependencies
COPY *.sln ./
COPY **/*.csproj ./
RUN echo "Contents of /src after copying .sln and .csproj files:" && ls -R /src
RUN dotnet restore CodebustersPAS-Server.sln

# Copy the rest of the application code
COPY . ./
RUN dotnet publish -c Release -o out

# Use the official ASP.NET runtime image to run the application
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS runtime
WORKDIR /app

# Copy the published output
COPY --from=build /src/out .

# Expose the port the application runs on
EXPOSE 80

# Set the entry point for the application
ENTRYPOINT ["dotnet", "API.dll"]
