package com.afroconnection.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        try {
            Dotenv dotenv = Dotenv.configure()
                .ignoreIfMissing()
                .load();

            dotenv.entries().forEach(entry -> {
                System.setProperty(entry.getKey(), entry.getValue());
            });
        } catch (Exception e) {
            System.out.println(".env não encontrado. Continuando com variáveis de ambiente padrão.");
        }

        SpringApplication.run(BackendApplication.class, args);
    }
}
