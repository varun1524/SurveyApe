package com.example.surveyape.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import java.util.*;


@Service
public class MailService {
    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String recipient, String msgBody, String subject) throws MailException {

        SimpleMailMessage sMailMessage = new SimpleMailMessage();
        sMailMessage.setTo(recipient);
        sMailMessage.setSubject(subject);
        sMailMessage.setSentDate(new Date());
        sMailMessage.setText(msgBody);

        mailSender.send(sMailMessage);
    }
}
