FROM eclipse-temurin:17-jdk-alpine
VOLUME /tmp
WORKDIR /app
RUN mkdir -p /app/logs
COPY target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app/app.jar"] 