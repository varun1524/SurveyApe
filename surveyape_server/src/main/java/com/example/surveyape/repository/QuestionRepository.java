package com.example.surveyape.repository;

import com.example.surveyape.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, String> {
    int deleteByQuestionId(String id);
    
    public Question findByQuestionId(String questionId);
}
