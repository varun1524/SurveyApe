package com.example.surveyape.service;

import com.amazonaws.AmazonClientException;
import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.PutObjectResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import org.apache.commons.codec.binary.Base64;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.InputStream;

@Service
public class S3ServiceImpl {
    @Value("${amazon.bucketName}")
    private String bucketName;

    @Value("${amazon.bucketURL}")
    private String bucketURL;

    public String getBucketURL() {
        return bucketURL;
    }

    @Autowired
    private AmazonS3 s3client;

    public void uploadImage1(String fileName, String uploadFilePath) {
        File file = new File(uploadFilePath);
        System.out.println(s3client);

        s3client.putObject(new PutObjectRequest(bucketName, fileName, file));
    }

    public void uploadImage(String fileName, String imageString) {
//        System.out.println(imageString.substring(0,imageString.indexOf(",")+1));
//        System.out.println(imageString.split(";")[0].split(":")[1]);
        //Convert base64 imagestring to byte data
        byte[] byteImage = Base64.decodeBase64(
                (imageString.substring(imageString.indexOf(",")+1)).getBytes());

        InputStream inputStream = new ByteArrayInputStream(byteImage);

//        System.out.println(s3client);

        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(byteImage.length);
        objectMetadata.setContentType(imageString.split(";")[0].split(":")[1]);
//        metadata.setCacheControl("public, max-age=31536000");
        PutObjectResult result = s3client.putObject(bucketName, fileName, inputStream, objectMetadata);
        System.out.println(result);
        s3client.setObjectAcl(bucketName, fileName, CannedAccessControlList.PublicRead);
    }
}
