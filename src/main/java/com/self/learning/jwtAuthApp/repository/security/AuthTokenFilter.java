package com.self.learning.jwtAuthApp.repository.security;

import com.self.learning.jwtAuthApp.services.UserDetailsServiceImpl;
import com.self.learning.jwtAuthApp.utility.JwtUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


public class AuthTokenFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    private static final Logger logger = LoggerFactory.getLogger(AuthTokenFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        try{
            String jwt = parseJwt(request);
            System.out.println("Jwt in AuthTokenFilter "+jwt);
            if(jwt != null && jwtUtils.validateJwtToken(jwt)){
                String userName = jwtUtils.getUserNameFromJwtToken(jwt);
                System.out.println("userName in AuthTokenFilter "+userName);
                UserDetails userDetails = userDetailsService.loadUserByUsername(userName);
                System.out.println("=========================================================");
                System.out.println("User details in auth token filter"+userDetails.getUsername()+"\t"+userDetails.isAccountNonLocked());
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
                System.out.println("=========================================================");
                System.out.println("=========================================================");
                System.out.println("Request in auth token "+request.getRequestURI());
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                response.setHeader("Access-Control-Allow-Origin", "*");
                response.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE, PATCH");
                response.setHeader("Access-Control-Max-Age", "3600");
                response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                response.setHeader("Access-Control-Expose-Headers", "Location");
            }
        }catch (Exception e){
            logger.error("Cannot set user authentication: {} ",e);
        }

        filterChain.doFilter(request,response);
    }



    private String parseJwt(HttpServletRequest request){
        String headerAuth = request.getHeader("Authorization");

        if(StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")){
            return headerAuth.substring(7,headerAuth.length());
        }

        return null;
    }

}
