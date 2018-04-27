package com.example.surveyape.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;

@Entity
public class Question {

    @Id
//    @GeneratedValue(generator = "uuid")
//    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String questionId;

    private String questionType;

    @ManyToOne(targetEntity = Survey.class, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "surveyId", nullable = false)
    private Survey survey;

    private String questionText;

    @OneToMany(mappedBy = "question")
    private List<AnswerOptions> answerOptions;

    @OneToMany(mappedBy = "question")
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

    public List<AnswerOptions> getAnswerOptions() {
        return answerOptions;
    }

    public void setAnswerOptions(List<AnswerOptions> answerOptions) {
        this.answerOptions = answerOptions;
    }

    public List<ResponseAnswers> getResponseAnswers() {
        return responseAnswers;
    }

    public void setResponseAnswers(List<ResponseAnswers> responseAnswers) {
        this.responseAnswers = responseAnswers;
    }
}
