package com.example.surveyape.controller;

import com.example.surveyape.entity.Survey;
import com.example.surveyape.entity.SurveyResponse;
import com.example.surveyape.repository.UserRepository;
import com.example.surveyape.service.MailService;
import com.example.surveyape.service.SurveyResponseServices;
import com.example.surveyape.service.UserService;
import static org.junit.Assert.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.*;

import com.example.surveyape.util.utils;
import com.example.surveyape.utils.MailUtility;
import com.example.surveyape.utils.UserUtility;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.*;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.*;
import org.springframework.boot.test.autoconfigure.web.servlet.*;
import org.springframework.boot.test.mock.mockito.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import com.example.surveyape.entity.User;

import javax.servlet.http.HttpSession;

@RunWith(SpringRunner.class)
@WebMvcTest(UserController.class)
public class UserControllerTest {
    @Autowired
    private MockMvc mvc;

    @MockBean
    private UserService userService;
    @MockBean
    private MailService mailService;
    @MockBean
    private SurveyResponseServices surveyResService;
    @MockBean
    private UserRepository userRepository;

    private User user;

    private User createTestUser(String userid, String email, String firstname,String lastname,String password,Boolean verified, Integer verificationcode){
        User user = new User();
        user.setUserId(userid);
        user.setEmail(email);
        user.setFirstname(firstname);
        user.setLastname(lastname);
        user.setPassword(password);
        user.setVerified(verified);
        user.setVerificationCode(verificationcode);
        return user;
    }

    @Before
    public void setUp(){
        user = this.createTestUser("123456","test_user@gmail.com","Sannisth",
                "Soni","alameda385",true,123456);
    }

    @Test
    public void userSignUpSuccess() throws Exception {
        Mockito.when(userService.registerUser(any(User.class))).thenReturn(user);
        String uri = "/user/signup";
        Map map = new HashMap();
        map.put("email","test_user@gmail.com");
        map.put("firstname","Sannisth");
        map.put("lastname","Soni");
        map.put("password","alameda385");
        map.put("verified","true");
        map.put("verificationcode","123456");
        String userDetail  = utils.mapToJson(map);
        mvc.perform(post(uri).contentType(MediaType.APPLICATION_JSON).content(userDetail)).andExpect(status().isOk());
        MvcResult result = mvc
                .perform(post(uri)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON).content(userDetail))
                .andReturn();
        String expectedUserData = "{\"userId\":\"123456\",\"email\":\"test_user@gmail.com\",\"firstname\":\"Sannisth\",\"lastname\":\"Soni\",\"verified\":true}";
        String resContent = result.getResponse().getContentAsString();
        int status = result.getResponse().getStatus();
        System.out.println(expectedUserData);
        Assert.assertEquals("User successfully loggedin status check",200,status);
        Assert.assertEquals("Logged in user data",expectedUserData,resContent);
    }
//
//    @Test
//    public void userSignUpUnSuccess() throws Exception {
//        Mockito.when(userService.registerUser(any(User.class))).thenReturn(null);
//        String uri = "/user/signup";
//        Map map = new HashMap();
//        map.put("email","test_user@gmail.com");
//        map.put("firstname","Arijit");
//        map.put("lastname","Mandal");
//        map.put("password","1234");
//        map.put("verified","true");
//        map.put("verificationcode","123456");
//        String userDetail  = utils.mapToJson(map);
//        MvcResult result = mvc
//                .perform(post(uri)
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .accept(MediaType.APPLICATION_JSON).content(userDetail))
//                .andReturn();
//
//        //String expectedUserData = "{\"userId\":null,\"email\":\"test_user@gmail.com\",\"firstname\":\"Arijit\",\"lastname\":\"Mandal\",\"verified\":true}";
//        String resContent = result.getResponse().getContentAsString();
//        System.out.print("sas"+result.getResponse().getStatus());
//        //int status = result.getResponse().getStatus();
//        //Assert.assertEquals("User successfully loggedin status check",HttpStatus.NOT_FOUND.value(),status);
//        //Assert.assertEquals("Logged in user data",expectedUserData,resContent);
//    }

    @Test
    public void userLoginSuccess() throws Exception {
        Mockito.when(userService.findByEmail("test_user@gmail.com")).thenReturn(user);
        Map map = new HashMap();
        String uri = "/user/login";
        map.put("userid","123456");
        map.put("email","test_user@gmail.com");
        map.put("firstname","Sannisth");
        map.put("lastname","Soni");
        map.put("password","alameda385");
        map.put("verified","true");
        map.put("verificationcode","123456");
        String userDetail  = utils.mapToJson(map);
        System.out.println(userDetail);
        MvcResult result = mvc
                .perform(post(uri)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON).content(userDetail))
                .andReturn();
        String resContent = result.getResponse().getContentAsString();
        int status = result.getResponse().getStatus();
        System.out.println("sas:"+resContent);
        String expectedUserData = "{\"userId\":\"123456\",\"email\":\"test_user@gmail.com\",\"firstname\":\"Sannisth\",\"lastname\":\"Soni\",\"verified\":true}";
        Assert.assertEquals("User successfully loggedin status check",200,status);
        Assert.assertEquals("Logged in user data",expectedUserData,resContent);
    }

    @Test
    public void userLoginUnSuccess() throws Exception {
        Mockito.when(userService.findByEmail("test_user@gmail.com")).thenReturn(null);
        Map map = new HashMap();
        String uri = "/user/login";
        map.put("userid","123456");
        map.put("email","test_user@gmail.com");
        map.put("firstname","Sannisth");
        map.put("lastname","Soni");
        map.put("password","alameda385");
        map.put("verified","true");
        map.put("verificationcode","123456");
        String userDetail  = utils.mapToJson(map);
        System.out.println(userDetail);
        MvcResult result = mvc
                .perform(post(uri)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON).content(userDetail))
                .andReturn();
        String resContent = result.getResponse().getContentAsString();
        int status = result.getResponse().getStatus();
        Assert.assertEquals("User successfully loggedin status check",404,status);
    }

    @Test
    public void verifyAccount_successfullyVerified() throws Exception {

        when(userRepository.findByVerificationcode(anyInt())).thenReturn(user);
        when(userService.verifyUserAccount(anyInt())).thenReturn(1);
        Map map = new HashMap();
        map.put("verificationcode","123456");
        MvcResult result = mvc
                .perform(get("/user/verifyaccount?verificationcode=123456")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andReturn();
        String expectedOutput = "{\"message\":\"User successfully verified.\"}";
        String resContent = result.getResponse().getContentAsString();
        Assert.assertEquals(expectedOutput,resContent);
        System.out.println("sas:"+result.getResponse().getContentAsString());
    }

    @Test
    public void verifyAccount_notFound() throws Exception {

        when(userRepository.findByVerificationcode(anyInt())).thenReturn(user);
        when(userService.verifyUserAccount(anyInt())).thenReturn(4);
        Map map = new HashMap();
        map.put("verificationcode","123456");
        MvcResult result = mvc
                .perform(get("/user/verifyaccount?verificationcode=123456")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andReturn();
        String expectedOutput = "{\"message\":\"Not a valid code !!!\"}";
        String resContent = result.getResponse().getContentAsString();
        Assert.assertEquals(expectedOutput,resContent);
    }

    @Test
    public void surveyList() throws Exception{

        when(userService.getAllUserSurvey("test_user@gmail.com")).thenReturn(null);
        when(surveyResService.getsurveyResponseByEmail("test_user@gmail.com")).thenReturn(null);
        MvcResult result = mvc
                .perform(get("/user/surveylist")).andReturn();
        String expectedResult = "{}";
        String realResult =result.getResponse().getContentAsString();
        Assert.assertEquals(expectedResult,realResult);
        System.out.println(result.getResponse().getStatus());
    }


    @Test
    public void logout_success() throws Exception{
        MvcResult result = mvc
                .perform(post("/user/logout").sessionAttr("email","test_user@gmail.com")).andReturn();
        Assert.assertEquals(HttpStatus.OK.value(),result.getResponse().getStatus());
    }

    @Test
    public void validateSessionSuccess() throws Exception{

        when(userService.findByEmail(anyString())).thenReturn(user);
        MvcResult result = mvc
                .perform(post("/user/validateSession").sessionAttr("email","test_used@gmail.com")).andReturn();
        int status = result.getResponse().getStatus();
        String expected = "{\"userId\":\"123456\",\"email\":\"test_user@gmail.com\",\"firstname\":\"Sannisth\",\"lastname\":\"Soni\",\"verified\":true}";
        String received = result.getResponse().getContentAsString();
        Assert.assertEquals(HttpStatus.OK.value(),status);
        Assert.assertEquals(expected,received);
        System.out.println(received);
    }

    @Test
    public void validateSessionUnSuccess() throws Exception{

        when(userService.findByEmail(anyString())).thenReturn(user);
        MvcResult result = mvc
                .perform(post("/user/validateSession")).andReturn();
        int status = result.getResponse().getStatus();
        Assert.assertEquals(HttpStatus.NOT_FOUND.value(),status);
    }

}
