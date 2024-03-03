package com.voxpopuli.controllers;

import com.voxpopuli.services.UserService;
import com.voxpopuli.voxpopuli.LoginRequest;
import com.voxpopuli.voxpopuli.RegisterRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        boolean isAuthenticated = userService.authenticate(loginRequest.getUsername(), loginRequest.getPassword());
        if (isAuthenticated) {
            return ResponseEntity.ok().body("User authenticated");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) {
        if (!registerRequest.getPassword().equals(registerRequest.getConfirmPassword())) {
            return ResponseEntity.badRequest().body("Passwords do not match");
        }
        boolean userAdded = userService.addUser(registerRequest.getUsername(), registerRequest.getPassword());
        if (userAdded) {
            return ResponseEntity.ok().body("User registered successfully");
        } else {
            return ResponseEntity.badRequest().body("Username already exists");
        }
    }
}
