package com.afroconnection.backend.controller;

import com.afroconnection.backend.model.Oportunidade;
import com.afroconnection.backend.service.OportunidadeService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/oportunidades")
public class OportunidadeController {
    private final OportunidadeService service;

    public OportunidadeController(OportunidadeService service) {
        this.service = service;
    }

    @GetMapping
    public List<Oportunidade> getAll() {
        return service.getAll();
    }
    
    @PostMapping
    public Oportunidade create(@RequestBody Oportunidade oportunidade) {
        return service.save(oportunidade);
    }
}