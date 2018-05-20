package com.example.surveyape.service;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class S3ServiceConfig {
    @Value("${amazon.access_key_id}")
    private String access_key;

    @Value("${amazon.secret_access_key}")
    private String secret_key;

    @Value("${amazon.bucketName}")
    private String bucketName;

    @Value("${amazon.region}")
    private String region;

    @Value("${amazon.bucketURL}")
    private String bucketURL;

    @Bean
    public AmazonS3 s3client() {
        AWSCredentials awsCreds = new BasicAWSCredentials(access_key, secret_key);
        AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
                .withRegion(Regions.fromName(region))
                .withCredentials(new AWSStaticCredentialsProvider(awsCreds))
                .build();
        return s3Client;
    }
}
