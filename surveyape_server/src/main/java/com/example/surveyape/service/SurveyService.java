package com.example.surveyape.service;

import com.example.surveyape.entity.OptionAns;
import com.example.surveyape.entity.Question;
import com.example.surveyape.entity.Survey;
import com.example.surveyape.entity.User;
import com.example.surveyape.repository.SurveyRepository;
import com.example.surveyape.repository.UserRepository;
import com.example.surveyape.utils.QuestionUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class SurveyService {

	@Autowired
	SurveyRepository surveyRepository;

	@Autowired
	UserService userService;

	public Survey createSurvey(Map map, User user) {
		Survey survey = null;
		try {
			survey = new Survey();
			survey.setSurveyName(map.get("survey_name").toString());
			survey.setSurveyType(map.get("survey_type").toString());
			survey.setCreationDate(new Date());
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


}
