package com.afroconnection.backend.cursos;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class CursoController {
    private final CursoService service;

    public CursoController(CursoService service) {
        this.service = service;
    }

    @GetMapping("/capacitacoes")
    public List<Curso> getAllCursos() {
        return service.getAll();
    }
    
    @PostMapping("/admin/cursos")
    @PreAuthorize("hasAuthority('admin')")
    public Curso createCurso(@RequestBody Curso curso) {
        return service.save(curso);
    }

    @PutMapping("/admin/cursos/{id}")
    @PreAuthorize("hasAuthority('admin')")
    public ResponseEntity<Curso> updateCurso(@PathVariable Long id, @RequestBody Curso cursoDetails) {
        return service.update(id, cursoDetails)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/admin/cursos/{id}")
    @PreAuthorize("hasAuthority('admin')")
    public ResponseEntity<Void> deleteCurso(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
