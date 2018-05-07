package com.example.surveyape.service;

import com.example.surveyape.entity.*;
import com.example.surveyape.repository.QuestionRepository;
import com.example.surveyape.repository.SurveyRepository;
import com.example.surveyape.repository.SurveyResponseRepository;
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
            String sdateString = simpleDateFormat.format(survey.getPublishDate());
            String edateString = simpleDateFormat.format(survey.getSurveyEndDate());
            map.put("start_time",sdateString);
            map.put("end_date",edateString);
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
            List<OptionAns> optionAnsList = question.getOptions();
            List<Integer> countForOptions = new LinkedList<>();
            List<ResponseAnswers> responseAnswersList = question.getResponseAnswers();
            if(optionAnsList!=null){
                int index =0;
                for(OptionAns opt:optionAnsList){
                    Integer responseCount = 0;
                    if(responseAnswersList!=null){
                        for(ResponseAnswers resAns:responseAnswersList){
                            if(opt.getOptionId().equals(resAns.getAnswerValue())){
                                responseCount++;
                            }
                        }
                    }
                    //map.put(opt,responseCount);
                    countForOptions.add(index++,responseCount);
                }
                map.put("options_list",optionAnsList);
                map.put("response_count",countForOptions);

            }


        }
        return map;
    }
}
