FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 5000
EXPOSE 5001

ENV ASPNETCORE_URLS=http://+:5000

USER app
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG configuration=Release
WORKDIR /src
COPY ["src/PiBooking.API/PiBooking.API.csproj", "src/PiBooking.API/"]
RUN dotnet restore "src/PiBooking.API/PiBooking.API.csproj"
COPY . .
WORKDIR "/src/src/PiBooking.API"
RUN dotnet build "PiBooking.API.csproj" -c $configuration -o /app/build

FROM build AS publish
ARG configuration=Release
RUN dotnet publish "PiBooking.API.csproj" -c $configuration -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "PiBooking.API.dll"]
