package com.afroconnection.backend.security;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.afroconnection.backend.user.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        com.afroconnection.backend.user.User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Utilizador não encontrado com o email: " + username));

        // Converte o nosso User para o formato que o Spring Security entende (UserDetails)
        return new User(user.getEmail(), user.getSenha(), new ArrayList<>());
    }
}
