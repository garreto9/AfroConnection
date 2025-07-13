package com.afroconnection.backend.controller;

import com.afroconnection.backend.model.Curso;
import com.afroconnection.backend.service.CursoService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/cursos")
public class CursoController {
    private final CursoService service;

    public CursoController(CursoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Curso> getAll() {
        return service.getAll();
    }
    
    @PostMapping
    public Curso create(@RequestBody Curso curso) {
        return service.save(curso);
    }
}