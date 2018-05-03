package com.example.surveyape.entity;

import com.example.surveyape.view.ResponseView;
import com.example.surveyape.view.SurveyAndResponseView;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.*;

@Entity
public class ResponseAnswers {

    @JsonProperty("answer_id")
    @JsonView({ ResponseView.summary.class , SurveyAndResponseView.summary.class})
    @Id
    private String answerId;

    
    @ManyToOne(targetEntity = SurveyResponse.class, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "responseId", nullable = false)
    private SurveyResponse surveyResponse;

    @JsonView({ ResponseView.summary.class, SurveyAndResponseView.summary.class })
    @ManyToOne(targetEntity = Question.class, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "questionId", nullable = false)
    private Question question;

    @JsonView({ ResponseView.summary.class , SurveyAndResponseView.summary.class})
    @JsonProperty("answer_value")
    private String answerValue;

    public SurveyResponse getSurveyResponse() {
        return surveyResponse;
    }

    public void setSurveyResponse(SurveyResponse surveyResponse) {
        this.surveyResponse = surveyResponse;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public String getAnswerId() {
        return answerId;
    }

    public void setAnswerId(String answerId) {
        this.answerId = answerId;
    }

    public String getAnswerValue() {
        return answerValue;
    }

    public void setAnswerValue(String answerValue) {
        this.answerValue = answerValue;
    }
}
