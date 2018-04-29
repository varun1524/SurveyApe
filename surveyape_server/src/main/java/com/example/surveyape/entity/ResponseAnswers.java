package com.example.surveyape.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
public class ResponseAnswers {

    @JsonProperty("answer_id")
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String answerId;

    @JsonProperty("survey_response")
    @ManyToOne(targetEntity = SurveyResponse.class, cascade = {CascadeType.ALL})
    @JoinColumn(name = "responseId", nullable = false)
    private SurveyResponse surveyResponse;

    @ManyToOne(targetEntity = Question.class, cascade = {CascadeType.ALL})
    @JoinColumn(name = "questionId", nullable = false)
    private Question question;

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
