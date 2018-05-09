package com.example.surveyape.utils;

public class MailUtility {
    //    static String verifyUrlPrefix = "http://localhost:8080/verifyaccount/?verificationcode=";
    static String verifyUrlPrefix = "http://localhost:3000/verifyaccount/";

    public static String createVerificationMsg(int verificationcode) {
        String msg = "Thank you for registering with SurveyApe !!!\nKindly verify your account"
                + " using the verification code or clicking the url.\n"
                + "\nCode : " + verificationcode
                + "\nUrl : " + verifyUrlPrefix + verificationcode
                + "\n\nRegards\nTeam SurveyApe";
        return msg;
    }

    public static final String url = "http://localhost:3000";
    public static final String generalurl = "http://localhost:3000/survey/";
    public static final String openurl = "http://localhost:3000/surveyresponse/o/";
    public static final String closedurl = "http://localhost:3000/surveyresponse/c/";
    public static final String verificationSuccessfulMessage = "Congratulations. You have successfully verified your account.";
    public static final String general_survey_body = "Please take the general Survey using the below link:\nURL:" + url+"/survey/";
    public static final String general_survey_subject = "General Survey request";
    public static final String close_survey_body = "Please take the close Survey using the below link:\nURL:" + url+"/surveyresponse/c/";
    public static final String close_survey_subject = "Close Survey request";

    public static final String open_survey_body = "Please take the close Survey using the below link:\nURL:" + url+"/surveyresponse/o/";
    public static final String open_survey_subject = "Open Survey request";

    public static final String surveyResponseMsg = "Thank you for you response !!! ";
    public static final String surveyResponseBody = "Survey Submitted successfully";

    public static final String thank_team_surveyape = "Regards,\nTeam SurveyApe";
}
