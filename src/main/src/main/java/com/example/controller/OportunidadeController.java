package com.example.demo.controller;

import com.example.demo.entity.Oportunidade;
import com.example.demo.service.OportunidadeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/oportunidades")
public class OportunidadeController {

    @Autowired
    private OportunidadeService oportunidadeService;

    @GetMapping
    public List<Oportunidade> listarOportunidades() {
        return oportunidadeService.listarOportunidades();
    }

    @PostMapping
    public Oportunidade criarOportunidade(@RequestBody Oportunidade oportunidade) {
        return oportunidadeService.criarOportunidade(oportunidade);
    }

    @PutMapping("/{id}")
    public Oportunidade atualizarOportunidade(@PathVariable Long id, @RequestBody Oportunidade oportunidade) {
        return oportunidadeService.atualizarOportunidade(id, oportunidade);
    }

    @DeleteMapping("/{id}")
    public void deletarOportunidade(@PathVariable Long id) {
        oportunidadeService.deletarOportunidade(id);
    }
}
