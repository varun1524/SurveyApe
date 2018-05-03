package com.example.surveyape.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.surveyape.entity.SurveyResponse;

public interface SurveyResponseRepository extends JpaRepository<SurveyResponse,String>{
	SurveyResponse findByResponseId(String responseId);
}
