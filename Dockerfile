# Use a build stage to build the application
FROM maven:3.9.6-amazoncorretto-21 AS build
LABEL maintainer="vitaly.v@techusage.com"

# Copy the project files to the container
COPY src /home/app/src
COPY pom.xml /home/app

WORKDIR /home/app

# Build the application
RUN mvn clean package

# Use the OpenJDK image for running the application
FROM openjdk:21-jdk-slim

# Set a working directory for the application
WORKDIR /app

# Copy the built JAR file from the build stage
COPY --from=build /home/app/target/voxpopuli-0.0.1.jar /app/voxpopuli-0.0.1.jar

EXPOSE 8080

# Define the entry point that runs the application
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","voxpopuli-0.0.1.jar"]
