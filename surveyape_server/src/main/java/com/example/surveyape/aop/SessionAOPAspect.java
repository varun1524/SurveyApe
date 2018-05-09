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

//    @Pointcut("(execution(public * com.example.surveyape.controller.SurveyController.*(org.springframework.http.HttpStatus,..)) && args(session,..)) " +
//            " || (execution(public * com.example.surveyape.controller.UserController.getUserSurveyList(org.springframework.http.HttpStatus,..)) && args(session,..)))" )
//    public void sessionCheck(HttpSession session) {}

    @Pointcut("" +
            "(execution(public * com.example.surveyape.controller.StatisticController.*(..,javax.servlet.http.HttpSession)) && args(..,session))  " +
            " || " +
            "(execution(public * com.example.surveyape.controller.SurveyController.*(..,javax.servlet.http.HttpSession)) && args(..,session)) " +
            " || " +
            "(execution(public * com.example.surveyape.controller.UserController.getUserSurveyList(..,javax.servlet.http.HttpSession)) && args(..,session))"
    )
    public void sessionCheck(HttpSession session) {}

//    @Pointcut("execution(public * com.example.surveyape.controller.SurveyController.createSurvey(..)) " +
//            " || execution(public * com.example.surveyape.controller.SurveyController.closeSurvey(..)) " +
//            " || execution(public * com.example.surveyape.controller.SurveyController.deleteoption(..)) " +
//            " || execution(public * com.example.surveyape.controller.SurveyController.deleteQuestion(..)) " +
//            " || execution(public * com.example.surveyape.controller.SurveyController.deleteSurvey(..)) " +
//            " || execution(public * com.example.surveyape.controller.SurveyController.publishSurvey(..)) " +
//            " || execution(public * com.example.surveyape.controller.SurveyController.saveEndSurvey(..)) " +
//            " || execution(public * com.example.surveyape.controller.SurveyController.shareSurvey(..)) " +
//            " || execution(public * com.example.surveyape.controller.SurveyController.updateSurvey(..)) " +
//            " || execution(public * com.example.surveyape.controller.UserController.getUserSurveyList(..)) " )




    @Around("sessionCheck(session)")
    public ResponseEntity<Object> validateSessionaop(ProceedingJoinPoint joinPoint, HttpSession session) throws Throwable{
        System.out.println("SessionAOPAspect: " + joinPoint.getSignature().getName());
        ResponseEntity responseEntity = new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        for (Object o : joinPoint.getArgs()) {
            if(o instanceof HttpSession){
                Object sesionObj = ((HttpSession) o).getAttribute("email");
                if(sesionObj!=null){
                    System.out.println("Session Email: " + sesionObj.toString());
                    responseEntity  = (ResponseEntity)joinPoint.proceed();
                }
                else {
                    responseEntity = new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
                    System.out.println("Session does not exists. Request Unsuccessful");
//                    throw new Exception("Session does not exists. Request Unsuccessful");
                }
            }
        }
        return responseEntity;
    }
}
