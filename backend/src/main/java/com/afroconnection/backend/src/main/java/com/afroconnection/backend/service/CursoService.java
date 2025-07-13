package com.afroconnection.backend.service;

import com.afroconnection.backend.model.Curso;
import com.afroconnection.backend.repository.CursoRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CursoService {
    private final CursoRepository repository;

    public CursoService(CursoRepository repository) {
        this.repository = repository;
    }

    public List<Curso> getAll() {
        return repository.findAll();
    }
    
    public Curso save(Curso curso) {
        return repository.save(curso);
    }
}