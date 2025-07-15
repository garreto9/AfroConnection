package com.afroconnection.backend.user;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.afroconnection.backend.email.EmailService;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;
    public User registerUser(String nome, String email, String senha) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Este email já está em uso.");
        }
        String senhaCriptografada = passwordEncoder.encode(senha);
        User novoUtilizador = new User(nome, email, senhaCriptografada, "user");
        return userRepository.save(novoUtilizador);
    }

    public void generatePasswordResetToken(String email) {
        userRepository.findByEmail(email).ifPresent(user -> {
            String token = UUID.randomUUID().toString();
            user.setResetPasswordToken(token);
            user.setResetPasswordTokenExpiry(LocalDateTime.now().plusHours(1));
            userRepository.save(user);
            emailService.sendPasswordResetEmail(user.getEmail(), token);
        });
    }

    public void resetPassword(String token, String newPassword) {
        User user = userRepository.findByResetPasswordToken(token)
            .orElseThrow(() -> new RuntimeException("Token de redefinição inválido ou não encontrado."));

        if (user.getResetPasswordTokenExpiry().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("O token de redefinição de senha expirou.");
        }

        user.setSenha(passwordEncoder.encode(newPassword));
        user.setResetPasswordToken(null);
        user.setResetPasswordTokenExpiry(null);

        userRepository.save(user);
    }
}
