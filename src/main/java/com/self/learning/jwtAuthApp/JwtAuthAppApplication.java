package com.self.learning.jwtAuthApp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;

import javax.sql.DataSource;
import java.sql.SQLException;

@SpringBootApplication
public class JwtAuthAppApplication {

	public static void main(String[] args) throws SQLException {
		SpringApplication.run(JwtAuthAppApplication.class, args);
		JwtAuthAppApplication jwt = new JwtAuthAppApplication();
		jwt.getDataSource().getConnection().prepareStatement("select * from country where country_id = 1").executeQuery().getNString("country_name");

	}

	@Bean
	public DataSource getDataSource(){
		return DataSourceBuilder.create()
				.url("jdbc:oracle:thin:@database-dev.c9zkwncnguh2.us-east-2.rds.amazonaws.com:1521/ORCL")
				.username("ADMIN")
				.password("MOTHEr1994!")
				.build();
	}


}
