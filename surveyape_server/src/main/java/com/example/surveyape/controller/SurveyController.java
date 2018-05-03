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
import java.util.List;
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
    @JsonView({SurveyView.summary.class})
    @RequestMapping(value = "/deletesurvey", method = RequestMethod.DELETE)
    public ResponseEntity deleteSurvey(@RequestParam(value = "survey_id") String surveyId, HttpSession session){
        HttpStatus status = HttpStatus.BAD_REQUEST;
        Map responseMap = new HashMap();
        String resMsg = "";
        System.out.println("[SurveyController] delete survey surveyID:"+surveyId);
        try {
            int result = surveyService.deleteSurvey(surveyId);

            if(result==1){
                List<Survey> createdSurveys = userService.getAllUserSurvey("rutvik.pensionwar@gmail.com"/*session.getAttribute("email").toString()*/);
                System.out.println("[SurveyController] created" + createdSurveys);
                responseMap.put("created_surveys", createdSurveys);
                responseMap.put("requested_surveys", createdSurveys);
                status = HttpStatus.OK;
                resMsg = "Survey id: "+surveyId+" deleted succcessfully :)";
                responseMap.put("message",resMsg);
            }
            else {
                status = HttpStatus.INTERNAL_SERVER_ERROR;
                resMsg = "Failed to delte survey id: "+surveyId+" due internal server error !!!";
                responseMap.put("error",resMsg);
            }


        }
        catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity(responseMap,status);
    }

    @JsonView({SurveyView.summary.class})
    @RequestMapping(value = "/share", method = RequestMethod.POST)
    public ResponseEntity shareSurvey(@RequestBody Map<String, String> map, HttpSession session){
        HttpStatus status = HttpStatus.BAD_REQUEST;Map resMap = new HashMap();
        try {
            surveyService.shareSurvey(map);
            status = HttpStatus.OK;
            resMap.put("message","Survey shared successfully !!!");
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity(resMap,status);
    }


}
