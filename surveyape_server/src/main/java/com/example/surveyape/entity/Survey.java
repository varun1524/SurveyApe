package com.example.surveyape.entity;

import com.example.surveyape.view.*;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonView;
import org.hibernate.annotations.GenericGenerator;
import javax.persistence.*;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

@Entity
public class Survey {

	
    @JsonView({SurveyView.summary.class, SurveyListView.summary.class, ResponseView.summary.class})
    @JsonProperty("survey_id")
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String surveyId;

    @JsonView({SurveyView.summary.class,SurveyListView.summary.class})
    @JsonProperty("survey_name")
    private String surveyName;

    @JsonProperty("survey_type")
    @JsonView({SurveyView.summary.class,SurveyListView.summary.class})
    private String surveyType;

    @JsonProperty("creation_date")
    @JsonView({SurveyView.summary.class})
    private Date creationDate;

    @JsonProperty("update_date")
    @JsonView({SurveyView.summary.class})
    private Date updateDate;

    @JsonProperty("publish_date")
    @JsonView({SurveyView.summary.class})
    private Date publishDate;

    @JsonProperty("ispublished")
    @JsonView({SurveyView.summary.class,SurveyListView.summary.class})
    private Boolean isPublished;

    @JsonProperty("end_date")
    @JsonView({SurveyView.summary.class})
    private Date surveyEndDate;

    @JsonView({SurveyView.summary.class})
    @JsonProperty("email")
    @ManyToOne(targetEntity = User.class, cascade = {CascadeType.PERSIST})
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    @JsonProperty("questions")
    @JsonView({SurveyView.summary.class})
    @OneToMany(mappedBy = "survey", cascade = {CascadeType.ALL})
    private List<Question> questions;

    @JsonProperty("survey_responses")
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
        if(this.questions==null){
            return new LinkedList<>();
        }
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }

    public List<SurveyResponse> getSurveyResponses() {
        if(this.surveyResponses==null){
            return new LinkedList<>();
        }
        return surveyResponses;
    }

    public void setSurveyResponses(List<SurveyResponse> surveyResponses) {
        this.surveyResponses = surveyResponses;
    }

    public Boolean getPublished() {
        return isPublished;
    }

    public void setPublished(Boolean published) {
        isPublished = published;
    }
}
