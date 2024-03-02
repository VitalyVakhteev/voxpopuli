package com.voxpopuli.voxpopuli;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.mindrot.jbcrypt.BCrypt;
import jakarta.persistence.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(name = "hashed_pwd", nullable = false)
    private String hashedPwd;

    public User(String username, String pwd) {
        this.username = username;
        this.hashedPwd = BCrypt.hashpw(pwd, BCrypt.gensalt());
    }
}
