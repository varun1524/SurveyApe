package com.example.surveyape.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
public class ResponseAnswers {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    @ManyToOne(targetEntity = SurveyResponse.class, cascade = {CascadeType.ALL})
    @JoinColumn(name = "responseId", nullable = false)
    private SurveyResponse surveyResponse;

    @ManyToOne(targetEntity = Question.class, cascade = {CascadeType.ALL})
    @JoinColumn(name = "questionId", nullable = false)
    private Question question;

    private String response;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

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

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }
}
