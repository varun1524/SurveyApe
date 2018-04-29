package com.example.surveyape.repository;

import com.example.surveyape.entity.Survey;
import com.example.surveyape.entity.User;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    User findByEmail(String email);

    User findByEmailAndPassword(String email, String password);

    User findByVerificationcode(Integer code);
    
}
