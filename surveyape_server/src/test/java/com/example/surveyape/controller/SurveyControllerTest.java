package com.example.surveyape.controller;

import com.example.surveyape.entity.Survey;
import com.example.surveyape.entity.SurveyResponse;
import com.example.surveyape.entity.User;
import com.example.surveyape.service.*;
import com.example.surveyape.util.utils;
import com.fasterxml.jackson.core.JsonProcessingException;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyString;

import org.assertj.core.util.DateUtil;
import org.junit.Assert;
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

    private Survey createTestSurvey(String survey_name, String survey_type, String end_date, User user) throws ParseException {
        Survey survey = new Survey();
        //survey.setSurveyId();
        survey.setSurveyName(survey_name);
        survey.setSurveyType(survey_type);
        survey.setSurveyEndDate(new SimpleDateFormat("yyyy-MM-dd").parse(end_date));
        survey.setUser(user);
        return survey;
    }




    @Test
    public void createSurveySuccess() throws Exception {
        User user = this.createTestUser("soni.sannist@gmail.com","Sannisth","Soni","alameda385",true,123456);
        when(userService.findByEmail(anyString())).thenReturn(user);
        when(surveyService.createSurvey(any(HashMap.class),any(User.class))).thenReturn(new Survey());
        HashMap<String, Object> sessionattr = new HashMap<String, Object>();
        sessionattr.put("email", "soni.sannisth@gmail.com");
        MvcResult result = mvc.perform(post("/survey/create")
                .sessionAttrs(sessionattr)
                .contentType(MediaType.APPLICATION_JSON).
                content(utils.mapToJson(new HashMap<>()))).andReturn();
        String Expected = "{\"survey_id\":null,\"survey_name\":null,\"survey_type\":null,\"creation_date\":null,\"update_date\":null,\"publish_date\":null,\"ispublished\":false,\"iseditable\":true,\"end_date\":null,\"email\":null,\"questions\":[],\"survey_responses\":[]}";
        String Received = result.getResponse().getContentAsString();
        Assert.assertEquals(Expected,Received);
        Assert.assertEquals(HttpStatus.OK.value(),result.getResponse().getStatus());
    }

    @Test
    public void createSurveyUnSuccess() throws Exception {
        User user = this.createTestUser("soni.sannist@gmail.com","Sannisth","Soni","alameda385",true,123456);
        when(userService.findByEmail(anyString())).thenReturn(null);
        when(surveyService.createSurvey(any(HashMap.class),any(User.class))).thenReturn(new Survey());
        HashMap<String, Object> sessionattr = new HashMap<String, Object>();
        sessionattr.put("email", "soni.sannisth@gmail.com");
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
        User user = this.createTestUser("soni.sannist@gmail.com","Sannisth","Soni","alameda385",true,123456);
        when(userService.findByEmail(anyString())).thenReturn(null);
        when(surveyService.updateSurvey(any(HashMap.class))).thenReturn(new Survey());
        HashMap<String, Object> sessionattr = new HashMap<String, Object>();
        sessionattr.put("email", "soni.sannisth@gmail.com");
        MvcResult result = mvc.perform(put("/survey/create")
                .sessionAttrs(sessionattr)
                .contentType(MediaType.APPLICATION_JSON).
                        content(utils.mapToJson(new HashMap<>()))).andReturn();
        String Expected = "{\"survey_id\":null,\"survey_name\":null,\"survey_type\":null,\"creation_date\":null,\"update_date\":null,\"publish_date\":null,\"ispublished\":false,\"iseditable\":true,\"end_date\":null,\"email\":null,\"questions\":[],\"survey_responses\":[]}";
        String Received = result.getResponse().getContentAsString();
        Assert.assertEquals(Expected,Received);
        Assert.assertEquals(HttpStatus.OK.value(),result.getResponse().getStatus());
    }

    @Test
    public void updateSurveyUnSuccess() throws Exception {
        User user = this.createTestUser("soni.sannist@gmail.com","Sannisth","Soni","alameda385",true,123456);
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
        when(surveyService.findBySurveyId(anyString())).thenReturn(new Survey());
        MvcResult result = mvc.perform(get("/survey?survey_id=123456")).andReturn();
        String expectedResult = "{\"survey_id\":null,\"survey_name\":null,\"survey_type\":null,\"creation_date\":null,\"update_date\":null,\"publish_date\":null,\"ispublished\":false,\"iseditable\":true,\"end_date\":null,\"email\":null,\"questions\":[],\"survey_responses\":[]}";
        String receivedResult = result.getResponse().getContentAsString();
        Assert.assertEquals(expectedResult,receivedResult);
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
        when(surveyService.findBySurveyId(anyString())).thenReturn(new Survey());
        MvcResult result = mvc.perform(delete("/survey/deletequestion?question_id=1223456&survey_id=123456")).andReturn();
        String expectedResult = "{\"survey_id\":null,\"survey_name\":null,\"survey_type\":null,\"creation_date\":null,\"update_date\":null,\"publish_date\":null,\"ispublished\":false,\"iseditable\":true,\"end_date\":null,\"email\":null,\"questions\":[],\"survey_responses\":[]}";
        String receivedResult = result.getResponse().getContentAsString();
        Assert.assertEquals(expectedResult,receivedResult);
        Assert.assertEquals(HttpStatus.OK.value(),result.getResponse().getStatus());
    }

    @Test
    public void deleteQuestionUnSuccess() throws Exception {
        when(questionService.deleteQuestion(anyString())).thenReturn(100);
        when(surveyService.findBySurveyId(anyString())).thenReturn(new Survey());
        MvcResult result = mvc.perform(delete("/survey/deletequestion?question_id=1223456&survey_id=123456")).andReturn();
        String expectedResult = "";
        String receivedResult = result.getResponse().getContentAsString();
        Assert.assertEquals(expectedResult,receivedResult);
        Assert.assertEquals(HttpStatus.NOT_FOUND.value(),result.getResponse().getStatus());
    }

    @Test
    public void deleteoptionSuccess() throws Exception {
        when(optionAnsService.deleteOption(anyString())).thenReturn(1);
        when(surveyService.findBySurveyId(anyString())).thenReturn(new Survey());
        MvcResult result = mvc.perform(delete("/survey/deleteoption?option_id=1223456&survey_id=123456")).andReturn();
        String expectedResult = "{\"survey_id\":null,\"survey_name\":null,\"survey_type\":null,\"creation_date\":null,\"update_date\":null,\"publish_date\":null,\"ispublished\":false,\"iseditable\":true,\"end_date\":null,\"email\":null,\"questions\":[],\"survey_responses\":[]}";
        String receivedResult = result.getResponse().getContentAsString();
        Assert.assertEquals(expectedResult,receivedResult);
        Assert.assertEquals(HttpStatus.OK.value(),result.getResponse().getStatus());
    }

    @Test
    public void deleteoptionUnSuccess() throws Exception {
        when(optionAnsService.deleteOption(anyString())).thenReturn(100);
        when(surveyService.findBySurveyId(anyString())).thenReturn(new Survey());
        MvcResult result = mvc.perform(delete("/survey/deleteoption?option_id=1223456&survey_id=123456")).andReturn();
        String expectedResult = "";
        String receivedResult = result.getResponse().getContentAsString();
        Assert.assertEquals(expectedResult,receivedResult);
        Assert.assertEquals(HttpStatus.NOT_FOUND.value(),result.getResponse().getStatus());

    }

    @Test
    //I DUNNO WHY IT KEEPS GIVING ME NULLPOINTERERROR
    public void deleteSurveyConflict() throws Exception {
        User user = this.createTestUser("soni.sannist@gmail.com","Sannisth","Soni","alameda385",true,123456);
        Survey survey = this.createTestSurvey("sannisth","closed","2018-01-01",user);
        List<Survey> surveys = new ArrayList<Survey>();
        surveys.add(survey);
        when(surveyService.deleteSurvey(anyString())).thenReturn(2);
        when(userService.getAllUserSurvey(anyString())).thenReturn(surveys);
        when(surveyResponseServices.getsurveyResponseByEmail(anyString())).thenReturn(new ArrayList<SurveyResponse>());
        MvcResult result = mvc.perform(delete("/survey/deletesurvey?survey_id=123456")).andReturn();
        String expectedResult = "{}";
        String receivedResult = result.getResponse().getContentAsString();
        Assert.assertEquals(expectedResult,receivedResult);
        Assert.assertEquals(HttpStatus.CONFLICT.value(),result.getResponse().getStatus());
    }

    @Test
    //I DUNNO WHY IT KEEPS GIVING ME NULLPOINTERERROR
    public void deleteSurveyINSE() throws Exception {
        User user = this.createTestUser("soni.sannist@gmail.com","Sannisth","Soni","alameda385",true,123456);
        Survey survey = this.createTestSurvey("sannisth","closed","2018-01-01",user);
        List<Survey> surveys = new ArrayList<Survey>();
        surveys.add(survey);
        when(surveyService.deleteSurvey(anyString())).thenReturn(200);
        when(userService.getAllUserSurvey(anyString())).thenReturn(surveys);
        when(surveyResponseServices.getsurveyResponseByEmail(anyString())).thenReturn(new ArrayList<SurveyResponse>());
        MvcResult result = mvc.perform(delete("/survey/deletesurvey?survey_id=123456")).andReturn();
        String expectedResult = "{\"error\":\"Failed to delte survey id: 123456 due internal server error !!!\"}";
        String receivedResult = result.getResponse().getContentAsString();
        Assert.assertEquals(expectedResult,receivedResult);
        Assert.assertEquals(HttpStatus.INTERNAL_SERVER_ERROR.value(),result.getResponse().getStatus());
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
    }

    @Test
    public void saveEndSurveyUnSuccess() throws Exception {
        when(surveyService.saveEndSurvey(anyString(),anyString())).thenReturn(null);
        MvcResult result = mvc.perform(get("/survey/savedate/123456/2018-01-01")).andReturn();
        Assert.assertEquals(HttpStatus.BAD_REQUEST.value(),result.getResponse().getStatus());
    }

    @Test
    public void uploadQuestionSuccess() throws Exception {
        when(surveyService.findBySurveyId(anyString())).thenReturn(new Survey());
        when(surveyService.uploadQuestion(any(HashMap.class))).thenReturn(new Survey());
        MvcResult result = mvc.perform(post("/survey/upload")
        .contentType(MediaType.APPLICATION_JSON)
                .content(utils.mapToJson(new HashMap<>())))
                .andReturn();
        String received = result.getResponse().getContentAsString();
        String expected = "";
        Assert.assertEquals(expected,received);
        Assert.assertEquals(HttpStatus.OK.value(),result.getResponse().getStatus());
    }

    @Test
    public void uploadQuestionUnSuccess() throws Exception {
        when(surveyService.findBySurveyId(anyString())).thenReturn(new Survey());
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