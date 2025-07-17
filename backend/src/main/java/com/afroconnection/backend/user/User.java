package com.afroconnection.backend.user;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "users")
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    
    @Column(unique = true)
    private String email;

    private String senha;

    private String role;

    private String resetPasswordToken;

    private LocalDateTime resetPasswordTokenExpiry;

    private String profilePicture;

    public User(String nome, String email, String senha, String role) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.role = role;
    }
}
