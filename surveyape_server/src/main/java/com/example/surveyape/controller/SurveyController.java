package com.example.surveyape.controller;

import com.example.surveyape.entity.*;
import com.example.surveyape.entity.User;
import com.example.surveyape.service.*;
import com.example.surveyape.view.SurveyListView;
import com.example.surveyape.view.SurveyView;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.*;

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
    @Autowired
    SurveyResponseServices surveyResService;

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

    @JsonView(SurveyListView.summary.class)
    @RequestMapping(value = "/deletesurvey", method = RequestMethod.DELETE)
    public ResponseEntity deleteSurvey(@RequestParam(value = "survey_id") String surveyId, HttpSession session){
        HttpStatus status = HttpStatus.BAD_REQUEST;
        Map responseMap = new HashMap();
        String resMsg = "";
        System.out.println("[SurveyController] delete survey surveyID:"+surveyId);
        try {
            int result = surveyService.deleteSurvey(surveyId);

            if(result==1){
                List<Survey> createdSurveys = userService.getAllUserSurvey(session.getAttribute("email").toString());
                System.out.println("[SurveyController] created" + createdSurveys);
                List<SurveyResponse> responseSurveyList = surveyResService.getsurveyResponseByEmail(session.getAttribute("email").toString());

                responseMap.put("created_surveys", createdSurveys);
                responseMap.put("requested_surveys", responseSurveyList);
                status = HttpStatus.OK;
                resMsg = "Survey id: "+surveyId+" deleted succcessfully :)";
                responseMap.put("message",resMsg);
            }else if(result == 2){
                status = HttpStatus.CONFLICT;
                resMsg = "Can not delete survey id: "+surveyId+" as it has been shared with users !!!";
            }else {
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


    @RequestMapping(value = "/share", method = RequestMethod.POST)
    public ResponseEntity shareSurvey(@RequestBody Map<String, String> map, HttpSession session){
        System.out.println("[SurveyController] shareSurvey");
        HttpStatus status = HttpStatus.BAD_REQUEST;
        Map resMap = new HashMap();
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

    //This api is use used to toggle the survey publish state i.e. if publish is set true it changes it to false and vice versa
    @RequestMapping(value = "/publish", method = RequestMethod.POST)
    public ResponseEntity publishSurvey(@RequestBody Map<String, String> map, HttpSession session){
        HttpStatus status = HttpStatus.BAD_REQUEST;
        Map resMap = new HashMap();
        try {
            String surveyId = map.get("survey_id");
            System.out.println("surveyId: "+surveyId);
            if(surveyId !=null && surveyId.trim().length() > 0){
                Boolean publishstatus = surveyService.publishSurvey(surveyId);
                if(publishstatus){
                    status = HttpStatus.OK;
                    resMap.put("message","Survey published successfully !!!");
                }

            }

        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity(resMap,status);
    }

    @RequestMapping(value = "/close/{surveyId}", method = RequestMethod.GET)
    public ResponseEntity closeSurvey(@PathVariable String surveyId, HttpSession session){
        HttpStatus status = HttpStatus.BAD_REQUEST;
        Map resMap = new HashMap();
        try {
            if(surveyId!= null){
                System.out.println("[SurveyController] surveyId: "+surveyId);
                Date date = surveyService.closeSurvey(surveyId);
                if(date!=null){
                    status = HttpStatus.OK;
                    resMap.put("end_date",date);
                }
                else{
                    status = HttpStatus.NOT_FOUND;
                }
            }

        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity(resMap,status);
    }


}
