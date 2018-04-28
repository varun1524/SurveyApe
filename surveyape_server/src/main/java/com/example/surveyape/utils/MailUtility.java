package com.example.surveyape.utils;

public class MailUtility {
//    static String verifyUrlPrefix = "http://localhost:8080/verifyaccount/?verificationcode=";
    static String verifyUrlPrefix = "http://localhost:3000/verifyaccount/";

    public static String createVerificationMsg(int verificationcode){
        String msg = "Thank you for registering with SurveyApe !!!\nKindly verify your account"
                     +" using the verification code or clicking the url.\n"
                     +"\nCode : "+verificationcode
                     +"\nUrl : "+verifyUrlPrefix+verificationcode
                     +"\n\nRegards\nTeam SurveyApe";
        return msg;
    }

    public static final String verificationSuccessfulMessage = "Congratulations. You have successfully verified your account.";

}
