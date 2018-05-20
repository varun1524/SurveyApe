package com.example.surveyape.controller;


import com.example.surveyape.service.StatisticServices;
import com.example.surveyape.utils.ErrorMessage;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.surveyape.view.*;
import javax.servlet.http.HttpSession;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*", allowCredentials = "true")
@RequestMapping(path = "/stats")
public class StatisticController {

    @Autowired
    StatisticServices statisticServices;

    @JsonView({BasicStatsView.summary.class})
    @RequestMapping(value = "/basic/{surveyId}", method = RequestMethod.GET)
    public ResponseEntity getBasicStats(@PathVariable String surveyId, HttpSession session){
        HttpStatus status = HttpStatus.BAD_REQUEST;
        Map map = null;
        try{
            map = statisticServices.getBasicStats(surveyId);
            status = HttpStatus.OK;
        }
        catch(Exception exp){
            if(exp.getMessage().equals(ErrorMessage.NOT_ENOUGH_RESPONSE)){
                status = HttpStatus.METHOD_NOT_ALLOWED;
            }
            else {
                exp.printStackTrace();
            }
        }
        return new ResponseEntity(map,status);
    }


    @JsonView({ResDistributionStatsView.summary.class})
    @RequestMapping(value = "/response/{questionId}", method = RequestMethod.GET)
    public ResponseEntity getResponseDistribution(@PathVariable String questionId,HttpSession session){
        HttpStatus status = HttpStatus.BAD_REQUEST;
        Map map = null;
        try{
            map = statisticServices.responseDistributionByQuestion(questionId);
            status = HttpStatus.OK;

        }
        catch(Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity(map,status);
    }
}
