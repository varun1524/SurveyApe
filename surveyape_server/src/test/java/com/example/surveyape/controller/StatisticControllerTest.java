package com.example.surveyape.controller;

import com.example.surveyape.service.StatisticServices;
//import jdk.javadoc.internal.doclets.formats.html.markup.HtmlTag;
import org.junit.After;
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
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;

import static org.junit.Assert.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

@RunWith(SpringRunner.class)
@WebMvcTest(StatisticController.class)
public class StatisticControllerTest {

    @MockBean
    private StatisticServices statisticServices;

    @Autowired
    private MockMvc mvc;

    @Test
    public void getBasicStatsSuccess() throws Exception {
        Mockito.when(statisticServices.getBasicStats(anyString())).thenReturn(new HashMap<>());
        MvcResult result = mvc
                .perform(get("/stats/basic/123456")).andReturn();
        String expectedResult = "{}";
        String realResult =result.getResponse().getContentAsString();
        Assert.assertEquals(expectedResult,realResult);
        Assert.assertEquals(HttpStatus.OK.value(),result.getResponse().getStatus());
    }


    @Test
    public void getResponseDistribution() throws Exception {
        Mockito.when(statisticServices.responseDistributionByQuestion(anyString())).thenReturn(new HashMap());
        MvcResult result = mvc
                .perform(get("/stats/response/123456")).andReturn();
        String expectedResult = "{}";
        String realResult =result.getResponse().getContentAsString();
        Assert.assertEquals(expectedResult,realResult);
        Assert.assertEquals(HttpStatus.OK.value(),result.getResponse().getStatus());
    }
}