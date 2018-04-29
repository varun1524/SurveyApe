package com.example.surveyape.entity;

import com.example.surveyape.view.SurveyView;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.*;
import java.util.List;

@Entity
public class Question {

    @JsonProperty("question_id")
    @JsonView({SurveyView.summary.class})
    @Id
    private String questionId;

    @JsonProperty("question_type")
    @JsonView({SurveyView.summary.class})
    private String questionType;

    @ManyToOne(targetEntity = Survey.class, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "surveyId", nullable = false)
    private Survey survey;

    @JsonProperty("question_text")
    @JsonView({SurveyView.summary.class})
    private String questionText;

    @JsonView({SurveyView.summary.class})
    private Boolean isMultipleChoice;

    @JsonView({SurveyView.summary.class})
    @OneToMany(mappedBy = "question", cascade = {CascadeType.ALL})
    private List<OptionAns> options;

    @OneToMany(mappedBy = "question", cascade = {CascadeType.PERSIST})
    private List<ResponseAnswers> responseAnswers;

    public String getQuestionId() {
        return questionId;
    }

    public void setQuestionId(String questionId) {
        this.questionId = questionId;
    }

    public String getQuestionType() {
        return questionType;
    }

    public void setQuestionType(String questionType) {
        this.questionType = questionType;
    }

    public Survey getSurvey() {
        return survey;
    }

    public void setSurvey(Survey survey) {
        this.survey = survey;
    }

    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public List<OptionAns> getOptions() {
        return options;
    }

    public void setOptions(List<OptionAns> options) {
        this.options = options;
    }

    public List<ResponseAnswers> getResponseAnswers() {
        return responseAnswers;
    }

    public void setResponseAnswers(List<ResponseAnswers> responseAnswers) {
        this.responseAnswers = responseAnswers;
    }

    public Boolean getMultipleChoice() {
        return isMultipleChoice;
    }

    public void setMultipleChoice(Boolean multipleChoice) {
        isMultipleChoice = multipleChoice;
    }
}
