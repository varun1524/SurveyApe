package com.example.surveyape.controller;

import com.example.surveyape.entity.Survey;
import com.example.surveyape.entity.User;
import com.example.surveyape.service.*;
import com.example.surveyape.view.SurveyView;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
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
    @Autowired
    QuestionService questionService;
    @Autowired
    OptionAnsService optionAnsService;

    @JsonView({SurveyView.summary.class})
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseEntity createSurvey(@RequestBody Map<String, String> map, HttpSession session){
        ResponseEntity responseEntity = new ResponseEntity(null, HttpStatus.BAD_REQUEST);
        try {
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
    public ResponseEntity updateSurvey(@RequestBody Map map, HttpSession session){
        ResponseEntity responseEntity = new ResponseEntity(null, HttpStatus.BAD_REQUEST);
        try {
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

    @JsonView({SurveyView.summary.class})
    @RequestMapping(value = "", method = RequestMethod.GET)
    public ResponseEntity fetchSurvey(@RequestParam Map<String, String> map, HttpSession session){
        ResponseEntity responseEntity = new ResponseEntity(null, HttpStatus.BAD_REQUEST);
        try {
            Survey survey = surveyService.findBySurveyId(map.get("survey_id").toString());
            if(survey!=null){
                responseEntity = new ResponseEntity(survey, HttpStatus.OK);
            }
            else {
                responseEntity = new ResponseEntity(null, HttpStatus.NOT_FOUND);
            }
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return responseEntity;
    }

    @JsonView({SurveyView.summary.class})
    @RequestMapping(value = "/deletequestion", method = RequestMethod.DELETE)
    public ResponseEntity deleteQuestion(@RequestParam Map<String, String> map, HttpSession session){
        ResponseEntity responseEntity = new ResponseEntity(null, HttpStatus.BAD_REQUEST);
        try {
            int result = questionService.deleteQuestion(map.get("question_id").toString());
            Survey survey = surveyService.findBySurveyId(map.get("survey_id").toString());
            if(survey!=null){
                if(result==1){
                    responseEntity = new ResponseEntity(survey, HttpStatus.OK);
                }
                else {
                    responseEntity = new ResponseEntity(new HashMap<String, String>().put("message","Failed to delete Question"), HttpStatus.NOT_FOUND);
                }
            }

        }
        catch (Exception e){
            e.printStackTrace();
        }
        return responseEntity;
    }

    @JsonView({SurveyView.summary.class})
    @RequestMapping(value = "/deleteoption", method = RequestMethod.DELETE)
    public ResponseEntity deleteoption(@RequestParam Map<String, String> map, HttpSession session){
        ResponseEntity responseEntity = new ResponseEntity(null, HttpStatus.BAD_REQUEST);
        try {
            int result = optionAnsService.deleteOption(map.get("option_id").toString());
            Survey survey = surveyService.findBySurveyId(map.get("survey_id").toString());
            if(survey!=null){
                if(result==1){
                    responseEntity = new ResponseEntity(survey, HttpStatus.OK);
                }
                else {
                    responseEntity = new ResponseEntity(new HashMap<String, String>().put("message","Failed to delete Question"), HttpStatus.NOT_FOUND);
                }
            }

        }
        catch (Exception e){
            e.printStackTrace();
        }
        return responseEntity;
    }
}
