package com.afroconnection.backend.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional; // Importa a classe Optional

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    // Novo método para buscar um utilizador pelo seu email.
    // O Optional ajuda a evitar erros de NullPointerException.
    Optional<User> findByEmail(String email);
    
}
