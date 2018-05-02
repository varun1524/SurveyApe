package com.example.surveyape.service;

import java.util.*;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.surveyape.entity.Question;
import com.example.surveyape.entity.ResponseAnswers;
import com.example.surveyape.entity.SurveyResponse;
import com.example.surveyape.entity.User;
import com.example.surveyape.repository.QuestionRepository;
import com.example.surveyape.repository.ResponseAnswerRepository;
import com.example.surveyape.repository.SurveyRepository;
import com.example.surveyape.repository.SurveyResponseRepository;
import com.example.surveyape.repository.UserRepository;
import com.example.surveyape.utils.QuestionUtility;

@Service
public class SurveyResponseServices {
	@Autowired
	UserRepository userRepo;
	@Autowired
	SurveyResponseRepository surveyResRepo;
	@Autowired
	SurveyRepository surveyRepo;
	@Autowired
	QuestionRepository questionRepo;
	@Autowired
	ResponseAnswerRepository resAnsRepo;

	public void saveCheckResponse(Map map){
		ResponseAnswers resAns = resAnsRepo.findByAnswerId(map.get("answer_id").toString().trim());
		if(resAns == null){
			resAns = new ResponseAnswers();
			resAns.setAnswerId(map.get("response_id").toString().trim());
		}
		Boolean checkStatus = Boolean.getBoolean(map.get("check").toString().trim());
		SurveyResponse surveyRes = surveyResRepo.findByResponseId(map.get("response_id").toString().trim());
		Question question = questionRepo.findByQuestionId(map.get("question_id").toString().trim());
		if(checkStatus){
			resAns.setSurveyResponse(surveyRes);
			resAns.setAnswerValue(map.get("response_answer").toString().trim());
			resAns.setQuestion(question);
			resAnsRepo.save(resAns);
		}else{
			resAnsRepo.deleteByQuestionAndSurveyResponse(question, surveyRes);
		}

	}

	public SurveyResponse saveSurveyResponse(Map map) {
		String response_id = map.get("response_id").toString().trim();
		String survey_id = map.get("survey_id").toString().trim();

		String email = map.get("email").toString().trim();
		User user = userRepo.findByEmail(email);

		SurveyResponse surveyResponse = surveyResRepo.findByResponseId(response_id);
		if (surveyResponse == null) {
			surveyResponse = new SurveyResponse();
			surveyResponse.setResponseId(response_id);
		}
		if (user != null) {
			surveyResponse.setUser(user);
		}

		surveyResponse.setEmail(email);
		surveyResponse.setSurvey(surveyRepo.findBySurveyId(survey_id));
		List<ResponseAnswers> responseAnswerList = createResponseList(map, surveyResponse);
		surveyResponse.setResponseAnswers(responseAnswerList);
		surveyResponse = surveyResRepo.save(surveyResponse);
		return surveyResponse;
	}

	private List<ResponseAnswers> createResponseList(Map map, SurveyResponse surveyResponse) {
		System.out.println(map.toString());
		List<ResponseAnswers> resAnsList = new LinkedList<>();
		List<Map> resAnswers = (List) map.get("responses");
		//HashMap<String, List<String>> checkboxQuestions = new HashMap<>();
		HashSet<Question> checkboxQuestionSet = new HashSet<>();
		for (Map resMap : resAnswers) {
			ResponseAnswers resAns = new ResponseAnswers();
			//resAns.setAnswerId(resMap.get("answer_id").toString().trim());
			//resAns.setAnswerValue(resMap.get("answer_value").toString().trim());
			Map qMap = (Map) resMap.get("question");
			String answerValStr = resMap.get("answer_value").toString().trim();
			Question question = questionRepo.findByQuestionId(qMap.get("question_id").toString().trim());
			/*if (question.getQuestionType().toLowerCase() == QuestionUtility.CHECKBOX) {
				LinkedList<String> checkList = null;
				if(checkboxQuestions.get(question.getQuestionId()) == null) {
					checkList = new LinkedList<>();
					checkList.add(answerValStr);
					checkboxQuestions.put(question.getQuestionId(), checkList);
				}else {
					checkList = (LinkedList<String>) checkboxQuestions.get(question.getQuestionId()) ;
					checkList.add(answerValStr);
				}
				continue;
			}*/
			if(question.getQuestionType().toLowerCase().equals(QuestionUtility.CHECKBOX)){
				checkboxQuestionSet.add(question);
			}
			resAns.setQuestion(question);
			resAns.setAnswerId(resMap.get("answer_id").toString().trim());
			resAns.setAnswerValue(answerValStr);
			resAns.setSurveyResponse(surveyResponse);
			resAnsList.add(resAns);
		}
		try{
			deleteCheckboxQuestions(checkboxQuestionSet, surveyResponse);
		}catch(Exception exp) {
			System.out.println("failed to delete");
			exp.printStackTrace();
		}
		return resAnsList;
	}

	public void deleteCheckboxQuestions(HashSet<Question> checkboxQuestionSet, SurveyResponse surveyId) {
		for(Question questionId:checkboxQuestionSet) {
			int deleteCount = resAnsRepo.deleteByQuestionAndSurveyResponse(questionId, surveyId);
			System.out.println("deleteCont"+deleteCount);
		}
		
	}

	public SurveyResponse getSurveyResponseById(String surveyResId){
		SurveyResponse surveyRes = surveyResRepo.findByResponseId(surveyResId);
		return surveyRes;
	}

}
