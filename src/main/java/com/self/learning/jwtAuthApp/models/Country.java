package com.self.learning.jwtAuthApp.models;


import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@NoArgsConstructor
@Data
@Entity
public class Country  implements Serializable {

    @Id
    private int countryId;

    @Column(name = "COUNTRY_CODE")
    private String code;

    private String countryName;

    @OneToMany(mappedBy = "country")
    private List<State> stateList;
}
