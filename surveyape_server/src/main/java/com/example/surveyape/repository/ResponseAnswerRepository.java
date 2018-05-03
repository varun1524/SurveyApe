package com.example.surveyape.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.surveyape.entity.ResponseAnswers;
import org.springframework.transaction.annotation.Transactional;


public interface ResponseAnswerRepository extends JpaRepository<ResponseAnswers,String>{
	@Transactional
	int deleteByAnswerId(String answerId);

	public ResponseAnswers findByAnswerId(String answerId);


}


