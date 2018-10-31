FROM java:8
VOLUME /tmp
EXPOSE 8080
ADD ./target/surveyape-1.0.2.jar surveyape-1.0.2.jar
ADD ./application.properties application.properties
#ENTRYPOINT ["java","-jar","surveyape-1.0.2.jar"]
ENTRYPOINT ["java","-jar","surveyape-1.0.2.jar", "--spring.config.location=application.properties"]