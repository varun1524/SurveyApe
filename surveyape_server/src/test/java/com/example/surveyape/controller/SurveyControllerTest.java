package com.example.surveyape.controller;

import com.example.surveyape.entity.*;
import com.example.surveyape.service.*;
import com.example.surveyape.util.utils;
import com.fasterxml.jackson.core.JsonProcessingException;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyString;

import com.sun.org.apache.xpath.internal.operations.Bool;
import org.assertj.core.util.DateUtil;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.util.MultiValueMap;

import javax.servlet.http.HttpSession;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import static org.junit.Assert.*;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.redirectedUrl;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(SurveyController.class)
public class SurveyControllerTest {

    private User user;
    private Survey survey;
    private Question question;
    private SurveyResponse surveyResponse;
    private ResponseAnswers responseAnswers;

    @Autowired
    private MockMvc mvc;

    @MockBean

    private OptionAnsService optionAnsService;

    @MockBean
    private UserService userService;

    @MockBean
    private SurveyService surveyService;

    @MockBean
    private MailService mailService;

    @MockBean
    private QuestionService questionService;

    @MockBean
    private SurveyResponseServices surveyResponseServices;

    private ResponseAnswers createTestResponseAnswers (String answerId, String answerValue, Question question, SurveyResponse surveyResponse){
        ResponseAnswers responseAnswers = new ResponseAnswers();
        responseAnswers.setAnswerId(answerId);
        responseAnswers.setAnswerValue(answerValue);
        responseAnswers.setQuestion(question);
        responseAnswers.setSurveyResponse(surveyResponse);

        return responseAnswers;
    }
    private SurveyResponse createTestSurveyResponse(String responseid, Boolean isSubmitted, String email){
        SurveyResponse surveyResponse = new SurveyResponse();
        surveyResponse.setResponseId(responseid);
        surveyResponse.setSubmitted(isSubmitted);
        surveyResponse.setEmail(email);
        return surveyResponse;
    }

    private Question createTestQuestion(String questionId, String questionType, String questionText, Boolean isMultipleChoice){
        Question question = new Question();
        question.setQuestionId(questionId);
        question.setQuestionType(questionType);
        question.setQuestionText(questionText);
        question.setMultipleChoice(isMultipleChoice);
        question.setOptions(new LinkedList<OptionAns>());
        question.setResponseAnswers(new LinkedList<ResponseAnswers>());
        return question;
    }

    private User createTestUser(String email, String firstname,String lastname,String password,Boolean verified, Integer verificationcode){
        User user = new User();
        user.setEmail(email);
        user.setFirstname(firstname);
        user.setLastname(lastname);
        user.setPassword(password);
        user.setVerified(verified);
        user.setVerificationCode(verificationcode);
        return user;
    }

    private Survey createTestSurvey(String survey_id, String survey_name, String survey_type,
                                    String creation_date, String update_date, String publish_date,
                                    Boolean ispublished, Boolean iseditable, String end_date,
                                    Question question, SurveyResponse surveyResponse, User user)
            throws ParseException {
        Survey survey = new Survey();
        //survey.setSurveyId();
        survey.setSurveyId(survey_id);
        survey.setSurveyName(survey_name);
        survey.setSurveyType(survey_type);
        survey.setCreationDate(new SimpleDateFormat("yyyy-MM-dd").parse(creation_date));
        survey.setUpdateDate(new SimpleDateFormat("yyyy-MM-dd").parse(update_date));
        survey.setPublishDate(new SimpleDateFormat("yyyy-MM-dd").parse(publish_date));
        survey.setSurveyEndDate(new SimpleDateFormat("yyyy-MM-dd").parse(end_date));
        survey.setPublished(ispublished);
        survey.setEditable(iseditable);
        List surveyresponselist = new ArrayList<SurveyResponse>();
        surveyresponselist.add(surveyResponse);
        survey.setSurveyResponses(surveyresponselist);
        survey.setUser(user);
        List<Question> Questionlist = new ArrayList<Question>();
        Questionlist.add(question);
        survey.setQuestions(Questionlist);
        return survey;
    }

    @Before
    public void setUp() throws ParseException {

        //OptionAns

        surveyResponse = this.createTestSurveyResponse("123456",true,"test_surveyee@gmail.com");

        user = this.createTestUser("test_user@gmail.com","Sannisth",
                "Soni","alameda385",true,123456);


        question = this.createTestQuestion("123456","MultipleChoiceQuestion",
                "How many more Apples are there than oranges?",true);


        survey=this.createTestSurvey("123456", "Survey1", "general",
                "2018-01-01", "2018-01-01", "2018-01-01",
                true, true, "2018-01-01",question,surveyResponse,user);

        responseAnswers = this.createTestResponseAnswers("123456","As many as there are berries",question,surveyResponse);
    }

    @Test
    public void createSurveySuccess() throws Exception {
        when(userService.findByEmail(anyString())).thenReturn(user);
        when(surveyService.createSurvey(any(HashMap.class),any(User.class))).thenReturn(survey);
        HashMap<String, Object> sessionattr = new HashMap<String, Object>();
        sessionattr.put("email", "soni.sannisth@gmail.com");
        MvcResult result = mvc.perform(post("/survey/create")
                .sessionAttrs(sessionattr)
                .contentType(MediaType.APPLICATION_JSON).
                content(utils.mapToJson(new HashMap<>()))).andReturn();
        String Expected = "{\"survey_id\":\"123456\",\"survey_name\":\"Survey1\",\"survey_type\":\"general\",\"creation_date\":\"2018-01-01T08:00:00.000+0000\",\"update_date\":\"2018-01-01T08:00:00.000+0000\",\"publish_date\":\"2018-01-01T08:00:00.000+0000\",\"ispublished\":true,\"iseditable\":true,\"end_date\":\"2018-01-01T08:00:00.000+0000\",\"email\":{\"email\":\"test_user@gmail.com\"},\"questions\":[{\"isMultipleChoice\":true,\"options\":[],\"question_id\":\"123456\",\"question_type\":\"MultipleChoiceQuestion\",\"question_text\":\"How many more Apples are there than oranges?\"}],\"survey_responses\":[{}]}";
        String Received = result.getResponse().getContentAsString();
        Assert.assertEquals(Expected,Received);
        Assert.assertEquals(HttpStatus.OK.value(),result.getResponse().getStatus());
        System.out.println("sas:"+Expected);
    }


    @Test
    public void createSurveyUnSuccess() throws Exception {
        when(userService.findByEmail(anyString())).thenReturn(null);
        when(surveyService.createSurvey(any(HashMap.class),any(User.class))).thenReturn(null);
        HashMap<String, Object> sessionattr = new HashMap<String, Object>();
        sessionattr.put("email", "test_user@gmail.com");
        MvcResult result = mvc.perform(post("/survey/create")
                .sessionAttrs(sessionattr)
                .contentType(MediaType.APPLICATION_JSON).
                        content(utils.mapToJson(new HashMap<>()))).andReturn();
        String Expected = "";
        String Received = result.getResponse().getContentAsString();
        Assert.assertEquals(Expected,Received);
        Assert.assertEquals(HttpStatus.BAD_REQUEST.value(),result.getResponse().getStatus());
    }

    @Test
    public void updateSurveySuccess() throws Exception {
        when(userService.findByEmail(anyString())).thenReturn(user);
        when(surveyService.updateSurvey(any(HashMap.class))).thenReturn(survey);
        HashMap<String, Object> sessionattr = new HashMap<String, Object>();
        sessionattr.put("email", "test_user@gmail.com");
        MvcResult result = mvc.perform(put("/survey/create")
                .sessionAttrs(sessionattr)
                .contentType(MediaType.APPLICATION_JSON).
                        content(utils.mapToJson(new HashMap<>()))).andReturn();
        String Expected = "{\"survey_id\":\"123456\",\"survey_name\":\"Survey1\",\"survey_type\":\"general\",\"creation_date\":\"2018-01-01T08:00:00.000+0000\",\"update_date\":\"2018-01-01T08:00:00.000+0000\",\"publish_date\":\"2018-01-01T08:00:00.000+0000\",\"ispublished\":true,\"iseditable\":true,\"end_date\":\"2018-01-01T08:00:00.000+0000\",\"email\":{\"email\":\"test_user@gmail.com\"},\"questions\":[{\"isMultipleChoice\":true,\"options\":[],\"question_id\":\"123456\",\"question_type\":\"MultipleChoiceQuestion\",\"question_text\":\"How many more Apples are there than oranges?\"}],\"survey_responses\":[{}]}";
        String Received = result.getResponse().getContentAsString();
        Assert.assertEquals(Expected,Received);
        Assert.assertEquals(HttpStatus.OK.value(),result.getResponse().getStatus());
        System.out.println("sas:"+Expected);
    }

    @Test
    public void updateSurveyUnSuccess() throws Exception {
        when(userService.findByEmail(anyString())).thenReturn(null);
        when(surveyService.updateSurvey(any(HashMap.class))).thenReturn(null);
        HashMap<String, Object> sessionattr = new HashMap<String, Object>();
        sessionattr.put("email", "soni.sannisth@gmail.com");
        MvcResult result = mvc.perform(put("/survey/create")
                .sessionAttrs(sessionattr)
                .contentType(MediaType.APPLICATION_JSON).
                        content(utils.mapToJson(new HashMap<>()))).andReturn();
        String Expected = "";
        String Received = result.getResponse().getContentAsString();
        Assert.assertEquals(Expected,Received);
        Assert.assertEquals(HttpStatus.BAD_REQUEST.value(),result.getResponse().getStatus());
    }

    @Test
    public void fetchSurveySuccess() throws Exception{
        when(surveyService.findBySurveyId(anyString())).thenReturn(survey);
        MvcResult result = mvc.perform(get("/survey?survey_id=123456")).andReturn();
        String expectedResult = "{\"survey_id\":\"123456\",\"survey_name\":\"Survey1\",\"survey_type\":\"general\",\"creation_date\":\"2018-01-01T08:00:00.000+0000\",\"update_date\":\"2018-01-01T08:00:00.000+0000\",\"publish_date\":\"2018-01-01T08:00:00.000+0000\",\"ispublished\":true,\"iseditable\":true,\"end_date\":\"2018-01-01T08:00:00.000+0000\",\"email\":{\"email\":\"test_user@gmail.com\"},\"questions\":[{\"isMultipleChoice\":true,\"options\":[],\"question_id\":\"123456\",\"question_type\":\"MultipleChoiceQuestion\",\"question_text\":\"How many more Apples are there than oranges?\"}],\"survey_responses\":[{}]}";
        String receivedResult = result.getResponse().getContentAsString();
        Assert.assertEquals(expectedResult,receivedResult);
        System.out.println(expectedResult);
    }

    @Test
    public void fetchSurveyUnSuccess() throws Exception{
        when(surveyService.findBySurveyId(anyString())).thenReturn(null);
        MvcResult result = mvc.perform(get("/survey?survey_id=123456")).andReturn();
        String expectedResult = "";
        String receivedResult = result.getResponse().getContentAsString();
        Assert.assertEquals(expectedResult,receivedResult);
        Assert.assertEquals(HttpStatus.NOT_FOUND.value(),result.getResponse().getStatus());
    }

    @Test
    public void deleteQuestionSuccess() throws Exception {
        when(questionService.deleteQuestion(anyString())).thenReturn(1);
        survey.setPublished(false);
        when(surveyService.findBySurveyId(anyString())).thenReturn(survey);
        MvcResult result = mvc.perform(delete("/survey/deletequestion?question_id=123456&survey_id=123456")).andReturn();
        String expectedResult = "{\"survey_id\":\"123456\",\"survey_name\":\"Survey1\",\"survey_type\":\"general\",\"creation_date\":\"2018-01-01T08:00:00.000+0000\",\"update_date\":\"2018-01-01T08:00:00.000+0000\",\"publish_date\":\"2018-01-01T08:00:00.000+0000\",\"ispublished\":false,\"iseditable\":true,\"end_date\":\"2018-01-01T08:00:00.000+0000\",\"email\":{\"email\":\"test_user@gmail.com\"},\"questions\":[{\"isMultipleChoice\":true,\"options\":[],\"question_id\":\"123456\",\"question_type\":\"MultipleChoiceQuestion\",\"question_text\":\"How many more Apples are there than oranges?\"}],\"survey_responses\":[{}]}";
        String receivedResult = result.getResponse().getContentAsString();
        Assert.assertEquals(expectedResult,receivedResult);
        Assert.assertEquals(HttpStatus.OK.value(),result.getResponse().getStatus());
        System.out.println("sas:"+expectedResult);
        survey.setPublished(true);
    }

    @Test
    public void deleteQuestionUnSuccess() throws Exception {
        when(questionService.deleteQuestion(anyString())).thenReturn(100);
        survey.setPublished(false);
        when(surveyService.findBySurveyId(anyString())).thenReturn(survey);
        MvcResult result = mvc.perform(delete("/survey/deletequestion?question_id=123456&survey_id=123456")).andReturn();
        String expectedResult = "";
        String receivedResult = result.getResponse().getContentAsString();
        Assert.assertEquals(expectedResult,receivedResult);
        Assert.assertEquals(HttpStatus.NOT_FOUND.value(),result.getResponse().getStatus());
        survey.setPublished(true);
    }


    @Test
    public void deleteoptionSuccess() throws Exception {
        when(optionAnsService.deleteOption(anyString())).thenReturn(1);
        survey.setPublished(false);
        when(surveyService.findBySurveyId(anyString())).thenReturn(survey);
        MvcResult result = mvc.perform(delete("/survey/deleteoption?option_id=1223456&survey_id=123456")).andReturn();
        String expectedResult = "{\"survey_id\":\"123456\",\"survey_name\":\"Survey1\",\"survey_type\":\"general\",\"creation_date\":\"2018-01-01T08:00:00.000+0000\",\"update_date\":\"2018-01-01T08:00:00.000+0000\",\"publish_date\":\"2018-01-01T08:00:00.000+0000\",\"ispublished\":false,\"iseditable\":true,\"end_date\":\"2018-01-01T08:00:00.000+0000\",\"email\":{\"email\":\"test_user@gmail.com\"},\"questions\":[{\"isMultipleChoice\":true,\"options\":[],\"question_id\":\"123456\",\"question_type\":\"MultipleChoiceQuestion\",\"question_text\":\"How many more Apples are there than oranges?\"}],\"survey_responses\":[{}]}";
        String receivedResult = result.getResponse().getContentAsString();
        Assert.assertEquals(expectedResult,receivedResult);
        Assert.assertEquals(HttpStatus.OK.value(),result.getResponse().getStatus());
        System.out.println("sas:"+expectedResult);
        survey.setPublished(true);
    }


    @Test
    public void deleteoptionUnSuccess() throws Exception {
        when(optionAnsService.deleteOption(anyString())).thenReturn(100);
        survey.setPublished(false);
        when(surveyService.findBySurveyId(anyString())).thenReturn(survey);
        MvcResult result = mvc.perform(delete("/survey/deleteoption?option_id=1223456&survey_id=123456")).andReturn();
        String expectedResult = "";
        String receivedResult = result.getResponse().getContentAsString();
        Assert.assertEquals(expectedResult,receivedResult);
        Assert.assertEquals(HttpStatus.NOT_FOUND.value(),result.getResponse().getStatus());
        survey.setPublished(true);
    }

    @Test
    public void deleteSurveyConflict() throws Exception {
        List<Survey> surveys = new ArrayList<Survey>();
        survey.setPublished(false);
        surveys.add(survey);
        when(surveyService.findBySurveyId(anyString())).thenReturn(survey);
        when(surveyService.deleteSurvey(anyString())).thenReturn(2);
        when(userService.getAllUserSurvey(anyString())).thenReturn(surveys);
        when(surveyResponseServices.getsurveyResponseByEmail(anyString())).thenReturn(new ArrayList<SurveyResponse>());
        MvcResult result = mvc.perform(delete("/survey/deletesurvey?survey_id=123456")).andReturn();
        String expectedResult = "{\"error\":\"Can not delete survey id: 123456 as it has been shared with users !!!\"}";
        String receivedResult = result.getResponse().getContentAsString();
        Assert.assertEquals(expectedResult,receivedResult);
        Assert.assertEquals(HttpStatus.CONFLICT.value(),result.getResponse().getStatus());
        survey.setPublished(true);
    }

    @Test
    //I DUNNO WHY IT KEEPS GIVING ME NULLPOINTERERROR
    public void deleteSurveyINSE() throws Exception {

        List<Survey> surveys = new ArrayList<Survey>();
        survey.setPublished(false);
        surveys.add(survey);
        when(surveyService.findBySurveyId(anyString())).thenReturn(survey);
        when(surveyService.deleteSurvey(anyString())).thenReturn(200);
        when(userService.getAllUserSurvey(anyString())).thenReturn(surveys);
        when(surveyResponseServices.getsurveyResponseByEmail(anyString())).thenReturn(new ArrayList<SurveyResponse>());
        MvcResult result = mvc.perform(delete("/survey/deletesurvey?survey_id=123456")).andReturn();
        String expectedResult = "{\"error\":\"Failed to delte survey id: 123456 due internal server error !!!\"}";
        String receivedResult = result.getResponse().getContentAsString();
        Assert.assertEquals(expectedResult,receivedResult);
        Assert.assertEquals(HttpStatus.BAD_REQUEST.value(),result.getResponse().getStatus());
        survey.setPublished(true);
    }

    @Test
    public void shareSurveySuccess() throws Exception {
        doNothing().when(surveyService).shareSurvey(new HashMap());
        Map map = new HashMap();
        map.put("survey_id","123456");
        map.put("emailIds","LotsOfEmailIDs");
        MvcResult result = mvc.perform(post("/survey/share")
                .contentType(MediaType.APPLICATION_JSON)
                .content(utils.mapToJson(map)))
                .andReturn();
        String expectedResult = "{\"message\":\"Survey shared successfully !!!\"}";
        String receivedResult = result.getResponse().getContentAsString();
        Assert.assertEquals(expectedResult,receivedResult);
        System.out.println("sas:"+expectedResult);
        Assert.assertEquals(HttpStatus.OK.value(),result.getResponse().getStatus());
    }


    @Test
    public void publishSurveySuccess() throws Exception {
        when(surveyService.publishSurvey(anyString())).thenReturn(true);
        Map map = new HashMap();
        map.put("survey_id","123456");
        MvcResult result = mvc.perform(post("/survey/publish")
        .contentType(MediaType.APPLICATION_JSON).content(utils.mapToJson(map))).andReturn();
        String expectedResult = "{\"message\":\"Survey published successfully !!!\"}";
        String receivedResult = result.getResponse().getContentAsString();
        Assert.assertEquals(expectedResult,receivedResult);
        Assert.assertEquals(HttpStatus.OK.value(),result.getResponse().getStatus());
        System.out.println("sas:"+expectedResult);
    }

    @Test
    public void publishSurveyUnSuccess() throws Exception {
        when(surveyService.publishSurvey(anyString())).thenReturn(true);
        Map map = new HashMap();
        MvcResult result = mvc.perform(post("/survey/publish")
                .contentType(MediaType.APPLICATION_JSON).content(utils.mapToJson(map))).andReturn();
        String expectedResult = "{}";
        String receivedResult = result.getResponse().getContentAsString();
        Assert.assertEquals(expectedResult,receivedResult);
        Assert.assertEquals(HttpStatus.BAD_REQUEST.value(),result.getResponse().getStatus());
    }

    @Test
    public void closeSurveySuccess() throws Exception {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ");
        sdf.setTimeZone(TimeZone.getTimeZone("GMT"));
        Date now = new Date();
        when(surveyService.closeSurvey(anyString())).thenReturn(now);
        MvcResult result = mvc.perform(get("/survey/close/123456")).andReturn();
        String expected = "{\"end_date\":\""+sdf.format(now)+"\"}";
        String received = result.getResponse().getContentAsString();
        Assert.assertEquals(expected,received);
        System.out.println("sas:"+expected);
        Assert.assertEquals(HttpStatus.OK.value(),result.getResponse().getStatus());
    }


    @Test
    public void closeSurveyUnSuccess() throws Exception {
        when(surveyService.closeSurvey(anyString())).thenReturn(null);
        MvcResult result = mvc.perform(get("/survey/close/123456")).andReturn();
        Assert.assertEquals(HttpStatus.NOT_FOUND.value(),result.getResponse().getStatus());
    }

    @Test
    public void saveEndSurveySuccess() throws Exception {
        when(surveyService.saveEndSurvey(anyString(),anyString())).thenReturn(new Date());
        MvcResult result = mvc.perform(get("/survey/savedate/123456/2018-01-01")).andReturn();
        Assert.assertEquals(HttpStatus.OK.value(),result.getResponse().getStatus());
        System.out.println("sas:"+result.getResponse().getContentAsString());
    }

    @Test
    public void saveEndSurveyUnSuccess() throws Exception {
        when(surveyService.saveEndSurvey(anyString(),anyString())).thenReturn(null);
        MvcResult result = mvc.perform(get("/survey/savedate/123456/2018-01-01")).andReturn();
        Assert.assertEquals(HttpStatus.BAD_REQUEST.value(),result.getResponse().getStatus());
    }

    @Test
    public void uploadQuestionSuccess() throws Exception {
        when(surveyService.findBySurveyId(anyString())).thenReturn(survey);
        when(surveyService.uploadQuestion(any(HashMap.class))).thenReturn(survey);
        MvcResult result = mvc.perform(post("/survey/upload")
        .contentType(MediaType.APPLICATION_JSON)
                .content(utils.mapToJson(new HashMap<>())))
                .andReturn();
        String received = result.getResponse().getContentAsString();
        String expected = "{\"survey_id\":\"123456\",\"survey_name\":\"Survey1\",\"survey_type\":\"general\",\"creation_date\":\"2018-01-01T08:00:00.000+0000\",\"update_date\":\"2018-01-01T08:00:00.000+0000\",\"publish_date\":\"2018-01-01T08:00:00.000+0000\",\"ispublished\":true,\"iseditable\":true,\"end_date\":\"2018-01-01T08:00:00.000+0000\",\"email\":{\"email\":\"test_user@gmail.com\"},\"questions\":[{\"isMultipleChoice\":true,\"options\":[],\"question_id\":\"123456\",\"question_type\":\"MultipleChoiceQuestion\",\"question_text\":\"How many more Apples are there than oranges?\"}],\"survey_responses\":[{}]}";
        Assert.assertEquals(expected,received);
        Assert.assertEquals(HttpStatus.OK.value(),result.getResponse().getStatus());
        System.out.println("sas:"+received);
    }

    @Test
    public void uploadQuestionUnSuccess() throws Exception {
        when(surveyService.findBySurveyId(anyString())).thenReturn(survey);
        when(surveyService.uploadQuestion(any(HashMap.class))).thenReturn(null);
        MvcResult result = mvc.perform(post("/survey/upload")
                .contentType(MediaType.APPLICATION_JSON)
                .content(utils.mapToJson(new HashMap<>())))
                .andReturn();
        String received = result.getResponse().getContentAsString();
        String expected = "";
        Assert.assertEquals(expected,received);
        Assert.assertEquals(HttpStatus.BAD_REQUEST.value(),result.getResponse().getStatus());
    }
}