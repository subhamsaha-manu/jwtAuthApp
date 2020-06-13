package com.self.learning.jwtAuthApp.controllers;


import com.self.learning.jwtAuthApp.services.UtilityServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/utilities")
public class UtilityController {

    @Autowired
    UtilityServiceImpl utilityService;


    @GetMapping("/countries")
    public ResponseEntity<?> getCountries(){
        HashMap<String,String> mapOfCountries = utilityService.getListOfCountries();

        return new ResponseEntity (mapOfCountries,null, HttpStatus.OK);
    }

    @GetMapping("/states")
    public ResponseEntity<?> getStatesForSelectedCountry(@RequestParam("selectedCountry") String selectedCountry){
        System.out.println("param "+selectedCountry);
        HashMap<String,String> mapOfStates = utilityService.getStateListForSelectedCountry(selectedCountry);

        return new ResponseEntity (mapOfStates,null, HttpStatus.OK);
    }
}
