package com.afroconnection.backend.user;

import jakarta.persistence.*; // para anotações JPA
import lombok.Getter; // Lombok para gerar getters
import lombok.NoArgsConstructor; // Lombok para gerar construtor vazio

@Entity // Diz ao JPA que esta classe é uma tabela no banco de dados
@Table(name = "users") // Nome da tabela
@Getter
@NoArgsConstructor
public class User {

    @Id // Chave primária
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-incremento
    private Long id;

    private String nome;
    
    @Column(unique = true) // Garante que cada email seja único
    private String email;

    private String senha;

    private String role; // 'user' ou 'admin'

    // Construtor para criar novos usuários
    public User(String nome, String email, String senha, String role) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.role = role;
    }
}