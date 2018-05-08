package com.example.surveyape.service;

import com.example.surveyape.entity.*;
import com.example.surveyape.repository.InviteeRepository;
import com.example.surveyape.repository.SurveyRepository;
import com.example.surveyape.repository.SurveyResponseRepository;
import com.example.surveyape.utils.MailUtility;
import com.example.surveyape.utils.QuestionUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;

import java.util.*;

@Service
public class SurveyService {

	@Autowired
	SurveyRepository surveyRepository;

	@Autowired
	UserService userService;

	@Autowired
	InviteeRepository inviteeRepository;
	@Autowired
	SurveyResponseRepository surveyResponseRepository;

	@Autowired
	MailService mailService;

	public Survey createSurvey(Map map, User user) {
		Survey survey = null;
		try {
			System.out.println("[SurveyService] createSurvey end_date");
			System.out.println(map.get("end_date"));

			survey = new Survey();
			survey.setSurveyName(map.get("survey_name").toString());
			survey.setSurveyType(map.get("survey_type").toString());
			if(map.get("end_date")!=null && map.get("end_date").toString().length()>0){
				Date endDate = new SimpleDateFormat("yyyy-MM-dd").parse(map.get("end_date").toString());
				survey.setSurveyEndDate(endDate);
			}

			survey.setUser(user);
			// survey.setPublishDate(new SimpleDateFormat("yyyy-MM-dd-HH").parse(map.get("publish_date").toString()));
			survey = surveyRepository.save(survey);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return survey;
	}

	public Survey updateSurvey(Map map) {
		Survey survey = null;
		try {
			String surveyId = map.get("survey_id").toString();
			survey = surveyRepository.findBySurveyId(surveyId);
			if (survey != null) {
				survey.setSurveyName(map.get("survey_name").toString());
				survey.setSurveyType(map.get("survey_type").toString());
				survey.setUpdateDate(new Date());
				// survey.setPublishDate(new SimpleDateFormat("yyyy-MM-dd-HH").parse(map.get("publish_date").toString()));
				if(map.get("end_date")!=null){
					Date endDate = new SimpleDateFormat("yyyy-MM-dd").parse(map.get("end_date").toString());
					survey.setSurveyEndDate(endDate);
				}
				List<Map> questionMapList = (List) map.get("questions");
				survey.setQuestions(generateQuestionList(questionMapList, survey));
				survey = surveyRepository.save(survey);
				if (survey != null) {
					survey = surveyRepository.findBySurveyId(surveyId);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return survey;
	}

    private List<Question> generateQuestionList(List<Map> questionMapList, Survey survey) {
        Question question = null;
        List<Question> questionList = new LinkedList<>();
        for(Map map : questionMapList){
            question = new Question();
            question.setQuestionId(map.get("question_id").toString());
            question.setQuestionText(map.get("question_text").toString());
            question.setQuestionType(map.get("question_type").toString());
            question.setSurvey(survey);
            String questionType = question.getQuestionType().toLowerCase();
            if(questionType.equals(QuestionUtility.CHECKBOX)
                    ||
                    questionType.equals(QuestionUtility.RADIO)
                    ||
                    questionType.equals(QuestionUtility.DROPDOWN)
                    ){
                question.setMultipleChoice(true);
                List<Map> answerMapList = (List)map.get("options");
                question.setOptions(generateAnswersOptions(answerMapList, question));
            }
            else if(questionType.equals(QuestionUtility.RATING)
                    ||
                    questionType.equals(QuestionUtility.SHORTANSWER)
                    ||
                    questionType.equals(QuestionUtility.DateTime)
                    ||
                    questionType.equals(QuestionUtility.YESNO)
            ){
                System.out.println("Question Type: " + questionType);
            }
            questionList.add(question);
        }
        return questionList;
    }

	private List<OptionAns> generateAnswersOptions(List<Map> answerMapList, Question question) {
		OptionAns answerOptions = null;
		List<OptionAns> answerOptionsList = new LinkedList<>();
		for (Map map : answerMapList) {
			answerOptions = new OptionAns();
			answerOptions.setOptionType(map.get("option_type").toString());
			answerOptions.setOptionText(map.get("option_text").toString());
			answerOptions.setOptionId(map.get("option_id").toString());
			answerOptions.setQuestion(question);
			answerOptionsList.add(answerOptions);
		}
		return answerOptionsList;
	}

	public Survey findBySurveyId(String id) {
		Survey survey = null;
		try {
			survey = surveyRepository.findBySurveyId(id);
		} catch (Exception e) {
			throw e;
		}
		return survey;
	}
	// 1- success, 0- failure, 2- can not delete as there are active responses
	public int deleteSurvey(String surveyId){

		if(this.checkIsSurveyShared(surveyId)){
			return 2;
		}else{
			return surveyRepository.deleteBySurveyId(surveyId);
		}

	}


	public void shareSurvey(Map shareMap){
		String surveyId = shareMap.get("survey_id").toString().trim();
		String emailIds = shareMap.get("emailIds").toString().trim();
		Survey survey = surveyRepository.findBySurveyId(surveyId);
		SurveyResponse surveyResponse = null;
		if(survey != null){
			String emails[] = emailIds.split(",");
			for(String email:emails){
				String responseId = UUID.randomUUID().toString();
				surveyResponse = new SurveyResponse();
				surveyResponse.setEmail(email.trim());
				surveyResponse.setResponseId(responseId);
				surveyResponse.setSurvey(survey);
				surveyResponseRepository.save(surveyResponse);
				Invitees invitees = new Invitees();
				invitees.setEmail(email);
				invitees.setSurvey(survey);
				invitees.setSurveyToken(responseId);
				inviteeRepository.save(invitees);
				String msgBody = "";
				String subject = "";
				if(survey.getSurveyType().equals("open")){
					msgBody = MailUtility.open_survey_body+responseId;
					msgBody += "\n\n"+MailUtility.thank_team_surveyape;
					subject = MailUtility.open_survey_subject;
				}else if(survey.getSurveyType().equals("close")){
					msgBody = MailUtility.close_survey_body+responseId;
					msgBody += "\n\n"+MailUtility.thank_team_surveyape;
					subject = MailUtility.close_survey_subject;
				}else{
					msgBody = MailUtility.general_survey_body+surveyId;
					msgBody += "\n\n"+MailUtility.thank_team_surveyape;
					subject = MailUtility.general_survey_subject;
				}
				try{
					mailService.sendEmail(email,msgBody,subject);
				}catch(Exception exp){
					System.out.println("[SurveyService] mail to send mail exception: "+exp.getMessage());
				}

			}

		}

	}


	public Boolean publishSurvey(String survey_id){

		Survey survey = surveyRepository.findBySurveyId(survey_id);
		if(survey != null && survey.getPublished()!=true){
			survey.setPublished(true);
			survey.setPublishDate(new Date());
			surveyRepository.save(survey);
			return true;
		}
		return false;

	}

	public Boolean checkForActiveSurveyResponse(String surveyId){
		Survey survey = surveyRepository.findBySurveyId(surveyId);
		if(survey != null){
			List<SurveyResponse> surveyResponseList = surveyResponseRepository.findAllBySurvey(survey);
			for(SurveyResponse surRes:surveyResponseList){
				if(surRes.getSubmitted()){
					return true;
				}
			}
		}
		return false;
	}

	public Boolean checkIsSurveyShared(String surveyId){
		Survey survey = surveyRepository.findBySurveyId(surveyId);
		if(survey != null){
			List<SurveyResponse> surveyResponseList = surveyResponseRepository.findAllBySurvey(survey);
			if(surveyResponseList!=null && surveyResponseList.size()>0){
				return true;
			}
		}
		return false;
	}
}
