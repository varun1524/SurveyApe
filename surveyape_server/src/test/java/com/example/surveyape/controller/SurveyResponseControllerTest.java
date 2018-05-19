package com.example.surveyape.controller;

import com.example.surveyape.entity.SurveyResponse;
import com.example.surveyape.entity.User;
import com.example.surveyape.service.SurveyResponseServices;
import com.example.surveyape.service.UserService;
import com.example.surveyape.util.utils;
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

import java.util.HashMap;
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
    public void saveSurveyResponseCheckboxSuccess() throws Exception {
        when(surveyResService.getSurveyResponseById(anyString())).thenReturn(new SurveyResponse());
        when(surveyResService.saveCheckResponse(any(HashMap.class),any(SurveyResponse.class))).thenReturn(new SurveyResponse());
        when(surveyResService.saveCheckResponse(any(HashMap.class),any(SurveyResponse.class))).thenReturn(new SurveyResponse());
        Map map = new HashMap<>();
        map.put("response_id","123456");
        MvcResult result = mvc.perform(post("/response/save/checkbox")
        .contentType(MediaType.APPLICATION_JSON)
        .content(utils.mapToJson(map))).andReturn();
        String expectedResult = "{\"email\":null,\"response_id\":null,\"survey\":null,\"responses\":[],\"issubmitted\":false}";
        String receivedResult = result.getResponse().getContentAsString();
        Assert.assertEquals(expectedResult,receivedResult);
        Assert.assertEquals(HttpStatus.OK.value(),result.getResponse().getStatus());
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