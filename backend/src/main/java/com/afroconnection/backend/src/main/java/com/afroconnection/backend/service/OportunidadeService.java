package com.afroconnection.backend.service;

import com.afroconnection.backend.model.Oportunidade;
import com.afroconnection.backend.repository.OportunidadeRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class OportunidadeService {
    private final OportunidadeRepository repository;

    public OportunidadeService(OportunidadeRepository repository) {
        this.repository = repository;
    }

    public List<Oportunidade> getAll() {
        return repository.findAll();
    }
    
    public Oportunidade save(Oportunidade oportunidade) {
        return repository.save(oportunidade);
    }
}