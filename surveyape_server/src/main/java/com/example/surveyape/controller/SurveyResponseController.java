package com.example.surveyape.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import com.example.surveyape.entity.Survey;
import com.example.surveyape.entity.User;
import com.example.surveyape.service.UserService;
import com.example.surveyape.utils.SurveyType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.surveyape.entity.SurveyResponse;
import com.example.surveyape.service.SurveyResponseServices;
import com.example.surveyape.view.*;
import com.fasterxml.jackson.annotation.JsonView;

@RestController
@CrossOrigin(origins = "*", allowCredentials = "true")
@RequestMapping(path = "/response")
public class SurveyResponseController {

	@Autowired
	SurveyResponseServices surveyResService;

	@Autowired
	UserService userService;

//	@JsonView({ ResponseView.summary.class })
//	@RequestMapping(value = "/save", method = RequestMethod.POST)
//	public ResponseEntity<?> saveSurveyResponse(@RequestBody Map map, HttpSession session) {
//		HttpStatus status = HttpStatus.BAD_REQUEST;
//		SurveyResponse surveyResponse  = null;
//		try {
//			surveyResponse = surveyResService.saveSurveyResponse(map);
//			if(surveyResponse != null) {
//				status = HttpStatus.OK;
//			}
//
//		} catch (Exception exp) {
//			System.out.println("[SurveyResponse Controller] saveSurveyResponse() exception : " + exp.getMessage());
//			exp.printStackTrace();
//		}
//		return new ResponseEntity<>(surveyResponse, null, status);
//	}

	@JsonView({ResponseView.summary.class})
	@RequestMapping(value = "/save/checkbox", method = RequestMethod.POST)
	public ResponseEntity<?> saveSurveyResponseCheckbox(@RequestBody Map map, HttpSession session) {
		HttpStatus status = HttpStatus.BAD_REQUEST;
		SurveyResponse surveyResponse  = null;
		try {
			surveyResponse = surveyResService.getSurveyResponseById(map.get("response_id").toString().trim());
			if(surveyResponse==null){
				surveyResponse = surveyResService.createSurveyResponse(map);
			}
			surveyResponse = surveyResService.saveCheckResponse(map, surveyResponse);
//			surveyResponse = surveyResService.getSurveyResponseById(map.get("response_id").toString().trim());
			if(surveyResponse != null) {
				status = HttpStatus.OK;

			}else{
				status = HttpStatus.NOT_FOUND;
			}


		} catch (Exception exp) {
			System.out.println("[SurveyResponse Controller] saveSurveyResponseCheckbox() exception : " + exp.getMessage());
			exp.printStackTrace();
		}
		return new ResponseEntity<>(surveyResponse, null, status);
	}

	@JsonView({ResponseView.summary.class})
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public ResponseEntity<?> saveResponseAnswers(@RequestBody Map map, HttpSession session) {
		HttpStatus status = HttpStatus.BAD_REQUEST;
		SurveyResponse surveyResponse  = null;
		try {
			surveyResponse = surveyResService.getSurveyResponseById(map.get("response_id").toString().trim());
			if(surveyResponse==null){
				surveyResponse = surveyResService.createSurveyResponse(map);
			}
			if(session.getAttribute("email")!=null){
				User user = userService.findByEmail(session.getAttribute("email").toString());
				surveyResponse.setEmail(user.getEmail());
				surveyResponse.setUser(user);
			}
			surveyResponse = surveyResService.saveResponseAnswer(map, surveyResponse);
			if(surveyResponse != null) {
				status = HttpStatus.OK;
			}else{
				status = HttpStatus.NOT_FOUND;
			}
		} catch (Exception exp) {
			System.out.println("[SurveyResponse Controller] saveSurveyResponseCheckbox() exception : " + exp.getMessage());
			exp.printStackTrace();
		}
		return new ResponseEntity<>(surveyResponse, null, status);
	}


	@JsonView({SurveyAndResponseView.summary.class})
	@RequestMapping(value = "/surveyandresponse", method = RequestMethod.GET)
	public ResponseEntity getSurveyAndResponseByResponseId(@RequestParam(value = "response_id") String responseId, HttpSession session){
		ResponseEntity responseEntity = new ResponseEntity(null, HttpStatus.BAD_REQUEST);
		try {
			System.out.println("getSurveyAndResponseByResponseId:	" + responseId);
			SurveyResponse surveyResponse = surveyResService.getSurveyResponseById(responseId);
			if(surveyResponse!=null){
				if(surveyResponse.getSurvey().getSurveyType().toLowerCase().equals(SurveyType.CLOSED)){
					if(session.getAttribute("email")!=null){
						responseEntity = new ResponseEntity(surveyResponse, HttpStatus.OK);
					}
					else {
						responseEntity = new ResponseEntity(null, HttpStatus.NON_AUTHORITATIVE_INFORMATION);
					}
				}
				else {
					responseEntity = new ResponseEntity(surveyResponse, HttpStatus.OK);
				}
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

	@JsonView({ResponseView.summary.class})
	@RequestMapping(value = "", method = RequestMethod.GET)
	public ResponseEntity getSurveyResponseByResponseId(@RequestParam(value = "response_id") String responseId, HttpSession session){
		ResponseEntity responseEntity = new ResponseEntity(null, HttpStatus.BAD_REQUEST);
		try {
			System.out.println("getSurveyResponseByResponseId:	" + responseId);
			SurveyResponse surveyResponse = surveyResService.getSurveyResponseById(responseId);
			if(surveyResponse!=null){
				responseEntity = new ResponseEntity(surveyResponse, HttpStatus.OK);
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

	@RequestMapping(value = "/submit", method = RequestMethod.POST)
	public ResponseEntity submitResponse(@RequestBody Map<String, String> map, HttpSession session){
		HttpStatus status = HttpStatus.BAD_REQUEST;
		Map resMap = new HashMap();
		try {

			Boolean surveyResSubmitstatus = surveyResService.submitResponse(map);
			if(surveyResSubmitstatus){
				status = HttpStatus.OK;
				resMap.put("message","Survey response submitted succesfully !!!");
			}
		}
		catch (Exception e){
			e.printStackTrace();
		}
		return new ResponseEntity(resMap,status);
	}

}
