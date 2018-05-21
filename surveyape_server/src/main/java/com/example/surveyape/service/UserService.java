package com.example.surveyape.service;

import com.example.surveyape.repository.UserRepository;
import com.example.surveyape.utils.MailUtility;
import com.example.surveyape.utils.UserUtility;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.surveyape.entity.Survey;
import com.example.surveyape.entity.User;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    MailService mailService;

    public User findByEmailAndPassword(String email, String password){
        User user = null;
        try{
            user = userRepository.findByEmailAndPassword(email, password);
        }
        catch (Exception e){
            throw e;
        }
        return user;
    }

    public User findByEmail(String email){
        User user = null;
        try{
            user = userRepository.findByEmail(email);
        }
        catch (Exception e){
            throw e;
        }
        return user;
    }

    public User findBy(String email){
        User user = null;
        try{
            user = userRepository.findByEmail(email);
        }
        catch (Exception e){
            throw e;
        }
        return user;
    }

    public User registerUser(User user){
        User user1 = null;
        try{
            if(userRepository.findByEmail(user.getEmail())==null)
                user1 = userRepository.save(user);
        }
        catch (Exception e){
            throw e;
        }
        return user1;
    }

    public int verifyUserAccount(Integer code) {
        User user = userRepository.findByVerificationcode(code);
        int status = UserUtility.USER_NOT_FOUND;
        try{
            if(user!=null && !user.getVerified()){
                user.setVerified(true);
                userRepository.save(user);
                mailService.sendEmail(user.getEmail(), MailUtility.verificationSuccessfulMessage,
                        "Account Verification Successful");
                status = UserUtility.SUCCESSFULLY_VERIFIED;
            }
            else if(user.getVerified()){
                status = UserUtility.ALREADY_VERIFIED;
            }
        }
        catch (Exception e){
            throw e;
        }
        return status;
    }
    
    public List<Survey> getAllUserSurvey(String email) {
		List<Survey> surveyList = null;
		User user = userRepository.findByEmail(email);
		surveyList = user.getSurveyList();
		return surveyList;

	}
}
