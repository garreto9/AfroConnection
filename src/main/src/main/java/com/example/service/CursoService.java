package com.example.demo.service;

import com.example.demo.entity.Curso;
import com.example.demo.repository.CursoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CursoService {

    @Autowired
    private CursoRepository cursoRepository;

    public List<Curso> listarCursos() {
        return cursoRepository.findAll();
    }

    public Curso criarCurso(Curso curso) {
        return cursoRepository.save(curso);
    }

    public Curso atualizarCurso(Long id, Curso curso) {
        Optional<Curso> cursoExistente = cursoRepository.findById(id);
        if (cursoExistente.isPresent()) {
            curso.setId(id);
            return cursoRepository.save(curso);
        }
        return null;
    }

    public void deletarCurso(Long id) {
        cursoRepository.deleteById(id);
    }
}
