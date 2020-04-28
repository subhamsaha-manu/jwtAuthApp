package com.self.learning.jwtAuthApp.models.Requests;

import org.apache.commons.lang3.StringUtils;

public class SignupRequest {

    private String firstName = StringUtils.EMPTY;
    private String middleName = StringUtils.EMPTY;
    private String lastName =  StringUtils.EMPTY;
    private long mobileNumber = 0;
    private String email  =  StringUtils.EMPTY;
    private String password  =  StringUtils.EMPTY;

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public long getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(long mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "SignupRequest{" +
                "firstName='" + firstName + '\'' +
                ", middleName='" + middleName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", mobileNumber=" + mobileNumber +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
