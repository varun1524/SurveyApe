package com.example.surveyape.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;

@Entity
public class SurveyResponse {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String responseId;

    @ManyToOne
    @JoinColumn(name = "surveyId", nullable = false)
    private Survey survey;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    @OneToMany(mappedBy = "surveyResponse", cascade = {CascadeType.PERSIST})
    private List<ResponseAnswers> responseAnswers;

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
        return responseAnswers;
    }

    public void setResponseAnswers(List<ResponseAnswers> responseAnswers) {
        this.responseAnswers = responseAnswers;
    }
}
