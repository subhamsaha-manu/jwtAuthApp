package com.self.learning.jwtAuthApp.repository;

import com.self.learning.jwtAuthApp.models.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StateRepository extends JpaRepository<State,Integer> {

    List findAllByCountryCode(String countryCode);
}
