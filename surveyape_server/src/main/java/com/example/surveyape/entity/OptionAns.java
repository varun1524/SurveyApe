package com.example.surveyape.entity;

import com.example.surveyape.view.BasicStatsView;
import com.example.surveyape.view.ResDistributionStatsView;
import com.example.surveyape.view.SurveyAndResponseView;
import com.example.surveyape.view.SurveyView;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonView;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
public class OptionAns {

    @JsonProperty("option_id")
    @Id
//    @GeneratedValue(generator = "uuid")
//    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @JsonView({SurveyView.summary.class, SurveyAndResponseView.summary.class,ResDistributionStatsView.summary.class})
    private String optionId;

    @ManyToOne(targetEntity = Question.class, cascade = {CascadeType.PERSIST})
    @JoinColumn(name = "questionId", nullable = false)
    private Question question;

    @Lob
    @JsonProperty("option_text")
    @JsonView({SurveyView.summary.class, SurveyAndResponseView.summary.class,BasicStatsView.summary.class,ResDistributionStatsView.summary.class})
    private String optionText;

    //TODO: text/image
    @JsonProperty("option_type")
    @JsonView({SurveyView.summary.class, SurveyAndResponseView.summary.class,ResDistributionStatsView.summary.class})
    private String optionType;

    public String getOptionId() {
        return optionId;
    }

    public void setOptionId(String optionId) {
        this.optionId = optionId;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public String getOptionText() {
        return optionText;
    }

    public void setOptionText(String optionText) {
        this.optionText = optionText;
    }

    public String getOptionType() {
        return optionType;
    }

    public void setOptionType(String optionType) {
        this.optionType = optionType;
    }


}
