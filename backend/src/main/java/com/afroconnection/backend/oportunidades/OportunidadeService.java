package com.afroconnection.backend.oportunidades;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

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

    public Optional<Oportunidade> update(Long id, Oportunidade oportunidadeDetails) {
        return repository.findById(id).map(oportunidade -> {
            oportunidade.setTitle(oportunidadeDetails.getTitle());
            oportunidade.setCompany(oportunidadeDetails.getCompany());
            oportunidade.setLocation(oportunidadeDetails.getLocation());
            oportunidade.setTags(oportunidadeDetails.getTags());
            oportunidade.setLink(oportunidadeDetails.getLink());
            return repository.save(oportunidade);
        });
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
