package com.example.surveyape.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpSession;

@Aspect
@Component
public class SessionAOPAspect {

    @Around("execution(public * com.example.surveyape.controller.SurveyController.*(..))")
    public ResponseEntity<Object> validateSessionaop(ProceedingJoinPoint joinPoint) throws Throwable{
        System.out.println("In AOP");
        System.out.println(joinPoint.getSignature().getName());
        ResponseEntity responseEntity = new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
//            for (Object o : joinPoint.getArgs()) {
//                System.out.println(o.toString());
//            }
        for (Object o : joinPoint.getArgs()) {
            if(o instanceof HttpSession){
                Object sesionObj = ((HttpSession) o).getAttribute("email");
                if(sesionObj!=null){
                    System.out.println("Session Email: " + sesionObj.toString());
                    responseEntity  = (ResponseEntity)joinPoint.proceed();
                }
                else {
                    responseEntity = new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
                    System.out.println("Session does not exists. Request Unsuccessful");
//                    throw new Exception("Session does not exists. Request Unsuccessful");
                }
            }
        }
        return responseEntity;
    }
}
