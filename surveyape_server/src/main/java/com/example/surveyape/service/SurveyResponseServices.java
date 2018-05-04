package com.example.surveyape.service;

import java.util.*;


import com.example.surveyape.entity.*;
import com.example.surveyape.utils.MailUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.surveyape.repository.QuestionRepository;
import com.example.surveyape.repository.ResponseAnswerRepository;
import com.example.surveyape.repository.SurveyRepository;
import com.example.surveyape.repository.SurveyResponseRepository;
import com.example.surveyape.repository.UserRepository;

@Service
public class SurveyResponseServices {
    @Autowired
    UserRepository userRepo;
    @Autowired
    SurveyResponseRepository surveyResRepo;
    @Autowired
    SurveyRepository surveyRepo;
    @Autowired
    QuestionRepository questionRepo;
    @Autowired
    ResponseAnswerRepository resAnsRepo;
    @Autowired
    MailService mailService;

    public SurveyResponse saveCheckResponse(Map map, SurveyResponse surveyResponse){
        Map responseAnswerMap = (Map)map.get("response_answer");
        ResponseAnswers resAns = resAnsRepo.findByAnswerId(responseAnswerMap.get("answer_id").toString().trim());
        if(resAns == null){
            System.out.println("resAns is null");
            resAns = new ResponseAnswers();
            resAns.setAnswerId(responseAnswerMap.get("answer_id").toString().trim());
        }
        System.out.println("Response Answer: "+ resAns.getAnswerId());
        Boolean checkStatus = Boolean.parseBoolean(map.get("check").toString().trim());
        Map questionMap = (Map)responseAnswerMap.get("question");
        Question question = questionRepo.findByQuestionId(questionMap.get("question_id").toString().trim());
        if(checkStatus){
            resAns.setSurveyResponse(surveyResponse);
            resAns.setAnswerValue(responseAnswerMap.get("answer_value").toString().trim());
            resAns.setQuestion(question);
            List<ResponseAnswers> responseAnswers = surveyResponse.getResponseAnswers();
            responseAnswers.add(resAns);
            surveyResponse.setResponseAnswers(responseAnswers);
            surveyResRepo.save(surveyResponse);
        }else{
            System.out.println("Before Answer ID: "+resAns.getAnswerId());
            int result = resAnsRepo.deleteByAnswerId(resAns.getAnswerId());
            System.out.println("After Answer ID: "+resAns.getAnswerId() + " :   "+ result);
        }
        SurveyResponse surveyResponse1 = surveyResRepo.findByResponseId(surveyResponse.getResponseId());
        if(surveyResponse1.getResponseAnswers().size()>0){
            Survey survey = surveyResponse1.getSurvey();
            if(survey.getEditable()){
                survey.setEditable(false);
                surveyRepo.save(survey);
            }
        }
        System.out.println("Before sending response to react: "+ surveyResponse1.getResponseAnswers().size());
        return surveyResponse1;
    }

    public SurveyResponse getSurveyResponseById(String surveyResId){
        return surveyResRepo.findByResponseId(surveyResId);
    }

    public SurveyResponse saveResponseAnswer(Map map, SurveyResponse surveyResponse){
        Map responseAnswerMap = (Map)map.get("response_answer");
        ResponseAnswers resAns = resAnsRepo.findByAnswerId(responseAnswerMap.get("answer_id").toString().trim());
        Map questionMap = (Map)responseAnswerMap.get("question");
        if(resAns == null){
            System.out.println("resAns is null");
            resAns = new ResponseAnswers();
            resAns.setAnswerId(responseAnswerMap.get("answer_id").toString().trim());
            resAns.setSurveyResponse(surveyResponse);
            Question question = questionRepo.findByQuestionId(questionMap.get("question_id").toString().trim());
            resAns.setQuestion(question);
        }
        System.out.println("Response Answer: "+ resAns.getAnswerId());
        resAns.setAnswerValue(responseAnswerMap.get("answer_value").toString().trim());
        List<ResponseAnswers> responseAnswers = surveyResponse.getResponseAnswers();
        responseAnswers.add(resAns);
        surveyResponse.setResponseAnswers(responseAnswers);
        surveyResRepo.save(surveyResponse);
        SurveyResponse surveyResponse1 = surveyResRepo.findByResponseId(surveyResponse.getResponseId());
        System.out.println("Before sending response to react: "+ surveyResponse1.getResponseAnswers().size());
        return surveyResponse1;
    }

    public SurveyResponse createSurveyResponse(Map map){
        String survey_Id = map.get("survey_id").toString();
        SurveyResponse surveyResponse = new SurveyResponse();
        Survey survey = surveyRepo.findBySurveyId(survey_Id);
        if(survey!=null){
            if(map.get("email")!=null){
                String email = map.get("email").toString();
                surveyResponse.setEmail(email);
                User user = userRepo.findByEmail(email);
                if(user!=null){
                    surveyResponse.setUser(user);
                }
            }
            surveyResponse.setResponseId(map.get("response_id").toString().trim());
            surveyResponse.setSurvey(survey);
            return surveyResRepo.save(surveyResponse);
        }
        return null;
    }

    public Boolean submitResponse(Map map){

        if(map.get("response_id")!=null ){
            String responseId = map.get("response_id").toString().trim();
                SurveyResponse surveyResponse = surveyResRepo.findByResponseId(responseId);
                if(surveyResponse!=null){
                    surveyResponse.setSubmitted(true);
                }
                if(map.get("sendcopy")!=null && Boolean.parseBoolean(map.get("sendcopy").toString().toLowerCase())){
                    String email = map.get("email")!=null?map.get("email").toString():surveyResponse.getEmail();
                    if(email!=null){
                        String msgBody = MailUtility.surveyResponseBody;
                        String  msgSub = MailUtility.surveyResponseMsg;
                        surveyResponse.setEmail(email);
                        mailService.sendEmail(email,msgBody,msgSub);
                    }
                }
                surveyResRepo.save(surveyResponse);
                return true;

        }
        return false;
    }
}
