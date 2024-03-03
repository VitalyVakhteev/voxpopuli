package com.voxpopuli.voxpopuli;

import lombok.Getter;

/**
 * Class representing a registration request.
 * This class is used when a new user attempts to register, containing their username, password, and password confirmation.
 */
@Getter
public class RegisterRequest {
    private final String username;
    private final String password;
    private final String confirmPassword;

    /**
     * Constructor for RegisterRequest.
     *
     * @param username The desired username of the user attempting to register.
     * @param password The desired password of the user attempting to register.
     * @param confirmPassword The confirmation of the desired password.
     */
    public RegisterRequest(String username, String password, String confirmPassword) {
        this.username = username;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }
}