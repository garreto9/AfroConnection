package com.afroconnection.backend.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.afroconnection.backend.security.JwtService;
import com.afroconnection.backend.user.User;
import com.afroconnection.backend.user.UserRepository;
import com.afroconnection.backend.user.UserService;

// DTOs para os pedidos e respostas
record RegistrationRequest(String nome, String email, String senha) {}
record LoginRequest(String email, String senha) {}
record AuthResponse(String token) {}
record ForgotPasswordRequest(String email) {}
record ResetPasswordRequest(String token, String newPassword) {}

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegistrationRequest request) {
        try {
            userService.registerUser(request.nome(), request.email(), request.senha());
            return ResponseEntity.ok("Utilizador registado com sucesso!");
        } catch (RuntimeException e) {
            return ResponseEntity.status(409).body(e.getMessage());
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        userService.generatePasswordResetToken(request.email());
        return ResponseEntity.ok("Se um utilizador com este email existir, um link de recuperação foi enviado.");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest request) {
        try {
            userService.resetPassword(request.token(), request.newPassword());
            return ResponseEntity.ok("Senha redefinida com sucesso!");
        } catch (RuntimeException e) {
            // Retorna um erro se o token for inválido ou tiver expirado
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }
    
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

