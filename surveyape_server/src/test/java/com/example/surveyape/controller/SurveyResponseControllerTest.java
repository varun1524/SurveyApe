package com.example.surveyape.controller;

import com.example.surveyape.entity.ResponseAnswers;
import com.example.surveyape.entity.Survey;
import com.example.surveyape.entity.SurveyResponse;
import com.example.surveyape.entity.User;
import com.example.surveyape.service.SurveyResponseServices;
import com.example.surveyape.service.SurveyService;
import com.example.surveyape.service.UserService;
import com.example.surveyape.util.utils;
import com.sun.org.apache.xpath.internal.operations.Bool;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
//import org.w3c.dom.html.HTMLTableCaptionElement;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.Assert.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@RunWith(SpringRunner.class)
@WebMvcTest(SurveyResponseController.class)
public class SurveyResponseControllerTest {
    private User user;
    private Survey survey;
    private SurveyResponse sr;
    @Autowired
    private MockMvc mvc;

    @MockBean
    private SurveyResponseServices surveyResService;

    @MockBean
    private SurveyService surveyService;


    @MockBean
    private UserService userService;
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
                                    Boolean ispublished, Boolean iseditable, String end_date, User user)
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
        survey.setUser(user);
        return survey;
    }
    public SurveyResponse createTestSurveyResponse(String responseid, Survey survey, User user, Boolean isSubmitted, String emailid){
        SurveyResponse sr = new SurveyResponse();
        sr.setResponseId(responseid);
        sr.setSurvey(survey);
        sr.setUser(user);
        sr.setResponseAnswers(new ArrayList<ResponseAnswers>());
        sr.setSubmitted(isSubmitted);
        sr.setEmail(emailid);
        return sr;
    }

    @Before
    public void setUp() throws Exception {
        user = this.createTestUser("test_user@gmail.com","Sannisth","Soni","alameda385",true,123456);

        survey=this.createTestSurvey("123456", "Survey1", "general",
                "2018-01-01", "2018-01-01", "2018-01-01",
                true, true, "2018-01-01",user);

        sr=this.createTestSurveyResponse("123456",survey,user,true,"test_surveyee@gmail.com");

    }

    @After
    public void tearDown() throws Exception {
    }

    @Test
    public void saveSurveyResponseCheckboxSuccess() throws Exception {
        when(surveyResService.getSurveyResponseById(anyString())).thenReturn(sr);
        when(surveyResService.saveCheckResponse(any(HashMap.class),any(SurveyResponse.class))).thenReturn(sr);
        when(surveyResService.saveCheckResponse(any(HashMap.class),any(SurveyResponse.class))).thenReturn(sr);
        Map map = new HashMap<>();
        map.put("response_id","123456");
        MvcResult result = mvc.perform(post("/response/save/checkbox")
        .contentType(MediaType.APPLICATION_JSON)
        .content(utils.mapToJson(map))).andReturn();
        String expectedResult = "{\"email\":\"test_surveyee@gmail.com\",\"response_id\":\"123456\",\"survey\":{\"survey_id\":\"123456\"},\"responses\":[],\"issubmitted\":true}";
        String receivedResult = result.getResponse().getContentAsString();
        Assert.assertEquals(expectedResult,receivedResult);
        Assert.assertEquals(HttpStatus.OK.value(),result.getResponse().getStatus());
        System.out.println("sas:"+expectedResult);
    }

    @Test
    public void saveSurveyResponseCheckboxUnSuccess() throws Exception {
        when(surveyResService.getSurveyResponseById(anyString())).thenReturn(new SurveyResponse());
        when(surveyResService.saveCheckResponse(any(HashMap.class),any(SurveyResponse.class))).thenReturn(new SurveyResponse());
        when(surveyResService.saveCheckResponse(any(HashMap.class),any(SurveyResponse.class))).thenReturn(null);
        Map map = new HashMap<>();
        map.put("response_id","123456");
        MvcResult result = mvc.perform(post("/response/save/checkbox")
                .contentType(MediaType.APPLICATION_JSON)
                .content(utils.mapToJson(map))).andReturn();
        String expectedResult = "";
        String receivedResult = result.getResponse().getContentAsString();
        Assert.assertEquals(expectedResult,receivedResult);
        Assert.assertEquals(HttpStatus.NOT_FOUND.value(),result.getResponse().getStatus());
    }



    @Test
    public void saveResponseAnswersSuccess() throws Exception {
        when(surveyResService.getSurveyResponseById(anyString())).thenReturn(new SurveyResponse());
        when(surveyResService.createSurveyResponse(new HashMap())).thenReturn(new SurveyResponse());
        when(userService.findByEmail(anyString())).thenReturn(new User());
        when(surveyResService.saveResponseAnswer(any(HashMap.class),any(SurveyResponse.class))).thenReturn(new SurveyResponse());
        Map map = new HashMap();
        map.put("response_id","123456");
        MvcResult result = mvc.perform(post("/response/save")
        .contentType(MediaType.APPLICATION_JSON)
        .content(utils.mapToJson(map))).andReturn();
        String expectedResult = "{\"email\":null,\"response_id\":null,\"survey\":null,\"responses\":[],\"issubmitted\":false}";
        String receivedResult = result.getResponse().getContentAsString();
        Assert.assertEquals(expectedResult,receivedResult);
        Assert.assertEquals(HttpStatus.OK.value(),result.getResponse().getStatus());
    }

    @Test
    public void saveResponseAnswersUnSuccess() throws Exception {
        when(surveyResService.getSurveyResponseById(anyString())).thenReturn(new SurveyResponse());
        when(surveyResService.createSurveyResponse(new HashMap())).thenReturn(new SurveyResponse());
        when(userService.findByEmail(anyString())).thenReturn(new User());
        when(surveyResService.saveResponseAnswer(any(HashMap.class),any(SurveyResponse.class))).thenReturn(null);
        Map map = new HashMap();
        map.put("response_id","123456");
        MvcResult result = mvc.perform(post("/response/save")
                .contentType(MediaType.APPLICATION_JSON)
                .content(utils.mapToJson(map))).andReturn();
        String expectedResult = "";
        String receivedResult = result.getResponse().getContentAsString();
        Assert.assertEquals(expectedResult,receivedResult);
        Assert.assertEquals(HttpStatus.NOT_FOUND.value(),result.getResponse().getStatus());
    }


    @Test
    public void getSurveyAndResponseByResponseIdSuccess() throws Exception {
        when(surveyResService.getSurveyResponseById(anyString())).thenReturn(new SurveyResponse());
        MvcResult result = mvc.perform(get("/response/surveyandresponse?response_id=123456")).andReturn();
        String expectedResult = "{\"email\":null,\"response_id\":null,\"survey\":null,\"responses\":[],\"issubmitted\":false}";
        String receivedResult = result.getResponse().getContentAsString();
        Assert.assertEquals(expectedResult,receivedResult);
        Assert.assertEquals(HttpStatus.OK.value(),result.getResponse().getStatus());
    }

    @Test
    public void getSurveyAndResponseByResponseIdUnSuccess() throws Exception {
        when(surveyResService.getSurveyResponseById(anyString())).thenReturn(null);
        MvcResult result = mvc.perform(get("/response/surveyandresponse?response_id=123456")).andReturn();
        String expectedResult = "";
        String receivedResult = result.getResponse().getContentAsString();
        Assert.assertEquals(expectedResult,receivedResult);
        Assert.assertEquals(HttpStatus.NOT_FOUND.value(),result.getResponse().getStatus());
    }

    @Test
    public void getSurveyResponseByResponseIdSuccess() throws Exception {
        when(surveyResService.getSurveyResponseById(anyString())).thenReturn(new SurveyResponse());
        MvcResult result = mvc.perform(get("/response?response_id=123456")).andReturn();
        String expectedResult = "{\"email\":null,\"response_id\":null,\"survey\":null,\"responses\":[],\"issubmitted\":false}";
        String receivedResult = result.getResponse().getContentAsString();
        Assert.assertEquals(expectedResult,receivedResult);
        Assert.assertEquals(HttpStatus.OK.value(),result.getResponse().getStatus());
    }

    @Test
    public void getSurveyResponseByResponseIdUnSuccess() throws Exception {
        when(surveyResService.getSurveyResponseById(anyString())).thenReturn(null);
        MvcResult result = mvc.perform(get("/response?response_id=123456")).andReturn();
        String expectedResult = "";
        String receivedResult = result.getResponse().getContentAsString();
        Assert.assertEquals(expectedResult,receivedResult);
        Assert.assertEquals(HttpStatus.NOT_FOUND.value(),result.getResponse().getStatus());
    }

    @Test
    public void submitResponseSuccess() throws Exception {
        when(surveyResService.submitResponse(any(HashMap.class))).thenReturn(true);
        Map map = new HashMap();
        MvcResult result = mvc.perform(post("/response/submit")
        .contentType(MediaType.APPLICATION_JSON)
        .content(utils.mapToJson(map))).andReturn();
        String expectedResult = "{\"message\":\"Survey response submitted succesfully !!!\"}";
        String receivedResult = result.getResponse().getContentAsString();
        Assert.assertEquals(expectedResult,receivedResult);
        Assert.assertEquals(HttpStatus.OK.value(),result.getResponse().getStatus());
    }

    @Test
    public void submitResponseUnSuccess() throws Exception {
        when(surveyResService.submitResponse(any(HashMap.class))).thenReturn(false);
        Map map = new HashMap();
        MvcResult result = mvc.perform(post("/response/submit")
                .contentType(MediaType.APPLICATION_JSON)
                .content(utils.mapToJson(map))).andReturn();
        String expectedResult = "{\"message\":\"Survey Response not provided by User. Hence cannot submit survey\"}";
        String receivedResult = result.getResponse().getContentAsString();
        Assert.assertEquals(expectedResult,receivedResult);
        Assert.assertEquals(HttpStatus.NOT_FOUND.value(),result.getResponse().getStatus());
    }
}