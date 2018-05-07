package com.example.surveyape.controller;

import org.junit.After;
import org.junit.Before;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.awt.*;

import static org.junit.Assert.*;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = SurveyController.class)
@SpringBootTest
@FixMethodOrder(MethodSorters.NAME_ASCENDING)

public class SurveyControllerTest {
    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext wac;



    @Before
    public void setUp() throws Exception {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(wac).build();
    }


    @Test
    public void createSurvey() {
//        mockMvc.perform(MockMvcBuilders.get("\create").accept(MediaType.APPLICATION_JSON))
//                .andExpect(jsonPath("$",hasSize(4))).andDo(print());
    }

    @Test
    public void updateSurvey() {
    }

    @Test
    public void fetchSurvey() {
    }

    @Test
    public void deleteQuestion() {
    }

    @Test
    public void deleteoption() {
    }

    @Test
    public void deleteSurvey() {
    }

    @Test
    public void shareSurvey() {
    }

    @Test
    public void publishSurvey() {
    }
}