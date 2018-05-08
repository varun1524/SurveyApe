package com.example.surveyape.service;

import com.example.surveyape.entity.*;
import com.example.surveyape.repository.QuestionRepository;
import com.example.surveyape.repository.SurveyRepository;
import com.example.surveyape.repository.SurveyResponseRepository;
import com.example.surveyape.utils.QuestionUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class StatisticServices {

    @Autowired
    SurveyResponseRepository surveyResponseRepository;
    @Autowired
    SurveyRepository surveyRepository;
    @Autowired
    QuestionRepository questionRepository;

    public Map getBasicStats(String surveyId){
        Map map = new HashMap();
        Survey survey = surveyRepository.findBySurveyId(surveyId);
        if(survey !=null){
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
            if(survey.getPublishDate()!=null){
                String sdateString = simpleDateFormat.format(survey.getPublishDate());
                map.put("start_time",sdateString);
            }
            if(survey.getSurveyEndDate()!=null){
                String edateString = simpleDateFormat.format(survey.getSurveyEndDate());

                map.put("end_date",edateString);
            }


            map.put("survey_name",survey.getSurveyName());
            map.put("survey_type",survey.getSurveyType());
            List<SurveyResponse> participants = new LinkedList<>();
            List<SurveyResponse> surveyResponses = surveyResponseRepository.findAllBySurvey(survey);
            if(surveyResponses!=null){
                for(SurveyResponse eachRequest:surveyResponses){
                    if(eachRequest.getSubmitted()){
                        participants.add(eachRequest);
                    }
                }
                double participationRate = ((double)participants.size()/(double)surveyResponses.size())*100;
                map.put("participants",participants.size());
                map.put("participation_rate",participationRate);
                map.put("questions",survey.getQuestions());
            }

        }

        return map;

    }

    // Currently this is only applicable for ans option other than (data and short answer)
    public Map responseDistributionByQuestion(String questionId){
        Map  map = new HashMap();
        Question question = questionRepository.findByQuestionId(questionId);
        if(question!=null){
            String type = question.getQuestionType();
            map.put("question",question);
            List<OptionAns> optionAnsList = question.getOptions();
            if(optionAnsList!=null) {
                List<ResponseAnswers> responseAnswersList = question.getResponseAnswers();
                if (type.toLowerCase().equals(QuestionUtility.CHECKBOX) || type.toLowerCase().equals(QuestionUtility.RADIO) || type.toLowerCase().equals(QuestionUtility.DROPDOWN)) {
                    List<Integer> countForOptions = new LinkedList<>();

                    int index = 0;
                    for (OptionAns opt : optionAnsList) {
                        Integer responseCount = 0;
                        if (responseAnswersList != null) {
                            for (ResponseAnswers resAns : responseAnswersList) {
                                if (opt.getOptionId().equals(resAns.getAnswerValue())) {
                                    responseCount++;
                                }
                            }
                        }
                        //map.put(opt,responseCount);
                        countForOptions.add(index++, responseCount);
                    }
                    map.put("options_list", optionAnsList);
                    map.put("response_count", countForOptions);


                } else {
                    List<String> responseAnsList = new LinkedList<>();

                    if(responseAnswersList!=null){
                        for (ResponseAnswers resAns : responseAnswersList) {
                            responseAnsList.add(resAns.getAnswerValue());
                        }

                    }
                    map.put("answers",responseAnsList);
                }
            }


        }
        return map;
    }
}
