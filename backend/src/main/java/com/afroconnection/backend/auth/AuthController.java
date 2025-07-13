package com.afroconnection.backend.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.afroconnection.backend.security.JwtService;
import com.afroconnection.backend.user.User;
import com.afroconnection.backend.user.UserRepository;

// DTOs para os pedidos e respostas
record RegistrationRequest(String nome, String email, String senha) {}
record LoginRequest(String email, String senha) {}
record AuthResponse(String token) {}

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegistrationRequest request) {
        if (userRepository.findByEmail(request.email()).isPresent()) {
            return ResponseEntity.status(409).body("Este email já está em uso.");
        }

        String senhaCriptografada = passwordEncoder.encode(request.senha());
        User novoUtilizador = new User(request.nome(), request.email(), senhaCriptografada, "user");
        userRepository.save(novoUtilizador);
        
        return ResponseEntity.ok("Utilizador registado com sucesso!");
    }

    
    // Endpoint para autenticar um utilizador e retornar um token JWT.
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.email(), request.senha())
            );

            if (authentication.isAuthenticated()) {
                User user = userRepository.findByEmail(request.email())
                        .orElseThrow(() -> new UsernameNotFoundException("Erro ao buscar detalhes do utilizador após login."));
                
                String token = jwtService.generateToken(user);
                return ResponseEntity.ok(new AuthResponse(token));
            } else {
                return ResponseEntity.status(401).body("Autenticação falhou.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Email ou senha inválidos.");
        }
    }
}
