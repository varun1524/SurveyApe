package com.example.surveyape.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.surveyape.entity.*;
import org.springframework.data.jpa.repository.Query;

import java.util.*;

public interface SurveyResponseRepository extends JpaRepository<SurveyResponse,String>{
	SurveyResponse findByResponseId(String responseId);

	List<SurveyResponse>findAllBySurvey(Survey survey);
	List<SurveyResponse>findAllByEmail(String email);
}
