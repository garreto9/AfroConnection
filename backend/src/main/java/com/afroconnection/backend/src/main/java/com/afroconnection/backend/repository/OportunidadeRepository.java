package com.afroconnection.backend.repository;

import com.afroconnection.backend.model.Oportunidade;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OportunidadeRepository extends JpaRepository<Oportunidade, Long> {
}