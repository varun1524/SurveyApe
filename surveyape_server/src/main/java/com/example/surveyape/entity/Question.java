package com.example.surveyape.entity;


import com.example.surveyape.view.*;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonView;
import com.sun.org.apache.xpath.internal.operations.Bool;

import org.hibernate.annotations.GenericGenerator;
import javax.persistence.*;
import java.util.LinkedList;
import java.util.List;

@Entity
public class Question {
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @JsonProperty("question_id")
	@JsonView({ SurveyView.summary.class, ResponseView.summary.class , SurveyAndResponseView.summary.class, BasicStatsView.summary.class,ResDistributionStatsView.summary.class})
    @Id
    private String questionId;

    @JsonProperty("question_type")
    @JsonView({SurveyView.summary.class, SurveyAndResponseView.summary.class, BasicStatsView.summary.class,ResDistributionStatsView.summary.class})
    private String questionType;

    @ManyToOne(targetEntity = Survey.class, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "surveyId", nullable = false)
    private Survey survey;

    @JsonProperty("question_text")
    @JsonView({SurveyView.summary.class, SurveyAndResponseView.summary.class, BasicStatsView.summary.class,ResDistributionStatsView.summary.class})
    private String questionText;

    @JsonView({SurveyView.summary.class, SurveyAndResponseView.summary.class})
    private Boolean isMultipleChoice = false;

    @JsonView({SurveyView.summary.class, SurveyAndResponseView.summary.class,BasicStatsView.summary.class})
    @OneToMany(mappedBy = "question", cascade = {CascadeType.ALL})
    private List<OptionAns> options;

    @JsonView({BasicStatsView.summary.class})
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
        if(this.options==null){
            return new LinkedList<>();
        }
        return options;
    }

    public void setOptions(List<OptionAns> options) {
        this.options = options;
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

    public Boolean getMultipleChoice() {
        return isMultipleChoice;
    }

    public void setMultipleChoice(Boolean multipleChoice) {
        isMultipleChoice = multipleChoice;
    }


}
