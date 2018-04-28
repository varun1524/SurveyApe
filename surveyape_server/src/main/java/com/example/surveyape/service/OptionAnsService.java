package com.example.surveyape.service;

import com.example.surveyape.repository.OptionAnsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OptionAnsService {
    @Autowired
    OptionAnsRepository optionAnsRepository;

    @Transactional
    public int deleteOption(String questionId){
        return optionAnsRepository.deleteByOptionId(questionId);
    }
}
