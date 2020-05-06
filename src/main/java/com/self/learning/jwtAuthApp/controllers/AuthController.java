package com.self.learning.jwtAuthApp.controllers;

import com.self.learning.jwtAuthApp.models.Requests.LoginRequest;
import com.self.learning.jwtAuthApp.models.Requests.SignupRequest;
import com.self.learning.jwtAuthApp.models.Response.JwtResponse;
import com.self.learning.jwtAuthApp.models.Users;
import com.self.learning.jwtAuthApp.repository.UserRepository;
import com.self.learning.jwtAuthApp.services.UserDetailsImpl;
import com.self.learning.jwtAuthApp.utility.JwtUtils;
import com.self.learning.jwtAuthApp.utility.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*",maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @Value("${secret.key}")
    private String secretKey;

    @Value("${expiration}")
    private int jwtExpirationTime;


    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, HttpServletRequest request) {

        System.out.println("req url for signin"+loginRequest.toString());
        String userName = Utils.extractUserNameFromEmail(loginRequest.getEmail());
        Authentication authentication = authenticationManager.authenticate(
                     new UsernamePasswordAuthenticationToken(userName, loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(userName);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        System.out.println("Jwt created "+jwt);
        Map responseBody = new HashMap();
        responseBody.put("id",userDetails.getId());
        responseBody.put("email",userDetails.getEmail());
        responseBody.put("jwtToken",jwt);
        responseBody.put("expirationTime",jwtExpirationTime);

        return new ResponseEntity (responseBody,null,HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest, HttpServletRequest request) {
        System.out.println("Signup "+ signUpRequest.toString());

        String userName = Utils.extractUserNameFromEmail(signUpRequest.getEmail());
        if (userRepository.existsByUsername(userName)) {
            return ResponseEntity
                    .badRequest()
                    .body("Error: Username is already taken!");
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body("Error: Email is already in use!");
        }

        // Create new user's account
        Users user = new Users(signUpRequest.getFirstName(),
                signUpRequest.getMiddleName(),
                signUpRequest.getLastName(),
                userName,
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()),
                signUpRequest.getMobileNumber());

        userRepository.save(user);
        System.out.println("Id of signed up user is "+user.getId());
        String jwt = jwtUtils.generateJwtToken(userName);
        HashMap responseBody = new HashMap();
        responseBody.put("id",user.getId());
        responseBody.put("mail",signUpRequest.getEmail());
        responseBody.put("jwtToken",jwt);
        responseBody.put("expirationTime",jwtExpirationTime);

        return new ResponseEntity(responseBody,null, HttpStatus.OK);
    }
}
