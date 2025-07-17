package com.afroconnection.backend.cursos;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

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

    public Optional<Curso> update(Long id, Curso cursoDetails) {
        return repository.findById(id).map(curso -> {
            curso.setNome(cursoDetails.getNome());
            curso.setCategoria(cursoDetails.getCategoria());
            curso.setDescricao(cursoDetails.getDescricao());
            curso.setDetalhes(cursoDetails.getDetalhes());
            curso.setImagem(cursoDetails.getImagem());
            curso.setLink(cursoDetails.getLink());
            return repository.save(curso);
        });
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
