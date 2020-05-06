package com.self.learning.jwtAuthApp.repository;

import com.self.learning.jwtAuthApp.models.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CountryRepository extends JpaRepository<Country,Integer> {

    List<Country> findAll();

}
