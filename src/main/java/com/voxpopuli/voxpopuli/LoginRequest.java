package com.voxpopuli.voxpopuli;

import lombok.Getter;
import lombok.Setter;

/**
 * Class representing a login request.
 * This class is used when a user attempts to log in, containing their username and password.
 */
@Setter
@Getter
public class LoginRequest {
    private String username;
    private String password;

    /**
     * Default constructor for LoginRequest.
     */
    public LoginRequest() {
    }

}