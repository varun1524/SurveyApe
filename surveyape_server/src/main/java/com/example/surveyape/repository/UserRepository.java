package com.example.surveyape.repository;

import com.example.surveyape.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    @Override
    User getOne(String id);

    User findByEmailAndPassword(String email, String password);
}
