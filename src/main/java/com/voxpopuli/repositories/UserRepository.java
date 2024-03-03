package com.voxpopuli.repositories;

import com.voxpopuli.voxpopuli.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
