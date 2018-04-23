package com.example.surveyape.service;

import com.example.surveyape.entity.User;
import com.example.surveyape.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public User saveUser(User user){
        User user1 = null;
        try{
            user1 = userRepository.save(user);
        }
        catch (Exception e){
            throw e;
        }
        return user;
    }

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
            if(userRepository.findByEmail(user.getEmail())==null) {
                user1 = userRepository.save(user);
            }
        }
        catch (Exception e){
            throw e;
        }
        return user1;
    }
}

