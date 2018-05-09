package com.example.surveyape.service;

import com.example.surveyape.utils.QRCodeUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import javax.mail.internet.MimeMessage;
import java.awt.image.BufferedImage;
import java.io.File;
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

    public void sendEmail(String recipient, String msgBody, String subject, String url) throws MailException {
        try{
            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
            simpleMailMessage.setTo(recipient);
            simpleMailMessage.setSubject(subject);
            simpleMailMessage.setSentDate(new Date());
            simpleMailMessage.setText(msgBody);

            MimeMessage message = mailSender.createMimeMessage();

            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(simpleMailMessage.getTo());
            helper.setSubject(simpleMailMessage.getSubject());
            helper.setText(msgBody);

            QRCodeUtility qrCodeUtility = new QRCodeUtility();
            BufferedImage bufferedImage = qrCodeUtility.createQRCodeImage(url);

            File outputfile = new File("./temp/QRCode.png");
            ImageIO.write(bufferedImage, "png", outputfile);

            helper.addAttachment("QRCode.png", outputfile);

            mailSender.send(message);

        }
        catch (Exception e){
            e.printStackTrace();
        }
    }
}
