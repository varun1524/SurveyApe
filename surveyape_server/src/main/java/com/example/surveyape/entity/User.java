package com.example.surveyape.entity;

import org.hibernate.annotations.GenericGenerator;
import javax.persistence.*;

@Entity
public class User {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String userId;

    private String email;

    private String firstname;

    private String lastname;

    private String password;

    @Column(unique = true)
    private Integer verificationcode;

    private Boolean verified;

    public User(){}

    public User(String email, String firstname, String lastname, String password){
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
        this.password = password;
        this.verificationcode = (int)((Math.random() * 99999)+100000);
        this.verified = false;
    }
    public String toString(){
        return "User : [firstname: "+this.firstname+" lastname: "+this.lastname+" email: "+this.email+"]";
    }
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
}
