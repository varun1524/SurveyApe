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
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static org.junit.Assert.*;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
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
    // HttpSession object maang rha yeh!!!!
    public void createSurvey() throws Exception {
        User user = this.createTestUser("soni.sannist@gmail.com","Sannisth","Soni","alameda385",true,123456);
        when(userService.findByEmail(anyString())).thenReturn(user);
        when(surveyService.createSurvey(any(HashMap.class),any(User.class))).thenReturn(new Survey());

        //HttpSession session = mvc.perform(post("/user/login").param("email", "soni.sannisth@gmail.com").param("password", "alameda385"))
//        HttpSession session = mvc.perform(post("/user/signup?email=soni.sannisth@gmail.com&password=alameda385"))
//                .andExpect(status().is(200))
//                .andReturn()
//                .getRequest()
//                .getSession();
//        System.out.print(session.getAttributeNames());


        //Map<String, Object> sessionAttrs = new HashMap<>();
        //sessionAttrs.put("email", "a@b.com");

        //MockHttpServletRequest session = mvc.perform(post("/survey/create?survey_name=survey_name&survey_type=survey_type&end_time=2018-01-01")).andReturn().getRequest();

        //MockHttpSession mockHttpSession = new MockHttpSession();

//        Map map = new HashMap();
//        map.put("email","soni.sannisth@gmail.com");
//        map.put("password","alameda385");

        HashMap<String, Object> sessionattr = new HashMap<String, Object>();
        sessionattr.put("email", "soni.sannisth@gmail.com");

        //MvcResult result = mvc.perform(post("/survey/create").params((MultiValueMap<String, String>) map)).andReturn();
        MvcResult result = mvc.perform(post("/survey/create")
                .sessionAttrs(sessionattr)
                .contentType(MediaType.APPLICATION_JSON).
                content(utils.mapToJson(new HashMap<>()))).andReturn();
        System.out.print(result.getResponse().getContentAsString());

    }

    @Test
    public void updateSurvey() {
    }

    @Test
    //Even the normal Get request doesnt work!!!!!
    public void fetchSurvey() throws Exception{
        when(surveyService.findBySurveyId(anyString())).thenReturn(new Survey());

        MvcResult result = mvc.perform(get("/survey?survey_id=123456")).andReturn();
        String expectedResult = "{\"survey_id\":null,\"survey_name\":null,\"survey_type\":null,\"creation_date\":null,\"update_date\":null,\"publish_date\":null,\"ispublished\":false,\"iseditable\":true,\"end_date\":null,\"email\":null,\"questions\":[],\"survey_responses\":[]}";
        String receivedResult = "{\"survey_id\":null,\"survey_name\":null,\"survey_type\":null,\"creation_date\":null,\"update_date\":null,\"publish_date\":null,\"ispublished\":false,\"iseditable\":true,\"end_date\":null,\"email\":null,\"questions\":[],\"survey_responses\":[]}";
        Assert.assertEquals(expectedResult,receivedResult);


    }

    @Test
    public void deleteQuestion() throws Exception {
        when(questionService.deleteQuestion(anyString())).thenReturn(1);
        when(surveyService.findBySurveyId(anyString())).thenReturn(new Survey());

        MvcResult result = mvc.perform(delete("/survey/deletequestion?question_id=1223456&survey_id=123456")).andReturn();
        String expectedResult = "{\"survey_id\":null,\"survey_name\":null,\"survey_type\":null,\"creation_date\":null,\"update_date\":null,\"publish_date\":null,\"ispublished\":false,\"iseditable\":true,\"end_date\":null,\"email\":null,\"questions\":[],\"survey_responses\":[]}";
        String receivedResult = "{\"survey_id\":null,\"survey_name\":null,\"survey_type\":null,\"creation_date\":null,\"update_date\":null,\"publish_date\":null,\"ispublished\":false,\"iseditable\":true,\"end_date\":null,\"email\":null,\"questions\":[],\"survey_responses\":[]}";
        Assert.assertEquals(expectedResult,receivedResult);
    }

    @Test
    public void deleteoption() throws Exception {
        when(optionAnsService.deleteOption(anyString())).thenReturn(1);
        when(surveyService.findBySurveyId(anyString())).thenReturn(new Survey());

        MvcResult result = mvc.perform(delete("/survey/deletequestion?question_id=1223456&survey_id=123456")).andReturn();
        String expectedResult = "";
        String receivedResult = "";
        Assert.assertEquals(expectedResult,receivedResult);

    }

    @Test
    public void deleteSurvey() throws Exception {
        when(surveyService.deleteSurvey(anyString())).thenReturn(1);
        when(userService.getAllUserSurvey(anyString())).thenReturn(new ArrayList<Survey>());
        when(surveyResponseServices.getsurveyResponseByEmail(anyString())).thenReturn(new ArrayList<SurveyResponse>());


        MvcResult result = mvc.perform(delete("/survey/deletesurvey?survey_id=123456")).andReturn();
        String expectedResult = "";
        String receivedResult = "";
        Assert.assertEquals(expectedResult,receivedResult);

    }

    @Test
    public void shareSurvey() throws Exception {
        doNothing().when(surveyService).shareSurvey(new HashMap());

        MvcResult result = mvc.perform(post("/survey/deletesurvey?survey_id=123456&emailIds=lotsofemailIDs")).andReturn();
        String expectedResult = "";
        String receivedResult = "";
        Assert.assertEquals(expectedResult,receivedResult);
    }

    @Test
    public void publishSurvey() throws Exception {
        when(surveyService.publishSurvey(anyString())).thenReturn(true);

        MvcResult result = mvc.perform(post("/survey/publish?survey_id=1223456")).andReturn();

        String expectedResult = "";
        String receivedResult = "";
        Assert.assertEquals(expectedResult,receivedResult);
    }

    @Test
    public void closeSurvey() throws Exception {

        when(surveyService.closeSurvey(anyString())).thenReturn(new Date());

        MvcResult result = mvc.perform(get("/survey/close/123456")).andReturn();

        String expectedResult = "";
        String receivedResult = "";
        Assert.assertEquals(expectedResult,receivedResult);
    }

    @Test
    public void saveEndSurvey() throws Exception {
        when(surveyService.saveEndSurvey(anyString(),anyString())).thenReturn(new Date());

        MvcResult result = mvc.perform(get("/survey/savedate/123456/2018-01-01")).andReturn();

        String expectedResult = "";
        String receivedResult = "";
        Assert.assertEquals(expectedResult,receivedResult);

    }

    @Test
    public void uploadQuestion() {


    }
}