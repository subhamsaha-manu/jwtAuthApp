package com.self.learning.jwtAuthApp.services;

import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public interface UtilityService {

    public HashMap<String,String> getListOfCountries();
    public HashMap<String,String> getStateListForSelectedCountry(String countryCode);
}
