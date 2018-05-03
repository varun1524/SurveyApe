package com.example.surveyape.entity;

import com.example.surveyape.view.SurveyView;
import com.example.surveyape.view.UserView;
import com.fasterxml.jackson.annotation.JsonView;
import org.hibernate.annotations.GenericGenerator;
import javax.persistence.*;
import java.util.*;

@Entity
public class User {

    @JsonView({UserView.summary.class})
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String userId;

    @JsonView({UserView.summary.class, SurveyView.summary.class})
    @Column(unique = true, nullable = false)
    private String email;

    @JsonView({UserView.summary.class})
    private String firstname;

    @JsonView({UserView.summary.class})
    private String lastname;

    private String password;

    private Integer verificationcode;

    @JsonView({UserView.summary.class})
    private Boolean verified;

    @OneToMany(mappedBy = "user", cascade = {CascadeType.ALL })
    private List<Survey> surveyList;

    /*@OneToMany(mappedBy = "user", cascade = {CascadeType.ALL})
    private List<Invitees> invitees;*/

    @OneToMany(mappedBy = "user", cascade = {CascadeType.ALL})
    private List<SurveyResponse> surveyResponses;

    public void setVerificationCode(Integer verificationcode) {
        this.verificationcode = verificationcode;
    }

    public void setVerified(Boolean verified) {
        this.verified = verified;
    }

    public Integer getVerificationcode() {
        return verificationcode;
    }

    public Boolean getVerified() {
        return verified;
    }

    public User(){}

    public User(String email, String firstname, String lastname, String password){
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
        this.password = password;
        this.verificationcode = (int)((Math.random() * 99999)+100000);
        this.verified = false;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setVerificationcode(Integer verificationcode) {
        this.verificationcode = verificationcode;
    }

    public List<Survey> getSurveyList() {
    	if(this.surveyList == null) {
    		return new LinkedList<Survey>();
    	}
        return surveyList;
    }

    public void setSurveyList(List<Survey> surveyList) {
        this.surveyList = surveyList;
    }

    /*public List<Invitees> getInvitees() {
        return invitees;
    }

    public void setInvitees(List<Invitees> invitees) {
        this.invitees = invitees;
    }*/

    public List<SurveyResponse> getSurveyResponses() {
        return surveyResponses;
    }

    public void setSurveyResponses(List<SurveyResponse> surveyResponses) {
        this.surveyResponses = surveyResponses;
    }
}
