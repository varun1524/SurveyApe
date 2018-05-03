package com.example.surveyape.entity;

import com.example.surveyape.view.SurveyAndResponseView;
import org.hibernate.annotations.GenericGenerator;

import com.example.surveyape.view.ResponseView;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.*;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

@Entity
public class SurveyResponse {
    @JsonProperty("response_id")
    @JsonView({ ResponseView.summary.class, SurveyAndResponseView.summary.class})
    @Id
    private String responseId;

    @JsonProperty("survey")
    @JsonView({ ResponseView.summary.class , SurveyAndResponseView.summary.class})
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "surveyId", nullable = false)
    private Survey survey;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @JsonProperty("responses")
    @JsonView({ ResponseView.summary.class, SurveyAndResponseView.summary.class })
    @OneToMany(mappedBy = "surveyResponse", cascade = {CascadeType.ALL})
    private List<ResponseAnswers> responseAnswers;

    @JsonView({ ResponseView.summary.class, SurveyAndResponseView.summary.class })
    private String email;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getResponseId() {
        return responseId;
    }

    public void setResponseId(String responseId) {
        this.responseId = responseId;
    }

    public Survey getSurvey() {
        return survey;
    }

    public void setSurvey(Survey survey) {
        this.survey = survey;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<ResponseAnswers> getResponseAnswers() {
        if(this.responseAnswers==null){
            return new LinkedList<>();
        }
        return responseAnswers;
    }

    public void setResponseAnswers(List<ResponseAnswers> responseAnswers) {
        this.responseAnswers = responseAnswers;
    }
}
