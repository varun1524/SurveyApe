package com.example.surveyape.service;

import com.example.surveyape.entity.Survey;
import com.example.surveyape.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class QuestionService {
    @Autowired
    QuestionRepository questionRepository;

    @Transactional
    public int deleteQuestion(String questionId){
        return questionRepository.deleteByQuestionId(questionId);
    }
}
