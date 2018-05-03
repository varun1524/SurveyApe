package com.example.surveyape.repository;

import com.example.surveyape.entity.Survey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface SurveyRepository extends JpaRepository<Survey, String> {

    Survey findBySurveyId(String id);
    @Transactional
    int deleteBySurveyId(String surveyId);
}
