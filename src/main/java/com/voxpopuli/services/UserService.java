package com.voxpopuli.services;

import com.voxpopuli.repositories.UserRepository;
import com.voxpopuli.voxpopuli.User;

import org.mindrot.jbcrypt.BCrypt;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    public boolean authenticate(String username, String password) {
        User user = userRepository.findByUsername(username);
        return user != null && BCrypt.checkpw(password, user.getHashedPwd());
    }

    public boolean addUser(String username, String password) {
        if (userRepository.findByUsername(username) != null) {
            return false;
        }
        User newUser = new User(username, password);
        userRepository.save(newUser);
        return true;
    }

    public boolean resetPassword(String username, String oldPassword, String newPassword) {
        User user = userRepository.findByUsername(username);
        if (user != null && BCrypt.checkpw(oldPassword, user.getHashedPwd())) {
            user.setHashedPwd(BCrypt.hashpw(newPassword, BCrypt.gensalt()));
            userRepository.save(user);
            return true;
        }
        return false;
    }
}
