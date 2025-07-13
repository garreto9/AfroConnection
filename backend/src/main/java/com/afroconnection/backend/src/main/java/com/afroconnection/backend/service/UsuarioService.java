package com.afroconnection.backend.service;

import com.afroconnection.backend.model.Usuario;
import com.afroconnection.backend.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {
    private final UsuarioRepository repository;

    public UsuarioService(UsuarioRepository repository) {
        this.repository = repository;
    }

    public Usuario registrarUsuario(Usuario usuario) {
        return repository.save(usuario);
    }
}