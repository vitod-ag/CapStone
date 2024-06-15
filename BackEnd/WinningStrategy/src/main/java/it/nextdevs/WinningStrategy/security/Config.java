package it.nextdevs.WinningStrategy.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
@EnableWebMvc
@EnableMethodSecurity
public class Config implements WebMvcConfigurer {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.formLogin(AbstractHttpConfigurer::disable);
        httpSecurity.csrf(AbstractHttpConfigurer::disable);
        httpSecurity.sessionManagement(http -> http.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        httpSecurity.cors(Customizer.withDefaults());

//        httpSecurity.authorizeHttpRequests(http -> http.requestMatchers(HttpMethod.GET,"/api/users").permitAll());
//      httpSecurity.authorizeHttpRequests(http -> http.requestMatchers("/**").denyAll());

        httpSecurity.authorizeHttpRequests(http -> http.requestMatchers("/api/**").permitAll());

        httpSecurity.authorizeHttpRequests(http -> http.requestMatchers("/**").permitAll());

        return httpSecurity.build();
    }
}
