FROM openjdk:21-slim as build
LABEL maintainer="vitaly.v@techusage.com"

# Set a working directory
COPY src /home/app/src

COPY pom.xml /home/app

WORKDIR /home/app

RUN apt-get update && apt-get install -y maven && mvn clean package

FROM openjdk:21-slim

COPY --from=build /home/app/target/*.jar /usr/app/voxpopuli-0.0.1.jar
EXPOSE 8080

ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","voxpopuli-0.0.1.jar"]