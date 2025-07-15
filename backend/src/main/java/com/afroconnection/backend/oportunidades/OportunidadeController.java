package com.afroconnection.backend.oportunidades;

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
public class OportunidadeController {
    private final OportunidadeService service;

    public OportunidadeController(OportunidadeService service) {
        this.service = service;
    }

    @GetMapping("/oportunidades")
    public List<Oportunidade> getAllOportunidades() {
        return service.getAll();
    }
    
    @PostMapping("/admin/vagas")
    @PreAuthorize("hasAuthority('admin')")
    public Oportunidade createOportunidade(@RequestBody Oportunidade oportunidade) {
        return service.save(oportunidade);
    }

    @PutMapping("/admin/vagas/{id}")
    @PreAuthorize("hasAuthority('admin')")
    public ResponseEntity<Oportunidade> updateOportunidade(@PathVariable Long id, @RequestBody Oportunidade oportunidadeDetails) {
        return service.update(id, oportunidadeDetails)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/admin/vagas/{id}")
    @PreAuthorize("hasAuthority('admin')")
    public ResponseEntity<Void> deleteOportunidade(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
