package com.example.surveyape.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

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
	
	@JsonView({ ResponseView.summary.class })
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public ResponseEntity<?> saveSurveyResponse(@RequestBody Map map, HttpSession session) {
		HttpStatus status = HttpStatus.BAD_REQUEST;
		SurveyResponse surveyResponse  = null;
		try {
			surveyResponse = surveyResService.saveSurveyResponse(map);
			if(surveyResponse != null) {
				status = HttpStatus.OK;
			}			

		} catch (Exception exp) {
			System.out.println("[SurveyResponse Controller] saveSurveyResponse() exception : " + exp.getMessage());
			exp.printStackTrace();
		}
		return new ResponseEntity<>(surveyResponse, null, status);
	}

	@JsonView({ ResponseView.summary.class })
	@RequestMapping(value = "/save/checkbox", method = RequestMethod.POST)
	public ResponseEntity<?> saveSurveyResponseCheckbox(@RequestBody Map map, HttpSession session) {
		HttpStatus status = HttpStatus.BAD_REQUEST;
		SurveyResponse surveyResponse  = null;
		try {
			surveyResService.saveCheckResponse(map);
			surveyResponse = surveyResService.getSurveyResponseById(map.get("survey_id").toString().trim());
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
	

}
