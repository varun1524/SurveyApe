package com.example.surveyape.controller;

import com.example.surveyape.entity.Survey;
import com.example.surveyape.entity.User;
import com.example.surveyape.service.MailService;
import com.example.surveyape.service.SurveyService;
import com.example.surveyape.service.UserService;
import com.example.surveyape.utils.MailUtility;
import com.example.surveyape.utils.UserUtility;
import com.example.surveyape.view.SurveyView;
import com.fasterxml.jackson.annotation.JsonView;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*", allowCredentials = "true")
@RequestMapping(path = "/survey")
public class SurveyController {

    @Autowired
    UserService userService;
    @Autowired
    SurveyService surveyService;
    @Autowired
    MailService mailService;

    @JsonView({SurveyView.summary.class})
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseEntity createSurvey(@RequestBody Map<String, String> map, HttpSession session){
        ResponseEntity responseEntity = new ResponseEntity(null, HttpStatus.BAD_REQUEST);
        try {
            printInput(map);
            User user = userService.findByEmail(session.getAttribute("email").toString());
            if(user!=null){
                Survey survey = surveyService.createSurvey(map, user);
                if(survey!=null){
                    responseEntity = new ResponseEntity(survey, HttpStatus.OK);
                }
            }
            else {
                System.out.println("Error");
            }
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return responseEntity;
    }

    @JsonView({SurveyView.summary.class})
    @RequestMapping(value = "/create", method = RequestMethod.PUT)
    public ResponseEntity updateSurvey(@RequestBody Map<String, String> map){
        ResponseEntity responseEntity = new ResponseEntity(null, HttpStatus.BAD_REQUEST);
        try {
            printInput(map);
            Survey survey = surveyService.updateSurvey(map);
            if(survey!=null){
                responseEntity = new ResponseEntity(survey, HttpStatus.OK);
            }
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return responseEntity;
    }

    private void printInput(Map<String, String> map){
        for(Map.Entry<String, String> entry : map.entrySet()){
            System.out.println(entry.getKey() + "   --->    "+entry.getValue());
        }
    }
}
