package com.example.surveyape.controller;

import com.example.surveyape.entity.User;
import com.example.surveyape.service.MailService;
import com.example.surveyape.service.UserService;
import com.example.surveyape.utils.MailUtility;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RestController
@CrossOrigin(origins = "*", allowCredentials = "true")
@RequestMapping(path = "/user")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    MailService mailService;

    @PostMapping(path = "/signup")
    public ResponseEntity signup(@RequestBody String body){
        ResponseEntity responseEntity = new ResponseEntity(null, HttpStatus.BAD_REQUEST);
        try {
            JSONObject jsonObject = new JSONObject(body);
            User user = new User(jsonObject.getString("email"), jsonObject.getString("firstname"), jsonObject.getString("lastname"), jsonObject.getString("password"));
            user = userService.registerUser(user);
            if(user!=null){
                String msgBody = MailUtility.createVerificationMsg(user.getVerificationCode());
                mailService.sendEmail(user.getEmail(),msgBody," Verify Account");
                responseEntity = new ResponseEntity(user, HttpStatus.OK);
            }
            else{
                responseEntity = new ResponseEntity(user, HttpStatus.FOUND);
            }
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return responseEntity;
    }

    @PostMapping(path = "/login")
    public ResponseEntity login(@RequestBody String body, HttpSession httpSession){
        ResponseEntity responseEntity = new ResponseEntity(null, HttpStatus.BAD_REQUEST);
        try{
            JSONObject jsonObject = new JSONObject(body);
            User user = userService.findByEmail(jsonObject.getString("email"));
            if(user!=null){
                //TODO: put verified check
                if(user.getPassword().equals(jsonObject.getString("password"))){
                    httpSession.setAttribute("email", jsonObject.getString("email"));
                    jsonObject = new JSONObject(user);
                    jsonObject.remove("password");
                    jsonObject.remove("verificationCode");
                    jsonObject.remove("verified");
                    System.out.println(jsonObject);
                    responseEntity = new ResponseEntity(jsonObject.toString(), HttpStatus.OK);
                }
            }
            else{
                responseEntity = new ResponseEntity(null, HttpStatus.NOT_FOUND);
            }
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return responseEntity;
    }

    @PostMapping(path = "/logout")
    public ResponseEntity logout(HttpSession httpSession){
        ResponseEntity responseEntity = new ResponseEntity(null, HttpStatus.BAD_REQUEST);
        try{
            httpSession.removeAttribute("email");
            responseEntity = new ResponseEntity(null, HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return responseEntity;
    }

    @PostMapping(path = "/validateSession")
    public ResponseEntity validateSession(HttpSession session){
        ResponseEntity responseEntity = null;
        try{
            System.out.println(session.getAttribute("email"));
            if (session.getAttribute("email") == null) {
                responseEntity = new ResponseEntity(null, HttpStatus.NOT_FOUND);
            } else {
                JSONObject jsonObject = new JSONObject();
                jsonObject.append("email", session.getAttribute("email"));
                responseEntity = new ResponseEntity(jsonObject.toString(), HttpStatus.OK);
            }
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return responseEntity;
    }
}
