package com.example.demo.service;

import com.example.demo.entity.Oportunidade;
import com.example.demo.repository.OportunidadeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OportunidadeService {

    @Autowired
    private OportunidadeRepository oportunidadeRepository;

    public List<Oportunidade> listarOportunidades() {
        return oportunidadeRepository.findAll();
    }

    public Oportunidade criarOportunidade(Oportunidade oportunidade) {
        return oportunidadeRepository.save(oportunidade);
    }

    public Oportunidade atualizarOportunidade(Long id, Oportunidade oportunidade) {
        Optional<Oportunidade> oportunidadeExistente = oportunidadeRepository.findById(id);
        if (oportunidadeExistente.isPresent()) {
            oportunidade.setId(id);
            return oportunidadeRepository.save(oportunidade);
        }
        return null;
    }

    public void deletarOportunidade(Long id) {
        oportunidadeRepository.deleteById(id);
    }
}
