package com.ricesnack.GrowIT_BE.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Configuration;

import jakarta.annotation.PostConstruct;

@Configuration
public class DotenvConfig {

    @PostConstruct
    public void loadEnv() {
        try {
            String activeProfile = System.getProperty("spring.profiles.active", "local");

            String envFile = ".env." + activeProfile;

            Dotenv dotenv = Dotenv.configure()
                    .filename(envFile)
                    .ignoreIfMissing()
                    .load();

            dotenv.entries().forEach(entry -> {
                System.setProperty(entry.getKey(), entry.getValue());
            });
        } catch (Exception e) {
        }
    }
}
