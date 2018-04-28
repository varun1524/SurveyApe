package com.example.surveyape.repository;

import com.example.surveyape.entity.OptionAns;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OptionAnsRepository extends JpaRepository<OptionAns, String> {
    int deleteByOptionId(String id);
}
