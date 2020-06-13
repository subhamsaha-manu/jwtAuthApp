package com.self.learning.jwtAuthApp.services;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.self.learning.jwtAuthApp.models.Users;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Objects;


public class UserDetailsImpl implements UserDetails {

    private static final long serialVersionUID = 1L;

    private String id= StringUtils.EMPTY;

    private String firstName = StringUtils.EMPTY;

    private String middleName = StringUtils.EMPTY;

    private String lastName = StringUtils.EMPTY;

    private String username = StringUtils.EMPTY;

    private String email = StringUtils.EMPTY;

    private long mobileNumber = 0;

    @JsonIgnore
    private String password;

    public UserDetailsImpl(String id,
                           String firstName,
                           String middleName,
                           String lastName,
                           String username,
                           String email,
                           long mobileNumber,
                           String password) {
        this.id = id;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.mobileNumber = mobileNumber;
        this.password = password;
    }

    public static UserDetailsImpl build(Users user) {

        return new UserDetailsImpl(
                user.getId(),
                user.getFirstName(),
                user.getMiddleName(),
                user.getLastName(),
                user.getUsername(),
                user.getEmail(),
                user.getMobileNumber(),
                user.getPassword());
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    public String getEmail(){return email;}

    public String getId() { return id;}

    public String getFirstName() {
        return firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public String getLastName() {
        return lastName;
    }

    public long getMobileNumber() {
        return mobileNumber;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        UserDetailsImpl user = (UserDetailsImpl) o;
        return Objects.equals(id, user.id);
    }
}
