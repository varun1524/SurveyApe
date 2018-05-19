package com.example.surveyape.controller;

import com.example.surveyape.entity.SurveyResponse;
import com.example.surveyape.entity.User;
import com.example.surveyape.service.SurveyResponseServices;
import com.example.surveyape.service.UserService;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.HashMap;

import static org.junit.Assert.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@RunWith(SpringRunner.class)
@WebMvcTest(SurveyResponseController.class)
public class SurveyResponseControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private SurveyResponseServices surveyResService;


    @MockBean
    private UserService userService;

    @Before
    public void setUp() throws Exception {
    }

    @After
    public void tearDown() throws Exception {
    }

    @Test
    public void saveSurveyResponseCheckbox() throws Exception {
        when(surveyResService.getSurveyResponseById(anyString())).thenReturn(new SurveyResponse());
        when(surveyResService.saveCheckResponse(any(HashMap.class),any(SurveyResponse.class))).thenReturn(new SurveyResponse());

        MvcResult result = mvc.perform(post("/response/save/checkbox?response_id=123456")).andReturn();

        String expectedResult = "";
        String receivedResult = "";
        Assert.assertEquals(expectedResult,receivedResult);
    }

    @Test
    public void saveResponseAnswers() throws Exception {
        when(surveyResService.getSurveyResponseById(anyString())).thenReturn(new SurveyResponse());
        when(surveyResService.createSurveyResponse(new HashMap())).thenReturn(new SurveyResponse());
        when(userService.findByEmail(anyString())).thenReturn(new User());
        when( surveyResService.saveResponseAnswer(any(HashMap.class),any(SurveyResponse.class))).thenReturn(new SurveyResponse());

        MvcResult result = mvc.perform(post("/response/check?response_id=123456")).andReturn();

        String expectedResult = "";
        String receivedResult = "";
        Assert.assertEquals(expectedResult,receivedResult);


    }

    @Test
    public void getSurveyAndResponseByResponseId() throws Exception {
        when(surveyResService.getSurveyResponseById(anyString())).thenReturn(new SurveyResponse());

        MvcResult result = mvc.perform(post("/response/surveyandresponse?response_id=123456")).andReturn();

        String expectedResult = "";
        String receivedResult = "";
        Assert.assertEquals(expectedResult,receivedResult);

    }

    @Test
    public void getSurveyResponseByResponseId() throws Exception {
        when(surveyResService.getSurveyResponseById(anyString())).thenReturn(new SurveyResponse());

        MvcResult result = mvc.perform(get("/response?response_id=123456")).andReturn();

        String expectedResult = "";
        String receivedResult = "";
        Assert.assertEquals(expectedResult,receivedResult);
    }

    @Test
    public void submitResponse() throws Exception {
        when(surveyResService.submitResponse(any(HashMap.class))).thenReturn(true);

        MvcResult result = mvc.perform(get("/response/submit?a=a&b=b&c=c")).andReturn();

        String expectedResult = "";
        String receivedResult = "";
        Assert.assertEquals(expectedResult,receivedResult);

    }
}