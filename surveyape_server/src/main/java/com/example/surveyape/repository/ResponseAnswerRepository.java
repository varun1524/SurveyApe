package com.example.surveyape.repository;
import com.example.surveyape.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.surveyape.entity.ResponseAnswers;
import org.springframework.transaction.annotation.Transactional;


public interface ResponseAnswerRepository extends JpaRepository<ResponseAnswers,String>{
	@Transactional
	int deleteByQuestionAndSurveyResponse(Question questionId, SurveyResponse surveyId);

	public ResponseAnswers findByAnswerId(String answerId);


}


