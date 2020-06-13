package com.self.learning.jwtAuthApp.models;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@Data
@Entity
public class State {

    @Id
    private int stateId;

    private String stateCode;

    private String stateName;

    @ManyToOne
    @JoinColumn(name = "COUNTRY_CODE",referencedColumnName = "COUNTRY_CODE")
    private Country country;
}
