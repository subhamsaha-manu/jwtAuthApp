package com.self.learning.jwtAuthApp.services;


import com.self.learning.jwtAuthApp.models.Country;
import com.self.learning.jwtAuthApp.models.State;
import com.self.learning.jwtAuthApp.repository.CountryRepository;
import com.self.learning.jwtAuthApp.repository.StateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UtilityService {

    @Autowired
    CountryRepository countryRepository;

    @Autowired
    StateRepository stateRepository;

    @Autowired
    DataSource dataSource;

    public HashMap<String,String> getListOfCountries(){

        Map<String,String> mapOfCountries = new HashMap<>();
        List<Country> listOfCountries = countryRepository.findAll();
        listOfCountries.forEach(ele ->{
            mapOfCountries.put(ele.getCountryCode(),ele.getCountryName());
            System.out.println("Service "+ele.getCountryCode());
        });

        return (HashMap)mapOfCountries;
    }

    public HashMap<String,String> getStateListForSelectedCountry(String countryCode){

        Map<String,String> mapOfStates = new HashMap<>();
        List<State> listOfStates = stateRepository.findAllByCountryCode(countryCode);
        listOfStates.forEach(ele ->{
            mapOfStates.put(ele.getStateCode(),ele.getStateName());
            System.out.println("Service State name "+ele.getStateCode());
        });

        return (HashMap)mapOfStates;
    }
}
