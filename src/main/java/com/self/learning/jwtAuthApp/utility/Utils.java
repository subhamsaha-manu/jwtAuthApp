package com.self.learning.jwtAuthApp.utility;


public class Utils {

    public static String extractUserNameFromEmail(String email){
        String userName = email.substring(0,email.indexOf('@'));
        return userName;
    }
}
