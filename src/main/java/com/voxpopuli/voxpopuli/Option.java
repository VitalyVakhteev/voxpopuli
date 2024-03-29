package com.voxpopuli.voxpopuli;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Set;

@Entity
@Table(name = "option")
@Getter
@Setter
@NoArgsConstructor
public class Option {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    @OneToMany(mappedBy = "option", cascade = CascadeType.ALL)
    private Set<Vote> votes;

    @ManyToOne
    @JsonBackReference
    private Poll poll;

    public Option(String description) {
        this.description = description;
    }
}
