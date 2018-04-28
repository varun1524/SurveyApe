package com.example.surveyape.entity;

import org.hibernate.annotations.GenericGenerator;
import javax.persistence.*;
import java.util.List;


@Entity
public class Invitees {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String inviteId;

    @ManyToOne(targetEntity = User.class, cascade = {CascadeType.ALL})
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    @ManyToOne(targetEntity = Survey.class, cascade = {CascadeType.ALL})
    @JoinColumn(name = "surveyId", nullable = false)
    private Survey survey;

    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String surveyToken;

    public String getInviteId() {
        return inviteId;
    }

    public void setInviteId(String inviteId) {
        this.inviteId = inviteId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Survey getSurvey() {
        return survey;
    }

    public void setSurvey(Survey survey) {
        this.survey = survey;
    }

    public String getSurveyToken() {
        return surveyToken;
    }

    public void setSurveyToken(String surveyToken) {
        this.surveyToken = surveyToken;
    }
}
