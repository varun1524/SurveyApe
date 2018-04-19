package com.example.surveyape.controller;

import com.example.surveyape.entity.User;
import com.example.surveyape.service.UserService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin(origins = "*")
@RequestMapping(path = "/user")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping(path = "/signUp")
    public ResponseEntity signup(@RequestBody String body){
        JSONObject jsonObject = new JSONObject(body);
        User user = new User(jsonObject.getString("email"), jsonObject.getString("firstname"), jsonObject.getString("lastname"), jsonObject.getString("password"));
        return userService.saveUser(user);
    }

    @PostMapping(path = "/login")
    public ResponseEntity login(@RequestBody String body){
        JSONObject jsonObject = new JSONObject(body);
        return userService.findByEmailAndPassword(jsonObject.getString("email"), jsonObject.getString("password"));
    }
}
