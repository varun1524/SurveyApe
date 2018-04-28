package com.example.surveyape.service;

import com.example.surveyape.repository.UserRepository;
import com.example.surveyape.utils.UserUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.surveyape.entity.User;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

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

    public Integer verifyUserAccount(Integer code){
        User user = userRepository.findByVerificationcode(code);
        if(user == null){
            return UserUtility.USER_NOT_FOUND;
        }else if(user.getVerified()){
            return UserUtility.ALREADY_VERIFIED;
        }else{
            user.setVerified(true);
            userRepository.save(user);
            return UserUtility.SUCCESSFULLY_VERIFIED;
        }

    }
}
