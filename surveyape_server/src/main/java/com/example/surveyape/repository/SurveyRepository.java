package com.example.surveyape.repository;

import com.example.surveyape.entity.Survey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SurveyRepository extends JpaRepository<Survey, String> {
    Survey findBySurveyId(String id);
}
