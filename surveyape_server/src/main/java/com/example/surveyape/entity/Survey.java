package com.example.surveyape.entity;

import com.example.surveyape.view.*;
import com.fasterxml.jackson.annotation.JsonView;
import org.hibernate.annotations.GenericGenerator;
import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
public class Survey {

    @JsonView({SurveyView.summary.class})
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String surveyId;

    @JsonView({SurveyView.summary.class,SurveyListView.summary.class})
    private String surveyName;

    @JsonView({SurveyView.summary.class,SurveyListView.summary.class})
    private String surveyType;

    @JsonView({SurveyView.summary.class})
    private Date creationDate;

    @JsonView({SurveyView.summary.class})
    private Date updateDate;

    @JsonView({SurveyView.summary.class})
    private Date publishDate;

    @JsonView({SurveyView.summary.class,SurveyListView.summary.class})
    private Date surveyEndDate;

    @ManyToOne(targetEntity = User.class, cascade = {CascadeType.PERSIST})
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    @JsonView({SurveyView.summary.class})
    @OneToMany(mappedBy = "survey", cascade = {CascadeType.ALL})
    private List<Question> questions;

    @JsonView({SurveyView.summary.class})
    @OneToMany(mappedBy = "survey", cascade = {CascadeType.PERSIST})
    private List<SurveyResponse> surveyResponses;

    public String getSurveyId() {
        return surveyId;
    }

    public void setSurveyId(String surveyId) {
        this.surveyId = surveyId;
    }

    public String getSurveyName() {
        return surveyName;
    }

    public void setSurveyName(String surveyName) {
        this.surveyName = surveyName;
    }

    public String getSurveyType() {
        return surveyType;
    }

    public void setSurveyType(String surveyType) {
        this.surveyType = surveyType;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }

    public Date getPublishDate() {
        return publishDate;
    }

    public void setPublishDate(Date publishDate) {
        this.publishDate = publishDate;
    }

    public Date getSurveyEndDate() {
        return surveyEndDate;
    }

    public void setSurveyEndDate(Date surveyEndDate) {
        this.surveyEndDate = surveyEndDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }

    public List<SurveyResponse> getSurveyResponses() {
        return surveyResponses;
    }

    public void setSurveyResponses(List<SurveyResponse> surveyResponses) {
        this.surveyResponses = surveyResponses;
    }
}
