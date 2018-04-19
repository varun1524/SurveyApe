package com.example.surveyape.service;

import com.example.surveyape.entity.User;
import com.example.surveyape.repository.UserRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public ResponseEntity saveUser(User user){
        ResponseEntity responseEntity = new ResponseEntity(null, HttpStatus.BAD_REQUEST);
        try{
            User user1 = userRepository.save(user);
            if(user1!=null){
                responseEntity = new ResponseEntity(user1, HttpStatus.OK);
            }
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return responseEntity;
    }

    public ResponseEntity findByEmailAndPassword(String email, String password){
        ResponseEntity responseEntity = new ResponseEntity(null, HttpStatus.BAD_REQUEST);
        try{
            User user = userRepository.findByEmailAndPassword(email, password);
            if(user!=null){
                JSONObject jsonObject = new JSONObject(user);
                jsonObject.remove("password");
                System.out.println(jsonObject);
                responseEntity = new ResponseEntity(jsonObject.toString(), HttpStatus.OK);
            }
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return responseEntity;
    }
}
