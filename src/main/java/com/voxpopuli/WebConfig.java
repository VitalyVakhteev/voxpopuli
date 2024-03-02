package com.voxpopuli;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Configuration class for the web application.
 * This class implements the WebMvcConfigurer interface to customize the Java-based configuration for Spring MVC.
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    /**
     * Method to add CORS mappings.
     * This method is overridden to define a global CORS configuration for all origins, methods, and headers.
     *
     * @param registry The CorsRegistry to which CORS mappings are to be added.
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*") // Unsecure but will do
                .allowedMethods("GET", "POST", "PUT", "OPTIONS")
//                .allowedHeaders("Authorization", "Content-Type", "X-Requested-With", "XMLHttpRequest")
                .maxAge(3600);
//                .allowCredentials(true); // Todo: Credentials if moderation is to be added
    }
}