package com.example.surveyape.controller;

import com.example.surveyape.service.MailService;
import com.example.surveyape.service.SurveyResponseServices;
import com.example.surveyape.service.UserService;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.*;

import com.example.surveyape.util.utils;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.*;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.*;
import org.springframework.boot.test.autoconfigure.web.servlet.*;
import org.springframework.boot.test.mock.mockito.*;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import com.example.surveyape.entity.User;

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

    private User createTestUser(String email, String firstname,String lastname,String password,String phone,Boolean verified){
        User user = new User();
        user.setEmail(email);
        user.setFirstname(firstname);
        user.setLastname(lastname);
        user.setPassword(password);
        user.setVerified(verified);
        return user;
    }



    @Test
    public void userLoginSuccess() throws Exception {
        User user = this.createTestUser("test_user@gmail.com","Arijit","Mandal","1234","1234567891",true);
        Mockito.when(userService.findByEmail("test_user@gmail.com")).thenReturn(user);
        Map map = new HashMap();
        String uri = "/user/login";
        map.put("email","test_user@gmail.com");
        map.put("Arijit","Arijit");
        map.put("Mandal","Mandal");
        map.put("password","1234");
        map.put("phone","1234567891");
        String userDetail  = utils.mapToJson(map);
        System.out.println(userDetail);
        MvcResult result = mvc
                .perform(MockMvcRequestBuilders.post(uri)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON).content(userDetail))
                .andReturn();

        String resContent = result.getResponse().getContentAsString();
        int status = result.getResponse().getStatus();
        String expectedUserData = "{\"userId\":null,\"email\":\"test_user@gmail.com\",\"firstname\":\"Arijit\",\"lastname\":\"Mandal\",\"verified\":true}";
        Assert.assertEquals("User successfully loggedin status check",200,status);
        Assert.assertEquals("Logged in user data",expectedUserData,resContent);

    }
}
