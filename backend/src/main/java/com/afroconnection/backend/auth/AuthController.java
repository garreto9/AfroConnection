package com.afroconnection.backend.auth;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegistrationRequest request) {
        //Verifica se o email já existe no banco de dados
        if (userRepository.findByEmail(request.email()).isPresent()) {
            // Retorna um erro 409 (Conflict) se o email já estiver em uso
            return ResponseEntity.status(409).body("Este email já está em uso.");
        }

        String senhaCriptografada = passwordEncoder.encode(request.senha());
        User novoUtilizador = new User(request.nome(), request.email(), senhaCriptografada, "user");
        userRepository.save(novoUtilizador);
        
        return ResponseEntity.ok("Utilizador registado com sucesso!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest request) {
        Optional<User> userOptional = userRepository.findByEmail(request.email());

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (passwordEncoder.matches(request.senha(), user.getSenha())) {
                String token = jwtService.generateToken(user);
                return ResponseEntity.ok(new AuthResponse(token));
            }
        }

        return ResponseEntity.status(401).body("Email ou senha inválidos.");
    }
}
